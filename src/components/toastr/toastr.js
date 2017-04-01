import "!style!css!./animate.min.css"
import "!style!css!./toastr.min.css"

import React from 'react'
var ReactToastr = require("react-toastr");
var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

export default class Toastr extends React.Component {
  componentWillUpdate(nextProps, nextState) {
    if (this.props.error !== nextProps.error && nextProps.error)
      this.error(nextProps.error)
  }

  error(e) {
    this.refs.container.error(
      e.message,
      e.title, {
        timeOut: 3000,
        extendedTimeOut: 3000
      });
  }

  render() {
    return (
      <div>
        <ToastContainer
          ref="container"
          toastMessageFactory={ToastMessageFactory}
          className="toast-top-right"
        />
      </div>
    )
  }
}