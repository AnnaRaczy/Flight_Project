import React, { useState, useEffect } from "react";
import NewFlight from "./NewFlight";
import Flight from "./Flight";
import { MyFlights } from "./MyFlights";
import "../scss/main.scss";

const NoFlights = () => {
  return (
    <div className="container no_flights">
      <i className="fas fa-exclamation-circle"></i>Sorry, we found no results on
      these dates.
    </div>
  );
};

const EmptyData = ({ data }) => {
  return data === false && <NoFlights />;
};

const FlightsList = ({ flights, from, to, adults, children, onClick }) => {
  return (
    <div>
      {flights !== null &&
        flights.map((item, id) => {
          return (
            <Flight
              id={id}
              key={id}
              {...item}
              inputFrom={from}
              inputTo={to}
              adults={adults}
              children={children}
              onClick={onClick}
            />
          );
        })}
    </div>
  );
};

const Content = ({ main }) => {
  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [data, setData] = useState(true);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
  });
  const [savedFlights, setSavedFlights] = useState([]);

  const handleAdd = (data) => {
    setFlights(Object.entries(data));
  };

  const handleInputs = (origin, destination, result) => {
    setFrom(origin);
    setTo(destination);
    setData(result);
  };

  const handleMyFlights = (myFlights) => {
    setSavedFlights(myFlights);
  };
  return (
    <div>
      {!main && (
        <>
          <MyFlights savedFlights={savedFlights} />
        </>
      )}
      {main && (
        <div className="flights_output">
          <NewFlight
            onAdd={handleAdd}
            onChange={handleInputs}
            passengers={passengers}
            setPassengers={setPassengers}
            setFlights={setFlights}
            setData={setData}
          />
          <FlightsList
            flights={flights}
            from={from}
            to={to}
            adults={passengers.adults}
            children={passengers.children}
            onClick={handleMyFlights}
          />
          <EmptyData data={data} />
        </div>
      )}
    </div>
  );
};

export default Content;
