// import { Plant } from './Classes.js';
import { data } from './Classes.js';
let { playerGoals, currentGoalIndex } = data;

export function printGoal() {
    console.log("Current Goal Index: " + currentGoalIndex);
    console.log(playerGoals[currentGoalIndex].goal);
    console.log(playerGoals[currentGoalIndex].plantType);
    console.log(playerGoals[currentGoalIndex].stage);
}
