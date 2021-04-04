import React, { useState } from 'react'
import styles from "./Auth.module.scss";

import BuyerImg from "./assets/buyer.png";
import SellerImg from "./assets/seller.png";

type userType = "buyer" | "seller";

function Auth() {
  const [user, setUser] = useState<userType | null>(null)

  return (
    <div className={styles.auth}>
      <img src={user === "buyer" ? BuyerImg : SellerImg} alt="user-type"/>
      <div>
        <form>
          
        </form>
      </div>
    </div>
  )
}

export default Auth;