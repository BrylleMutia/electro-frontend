import React, { useState } from "react";
import styles from "./ProductTabs.module.scss";
import { withStyles } from "@material-ui/core/styles";

import { StyledTabs } from "../StyledComponents";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../AuthForm/TabPanel";
import ReviewsTab from "./ReviewsTab";
import SellerTab from "./SellerTab";

const PRODUCT_TABS = ["Reviews", "Seller"];



function ProductTabs() {
  const [tabView, setTabView] = useState<number>(0);

  const handleTabChange = (e: React.ChangeEvent<{}>, tabIndex: number) => {
    setTabView(tabIndex);
  };

  return (
    <div>
      <StyledTabs className={styles.tabs} textColor="secondary" indicatorColor="secondary" value={tabView} onChange={handleTabChange} aria-label="product tabs">
        {PRODUCT_TABS.map((productTab, index) => (
          <Tab key={index} label={productTab} />
        ))}
      </StyledTabs>

      <TabPanel value={tabView} index={0}>
        <ReviewsTab />
      </TabPanel>
      <TabPanel value={tabView} index={1}>
        <SellerTab />
      </TabPanel>
    </div>
  );
}

export default ProductTabs;
