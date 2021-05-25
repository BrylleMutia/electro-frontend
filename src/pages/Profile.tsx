import React from "react";
import styles from "./Pages.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

import { InfoTab } from "../components/ProductTabs";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { StyledBreadcrumb } from "../components/StyledComponents";
import HomeIcon from "@material-ui/icons/Home";
import Alert from "@material-ui/lab/Alert";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Paper } from "@material-ui/core";

export default function Profile() {
  const { userDetails } = useAppSelector((state) => state.auth);

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
          <Link to="/">
            <StyledBreadcrumb label="Home" icon={<HomeIcon fontSize="small" />} />
          </Link>
          <StyledBreadcrumb label="Profile" />
        </Breadcrumbs>
      </div>

      <div className={styles.my_lg}>
        <Paper elevation={1} className={styles.profile}>
          <InfoTab details={userDetails} />
        </Paper>
      </div>
    </div>
  );
}
