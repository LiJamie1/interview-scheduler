import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // props returns
  // days: array
  // selected: bool
  // setDay: function

  const daysArray = props.days.map((dayInfo) => (
    <DayListItem
      key={dayInfo.id}
      name={dayInfo.name}
      spots={dayInfo.spots}
      selected={props.value === dayInfo.name}
      setDay={props.onChange}
    />
  ));

  return <ul>{daysArray}</ul>;
}
