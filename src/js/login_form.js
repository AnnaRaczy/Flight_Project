import React, { useState, useEffect } from "react";
import { register, login, loginGoogle, logout } from "./functions";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle } from "./firebase-config";
import TextField from "@material-ui/core/TextField";
// import { Alert } from "react-bootstrap/Alert";
import { hashing } from "./bcrypt-config";
import { compare } from "bcryptjs";
import {
  getAuth,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { set } from "date-fns";
import { isFulfilled } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";
// import { log_in } from "./features/user";
const Login = ({
  form,
  setForm,
  logged,
  setLogged,
  log,
  setLog,
  register,
  setRegister,
  user,
  setUser,
  setUsers,
  nick,
  setNick,
  signedGoogle,
  setSignedGoogle,
  authUser,
}) => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPsswd, setRegisterPsswd] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPsswd, setLoginPsswd] = useState("");
  const [hashedPsswd, setHashedPsswd] = useState("");
  const [created, setCreated] = useState(false);
  // const [wrongPsswd, setWrongPsswd] = useState(false);
  const handleLogin = () => {
    setCreated(false);
    setForm(false);
    setLog(true);
    setSignedGoogle("email");
    localStorage.setItem("google", signedGoogle);
  };

  const handleLoginGoogle = () => {
    // signInWithGoogle();
    loginGoogle();
    setLogged(true);
    setNick("");
    setSignedGoogle("googleLogin");
    // localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("google", signedGoogle);
    // console.log("localStorage: google:", localStorage.getItem("google"));
  };

  const handleRegister = () => {
    setForm(false);
    setRegister(true);
  };

  const handleBack = () => {
    setForm(true);
    setLog(false);
    setRegister(false);
  };

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

  // console.log(user);
  // console.log("CurrentUser:", auth.currentUser?.email);
  // // console.log("Login email:", loginEmail);
  // // console.log("Login psswd:", loginPsswd);

  return (
    <>
      {form && (
        <div className="login_wrapper">
          <h1 className="login_title">Continue to your account</h1>
          <div>
            <div className="login_buttons">
              <button
                className="login_btn login_btn--email"
                onClick={handleLogin}
              >
                <div>
                  <i className="fas fa-envelope icon_mail"></i>
                </div>
                <div>Email</div>
              </button>
            </div>
            <div className="login_buttons">
              <button
                className=" login_btn login_btn--google"
                onClick={handleLoginGoogle}
              >
                <div>
                  <i className="fab fa-google icon_google"></i>
                </div>
                <div>Google</div>
              </button>
            </div>
          </div>
          <div>
            <span className="no_account">Don't have an account?</span>{" "}
            <button className="signup_btn" onClick={handleRegister}>
              <u>Sign up</u>
            </button>
          </div>
        </div>
      )}
      {log && (
        <LoginForm
          email={loginEmail}
          regEmail={registerEmail}
          psswd={loginPsswd}
          hashedPsswd={hashedPsswd}
          setEmail={setLoginEmail}
          setPsswd={setLoginPsswd}
          onClick={handleLogin}
          setForm={setForm}
          setLogged={setLogged}
          setLog={setLog}
          created={created}
          user={user}
          handleBack={handleBack}
          // wrongPsswd={wrongPsswd}
          // setWrongPsswd={setWrongPsswd}
          nick={nick}
        />
      )}
      {register && (
        <SignupForm
          email={registerEmail}
          psswd={registerPsswd}
          setEmail={setRegisterEmail}
          setPsswd={setRegisterPsswd}
          nick={nick}
          setNick={setNick}
          setLog={setLog}
          setRegister={setRegister}
          setHashedPsswd={setHashedPsswd}
          setCreated={setCreated}
          authUser={authUser}
          handleBack={handleBack}
        />
      )}
      {/* <LoginForm
        email={loginEmail}
        psswd={loginPsswd}
        setEmail={setLoginEmail}
        setPsswd={setLoginPsswd}
        onClick={handleLogin}
      />
      <SignupForm
        email={registerEmail}
        psswd={registerPsswd}
        setEmail={setRegisterEmail}
        setPsswd={setRegisterPsswd}
        onClick={handleRegister}
      /> */}
      {/* <div>
        <h1 style={{ color: "white" }}> Login</h1>
        <input
          placeholder="Email..."
          // value={email}
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
        ></input>
        <input
          placeholder="Password..."
          // value={psswd}
          onChange={(e) => {
            setLoginPsswd(e.target.value);
          }}
        ></input>
        <button onClick={handleLogin}>Login</button>
        <button className="google_btn" onClick={handleLoginGoogle}>
          Login with Google
        </button>
      </div>
      <div>
        <h1 style={{ color: "white" }}> Register</h1>
        <input
          placeholder="Email..."
          // value={registerEmail}
          onChange={(e) => {
            setRegisterEmail(e.target.value);
          }}
        ></input>
        <input
          placeholder="Password..."
          // value={registerPsswd}
          onChange={(e) => {
            setRegisterPsswd(e.target.value);
          }}
        ></input>
        <button onClick={handleRegister}>Create account</button>
        <div style={{ color: "white" }}>
          Hello {user?.email}{" "}
          <img
            src={localStorage.getItem("photo")}
            style={{ borderRadius: "50%" }}
          ></img>
        </div>
        <button onClick={logout}>Log Out</button>
      </div> */}
    </>
  );
};

