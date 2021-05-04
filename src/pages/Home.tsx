import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Showcase from "../components/Showcase";
import Featured from "../components/Featured";
import Categories from "../components/Categories";
import { useAppDispatch } from "../redux/hooks";
import { getAllProducts } from "../redux/shop/shopSlice";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts(0));
  }, [])

  return (
    <>
      <div className="app">
        <Navbar />
      </div>
      <Showcase />
      <div className="app">
        <Featured />
        <Categories />
      </div>
    </>
  );
}
