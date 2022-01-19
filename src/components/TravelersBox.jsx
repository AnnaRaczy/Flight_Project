import React, { useState } from "react";
import Travelers from "./Travelers";
import { Button } from "@material-ui/core";
import Menu from "@mui/material/Menu";

const MenuContent = ({
  anchorEl,
  open,
  handleClose,
  passengers,
  setPassengers,
}) => {
  return (
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
      <Travelers
        onClick={handleClose}
        passengers={passengers}
        setPassengers={setPassengers}
      />
    </Menu>
  );
};
const ButtonMenu = ({ open, handleClick, adults, children }) => {
  return (
    <Button
      id="demo-positioned-buttonPas"
      aria-controls="demo-positioned-menu"
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      onClick={handleClick}
      autoFocus={false}
    >
      <i className="fas fa-user-friends users_icon"></i>{" "}
      <span className="users_icon--number">{adults + children}</span>
    </Button>
  );
};

const TravelersBox = ({ passengers, setPassengers }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id="travelers" className="travelers_box">
      <ButtonMenu
        open={open}
        handleClick={handleClick}
        adults={passengers.adults}
        children={passengers.children}
      />
      <MenuContent
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        passengers={passengers}
        setPassengers={setPassengers}
      />
    </div>
  );
};

export default TravelersBox;
