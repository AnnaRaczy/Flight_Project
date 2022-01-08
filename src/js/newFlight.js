import React, { useState } from "react";
import { getCode, getFlights } from "./functions";
import { Travelers } from "./travelers";
import iata from "../iata.json";
import airlines from "../airlines.json";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const NewFlight = ({
  onAdd,
  onChange,
  // onClick,
  adults,
  children,
  setAdults,
  setChildren,
}) => {
  const [bothWays, setBothWays] = useState("both_ways");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [back, setBack] = useState("");
  const [codeFrom, setCodeFrom] = useState("");
  const [codeTo, setCodeTo] = useState("");
  const [result, setResult] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElPas, setAnchorElPas] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPas = Boolean(anchorElPas);
  const handleClickPas = (e) => {
    setAnchorElPas(e.currentTarget);
  };
  const handleClosePas = () => {
    setAnchorElPas(null);
  };

  const handleBoth = () => {
    setBothWays("both_ways");
  };

  const handleOne = () => {
    setBothWays("oneway");
  };

  const handlePassengers = (adults, children) => {
    setAdults(adults);
    setChildren(children);
  };

  // console.log("Adults:", adultPas);
  // console.log("Children:", childPas);

  const getCode = (data, input, fn) => {
    const code = data
      .filter((item) => item.city === input)
      .map((item) => item.code)
      .toString();
    return fn(code);
  };

  const data = {
    codeTo,
    codeFrom,
    departure,
    back,
  };

  // console.log(data);

  // TODO
  // bothWays return set as visible but block the input
  // inputs are outside div when resizing - DONE

  // console.log("Origin:", origin);
  // console.log("Destination:", destination);
  // console.log("Departure:", departure);
  // console.log("Back:", back);
  // console.log("CodeFrom:", codeFrom);
  // console.log("CodeTo:", codeTo);

  const handleOrigin = (e) => {
    const newOrigin = e.target.value;
    setOrigin(newOrigin);
    getCode(iata, newOrigin, setCodeFrom);
  };

  const handleDestination = (e) => {
    const newDestination = e.target.value;
    setDestination(newDestination);
    getCode(iata, newDestination, setCodeTo);
  };

  const handleDeparture = (e) => {
    const newDeparture = e.target.value;
    setDeparture(newDeparture);
  };

  const handleBack = (e) => {
    const newBack = e.target.value;
    setBack(newBack);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    getFlights(codeTo, codeFrom, departure, back, onAdd, setResult);
    onChange(origin, destination, result);
    console.log("Origin, destination, result:", origin, destination, result);

    // setOrigin("");
    // setDestination("");
    // setDeparture("");
    // setBack("");
  };

  const styles = makeStyles({
    root: {
      background: "linear-gradient(45deg, #309c83, #78cfbb)",
      border: 0,
      borderRadius: 3,
      color: "white",
      padding: "0.7em 2em 0.7em 2em",
    },
  });

  function ButtonStyled() {
    const classes = styles();
    return (
      <Button className={classes.root} onClick={handleSubmit}>
        Search <i className="fas fa-arrow-right"></i>
      </Button>
    );
  }

  return (
    <div>
      <h1 className="title">Start your next journey...</h1>
      <div className="container flight_box">
        <div className="selections">
          <div className="selections_ways">
            <Button
              id="demo-positioned-button"
              aria-controls="demo-positioned-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              autoFocus={false}
            >
              Return <i className="fas fa-chevron-down arrow_icon"></i>
            </Button>
            <Menu
              id="demo-positioned-menu"
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
              <MenuItem onClick={(handleClose, handleBoth)}>Both ways</MenuItem>
              <MenuItem onClick={(handleClose, handleOne)}>One way</MenuItem>
            </Menu>
          </div>
          <div className="selections_travelers">
            <div id="travelers" className="travelers_box">
              <Button
                id="demo-positioned-buttonPas"
                aria-controls="demo-positioned-menu"
                aria-haspopup="true"
                aria-expanded={openPas ? "true" : undefined}
                onClick={handleClickPas}
                autoFocus={false}
              >
                <i className="fas fa-user-friends users_icon"></i>{" "}
                {/* <i className="fas fa-chevron-down arrow_icon"></i> */}
                <span className="users_icon--number">{adults + children}</span>
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorElPas}
                open={openPas}
                onClose={handleClosePas}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Travelers
                  onClick={handleClosePas}
                  onChange={handlePassengers}
                  adults={adults}
                  children={children}
                  setAdults={setAdults}
                  setChildren={setChildren}
                />
              </Menu>
            </div>
          </div>
        </div>
        <div>
          <form
            className="selections_all"
            onSubmit={(e) => onChange(origin, destination)}
          >
            <TextField
              className="selections_all--inputs"
              onChange={handleOrigin}
              variant="outlined"
              label="From..."
              value={origin}
            />
            <TextField
              className="selections_all--inputs"
              onChange={handleDestination}
              variant="outlined"
              label="To..."
              value={destination}
            />
            <TextField
              className="selections_all--inputs"
              onChange={handleDeparture}
              variant="outlined"
              type="date"
              label="Depart..."
            />
            {bothWays === "both_ways" && (
              <>
                <TextField
                  className="selections_all--inputs"
                  onChange={handleBack}
                  variant="outlined"
                  type="date"
                  label="Return..."
                />
              </>
            )}
          </form>
        </div>

        <div className="search_box">
          <ButtonStyled />
          {/* <button className="search_box--btn" onClick={handleSubmit}>
            Search <i className="fas fa-arrow-right"></i>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export { NewFlight };