const LoginForm = ({
  email,
  regEmail,
  psswd,
  hashedPsswd,
  setEmail,
  setPsswd,
  setForm,
  setLogged,
  setLog,
  created,
  user,
  nick,
  handleBack,
}) => {
  const [wrongPsswd, setWrongPsswd] = useState(false);

  const handleLoggingIn = () => {
    login(email, psswd);
    // compare(email, regEmail, psswd, hashedPsswd);
    setForm(true);
    setLogged(true);
    setLog(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePsswd = (e) => {
    setPsswd(e.target.value);
  };

  return (
    <div className="login_wrapper login_wrapper--form">
      {!created && <h1 className="login_wrapper--title"> Login</h1>}
      {created && (
        <div className="login_wrapper--success">
          <i class="far fa-check-circle success_icon"></i>
          <span className="login_wrapper--txt">
            Your account has been successfully created.
          </span>
        </div>
      )}
      {wrongPsswd && (
        <div className="login_wrapper--fail">
          <i className="fas fa-exclamation excl_icon"></i>
          <span className="login_wrapper--mismatch">Details do not match.</span>
        </div>
      )}

      <TextField
        className="selections_all--inputs login_input"
        onChange={handleEmail}
        variant="outlined"
        label="Email..."
        value={email}
      />
      <TextField
        className="selections_all--inputs login_input"
        onChange={handlePsswd}
        variant="outlined"
        type="password"
        label="Password..."
        value={psswd}
      />
      <div className="login_btn--wrapper">
        <button className="login_btn" onClick={handleLoggingIn}>
          Login
        </button>
        <button className="signup_btn" onClick={handleBack}>
          <u>Back</u>
        </button>
      </div>
    </div>
  );
};

const SignupForm = ({
  email,
  psswd,
  nick,
  setEmail,
  setPsswd,
  setNick,
  setRegister,
  setLog,
  setHashedPsswd,
  setCreated,
  setUsers,
  handleBack,
}) => {
  const [psswd1, setPsswd1] = useState("");
  const [psswd2, setPsswd2] = useState("");
  const [exist, setExist] = useState(false);
  const [mismatch, setMismatch] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  // const dispatch = useDispatch();

  const handleRegister = () => {
    setExist(false);
    if (psswd1 !== psswd2) {
      setPsswd1("");
      setPsswd2("");
      return setMismatch(true);
    } else {
      setPsswd(psswd2);
      setMismatch(false);
      register(nick, email, psswd2);
      if (register().isFulfilled) {
        setHashedPsswd(hashing(psswd2)); // te funkcje powinny sie wykonac dopiero po poprawnym sing up, bo inaczej kiedy wyskakuje blad, otwiera sie nowe okno z napisem ze sie udalo, kiedy tak nie jest (to tzrzebz by zapisac w then ale nie do konca wiem jak)
        setCreated(true); //
        setRegister(false); //
        setLog(true); //
        setError(""); //
        setLoading(true); //
      } else {
        return null;
      }
    }
    setLoading(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleNick = (e) => {
    setNick(e.target.value);
  };
  // console.log("Nick from localStorage:", localStorage.getItem("nick"));

  const handlePsswdFirst = (e) => {
    setPsswd1(e.target.value);
  };

  const handlePsswdSecond = (e) => {
    setPsswd2(e.target.value);
  };
  return (
    <div className="login_wrapper login_wrapper--form">
      <h1 className="login_wrapper--title"> Sign up</h1>
      {exist && (
        <div className="login_wrapper--fail">
          <i className="fas fa-exclamation excl_icon"></i>
          <span className="login_wrapper--mismatch">User already exists</span>
        </div>
      )}
      {mismatch && (
        <div className="login_wrapper--fail">
          <i className="fas fa-exclamation excl_icon"></i>
          <span className="login_wrapper--mismatch">
            Passwords are not idential.
          </span>
        </div>
      )}
      {error && (
        <div className="login_wrapper--fail">
          <i className="fas fa-exclamation excl_icon"></i>
          <span className="login_wrapper--mismatch">{error}</span>
        </div>
      )}
      {/* {error && <Alert variant="danger">{error}</Alert>} */}
      <TextField
        className="selections_all--inputs login_input"
        onChange={handleNick}
        variant="outlined"
        label="Name..."
        value={nick}
      />
      <TextField
        className="selections_all--inputs login_input"
        onChange={handleEmail}
        variant="outlined"
        label="Email..."
        value={email}
      />
      <TextField
        className="selections_all--inputs login_input"
        onChange={handlePsswdFirst}
        variant="outlined"
        // type="password"
        label="Password..."
        value={psswd1}
      />
      <TextField
        className="selections_all--inputs login_input"
        onChange={handlePsswdSecond}
        variant="outlined"
        // type="password"
        label="Password..."
        value={psswd2}
      />
      <div className="login_btn--wrapper">
        <button
          className="login_btn"
          onClick={handleRegister}
          disables={loading}
        >
          Create account
        </button>
        <button className="signup_btn" onClick={handleBack}>
          <u>Back</u>
        </button>
      </div>
      <div style={{ color: "white" }}>
        {/* Hello {user?.email}{" "}
        <img
          src={localStorage.getItem("photo")}
          style={{ borderRadius: "50%" }}
        ></img> */}
      </div>
    </div>
  );
};

export { Login, LoginForm, SignupForm };
