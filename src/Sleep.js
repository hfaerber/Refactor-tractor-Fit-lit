class Sleep {
  constructor(sleepData, userID) {
    this.sleepData = sleepData;
    this.userID = userID;
  }

  findUser() {
    return this.sleepData.filter(user => user.userID === this.userID);
  }

  returnWeekOfData(week, userData) {
    return [...userData].splice((-7 * week), 7);
  }

  returnWeek(week) {
    var specificUser = this.findUser()
    return [...specificUser].splice(-7 * week, 7).map(day => day.date);
  }

  returnAvgSleepInfo(metric) {
    let specificUser = this.findUser();
    return Number((specificUser.reduce((totalMetric, day) => {
      totalMetric += day[metric];
      return totalMetric;
    }, 0) / specificUser.length).toFixed(2));
  }

  returnDaysSleepInfo(date, metric) {
    let specificUser = this.findUser();
    return specificUser.find(day => day.date === date)[metric];
  }

  returnWeekOfSleepInfo(week, metric) {
    let specificUser = this.findUser();
    return this.returnWeekOfData(week, specificUser).map(day => day[metric]);
  }
}


export default Sleep;