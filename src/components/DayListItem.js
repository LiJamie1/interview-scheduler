import React from "react";
import classNames from "classnames"

import "components/DayListItem.scss"

export default function DayListItem(props) {
  console.log(props)

  const listClass = classNames("day-list__item", {
  "day-list__item--selected": props.selected === props.name,
  "day-list__item--full": props.spots === 0
  });

  const spotCheck = (spots) => {
    if (spots === 0) {
      return "no spots"
    }
    return (spots === 1) ? "1 spot " : `${spots} spots `
  }

  return (
    <li onClick={() => props.setDay(props.name)} className={listClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{spotCheck(props.spots)} remaining</h3>
    </li>
  );
}

// {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
// {props.spots === 1 && <h3 className="text--light">{props.spots} spot remaining</h3>}
// {props.spots > 1 && <h3 className="text--light">{props.spots} spots remaining</h3>}