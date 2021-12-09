import React, {Fragment} from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {

  const { interview, time, onEdit, onDelete } = props
  
  console.log(props)
  return (
    <article className="appointment">
      <Header time={time} />
      {props.interview ? 
        <Show
        student={interview.student}
        interviewer={interview.interviewer}
        onEdit={onEdit}
        onDelete={onDelete}
        /> :
        <Empty onAdd={props.onAdd}/>}
    </article>
  );
}