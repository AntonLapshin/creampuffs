import "./multiselect.scss"

import React from 'react'
import Select from 'react-select';

export default class MultiSelect extends React.Component {
  handleSelectChange(fields) {
    this.props.fieldsMutate(fields)
  }
  render() {
    let fields = this.props.fields.map(f => {
      return {
        label: f, value: f
      }
    })
    return (
      <div className="multiselect">
        <Select
          multi
          simpleValue
          value={this.props.selectedFields}
          placeholder="Select fields"
          options={fields}
          onChange={(fields) => this.handleSelectChange(fields)}
        />
      </div>
    );
  }
};
