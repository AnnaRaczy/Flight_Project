import React, { useState, useEffect } from "react";
import { getHourBack } from "../js/functions";
import { db } from "../js/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const usersCollectionRef = collection(db, "users");

export { usersCollectionRef };
const Price = (currentUser) => {
  return (
    <div className="my_flights--price">
      Total:{" "}
      {/* {users.price * users.adults +
        (users.price / 2) * users.children}{" "} */}
      25 €
    </div>
  );
};
const Children = (currentUser) => {
  return (
    <div className="my_flights--children">
      <i className="fas fa-baby baby_icon"></i>
      <span className="flights_price--passengers">
        {/* {users.children} */}
        Children: 0
      </span>
    </div>
  );
};

const Adults = (currentUser) => {
  return (
    <div>
      <i className="fas fa-user-friends"></i>
      <span className="flights_price--passengers">
        {/* {users.adults} */}
        Adults: 2
      </span>
    </div>
  );
};
const Travelers = (currentUser) => {
  return (
    <div>
      <Adults currentUser={currentUser} />
      <Children currentUser={currentUser} />
    </div>
  );
};
const FlightsTo = (users) => {
  return (
    <div className="flights_data--to">
      <span className="flight_day">
        {/* {currentUser.return_at.substr(0, 10)} */}
        Data To
      </span>
      <span className="flight_hours">
        {/* {currentUser.return_at.substr(11, 5)} -{" "}
        {getHourBack(currentUser.return_at)} */}{" "}
        16:35 - 18:35
      </span>
      <div className="my_flights--cities">
        {/* {currentUser.inputTo} - {currentUser.inputFrom} */} Barcelona -
        Geneva
      </div>
    </div>
  );
};

const FlightsFrom = (users) => {
  return (
    <div className="flights_data--from">
      <span className="flight_day">
        {/* {currentUser} */}
        Data From
      </span>
      <span className="flight_hours">
        {/* {currentUser.departure_at.substr(11, 5)} -{" "}
        {getHourBack(currentUser.departure_at)} */}{" "}
        06:05 - 10:05
      </span>
      <div className="my_flights--cities">
        {/* {currentUser.inputFrom} - {currentUser.inputTo} */} Geneva -
        Barcelona
      </div>
    </div>
  );
};

const Data = (currentUser) => {
  return (
    <div>
      <FlightsFrom currentUser={currentUser} />
      <FlightsTo currentUser={currentUser} />
    </div>
  );
};

const Title = () => {
  return <h1 className="title">My Flights</h1>;
};

const SavedFlights = (currentUser) => {
  return (
    <>
      <Title />
      <div className="container wrapper my_flights--box">
        <Data currentUser={currentUser} />
        <Travelers currentUser={currentUser} />
        <Price currentUser={currentUser} />
      </div>
    </>
  );
};

const MyFlights = () => {
  const authUser = getAuth();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  console.log("authUser:", authUser.currentUser.email);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      // console.log("Data collection:", data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // returns object containing all fields in doc, ... so we can add additional field - id
    };

    getUsers();
    const newUser = users.filter(
      (user) => user.email === authUser.currentUser.email
    );
    setCurrentUser(newUser);
  }, []);

  console.log("currentUser:", currentUser);
  console.log("users:", users);

  return <SavedFlights currentUser={currentUser} />;
};

export { MyFlights };
