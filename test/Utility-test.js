const chai = require('chai');
const expect = chai.expect;

import allSleepData from '../data/sleep';
import sleepData from '../data/sleep-test-data';
import userData from '../data/users-test-data';

import Utility from '../src/Utility';
import User from '../src/User';


describe('Utility', () => {
  let user;
  let utility;
  let fullSizeUtility;

  beforeEach(() => {
    user = new User(userData[0]);
    utility = new Utility(sleepData, user.id);
    fullSizeUtility = new Utility(allSleepData, user.id);
  })

  it('should be a function', () => {
    expect(Utility).to.be.a('function');
  });

  it('should be an instance of the class Sleep', () => {
    expect(utility).to.be.an.instanceOf(Utility);
  });

  it('should be able to store sleep data as a property', () => {
    expect(utility.dataSet).to.eql(sleepData);
  });

  it('should be able to store userID as a property', () => {
    expect(utility.userID).to.equal(user.id);
  });

  it('should return an array of dates for the final week', () => {
    expect(utility.returnWeekDatesOnly(1)).to.eql([
      "2019/06/19",
      "2019/06/20",
      "2019/06/21",
      "2019/06/22",
      "2019/06/23",
      "2019/06/24",
      "2019/06/25",
    ]);
  });

  it('should return a user\'s sleep data for the final week', () => {
    expect(utility.returnWeekOfStatsForUser(1, utility.singleUserData)).to.eql([
      {
        "userID": 1,
        "date": "2019/06/19",
        "hoursSlept": 10.7,
        "sleepQuality": 1.2
      },
      {
        "userID": 1,
        "date": "2019/06/20",
        "hoursSlept": 9.3,
        "sleepQuality": 1.2
      },
      {
        "userID": 1,
        "date": "2019/06/21",
        "hoursSlept": 7.8,
        "sleepQuality": 4.2
      },
      {
        "userID": 1,
        "date": "2019/06/22",
        "hoursSlept": 7,
        "sleepQuality": 3
      },
      {
        "userID": 1,
        "date": "2019/06/23",
        "hoursSlept": 7.8,
        "sleepQuality": 1.5
      },
      {
        "userID": 1,
        "date": "2019/06/24",
        "hoursSlept": 8,
        "sleepQuality": 1.3
      },
      {
        "userID": 1,
        "date": "2019/06/25",
        "hoursSlept": 5.1,
        "sleepQuality": 3.7
      }
    ]);
  });

  it.skip('should return the average sleep quality over all time for a single user', () => {
    expect(utility.returnAvgSleepInfo('sleepQuality')).to.equal(2.53);
  });

  it.skip('should return how many hours slept for a specific day', () => {
    expect(utility.returnDaysSleepInfo('2019/06/15', 'hoursSlept')).to.equal(6.1);
  });

  it.skip('should return sleep quality for a specific day', () => {
    expect(utility.returnDaysSleepInfo('2019/06/15', 'sleepQuality')).to.equal(2.2);
  });

  it.skip('should return hours slept each day for week for a specific user', () => {
    expect(fullSizeUtility.returnWeekOfSleepInfo(2, 'hoursSlept')).to.eql([7.3, 5.1, 8.6, 10.5, 9.1, 6.5, 6.8]);
  });

  it.skip('should return quality of sleep for the week for a specific user', () => {
    expect(fullSizeUtility.returnWeekOfSleepInfo(2, 'sleepQuality')).to.eql([4.8, 4.7, 3.7, 1.8, 1.5, 4.2, 2]);
  });

});
