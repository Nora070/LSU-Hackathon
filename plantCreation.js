import { Plant } from './Classes.js';
import { MakePlant, GrowPlant } from './PlantGrowth.js';
import goalData from './PlantGoals.json' assert {type: 'json'}

const goalDropdown = document.getElementById('goalSelection');
const plantContainer = document.getElementById('plantContainer');

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
    
    	for (let i = 0; i < data["Plant Goals"].length; i++) {
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