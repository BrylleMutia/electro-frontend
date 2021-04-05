import React from "react";
import styles from "TabPanel.module.scss";

import { Box, Typography } from "@material-ui/core";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel: React.FC<TabPanelProps> = ({ index, value, children }) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
