export function openModal() {
    const modal = document.getElementById('newPlantModal');
    modal.style.display = 'flex';
}

export function closeModal() {
    document.getElementById('newPlantModal').style.display = 'none';
}

export function openGoal(index) {
    localStorage.setItem('activeGoal', index);
    window.location.href = 'plant.html';
    console.log('Opening goal index: ' + index);
 }

 export function loadGoalsOntoShelves() {
    const savedGoals = JSON.parse(localStorage.getItem('playerGoals') || '[]');
    for (let i = 0; i < 6; i++) {
        const btn = document.getElementById('Goal' + (i + 1));
        const img = btn.querySelector('img');
        const label = btn.querySelector('span');
        if (savedGoals[i]) {
            img.src = `images/${savedGoals[i].plantType}_stage${savedGoals[i].plantStage}.png`;
            label.textContent = savedGoals[i].goalName;
        } else {
            img.src = 'images/starterPot.png';
            label.textContent = 'Empty';
        }
    }
}

window.addEventListener('load', loadGoalsOntoShelves);