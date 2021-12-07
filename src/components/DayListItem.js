import React from "react";
import classNames from "classnames"

import "components/DayListItem.scss"

export default function DayListItem(props) {
  console.log(props)

  const listClass = classNames("day-list__item", {
  "day-list__item--selected": props.selected,
  "day-list__item--full": props.spots === 0
  });

  return (
    <li onClick={() => props.setDay(props.name)} className={listClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}