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
    //const selectedGoal = dropdown.value;
    /*if (!selectedGoal){
        alert("Please select a goal first.")
        return;
    }
        */
       alert("You click the button!")
    
  });