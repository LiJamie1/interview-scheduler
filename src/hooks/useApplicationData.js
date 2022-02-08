import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";
import appReducer, {
  SET_DAY,
  SET_INTERVIEW,
  SET_APPLICATION_DATA,
} from "reducers/useApplicationDataReducer";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(appReducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  const setInterview = (id, interview) => {
    const route = `api/appointments/${id}`;
    return axios
      .put(route, { interview })
      .then(() => dispatch({ type: SET_INTERVIEW, id, interview }));
  };

  const destroyInterview = (id) => {
    const route = `api/appointments/${id}`;
    return axios
      .delete(route)
      .then(() => dispatch({ type: SET_INTERVIEW, id, interview: null }));
  };

  useEffect(() => {
    const urlBase = "http://localhost:8001/api/";
    const promiseDays = axios.get(`${urlBase}days`);
    const promiseAppointments = axios.get(`${urlBase}appointments`);
    const promiseInterviewers = axios.get(`${urlBase}interviewers`);

    // Grabs information for state from api from promise calls.
    // .all - if any of the promises fail they all fail
    Promise.all([promiseDays, promiseAppointments, promiseInterviewers])
      .then((all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        dispatch({
          type: SET_APPLICATION_DATA,
          data: { days, appointments, interviewers },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // function bookInterview(id, interview) {
  //   // create new appointments object for setState
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview },
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment,
  //   };
  //   return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
  //     // check if edit/create and sets days accordingly
  //     const days = !state.appointments[id].interview
  //       ? updateSpots(true)
  //       : [...state.days];
  //     setState((prev) => ({ ...prev, appointments, days }));
  //   });
  // }

  // function cancelInterview(id) {
  //   // create new appointments object for setState
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null,
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment,
  //   };
  //   return axios.delete(`/api/appointments/${id}`).then((res) => {
  //     const days = updateSpots(false);
  //     setState((prev) => ({ ...prev, appointments, days }));
  //   });
  // }

  // function updateSpots(save) {
  //   const dayAppInfo = getAppointmentsForDay(state, state.day);
  //   // console.log('dayAppInfo',dayAppInfo) // returns an array of objects containing appointment/interview information - refer to selectors.js
  //   const targetDay = { ...state.days.find((day) => day.name === state.day) };
  //   // console.log('targetDay',targetDay.appointments) //object with id, day, appointments, interviewers, spots
  //   const nullApps = dayAppInfo.filter((app) => !app.interview).length;
  //   // console.log("nullApps", nullApps); // returns number of null interviews
  //   const spots = nullApps + (save ? -1 : 1);
  //   // console.log("spots", spots); // returns number of spots after checking if input is true/false

  //   // individual entry of array
  //   const dayNewSpots = {
  //     ...targetDay,
  //     spots,
  //   };
  //   // create newDays array to output correct output for setState
  //   // update day within the array of days
  //   const newDays = state.days.map((day) =>
  //     day.name === state.day ? dayNewSpots : day
  //   );
  //   return newDays;
  // }

  return { state, setDay, setInterview, destroyInterview };
}
