import React from 'react'
import styles from "./Pages.module.scss";
import { Link } from "react-router-dom";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { StyledBreadcrumb } from "../components/StyledComponents";
import HomeIcon from "@material-ui/icons/Home";

export default function Profile() {
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
        Profile
      </div>
    </div>
  )
}
