class Sleep extends Utility {
  constructor(dataSet, userID) {
    super (dataSet, userID);
  }

  returnWeekOfSleepInfo(week, metric) {
    return this.returnWeekOfData(week, this.singleUserData).map(day => day[metric]);
  }
}


export default Sleep;
