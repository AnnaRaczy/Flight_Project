import React, { useState } from "react";

const Title = () => {
  return <h1 className="travelers_title">Passengers</h1>;
};
const Adults = () => {
  return (
    <div value="adults" className="travelers_adults--box">
      <i className="fas fa-user travelers_icon--adults"></i>
      <div className="travelers_adults--info">
        <p>Adults</p>
        <p className="adults_age">16+</p>
      </div>
    </div>
  );
};

const InputAdults = ({ adults }) => {
  return (
    <input
      className="travelers_box--number"
      type="number"
      min="1"
      max="6"
      value={adults}
      readOnly
    />
  );
};
const AdultsNumber = ({ minus, adults, plus }) => {
  return (
    <div className="travelers_adults--numbers">
      <span className="travelers_box--sign minus" onClick={minus}>
        -
      </span>
      <InputAdults adults={adults} />
      <span className="travelers_box--sign plus" onClick={plus}>
        +
      </span>
    </div>
  );
};

const AdultsBox = ({ minus, adults, plus }) => {
  return (
    <div className="travelers_adults">
      <Adults />
      <AdultsNumber minus={minus} adults={adults} plus={plus} />
    </div>
  );
};

const Children = () => {
  return (
    <div value="children" className="travelers_adults--box">
      <i className="fas fa-baby travelers_icon--children"></i>
      <div className="travelers_children--info">
        <p>Children</p>
        <p className="children_age">
          0-15 <span className="children_age--price"> (half price)</span>
        </p>
      </div>
    </div>
  );
};

const InputChildren = ({ children }) => {
  return (
    <input
      className="travelers_box--number"
      type="number"
      min="0"
      max="5"
      value={children}
      readOnly
    />
  );
};
const ChildrenNumber = ({ minus, children, plus }) => {
  return (
    <div className="travelers_children--numbers">
      <span className="travelers_box--sign minus" onClick={minus}>
        -
      </span>
      <InputChildren children={children} />
      <span className="travelers_box--sign plus" onClick={plus}>
        +
      </span>
    </div>
  );
};
const ChildrenBox = ({ minus, children, plus }) => {
  return (
    <div className="travelers_children">
      <Children />
      <ChildrenNumber minus={minus} children={children} plus={plus} />
    </div>
  );
};

const ButtonDone = ({ handleClick }) => {
  return (
    <button className="travelers_btn flights_price--btn" onClick={handleClick}>
      Done
    </button>
  );
};
const Travelers = ({ setPassengers }) => {
  const [adultsT, setAdultsT] = useState(1);
  const [childrenT, setChildrenT] = useState(0);

  const handleMinusAdults = () => {
    adultsT > 2 ? setAdultsT((prevState) => (prevState -= 1)) : setAdultsT(1);
  };

  const handlePlusAdults = () => {
    adultsT < 6
      ? setAdultsT((prevState) => (prevState += 1))
      : setAdultsT((prevState) => prevState);
  };

  const handleMinusKids = () => {
    childrenT > 0
      ? setChildrenT((prevState) => (prevState -= 1))
      : setChildrenT(0);
  };

  const handlePlusKids = () => {
    childrenT < 5
      ? setChildrenT((prevState) => (prevState += 1))
      : setChildrenT((prevState) => prevState);
  };

  const handleClick = () => {
    setPassengers({
      adults: adultsT,
      children: childrenT,
    });
  };

  return (
    <>
      <div id="travelers_wrapper" className="travelers">
        <Title />
        <AdultsBox
          minus={handleMinusAdults}
          adults={adultsT}
          plus={handlePlusAdults}
        />
        <ChildrenBox
          minus={handleMinusKids}
          children={childrenT}
          plus={handlePlusKids}
        />
        <ButtonDone handleClick={handleClick} />
      </div>
    </>
  );
};

export default Travelers;
