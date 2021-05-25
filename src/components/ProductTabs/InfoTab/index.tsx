import React from "react";
import { UserDetails } from "../../../redux/auth/types";
import styles from "./InfoTab.module.scss";


interface Props {
  details: UserDetails
}

const InfoTab: React.FC<Props> = ({ details}) => {
  return (
    <div className={styles.seller}>
      <div className={styles.seller_img}>
        <img src={details.image} alt={details.name} />
      </div>
      <div>
        <div>
          <h5>Name</h5>
          <p>{details.name}</p>
        </div>
        <div>
          <h5>Email</h5>
          <p>{details.email}</p>
        </div>
        <div>
          <h5>Phone</h5>
          <p>{details.phone}</p>
        </div>
        <div>
          <h5>Address</h5>
          <p>{`${details.address ? details.address + ", " : ""}${details.barangay}, ${details.city}, ${details.province}, ${details.zip_code}`}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoTab;
