import { Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import iata from "../iata.json";
import airlines from "../airlines.json";
import { getFlights } from "./functions";
import moment from "moment";
import { addHours, format } from "date-fns";

const Flight = (data) => {
  const [checkedFrom, setCheckedFrom] = useState(false);
  const [checkedTo, setCheckedTo] = useState(true);
  // const [result, setResult] = useState(true);

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
        {/* {result && (
          <> */}
        <div className="flights_wrapper">
          <span className="flights_checkboxes">
            <CheckboxStyled />
          </span>
          <div className="flights_data">
            <div className="flights_data--from">
              <div className="flight_day">{data[0]}</div>
              <span className="flight_hours">
                {data[1].departure_at.substr(11, 5)} -{" "}
                {getHourBack(data[1].departure_at)}
              </span>
              <div className="flights_cities">
                {data.inputFrom} - {data.inputTo}
              </div>
            </div>
            <div className="flights_data--to">
              <div className="flight_day">
                {data[1].return_at.substr(0, 10)}
              </div>
              <span className="flight_hours">
                {data[1].return_at.substr(11, 5)} -{" "}
                {getHourBack(data[1].return_at)}
              </span>
              <div className="flights_cities">
                {data.inputTo} - {data.inputFrom}
              </div>
            </div>
          </div>
          <div className="flights_numbers">
            <div className="flights_numbers--from">
              <i className="fas fa-plane"></i>Flight Number:{" "}
              {data[1].flight_number}
            </div>
            <div className="flights_numbers--to">
              <i className="fas fa-plane"></i>Flight Number:{" "}
              {data[1].flight_number + 20}
            </div>
          </div>
        </div>
        <div className="flights_info">
          <div>Transfers: {data[1].transfers}</div>
          <span className="flights_info--airline">Airline:</span>
          <div className="flights_airline">
            {getAirline(airlines, data[1].airline)}
          </div>
        </div>
        <div className="flights_price">
          <div>
            <i className="fas fa-user-friends"></i>
            <span className="flights_price--passengers">{data.adults}</span>
            <i className="fas fa-baby baby_icon"></i>
            <span className="flights_price--passengers">{data.children}</span>
          </div>
          {/* <div className="flights_price--name">Price:</div> */}
          <div className="flights_price--amount">
            {data[1].price} €/
            <span className="flights_price--person">person</span>
            <div className="flights_price--total">
              Total:{" "}
              {data[1].price * data.adults +
                (data[1].price / 2) * data.children}{" "}
              €
            </div>
          </div>
          <button className="flights_price--btn">SAVE</button>
        </div>
        {/* </>
        )} */}
        {/* {!result && (
          <div>
            {" "}
            <i class="fas fa-plane-slash"></i>Sorry, we found no results on
            these dates.
          </div>
        )} */}
      </div>
    </>
  );
};

export { Flight };
