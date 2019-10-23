class Utility {
  constructor(dataSet, userID) {
    this.dataSet = dataSet;
    this.userID = userID;
    this.singleUserData = this.dataSet.filter(stat => stat.userID === this.userID);
  }

  returnWeekDatesOnly() {
    return [...this.singleUserData].splice(-7 * week, 7).map(day => day.date);
  }

  returnWeekOfStatsForUser(week, singleUserData) {
    return [...singleUserData].splice((-7 * week), 7);
  }

  returnIndividualStatForDate(date, metric) {
    return this.singleUserData.find(day => day.date === date)[metric];
  }

  returnAvgUserStatAllTime(metric) {
    return Number((this.singleUserData.reduce((totalMetric, day) => {
      totalMetric += day[metric];
      return totalMetric;
    }, 0) / this.singleUserData.length).toFixed(2));
  }

  returnAvgUserStatForWeek(week, metric) {
    let weekOfData = this.returnWeekDatesOnly(week, this.singleUserData);
    return Math.floor(weekOfData.reduce((totalMetric, eachDay) => {
      totalMetric += eachDay[metric]
      return totalMetric
    }, 0) / 7)
  }
}

export default Utility;
