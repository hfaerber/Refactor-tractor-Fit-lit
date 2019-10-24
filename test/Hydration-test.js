const chai = require('chai');
const expect = chai.expect;

import hydrationData from '../data/hydration-test-data';
import userData from '../data/users-test-data';

import Hydration from '../src/Hydration';
import User from '../src/User';


describe('Hydration', () => {
  let hydration;
  let user;

  beforeEach(() => {
    user = new User(userData[0])
    hydration = new Hydration(hydrationData, user.id)
  });

  it('should be a function', () => {
    expect(Hydration).to.be.a('function');
  });

  it('should be an instance of the class Hydration', () => {
    expect(hydration).to.be.an.instanceOf(Hydration);
  });

  it('should return the average fluid ounces for a user for all time', () => {
    expect(hydration.returnAverageFluidOunces()).to.equal(62);
  });

  it('should return the amount of ounces consumed for one person over a week', () => {
    expect(hydration.returnWeeklyNumOunces(1)).to.eql([69, 96, 61, 91, 50, 50, 43]);
  });
})
