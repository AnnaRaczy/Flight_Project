import { useAuth } from "../contexts/AuthContext";
import { LoginButton } from "./LoginCard";
import { Button } from "@material-ui/core";

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
      <Button
        // className="header_btn header_btn--sign"
        className="MuiButton-text-login"
        onClick={handleStorage}
        autoFocus={false}
      >
        <span>My flights</span>
      </Button>
      <Button
        id="demo-positioned-buttonLog"
        className="MuiButton-text-login"
        onClick={handleSignOut}
        autoFocus={false}
      >
        <span>Log Out</span>
      </Button>
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
