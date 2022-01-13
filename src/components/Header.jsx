import { useAuth } from "../contexts/AuthContext";
import { LoginButton } from "./LoginCard";
import { Button } from "@material-ui/core";

function HeaderBtn({ fn, label }) {
  return (
    <Button
      // id="demo-positioned-buttonLog"
      className="MuiButton-text-login"
      onClick={fn}
      autoFocus={false}
    >
      <span>{label}</span>
    </Button>
  );
}

function HeaderContent() {
  const { currentUser, signUserOut } = useAuth();

  const handleSignOut = () => {
    signUserOut();
  };

  const handleStorage = () => {
    // TODO
    return null;
  };

  if (currentUser === null) {
    return <LoginButton />;
  }
  console.log(currentUser);
  return (
    <span>
      Hello {currentUser.displayName}
      <HeaderBtn fn={handleStorage} label="My flights" />
      <HeaderBtn fn={handleSignOut} label="Log out" />
    </span>
  );
}

export default function Header() {
  return (
    <div className="header">
      <HeaderContent />
    </div>
  );
}
