import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  // props returns
  // id: number
  // name: string
  // avatar: url
  // selected: bool
  // setInterviewer: function
  const listClass = classNames("interviewers__item", {
    "day-list__item--selected": props.selected
  });

  return (
    <li onClick={() => props.setInterviewer(props.name)} className={listClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>

  );
}