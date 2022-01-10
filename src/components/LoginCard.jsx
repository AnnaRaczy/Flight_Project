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
import { Login } from "./Login";
import { Signup } from "./Signup";

export function LoginEmail({ isComponentVisible, setIsComponentVisible }) {
  const handleLogin = () => {
    setIsComponentVisible(false);
  };
  return (
    <div className="login_buttons">
      <button className="login_btn login_btn--email" onClick={handleLogin}>
        <div>
          <i className="fas fa-envelope icon_mail"></i>
        </div>
        <div>Email</div>
      </button>
    </div>
  );
}

export function LoginGoogle({ isComponentVisible, setIsComponentVisible }) {
  const handleLoginGoogle = () => {
    setIsComponentVisible(false);
  };
  return (
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
  );
}

export function Register({ isComponentVisible, setIsComponentVisible }) {
  const handleRegister = () => {
    setIsComponentVisible(false);
  };
  return (
    <div>
      <span className="no_account">Don't have an account?</span>{" "}
      <button className="signup_btn" onClick={handleRegister}>
        <u>Sign up</u>
      </button>
    </div>
  );
}

export function LoginCard() {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useVisibleComponent(false);

  const handleRegister = (e) => {};
  const handleBack = () => {};

  return (
    <div>
      <Card className="login_wrapper">
        <CardHeader title="Continue to your account" />
        <CardContent>
          <LoginEmail setIsComponentVisible={setIsComponentVisible} />
          <LoginGoogle setIsComponentVisible={setIsComponentVisible} />
          <Register setIsComponentVisible={setIsComponentVisible} />
        </CardContent>
      </Card>
    </div>
  );
}

export function LoginButton() {
  const { currentUser } = useAuth();
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
        <span>Log In</span>
      </Button>
      <div ref={ref}>{isComponentVisible && <LoginCard />}</div>
    </div>
  );
}

{
  /* <span className="no_account">Don't have an account?</span>{" "}
            <button className="signup_btn" onClick={handleRegister}>
              <u>Sign up</u>
            </button> */
}

// import { SignupForm } from "./Signup"
// import { useState } from "react"
// import { useAuth } from "../contexts/AuthContext"

// import Alert from '@mui/material/Alert'
// import Button from '@mui/material/Button'
// import Dialog from '@mui/material/Dialog'
// import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
// import DialogTitle from '@mui/material/DialogTitle'
// import GoogleIcon from '@mui/icons-material/Google'
// import Snackbar from '@mui/material/Snackbar'
// import TextField from '@mui/material/TextField'

// // A component responsible for displaying a login form. The form contains two possibilities (email + password
// // and Google's OAuth2). In addition it allows users to create an account with the app.
// function LoginForm(props) {
//     const { open, handleClose } = props
//     const [state, setState] = useState({
//         "name": "",
//         "password": ""
//     })
//     const [openSignup, setOpenSignup] = useState(false)
//     const [error, setError] = useState()
//     const { logUserIn, logUserInWithGoogle } = useAuth()

//     function handleForm(e) {
//         setState({
//             ...state,
//             [e.target.id]: e.target.value
//         })
//     }

//     function handleSignup() {
//         handleClose()
//         setOpenSignup(true)
//     }

//     function handleCloseSignup() {
//         setOpenSignup(false)
//     }

//     async function handleEmailLogin(e) {
//         await logUserIn(state.name, state.password)
//             .catch(err => {
//                 if (err.code === "auth/wrong-password") {
//                     setError("Invalid password provided!")
//                 }
//             })
//         handleClose()
//     }

//     async function handleGoogleLogin(e) {
//         await logUserInWithGoogle()
//             .catch(err => setError(err.code))
//         handleClose()
//     }

//     return (
//         <div>
//             <Dialog open={open} onClose={ handleClose }>
//                 <DialogTitle>Log In</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         id="name"
//                         label="Email Address"
//                         type="email"
//                         fullWidth
//                         variant="standard"
//                         onChange={ handleForm }
//                     />
//                     <TextField
//                         margin="dense"
//                         id="password"
//                         label="Password"
//                         type="password"
//                         fullWidth
//                         variant="standard"
//                         onChange={ handleForm }
//                     />
//                     <Button onClick={ handleGoogleLogin } startIcon={<GoogleIcon />} fullWidth>Log In with Google</Button>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={ handleSignup }>Sign Up</Button>
//                     <Button onClick={ handleClose }>Cancel</Button>
//                     <Button onClick={ handleEmailLogin }>Log In</Button>
//                 </DialogActions>
//             </Dialog>
//             <SignupForm open={openSignup} handleClose={handleCloseSignup} />
//             {error && (
//                 <Snackbar open={true} autoHideDuration={6000} onClose={() => {setError()}} anchorOrigin={{ horizontal: "center", vertical: "top"}}>
//                     <Alert onClose={() => {setError()}} severity="error" sx={{ width: '100%' }}>
//                         {error}
//                     </Alert>
//                 </Snackbar>
//             )}
//         </div>
//     )
// }

// // A component responsible for logging in and signing up users.
// export function Login() {
//     const { currentUser, signUserOut } = useAuth()
//     const [open, setOpen] = useState(false)
//     const buttonLabel = currentUser ? "Log Out" : "Log In"

//     function handleClose() {
//         setOpen(false)
//     }

//     // If user is logged in, clicking on the button will log that user out, and if they're not, it will
//     // show the login form instead.
//     function handleClick() {
//         if (currentUser) {
//             signUserOut()
//         } else {
//             setOpen(true)
//         }
//     }

//     // Get a name to be displayed. If `currentUser` is not defined, the display name will be too and as a
//     // result the entire `Hello <name>` block will be omitted.
//     const displayName = currentUser?.displayName ? currentUser.displayName : currentUser?.email
//     return(
//         <div>
//             {displayName && <span className="header_name">Hello {displayName}</span>}
//             <Button
//                 id="demo-positioned-buttonLog"
//                 className="MuiButton-text-login"
//                 onClick={handleClick}
//                 autoFocus={false}
//             >
//                 <span>{buttonLabel}</span>
//             </Button>
//             <LoginForm open={open} handleClose={handleClose} />
//       </div>
//     )
// }
