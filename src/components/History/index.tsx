import React, { useEffect } from "react";
import styles from "./History.module.scss";
import type { OrderInterface } from "../../redux/cart/types";

import OrderDetails from "./OrderDetailsAccordion";

interface Props {
  historyDetails: OrderInterface[];
}

const History: React.FC<Props> = ({ historyDetails }) => {
  return (
    <div>
      <h4 className={styles.mb_sm}>Recent purchases:</h4>
      {!historyDetails ? <h5>No recent purchases.</h5> : historyDetails.map((order, index) => <OrderDetails key={index} details={order} />)}
    </div>
  );
};

export default History;
