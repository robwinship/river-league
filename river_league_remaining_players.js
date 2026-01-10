<div id="river-league-registrations">
<h2>River League Registrations</h2>
<div id="river-league-status"></div>
<div class="river-team" data-team="9u River League (2017,2018)">
<h3>9u River League (2017,2018)</h3>
<div class="spots">&nbsp;</div>
<table class="players">
    <thead>
        <tr>
            <th>First Name</th>
            <th>Last Initial</th>
            <th>Registration Date</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
</div>
<div class="river-team" data-team="11u River League (2015,2016)">
<h3>11u River League (2015,2016)</h3>
<div class="spots">&nbsp;</div>
<table class="players">
    <thead>
        <tr>
            <th>First Name</th>
            <th>Last Initial</th>
            <th>Registration Date</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
</div>
<div class="river-team" data-team="13u River League (2013,2014)">
<h3>13u River League (2013,2014)</h3>
<div class="spots">&nbsp;</div>
<table class="players">
    <thead>
        <tr>
            <th>First Name</th>
            <th>Last Initial</th>
            <th>Registration Date</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
</div>
</div>
<script>
  (function() {
    const API_URL = 'https://script.google.com/macros/s/AKfycbxsNRtQtGJfXYN1SwU7QrQHGC-CnWVwOXGKeqWS-eIXjPE8TBkIyvJQ6Qqi7eF7AuKb/exec'; // <- paste your Apps Script web app URL

    function fetchRiverLeagueData() {
      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          renderRiverLeague(data);
        })
        .catch(err => {
          console.error('Error fetching River League data:', err);
          const status = document.getElementById('river-league-status');
          if (status) {
            status.textContent = 'Unable to load registration data at this time.';
          }
        });
    }

    function renderRiverLeague(data) {
      if (!data || !data.teams) return;

      const status = document.getElementById('river-league-status');
      if (status && data.generatedAt) {
        status.textContent = 'Last updated: ' + new Date(data.generatedAt).toLocaleString();
      }

      const teamBlocks = document.querySelectorAll('#river-league-registrations .river-team');

      teamBlocks.forEach(block => {
        const teamName = block.getAttribute('data-team');
        const teamData = data.teams[teamName];

        const spotsElem = block.querySelector('.spots');
        const tbody = block.querySelector('tbody');

        if (!teamData) {
          if (spotsElem) spotsElem.textContent = 'No data available for this team.';
          if (tbody) tbody.innerHTML = '';
          return;
        }

        // Spots text
        if (spotsElem) {
          if (teamData.remaining === 'full') {
            spotsElem.textContent = 'This team is currently full.';
          } else if (teamData.remaining == null) {
            spotsElem.textContent = '';
          } else {
            spotsElem.textContent = 'Spots remaining: ' + teamData.remaining + ' (Max: ' + teamData.max + ')';
          }
        }

        // Player table
        if (tbody) {
          tbody.innerHTML = '';
          (teamData.players || []).forEach(player => {
            const tr = document.createElement('tr');

            const tdFirst = document.createElement('td');
            tdFirst.textContent = player.first || '';
            tr.appendChild(tdFirst);

            const tdLastInit = document.createElement('td');
            tdLastInit.textContent = player.lastInitial || '';
            tr.appendChild(tdLastInit);

            const tdDate = document.createElement('td');
            tdDate.textContent = player.date || '';
            tr.appendChild(tdDate);

            tbody.appendChild(tr);
          });
        }
      });
    }

    // Initial load
    fetchRiverLeagueData();
    // Auto-refresh every 10 seconds
    setInterval(fetchRiverLeagueData, 10000);
  })();
</script>
<style>
    #river-league-registrations table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1em;
    }
    #river-league-registrations th,
    #river-league-registrations td {
    border: 1px solid #ccc;
    padding: 4px 8px;
    text-align: left;
    }
    #river-league-registrations th {
    background-color: #f2f2f2;
    }
    #river-league-registrations .spots {
    font-weight: bold;
    margin-bottom: 0.5em;
    }
</style>