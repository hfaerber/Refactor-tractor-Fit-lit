class Utility {
  constructor(dataSet, userID) {
    this.dataSet = dataSet;
    this.userID = userID;
    this.singleUserData = this.dataSet.filter(stat =>
      stat.userID === this.userID);
  }

  returnWeekDatesOnly(date) {
    let findIndexForDate = this.singleUserData.findIndex(stat =>
      stat.date === date);
    return [...this.singleUserData].splice(findIndexForDate - 6, 7).map(day =>
      day.date);
  }

  returnWeekOfStatsForUser(date, singleUserData) {
    let findIndexForDate = this.singleUserData.findIndex(stat =>
      stat.date === date);
    return [...singleUserData].splice(findIndexForDate - 6, 7);
  }

  returnIndividualStatForDate(date, metric) {
    return this.singleUserData.find(day => day.date === date)[metric];
  }

  returnAvgUserStatAllTime(metric) {
    return Number((this.singleUserData.reduce((totalMetric, day) => {
      totalMetric += day[metric];
      return totalMetric;
    }, 0) / this.singleUserData.length).toFixed(1));
  }

  returnAvgUserStatForWeek(date, metric) {
    let weekOfData = this.returnWeekOfStatsForUser(date, this.singleUserData);
    if (metric === 'hoursSlept' || metric === 'sleepQuality') {
      return Number((weekOfData.reduce((totalMetric, eachDay) => {
        totalMetric += eachDay[metric];
        return totalMetric
      }, 0) / 7).toFixed(1))
    } else {
      return Math.round(weekOfData.reduce((totalMetric, eachDay) => {
        totalMetric += eachDay[metric];
        return totalMetric
      }, 0) / 7)
    }
  }
}

export default Utility;
