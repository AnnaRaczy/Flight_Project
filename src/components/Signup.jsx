import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import useVisibleComponent from "../hooks/Visible";
import { schemaSignup } from "./validation";
import { useForm } from "react-hook-form";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";

const ErrorMessage = (nameValue) => {
  return <p>{`errors.${nameValue}?.message`}</p>;
};

export function TextInput({ register, fn, label, name, type }) {
  return (
    <TextField
      className="selections_all--inputs login_input"
      variant="outlined"
      ref={register}
      onChange={fn}
      label={label}
      name={name}
      type={type}
    />
  );
}

const SignupBtn = ({ fn }) => {
  return (
    <Button className="login_btn" onSubmit={fn}>
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

  // to connect it with yup, pass a yup resolver containing created schema
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schemaSignup),
  });
  //register = fn(determines which fields are used for validation)
  // handle = fn(as onSubmit of the form)
  //errors = obj(constains all errors dispalyed by yup and stored here)

  const handleForm = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const submitForm = (data) => {
    console.log(data.name);
    // if (state.password !== state.passwordConfirm) {
    //   console.log("Passwords do not match");
    // }
    signUserUp(data.name, data.email, data.password).catch((err) =>
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
          <TextInput
            label="Name..."
            name="name"
            type="text"
            // fn={handleForm}
            register={register} //to be part of validation
          />
          {/* <ErrorMessage nameValue="name" /> */}
          <p>{errors.name?.message}</p>
          <TextInput
            label="Email..."
            name="email"
            type="text"
            // fn={handleForm}
            register={register}
          />
          {/* <ErrorMessage nameValue="email" /> */}
          <p>{errors.email?.message}</p>
          <TextInput
            label="Password..."
            name="password"
            type="password"
            // fn={handleForm}
            register={register}
          />
          {/* <ErrorMessage nameValue="password" /> */}
          <p>{errors.password?.message}</p>
          <TextInput
            label="Password Confirmation..."
            name="passwordConfirm"
            type="password"
            // fn={handleForm}
            register={register}
          />
          {/* <ErrorMessage nameValue="passwordConfirm" /> */}
          <p>{errors.passwordConfirm && "Password don't match"}</p>
          <div className="login_btn--wrapper">
            <SignupBtn fn={handleSubmit(submitForm)} />
            <BackBtn fn={handleBack} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
