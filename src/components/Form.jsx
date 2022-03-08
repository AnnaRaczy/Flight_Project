import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import iata from "../iata.json";

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
    if (inputs.origin) {
      getCode(iata, inputs.origin, setCodeFrom);
    }
    if (!inputs.destination) {
      getCode(iata, inputs.destination, setCodeTo);
    }
  };

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
