import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import useVisibleComponent from "../hooks/Visible"

import { Button, Card, CardHeader, CardContent, TextField, Typography } from '@material-ui/core'

export function SignupForm() {
    const { signUserUp } = useAuth()
    const [state, setState] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
    })


    function handleForm(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        if (state.password !== state.passwordConfirm) {
                console.log("Passwords do not match")
        }
        signUserUp(state.email, state.password)
            .catch(err => console.log(JSON.stringify(err)) ) // Handle errors here.
    }


    return(
        <div>
            <Card >
            <CardHeader title="Header" />
            <CardContent>
                <TextField label="email" name="email" variant="outlined" onChange={ handleForm } />
                <TextField label="password" name="password" type="password" variant="outlined" onChange={ handleForm } />
                <TextField label="Password Confirmation" name="passwordConfirm" type="password" variant="outlined" onChange={ handleForm } />
                <Button onClick={ handleSubmit }>
                <Typography variant="button">Sign Up</Typography>
                </Button>
            </CardContent>
            </Card>
        </div>
    )
}

export function SignupButton() {
    const { currentUser } = useAuth()
    const logged = currentUser !== null
    const { ref, isComponentVisible, setIsComponentVisible } = useVisibleComponent(false)

    function handleClick(e) {
        setIsComponentVisible(true)
    }

    return (
        <div>
            <Button
              id="demo-positioned-buttonLog"
              className="MuiButton-text-login"
              onClick={handleClick}
              autoFocus={false}
            >
                <span>{logged ? "Log Out" : "Sign Up"}</span>
            </Button>
            <div ref={ref}>
                {isComponentVisible && <SignupForm />}
            </div>
        </div>
    )
}
