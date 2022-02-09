import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  // States
  // student: String and interviewer:  Number
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState({
    student: "",
    interviewer: "",
  });

  const reset = function () {
    setStudent("");
    setInterviewer(null);
  };

  // props
  // student: String
  // interviewers: Array
  // interviewer: number
  // onSave: function
  // onCancel: function
  const { interviewers, onCancel, onSave } = props;

  const validate = function () {
    if (student && interviewer) {
      onSave(student, interviewer);
      return;
    }
    setError({
      ...error,
      student: student ? "" : "Student name cannot be blank",
      interviewer: interviewer ? "" : "Select an Interviewer",
    });
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={student}
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error.student}</section>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
        <section className="appointment__validation">
          {error.interviewer}
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button
            danger
            onClick={() => {
              reset();
              onCancel();
            }}
          >
            Cancel
          </Button>
          <Button confirm onClick={() => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
