import Header from "./components/Header";
import Content from "./components/Content";
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { AuthProvider } from "./contexts/AuthContext";
import { firebaseConfig } from "./js/firebase-config";

import "./scss/main.scss";

export default function App() {
  const app = initializeApp(firebaseConfig);
  const [main, setMain] = useState(true);
  const [labelName, setLabelName] = useState("My Flights");

  return (
    <div>
      <AuthProvider>
        <Header
          main={main}
          setMain={setMain}
          labelName={labelName}
          setLabelName={setLabelName}
        />
        <Content main={main} setMain={setMain} />
      </AuthProvider>
    </div>
  );
}
