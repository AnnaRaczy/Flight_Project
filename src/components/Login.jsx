import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
} from "@material-ui/core";

const UserError = () => {
  return (
    <p className="user_error">
      <i class="fas fa-exclamation-circle excl_mark"></i>User not found
    </p>
  );
};
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
  const [error, setError] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleForm = (e) => {
    setError(false);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    logUserIn(state.email, state.password).catch((err) => {
      console.log(JSON.stringify(err));
      setError(true);
    });
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
          {error && <UserError />}
          <TextInput
            fn={handleForm}
            label="Email..."
            name="email"
            type="text"
          />
          <TextInput
            fn={handleForm}
            label="Password..."
            name="password"
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
