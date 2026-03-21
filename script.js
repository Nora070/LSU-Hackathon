function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function startNewPlayer() {
    const name = prompt('Enter a name for your save file (e.g. "sarah"):');
    if (!name) return; // user hit cancel
    const filename = name.trim().replace(/\s+/g, '_') + '.csv';
    const csvContent = 'goal,plant_type,stage\n';
    downloadCSV(csvContent, filename);
}


const TOTAL_STAGES = 4;

  document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.endsWith('.csv')) { showError('Please select a .csv file.'); return; }

    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const parsed = parseCSV(event.target.result);
        /*if (parsed.length === 0) { showError('No goals found in this file.'); return; }*/
        displayPreview(file.name, parsed);
      } catch (err) { showError('Could not read file: ' + err.message); }
    };
    reader.readAsText(file);
  });

  // Player save file: Expects header: goal, plant_type, stage
  function parseCSV(text) {
    const lines = text.trim().split('\n').filter(l => l.trim() !== '');
    if (lines.length < 1) throw new Error('File must have a header row.');

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const goalIdx  = headers.indexOf('goal');
    const plantIdx = headers.indexOf('plant_type');
    const stageIdx = headers.indexOf('stage');

    if (goalIdx === -1 || plantIdx === -1 || stageIdx === -1)
      throw new Error('CSV must have columns: goal, plant_type, stage');

    return lines.slice(1).map(line => {
      const cols = parseCSVLine(line);
      const stage = parseInt(cols[stageIdx], 10);
      return {
        goal:      (cols[goalIdx]  || 'Unnamed Goal').trim().replace(/^"|"$/g, ''),
        plantType: (cols[plantIdx] || 'plant').trim().replace(/^"|"$/g, ''),
        stage:     isNaN(stage) ? 1 : Math.min(Math.max(stage, 1), TOTAL_STAGES)
      };
    });
  }

  function parseCSVLine(line) {
    const result = []; let cur = '', inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') inQuotes = !inQuotes;
      else if (ch === ',' && !inQuotes) { result.push(cur); cur = ''; }
      else cur += ch;
    }
    result.push(cur);
    return result;
  }

  function displayPreview(filename, goals) {
    hideError();
    document.getElementById('filenameDisplay').textContent = filename;
    const list = document.getElementById('goalList');
    list.innerHTML = '';

    goals.forEach(g => {
      const li = document.createElement('li');
      let dotsHTML = '';
      for (let i = 1; i <= TOTAL_STAGES; i++)
        dotsHTML += `<div class="dot ${i <= g.stage ? 'filled' : ''}"></div>`;

      li.innerHTML = `
        <span class="goal-name">${g.goal}</span>
        <div class="plant-info">
          ${capitalize(g.plantType)}<br>Stage ${g.stage}/${TOTAL_STAGES}
          <div class="stage-dots">${dotsHTML}</div>
        </div>`;
      list.appendChild(li);
    });

    // Save to localStorage so game.html can read it
    localStorage.setItem('playerGoals', JSON.stringify(goals));
    localStorage.setItem('playerFilename', filename);
    window.location.href = 'game.html';
    }

  function enterGarden() { window.location.href = 'game.html'; }

  function newProfile() {
    localStorage.removeItem('playerGoals');
    localStorage.removeItem('playerFilename');
    alert('New profile creation coming soon!\n\nFor now, create a CSV with columns: goal, plant_type, stage — and load it above.');
  }

  function showError(msg) {
    const el = document.getElementById('error');
    el.textContent = msg; el.style.display = 'block';
    document.getElementById('preview').style.display = 'none';
  }
  function hideError() { document.getElementById('error').style.display = 'none'; }
  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }