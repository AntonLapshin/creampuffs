import "./settings.scss"
import '!style!css!react-select/dist/react-select.css';

import React from 'react'
import { DateRange } from 'react-date-range';
import moment from 'moment'
import MultiSelect from '../multiselect/multiselect';

export default class Settings extends React.Component {
  handleSelect(e) {
    let dateFormat = this.props.dateFormat
    let start = e.startDate.format(dateFormat)
    let end = e.endDate.format(dateFormat)
    if (start === end)
      return
    this.props.dateMutate({ start, end });
  }

  render() {
    let settings = this.props.settings
    let selectedFields = settings.selectedFields
    let fields = settings.fields;
    let dateFormat = this.props.dateFormat
    let start = moment(settings.selectedDateRange.start, dateFormat)
    let end = moment(settings.selectedDateRange.end, dateFormat)

    return (
      <div className="settings">
        <DateRange
          startDate={start}
          endDate={end}
          onInit={(e) => this.handleSelect(e)}
          onChange={(e) => this.handleSelect(e)}
        />
        <MultiSelect
          selectedFields={selectedFields}
          fields={fields}
          fieldsMutate={this.props.fieldsMutate}
        />
      </div>
    )
  }

};