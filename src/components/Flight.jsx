import { Checkbox } from "@material-ui/core";
import React, { useState } from "react";
import { FlightsWrapper } from "./FlightOutput";
import { FlightsPrice } from "./FlightPrice";
import airlines from "../airlines.json";
// import { addHours, format } from "date-fns";
import { getHourBack } from "../js/functions";

const FlightsInfo = ({ data, getAirline }) => {
  return (
    <div className="flights_info">
      <div>Transfers: {data[1].transfers}</div>
      <span className="flights_info--airline">Airline:</span>
      <div className="flights_airline">
        {getAirline(airlines, data[1].airline)}
      </div>
    </div>
  );
};
const Flight = (data, onClick) => {
  const [checked, setChecked] = useState(false);
  const [myFlights, setMyFlights] = useState([]);

  function CheckboxStyled() {
    const handleCheck = (e) => {
      setChecked(e.target.checked);
      setMyFlights(data);
      onClick(data);
    };
    return (
      <div>
        <Checkbox checked={checked} onChange={handleCheck} />
      </div>
    );
  }
  console.log("Data:", data);
  console.log("FlightsList:", myFlights);
  // console.log("From, to:", data.inputFrom, data.inputTo);

  const getAirline = (data, input) => {
    const airline = data
      .filter((item) => item.code === input)
      .map((item) => item.name)
      .toString();
    return airline;
  };

  // const getHourBack = (elem) => {
  //   const hourBack = Date.parse(`${elem}`);
  //   const newHour = addHours(hourBack, 4);
  //   return format(newHour.getTime(), "HH:mm");
  // };

  return (
    <>
      <div className="container wrapper">
        <span className="flights_checkboxes">
          <CheckboxStyled />
        </span>
        <FlightsWrapper
          data={data}
          CheckboxStyled={CheckboxStyled}
          getHourBack={getHourBack}
        />
        <FlightsInfo data={data} getAirline={getAirline} />
        <FlightsPrice data={data} />
      </div>
    </>
  );
};

export default Flight;
