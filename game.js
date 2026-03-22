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