import React from "react";
import "components/Appointment/styles.scss"

export default function Appointment(props) {

  const appointmentText = function (props) {
    if (props.time) {
      return `Appointment at ${props.time}`
    }
    return "No Appointments"
  }

  return (
    <article className="appointment">{appointmentText(props)}</article>
  );
}