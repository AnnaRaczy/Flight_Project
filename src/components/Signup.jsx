import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import useVisibleComponent from "../hooks/Visible";
import { schemaSignup } from "./validation";
import { useForm } from "react-hook-form";
import { usersCollectionRef } from "./MyFlights";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc } from "firebase/firestore";

// const ErrorMessage = (nameValue) => {
//   return <p>{`errors.${nameValue}?.message`}</p>;
// };

const UserExists = () => {
  return (
    <p className="user_error">
      <i className="fas fa-exclamation-circle excl_mark"></i>User already exists
    </p>
  );
};

// export function TextInput({ register, fn, label, name, type }) {
//   return (
//     <TextField
//       className="selections_all--inputs login_input"
//       variant="outlined"
//       ref={register}
//       onChange={fn}
//       label={label}
//       name={name}
//       type={type}
//     />
//   );
// }

const SignupBtn = ({ fn }) => {
  const { handleSubmit } = useForm({ resolver: yupResolver(schemaSignup) });
  return (
    <Button className="login_btn" onClick={handleSubmit(fn)}>
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
  const [error, setError] = useState(false);
  const [state, setState] = useState({
    firstName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schemaSignup),
  });

  // const handleForm = (e) => {
  //   setError(false);
  //   const { name, value } = e.target;
  //   setState({
  //     ...state,
  //     [name]: value,
  //   });
  // };

  const submitForm = (data) => {
    // setError(false);
    signUserUp(data.firstName, data.email, data.password).catch((err) => {
      setError(true);
    });
    // const createUser = async () => {
    //   await addDoc(usersCollectionRef, [
    //     {
    //       name: state.firstName,
    //       email: state.email,
    //       adults: "",
    //       children: "",
    //       dateFrom: "",
    //       dateTo: "",
    //       flightFrom: "",
    //       flightTo: "",
    //       hourFrom: "",
    //       hourBack: "",
    //       price: "",
    //     },
    //   ]);
    // };
    // createUser();
    console.log("Data:", data);
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
          <TextField
            className="selections_all--inputs login_input"
            variant="outlined"
            label="Name..."
            name="firstName"
            type="text"
            // onChange={handleForm}
            ref={register} //to be part of validation
          />
          {/* <ErrorMessage nameValue="name" /> */}
          <p>{errors?.name?.message}</p>
          <TextField
            className="selections_all--inputs login_input"
            variant="outlined"
            label="Email..."
            name="email"
            type="text"
            // onChange={handleForm}
            ref={register}
          />
          {/* <ErrorMessage nameValue="email" /> */}
          <p>{errors?.email?.message}</p>
          <TextField
            className="selections_all--inputs login_input"
            variant="outlined"
            label="Password..."
            name="password"
            type="password"
            // onChange={handleForm}
            ref={register}
          />
          {/* <ErrorMessage nameValue="password" /> */}
          <p>{errors?.password?.message}</p>
          <TextField
            className="selections_all--inputs login_input"
            variant="outlined"
            label="Password Confirmation..."
            name="passwordConfirm"
            type="password"
            // onChange={handleForm}
            ref={register}
          />
          {/* <ErrorMessage nameValue="passwordConfirm" /> */}
          <p>{errors?.passwordConfirm && "Passwords don't match"}</p>
          <div className="login_btn--wrapper">
            {/* <SignupBtn fn={handleSubmit} submitForm={submitForm} /> */}
            <SignupBtn fn={submitForm} />
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
