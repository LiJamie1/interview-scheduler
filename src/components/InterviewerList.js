import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  // props returns
  // interviewers: array
  // selected "interviewer": number
  // setInterviewer: function

  const interviewerArray = props.interviewers.map((person) =>
    <InterviewerListItem
      key={person.id}
      name={person.name}
      avatar={person.avatar}
      selected={props.interviewer === person.id}
      setInterviewer={(event) => props.setInterviewer(person.id)}
    />)

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerArray}
      </ul>
    </section>
  )
}