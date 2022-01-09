import { useAuth } from "../contexts/AuthContext"
import { SignupButton } from "./Signup"

function Login() {
    return <SignupButton />
}

function Logged() {
   return <span>User is logged in.</span>
}

function HeaderContent() {
    const { currentUser } = useAuth()
    if (currentUser === null) {
        return <Login />
    }
    return <Logged />
}

export default function Header() {
    return (
        <div className="header">
            <HeaderContent />
        </div>
    )
}
