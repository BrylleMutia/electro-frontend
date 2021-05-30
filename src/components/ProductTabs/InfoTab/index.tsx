import React, { useState } from "react";
import { UserDetails } from "../../../redux/auth/types";
import styles from "./InfoTab.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateUserInfo } from "../../../redux/auth/authSlice";

import Skeleton from "@material-ui/lab/Skeleton";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import PublishIcon from "@material-ui/icons/Publish";

interface Props {
  details: UserDetails;
  isLoading: boolean;
  hideEditButton: boolean;
}

const InfoTab: React.FC<Props> = ({ details, isLoading, hideEditButton }) => {
  const dispatch = useAppDispatch();
  const { userType } = useAppSelector((state) => state.auth);

  const [isEditMode, setIsEditMode] = useState(false);

  const [profileImage, setProfileImage] = useState<string | File>(details.image);
  const [profilePreviewImage, setProfilePreviewImage] = useState(details.image);

  const [profileName, setProfileName] = useState(details.name);
  const [profileAddress, setProfileAddress] = useState(details.address ?? "");
  const [profileBarangay, setProfileBarangay] = useState(details.barangay);
  const [profileCity, setProfileCity] = useState(details.city);
  const [profileProvince, setProfileProvince] = useState(details.province);
  const [profileZipCode, setProfileZipCode] = useState(details.zip_code);

  const handleEditMode = () => {
    // update info if edit mode is on
    if (isEditMode) {
      // store file and details in form data
      let profileData = new FormData();

      profileData.append("image", profileImage);
      profileData.append("name", profileName);
      profileData.append("address", profileAddress);
      profileData.append("barangay", profileBarangay);
      profileData.append("city", profileCity);
      profileData.append("province", profileProvince);
      profileData.append("zip_code", profileZipCode);

      if (userType) {
        dispatch(updateUserInfo({ userType, userInfo: profileData }));
      }
    }

    setIsEditMode((prev) => !prev);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      // create a temporary preview to be shown to the user
      setProfilePreviewImage(URL.createObjectURL(e.target.files[0]));
      setProfileImage(e.target.files[0]);
    }
  };

  return (
    <div className={styles.seller}>
      <div className={styles.seller_img}>
        {isLoading ? (
          <Skeleton>
            <img src={details.image} alt={details.name} />
          </Skeleton>
        ) : (
          <div className={styles.img_container}>
            <img src={isEditMode ? profilePreviewImage : details.image} alt={details.name} />
            <Button hidden={!isEditMode} component="label" variant="outlined" size="small" color="secondary" startIcon={<PublishIcon />}>
              Change picture
              <Input hidden={true} type="file" name="image" onChange={handleProfileImageChange} />
            </Button>
            <Button onClick={handleEditMode} hidden={hideEditButton} size="small" color="primary" variant="contained" disableElevation>
              {isEditMode ? "Save changes" : "Edit details"}
            </Button>
          </div>
        )}
      </div>

      <div>
        <div>
          <h5>Name</h5>
          {isEditMode ? <Input className={styles.update_name} value={profileName} name="name" style={{ marginBottom: "0.5em" }} onChange={(e) => setProfileName(e.target.value)} /> : <p>{isLoading ? <Skeleton /> : details.name}</p>}
        </div>
        <div>
          <h5>Email</h5>
          <p>{isLoading ? <Skeleton /> : details.email}</p>
        </div>
        <div>
          <h5>Phone</h5>
          <p>{isLoading ? <Skeleton /> : details.phone}</p>
        </div>
        <div>
          <h5>Address</h5>
          {isEditMode ? (
            <form className={styles.update_address}>
              <Input value={profileAddress} name="address" placeholder="Address" onChange={(e) => setProfileAddress(e.target.value)} />
              <Input value={profileBarangay} name="barangay" placeholder="Barangay" onChange={(e) => setProfileBarangay(e.target.value)} />
              <Input value={profileCity} name="city" placeholder="City" onChange={(e) => setProfileCity(e.target.value)} />
              <Input value={profileProvince} name="province" placeholder="Province" onChange={(e) => setProfileProvince(e.target.value)} />
              <Input value={profileZipCode} name="zip_code" placeholder="Zip Code" onChange={(e) => setProfileZipCode(e.target.value)} />
            </form>
          ) : (
            <p>{`${details.address ? details.address + ", " : ""}${details.barangay}, ${details.city}, ${details.province}, ${details.zip_code}`}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoTab;
