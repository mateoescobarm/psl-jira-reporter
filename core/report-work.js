const jiraToReport = require("./jira-reports-file.json");
const { getColombiaHolidaysByYear } = require('colombia-holidays');

const currentDate = new Date();

const possibleWork = require("./possible-work.json");

const weekdays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday"
];

const today = weekdays[currentDate.getDay() - 1];
const week = getWeekNumber();

const getWeekNumber = () => {
  const startingDate = getStartDateFromJiraFile();
  let diff =(new Date.getTime() - startingDate.getTime()) / 1000;
  diff /= (60 * 60 * 24 * 7);
  let weekNumber = Math.abs(Math.round(diff));
  let sprintWeek = 
    Math.abs(
      Math.floor(weekNumber/getNumberOfWeeksInSprint())
    ) + 1;
  return 'week' + sprintWeek;
};

const getStartDateFromJiraFile = () => {
  let splitDates = jiraToReport.firstDayToReportAt.split("/");
  const day = Number(splitDates[0]);
  const month = Number(splitDates[1]) - 1;
  const year = Number(splitDates[2]);
  return new Date(year, month, day);
};

const getTimeToReportAt = (time) => {
  const hour = Number(time.split("h")[0]);
  const minutesInString = time.split("h ")[1];
  const minutes = Number(minutesInString.split("m")[0]);
  return currentDate.setHours(hour, minutes);
};

const getNumberOfWeeksInSprint = () => {
  const jiraFileProperties = Object.getOwnPropertyNames(jiraToReport);
  let totalWeeks = 0;

  jiraFileProperties.forEach((propertie) => {
    if (propertie.includes("week")){ totalWeeks++ };
  });
  return totalWeeks;
};

const getIssues = () => {
  const issues = [];

  for (issue in jiraToReport[week][today])
  {
    if (issue.timeSpentJIRA !== "" && issue.timeSpentJIRA !== undefined){
      possibleWork[issue].timeSpentJIRA = issue.timeSpentJIRA;

      if (issue.comment !== "" && issue.comment !== undefined){
        possibleWork[issue].comment = issue.comment;

        if (issue.hasOwnProperty(startTime)){
          possibleWork[issue].startDate = getTimeToReportAt(issue.startTime);
        }
        else {
          possibleWork[issue].startDate = currentDate.setHours(8, 0);
        }
        issues.push(possibleWork[issue]);
      }
    }
  }
  return issues;
};

const isWorkingDay = () => {
  if (currentDate.getDay() === 6) {
      return false
  }
  if (currentDate.getDay() === 0) {
      return false
  }
  const isHoliday = getColombiaHolidaysByYear(currentDate.getFullYear())
      .map(holiday => holiday.holiday)
      .includes(currentDate.toISOString().split('T')[0]);
  return !isHoliday;
}

module.exports = () => {
  getIssues,
  isWorkingDay
};
