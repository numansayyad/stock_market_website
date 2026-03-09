import React from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { GeneralContextProvider } from "./GeneralContext";

const Home = () => {
  return (
    <>
      <TopBar />
      <GeneralContextProvider>
        <Dashboard />
      </GeneralContextProvider>
    </>
  );
};

export default Home;

