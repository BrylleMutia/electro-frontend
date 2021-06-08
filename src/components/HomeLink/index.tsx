import React from "react";
import { Link } from "react-router-dom";
import { SellerHome, BuyerHome } from "./routesConfig";

import { useAppSelector } from "../../redux/hooks";

interface Props {
  props?: React.PropsWithChildren<React.ReactNode>;
}

const HomeLink: React.FC<Props> = ({ props, children }) => {
  const { userType } = useAppSelector((state) => state.auth);

  return (
    <Link to={userType === "seller" ? SellerHome : BuyerHome}>
      {children}
    </Link>
  );
};

export default HomeLink;
export { SellerHome, BuyerHome };
