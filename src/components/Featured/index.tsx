import React, { useState } from "react";
import styles from "./Featured.module.scss";
import OfferGroup from "./OfferGroup";
import Product from "./OfferGroup/Product";
import { useAppSelector } from "../../redux/hooks";
import { Tab, Tabs } from "@material-ui/core";
import { TabPanel } from "../AuthForm";

function Featured() {
  const { offers } = useAppSelector((state) => state.shop);
  const [tabView, setTabView] = useState<number>(0);

  const handleTabChange = (e: React.ChangeEvent<{}>, tabIndex: number) => {
    setTabView(tabIndex);
  };

  return (
    <section>
      <Tabs className={styles.tabs} textColor="secondary" variant="fullWidth" indicatorColor="secondary" centered value={tabView} onChange={handleTabChange} aria-label="simple tabs example">
        {Object.keys(offers).map((offerTitle, index) => (
          <Tab key={index} label={offerTitle} />
        ))}
      </Tabs>

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