import { useAuth } from "../contexts/AuthContext";
import { LoginButton } from "./LoginCard";
import { Button } from "@material-ui/core";

function HeaderBtn({ fn, label }) {
  return (
    <Button className="MuiButton-text-login" onClick={fn} autoFocus={false}>
      <span>{label}</span>
    </Button>
  );
}

function HeaderContent({ setMain, labelName, setLabelName }) {
  const { currentUser, signUserOut } = useAuth();

  const handleSignOut = () => {
    signUserOut();
    setMain(true);
  };

  const handleStorage = () => {
    if (labelName === "My Flights") {
      setMain(false);
      setLabelName("Main Page");
    } else {
      setMain(true);
      setLabelName("My Flights");
    }
  };

  if (currentUser === null) {
    return <LoginButton />;
  }
  return (
    <span>
      Hello {currentUser.displayName}
      <HeaderBtn fn={handleStorage} label={labelName} />
      <HeaderBtn fn={handleSignOut} label="Log out" />
    </span>
  );
}

export default function Header({ setMain, labelName, setLabelName }) {
  return (
    <div className="header">
      <HeaderContent
        setMain={setMain}
        labelName={labelName}
        setLabelName={setLabelName}
      />
    </div>
  );
}
