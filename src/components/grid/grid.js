import "./grid.scss"

import React from 'react'
import ReactGridLayout from 'react-grid-layout';
import "!style!css!react-grid-layout/css/styles.css"
import "!style!css!react-resizable/css/styles.css"

export default class Grid extends React.Component {
	renderWidget(w) {
		return <div key={w.i}>{w.render && w.render()}</div>
	}

	render() {
		let layout = this.props.layout
		let widgets = this.props.widgets
		let options = this.props.options

		return (
			<div className="grid">
				<ReactGridLayout
					className="layout"
					layout={layout}
					cols={options.cols}
					rowHeight={options.rowHeight}
					width={options.width}>
					{widgets.map(w => this.renderWidget(w))}
				</ReactGridLayout>
			</div>
		)
	}

};