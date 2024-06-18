import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import PropTypes from "prop-types";

Chart.register(...registerables);

const WebVisitsLineChart = ({visits}) => {
     const dailyVisits = visits.reduce((acc, visit) => {
          const date = new Date(visit.v_date).toISOString().split('T')[0]; // Extract date in YYYY-MM-DD format
          acc[date] = (acc[date] || 0) + 1;
          return acc;
     }, {});
     
     const labels = Object.keys(dailyVisits).sort(); // Sort dates
     const dataPoints = labels.map(date => dailyVisits[date]);
     
     const data = {
     labels,
     datasets: [
          {
          label: 'Daily Visits',
          data: dataPoints,
          fill: false,
          backgroundColor: 'rgb(18, 57, 79, 0.2)',
          borderColor: 'rgb(18, 57, 79)',
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
     
     return <Line data={data} options={options} />;
}

WebVisitsLineChart.propTypes = {
     visits: PropTypes.array
}

export default WebVisitsLineChart