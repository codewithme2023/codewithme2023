const TestResultAnalyzer = require('./TestResultAnalyzer');
const { Chart, LinearScale, BarController, CategoryScale, BarElement } = require('chart.js');
const { createCanvas } = require('canvas');
const fs = require('fs');

// Register the required scales, controllers, and elements before using them
Chart.register(LinearScale, BarController, CategoryScale, BarElement);

(async () => {
  const reportFilePath = '../playwright-report/index.html'; // Update with the correct path
  const analyzer = new TestResultAnalyzer(reportFilePath);
  const testResults = await analyzer.getTestResults();

  // Find the number of elements that represent failed tests
  const failedTestsCount = await analyzer.getFailedTestsCount();
  console.log(failedTestsCount);
  // Find the number of elements that represent green runs (passed tests)
  const passedTestsCount = await analyzer.getPassedTestsCount();
  console.log(passedTestsCount);

  // Create the chart
  const canvas = createCanvas(800, 400);
  const ctx = canvas.getContext('2d');
  const chartConfig = {
    type: 'bar',
    data: {
      labels: ['Passed', 'Failed'],
      datasets: [
        {
          label: 'Test Results',
          data: [passedTestsCount, failedTestsCount],
          backgroundColor: ['green', 'red'],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  const chart = new Chart(ctx, chartConfig);

  // Convert the chart configuration to a JSON string
  const chartData = JSON.stringify(chartConfig);

  // Read the existing index.html content
  const existingIndexHtml = fs.readFileSync('playwright-report/index.html', 'utf8');

  // Find the position to insert the chart data
  const insertPosition = existingIndexHtml.indexOf('<div id=\'root\'>');

  // Create the chart script tag with the chart data
  const chartScriptTag = `
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <canvas id="testChart" width="800" height="400"></canvas>
  <script>
    const ctx = document.getElementById('testChart').getContext('2d');
    const chartData = ${chartData};
    const chart = new Chart(ctx, chartData);
  </script>
  `;

  // Append the chart script tag to the existing index.html content
  const updatedIndexHtml = `${existingIndexHtml.slice(0, insertPosition)}${chartScriptTag}${existingIndexHtml.slice(
    insertPosition
  )}`;

  // Save the updated index.html file
  fs.writeFileSync('playwright-report/index.html', updatedIndexHtml);
  process.exit();
})();
