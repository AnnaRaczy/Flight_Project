import { API_token, API_KEY, API_HOST, API_local } from "./constants";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, provider } from "./firebase-config";
import {
  getAuth,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const getFlights = (codeTo, codeFrom, departure, back, successCallback, fn) => {
  fetch(
    // "https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/calendar?calendar_type=departure_date&destination=BCN&origin=GVA&depart_date=2021-06-23&currency=EUR&return_date=2021-12-31",
    `https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/calendar?calendar_type=departure_date&destination=${codeTo}&origin=${codeFrom}&depart_date=${departure}&currency=EUR&return_date=${back}`,
    {
      method: "GET",
      headers: {
        "x-access-token": `${API_token}`,
        "x-rapidapi-host": `${API_HOST}`,
        "x-rapidapi-key": `${API_KEY}`,
      },
    }
  )
    .then((r) => r.json())
    .then((data) => {
      if (data.success === true && typeof successCallback === "function") {
        successCallback(data.data);
        console.log(Object.values(data.data).length);
        Object.values(data.data).length === 0 ? fn(false) : fn(true);
      }
    })

    .catch((err) => console.log(err));
};

const register = async (nick, email, psswd) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, psswd);
    console.log("User Functions:", user);
    const newUser = user.user;
    console.log("Functions firebaseUser:", newUser);
    const update = updateProfile(newUser, { displayName: nick });
    update.then((data) => console.log("Name had been updated:", data));
    return update;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }

  // createUserWithEmailAndPassword(auth, email, psswd) // Tutaj powinna byc funkcja dodajaca nick do Firebase, zeby potem mozna bylo wyswietlic imie w headerze nawet po odswiezeniu strony, a funkcja pobierajaca dane z Firestore w komponencie App w UseEffect
  //   .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     console.log("userCredential:", userCredential);
  //   })

  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(error.message);
  //   });
};

const login = async (email, psswd) => {
  // try {
  //   const user = await signInWithEmailAndPassword(auth, email, psswd);
  //   localStorage.setItem("user", JSON.stringify(user));
  //   console.log("Login user:", user);
  // } catch (err) {
  //   console.log(err.message);
  //   return err.message;
  // }

  signInWithEmailAndPassword(auth, email, psswd)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error.message);
    });
};

const loginGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // Google Access Token - to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

const logout = async () => {
  const out = await signOut(auth);
  console.log("Logout user:", auth.currentUser);
  return out;
  // signOut(auth)
  //   .then(() => {
  //     console.log("Logout successful");
  //   })
  //   .catch((error) => {
  //     console.log(error.message);
  //   });
  localStorage.clear();
};

export { getFlights, register, login, loginGoogle, logout };
