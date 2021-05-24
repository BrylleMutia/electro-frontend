import React from "react";
import styles from "./SellerTab.module.scss";
import { useAppSelector } from "../../../redux/hooks";

function SellerTab() {
  const { currentProduct } = useAppSelector((state) => state.shop);
  const { seller } = currentProduct;

  return (
    <div className={styles.seller}>
      <div className={styles.seller_img}>
        <img src={seller.image} alt="seller" />
      </div>
      <div>
        <div>
          <h5>Name</h5>
          <p>{seller.name}</p>
        </div>
        <div>
          <h5>Email</h5>
          <p>{seller.email}</p>
        </div>
        <div>
          <h5>Phone</h5>
          <p>{seller.phone}</p>
        </div>
        <div>
          <h5>Address</h5>
          <p>{`${seller.address ? seller.address + ", " : ""}${seller.barangay}, ${seller.city}, ${seller.province}, ${seller.zip_code}`}</p>
        </div>
      </div>
    </div>
  );
}

export default SellerTab;
