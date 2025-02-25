import React, { useState } from "react";
import LeftRound from "./LeftRound";
import ProfileRight from "./ProfileRight";
import { useSelector } from "react-redux";
import apiClient from "../../../config/axiosInstance";

function Profilepage() {
  const user = useSelector((state) => state.auth);
  console.log(user, "user");

  // Initialize state with user data
  const [formData, setFormData] = useState({
    name: user?.user?.name || '',
    email: user?.user?.email || '',
    phone: user?.user?.phone || '',
    addressOne: user?.user?.addressOne || '',
    addressTwo: user?.user?.addressTwo || '',
    image: user?.user?.image || ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    console.log(formData, "formData");
    const response = await apiClient.patch(`/user/${user?.user?._id}`, {...formData,mainFolder:'usersImages',subFolder:user?.user?._id});
    console.log(response, "response");
  };

  return (
    <div className="profile-page">
      <LeftRound userImage={formData.image} onImageChange={handleImageChange} />
      <div className="profile-page__content">
        <ProfileRight user={formData} onInputChange={handleInputChange} handleSubmit={handleSubmit} />
        {/* <ProfileRight user={user?.user} /> */}
      </div>
    </div>
  );
}

export default Profilepage;