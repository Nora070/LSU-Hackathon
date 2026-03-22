

export class Plant {
  /*  constructor() {
        currentGoalIndex++;
    }
        */
    setGoal (goal) {
        // Plant class initializes with goal data from JSON file
        this.goalId = goal.GoalID;
        this.goalName = goal.Goal;
        this.progress = 0;
        this.plantType = "fern"; // Default plant type, can be updated based on goal
        this.plantStage = 0;
    }
    getPlantImage() {
        return `images/plants/${this.plantType}_stage${this.plantStage + 1}.png`;
    }
}

/*
export const data = {
    playerGoals: new Array(6),
    currentGoalIndex: 0
}

for (let i=0; i<6; i++)
    data.playerGoals[i] = new Plant(); // initialize empty
*/
