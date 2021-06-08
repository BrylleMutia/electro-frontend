import React from "react";
import styles from "./History.module.scss";
import type { OrderWithProductsInterface } from "../../redux/cart/types";

import OrderDetails from "./OrderDetailsAccordion";

interface Props {
  historyDetails: OrderWithProductsInterface[];
}

const History: React.FC<Props> = ({ historyDetails }) => {
  return (
    <div>
      <h4 className={styles.mb_sm}>Recent purchases:</h4>
      {!historyDetails.length ? <h3>None</h3> : historyDetails.map((order, index) => <OrderDetails key={index} details={order} />)}
    </div>
  );
};

export default History;
