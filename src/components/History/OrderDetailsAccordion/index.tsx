import React from "react";
import styles from "./OrderDetails.module.scss";
import type { OrderInterface } from "../../../redux/cart/types";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SummaryTable from "../../SummaryTable";

interface Props {
  details: OrderInterface;
}

const OrderDetails: React.FC<Props> = ({ details }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>{details.created_at}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <SummaryTable orderDetails={details} hideHeading={true} />
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderDetails;
