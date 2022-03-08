import React from "react";

const PriceTotal = ({ data }) => {
  return (
    <div className="flights_price--amount">
      {data[1].price} €/
      <span className="flights_price--person">person</span>
      <div className="flights_price--total">
        Total:{" "}
        {data[1].price * data.adults + (data[1].price / 2) * data.children} €
      </div>
    </div>
  );
};

const PriceTravelers = ({ data }) => {
  return (
    <div>
      <i className="fas fa-user-friends"></i>
      <span className="flights_price--passengers">{data.adults}</span>
      <i className="fas fa-baby baby_icon"></i>
      <span className="flights_price--passengers">{data.children}</span>
    </div>
  );
};

const FlightsPrice = ({ data }) => {
  return (
    <div className="flights_price">
      <PriceTravelers data={data} />
      <PriceTotal data={data} />
    </div>
  );
};

export { FlightsPrice };
