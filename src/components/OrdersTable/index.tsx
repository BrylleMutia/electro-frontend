import React from "react";
import styles from "./OrdersTable.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import type { StatusType } from "../../redux/cart/types";
import type { OrderWithUserProductsAndStatusInterface } from "../../redux/dashboard/types";
import { updateOrderStatus } from "../../redux/dashboard/dashboardSlice";

import { withStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Hidden from "@material-ui/core/Hidden";
import DoneIcon from "@material-ui/icons/Done";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { numWithCommas, capitalize } from "../../utils/filters";

interface Props {
  contentStatus: StatusType | StatusType[];
  color?: "primary" | "secondary";
}

const OrdersTable: React.FC<Props> = ({ contentStatus, color = "primary" }) => {
  const StyledOrderTable = withStyles((theme) => ({
    root: {
      borderLeft: `5px solid ${theme.palette[color].main}`,
    },
  }))(Table);

  const { productOrders } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  const handleUpdateOrderStatus = (orderDetails: OrderWithUserProductsAndStatusInterface) => {
    dispatch(updateOrderStatus({ id: orderDetails.id, status_id: orderDetails.status_id === 1 ? 2 : 1 }));
  };

  // *if no order exists for current content, display nothing
  if (Array.isArray(contentStatus)) {
    let foundOrders = [];
    contentStatus.forEach((status) => {
      productOrders.forEach((order) => {
        if (order.status.name === status) foundOrders.push(order);
      });
    });
    if (foundOrders.length === 0) return <Alert severity="info">No records to show.</Alert>;
  } else {
    let foundOrders = productOrders.filter((order) => order.status.name === contentStatus);
    if (foundOrders.length === 0) return <Alert severity="info">No records to show.</Alert>;
  }

  return (
    <TableContainer>
      <StyledOrderTable className={styles.table} aria-label="simple table">
        <TableBody>
          {productOrders.map((productOrder, index) => {
            // this component may have string or array as contentStatus prop
            // return nothing if contentStatus doesnt match or is not in given array
            if (Array.isArray(contentStatus)) {
              if (!contentStatus.includes(productOrder.status.name)) return;
            } else {
              if (productOrder.status.name !== contentStatus) return;
            }

            return (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox checked={productOrder.status_id !== 1} onChange={() => handleUpdateOrderStatus(productOrder)} />
                </TableCell>
                <Hidden smDown>
                  <TableCell className={styles.status}>
                    <Chip color={productOrder.status_id !== 1 ? "primary" : "secondary"} icon={productOrder.status_id !== 1 ? <DoneIcon /> : <HighlightOffIcon />} label={capitalize(productOrder.status.name)} />
                  </TableCell>
                </Hidden>

                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <Hidden smDown>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Amount</TableCell>
                      </Hidden>
                      <TableCell>Buyer</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productOrder.products.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>{product.product_name} <span className={styles.details_mobile}> ({product.pivot.quantity} x P{numWithCommas(Number(product.price) * product.pivot.quantity)})</span></TableCell>
                        <Hidden smDown>
                          <TableCell>{product.pivot.quantity}</TableCell>
                          <TableCell>P {numWithCommas(Number(product.price) * product.pivot.quantity)}</TableCell>
                        </Hidden>
                        <TableCell>{productOrder.user.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableRow>
            );
          })}
        </TableBody>
      </StyledOrderTable>
    </TableContainer>
  );
};

export default OrdersTable;
