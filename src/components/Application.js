import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
import "components/Application.scss";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, // object of objects 
    interviewers: {} //object of objects containing interviewer information
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const urlBase = 'http://localhost:8001/api/';
    const promiseDays = axios.get(`${urlBase}days`);
    const promiseAppointments = axios.get(`${urlBase}appointments`);
    const promiseInterviewers = axios.get(`${urlBase}interviewers`)

    Promise.all([promiseDays, promiseAppointments, promiseInterviewers])
      .then((all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        setState((prev) => ({ ...prev, days, appointments, interviewers }));
      })
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentArray = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return (<Appointment
      key={appointment.id}
      id={appointment.id}
      interview={interview}
      time={appointment.time}
    />)
  });


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {appointmentArray}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
