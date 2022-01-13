import React from "react";

const PriceButton = () => {
  return <button className="flights_price--btn">SAVE</button>;
};
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
      {/* <div className="flights_price--name">Price:</div> */}
      <PriceTotal data={data} />
      <PriceButton />
    </div>
  );
};

export { FlightsPrice };
