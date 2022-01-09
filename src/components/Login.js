import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import useVisibleComponent from "../hooks/Visible"

import { Button, Card, CardHeader, CardContent, TextField, Typography } from '@material-ui/core'

export function LoginForm() {
    const { logUserIn } = useAuth()
    const [state, setState] = useState({
        email: "",
        password: "",
    })


    function handleForm(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        logUserIn(state.email, state.password)
            .catch(err => console.log(JSON.stringify(err)) ) // Handle errors here.
    }


    return(
        <div>
            <Card >
            <CardHeader title="Header" />
            <CardContent>
                <TextField label="email" name="email" variant="outlined" onChange={ handleForm } />
                <TextField label="password" name="password" type="password" variant="outlined" onChange={ handleForm } />
                <Button onClick={ handleSubmit }>
                <Typography variant="button">Log In</Typography>
                </Button>
            </CardContent>
            </Card>
        </div>
    )
}

export function LoginButton() {
    const { currentUser } = useAuth()
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
                <span>Log In</span>
            </Button>
            <div ref={ref}>
                {isComponentVisible && <LoginForm />}
            </div>
        </div>
    )
}
