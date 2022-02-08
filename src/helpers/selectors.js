export function getAppointmentsForDay(state, day) {
  // state object containing days: array of objects and appointments: object of objects
  const { days, appointments } = state;
  const targetDay = days.find((obj) => obj.name === day);
  // {id: 1, name: "Monday", appointments: [1,2,3]}

  if (!targetDay) {
    return [];
  }

  return targetDay.appointments.map((appId) => appointments[appId]);
  //[appointment 1...] array of objects
}

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  const targetDay = days.find((obj) => obj.name === day);

  if (!targetDay) {
    return [];
  }

  return targetDay.interviewers.map(
    (interviewerId) => interviewers[interviewerId]
  );
  //[interviewer 1 - 5] array of objects
}

export function getInterview(state, interview) {
  if (!interview) return null;

  const { interviewers } = state;
  const { interviewer } = interview;

  return {
    ...interview,
    interviewer: interviewers[interviewer],
  };
}

export function updateAppointmentSpots(state, appointments) => {
  const spots = getAppointmentsForDay(
    { ...state, appointments },
    state.day
  ).filter((appointments) => !appointments.interview).length;

  const days = state.days.map((day) =>
    day.name === state.day ? { ...day, spots } : day
  );
  return days;
};
