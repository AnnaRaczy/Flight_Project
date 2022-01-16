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

function HeaderContent({ setMain, labelName, setLabelName }) {
  const { currentUser, signUserOut } = useAuth();

  const handleSignOut = () => {
    signUserOut();
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
  console.log(currentUser);
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

// const Header = () => {
//   return (
//     <div className="header">
//       {!logged && (
//         <div>
//           <Button
//             id="demo-positioned-buttonLog"
//             className="MuiButton-text-login"
//             aria-controls="demo-positioned-menu"
//             aria-haspopup="true"
//             aria-expanded={open ? "true" : undefined}
//             onClick={handleClick}
//             autoFocus={false}
//           >
//             <span onClick={handleLogin}>{logged ? "Log Out" : "Log In"}</span>
//             {/* {form ? "Log Out" : "Log In"}  */}
//           </Button>
//           <Menu
//             id="demo-positioned-menuLog"
//             aria-labelledby="demo-positioned-button"
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleClose}
//             anchorOrigin={{
//               vertical: "top",
//               horizontal: "left",
//             }}
//             transformOrigin={{
//               vertical: "top",
//               horizontal: "left",
//             }}
//           >
//             <Login
//               form={form}
//               setForm={setForm}
//               logged={logged}
//               setLogged={setLogged}
//               user={user}
//               setUser={setUser}
//               setUsers={setUsers}
//               log={log}
//               setLog={setLog}
//               register={register}
//               setRegister={setRegister}
//               nick={nick}
//               setNick={setNick}
//               signedGoogle={signedGoogle}
//               signedGoogle={signedGoogle}
//               setSignedGoogle={setSignedGoogle}
//               authUser={authUser}
//             />
//           </Menu>
//         </div>
//       )}
//       {logged && (
//         <>
//           <span>
//             {/* {signedGoogle !== "googleLogin" ? ( */}
//             {user?.displayName !== null ? (
//               <h1>
//                 <span className="header_greet">Hello</span>{" "}
//                 <span className="header_name">{user?.displayName}</span>
//                 {/* <span className="header_name">{user.nick}</span> */}
//               </h1>
//             ) : (
//               <h1>
//                 <span className="header_greet">Hello</span>{" "}
//                 <span className="header_name">
//                   {user?.providerData[0].displayName}
//                 </span>{" "}
//                 <img
//                   src={user?.providerData[0].photoURL}
//                   style={{ borderRadius: "50%", height: "2em" }}
//                 ></img>
//               </h1>
//             )}
//           </span>
//           <button
//             className="header_btn header_btn--sign"
//             onClick={handleStorage}
//           >
//             My flights
//           </button>
//           {/* {user !== null && <h1>Hello {user.email}</h1>} */}
//           <button
//             className="header_btn header_btn--sign"
//             onClick={handleLogout}
//           >
//             Log Out
//           </button>
//         </>
//       )}
//     </div>
//   );
// };
