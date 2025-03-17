document.getElementById('weatherForm').addEventListener('submit', submitReport);

const reports = [];
const users = {};

function submitReport(e) {
    e.preventDefault();
    const location = document.getElementById('location').value;
    const report = document.getElementById('report').value;
    const rainfall = parseFloat(document.getElementById('rainfall').value);
    const user = 'user' + (Math.floor(Math.random() * 1000)); // ramdom username for user

    // Create the report object
    const newReport = { user, location, report, rainfall };
    reports.push(newReport);

    // Update points for user
    if (!users[user]) {
        users[user] = 0;
    }
    users[user] += 10; // 10 points per report

    updateLeaderboard();
    updateAlerts();
    updateDashboard();
}

function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';

    // Sort users by points
    const sortedUsers = Object.entries(users).sort((a, b) => b[1] - a[1]);

    sortedUsers.forEach(([user, points]) => {
        const li = document.createElement('li');
        li.textContent = `${user}: ${points} points`;
        leaderboardList.appendChild(li);
    });
}

function updateAlerts() {
    const alertsList = document.getElementById('alertsList');
    alertsList.innerHTML = '';

    // Set a threshold for rainfall to trigger an alert
    const threshold = 100;
    const alerts = reports.filter(report => report.rainfall > threshold);

    if (alerts.length > 0) {
        alerts.forEach(alert => {
            const li = document.createElement('li');
            li.textContent = `Alert! Location: ${alert.location}, Rainfall: ${alert.rainfall} mm - ${alert.report}`;
            alertsList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No alerts at this time.';
        alertsList.appendChild(li);
    }
}

function updateDashboard() {
    const tableBody = document.querySelector('#dashboardTable tbody');
    tableBody.innerHTML = '';

    reports.forEach(report => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${report.location}</td>
            <td>${report.rainfall} mm</td>
            <td>${report.report}</td>
        `;
        tableBody.appendChild(row);
    });
}
