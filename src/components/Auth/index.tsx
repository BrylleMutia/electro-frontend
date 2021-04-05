import React, { useState } from "react";
import styles from "./Auth.module.scss";

import TabPanel from "./TabPanel";

import BuyerImg from "./assets/buyer.png";
import SellerImg from "./assets/seller.png";

import { TextField, Tabs, Tab, Checkbox, FormControlLabel, Radio, RadioGroup, Button, Typography } from "@material-ui/core";

function Auth() {
  const [user, setUser] = useState<string | null>("buyer");
  const [tabView, setTabView] = useState<number>(0);
  const [rememberUser, setRememberUser] = useState<boolean>(false);

  const handleUserchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((event.target as HTMLInputElement).value);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, tabIndex: number) => {
    setTabView(tabIndex);
  };

  const handleRememberUserToggle = () => {
    setRememberUser((prev) => !prev);
  };

  return (
    <div className={styles.auth}>
      <img src={user === "buyer" ? BuyerImg : SellerImg} alt="user-type" />
      <form method="POST" className={styles.auth_form}>
        <Tabs textColor="primary" variant="fullWidth" indicatorColor="primary" centered value={tabView} onChange={handleTabChange} aria-label="simple tabs example">
          <Tab label="Register" />
          <Tab label="Login" />
        </Tabs>

        <RadioGroup aria-label="gender" color="primary" className={styles.radio_group} name="gender1" value={user} onChange={handleUserchange}>
          <FormControlLabel value="buyer" control={<Radio />} label="Buyer" />
          <FormControlLabel value="seller" control={<Radio />} label="Seller" />
        </RadioGroup>

        <TabPanel value={tabView} index={0}>
          <TextField fullWidth color="secondary" required type="text" id="form-name" label="Name" variant="outlined" margin="dense" />
          <TextField fullWidth color="secondary" required type="email" id="form-email" label="Email" variant="outlined" margin="dense" />
          <TextField fullWidth color="secondary" required type="password" id="form-password" label="Password" variant="outlined" margin="dense" />
          <TextField fullWidth color="secondary" required type="password" id="form-repassword" label="Confirm Password" variant="outlined" margin="dense" />
          <TextField fullWidth color="secondary" required type="text" id="form-address" label="Address" variant="outlined" margin="dense" />

          <Button type="submit" variant="contained" color="primary" className={styles.button}>
            Register
          </Button>
        </TabPanel>

        <TabPanel value={tabView} index={1}>
          <TextField fullWidth color="secondary" required type="email" id="form-email" label="Email" variant="outlined" margin="dense" />
          <TextField fullWidth color="secondary" required type="password" id="form-password" label="Password" variant="outlined" margin="dense" />
          <FormControlLabel label="Remember Me" control={<Checkbox checked={rememberUser} onChange={handleRememberUserToggle} inputProps={{ "aria-label": "primary checkbox" }} />} />
          

          <div className={styles.button_wrapper}>
            <Typography component="a" href="#">
              Forgot password?
            </Typography>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </div>
        </TabPanel>
      </form>
    </div>
  );
}

export default Auth;
