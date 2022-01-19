import React, { useState, useEffect } from "react";
import { getHourBack } from "../js/functions";
import { db } from "../js/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const usersCollectionRef = collection(db, "users");

export { usersCollectionRef };
const Price = (user) => {
  const newUser = user.user.user.user;
  return (
    <div className="my_flights--price">
      Total:{" "}
      {newUser.price * newUser.adults + (newUser.price / 2) * newUser.children}{" "}
      €
    </div>
  );
};
const Children = (user) => {
  const newUser = user.user.user.user;
  return (
    <div className="my_flights--children">
      <i className="fas fa-baby baby_icon"></i>
      <span className="flights_price--passengers">
        Children: {newUser.children}
      </span>
    </div>
  );
};

const Adults = (user) => {
  const newUser = user.user.user.user;
  return (
    <div>
      <i className="fas fa-user-friends"></i>
      <span className="flights_price--passengers">
        Adults: {newUser.adults}
      </span>
    </div>
  );
};
const Travelers = (user) => {
  return (
    <div>
      <Adults user={user} />
      <Children user={user} />
    </div>
  );
};
const FlightsTo = (user) => {
  const newUser = user.user.user.user;
  const from = newUser.hourBack.substr(11, 5);
  const to = getHourBack(newUser.return_at);
  return (
    <div className="flights_data--to">
      <span className="flight_day">{newUser.hourBack}</span>
      <span className="flight_hours">
        {from} - '{to}'
      </span>
      <div className="my_flights--cities">
        {newUser.flightTo} - {newUser.flightFrom}
      </div>
    </div>
  );
};

const FlightsFrom = (user) => {
  const newUser = user.user.user.user;
  const hourFrom = newUser.hourBack.substr(11, 5);
  const hourTo = getHourBack(newUser.hourBack);
  return (
    <div className="flights_data--from">
      <span className="flight_day">{newUser.dateFrom}</span>
      <span className="flight_hours">{{ hourFrom } - { hourTo }}</span>
      <div className="my_flights--cities">
        {newUser.flightFrom} - {newUser.flightTo}
      </div>
    </div>
  );
};

const Data = (user) => {
  return (
    <div>
      <FlightsFrom user={user} />
      <FlightsTo user={user} />
    </div>
  );
};

const Title = () => {
  return <h1 className="title">My Flights</h1>;
};

const SavedFlights = (user) => {
  return (
    <>
      <Title />
      <div className="container wrapper my_flights--box">
        <Data user={user} />
        <Travelers user={user} />
        <Price user={user} />
      </div>
    </>
  );
};

const MyFlights = () => {
  const authUser = getAuth();
  const [user, setUser] = useState([]);

  useEffect(() => {
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

    getUser();
  }, []);

  console.log("user:", user);

  return <SavedFlights user={user} />;
};

export { MyFlights };
