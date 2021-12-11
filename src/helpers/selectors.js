export function getAppointmentsForDay(state, day) {
  // state object containing days: array of objects and appointments: object of objects
  const { days, appointments } = state;
  const targetDay = days.find(obj => obj.name === day);
  // {id: 1, name: "Monday", appointments: [1,2,3]}
  if (targetDay) {
    // returns new array of appointment objects where the key is found in the array of appointment ids
    return targetDay.appointments.map(appId => appointments[appId]);
    //[appointment 1, appointment 2, appointment 3]
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

export function getInterviewersForDay(state, day) {
  const { days, appointments, interviewers } = state;
  const targetDay = days.find(obj => obj.name === day);
  const result = [];

  if (!targetDay) {
    return result;
  }

  const daysInterviews = targetDay.appointments.map(appId => appointments[appId]);

  for (const item of daysInterviews) {
    const interviewerData = item.interview;
    if (interviewerData && interviewerData.interviewer) {
      result.push(interviewers[interviewerData.interviewer]);
    }
  }
  return result;
};