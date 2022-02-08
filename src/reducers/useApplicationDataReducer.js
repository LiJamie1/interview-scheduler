import updateInterviewSpots from "helpers/selectors";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day,
      };

    case SET_APPLICATION_DATA:
      const { days, appointments, interviewers } = action.data;
      return {
        ...state,
        days,
        appointments,
        interviewers,
      };

    case SET_INTERVIEW:
      const { id, interview } = action;
      const appointment = { ...state.appointments[id], interview };
      const list_of_appointments = { ...state.appointments, [id]: appointment };

      const newDaysState = updateInterviewSpots(state, list_of_appointments);
      return {
        ...state,
        list_of_appointments,
        newDaysState,
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
