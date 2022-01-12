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

export function TextInput({ fn, label, name, type }) {
  return (
    <TextField
      className="selections_all--inputs login_input"
      variant="outlined"
      onChange={fn}
      label={label}
      name={name}
      type={type}
    />
  );
}

const SignupBtn = ({ fn }) => {
  return (
    <Button className="login_btn" onClick={fn}>
      <Typography variant="button">Create Account</Typography>
    </Button>
  );
};

export function SignupForm({
  visible,
  setOpen,
  onClose,
  setOpenRegForm,
  BackBtn,
}) {
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
    signUserUp(state.name, state.email, state.password).catch((err) =>
      console.log(JSON.stringify(err))
    ); // Handle errors here.
  };

  const handleBack = () => {
    setOpen(true);
    setOpenRegForm(false);
  };

  return (
    <div>
      <Dialog
        open={visible}
        onClose={onClose}
        className="login_wrapper login_wrapper--form"
      >
        <DialogTitle className="Header">Sign up</DialogTitle>
        <DialogContent>
          <TextInput label="Name..." name="name" type="text" fn={handleForm} />
          <TextInput
            label="Email..."
            name="email"
            type="text"
            fn={handleForm}
          />
          <TextInput
            label="Password..."
            name="password"
            type="password"
            fn={handleForm}
          />
          <TextInput
            label="Password Confirmation..."
            name="passwordConfirm"
            type="password"
            fn={handleForm}
          />
          <div className="login_btn--wrapper">
            <SignupBtn fn={handleSubmit} />
            <BackBtn fn={handleBack} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// export function SignupButton() {
//   const { currentUser } = useAuth();
//   const logged = currentUser !== null;
//   const { ref, isComponentVisible, setIsComponentVisible } =
//     useVisibleComponent(false);

//   const handleClick = () => {
//     setIsComponentVisible(true);
//   };

//   return (
//     <div>
//       <Button
//         id="demo-positioned-buttonLog"
//         className="MuiButton-text-login"
//         onClick={handleClick}
//         autoFocus={false}
//       >
//         <span>{logged ? "Log Out" : "Sign Up"}</span>
//       </Button>
//       <div ref={ref}>{isComponentVisible && <SignupForm />}</div>
//     </div>
//   );
// }
