import './app.scss'
import React from 'react'
import Dashboard from './containers/dashboard/dashboard'
import configureStore from './store/configureStore'
import Toastr from './components/toastr/toastr'

const store = configureStore({
  dashboard: Dashboard.getInitialState()
  // ...other pages
})

export default class App extends React.Component {

  constructor() {
    super()
    this.state = store.getState()
  }

  componentWillMount() {
    store.subscribe(() => {
      var state = store.getState()
      this.setState(state);
    });
  }

  render() {
    return (
      <div>
        <Dashboard store={store} data={this.state.dashboard} />
        {/*...Other pages*/}
        <Toastr error={this.state.errorMessage} />
      </div>
    )
  }
}