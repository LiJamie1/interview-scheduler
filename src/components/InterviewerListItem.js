import React from "react";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  // props returns
  // id: number
  // name: string
  // avatar: url
  // selected: bool
  // setInterviewer: function
  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>

  )
}