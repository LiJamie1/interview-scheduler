import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"
import useVisualMode from "hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const interviewers = [];

export default function Appointment(props) {

  const { interview, time } = props;
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />}
      {mode === CREATE && <Form 
        interviewers={interviewers}
        onCancel={back}
      />}
    </article>
  );
}