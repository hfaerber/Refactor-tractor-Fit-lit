
import $ from 'jquery';

import Utility from "./Utility";
import UserRepo from "./UserRepo";
import User from "./User";
import Hydration from "./Hydration";
import Sleep from "./Sleep";
import SleepRepo from "./SleepRepo";
import Activity from "./Activity";
import ActivityRepo from "./ActivityRepo";

import activityData from "../data/activity";
import allSleepData from "../data/sleep";
import userData from "../data/users";
import hydrationData from "../data/hydration";

// An example of how you tell webpack to use a CSS (SCSS) file
import './scss/_normalize.scss';
import './scss/styles.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/appointment.svg'
import './images/drop.svg'
import './images/footsteps-silhouette-variant.svg'
import './images/goal.svg'
import './images/logo.png'
import './images/moon.svg'
import './images/road.svg'
import './images/screencapture.png'
import './images/stopwatch.svg'
import './images/trophy.svg'

let apiData = [];

//Generate random user
const uniqueUserIndex = Math.floor(Math.random() * (50 - 1 + 1)) + 1;

//Repo variables
const userRepo = new UserRepo(userData);
const sleepRepo = new SleepRepo(allSleepData);
const activityRepo = new ActivityRepo(activityData, userData);

//Individual Class Repos
const user = new User(userData[uniqueUserIndex]);
const hydration = new Hydration(hydrationData, user.id);
const sleep = new Sleep(allSleepData, user.id);
const activity = new Activity(activityData, user.id, user);

//Date
const date = activityData.reverse()[0].date;
const dateObject = new Date(date);
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

const formattedDate = dateObject.toLocaleString('en', options)

function dropYear(dates) {
  const reformattedDates = dates.map(date => {
    const splitDate = date.split('/');
    return [splitDate[1], splitDate[2]].join('/');
  })
  return reformattedDates
}
// $(document).ready(function () { <I think We dont need this since we have webpack now

// function to fetch data from API
// function fetchData(suffix) {
//   const baseUrl = "https://fe-apps.herokuapp.com/api/v1/fitlit/1908/";
//   const promise = fetch(baseUrl+`${suffix}`)
//     .then(response => response.json())
//   return promise
// }




// function fetchDataPost(suffix) {
//   const baseUrl = "https://fe-apps.herokuapp.com/api/v1/fitlit/1908/";
//   const promise = fetch(baseUrl+`${suffix}`;
//   return promise
// }
//
// function postData() {
//   fetchDataPost('sleep/sleepData')


fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/'sleep/sleepData", {
    {
      method: 'Post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
      {
        "userId": whateverIsONPageLoad,
        "date": dateVariable,
        "hoursSlept": userInput1.value,
        "sleepQuality": userInput2.value,
      })
    })
      .then(response => response.json());
      .then(data => console.log(data))
      .catch(error => console.log('error'));
};

// Build the post object in a variable (ex: sleepBody, activityBody, etc.)

