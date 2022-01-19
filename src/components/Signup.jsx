import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { schemaSignup } from "./validation";
import { useForm, Controller } from "react-hook-form";
import { usersCollectionRef } from "./MyFlights";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc } from "firebase/firestore";

const UserExists = () => {
  return (
    <p className="user_error">
      <i className="fas fa-exclamation-circle excl_mark"></i>User already exists
    </p>
  );
};

const ControllerPsswdConf = ({ control }) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          className="selections_all--inputs login_input"
          variant="outlined"
          label="Password Confirmation..."
          type="password"
        />
      )}
      name="passwordConfirm"
      control={control}
    />
  );
};

const ControllerPsswd = ({ control }) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          className="selections_all--inputs login_input"
          variant="outlined"
          label="Password..."
          type="password"
        />
      )}
      name="password"
      control={control}
    />
  );
};

const ControllerEmail = ({ control }) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          className="selections_all--inputs login_input"
          variant="outlined"
          label="Email..."
          type="text"
        />
      )}
      name="email"
      control={control}
    />
  );
};

const ControllerName = ({ control }) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          className="selections_all--inputs login_input"
          variant="outlined"
          label="Name..."
          type="text"
        />
      )}
      name="firstName"
      control={control}
    />
  );
};

const Controllers = ({ errors, control }) => {
  return (
    <>
      <ControllerName control={control} />
      <p>{errors?.firstName?.message}</p>
      <ControllerEmail control={control} />
      <p>{errors?.email?.message}</p>
      <ControllerPsswd control={control} />
      <p>{errors?.password?.message}</p>
      <ControllerPsswdConf control={control} />
      <p>{errors?.passwordConfirm && "Passwords don't match"}</p>
    </>
  );
};

const SignupBtn = () => {
  return (
    <Button className="login_btn" type="submit" form="signup">
      Create Account
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
  const [error, setError] = useState(false);

  const defaultValues = {
    firstName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schemaSignup),
  });

  const onSubmit = (data) => {
    console.log("onSubmit", data);
    setError(false);
    signUserUp(data.firstName, data.email, data.password).catch((err) => {
      setError(true);
    });
    const createUser = async () => {
      await addDoc(usersCollectionRef, {
        email: data.email,
        adults: "",
        children: "",
        dateFrom: "",
        dateTo: "",
        flightFrom: "",
        flightTo: "",
        hourFrom: "",
        hourBack: "",
        price: "",
      });
    };
    createUser();
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
          {error && <UserExists />}
          <form id="signup" onSubmit={handleSubmit(onSubmit)}>
            <Controllers errors={errors} control={control} />
            <div className="login_btn--wrapper">
              <SignupBtn />
              <BackBtn fn={handleBack} />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
