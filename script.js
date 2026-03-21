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
    let playerCount = parseInt(localStorage.getItem('playerCount') || '0');
    playerCount += 1;
    localStorage.setItem('playerCount', playerCount.toString());
    let playerID = 'player' + playerCount.toString().padStart(2, '0');
    // Create CSV content with player ID
    let csvContent = 'Player ID\n' + playerID + '\n';
    downloadCSV(csvContent, playerID + '.csv');
    // Then redirect to Home.html
    window.location.href = 'Home.html';
}