import React, { useState, useEffect } from "react";
import NewFlight from "./NewFlight";
import Flight from "./Flight";
import { MyFlights } from "./MyFlights";
import "../scss/main.scss";
// import { auth, db } from "../js/firebase-config";
import { Button } from "@material-ui/core";
import Menu from "@mui/material/Menu";
import { getAuth } from "firebase/auth";

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
    <ul>
      {flights !== null &&
        flights.map((item, id) => {
          console.log("items:", { ...item });
          return (
            <Flight
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
    </ul>
  );
};

const Content = ({ main }) => {
  const authUser = getAuth();
  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [data, setData] = useState(true);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [savedFlights, setSavedFlights] = useState([]);

  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdd = (data) => {
    setFlights(Object.entries(data));
    console.log("data:", Object.entries(data));
    // console.log("is data.length === 0?:", Object.entries(data).length === 0);
    // Object.entries(data).length === 0 ? setResult(false) : setResult(true);
  };

  const handleInputs = (origin, destination, result) => {
    setFrom(origin);
    setTo(destination);
    setData(result);
  };

  console.log("Content From:", from);
  console.log("Content To:", to);
  console.log("Flights:", flights);

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
        <>
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
        </>
      )}
    </div>
  );
};

export default Content;

// background: linear-gradient(
//   rgba(255, 255, 255, 0.925),
//   rgba(199, 193, 193, 0.233)
// );
