import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

const Form = ({
  inputs,
  setInputs,
  origin,
  destination,
  bothWays,
  onChange,
}) => {
  const handleForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  //   console.log("State from Form:", inputs);

  return (
    <form
      className="selections_all"
      onSubmit={() => onChange(origin, destination)}
    >
      <TextField
        className="selections_all--inputs"
        variant="outlined"
        onChange={handleForm}
        type="text"
        label="From..."
        name="origin"
      />
      <TextField
        className="selections_all--inputs"
        variant="outlined"
        onChange={handleForm}
        type="text"
        label="To..."
        name="destination"
      />
      <TextField
        className="selections_all--inputs"
        variant="outlined"
        onChange={handleForm}
        type="date"
        label="Depart..."
        name="departure"
      />
      {bothWays === "both_ways" && (
        <>
          <TextField
            className="selections_all--inputs"
            variant="outlined"
            onChange={handleForm}
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
