import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import useVisibleComponent from "../hooks/Visible";

import {
  Button,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Typography,
} from "@material-ui/core";

export function SignupForm() {
  const { signUserUp } = useAuth();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleForm = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (state.password !== state.passwordConfirm) {
      console.log("Passwords do not match");
    }
    signUserUp(state.email, state.password).catch((err) =>
      console.log(JSON.stringify(err))
    ); // Handle errors here.
  };

  const handleBack = () => {};

  return (
    <div>
      <Card className="login_wrapper login_wrapper--form">
        <CardHeader title="Sign up" />
        <CardContent>
          <TextField
            className="selections_all--inputs login_input"
            label="Name..."
            name="name"
            variant="outlined"
            onChange={handleForm}
          />
          <TextField
            className="selections_all--inputs login_input"
            label="Email..."
            name="email"
            variant="outlined"
            onChange={handleForm}
          />
          <TextField
            className="selections_all--inputs login_input"
            label="Password..."
            name="password"
            type="password"
            variant="outlined"
            onChange={handleForm}
          />
          <TextField
            className="selections_all--inputs login_input"
            label="Password Confirmation..."
            name="passwordConfirm"
            type="password"
            variant="outlined"
            onChange={handleForm}
          />
          <Button className="login_btn" onClick={handleSubmit}>
            <Typography variant="button">Create Account</Typography>
          </Button>
          <button className="signup_btn" onClick={handleBack}>
            <u>Back</u>
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

export function SignupButton() {
  const { currentUser } = useAuth();
  const logged = currentUser !== null;
  const { ref, isComponentVisible, setIsComponentVisible } =
    useVisibleComponent(false);

  const handleClick = () => {
    setIsComponentVisible(true);
  };

  return (
    <div>
      <Button
        id="demo-positioned-buttonLog"
        className="MuiButton-text-login"
        onClick={handleClick}
        autoFocus={false}
      >
        <span>{logged ? "Log Out" : "Sign Up"}</span>
      </Button>
      <div ref={ref}>{isComponentVisible && <SignupForm />}</div>
    </div>
  );
}
