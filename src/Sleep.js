import Utility from "./Utility";

class Sleep extends Utility {
  constructor(dataSet, userID) {
    super(dataSet, userID);
  }

  returnWeekOfSleepInfo(week, metric) {
    return this.returnWeekOfStatsForUser(week, this.singleUserData).map(day =>
      day[metric]);
  }
}

export default Sleep;
