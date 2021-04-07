import React, { useState } from "react";
import styles from "./Auth.module.scss";
import TabPanel from "./TabPanel";
import BuyerImg from "./assets/buyer.png";
import SellerImg from "./assets/seller.png";
import { TextField, Tabs, Tab, Checkbox, FormControlLabel, Radio, RadioGroup, Button, Typography } from "@material-ui/core";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { increment, decrement } from "../../redux/counter/counterSlice";

interface RegisterInfo {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  location: String;
}

interface LoginInfo {
  email: string;
  password: string;
}

function Auth() {
  const [regInfo, setRegInfo] = useState<RegisterInfo>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    location: "",
  });
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  const [userType, setUserType] = useState<string | null>("buyer");
  const [tabView, setTabView] = useState<number>(0);
  const [rememberUser, setRememberUser] = useState<boolean>(false);

  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserType((e.target as HTMLInputElement).value);
  };

  const handleTabChange = (e: React.ChangeEvent<{}>, tabIndex: number) => {
    setTabView(tabIndex);
  };

  const handleRememberUserToggle = () => {
    setRememberUser((prev) => !prev);
  };

  const handleRegInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const authenticateUser = (e: React.FormEvent) => {
    e.preventDefault();
    // axios.get("/sellers").then(response => console.log(response.data));
    switch (userType) {
      case "buyer":
        if (tabView === 0) {
          // register
          axios
            .post("/user/register/", regInfo)
            .then((response) => {
              console.log(response.data);
            })
            .catch((err) => console.error(err.response.data));
        } else if (tabView === 1) {
          // login
          axios
            .post("/user/login", loginInfo)
            .then((response) => {
              console.log(response.data);
            })
            .catch((err) => console.error(err.response.data));
        }
        break;

      case "seller":
        if (tabView === 0) {
          // register
          axios
            .post("/seller/register", regInfo)
            .then((response) => {
              console.log(response.data);
            })
            .catch((err) => console.error(err.response.data));
        } else if (tabView === 1) {
          // login
          axios
            .post("/seller/login", loginInfo)
            .then((response) => {
              console.log(response.data);
            })
            .catch((err) => console.error(err.response.data));
        }
        break;

      default:
        return;
    }
  };

  return (
    <div className={styles.auth}>
      <img src={userType === "buyer" ? BuyerImg : SellerImg} alt="user-type" />
      <form className={styles.auth_form} onSubmit={authenticateUser}>
        <Tabs textColor="primary" variant="fullWidth" indicatorColor="primary" centered value={tabView} onChange={handleTabChange} aria-label="simple tabs example">
          <Tab label="Register" />
          <Tab label="Login" />
        </Tabs>

        <RadioGroup aria-label="user-type" color="primary" className={styles.radio_group} name="user-type" value={userType} onChange={handleUserTypeChange}>
          <FormControlLabel value="buyer" control={<Radio />} label="Buyer" />
          <FormControlLabel value="seller" control={<Radio />} label="Seller" />
        </RadioGroup>

        <TabPanel value={tabView} index={0}>
          <TextField onChange={handleRegInfoChange} name="name" fullWidth color="secondary" required type="text" id="form-name" label="Name" variant="outlined" margin="dense" />
          <TextField onChange={handleRegInfoChange} name="email" fullWidth color="secondary" required type="email" id="form-email" label="Email" variant="outlined" margin="dense" />
          <TextField onChange={handleRegInfoChange} name="password" fullWidth color="secondary" required type="password" id="form-password" label="Password" variant="outlined" margin="dense" />
          <TextField onChange={handleRegInfoChange} name="password_confirmation" fullWidth color="secondary" required type="password" id="form-repassword" label="Confirm Password" variant="outlined" margin="dense" />
          <TextField onChange={handleRegInfoChange} name="location" fullWidth color="secondary" required type="text" id="form-address" label="Address" variant="outlined" margin="dense" />

          <Button type="submit" variant="contained" color="primary" className={styles.button}>
            Register
          </Button>
        </TabPanel>

        <TabPanel value={tabView} index={1}>
          <TextField onChange={handleLoginInfoChange} name="email" fullWidth color="secondary" required type="email" id="form-email" label="Email" variant="outlined" margin="dense" />
          <TextField onChange={handleLoginInfoChange} name="password" fullWidth color="secondary" required type="password" id="form-password" label="Password" variant="outlined" margin="dense" />
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
      <h2>{value}</h2>
      <button onClick={() => dispatch(increment())}>++</button>
      <button onClick={() => dispatch(decrement())}>--</button>
    </div>
  );
}

export default Auth;
