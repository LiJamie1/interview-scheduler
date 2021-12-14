import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  // props returns
  // id: number
  // name: string
  // avatar: url
  // selected: bool
  // setInterviewer: function
  const { selected, setInterviewer, avatar, name } = props;

  const listClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li onClick={setInterviewer} className={listClass}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
