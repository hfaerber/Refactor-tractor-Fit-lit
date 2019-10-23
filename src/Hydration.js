class Hydration extends Utility {
  constructor(dataSet, userID) {
    super (dataSet, userID);
  }

  returnAverageFluidOunces() {
    return Math.floor(this.singleUserData.reduce((totalOunces, dailyOunces) => {
      totalOunces += dailyOunces.numOunces;
      return totalOunces;
    }, 0) / this.singleUserData.length);
  }

  returnWeeklyNumOunces() {
    return this.singleUserData.slice(-7).map(day => day.numOunces);
  }

}


export default Hydration;
