import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

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
        setState((prev) => ({ ...prev, days, appointments, interviewers }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(true);
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState((prev) => ({ ...prev, appointments, days }));
      console.log(state);
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(false);
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState((prev) => ({ ...prev, appointments, days }));
    });
  }

  function updateSpots(save) {
    const dayAppInfo = getAppointmentsForDay(state, state.day);
    // console.log('dayAppInfo',dayAppInfo) // returns an array of objects containing appointment/interview information
    const targetDay = { ...state.days.find((day) => day.name === state.day) };
    // // console.log('targetDay',targetDay.appointments) //object with id, day, appointments, interviewers, spots
    const nullApps = dayAppInfo.filter((app) => !app.interview).length;
    // console.log("nullApps", nullApps); // returns number of null interviews
    const spots = nullApps + (save ? -1 : 1);
    // console.log("spots", spots); // returns number of spots after checking if input is true/false
    const dayNewSpots = {
      ...targetDay,
      spots,
    }; // new object with day and spot value
    const newDays = state.days.map((day) =>
      day.name === state.day ? dayNewSpots : day
    ); // update day within the array of days
    return newDays;
  }

  return { state, setDay, bookInterview, cancelInterview };
}
