import React from "react";
import styles from "./Seller.module.scss";

import AddProductForm from "../../components/AddProductForm";

function AddProduct() {
  return (
    <div className={styles.container}>
      <div className={styles.mt_xl}>
        <AddProductForm />
      </div>
    </div>
  );
}

export default AddProduct;
