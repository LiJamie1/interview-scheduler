import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // console.log(props)
  const daysArray = props.days.map((dayInfo) => 
  <DayListItem 
    key={dayInfo.id} 
    name={dayInfo.name} 
    spots={dayInfo.spots} 
    selected={props.day} 
    setDay={props.setDay} 
  />)

  return(
    <ul>
      {daysArray}
    </ul>
  )
}