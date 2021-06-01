import React, { useEffect } from "react";
import styles from "./Pages.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getOrderHistory } from "../redux/auth/authSlice";

import History from "../components/History";
import { InfoTab } from "../components/ProductTabs";
import { StyledBreadcrumb } from "../components/StyledComponents";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import Alert from "@material-ui/lab/Alert";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Paper } from "@material-ui/core";

export default function Profile() {
  const { userDetails, orderHistory, isLoading, userType } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrderHistory(0));
  }, []);

  if (!userDetails)
    return (
      <Alert icon={<HighlightOffIcon />} color="error">
        Please <Link to="/auth">register</Link> or <Link to="/auth">login</Link> first.
      </Alert>
    );

  return (
    <div className={styles.container}>
      <div className={styles.checkout_nav}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to={userType === "seller" ? "/seller/dashboard" : "/"}>
            <StyledBreadcrumb label="Home" icon={<HomeIcon fontSize="small" />} />
          </Link>
          <StyledBreadcrumb label="Profile" />
        </Breadcrumbs>
      </div>

      <div className={styles.my_lg}>
        <Paper elevation={1} className={styles.profile}>
          <InfoTab details={userDetails} isLoading={isLoading} hideEditButton={false} />
        </Paper>

        <History historyDetails={orderHistory} />
      </div>
    </div>
  );
}
