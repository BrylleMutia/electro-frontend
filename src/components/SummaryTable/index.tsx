import React from "react";
import styles from "./SummaryTable.module.scss";
import { numWithCommas } from "../../utils/filters";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Hidden from "@material-ui/core/Hidden";
import { OrderWithProductsInterface } from "../../redux/cart/types";

interface Props {
  orderDetails: OrderWithProductsInterface | null;
  hideHeading?: boolean;
}

const SummaryTable: React.FC<Props> = ({ orderDetails, hideHeading = false }) => {
  return (
    <div className={styles.summary}>
      <h5>Transaction ID: {orderDetails?.transaction_id} </h5>
      {!hideHeading && <h3>Thank you for your purchase!</h3>}

      <TableContainer>
        <Table className={styles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <Hidden smDown>
                <TableCell align="right">Total Amount</TableCell>
              </Hidden>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetails?.products.map((product) => (
              <TableRow key={product.product_name}>
                <TableCell className={styles.product} component="th" scope="row">
                  <img src={product.product_image} alt="product" />
                  <div>{product.product_name}</div>
                </TableCell>
                <TableCell padding="none" align="right">
                  P {numWithCommas(product.price)}
                </TableCell>
                <TableCell align="right">{product.pivot.quantity}</TableCell>
                <Hidden smDown>
                  <TableCell align="right">P {numWithCommas(Number(product.price) * product.pivot.quantity)}</TableCell>
                </Hidden>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell className={styles.table_footer} color="secondary" align="right">
                Total
              </TableCell>
              <Hidden smDown>
                <TableCell className={styles.table_footer} align="right">
                  {orderDetails?.products.reduce((totalQuantity, product) => totalQuantity + product.pivot.quantity, 0)}
                </TableCell>
              </Hidden>
              <TableCell padding="none" className={styles.table_footer} align="right">
                P {numWithCommas((orderDetails?.total ?? 0) / 100) }  {/** divide by 100 to remove cents */ }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SummaryTable;
