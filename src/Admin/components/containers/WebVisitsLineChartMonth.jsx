import PropTypes from "prop-types"

import { aggregateByMonth } from '../../../utils/dateFunctions';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const WebVisitsLineChartMonth = ({visits}) => {
     const { labels, counts } = aggregateByMonth(visits);

  const chartData = {
     labels: labels,
     datasets: [
          {
          label: 'Web Visits',
          data: counts,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1,
          },
     ],
     };

     const options = {
     scales: {
          y: {
          beginAtZero: true,
          },
     },
     };

     return <Line data={chartData} options={options} />;
}

WebVisitsLineChartMonth.propTypes = {
     visits: PropTypes.array
}

export default WebVisitsLineChartMonth