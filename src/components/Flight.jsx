import { Checkbox } from "@material-ui/core";
import React, { useState } from "react";
import { FlightsWrapper } from "./FlightOutput";
import { FlightsPrice } from "./FlightPrice";
import airlines from "../airlines.json";
import { addHours, format } from "date-fns";

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
const Flight = (data) => {
  const [checkedFrom, setCheckedFrom] = useState(false);
  const [checkedTo, setCheckedTo] = useState(true);

  function CheckboxStyled() {
    return (
      <div>
        <Checkbox
          checked={checkedFrom}
          onChange={(e) => setCheckedFrom(e.target.checked)}
        />
      </div>
    );
  }
  console.log("Data:", data);
  console.log("From, to:", data.inputFrom, data.inputTo);

  const getAirline = (data, input) => {
    const airline = data
      .filter((item) => item.code === input)
      .map((item) => item.name)
      .toString();
    return airline;
  };

  const getHourBack = (elem) => {
    const hourBack = Date.parse(`${elem}`);
    const newHour = addHours(hourBack, 4);
    return format(newHour.getTime(), "HH:mm");
  };

  return (
    <>
      <div className="container wrapper">
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
