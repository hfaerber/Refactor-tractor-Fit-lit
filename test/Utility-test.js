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

  beforeEach(() => {
    user = new User(userData[0]);
    utility = new Utility(sleepData, user.id);
  })

  it('should be a function', () => {
    expect(Utility).to.be.a('function');
  });

  it('should be an instance of the class Sleep', () => {
    expect(utility).to.be.an.instanceOf(Utility);
  });

  it('should be able to store sleep data in a property', () => {
    expect(utility.dataSet).to.eql(sleepData);
  });

  it('should be able to store userID in a property', () => {
    expect(utility.userID).to.equal(user.id);
  });

  it('should be able to store a single user\'s data in a property', () => {
    expect(utility.singleUserData.length).to.equal(11);
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

  it('should return a specific stat for a user on a particular date', () => {
    expect(utility.returnIndividualStatForDate('2019/06/15', 'hoursSlept')).to.equal(6.1);
    expect(utility.returnIndividualStatForDate('2019/06/24', 'sleepQuality')).to.equal(1.3);
  });

  it('should return a user\'s all time average for a particular stat', () => {
    expect(utility.returnAvgUserStatAllTime('hoursSlept')).to.equal(7.66);
    expect(utility.returnAvgUserStatAllTime('sleepQuality')).to.equal(2.53);
  });

  it('should return an average for a specific user stat over the final week', () => {
    expect(utility.returnAvgUserStatForWeek(1, 'sleepQuality')).to.equal(2);
    expect(utility.returnAvgUserStatForWeek(1, 'hoursSlept')).to.equal(7);
  });
});
