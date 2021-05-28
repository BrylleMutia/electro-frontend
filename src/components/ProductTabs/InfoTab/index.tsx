import React from "react";
import { UserDetails } from "../../../redux/auth/types";
import styles from "./InfoTab.module.scss";

import Skeleton from "@material-ui/lab/Skeleton";

interface Props {
  details: UserDetails;
  isLoading: boolean;
}

const InfoTab: React.FC<Props> = ({ details, isLoading }) => {
  return (
    <div className={styles.seller}>
      <div className={styles.seller_img}>
        {isLoading ? (
          <Skeleton>
            <img src={details.image} alt={details.name} />
          </Skeleton>
        ) : (
          <img src={details.image} alt={details.name} />
        )}
      </div>
      <div>
        <div>
          <h5>Name</h5>
          <p>{isLoading ? <Skeleton /> : details.name}</p>
        </div>
        <div>
          <h5>Email</h5>
          <p>{isLoading ? <Skeleton /> : details.email}</p>
        </div>
        <div>
          <h5>Phone</h5>
          <p>{isLoading ? <Skeleton /> : details.phone}</p>
        </div>
        <div>
          <h5>Address</h5>
          <p>{`${details.address ? details.address + ", " : ""}${details.barangay}, ${details.city}, ${details.province}, ${details.zip_code}`}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoTab;
