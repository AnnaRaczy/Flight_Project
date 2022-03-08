import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, provider } from "./firebase-config";
import {
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { addHours, format } from "date-fns";

const getFlights = (codeTo, codeFrom, departure, back, successCallback, fn) => {
  fetch(
    `https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/calendar?calendar_type=departure_date&destination=${codeTo}&origin=${codeFrom}&depart_date=${departure}&currency=EUR&return_date=${back}`,
    {
      method: "GET",
      headers: {
        "x-access-token": process.env.REACT_APP_API_token,
        "x-rapidapi-host": process.env.REACT_APP_API_HOST,
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      },
    }
  )
    .then((r) => r.json())
    .then((data) => {
      if (data.success === true && typeof successCallback === "function") {
        successCallback(data.data);
        console.log(Object.values(data.data));
        Object.values(data.data).length === 0 ? fn(false) : fn(true);
      }
    })

    .catch((err) => console.log(err));
};

const getHourBack = (elem) => {
  const hourBack = Date.parse(`${elem}`);
  const newHour = addHours(hourBack, 4);
  return format(newHour.getTime(), "HH:mm");
};

const register = async (nick, email, psswd) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, psswd);
    const newUser = user.user;
    const update = updateProfile(newUser, { displayName: nick });
    update.then((data) => console.log("Name had been updated:", data));
    return update;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

const login = async (email, psswd) => {
  signInWithEmailAndPassword(auth, email, psswd)
    .then((userCredential) => {
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
};

export { getFlights, getHourBack, register, login, loginGoogle, logout };
