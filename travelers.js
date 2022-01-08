import React, { useState } from "react";

const Travelers = ({ onChange, adults, children, setAdults, setChildren }) => {
  const [adultsT, setAdultsT] = useState(1);
  const [childrenT, setChildrenT] = useState(0);

  const handleMinusAdults = () => {
    adults > 2 ? setAdultsT((prevState) => (prevState -= 1)) : setAdultsT(1);
  };

  const handlePlusAdults = () => {
    setAdultsT((prevState) => (prevState += 1));
  };

  const handleMinusKids = () => {
    children > 0
      ? setChildrenT((prevState) => (prevState -= 1))
      : setChildrenT(0);
  };

  const handlePlusKids = () => {
    setChildrenT((prevState) => (prevState += 1));
  };

  console.log("Adults:", adults);
  console.log("Children:", children);

  const handleClick = () => {
    onChange(adultsT, childrenT);
  };

  return (
    <>
      <div id="travelers_wrapper" className="travelers">
        <h1 className="travelers_title">Passengers</h1>
        <div className="travelers_adults">
          <div value="adults" className="travelers_adults--box">
            <i className="fas fa-user travelers_icon--adults"></i>
            <div className="travelers_adults--info">
              <p>Adults</p>
              <p className="adults_age">16+</p>
            </div>
          </div>
          <div className="travelers_adults--numbers">
            <span
              className="travelers_box--sign minus"
              onClick={handleMinusAdults}
            >
              -
            </span>
            <input
              type="text"
              min="1"
              max="6"
              value={adultsT}
              className="travelers_box--number"
              readOnly
            />
            <span
              className="travelers_box--sign plus"
              onClick={handlePlusAdults}
            >
              +
            </span>
          </div>
        </div>
        <div className="travelers_children">
          <div value="children" className="travelers_adults--box">
            <i className="fas fa-baby travelers_icon--children"></i>
            <div className="travelers_children--info">
              <p>Children</p>
              <p className="children_age">
                0-15 <span className="children_age--price"> (half price)</span>
              </p>
            </div>
          </div>
          <div className="travelers_children--numbers">
            <span
              className="travelers_box--sign minus"
              onClick={handleMinusKids}
            >
              -
            </span>
            {/* <span className="travelers_box--number">{children}</span> */}
            <input
              type="text"
              min="0"
              max="4"
              value={childrenT}
              className="travelers_box--number"
              readOnly
            />
            <span className="travelers_box--sign plus" onClick={handlePlusKids}>
              +
            </span>
          </div>
        </div>
        <div>
          <button
            className="travelers_btn flights_price--btn"
            onClick={handleClick}
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export { Travelers };
