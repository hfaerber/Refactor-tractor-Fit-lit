import Utility from "./Utility";

class Activity extends Utility {
  constructor(dataSet, userID, userData) {
    super (dataSet, userID);
    this.userData = userData
  }

  returnMilesWalked(date) {
    return Number((this.userData.strideLength * this.singleUserData.find(day => day.date === date).numSteps / 5280).toFixed(2))
  }

  metStepGoal(date) {
    let numSteps = this.singleUserData.find(day => day.date === date).numSteps
    return numSteps >= this.userData.dailyStepGoal
  }

  returnAllStepGoalDays() {
    let stepGoal = this.userData.dailyStepGoal;
    return this.singleUserData.filter(day => day.numSteps >= stepGoal).map(day => day.date);
  }

  returnStairRecord() {
    return [...this.singleUserData].sort((a, b) => b.flightsOfStairs - a.flightsOfStairs)[0].flightsOfStairs
  }

  returnFriendsStepCount() {
    let friends = this.userData.friends.map(friend => this.dataSet.filter(el => el.userID === friend));
    let friendDataForDates = friends.map(friend => [...friend].splice(-7));
    let totalStepsPerFriend = friendDataForDates.map(friend => friend.reduce((totalSteps, day) => {
      totalSteps += day.numSteps
      return totalSteps
    }, 0));
    var stepObj = this.userData.friends.reduce((friendSteps, friend, index) => {
      friendSteps[friend] = totalStepsPerFriend[index];
      return friendSteps
    }, {})
    return [stepObj, this.userData.friends[totalStepsPerFriend.indexOf(Math.max(...totalStepsPerFriend))]]
  }

  returnThreeDayStepStreak() {
    let specificUser = this.singleUserData.reverse();
    let dates = [];
    specificUser.some((user, i, specificUser) => {
      if (specificUser[i].numSteps < specificUser[i + 1].numSteps && specificUser[i + 1].numSteps < specificUser[i + 2].numSteps) {
        dates.push(specificUser[i].date);
        dates.push(specificUser[i + 1].date);
        dates.push(specificUser[i + 2].date);
      }
      return dates.length === 3;
    });
    return dates;
  }

  returnTwoDayStairStreak() {
    var specificUser = this.singleUserData.reverse();
    let dates = [];
    specificUser.some((user, i, specificUser) => {
      if (specificUser[i].flightsOfStairs > specificUser[i + 1].flightsOfStairs) {
        dates.push(specificUser[i].date);
        dates.push(specificUser[i + 1].date);
      }
      return dates.length === 2;
    });
    return dates;
  }
}

export default Activity;
