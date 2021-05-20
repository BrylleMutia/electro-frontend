import React, { useState } from "react";
import styles from "./Auth.module.scss";
import TabPanel from "./TabPanel";
import BuyerImg from "./assets/buyer.png";
import SellerImg from "./assets/seller.png";
import { TextField, Tabs, Tab, Checkbox, FormControlLabel, Radio, RadioGroup, Button, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { register, login, clearErrors } from "../../redux/auth/authSlice";
import { Redirect } from "react-router";
import { UserType } from "../../redux/auth/types";

export interface RegisterInfo {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  address: string | null;
  barangay: string;
  city: string;
  province: string;
  zip_code: string;
}
export interface RegisterDetails {
  info: RegisterInfo;
  type: UserType;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface LoginDetails {
  info: LoginInfo;
  type: UserType;
}

function AuthForm() {
  const [regInfo, setRegInfo] = useState<RegisterInfo>({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    address: "",
    barangay: "",
    city: "",
    province: "",
    zip_code: "",
  });

  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  const [userType, setUserType] = useState<UserType>(UserType.BUYER);
  const [tabView, setTabView] = useState<number>(0);
  const [rememberUser, setRememberUser] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { isAuthenticated, error } = useAppSelector((state) => state.auth);

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.value) {
      case "buyer":
        setUserType(UserType.BUYER);
        break;
      case "seller":
        setUserType(UserType.SELLER);
        break;
      default:
        return;
    }
  };

  const handleTabChange = (e: React.ChangeEvent<{}>, tabIndex: number) => {
    // clear errors
    dispatch(clearErrors());
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

    if (tabView === 0) {
      // register
      dispatch(register({ info: regInfo, type: userType }));
    } else if (tabView === 1) {
      // login
      dispatch(login({ info: loginInfo, type: userType }));
    }
  };

  const getErrorMessage = () => {
    // display first error only
    return error.errors[Object.keys(error.errors)[0]];
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.auth}>
        <img src={userType === "buyer" ? BuyerImg : SellerImg} alt="user-type" />
        <div className={styles.auth_form}>
          <form onSubmit={authenticateUser}>
            <Tabs textColor="secondary" variant="fullWidth" indicatorColor="secondary" centered value={tabView} onChange={handleTabChange} aria-label="simple tabs example">
              <Tab label="Register" />
              <Tab label="Login" />
            </Tabs>

            <RadioGroup aria-label="user-type" color="primary" className={styles.radio_group} name="user-type" value={userType} onChange={handleUserTypeChange}>
              <FormControlLabel value={UserType.BUYER} control={<Radio />} label="Buyer" />
              <FormControlLabel value={UserType.SELLER} control={<Radio />} label="Seller" />
            </RadioGroup>

            {/* ERROR MESSAGES */}
            {error.message && <Alert severity="error">{getErrorMessage()}</Alert>}

            {/* FORM FIELDS */}
            <TabPanel value={tabView} index={0}>
              <TextField onChange={handleRegInfoChange} name="name" fullWidth color="secondary" required type="text" id="form-name" label="Name" variant="outlined" margin="dense" />
              <TextField onChange={handleRegInfoChange} name="email" fullWidth color="secondary" required type="email" id="form-email" label="Email" variant="outlined" margin="dense" />
              <TextField onChange={handleRegInfoChange} name="phone" fullWidth color="secondary" required type="phone" id="form-phone" label="Phone Number" variant="outlined" margin="dense" />
              <TextField onChange={handleRegInfoChange} name="password" fullWidth color="secondary" required type="password" id="form-password" label="Password" variant="outlined" margin="dense" />
              <TextField onChange={handleRegInfoChange} name="password_confirmation" fullWidth color="secondary" required type="password" id="form-repassword" label="Confirm Password" variant="outlined" margin="dense" />
              <TextField onChange={handleRegInfoChange} name="address" fullWidth color="secondary" type="text" id="form-address" label="Address" variant="outlined" margin="dense" />
              <TextField onChange={handleRegInfoChange} name="barangay" fullWidth color="secondary" required type="text" id="form-barangay" label="Barangay" variant="outlined" margin="dense" />
              <TextField onChange={handleRegInfoChange} name="city" fullWidth color="secondary" required type="text" id="form-city" label="City" variant="outlined" margin="dense" />
              <TextField onChange={handleRegInfoChange} name="province" fullWidth color="secondary" required type="text" id="form-province" label="Province" variant="outlined" margin="dense" />
              <TextField onChange={handleRegInfoChange} name="zip_code" fullWidth color="secondary" required type="text" id="form-zip_code" label="Zip Code" variant="outlined" margin="dense" />

              <Button type="submit" variant="contained" color="secondary" className={styles.button}>
                Register
              </Button>
            </TabPanel>

            <TabPanel value={tabView} index={1}>
              <TextField onChange={handleLoginInfoChange} name="email" fullWidth color="secondary" required type="email" id="form-email" label="Email" variant="outlined" margin="dense" />
              <TextField onChange={handleLoginInfoChange} name="password" fullWidth color="secondary" required type="password" id="form-password" label="Password" variant="outlined" margin="dense" />
              <FormControlLabel label="Remember Me" control={<Checkbox checked={rememberUser} onChange={handleRememberUserToggle} inputProps={{ "aria-label": "primary checkbox" }} />} />

              <div className={styles.button_wrapper}>
                <Typography component="a" href="#" color="secondary">
                  Forgot password?
                </Typography>
                <Button type="submit" variant="contained" color="secondary">
                  Login
                </Button>
              </div>
            </TabPanel>
          </form>
        </div>
      </div>
    );
  } else return <Redirect to="/" />;
}

export { TabPanel };
export default AuthForm;
