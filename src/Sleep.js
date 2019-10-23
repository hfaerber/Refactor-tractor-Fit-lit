class Sleep extends Utility {
  constructor(dataSet, userID) {
    super (dataSet, userID);
  }

  returnWeekOfData(week, userData) {
    return [...userData].splice((-7 * week), 7);
  }

  returnWeek(week) {
    return [...this.singleUserData].splice(-7 * week, 7).map(day => day.date);
  }

  returnAvgSleepInfo(metric) {
    return Number((this.singleUserData.reduce((totalMetric, day) => {
      totalMetric += day[metric];
      return totalMetric;
    }, 0) / this.singleUserData.length).toFixed(2));
  }

  returnDaysSleepInfo(date, metric) {
    return this.singleUserData.find(day => day.date === date)[metric];
  }

  returnWeekOfSleepInfo(week, metric) {
    return this.returnWeekOfData(week, this.singleUserData).map(day => day[metric]);
  }
}


export default Sleep;
