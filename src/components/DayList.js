import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // props returns
  // days: array
  // selected: bool
  // setDay: function
  const {days, value, onChange} = props

  const daysArray = days.map((dayInfo) => (
    <DayListItem
      key={dayInfo.id}
      name={dayInfo.name}
      spots={dayInfo.spots}
      selected={value === dayInfo.name}
      setDay={onChange}
    />
  ));

  return <ul>{daysArray}</ul>;
}
