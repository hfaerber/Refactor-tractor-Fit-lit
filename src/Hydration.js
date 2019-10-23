class Hydration extends Utility {
  constructor(dataSet, userID) {
    super (dataSet, userID);
  }

  returnWeek() {
    return [...this.singleUserData].splice(-7).map(day => day.date);
  }

  returnAverageFluidOunces() {
    return Math.floor(this.singleUserData.reduce((totalOunces, dailyOunces) => {
      totalOunces += dailyOunces.numOunces;
      return totalOunces;
    }, 0) / this.singleUserData.length);
  }

  returnDailyFluidOunces(date) {
    return this.singleUserData.find(ounces => ounces.date === date).numOunces
  }

  returnWeeklyNumOunces() {
    return this.singleUserData.slice(-7).map(day => day.numOunces);
  }

}


export default Hydration;
