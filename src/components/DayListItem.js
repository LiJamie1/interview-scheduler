import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  // props returns
  // id: number
  // name: string
  // spots: number
  // selected: bool
  // setDay: function

  const {selected, spots, setDay, name} = props;

  const listClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  const spotCheck = (spots) => {
    if (spots === 0) {
      return "no spots";
    }
    return spots === 1 ? "1 spot" : `${spots} spots`;
  };

  return (
    <li onClick={() => setDay(name)} className={listClass}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spotCheck(spots)} remaining</h3>
    </li>
  );
}
