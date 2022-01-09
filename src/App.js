import Header from "./components/Header"
import React from "react";
import { initializeApp } from "firebase/app";
import { AuthProvider } from "./contexts/AuthContext"
import { firebaseConfig } from "./js/firebase-config";

import "./scss/main.scss";

export default function App() {
    // Initialize Firebase with config.
    initializeApp(firebaseConfig);

    return (
        <div>
            <AuthProvider>
                <Header />
            </AuthProvider>
        </div>
    )
}
  /*
  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [data, setData] = useState(true);
  const [adultsPas, setAdultsPas] = useState(1);
  const [childrenPas, setChildrenPas] = useState(0);
  const [logged, setLogged] = useState(false);
  const [form, setForm] = useState(false);
  const [log, setLog] = useState(false);
  const [register, setRegister] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [nick, setNick] = useState("");
  const [signedGoogle, setSignedGoogle] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  // redux
  // const user = useSelector((state) => state.user.value);
  // const dispatch = useDispatch();
  //

  useEffect(() => {
    const newUser = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLogged(true);
        // const userData = async () => {
        //   const data = await db.collection("users").get(currentUser.uid);
        //   return data.displayName;
        // };
        // userData();
      }
    });
    return newUser;
  }, []);



  // console.log(typeof signedGoogle);
  // console.log("providerData:", user);
  // console.log("auth:", auth);
  // console.log("nick:", nick);
  // console.log("db:", db);

  function authHeader() {
    // returns authorization header with jwt token
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
      return { Authorization: "Bearer " + user.accessToken };
    } else {
      return {};
    }
  }
  // console.log("Access Token:", user?.accessToken);
  // console.log("displayName:", user?.displayName);
  // console.log("Email:", user?.email);
  // console.log("emailVerified:", user?.emailVerified);
  // console.log("Metadata:", user?.metadata);
  // console.log("providerData:", user?.providerData);
  // console.log("uid:", user?.uid);

  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setForm(true);
    const logVar = "Log in";
  };
  const handleLogout = () => {
    logout();
    setLogged(false);
    setForm(false);
    // dispatch(log_out());
  };

  // console.log("Logged:", logged);
  // console.log("Form:", form);
  // console.log("Log:", log);
  // console.log("Register:", register);
  // console.log("User:", user);
  // console.log("displayName:", user?.displayName);
  // console.log("Nick:", nick);
  // console.log("localStorage email:", localStorage.getItem("email"));
  // console.log("localStorage signedGoogle:", localStorage.getItem("google"));
  // console.log("signedGoogle:", signedGoogle);

  const handleAdd = (data) => {
    setFlights(Object.entries(data));
    // console.log("data:", Object.entries(data));
    // console.log("is data.length === 0?:", Object.entries(data).length === 0);
    // Object.entries(data).length === 0 ? setResult(false) : setResult(true);
  };

  const handleInputs = (origin, destination, result) => {
    setFrom(origin);
    setTo(destination);
    setData(result);

    // console.log("From:", from);
    // console.log("To:", to);
    // console.log("Result:", result);
  };

  const handleTravelers = (adults, children) => {
    setAdultsPas(adults);
    setChildrenPas(children);
  };

  const handleBackground = () => {
    setForm(false);
    setLog(false);
    setRegister(false);
  };

  const handleStorage = () => {};

  // console.log("Adults:", adultsPas);
  // console.log("Children:", childrenPas);

  return (
    <div>
      <div className="header">
        {!logged && (
          <div>
            <Button
              id="demo-positioned-buttonLog"
              className="MuiButton-text-login"
              aria-controls="demo-positioned-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              autoFocus={false}
            >
              <span onClick={handleLogin}>{logged ? "Log Out" : "Log In"}</span>
              { {form ? "Log Out" : "Log In"}  }
            </Button>
            <Menu
              id="demo-positioned-menuLog"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Login
                form={form}
                setForm={setForm}
                logged={logged}
                setLogged={setLogged}
                user={user}
                setUser={setUser}
                setUsers={setUsers}
                log={log}
                setLog={setLog}
                register={register}
                setRegister={setRegister}
                nick={nick}
                setNick={setNick}
                signedGoogle={signedGoogle}
                setSignedGoogle={setSignedGoogle}
                authUser={authUser}
              />
            </Menu>
          </div>
        )}
        {logged && (
          <>
            <span>
              { {signedGoogle !== "googleLogin" ? ( }
              {user?.displayName !== null ? (
                <h1>
                  <span className="header_greet">Hello</span>{" "}
                  <span className="header_name">{user?.displayName}</span>
                  { <span className="header_name">{user.nick}</span>}
                </h1>
              ) : (
                <h1>
                  <span className="header_greet">Hello</span>{" "}
                  <span className="header_name">
                    {user?.providerData[0].displayName}
                  </span>{" "}
                  <img
                    src={user?.providerData[0].photoURL}
                    style={{ borderRadius: "50%", height: "2em" }}
                  ></img>
                </h1>
              )}
            </span>
            <button
              className="header_btn header_btn--sign"
              onClick={handleStorage}
            >
              My flights
            </button>
            {{user !== null && <h1>Hello {user.email}</h1>}}
            <button
              className="header_btn header_btn--sign"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </>
        )}
      </div>
      <div onClick={handleBackground}>
        <NewFlight
          onAdd={handleAdd}
          onChange={handleInputs}
          onClick={handleTravelers}
          adults={adultsPas}
          children={childrenPas}
          setAdults={setAdultsPas}
          setChildren={setChildrenPas}
        />
        <ul>
          {flights !== null &&
            flights.map((item, id) => {
              // console.log("items:", { ...item });
              return (
                <Flight
                  key={id}
                  {...item}
                  inputFrom={from}
                  inputTo={to}
                  adults={adultsPas}
                  children={childrenPas}
                />
              );
            })}
          {data === false && (
            <div className="container no_flights">
              <i className="fas fa-exclamation-circle"></i>Sorry, we found no
              results on these dates.
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export { App };

// background: linear-gradient(
//   rgba(255, 255, 255, 0.925),
//   rgba(199, 193, 193, 0.233)
// );
*/
