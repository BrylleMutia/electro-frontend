import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Showcase from "../components/Showcase";
import Featured from "../components/Featured";

export default function Home() {
  useEffect(() => {
    
  }, [])

  return (
    <>
      <div className="app">
        <Navbar />
      </div>
      <Showcase />
      <div className="app">
        <Featured />
      </div>
    </>
  );
}
