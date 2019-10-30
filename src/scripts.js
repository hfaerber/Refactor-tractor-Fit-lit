import $ from 'jquery';
import Utility from "./Utility";
import UserRepo from "./UserRepo";
import User from "./User";
import Hydration from "./Hydration";
import Sleep from "./Sleep";
import SleepRepo from "./SleepRepo";
import Activity from "./Activity";
import ActivityRepo from "./ActivityRepo";
import './scss/_normalize.scss';
import './scss/styles.scss';
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

//Generate random user
const uniqueUserID = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
//Date
let today = new Date();
findTodaysDate();

function findTodaysDate() {
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  today = `${yyyy}/${mm}/${dd}`;
}

const dateObject = new Date(today);
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
//Date Section
$('.date').text(`${formattedDate}`);

// Function to fetch data from API
function fetchData(suffix) {
  const baseUrl = "https://fe-apps.herokuapp.com/api/v1/fitlit/1908/";
  const promise = fetch(baseUrl + `${suffix}`)
    .then(response => response.json())
  return promise
}

// Fetch userData
fetchData('users/userData')
  .then(userData => {
    const userRepo = new UserRepo(userData.userData);
    const user = new User(userRepo.returnUserData(uniqueUserID));

    // Function to find user name
    function findUserName(id) {
      return userData.userData.find(user => user.id === id).name;
    }

    //User Section
    $('.username').text(`${user.returnUserName()}`)

    // Fetch sleepData
    fetchData('sleep/sleepData')
      .then(sleepData => {
        const sleepRepo = new SleepRepo(sleepData.sleepData);
        const sleep = new Sleep(sleepData.sleepData, user.id);

        //Sleep
        $('.hours-slept-day').text(`${sleep.returnIndividualStatForDate(today,
          'hoursSlept')} hours | ${sleep.returnIndividualStatForDate(today,
          'sleepQuality')} quality`);

    const weeklySleepChart = new Chart(document.getElementById('sleep-week')
          .getContext('2d'), {
          type: 'line',
          data: {
            labels: dropYear(sleep.returnWeekDatesOnly(today)),
            datasets: [{
              data: sleep.returnWeekOfSleepInfo(today, 'hoursSlept'),
              label: "Sleep Hours",
              borderColor: "rgba(92, 117, 218, 0.6)",
              fill: false,
              lineTension: 0.1
            },

            {
              data: Array(7).fill(sleep.returnAvgUserStatForWeek
                (today, 'hoursSlept')),
              label: "Average Hours of Sleep",
              borderColor: "rgba(92, 117, 218, 0.6)",
              fill: false,
              borderDash: [10, 5]
            },
            {
              data: sleep.returnWeekOfSleepInfo(today, 'sleepQuality'),
              label: "Quality of Sleep",
              borderColor: "rgba(11, 117, 2, 0.6)",
              fill: false,
              lineTension: 0.1
            },
            {
              data: Array(7).fill(sleep.returnAvgUserStatForWeek
                (today, 'sleepQuality')),
              label: "Average Quality of Sleep",
              borderColor: "rgba(11, 117, 2, 0.6)",
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
                  fontColor: "rgba(11, 117, 2, 0.6)"
                },
                scaleLabel: {
                  display: true,
                  labelString: 'quality'
                }
              }]
            }
          }
        });

        $('.longest-sleeper').text(`${findUserName(
          sleepRepo.returnWeeklyLongestSleeper(today, 'hoursSlept')[1])}:
            ${sleepRepo.returnWeeklyLongestSleeper(today, 'hoursSlept')[0]}
              hours`);

      })

  .catch(error => console.log('sleepData error'));

  // Fetch activityData
  fetchData('activity/activityData')
  .then(activityData => {
    const activityRepo = new ActivityRepo(activityData.activityData,
      userData.userData);
    const activity = new Activity(activityData.activityData, user.id, user);

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
      color: '#0BAA02',
      width: 2
    },
    to: {
      color: '#0B7502',
      width: 5
    },
    step(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);
      var value = circle.value();
      if (value === 0) {
        circle.setText('');
      } else {
        circle.setText(`${activity.returnIndividualStatForDate(today,
          'numSteps')} steps`);
      }
    }
  });

    let percentSteps = activity.returnIndividualStatForDate(today, 'numSteps')
      / user.dailyStepGoal;
    bar.animate(percentSteps > 1 ? percentSteps = 1 : percentSteps);
    $('.number-of-steps-goal').text(`Step Goal: ${user.dailyStepGoal}`);
    $('.avg-number-of-steps-goal').text
      (`Average Step Goal: ${userRepo.returnAverageStepGoal()}`);
    $('.number-of-minutes-active-day').text
      (`${activity.returnIndividualStatForDate(today, 'minutesActive')}`);
    $('.average-minutes-active').text
      (`${activityRepo.returnAverage(today, 'minutesActive')}`)
    $('.distance').text(`${activity.returnIndividualStatForDate
        (today, 'numSteps')}`);
    $('.average-distance').text(`${activityRepo.returnAverage
        (today, 'numSteps')}`)
    $('.stairs').text(`${activity.returnIndividualStatForDate
        (today, 'flightsOfStairs')}`);
    $('.average-stairs').text(`${activityRepo.returnAverage
        (today, 'flightsOfStairs')}`)
    $('.distance-in-miles').text(`${activity.returnMilesWalked(today)} Miles`);
    $('.most-active').text(`${activityRepo.returnMostActive
        ('minutesActive')[0]}: ${activityRepo.returnMostActive
          ('minutesActive')[1]} minutes`);
    $('.week-review-minutes').text(`${activity.returnAvgUserStatForWeek
      (today, 'minutesActive')} minutes active`);
    $('.week-review-steps').text(`${activity.returnAvgUserStatForWeek
      (today, 'numSteps')} steps taken`);
    $('.week-review-stairs').text(`${activity.returnAvgUserStatForWeek
      (today, 'flightsOfStairs')} flights of stairs`);

    // Friends
    let userIDs = Object.keys(activity.returnFriendsStepCount()[0]);
    function insertFriendSteps() {
      let list = `<ul class="friends_ul">`
      let highestStepCountUserId = Number(activity.returnFriendsStepCount()[1]);
      let highestStepCountUserName = findUserName(highestStepCountUserId);
      userIDs.forEach(userID => {
        let userName = findUserName(Number(userID));
        list += `<li class="friends_li">
               <p class="friends--steps">${userName}:</p>
               <p class="friends-steps-number">${activity.returnFriendsStepCount
                 ()[0][userID]} steps</p>`;
      });
      list += `<li class="friends_li">
              <p class="friends--steps"><b>Highest step count:</b>
                <span class="italic-name highest-step-name">
                  ${highestStepCountUserName}</span></p>`;
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
  })
  .catch(error => console.log('activityData error'));

