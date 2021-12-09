import React, {Fragment} from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {

  // const appointmentText = function (props) {
  //   if (props.time) {
  //     return `Appointment at ${props.time}`
  //   }
  //   return "No Appointments"
  // }
  console.log(props)
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} time={props.time}/> : <Empty />}
    </article>
  );
}