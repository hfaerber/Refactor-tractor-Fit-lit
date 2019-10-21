const chai = require('chai');
const expect = chai.expect;

import sleepData from '../data/sleep-test-data';
import userData from '../data/users-test-data';
import allSleepData from '../data/sleep';

import Sleep from '../src/Sleep';
import User from '../src/User';


describe('Sleep', () => {

  let user, sleep, fullSleep;
  beforeEach(() => {
    user = new User(userData[0]);
    sleep = new Sleep(sleepData, user.id);
    fullSleep = new Sleep(allSleepData, user.id);
  })

  it('should be a function', () => {
    expect(Sleep).to.be.a('function');
  });

  it('should be an instance of the class Sleep', () => {
    expect(sleep).to.be.an.instanceOf(Sleep);
  });

  it('should be able to store sleep data as a parameter', () => {
    expect(sleep.sleepData).to.eql(sleepData);
  });

  it('should be able to store user id as a parameter', () => {
    expect(sleep.userID).to.equal(user.id);
  });

  it('should return an array of dates for any desired week', () => {
    expect(sleep.returnWeek(1)).to.eql([
      "2019/06/19",
      "2019/06/20",
      "2019/06/21",
      "2019/06/22",
      "2019/06/23",
      "2019/06/24",
      "2019/06/25",
    ]);
  });

  it('should return the average sleep hours for a single user over all time', () => {
    expect(sleep.returnAvgSleepInfo('hoursSlept')).to.equal(7.66);
  });

  it('should return the average sleep quality over all time for a single user', () => {
    expect(sleep.returnAvgSleepInfo('sleepQuality')).to.equal(2.53);
  });

  it('should return how many hours slept for a specific day', () => {
    expect(sleep.returnDaysSleepInfo('2019/06/15', 'hoursSlept')).to.equal(6.1);
  });

  it('should return sleep quality for a specific day', () => {
    expect(sleep.returnDaysSleepInfo('2019/06/15', 'sleepQuality')).to.equal(2.2);
  });

  it('should return hours slept each day for week for a specific user', () => {
    expect(fullSleep.returnWeekOfSleepInfo(2, 'hoursSlept')).to.eql([7.3, 5.1, 8.6, 10.5, 9.1, 6.5, 6.8]);
  });

  it('should return quality of sleep for the week for a specific user', () => {
    expect(fullSleep.returnWeekOfSleepInfo(2, 'sleepQuality')).to.eql([4.8, 4.7, 3.7, 1.8, 1.5, 4.2, 2]);
  });

});