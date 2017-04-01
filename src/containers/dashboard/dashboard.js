import React from 'react'
import Settings from '../../components/settings/settings'
import Grid from '../../components/grid/grid'
import Defaults from './defaults'
import * as ActionTypes from '../../actions'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import * as DataHandler from './dataHandler'

import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

export default class Dashboard extends React.Component {

  static getInitialState() {
    return {
      settings: {
        selectedFields: Defaults.selectedFields,
        fields: Defaults.fields,
        selectedDateRange: Defaults.dateRange,
      },
      widgets: Defaults.layout.map(layout => {
        return {
          i: layout.i,
          loading: true,
          data: 0,
          render: function () {
            return <layout.type title={layout.title} data={this.data} loading={this.loading} />
          }
        }
      })
    }
  }

  constructor() {
    super()

    //
    // Track the date range changes
    //
    let dateRange = null
    this.dateRangeMutated = new Subject()
    this.dateRangeMutated
      .debounceTime(0)
      .flatMap(range => {
        dateRange = range
        this.props.store.dispatch({ type: ActionTypes.FETCHING, status: true })

        let url = `/stats?startDate=${range.start}&endDate=${range.end}`
        return Observable.ajax(url)
          .catch(e => {
            this.props.store.dispatch({ type: ActionTypes.ERROR_NO_DATA })
            return Observable.of(0)
          })
      })
      .filter(res => {
        return res !== 0
      })
      .subscribe(res => {
        this.source = DataHandler.aggregateDates(res.response)
        let settings = {
          selectedFields: this.props.data.settings.selectedFields,
          Defaults: Defaults
        }
        this.props.store.dispatch({ 
          type: ActionTypes.DATE_RANGE_CHANGE, 
          widgets: DataHandler.getUpdatedWidgetsData(this.source, settings),
          dateRange: dateRange
        })
        this.props.store.dispatch({ type: ActionTypes.FETCHING, status: false })
      })

    //
    // Track the set of fields changes
    //
    this.fieldsMutated = new Subject()
    this.fieldsMutated
      .debounceTime(0)
      .subscribe(fields => {
        let settings = {
          selectedFields: fields,
          Defaults: Defaults
        }        
        let chartData = DataHandler.getUpdatedChartWidgetData(this.source, settings)
        this.props.store.dispatch({ type: ActionTypes.SELECTED_FIELDS_CHANGE, fields, chartData })
      })
  }

  render() {
    let data = this.props.data

    return (
      <div>
        <Settings
          settings={data.settings}
          dateMutate={(range) => this.dateRangeMutated.next(range)}
          fieldsMutate={(fields) => this.fieldsMutated.next(fields)}
        />
        <Grid
          layout={Defaults.layout}
          widgets={data.widgets}
          options={Defaults.grid}
        />
      </div>
    )
  }
}