import goalData from './PlantGoals.json' assert {type: 'json'}
class Plant {
constructor(goal) {
        this.goalId = goalData.id;
        this.goalName = goalData.goal;
        this.progress = 0;
    }
}