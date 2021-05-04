import React, { useState } from "react";
import styles from "./Categories.module.scss";
import { useAppSelector } from "../../redux/hooks";
import Category from "./Category";
import { Tab, Tabs } from "@material-ui/core";
import { TabPanel } from "../AuthForm";

const Categories = () => {
  const { categories } = useAppSelector((state) => state.shop);
  const [tabView, setTabView] = useState<number>(0);

  const handleTabChange = (e: React.ChangeEvent<{}>, tabIndex: number) => {
    setTabView(tabIndex);
  };

  return (
    <div>
      <Tabs scrollButtons="auto" className={styles.tabs} textColor="secondary" variant="scrollable" indicatorColor="secondary" centered value={tabView} onChange={handleTabChange} aria-label="simple tabs example">
        {Object.keys(categories).map((categoryTitle, index) => (
          <Tab label={categoryTitle} />
        ))}
      </Tabs>

        {Object.keys(categories).map((categoryTitle, index) => (
          <TabPanel value={tabView} index={index}>
            <Category categoryProducts={categories[categoryTitle]} />
          </TabPanel>
        ))}
    </div>
  );
};

export default Categories;
