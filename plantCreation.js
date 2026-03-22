import { Plant } from './Classes.js';
import { MakePlant, GrowPlant } from './PlantGrowth.js';

const goalDropdown = document.getElementById('GoalSelection');
const plantContainer = document.getElementById('plantContainer');
const createPlant = document.getElementById("createPlant")

let dropdown = document.getElementById('GoalSelection');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose Goal';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

fetch('./PlantGoals.json')  
  .then(function(response) {  
      if (response.status !== 200) {  
        console.warn('Code Error: ' + response.status);  
        return;  
      }

      // Examine the text in the response  
      response.json().then(function(data) {  
        let option;
    
        console.log(data);
    	for (let i = 0; i < data["Plant Goals"].length; i++) {
          console.log(data["Plant Goals"][i].Goal);
          option = document.createElement('option');
      	  option.text = data["Plant Goals"][i].Goal;
      	  option.value = data["Plant Goals"][i].GoalID;
      	  dropdown.add(option);
    	}    
      });  
    }  
  )  
  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  });

  createPlant.addEventListener('click', function() {
    const selectedGoal = dropdown.value;
    if (selectedGoal === 'Choose Goal') { alert('Please select a goal first.'); return; }

    // Load existing saved goals or start fresh
    let savedGoals = JSON.parse(localStorage.getItem('playerGoals') || '[]');

    // Find first empty slot (under 6 goals)
    const emptyIndex = savedGoals.findIndex(g => !g.goalName);
    if (emptyIndex === -1) { alert('All 6 goal slots are full!'); return; }

    savedGoals[emptyIndex] = {
        goalName: dropdown.options[dropdown.selectedIndex].text,
        plantType: 'fern',
        plantStage: 0
    };

    // Add new plant to the array
    savedGoals.push({
        goalName: dropdown.options[dropdown.selectedIndex].text,
        plantType: 'fern',
        plantStage: 0
    });

    localStorage.setItem('playerGoals', JSON.stringify(savedGoals));
    closeModal();
    loadGoalsOntoShelves(); // refresh the shelf display
});

function closeModal() {
    document.getElementById('newPlantModal').style.display = 'none';
}