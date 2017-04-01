import SummaryWidget from '../../components/widgets/summary/summary'
import ChartWidget from '../../components/widgets/chart/chart'
import { sumBy } from 'lodash'

const Defaults = {
  dateFormat: 'YYYY-MM-DD',
  dateRange: { start: '2014-03-10', end: '2014-03-28' },
  selectedFields: 'clicks,cost',
  fields: ['clicks', 'revenue', 'conversions', 'cost', 'impressions', 'roi'],
  computedFields: {
    'roi': (row) => (row.revenue - row.cost) / row.cost
  },
  colors: {
    'clicks': '#e53935',
    'revenue': '#f06292',
    'conversions': '#536dfe',
    'cost': '#00897b',
    'impressions': '#4caf50',
    'roi': '#e64a19',
  },
  chartBackgroundColor: 'rgba(0,0,0,0.05)',
  grid: {
    cols: 12,
    rowHeight: 50,
    width: 1200
  },
  //
  // Defines the initial set of Widgets on the Dashboard
  // Contains Layout and Data presets. Could be splitted
  //
  layout: [
    {
      i: 'trend', title: 'Trend', type: ChartWidget,
      x: 0, y: 0, w: 8, h: 7, minW: 7, minH: 7,
      getData: ChartWidget.getData
    },
    {
      i: 'roi', title: 'ROI', type: SummaryWidget,
      x: 0, y: 6, w: 2, h: 2, minH: 2, minW: 2, maxW: 4, maxH: 4,
      getData: (source) => {
        let gains = sumBy(source, function (item) { return item.revenue; })
        let costs = sumBy(source, function (item) { return item.cost; })
        let roi = (gains - costs) / costs
        return roi.toFixed(3)
      }
    },
    {
      i: 'cost', title: 'Cost (SEK)', type: SummaryWidget,
      x: 2, y: 6, w: 2, h: 2, minH: 2, minW: 2, maxW: 4, maxH: 4,
      getData: (source) => {
        let cost = sumBy(source, function (item) { return item.cost; })
        return cost.toFixed(0)
      }
    },
    {
      i: 'clicks', title: 'Clicks', type: SummaryWidget,
      x: 4, y: 6, w: 2, h: 2, minH: 2, minW: 2, maxW: 4, maxH: 4,
      getData: (source) => {
        let clicks = sumBy(source, function (item) { return item.clicks; })
        return clicks.toFixed(0)
      }
    },
    {
      i: 'revenue', title: 'Revenue (SEK)', type: SummaryWidget,
      x: 6, y: 6, w: 2, h: 2, minH: 2, minW: 2, maxW: 4, maxH: 4,
      getData: (source) => {
        let revenue = sumBy(source, function (item) { return item.revenue; })
        return revenue.toFixed(0)
      }
    }
  ]
}

export default Defaults