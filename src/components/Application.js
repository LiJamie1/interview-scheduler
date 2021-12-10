import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application.scss";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    const urlBase = 'http://localhost:8001/api/'
    const promiseDays = axios.get(`${urlBase}days`)
    const promiseAppointments = axios.get(`${urlBase}appointments`)
    
    Promise.all([promiseDays, promiseAppointments])
    .then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      console.log(days)
      console.log(appointments)
      setState((prev) => ({...prev, days, appointments}));
    })
  }, []);
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentArray = dailyAppointments.map(appointment =>
    <Appointment
      key={appointment.id}
      interview={appointment.interview}
      time={appointment.time}
    />)


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
