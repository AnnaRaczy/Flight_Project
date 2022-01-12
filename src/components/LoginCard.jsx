import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import useVisibleComponent from "../hooks/Visible";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
// import GoogleIcon from "@mui/icons-material/Google";
import { LoginForm } from "./Login";
import { SignupForm } from "./Signup";

export function BackBtn({ fn }) {
  return (
    <button className="signup_btn" onClick={fn}>
      <u>Back</u>
    </button>
  );
}

export function LoginEmail({ onClick }) {
  return (
    <div className="login_buttons">
      <button className="login_btn login_btn--email" onClick={onClick}>
        <div id="loginEmailButton">
          <i className="fas fa-envelope icon_mail"></i>
        </div>
        <div>Email</div>
      </button>
    </div>
  );
}

export function LoginGoogle({ onClick }) {
  return (
    <div className="login_buttons">
      <button className=" login_btn login_btn--google" onClick={onClick}>
        <div>
          <i className="fab fa-google icon_google"></i>
        </div>
        <div>Google</div>
      </button>
    </div>
  );
}

export function Register({ onClick }) {
  return (
    <div>
      <span className="no_account">Don't have an account?</span>{" "}
      <button className="signup_btn" onClick={onClick}>
        <u>Sign up</u>
      </button>
    </div>
  );
}

export function LoginCard({ open, setOpen, onClose }) {
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openRegForm, setOpenRegForm] = useState(false);
  const { logUserInGoogle } = useAuth();

  const onLoginClick = () => {
    setOpenLoginForm(true);
    onClose();
  };

  const onGoogleClick = () => {
    logUserInGoogle();
    onClose();
  };

  const onRegClick = () => {
    setOpenRegForm(true);
    onClose();
  };

  const onLoginClose = () => {
    setOpenLoginForm(false);
  };

  const onRegClose = () => {
    setOpenRegForm(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} className="login_wrapper">
        <DialogTitle>Hello</DialogTitle>
        <DialogContent>
          <LoginEmail onClick={onLoginClick} />
          <LoginGoogle onClick={onGoogleClick} />
          <Register onClick={onRegClick} />
        </DialogContent>
      </Dialog>
      <LoginForm
        visible={openLoginForm}
        setOpen={setOpen}
        setOpenLoginForm={setOpenLoginForm}
        onClose={onLoginClose}
        BackBtn={BackBtn}
      />
      <SignupForm
        visible={openRegForm}
        setOpen={setOpen}
        setOpenRegForm={setOpenRegForm}
        onClose={onRegClose}
        BackBtn={BackBtn}
      />
    </div>
  );
}

export function LogButton({ label, onClick }) {
  return (
    <Button
      id="demo-positioned-buttonLog"
      className="MuiButton-text-login"
      onClick={onClick}
      autoFocus={false}
    >
      <span>{label}</span>
    </Button>
  );
}

export function LoginButton() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <LogButton label="Log In" onClick={handleClick} />
      <LoginCard open={open} setOpen={setOpen} onClose={handleClose} />
    </div>
  );
}
