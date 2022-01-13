import React from "react";

const NumbersFrom = ({ data }) => {
  return (
    <div className="flights_numbers--from">
      <i className="fas fa-plane"></i>Flight Number: {data[1].flight_number}
    </div>
  );
};

const NumbersTo = ({ data }) => {
  return (
    <div className="flights_numbers--to">
      <i className="fas fa-plane"></i>Flight Number:{" "}
      {data[1].flight_number + 20}
    </div>
  );
};
const FlightsNumbers = ({ data }) => {
  return (
    <div className="flights_numbers">
      <NumbersFrom data={data} />
      <NumbersTo data={data} />
    </div>
  );
};

const DataFrom = ({ data, getHourBack }) => {
  return (
    <div className="flights_data--from">
      <div className="flight_day">{data[0]}</div>
      <span className="flight_hours">
        {data[1].departure_at.substr(11, 5)} -{" "}
        {getHourBack(data[1].departure_at)}
      </span>
      <div className="flights_cities">
        {data.inputFrom} - {data.inputTo}
      </div>
    </div>
  );
};

const DataTo = ({ data, getHourBack }) => {
  return (
    <div className="flights_data--to">
      <div className="flight_day">{data[1].return_at.substr(0, 10)}</div>
      <span className="flight_hours">
        {data[1].return_at.substr(11, 5)} - {getHourBack(data[1].return_at)}
      </span>
      <div className="flights_cities">
        {data.inputTo} - {data.inputFrom}
      </div>
    </div>
  );
};
const FlightsData = ({ data, getHourBack }) => {
  return (
    <div className="flights_data">
      <DataFrom data={data} getHourBack={getHourBack} />
      <DataTo data={data} getHourBack={getHourBack} />
    </div>
  );
};

const FlightsWrapper = ({ data, CheckboxStyled, getHourBack }) => {
  return (
    <div className="flights_wrapper">
      <span className="flights_checkboxes">
        <CheckboxStyled />
      </span>
      <FlightsData data={data} getHourBack={getHourBack} />
      <FlightsNumbers data={data} />
    </div>
  );
};

export { FlightsWrapper };
