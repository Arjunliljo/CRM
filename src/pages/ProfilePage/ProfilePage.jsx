import React, { useState } from "react";
import LeftRound from "./LeftRound";
import ProfileRight from "./ProfileRight";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../../config/axiosInstance";
import { message } from "antd";
import { setupdateduser } from "../../../global/authSlice";

function Profilepage() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // Initialize state with user data
  const [formData, setFormData] = useState({
    name: user?.user?.name,
    email: user?.user?.email,
    phone: user?.user?.phone,
    addressOne: user?.user?.addressOne,
    addressTwo: user?.user?.addressTwo,
    image: user?.user?.image,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      // Create FormData object to handle file upload
      const formDataToSend = new FormData();

      // Append text fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('addressOne', formData.addressOne);
      formDataToSend.append('addressTwo', formData.addressTwo);
      formDataToSend.append('mainFolder', 'usersImages');
      formDataToSend.append('subFolder', user?.user?._id);

      // Handle image separately
      if (formData.image) {
        if (formData.image.startsWith('data:image')) {
          // Convert base64 to blob
          const base64Response = await fetch(formData.image);
          const blob = await base64Response.blob();
          // Important: Use 'image' as the field name to match what the middleware expects
          formDataToSend.append('image', blob, 'profile.jpg');
        } else if (typeof formData.image === 'string' && !formData.image.startsWith('data:image')) {
          // For existing image URLs, pass the URL as a string
          formDataToSend.append('imageUrl', formData.image);
        }
      }

      const response = await apiClient.patch(`/user/${user?.user?._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.data);
      dispatch(setupdateduser(response.data.data));

      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Error updating profile");
    }
  };

  return (
    <div className="profile-page">
      <LeftRound userImage={formData.image} onImageChange={handleImageChange} />
      <div className="profile-page__content">
        <ProfileRight
          user={formData}
          onInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        {/* <ProfileRight user={user?.user} /> */}
      </div>
    </div>
  );
}

export default Profilepage;
