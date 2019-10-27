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

  returnUsersWeeklyTotals(date, metric) {
  let dataByUser = this.organizeByUser();
  let usersWeeklyTotals = dataByUser.map(user => [...user].splice((user.findIndex(stat => stat.date === date)- 6), 7)).map(user => user.reduce((total, day) => {
    total += day[metric];
    return total;
  }, 0))
  return usersWeeklyTotals
}


  returnWeeksBestSleepQuality(date, metric) {
    let weekTotals = this.returnUsersWeeklyTotals(date, metric);
    let weekAverages = weekTotals.map(user => Number((user / 7).toFixed(2)));
    let goodSleepers = [];
    weekAverages.forEach((user, index) => {
      if (user >= 3) {
        goodSleepers.push(index + 1);
      }
    });
    return goodSleepers
  }

  returnWeeklyLongestSleepers(date, metric) {
    let totalSleepPerUser = this.returnUsersWeeklyTotals(date, metric)
    return [Number(Math.max(...totalSleepPerUser).toFixed(1)), totalSleepPerUser.indexOf(Math.max(...totalSleepPerUser)) + 1];
  }


  returnLongestSleepers(date) {
    var dateData = this.sleepData.filter(day => day.date === date);
    var sortedSleepers = [...dateData].sort((a, b) => b.hoursSlept - a.hoursSlept);
    return sortedSleepers.filter(day => day.hoursSlept === sortedSleepers[0].hoursSlept).map(user => user.userID);
  }
}



export default SleepRepo;
