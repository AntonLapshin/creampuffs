import "./chart.scss"

import React from 'react'
import ReactDOM from 'react-dom'
import Chart from 'chart.js'
import Loader from 'halogen/ScaleLoader'

export default class ChartWidget extends React.Component {
  componentWillUpdate(nextProps, nextState) {
    if (this.props.data !== nextProps.data && nextProps.data)
      this.renderChart(nextProps.data)
  }

	renderChart(data) {
		if (data === 0)
			return
		let chartData = {
			labels: data.labels,
			datasets: data.datasets.map(d => {
				return {
					label: d.label,
					data: d.label
				}
			})
		}
		this.chart.data.labels = data.labels
		this.chart.data.datasets = data.datasets
		this.chart.update()
	}

	static getData(source, settings) {
		let Defaults = settings.Defaults
		let selectedFields = settings.selectedFields.split(',')
		let dates = source.map(r => r.date)
		let data = {
			labels: [...new Set(dates)],
			datasets: selectedFields.map(f => {
				return {
					label: f,
					data:
					Defaults.computedFields[f]
						? source.map(r => Defaults.computedFields[f](r))
						: source.map(r => r[f]),
					backgroundColor: Defaults.chartBackgroundColor,
					borderColor: Defaults.colors[f],
				}
			})
		}
		return data
	}

	componentDidMount() {
		let el = ReactDOM.findDOMNode(this)
		let ctx = el.querySelector('canvas')

		this.chart = new Chart(ctx, {
			type: 'line',
			data: [],
			options: {
				responsive: true,
				maintainAspectRatio: true,
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		})
	}
	render() {
		return (
			<div className={"w w-chart " + (this.props.loading ? 'is-loading' : '')}>
				<canvas className="w-content"></canvas>
				<Loader className="w-loader" color="#26A65B" />
			</div>
		)
	}
}