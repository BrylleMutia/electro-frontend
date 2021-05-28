import React, { useState } from "react";
import styles from "./Categories.module.scss";
import { useAppSelector } from "../../redux/hooks";

import { StyledTabs } from "../StyledComponents";
import Tab from "@material-ui/core/Tab";
import { TabPanel } from "../AuthForm";
import Category from "./Category";

const Categories = () => {
  const { categories, isLoading } = useAppSelector((state) => state.shop);
  const [tabView, setTabView] = useState<number>(0);

  const handleTabChange = (e: React.ChangeEvent<{}>, tabIndex: number) => {
    setTabView(tabIndex);
  };

  return (
    <section>
      <StyledTabs scrollButtons="auto" className={styles.tabs} textColor="secondary" variant="scrollable" indicatorColor="secondary" value={tabView} onChange={handleTabChange} aria-label="category tabs">
        {Object.keys(categories).map((categoryTitle, index) => (
          <Tab key={index} label={categoryTitle} />
        ))}
      </StyledTabs>

      {Object.keys(categories).map((categoryTitle, index) => (
        <TabPanel value={tabView} index={index} key={index} padding={0}>
          <div style={{ marginTop: "1.5em" }}>
            <Category isLoading={isLoading} categoryProducts={categories[categoryTitle]} />
          </div>
        </TabPanel>
      ))}
    </section>
  );
};

export default Categories;
export { Category };
