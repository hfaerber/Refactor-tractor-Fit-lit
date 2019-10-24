const chai = require('chai');
const expect = chai.expect;

import activityData from '../data/activity-test-data';
import userData from '../data/users-test-data';

import Activity from '../src/Activity';
import User from '../src/User';


describe('Activity', () => {
  let user;
  let activity;

  beforeEach(() => {
    user = new User(userData[0])
    activity = new Activity(activityData, user)
  });

  it('should be a function', () => {
    expect(Activity).to.be.a('function');
  });

  it('should have access to userData', () => {
    expect(activity.user).to.eql(userData[0]);
  });

  it('should have access to activityData', () => {
    expect(activity.activityData).to.eql(activityData);
  });

  it('should be able to specify specific user', () => {
    expect(activity.findUser()).to.eql([
  { userID: 1,
    date: '2019/06/15',
    numSteps: 3577,
    minutesActive: 140,
    flightsOfStairs: 16 },
  { userID: 1,
    date: '2019/06/16',
    numSteps: 6637,
    minutesActive: 175,
    flightsOfStairs: 36 },
  { userID: 1,
    date: '2019/06/17',
    numSteps: 14329,
    minutesActive: 168,
    flightsOfStairs: 18 },
  { userID: 1,
    date: '2019/06/18',
    numSteps: 4419,
    minutesActive: 165,
    flightsOfStairs: 33 },
  { userID: 1,
    date: '2019/06/19',
    numSteps: 8429,
    minutesActive: 275,
    flightsOfStairs: 2 },
  { userID: 1,
    date: '2019/06/20',
    numSteps: 6000,
    minutesActive: 140,
    flightsOfStairs: 36 },
  { userID: 1,
    date: '2019/06/21',
    numSteps: 6760,
    minutesActive: 135,
    flightsOfStairs: 6 },
  { userID: 1,
    date: '2019/06/22',
    numSteps: 10289,
    minutesActive: 119,
    flightsOfStairs: 6 },
  { userID: 1,
    date: '2019/06/23',
    numSteps: 13928,
    minutesActive: 218,
    flightsOfStairs: 21 },
  { userID: 1,
    date: '2019/06/24',
    numSteps: 7186,
    minutesActive: 25,
    flightsOfStairs: 15 },
  { userID: 1,
    date: '2019/06/25',
    numSteps: 3093,
    minutesActive: 185,
    flightsOfStairs: 25 },
  { userID: 1,
    date: '2019/06/26',
    numSteps: 8105,
    minutesActive: 219,
    flightsOfStairs: 28 } ]);
  });

  it('should return a weeks worth of user activity stats', () => {
    expect(activity.returnWeekOfData(1, activity.findUser())).to.eql([
  { userID: 1,
    date: '2019/06/20',
    numSteps: 6000,
    minutesActive: 140,
    flightsOfStairs: 36 },
  { userID: 1,
    date: '2019/06/21',
    numSteps: 6760,
    minutesActive: 135,
    flightsOfStairs: 6 },
  { userID: 1,
    date: '2019/06/22',
    numSteps: 10289,
    minutesActive: 119,
    flightsOfStairs: 6 },
  { userID: 1,
    date: '2019/06/23',
    numSteps: 13928,
    minutesActive: 218,
    flightsOfStairs: 21 },
  { userID: 1,
    date: '2019/06/24',
    numSteps: 7186,
    minutesActive: 25,
    flightsOfStairs: 15 },
  { userID: 1,
    date: '2019/06/25',
    numSteps: 3093,
    minutesActive: 185,
    flightsOfStairs: 25 },
  { userID: 1,
    date: '2019/06/26',
    numSteps: 8105,
    minutesActive: 219,
    flightsOfStairs: 28 } ]);
  });

  it('should return the number of steps for specific user for a specific day', () => {
    expect(activity.returnNumStepsDay("2019/06/17")).to.equal(14329);
  });

  it('should return the miles walked by a specific user for a specific day', () => {
    expect(activity.returnMilesWalked()).to.equal(6.60);
  });

  it('should return number of flights of stairs climbed by a specific user for a specific day', () => {
    expect(activity.returnDaysActivityInfo("2019/06/17", 'flightsOfStairs')).to.equal(18);
  });

  it('should return the minutes active for a day', () => {
    expect(activity.returnDaysActivityInfo("2019/06/26", 'minutesActive')).to.equal(219);
  });

  it('should return the average minutes active for a week', () => {
    expect(activity.returnAverageActivityForWeek(1, 'minutesActive')).to.equal(148);
  });

  it('should return the average steps for a week', () => {
    expect(activity.returnAverageActivityForWeek(1, 'numSteps')).to.equal(7908);
  });

  it('should return the average steps for a week', () => {
    expect(activity.returnAverageActivityForWeek(1, 'flightsOfStairs')).to.equal(19);
  });

  it('should return false if they did not meet their step goal for a date', () => {
    expect(activity.metStepGoal('2019/06/15')).to.equal(false);
  });


  it('should return true if they did  meet their step goal for a date', () => {
    expect(activity.metStepGoal("2019/06/17")).to.equal(true);
  });

  it('should return all days where exceeded step goal ', () => {
    expect(activity.returnAllStepGoalDays()).to.eql(['2019/06/17', '2019/06/22', '2019/06/23']);
  });

  it('should return alltime stair climbing record ', () => {
    expect(activity.returnStairRecord()).to.equal(36);
  });

  it('should return all friends\' step count for the week ', () => {
    expect(activity.returnFriendsStepCount()[0]).to.eql({
      '2': 56526,
      '3': 46615,
      '4': 63243
    });
  });

  it('should return friend with most steps ', () => {
    expect(activity.returnFriendsStepCount()[1]).to.equal(4);
  });

  it('should return back the dates of what days had increasing steps for 3 or more days', () => {
    expect(activity.returnThreeDayStepStreak()).to.eql(['2019/06/25', '2019/06/24', '2019/06/23']);
  });

  it('should return back the dates of what days had increasing floors climbed for 2 or more days', () => {
    expect(activity.returnTwoDayStairStreak()).to.eql(['2019/06/26', '2019/06/25']);
  });

  it('should test inheritance', () => {
    expect(activity.returnIndividualStatForDate('2019/06/15', 'numSteps')).to.equal(3577);
    expect(activity.returnIndividualStatForDate('2019/06/24', 'flightsOfStairs')).to.equal(15);
  });

});