// fetchData('sleep/sleepData' {
//   method: 'Post',
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify({"": })
// })
//
// fetchData('activity/activityData' {
//   method: 'Post',
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify({"": })
// })
//
// fetchData('hydration/hydrationData' {
//   method: 'Post',
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify({"": })
// })

  //Packery Items
  // let $grid = $('.grid').packery({
  //   itemSelector: '.grid-item',
  //   columnWidth: 30,
  //   rowHeight: 30,
  //   gutter: 4,
  // });

  // let $draggable = $('.draggable').draggabilly({
  //   containment: true
  // });

  // $grid.find('.grid-item').each(function (i, gridItem) {
  //   let draggie = new Draggabilly(gridItem)
  //   $grid.packery('bindDraggabillyEvents', draggie)
  // });


  // Function to find user name
  function findUserName(id) {
    return userData.find(user => user.id === id).name;
  }

  //User Section
  $('.username').text(`${user.returnUserName()}`)

  //Date Section
  $('.date').text(`${formattedDate}`);

  //Hydration
  $('.water-consumed').text(`${hydration.returnIndividualStatForDate(date, "numOunces")} ounces \n\n`);

  const weeklyOuncesChart = new Chart(document.getElementById('water-consumed-week').getContext('2d'), {
    type: 'horizontalBar',
    data: {
      labels: dropYear(hydration.returnWeekDatesOnly(1)),
      datasets: [{
        data: hydration.returnWeeklyNumOunces(),
        backgroundColor: [
          'rgba(92, 117, 218, 0.6)',
          'rgba(242, 188, 51, 0.6)',
          'rgba(126, 221, 255, 0.6)',
          'rgba(92, 117, 218, 0.6)',
          'rgba(242, 188, 51, 0.6)',
          'rgba(126, 221, 255, 0.6)',
          'rgba(92, 117, 218, 0.6)'
        ],
      }]
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: '# of Ounces'
          }
        }]
      }
    }
  });

  //Sleep
  $('.hours-slept-day').text(`${sleep.returnIndividualStatForDate(date, 'hoursSlept')} hours | ${sleep.returnIndividualStatForDate(date, 'sleepQuality')} quality`);

  const weeklySleepChart = new Chart(document.getElementById('sleep-week').getContext('2d'), {
    type: 'line',
    data: {
      labels: dropYear(sleep.returnWeekDatesOnly(1)),
      datasets: [{
        data: sleep.returnWeekOfSleepInfo(1, 'hoursSlept'),
        label: "Sleep Hours",
        borderColor: "rgba(92, 117, 218, 0.6)",
        fill: false,
        lineTension: 0.1
      },
      {
        data: Array(7).fill(sleep.returnAvgUserStatForWeek(1, 'hoursSlept')),
        label: "Average Hours of Sleep",
        borderColor: "rgba(92, 117, 218, 0.6)",
        fill: false,
        borderDash: [10, 5]
      },
      {
        data: sleep.returnWeekOfSleepInfo(1, 'sleepQuality'),
        label: "Quality of Sleep",
        borderColor: "rgba(242, 188, 51, 0.6)",
        fill: false,
        lineTension: 0.1
      },
      {
        data: Array(7).fill(sleep.returnAvgUserStatForWeek(1, 'sleepQuality')),
        label: "Average Quality of Sleep",
        borderColor: "rgba(242, 188, 51, 0.6)",
        fill: false,
        borderDash: [10, 5]
      }
      ]

    },
    options: {
      elements: {
        point: {
          radius: 0
        }
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: "rgba(92, 117, 218, 0.6)"
          },
          scaleLabel: {
            display: true,
            labelString: 'hours'
          },

        }, {
          id: 'Quality of Sleep',
          type: 'linear',
          position: 'right',
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 10,
            fontColor: "rgba(242, 188, 51, 0.6)"
          },
          scaleLabel: {
            display: true,
            labelString: 'quality'
          }
        }]
      }
    }
  });

  $('.longest-sleepers').text(`${findUserName(sleepRepo.returnWeeklyLongestSleepers(1, 'hoursSlept')[1])}: ${sleepRepo.returnWeeklyLongestSleepers(1, 'hoursSlept')[0]} hours`);

  //Activity Section

  var bar = new ProgressBar.Circle('.number-of-steps-day', {
    color: '#aaa',
    svgStyle: {
      display: 'block',
      width: '100%'
    },
    strokeWidth: 5,
    trailWidth: 2,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: true
    },
    from: {
      color: '#fff940',
      width: 2
    },
    to: {
      color: '#f2bc33',
      width: 5
    },

    step(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = circle.value();
      if (value === 0) {
        circle.setText('');
      } else {
        circle.setText(`${activity.returnIndividualStatForDate(date, 'numSteps')} steps`);
      }

    }
  });

  let percentSteps = activity.returnIndividualStatForDate(date, 'numSteps') / user.dailyStepGoal;
  bar.animate(percentSteps > 1 ? percentSteps = 1 : percentSteps); // Number from 0.0 to 1.0

  $('.number-of-steps-goal').text(`Step Goal: ${user.dailyStepGoal}`);
  $('.avg-number-of-steps-goal').text(`Average Step Goal: ${userRepo.returnAverageStepGoal()}`);
  $('.number-of-minutes-active-day').text(`${activity.returnIndividualStatForDate(date, 'minutesActive')}`);
  $('.average-minutes-active').text(`${activityRepo.returnAverage(date, 'minutesActive')}`)
  $('.distance').text(`${activity.returnIndividualStatForDate(date, 'numSteps')}`);
  $('.average-distance').text(`${activityRepo.returnAverage(date, 'numSteps')}`)
  $('.stairs').text(`${activity.returnIndividualStatForDate(date, 'flightsOfStairs')}`);
  $('.average-stairs').text(`${activityRepo.returnAverage(date, 'flightsOfStairs')}`)
  $('.distance-in-miles').text(`${activity.returnMilesWalked()} Miles`);
  $('.most-active').text(`${activityRepo.returnMostActive('minutesActive')[0]}: ${activityRepo.returnMostActive('minutesActive')[1]} minutes`);
  $('.week-review-minutes').text(`${activity.returnAvgUserStatForWeek(1, 'minutesActive')} minutes active`);
  $('.week-review-steps').text(`${activity.returnAvgUserStatForWeek(1, 'numSteps')} steps taken`);
  $('.week-review-stairs').text(`${activity.returnAvgUserStatForWeek(1, 'flightsOfStairs')} flights of stairs`);

  // Friends

  let userIDs = Object.keys(activity.returnFriendsStepCount()[0]);

  function insertFriendSteps() {
    let list = `<ul class="friends_ul">`
    let highestStepCountUserId = Number(activity.returnFriendsStepCount()[1]);
    let highestStepCountUserName = findUserName(highestStepCountUserId);
    userIDs.forEach(userID => {
      let userName = findUserName(Number(userID));
      list += `<li class="friends_li">
             <p class="friends--steps"><b>${userName}</b>:</p>
             <p class="friends-steps-number">${activity.returnFriendsStepCount()[0][userID]} steps</p>`;
    });

    list += `<li class="friends_li">
            <p class="friends--steps"><b>Highest step count:</b>
            ${highestStepCountUserName}</p>`;
    list += `</ul>`;
    return list;
  }

  $('.friends-step').html(`${insertFriendSteps()}`);

  // Challenges

  function insertStepStreak() {
    let list = `<ul class="steps_ul">`
    activity.returnThreeDayStepStreak().forEach(day => {
      list += `<li class="date_li">
             <p class="dates"> ${day}`
    })
    list += `</ul>`;
    return list;
  }

  $('.increasing-steps').html(`${insertStepStreak()}`);

  function insertStairStreak() {
    let list = `<ul class="stairs_ul">`
    activity.returnTwoDayStairStreak().forEach(day => {
      list += `<li class="date_li">
             <p class="dates"> ${day}`
    })
    list += `</ul>`;
    return list;
  }

  $('.increasing-stairs').html(`${insertStairStreak()}`);

// })
