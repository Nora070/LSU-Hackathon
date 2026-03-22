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
    /*console.log(localStorage.getItem('playerGoals'));*/
    const savedGoals = JSON.parse(localStorage.getItem('playerGoals') || '[]');
    for (let i = 0; i < 6; i++) {
        const btn = document.getElementById('Goal' + (i + 1));
        const img = btn.querySelector('img');
        const label = btn.querySelector('span');
        if (savedGoals[i] && savedGoals[i].goalName) {
            console.log(`images/${savedGoals[i].plantType}_stage${savedGoals[i].plantStage}.png`);
            //img.src = `images/Plans Stages${savedGoals[i].plantType}_stage${savedGoals[i].plantStage}.png`;
            img.src = `images/Plants/${savedGoals[i].plantType}-${savedGoals[i].plantStage + 1}.png`; // sophina
            label.textContent = savedGoals[i].goalName;
        } else {
            img.src = 'images/starterPot.png';
            label.textContent = 'Empty';
        }
    }
}

window.addEventListener('load', loadGoalsOntoShelves);