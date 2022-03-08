import { createContext, useContext, useState } from "react";

const TravelersContext = createContext();

export function useTravelersAuth() {
  return useContext(TravelersContext);
}

export function TravelersProvider({ children }) {
  const [passengers, setPassengers] = useState({
    adults: " ",
    children: "",
  });

  const handlePassengers = (adults, children) => {
    setPassengers({
      adults: adults,
      children: children,
    });
  };

  const value = {
    passengers,
    handlePassengers,
  };

  return (
    <TravelersContext.Provider value={value}>
      {children}
    </TravelersContext.Provider>
  );
}
