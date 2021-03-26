const { getColombiaHolidaysByYear } = require('colombia-holidays');
const moment = require('moment');

const currentDate = moment().utcOffset(-5);
const project = 'Ascension - Ascension';
const place = 'Remoto';

const daily = {
    comment: 'Daily',
    timeSpentJIRA: '15m',
    issue: 'PTSR-23',
    project,
    place,
    startDate: currentDate.set({ 'hour': 9, 'minute': 30 }).toISOString(),
    tfstask: ''
}

const retro = {
    comment: 'Retrospective',
    timeSpentJIRA: '1h',
    issue: 'PTSR-23',
    project,
    place,
    startDate: currentDate.set({ 'hour': 15, 'minute': 0 }).toISOString(),
    tfstask: ''
}

const planning = {
    comment: 'Planning',
    timeSpentJIRA: '1h',
    issue: 'PTSR-23',
    project,
    place,
    startDate: currentDate.set({ 'hour': 9, 'minute': 30 }).toISOString(),
    tfstask: ''
}

const grooming = {
    comment: 'Grooming',
    timeSpentJIRA: '1h',
    issue: 'PTSR-3',
    project,
    place,
    startDate: currentDate.set({ 'hour': 14, 'minute': 0 }).toISOString(),
    tfstask: ''
}

const testing = {
    comment: 'Test automation',
    timeSpentJIRA: '9h',
    issue: 'PTSR-5',
    project,
    place,
    startDate: currentDate.set({ 'hour': 8, 'minute': 0 }).toISOString(),
    tfstask: ''
}

const getIssues = () => {
    const issues = [];
    if (!isWorkingDay) return issues;
    switch (currentDate.day()) {
        case 1:
            if (currentDate.week() % 2 === 0) {
                issues.push(planning);
                testing.timeSpentJIRA = '8h';
            } else {
                issues.push(daily);
                testing.timeSpentJIRA = '8.75h';
            }
            issues.push(testing);
            break;
        case 2:
            issues.push(daily);
            testing.timeSpentJIRA = '8.75h';
            issues.push(testing);
            break;
        case 3:
            issues.push(daily);
            issues.push(grooming);
            testing.timeSpentJIRA = '7.75h';
            issues.push(testing);
            break;
        case 4:
            issues.push(daily);
            testing.timeSpentJIRA = '8.75h';
            issues.push(testing);
            break;
        case 5:
            testing.timeSpentJIRA = '8.75h';
            if (currentDate.week() % 2 === 1) {
                issues.push(retro);
                testing.timeSpentJIRA = '7.75h';
            }
            issues.push(daily);
            issues.push(testing);
            break;
        default:
            break;
    }
    return issues;
};

const isWorkingDay = () => {
    const isHoliday = getColombiaHolidaysByYear(currentDate.year())
        .map(holiday => holiday.holiday)
        .includes(currentDate.format('YYYY-MM-DD'));
    return !isHoliday && currentDate.day() !== 0 && currentDate.day() !== 6;
}

module.exports = {
    getIssues,
    isWorkingDay
};