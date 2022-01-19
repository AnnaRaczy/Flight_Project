import React, { useState } from "react";
import { Checkbox } from "@material-ui/core";
import { FlightsWrapper } from "./FlightOutput";
import { FlightsPrice } from "./FlightPrice";
import airlines from "../airlines.json";
import { getHourBack } from "../js/functions";
import { db } from "../js/firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { getDocs, query, where } from "firebase/firestore";
import { usersCollectionRef } from "./MyFlights";
import { getAuth } from "firebase/auth";

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
  const authUser = getAuth();
  const [checked, setChecked] = useState(false);
  const [myFlights, setMyFlights] = useState([]);
  const [user, setUser] = useState([]);

  const getUser = async () => {
    const q = query(
      usersCollectionRef,
      where("email", "==", authUser.currentUser.email)
    );
    const data = await getDocs(q);
    data.forEach((doc) => {
      setUser({ ...doc.data(), id: doc.id });
    });
  };

  const newDateTo = data[1].return_at.substr(0, 10);
  const newHourFrom = data[1].departure_at.substr(11, 5);
  const newHourBack = data[1].return_at.substr(11, 5);

  console.log(newHourFrom);

  const values = {
    adults: data.adults,
    children: data.children,
    flightFrom: data.inputFrom,
    flightTo: data.inputTo,
    dateFrom: data[0],
    dateTo: newDateTo,
    hourFrom: newHourFrom,
    hourBack: newHourBack,
    price: data[1].price,
  };

  console.log(values);

  const updateUser = async () => {
    getUser();
    const userRef = doc(db, "users", user.id);
    console.log(userRef);
    const res = await updateDoc(userRef, values);
    return res;
  };
  const CheckboxStyled = () => {
    const handleCheck = (e) => {
      setChecked(e.target.checked);
      setMyFlights(data);
      data.onClick(data);
      updateUser();
    };
    return (
      <div>
        <Checkbox checked={checked} onChange={handleCheck} />
      </div>
    );
  };

  const getAirline = (data, input) => {
    const airline = data
      .filter((item) => item.code === input)
      .map((item) => item.name)
      .toString();
    return airline;
  };

  return (
    <div id={data.id} className="container wrapper flights_output">
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
  );
};

export default Flight;
