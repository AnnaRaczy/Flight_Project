import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import useVisibleComponent from "../hooks/Visible";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
} from "@material-ui/core";

export function TextInput({ fn, name, label, type }) {
  return (
    <TextField
      className="selections_all--inputs login_input"
      variant="outlined"
      label={label}
      name={name}
      type={type}
      onChange={fn}
    />
  );
}

export function LoginBtn({ fn }) {
  return (
    <Button className="login_btn" onClick={fn}>
      <Typography variant="button">Log In</Typography>
    </Button>
  );
}

export function BackBtn({ fn }) {
  return (
    <button className="signup_btn" onClick={fn}>
      <u>Back</u>
    </button>
  );
}

export function LoginForm({ visible, setOpen, onClose, setOpenLoginForm }) {
  const { logUserIn } = useAuth();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleForm = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  // console.log("State Login:", state);

  const handleSubmit = () => {
    logUserIn(state.email, state.password).catch((err) =>
      console.log(JSON.stringify(err))
    ); // Handle errors here.
  };
  const handleBack = () => {
    setOpen(true);
    setOpenLoginForm(false);
  };

  return (
    <div>
      <Dialog
        open={visible}
        onClose={onClose}
        className="login_wrapper login_wrapper--form"
      >
        <DialogTitle className="Header">Continue to your account</DialogTitle>
        <DialogContent>
          <TextInput
            fn={handleForm}
            label="Email..."
            name="email" // added to state
            type="text"
          />
          <TextInput
            fn={handleForm}
            label="Password..."
            name="password" // added to state
            type="password"
          />
          <div className="login_btn--wrapper">
            <LoginBtn fn={handleSubmit} />
            <BackBtn fn={handleBack} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
