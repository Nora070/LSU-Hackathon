

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

export function startNewPlayer() {
    const name = prompt('Enter a name for your save file (e.g. "sarah"):');
    if (!name) return; // user hit cancel
    const filename = name.trim().replace(/\s+/g, '_') + '.csv';
    const csvContent = 'goal,plant_type,stage\n';
    downloadCSV(csvContent, filename);
    document.getElementById('newPlayerMsg').style.display = 'block';
}

export function loadExistingPlayer() {

    const fileInput = document.getElementById('fileInput');
    fileInput.click();
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.name.endsWith('.csv')) { 
          showError('Please select a .csv file.'); 
          return; 
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            try {
              const parsed = parseCSV(event.target.result);
              const existing = JSON.parse(localStorage.getItem('playerGoals') || '[]');
              if (parsed.length === 0) {
                window.location.href = 'game.html';
                return;
              }
              const merged = parsed.map((csvGoal, i) => {
                const existingGoal = existing[i];
                if (existingGoal && existingGoal.goalName === csvGoal.goalName) {
                  return {
                    ...csvGoal,
                    plantStage:  existingGoal.plantStage  || csvGoal.plantStage,
                    progress:    existingGoal.progress    || 0,
                    lastCheckIn: existingGoal.lastCheckIn || null
                  };
              }
              return csvGoal;
            });
            
            localStorage.setItem('playerGoals', JSON.stringify(merged));
            window.location.href = 'game.html';
        } catch (err) { 
            console.error(err); 
            showError('Could not read file: ' + err.message); 
        }
      };
      reader.readAsText(file);
  });
}

const TOTAL_STAGES = 5;

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
      goalName:      (cols[goalIdx]  || 'Unnamed Goal').trim().replace(/^"|"$/g, ''),
      plantType:     (cols[plantIdx] || 'plant').trim().replace(/^"|"$/g, ''),
      plantStage:     isNaN(stage) ? 0 : Math.min(Math.max(stage, 0), TOTAL_STAGES - 1),
      progress:       0,
      lastCheckIn:    null
    };
  });
}

  function parseCSVLine(line) {
    const result = []; 
    let cur = '', inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') inQuotes = !inQuotes;
      else if (ch === ',' && !inQuotes) { result.push(cur); cur = ''; }
      else cur += ch;
    }
    result.push(cur);
    return result;
  }

  function showError(msg) {
    const el = document.getElementById('error');
    el.textContent = msg; 
    el.style.display = 'block';
  }

  function hideError() { 
    document.getElementById('error').style.display = 'none'; 
  }
