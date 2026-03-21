import goalData from '.\PlantGoals.json' assert {type: 'json'}
let plantProgress = 0;

function DisplayGoals() {
console.log(goalData);
console.log(goalData[0].Goal);
}

function GrowPlant() {
    let playerResponse = true;
    if (playerResponse == true) {
        plantProgress +=1;
    }
    console.log("Current Growth Amount: " + plantProgress)
}

function GrowthStage () {
    if ()
}