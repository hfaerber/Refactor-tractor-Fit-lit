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
    activity = new Activity(activityData, user.id, user)
  });

  it('should be a function', () => {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of the class Activity', () => {
    expect(activity).to.be.an.instanceOf(Activity);
  });

  it('should return the miles walked by a specific user for a specific day', () => {
    expect(activity.returnMilesWalked('2019/06/26')).to.equal(6.60);
  });

  describe('metStepGoal', () => {

    it('should return false if they did not meet their step goal for a date', () => {
      expect(activity.metStepGoal('2019/06/15')).to.equal(false);
    });

    it('should return true if they did  meet their step goal for a date', () => {
      expect(activity.metStepGoal("2019/06/17")).to.equal(true);
    });

  })

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
