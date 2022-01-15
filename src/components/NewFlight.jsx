import React, { useState } from "react";
import { getFlights } from "../js/functions";
import Ways from "./Ways";
import TravelersBox from "./TravelersBox";
import Form from "./Form";
import iata from "../iata.json";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const Title = () => {
  return <h1 className="title">Start your next journey...</h1>;
};
const Selections = ({ handleBoth, handleOne, passengers, setPassengers }) => {
  return (
    <div className="selections">
      <Ways handleBoth={handleBoth} handleOne={handleOne} />
      <div className="selections_travelers">
        <TravelersBox passengers={passengers} setPassengers={setPassengers} />
      </div>
    </div>
  );
};

const NewFlight = ({ onAdd, onChange, passengers, setPassengers }) => {
  const [bothWays, setBothWays] = useState("both_ways");
  const [codeFrom, setCodeFrom] = useState("");
  const [codeTo, setCodeTo] = useState("");
  const [result, setResult] = useState();
  const [inputs, setInputs] = useState({
    origin: "",
    destination: "",
    departure: "",
    back: "",
  });

  const getCode = (data, input, fn) => {
    const code = data
      .filter((item) => item.city === input)
      .map((item) => item.code)
      .toString();
    return fn(code);
  };

  const handleBoth = () => {
    setBothWays("both_ways");
  };

  const handleOne = () => {
    setBothWays("oneway");
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
  const handleSubmit = (e) => {
    e.preventDefault();
    getCode(iata, inputs.origin, setCodeFrom);
    getCode(iata, inputs.destination, setCodeTo);
    getFlights(
      codeTo,
      codeFrom,
      inputs.departure,
      inputs.back,
      onAdd,
      setResult
    );
    onChange(inputs.origin, inputs.destination, result);
  };

  return (
    <div>
      <Title />
      <div className="container flight_box">
        <Selections
          handleBoth={handleBoth}
          handleOne={handleOne}
          passengers={passengers}
          setPassengers={setPassengers}
        />
        <Form
          inputs={inputs}
          setInputs={setInputs}
          bothWays={bothWays}
          onChange={onChange}
        />
        <div className="search_box">
          <ButtonStyled />
        </div>
      </div>
    </div>
  );
};

export default NewFlight;