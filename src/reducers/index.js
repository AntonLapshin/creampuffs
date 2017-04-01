import * as ActionTypes from '../actions'
import dashboard from './dashboard'
import { combineReducers } from 'redux'

const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.ERROR_NO_DATA) {
    return {
      title: 'No Data',
      message: 'Please select another timeframe'
    }
  } else if (error) {
    return {
      title: 'Unhandled error',
      message: error
    }
  }

  return state
}

const rootReducer = combineReducers({
  dashboard,
  errorMessage
})

export default rootReducer