import { Plant } from './Classes.js';
import goalData from './PlantGoals.json' assert {type: 'json'}


function makePlant(goalId, goalsList) {
    const goalsArray = goalsList["Plant Goals"];
    const goal = goalsArray.find(g => g.GoalID === goalId);
    if (goal) {
        return new Plant(goal);
    } else {
        console.error('Goal not found for: ', goalId);
        return null;
    }
}

function GrowPlant() {
    plant.progress +=1;
    console.log("Current Growth Amount: " + plant.progress)

    if (plant.progress >= 12) {
        plant.plantStage = 3;
        console.log("Your Plant is fully grown!");
    }
    else if (plant.progress >= 8) {
        plant.plantStage = 2;
        console.log("Your Plant has reached its third growth stage.");
    } 
    else if (plant.progress >= 4) {
        plant.plantStage = 1;
        console.log("Your Plant has reached its second growth stage.");
    } 
    else {
        console.log("Your Plant is at its first growth stage.");
    }
    
    if (plant.plantStage === 3) {
        console.log("Congratulations!! You unlocked a new plant pot!")
    }
}