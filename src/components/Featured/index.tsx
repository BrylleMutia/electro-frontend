import React, { useState } from "react";
import styles from "./Featured.module.scss";
import OfferGroup from "./OfferGroup";
import Product from "./OfferGroup/Product";
// import Product1 from "./images/1/3.jpg";
// import Product2 from "./images/2/2.jpg";
// import Product3 from "./images/1/2.jpg";
// import Product4 from "./images/2/1.png";
// import Product5 from "./images/1/1.jpg";
// import Product6 from "./images/2/3.webp";
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
    <div>
      <Tabs className={styles.tabs} textColor="secondary" variant="fullWidth" indicatorColor="secondary" centered value={tabView} onChange={handleTabChange} aria-label="simple tabs example">
        {Object.keys(offers).map((offerTitle, index) => (
          <Tab label={offerTitle} />
        ))}
      </Tabs>

      {Object.keys(offers).map((offerTitle, index) => (
        <TabPanel value={tabView} index={index}>
          <OfferGroup key={index} offerProducts={offers[offerTitle]} />
        </TabPanel>
      ))}
    </div>
  );
}

export default Featured;
export { OfferGroup, Product };