import React, { useEffect } from "react";
import styles from "./Seller.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllProducts } from "../../redux/shop/shopSlice";

import AddProductForm from "../../components/AddProductForm";

function AddProduct() {
  const { categories } = useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!Object.entries(categories).length) {
      dispatch(getAllProducts(0));
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.mt_xl}>
        <AddProductForm />
      </div>
    </div>
  );
}

export default AddProduct;
