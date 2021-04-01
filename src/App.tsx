import React from "react";
import "./App.scss";

import Navbar from "./components/Navbar";
import Showcase from "./components/Showcase";

import { Button } from 'antd';

function App(): JSX.Element {
  return (
    <div>
      <div className="app">
        <Navbar />
      </div>
      <Showcase />
    </div>
  );
}

export default App;
