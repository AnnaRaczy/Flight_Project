import { SignupForm } from "./Signup"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import GoogleIcon from '@mui/icons-material/Google'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'


// A component responsible for displaying a login form. The form contains two possibilities (email + password
// and Google's OAuth2). In addition it allows users to create an account with the app.
function LoginForm(props) {
    const { open, handleClose } = props
    const [state, setState] = useState({
        "name": "",
        "password": ""
    })
    const [openSignup, setOpenSignup] = useState(false)
    const [error, setError] = useState()
    const { logUserIn, logUserInWithGoogle } = useAuth()

    function handleForm(e) {
        setState({
            ...state,
            [e.target.id]: e.target.value
        })
    }

    function handleSignup() {
        handleClose()
        setOpenSignup(true)
    }

    function handleCloseSignup() {
        setOpenSignup(false)
    }

    async function handleEmailLogin(e) {
        await logUserIn(state.name, state.password)
            .catch(err => {
                if (err.code === "auth/wrong-password") {
                    setError("Invalid password provided!")
                }
            })
        handleClose()
    }

    async function handleGoogleLogin(e) {
        await logUserInWithGoogle()
            .catch(err => setError(err.code))
        handleClose()
    }

    return (
        <div>
            <Dialog open={open} onClose={ handleClose }>
                <DialogTitle>Log In</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={ handleForm }
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={ handleForm }
                    />
                    <Button onClick={ handleGoogleLogin } startIcon={<GoogleIcon />} fullWidth>Log In with Google</Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleSignup }>Sign Up</Button>
                    <Button onClick={ handleClose }>Cancel</Button>
                    <Button onClick={ handleEmailLogin }>Log In</Button>
                </DialogActions>
            </Dialog>
            <SignupForm open={openSignup} handleClose={handleCloseSignup} />
            {error && (
                <Snackbar open={true} autoHideDuration={6000} onClose={() => {setError()}} anchorOrigin={{ horizontal: "center", vertical: "top"}}>
                    <Alert onClose={() => {setError()}} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            )}
        </div>
    )
}

// A component responsible for logging in and signing up users.
export function Login() {
    const { currentUser, signUserOut } = useAuth()
    const [open, setOpen] = useState(false)
    const buttonLabel = currentUser ? "Log Out" : "Log In"

    function handleClose() {
        setOpen(false)
    }

    // If user is logged in, clicking on the button will log that user out, and if they're not, it will
    // show the login form instead.
    function handleClick() {
        if (currentUser) {
            signUserOut()
        } else {
            setOpen(true)
        }
    }

    // Get a name to be displayed. If `currentUser` is not defined, the display name will be too and as a
    // result the entire `Hello <name>` block will be omitted.
    const displayName = currentUser?.displayName ? currentUser.displayName : currentUser?.email
    return(
        <div>
            {displayName && <span className="header_name">Hello {displayName}</span>}
            <Button
                id="demo-positioned-buttonLog"
                className="MuiButton-text-login"
                onClick={handleClick}
                autoFocus={false}
            >
                <span>{buttonLabel}</span>
            </Button>
            <LoginForm open={open} handleClose={handleClose} />
      </div>
    )
}
