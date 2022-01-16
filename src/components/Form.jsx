import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import iata from "../iata.json";
import { InputsError } from "./Error";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export function Inputs({ handleForm, type, label, name }) {
  return (
    <TextField
      className="selections_all--inputs login_input"
      variant="outlined"
      onChange={handleForm}
      type={type}
      label={label}
      name={name}
    />
  );
}

const Form = ({
  inputs,
  setInputs,
  bothWays,
  onChange,
  setCodeFrom,
  setCodeTo,
}) => {
  const [error, setError] = useState(false);

  const getCode = (data, input, fn) => {
    const code = data
      .filter((item) => item.city === input)
      .map((item) => item.code)
      .toString();
    return fn(code);
  };
  const handleForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    if (inputs.origin !== null) {
      getCode(iata, inputs.origin, setCodeFrom);
    }
    if (inputs.destination !== null) {
      getCode(iata, inputs.destination, setCodeTo);
    }
  };

  console.log("State from Form:", inputs);

  return (
    <form
      className="selections_all"
      onSubmit={() => onChange(inputs.origin, inputs.destination)}
    >
      <Inputs
        handleForm={handleForm}
        type="text"
        label="From..."
        name="origin"
      />
      <Inputs
        handleForm={handleForm}
        type="text"
        label="To..."
        name="destination"
      />
      <Inputs
        handleForm={handleForm}
        type="date"
        label="Depart..."
        name="departure"
      />
      {bothWays === "both_ways" && (
        <>
          <Inputs
            handleForm={handleForm}
            type="date"
            label="Return..."
            name="back"
          />
        </>
      )}
    </form>
  );
};

export default Form;
