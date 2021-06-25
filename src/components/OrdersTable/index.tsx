import React from "react";
import styles from "./OrdersTable.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import type { StatusType } from "../../redux/cart/types";

import { createStyles, lighten, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Chip from "@material-ui/core/Chip";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import DoneIcon from "@material-ui/icons/Done";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { numWithCommas, capitalize } from "../../utils/filters";

interface Props {
  contentStatus: StatusType | StatusType[];
}

const OrdersTable: React.FC<Props> = ({ contentStatus }) => {
  const { sellerProducts } = useAppSelector((state) => state.dashboard);

  return (
    <TableContainer>
      <Table className={styles.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Buyer</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sellerProducts.map((productDetails, index) => {
            if (!productDetails.orders.length) return;

            return productDetails.orders.map((productOrders, index) => {
              // this component may have string or array as contentStatus prop
              // return nothing if contentStatus doesnt match or is not in given array
              if (Array.isArray(contentStatus)) {
                if (!contentStatus.includes(productOrders.status.name)) return;
              } else {
                if (productOrders.status.name !== contentStatus) return;
              }

              return (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox checked={productOrders.status_id !== 1} />
                  </TableCell>
                  <TableCell>
                    <Chip color={productOrders.status_id !== 1 ? "primary" : "secondary"} icon={productOrders.status_id !== 1 ? <DoneIcon /> : <HighlightOffIcon />} label={capitalize(productOrders.status.name)} />
                  </TableCell>
                  <TableCell>{productDetails.product_name}</TableCell>
                  <TableCell>{productOrders.pivot.quantity}</TableCell>
                  <TableCell>P {numWithCommas(Number(productDetails.price) * productOrders.pivot.quantity)}</TableCell>
                  <TableCell>{productOrders.user.name}</TableCell>
                </TableRow>
              );
            });
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
