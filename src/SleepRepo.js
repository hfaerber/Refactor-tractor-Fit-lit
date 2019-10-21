class SleepRepo {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  returnAllSleepQuality() {
    return Number((this.sleepData.reduce((totalQuality, eachPerson) => {
      totalQuality += eachPerson.sleepQuality;
      return totalQuality;
    }, 0) / this.sleepData.length).toFixed(1));
  }

  organizeByUser() {
    let dataByUser = this.sleepData.reduce((arr, user) => {
      if (!arr[user.userID - 1]) {
        arr[user.userID - 1] = [user];
      } else {
        arr[user.userID - 1].push(user);
      }
      return arr;
    }, []);
    return dataByUser
  }

  returnAboveAverageSleepers(week) {
    let dataByUser = this.organizeByUser();
    let avgSleepQualityPerUser = dataByUser.map(user => [...user].splice(-7 * week, 7)).map(user => user.reduce((totalQuality, day) => {
      totalQuality += day.sleepQuality;
      return totalQuality;
    }, 0)).map(user => Number((user / 7).toFixed(2)));

    let goodSleepers = [];
    avgSleepQualityPerUser.forEach((user, index) => {
      if (user >= 3) {
        goodSleepers.push(index + 1);
      }
    });
    return goodSleepers;
  }

  returnWeeklyLongestSleepers(week) {
    let dataByUser = this.organizeByUser();
    let avgSleepHoursPerUser = dataByUser.map(user => [...user].splice(-7 * week, 7)).map(user => user.reduce((totalHours, day) => {
      totalHours += day.hoursSlept;
      return totalHours;
    }, 0));
    return [Math.max(...avgSleepHoursPerUser), avgSleepHoursPerUser.indexOf(Math.max(...avgSleepHoursPerUser)) + 1];
  }


  returnLongestSleepers(date) {
    var dateData = this.sleepData.filter(day => day.date === date);
    var sortedSleepers = [...dateData].sort((a, b) => b.hoursSlept - a.hoursSlept);
    return sortedSleepers.filter(day => day.hoursSlept === sortedSleepers[0].hoursSlept).map(user => user.userID);
  }
}



export default SleepRepo;