// Fetch hydrationData
  fetchData('hydration/hydrationData')
  .then(hydrationData => {
    const hydration = new Hydration(hydrationData.hydrationData, user.id);

    //Hydration
    $('.water-consumed').text(`${hydration.returnIndividualStatForDate
      (today, "numOunces")} ounces \n\n`);
    const weeklyOuncesChart = new Chart(document.getElementById
      ('water-consumed-week').getContext('2d'), {
      type: 'horizontalBar',
      data: {
        labels: dropYear(hydration.returnWeekDatesOnly(today)),
        datasets: [{
          data: hydration.returnWeeklyNumOunces(),
          backgroundColor: [
            'rgba(92, 117, 218, 0.6)',
            'rgba(11, 117, 2, 0.6)',
            'rgba(126, 221, 255, 0.6)',
            'rgba(92, 117, 218, 0.6)',
            'rgba(11, 117, 2, 0.6)',
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
  })
  .catch(error => console.log('hydrationData error'));
})

.catch(error => console.log('userData error'));

// Event listeners for show post-data form buttons
$('.show__activity--btn').on('click', function() {
  $('.activity-form').toggle();
  $('.hydration-form').hide();
  $('.sleep-form').hide()
});

$('.show__hydration--btn').on('click', function() {
  $('.hydration-form').toggle();
  $('.activity-form').hide();
  $('.sleep-form').hide()
});

$('.show__sleep--btn').on('click', function() {
  $('.sleep-form').toggle();
  $('.hydration-form').hide();
  $('.activity-form').hide()
});

// Event Listeners for submit post-data buttons
$('.sleep__submit--btn').on('click', postSleep);
$('.activity__submit--btn').on('click', postActivity);
$('.hydration__submit--btn').on('click', postHydration);

function postSleep(event) {
  event.preventDefault();
  const sleepBody =
    {
      userID: uniqueUserID,
      date: today,
      hoursSlept: $('.hours-slept').val(),
      sleepQuality: $('.sleep-quality').val()
    }

  if ($('.hours-slept').length > 0 && $('.sleep-quality').length > 0) {
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(sleepBody)
    });

    $('.hours-slept').val('');
    $('.sleep-quality').val('');
  }
};

function postActivity(event) {
  event.preventDefault();
  const activityBody =
    {
      userID: uniqueUserID,
      date: today,
      numSteps: $('.num-steps').val(),
      minutesActive: $('.minutes-active').val(),
      flightsOfStairs: $('.flights-stairs').val()
    }

  if ($('.num-steps').length > 0 && $('.minutes-active').length > 0 && $
    ('.flights-stairs').length > 0) {
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData', {
      method: 'POST',
      headers: {
          'Content-Type': "application/json"
        },
      body: JSON.stringify(activityBody)
    });

    $('.num-steps').val('');
    $('.minutes-active').val('');
    $('.flights-stairs').val('')
  }
};

function postHydration(event) {
  event.preventDefault();
  const hydrationBody =
    {
      userID: uniqueUserID,
      date: today,
      numOunces: $('.num-ounces').val()
    };

  if ($('.num-ounces').length > 0) {
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData', {
      method: 'POST',
      headers: {
          'Content-Type': "application/json"
        },
      body: JSON.stringify(hydrationBody)
    });

    $('.num-ounces').val('')
  }
}
