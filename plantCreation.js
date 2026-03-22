import { Plant } from './Classes.js';
import { MakePlant, GrowPlant } from './PlantGrowth.js';

const goalDropdown = document.getElementById('GoalSelection');
const plantContainer = document.getElementById('plantContainer');
const createPlant = document.getElementById("createPlant")
import { loadGoalsOntoShelves } from './game.js';

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
    const selectedValue = dropdown.value;
    const selectedText = dropdown.options[dropdown.selectedIndex].text;

    if (selectedValue === 'Choose Goal') {
        alert('Please select a goal first.');
        return;
    }

    let savedGoals = JSON.parse(localStorage.getItem('playerGoals') || '[]');
    savedGoals = savedGoals.filter(g => g.goalName); // strip empty objects
    savedGoals = savedGoals.slice(0, 6);             // cap at 6

    if (savedGoals.length >= 6) {
        alert('All 6 goal slots are full!');
        return;
    }

    savedGoals.push({
        goalName: selectedText,
        plantType: 'venus-fly-trap', //'fern' 'lily-of-the-valley'
        plantStage: 0
    });

    localStorage.setItem('playerGoals', JSON.stringify(savedGoals));
    document.getElementById('newPlantModal').style.display = 'none';
    loadGoalsOntoShelves();
});

function closeModal() {
    document.getElementById('newPlantModal').style.display = 'none';
}