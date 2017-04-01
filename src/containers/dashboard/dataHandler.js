//
// Aggregates days
// [{ date: '1', cost: 2}, { date: '1', cost: 3}]
// => [{date: '1', cost: 5}]
//
function aggregateDates(source) {
  let temp = source.reduce((output, item) => {
    if (!(item.date in output))
      output.__array.push(output[item.date] = item)
    else {
      output[item.date].clicks += item.clicks
      output[item.date].revenue += item.revenue
      output[item.date].conversions += item.conversions
      output[item.date].cost += item.cost
      output[item.date].impressions += item.impressions
    }
    return output
  }, { __array: [] })
  return temp.__array
}

function getUpdatedWidgetsData(source, settings) {
  return settings.Defaults.layout.map(l => {
    return {
      data: l.getData(source, settings)
    }
  })
}

function getUpdatedChartWidgetData(source, settings) {
  let l = settings.Defaults.layout.find(l => l.i === 'trend')
  return l.getData(source, settings)
}

export { aggregateDates, getUpdatedWidgetsData, getUpdatedChartWidgetData }