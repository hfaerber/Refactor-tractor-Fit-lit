import Utility from "./Utility";

class Sleep extends Utility {
  constructor(dataSet, userID) {
    super(dataSet, userID);
  }

  returnWeekOfSleepInfo(date, metric) {
    return this.returnWeekOfStatsForUser(date, this.singleUserData).map(day =>
      day[metric]);
  }
}

export default Sleep;
