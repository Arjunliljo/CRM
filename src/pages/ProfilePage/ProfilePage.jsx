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
    name: user?.user?.name ,
    phone: user?.user?.phone ,
    addressOne: user?.user?.addressOne ,
    addressTwo: user?.user?.addressTwo ,
    image: user?.user?.image
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

    // Create a FormData object
    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('addressOne', formData.addressOne);
    data.append('addressTwo', formData.addressTwo);

    // Check if the image is a new file or an existing URL
    if (formData.image.startsWith('data:image')) {
      // If it's a new image, append it as a file
      const blob = await fetch(formData.image).then(res => res.blob());
      data.append('image', blob, 'profile-image.png');
    } else {
      // If it's an existing URL, append it as a string
      data.append('image', formData.image);
    }

    data.append('mainFolder', 'usersImages');
    data.append('subFolder', user?.user?._id);

    const response = await apiClient.patch(`/user/${user?.user?._id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

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