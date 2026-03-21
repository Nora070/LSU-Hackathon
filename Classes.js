export class Plant {
constructor(goal) {     //Plant class initializes with goal data from JSON file
        this.goalId = goal.GoalID;
        this.goalName = goal.Goal;
        this.progress = 0;
        this.plantStage = 0;
    }
}