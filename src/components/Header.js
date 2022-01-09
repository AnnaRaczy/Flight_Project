import { useAuth } from "../contexts/AuthContext"
import { LoginButton } from "./Login"
import { Button } from "@material-ui/core"

function HeaderContent() {
    const { currentUser, signUserOut } = useAuth()

    function handleSignOut(e) {
        signUserOut()
    }

    if (currentUser === null) {
        return <LoginButton />
    }
    console.log(currentUser)
    return (
        <span>
            Hello {currentUser.displayName}
            <Button
              id="demo-positioned-buttonLog"
              className="MuiButton-text-login"
              onClick={handleSignOut}
              autoFocus={false}
            >
                <span>Log Out</span>
            </Button>
        </span>
    )
}

export default function Header() {
    return (
        <div className="header">
            <HeaderContent />
        </div>
    )
}
