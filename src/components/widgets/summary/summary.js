import "./summary.scss"

import React from 'react'
import Loader from 'halogen/ScaleLoader'

export default class SummaryWidget extends React.Component {
	render() {
		return (
			<div className={"w w-summary " + (this.props.loading ? 'is-loading' : '')}>
				<p className="w-summary-title w-content">{this.props.title}</p>
				<div className="w-summary-value-container w-content">
					<p className="w-summary-value">{this.props.data}</p>
				</div>
				<Loader className="w-loader" color="#26A65B" />
			</div>
		)
	}
}