import * as ActionTypes from '../actions'

const dashboard = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.DATE_RANGE_CHANGE:
      return {
        ...state,
        settings: {
          ...state.settings,
          selectedDateRange: action.dateRange
        },
        widgets: state.widgets.map((w, i) => {
          return {
            ...w,
            data: action.widgets[i].data
          }
        })
      }
    case ActionTypes.SELECTED_FIELDS_CHANGE:
      return {
        ...state,
        settings: {
          ...state.settings,
          selectedFields: action.fields
        },
        widgets: state.widgets.map((w, i) => {
          let data = w.i === 'trend' ? action.chartData : state.widgets[i].data
          return {
            ...w,
            data
          }
        })
      }
    case ActionTypes.FETCHING:
      return {
        ...state,
        widgets: state.widgets.map(w => {
          return {
            ...w,
            loading: action.status
          }
        })
      }

    default:
      return state
  }
}

export default dashboard