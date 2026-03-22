import { Plant } from './Classes.js';


export function MakePlant(Goal) {
    return new Plant(Goal);
    //const goalsArray = goalsList["Plant Goals"];
    //const goal = goalsArray.find(g => g.Goal === goalName);
    /*if (goal) {
        return new Plant(goal);
    } else {
        console.error('Goal not found for: ', goal);
        return null;
    }
    */
}

/* export to make functions public - usable */
export function GrowPlant(plant) {
    //plant.progress +=1;
    console.log("Current Growth Amount: " + plant.progress)

    if (plant.progress >= 12) {
        plant.plantStage = 4;
        console.log("Your Plant is fully grown!");
        console.log("Congratulations!! You unlocked a new plant pot!")
    }
    else if (plant.progress >= 9) {
        plant.plantStage = 3;
        console.log("Your Plant has reached its fourth growth stage.");
    } 
    else if (plant.progress >= 6) {
        plant.plantStage = 2;
        console.log("Your Plant has reached its third growth stage.");
    } 
    else if (plant.progress >= 3) {
        plant.plantStage = 1;
        console.log("Your Plant has reached its second growth stage.");
    } 
    else {
        plant.plantStage = 0;
        console.log("Your Plant is at its first growth stage.");
    }
}