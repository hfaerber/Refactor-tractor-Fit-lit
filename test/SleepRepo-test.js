
const chai = require('chai');
const expect = chai.expect;

import sleepData from '../data/sleep-test-data';
import allSleepData from '../data/sleep';
import SleepRepo from '../src/SleepRepo';


describe.only('SleepRepo', () => {

  let sleepRepo, fullSleepRepo;
  beforeEach(() => {
    sleepRepo = new SleepRepo(sleepData);
    fullSleepRepo = new SleepRepo(allSleepData);
  });

  it('should be a function', () => {
    expect(SleepRepo).to.be.a('function');
  });

  it('should should have access the sleep data', () => {
    expect(sleepRepo.sleepData).to.eql(sleepData);
  });

  it('should return the average sleep quality amongst all users', () => {
    expect(sleepRepo.returnAllSleepQuality()).to.equal(2.9);
  });

  it('should return weekly sleep quality averages for user', () => {
    expect(sleepRepo.returnUsersWeeklyTotals(1, 'sleepQuality').length).to.eql(5);
  });

  it('should return weekly sleep hour averages for user', () => {
    expect(sleepRepo.returnUsersWeeklyTotals(1, 'hoursSlept').length).to.eql(5);
  });

  it('should return the users that slept the most hours for a given date', () => {
    expect(sleepRepo.returnLongestSleepers("2019/06/25")).to.eql([2]);
  });

  // it('should return the users who got the most sleep over the last week', () => {
  //   expect(sleepRepo.returnWeeklyLongestSleepers(1)).to.eql([57.3, 2])
  // });

  it('should return sleep data organized by user ID', () => {
    expect(sleepRepo.organizeByUser().length).to.equal(5)
  });


  it('should return any users with an average sleep quality over 3', () => {
    expect(sleepRepo.returnWeeksBestSleepQuality(1, 'sleepQuality')).to.eql([3])
  })


});

