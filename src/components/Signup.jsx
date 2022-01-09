import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'

// A component responsible for displaying a form for signing up users with email and passowrd.
export function SignupForm(props) {
    const { signUserUp } = useAuth()
    const { open, handleClose } = props
    const [state, setState] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
    })
    const [error, setError] = useState()

    function handleForm(e) {
        setState({
            ...state,
            [e.target.id]: e.target.value
        })
    }

    async function handleSignUp(e) {
        if (state.password !== state.passwordConfirm) {
                setError("Passwords to not match!")
                return
        }

        await signUserUp(state.email, state.password)
            .catch(err => {
                if (err.code === "auth/email-already-in-use") {
                    setError("This e-mail is already registered!")
                    return
                }
                setError(err.code)
            })
        handleClose()
    }

    return(
        <div>
        <Dialog open={open} onClose={ handleClose }>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
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
                <TextField
                    margin="dense"
                    id="passwordConfirm"
                    label="Confirm password"
                    type="password"
                    fullWidth
                    variant="standard"
                    onChange={ handleForm }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={ handleClose }>Cancel</Button>
                <Button onClick={ handleSignUp }>Sign Up</Button>
            </DialogActions>
        </Dialog>
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
