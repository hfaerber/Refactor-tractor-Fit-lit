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
  })

  it('should be a function', () => {
    expect(Sleep).to.be.a('function');
  });

  it('should be an instance of the class Sleep', () => {
    expect(sleep).to.be.an.instanceOf(Sleep);
  });

  it('should be able return a week\'s worth of sleep data for a user', () => {
    expect(sleep.returnWeekOfSleepInfo('2019/06/25', 'sleepQuality')).to.eql([1.2, 1.2, 4.2, 3, 1.5, 1.3, 3.7]);
  });

});
