import React, { useEffect } from "react";
import "components/Appointment/styles.scss";
import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

// MODES
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";

export default function Appointment(props) {
  const { id, interview, time, interviewers, bookInterview, cancelInterview } =
    props;

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // WebSocket useEffect to avoid stale state
  useEffect(() => {
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (!interview && mode === SHOW) {
      transition(EMPTY);
    }
  }, [interview, transition, mode]);

  // navigation as a result of saving, editing and deleting appointments
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVE);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((err) => transition(ERROR_SAVE, true));
  }

  function del() {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
  }

  // navigation of Appointments view
  function edit() {
    transition(EDIT);
  }

  function confirm() {
    transition(CONFIRM);
  }

  function cancel() {
    transition(SHOW);
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVE && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm onConfirm={del} onCancel={cancel} />}
      {mode === EDIT && (
        <Form
          onCancel={cancel}
          onSave={save}
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Error saving. Please try again."
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Error deleting. Please try again." onClose={confirm} />
      )}
    </article>
  );
}
