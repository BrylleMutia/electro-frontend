import React, { useState } from "react";
import styles from "./Sellers.module.scss";
import { useAppSelector } from "../../redux/hooks";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

export default function Sellers() {
  const { sellers } = useAppSelector((state) => state.shop);
  const [tabView, setTabView] = useState(0);

  const handleTabChange = (e: React.ChangeEvent<{}>, tabIndex: number) => {
    setTabView(tabIndex);
  };

  return (
    <section>
      <div className={styles.sellers_header}>
        <Typography>Sellers</Typography>
      </div>
      <Tabs
        value={tabView}
        onChange={handleTabChange}
        TabIndicatorProps={{
          style: {
            backgroundColor: "transparent",
          },
        }}
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example">
        {sellers?.map((seller, index) => (
          <Tab key={index} icon={<img src={seller.image} alt={seller.name} style={{ width: "80px" }} />} />
        ))}
      </Tabs>
    </section>
  );
}
