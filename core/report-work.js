const jiraToReport = require("./jira-reports-file.json");

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
const week = getWeek();

const getTimeToReportAt = (time) => {
  const hour = Number(time.split("h")[0]);
  const minutesInString = time.split("h ")[1];
  const minutes = Number(minutesInString.split("m")[0]);
  return currentDate.setHours(hour, minutes);
};

const getIssues = () => {
  const issues = [];

  for (issue in jiraToReport[week][today])
  {
    if (issue.timeSpentJIRA !== "" && issue.timeSpentJIRA !== undefined){
      possibleWork[issue].timeSpentJIRA = issue.timeSpentJIRA;
      if (issue.comment !== "" && issue.comment !== undefined){
        possibleWork[issue].comment = issue.comment;
      }
  
      if (issue.hasOwnProperty(startTime)){
        possibleWork[issue].startDate = getTimeToReportAt(issue.startTime);
      }
      else {
        possibleWork[issue].startDate = currentDate.setHours(8, 0);
      }
      issues.push(possibleWork[issue]);
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
