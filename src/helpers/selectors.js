export function getAppointmentsForDay(state, day) {
  // state object containing days: array of objects and appointments: object of objects
  const { days, appointments } = state;
  const targetDay = days.find(obj => obj.name === day);

  if (targetDay) {
    // returns new array of appointment objects where the key is found in the array of appointment ids
    return targetDay.appointments.map(appId => appointments[appId]);
  }

  return [];
};

export function getInterview(state, interview) {
  if (!interview) return null;

  const { interviewers } = state;
  const { interviewer } = interview;

  return {
    ...interview,
    interviewer: interviewers[interviewer]
  }
}