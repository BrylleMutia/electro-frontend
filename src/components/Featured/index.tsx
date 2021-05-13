import React, { useState } from "react";
import styles from "./Featured.module.scss";
import { useAppSelector } from "../../redux/hooks";

import { StyledTabs } from "../StyledComponents";
import Tab from "@material-ui/core/Tab";
import { TabPanel } from "../AuthForm";
import OfferGroup from "./OfferGroup";
import Product from "./OfferGroup/Product";

function Featured() {
  const { offers } = useAppSelector((state) => state.shop);
  const [tabView, setTabView] = useState<number>(0);

  const handleTabChange = (e: React.ChangeEvent<{}>, tabIndex: number) => {
    setTabView(tabIndex);
  };

  return (
    <section>
      <StyledTabs className={styles.tabs} textColor="secondary" variant="fullWidth" indicatorColor="secondary" centered value={tabView} onChange={handleTabChange} aria-label="featured products tab">
        {Object.keys(offers).map((offerTitle, index) => (
          <Tab key={index} label={offerTitle} />
        ))}
      </StyledTabs>

      {Object.keys(offers).map((offerTitle, index) => (
        <TabPanel value={tabView} index={index} key={index}>
          <OfferGroup key={index} offerProducts={offers[offerTitle]} />
        </TabPanel>
      ))}
    </section>
  );
}

export default Featured;
export { OfferGroup, Product };