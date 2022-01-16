import React, { useState } from "react";
import { getHourBack } from "../js/functions";

const Price = (savedFlights) => {
  return (
    <div className="my_flights--price">
      Total:{" "}
      {/* {savedFlights[1].price * savedFlights.adults +
        (savedFlights[1].price / 2) * savedFlights.children}{" "} */}
      25 €
    </div>
  );
};
const Children = () => {
  return (
    <div className="my_flights--children">
      <i className="fas fa-baby baby_icon"></i>
      <span className="flights_price--passengers">
        {/* {savedFlights.children} */}
        Children: 0
      </span>
    </div>
  );
};

const Adults = () => {
  return (
    <div>
      <i className="fas fa-user-friends"></i>
      <span className="flights_price--passengers">
        {/* {savedFlights.adults} */}
        Adults: 2
      </span>
    </div>
  );
};
const Travelers = (savedFlights) => {
  return (
    <div>
      <Adults />
      <Children />
    </div>
  );
};
const FlightsTo = (savedFlights) => {
  return (
    <div className="flights_data--to">
      <span className="flight_day">
        {/* {savedFlights[1].return_at.substr(0, 10)} */}
        Data To
      </span>
      <span className="flight_hours">
        {/* {savedFlights[1].return_at.substr(11, 5)} -{" "}
        {getHourBack(savedFlights[1].return_at)} */}{" "}
        16:35 - 18:35
      </span>
      <div className="my_flights--cities">
        {/* {savedFlights.inputTo} - {savedFlights.inputFrom} */} Barcelona -
        Geneva
      </div>
    </div>
  );
};

const FlightsFrom = (savedFlights) => {
  return (
    <div className="flights_data--from">
      <span className="flight_day">
        {/* {savedFlights[0]} */}
        Data From
      </span>
      <span className="flight_hours">
        {/* {savedFlights[1].departure_at.substr(11, 5)} -{" "}
        {getHourBack(savedFlights[1].departure_at)} */}{" "}
        06:05 - 10:05
      </span>
      <div className="my_flights--cities">
        {/* {savedFlights.inputFrom} - {savedFlights.inputTo} */} Geneva -
        Barcelona
      </div>
    </div>
  );
};

const Data = (savedFlights) => {
  return (
    <div>
      <FlightsFrom savedFlights={savedFlights} />
      <FlightsTo savedFlights={savedFlights} />
    </div>
  );
};

const Title = () => {
  return <h1 className="title">My Flights</h1>;
};
const MyFlights = (savedFlights) => {
  return (
    <>
      <Title />
      <div className="container wrapper my_flights--box">
        <Data savedFlights={savedFlights} />
        <Travelers savedFlights={savedFlights} />
        <Price savedFlights={savedFlights} />
      </div>
    </>
  );
};

export { MyFlights };
