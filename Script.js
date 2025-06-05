const form = document.getElementById('inputForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const labels = document.getElementById('labels').value.split(',').map(l => l.trim());
  const values = document.getElementById('values').value.split(',').map(v => parseFloat(v));

  if (labels.length !== values.length || values.some(isNaN)) {
    alert("Please make sure labels and values are correctly formatted and match in length.");
    return;
  }

  generateChart('barChart', 'bar', title, labels, values);
  generateChart('pieChart', 'pie', title, labels, values);
  generateChart('lineChart', 'line', title, labels, values);
  generateChart('doughnutChart', 'doughnut', title, labels, values);
});

let chartInstances =

function generateChart(canvasId, type, title, labels, data) {
  const ctx = document.getElementById(canvasId).getContext('2d');

  // Destroy previous chart if exists
  if (chartInstances[canvasId]) {
    chartInstances[canvasId].destroy();
  }

  chartInstances[canvasId] = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: title,
        data: data,
        backgroundColor: [
          '#4dc9f6', '#f67019', '#f53794',
          '#537bc4', '#acc236', '#166a8f',
          '#00a950', '#58595b', '#8549ba'
        ],
        borderColor: '#ccc',
        borderWidth: 1,
        fill: type === 'line' ? false : true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: title,
          font: {
            size: 18
          }
        },
        legend: {
          display: type !== 'bar'
        }
      }
    }
  });
}
