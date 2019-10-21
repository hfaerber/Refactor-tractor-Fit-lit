class ActivityRepo {
  constructor(activityData, userData) {
    this.activityData = activityData;
    this.userData = userData;
  }

  returnAverage(date, property) {
    let amountPerDay = this.activityData.filter(day => day.date === date);

    return Number((amountPerDay.reduce((total, day) => {
      total += day[property];
      return total;
    }, 0) / amountPerDay.length).toFixed(0));
  }

  returnMostActive(metric) {
    let person = [...this.activityData].sort((a, b) => b[metric] - a[metric])[0].userID;
    let activity = [...this.activityData].sort((a, b) => b[metric] - a[metric])[0][metric];
    return [this.userData.find(user => user.id === person).name, activity];
  }
}

export default ActivityRepo;
