import React, { useState, useEffect } from "react";
import { db } from "../js/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const usersCollectionRef = collection(db, "users");

export { usersCollectionRef };

const Price = (user) => {
  const newUser = user.user.user;
  return (
    <div className="my_flights--price">
      <span className="my_flights--price">Total:</span>
      {newUser?.price * newUser?.adults +
        (newUser?.price / 2) * newUser?.children}{" "}
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
  return (
    <div className="flights_data--to">
      <span className="flight_day my_flights--date">{newUser.dateTo}</span>
      <span className="flight_hours">
        {newUser.hourBack} - {newUser?.hourBack2}
      </span>
      <div className="my_flights--cities">
        {newUser.flightTo} - {newUser.flightFrom}
      </div>
    </div>
  );
};

const FlightsFrom = (user) => {
  const newUser = user.user.user.user;
  return (
    <div className="flights_data--from">
      <span className="flight_day my_flights--date">{newUser?.dateFrom}</span>
      <span className="flight_hours">
        {newUser?.hourFrom} - {newUser?.hourFrom2}
      </span>
      <div className="my_flights--cities">
        {newUser.flightFrom} - {newUser?.flightTo}
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
    <div className="container wrapper my_flights--box">
      <Data user={user} />
      <Travelers user={user} />
      <Price user={user} />
    </div>
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
    setUser(user);
  }, []);

  return (
    <>
      <Title />
      {user.flightFrom ? (
        <SavedFlights user={user} />
      ) : (
        <h1 className="my_flights--empty">Add flights to display them here.</h1>
      )}
    </>
  );
};

export { MyFlights };
