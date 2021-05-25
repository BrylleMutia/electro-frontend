import React, { useState } from "react";
import styles from "./ProductTabs.module.scss";
import { withStyles } from "@material-ui/core/styles"
import { useAppSelector } from "../../redux/hooks";;

import { StyledTabs } from "../StyledComponents";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../AuthForm/TabPanel";
import ReviewsTab from "./ReviewsTab";
import InfoTab from "./InfoTab";

const PRODUCT_TABS = ["Reviews", "Seller"];



function ProductTabs() {
  const [tabView, setTabView] = useState<number>(0);
  const { currentProduct } = useAppSelector((state) => state.shop);


  const handleTabChange = (e: React.ChangeEvent<{}>, tabIndex: number) => {
    setTabView(tabIndex);
  };

  return (
    <div className={styles.tabs_container}>
      <StyledTabs className={styles.tabs} textColor="secondary" indicatorColor="secondary" value={tabView} onChange={handleTabChange} aria-label="product tabs">
        {PRODUCT_TABS.map((productTab, index) => (
          <Tab key={index} label={productTab} />
        ))}
      </StyledTabs>

      <TabPanel value={tabView} index={0}>
        <ReviewsTab />
      </TabPanel>
      <TabPanel value={tabView} index={1}>
        <InfoTab details={currentProduct.seller} />
      </TabPanel>
    </div>
  );
}

export default ProductTabs;
export { ReviewsTab, InfoTab };
