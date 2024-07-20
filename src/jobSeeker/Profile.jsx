import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../Contexts/UserContext";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { SubmitButton } from "../components/dynamic/Buttons";
import server from "../config/Server";
import { Loadingv2 } from "../components/static/Loading";
import { showMainNotification } from "../utils/AdminFunctions";
import uploadFile from "../utils/aws-upload-functions";
import { s3Folders } from "../config/s3Config";
import locations from "../data/Location.json"

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const {userInfo} = user;
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [fileImage, setFileImage] = useState(null);
  const {register, handleSubmit } = useForm();
  const profileRef = useRef(null);
  
  const updateProfileImage = () => {
    if(newImage != ""){
      return setProfileImage(newImage);
    }
    setProfileImage(userInfo?.profile_image);
  }

  const changeProfileImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileImage(file);
      setNewImage(URL.createObjectURL(file));
    }

  } 

  useEffect(() => {
    updateProfileImage();
  }, [newImage, user]);

  const submitForm = async (data) => {
    try {
      setLoading(true);
      const newData = {
        user_id: userInfo.id || userInfo.user_id,
        user_email: userInfo.user_email,
        name: data.name || userInfo.name || userInfo.full_name,
        username: data.username || userInfo.username,
        phone: data.phone || userInfo.phone || userInfo.user_phone,
        active: userInfo.active,
        verified: userInfo.verified,
        profile_image: userInfo.profile_image,
        location: data.location ? {location: data.location, street: data?.street || userInfo.location?.street || userInfo.user_location?.street || "street"} : userInfo.location
      }
      if(newImage) {
        const logoUrl = await uploadFile(fileImage, s3Folders.logos);
        newData.profile_image = logoUrl;
      }
      const res = await server.updateUser(newData);
      if(res.status === "pass" ){
        showMainNotification('pass', `${res.message}`, () => {});
        const newUser = res.data;
        if( newUser){
          sessionStorage.setItem('userData', JSON.stringify(newUser));
          setUser((prev) =>({
            ...prev,
            userInfo: newUser

          }) )
        }
      }else{
        if(res.message === "No Authentication Token" || res.message === 'Authentication Error') setUser((prev) => ({...prev, activeForm:'login'}));
        return showMainNotification('fail', `${res.message} .Try again`, () => {});
      }
    } catch (error) {
      console.log("Error : ", error);
      return showMainNotification('fail', 'An error occurred. Try again later',() => {});
    }finally{
      setLoading(false);
    }
    
  }

  const promptNewFile = () => {
    if(profileRef.current){
      profileRef.current.click();
    }else{
      console.log(profileRef);
    }
    
  }
  return (
    <>
      <div className="user-dash-view-form">
        <form onSubmit={handleSubmit(submitForm)} >
          <div className="row" >
            <h2>Profile Information: </h2>
          </div>
          <div className="row">
            <div className="dash-col">
              <div className="group">
                <label htmlFor="profileImage">Profile Image:</label>
                <div className="image-dash-col">
                  <input ref={profileRef} type="file" name="profileImage" accept="image/*" style={{display: "none"}} onChange={changeProfileImage} />
                  <i className="edit-icon" onClick={promptNewFile}><FaEdit /></i>
                  <img src={profileImage} alt="profile image" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
            <div className="dash-col">
              <div className="group">
                <label htmlFor="name">Full name: <span>{userInfo?.name || userInfo?.full_name}</span></label>
                <input type="text" name="name" {...register('name')} placeholder={userInfo?.name || userInfo?.full_name}/>
              </div>
              <div className="group">
                <label htmlFor="username">Business name: <span>{userInfo?.username}</span></label>
                <input type="text" name="username" {...register('username')} placeholder={userInfo?.username}/>
              </div>
              
              
            </div>
          </div>
          <div className="row">
            <h2> Contact Information: </h2>
          </div>
          <div className="row">
            <div className="dash-col">
              <div className="group">
                <label htmlFor="email">Email Address: <span>{userInfo?.email || userInfo?.user_email}</span></label>
                <input type="email" name="email" disabled placeholder={userInfo?.email || userInfo?.user_email}/>
              </div>
              
            </div>
            <div className="dash-col">
              <div className="group">
                <label htmlFor="phone">Phone Number: <span>{userInfo?.phone || userInfo?.user_phone}</span></label>
                <input type="phone" name="phone" {...register('phone')} placeholder={userInfo?.phone || userInfo?.user_phone}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="dash-col">
              <div className="group">
                <label htmlFor="location">Business Location: <span>{userInfo?.location?.location || userInfo?.user_location?.location}</span></label>
                <select name="location" id="location" {...register('location')} placeholder={userInfo?.location?.location || userInfo?.user_location?.location || "City"}>
                  <option value="" disabled>Select new location...</option>
                  {
                    locations.districts.map((item, index) => <option key={`profile-change-location-${index}`} value={item}>{item}</option>)
                  }
                </select>
              </div>
            </div>
            <div className="dash-col">
              <div className="group">
                <label htmlFor="street">Street:</label>
                <input type="text" name="street" id="street" {...register('street')} placeholder={userInfo?.location?.street || userInfo?.user_location?.street ||"Address Street"} />
              </div>
            </div>
          </div>
          <div className="row">
            <SubmitButton content={{title: "Save Changes", type: "submit"}} />
          </div>
        </form>
        
      </div>
      {loading ? <Loadingv2 /> : null}
    </>
    
  )
}

export default Profile;

// const temp ={
//   if(sessionStorage.getItem('loginToken')) userData.loginToken = sessionStorage.getItem('loginToken');
//       if(data.name != "") userData.name = data.name;
//       if(data.username != "") userData.username = data.username;
//       if(data.phone != "") userData.phone = data.phone;
//       if(data.location != "") userData.location = {location: data.location, street: data.street || ""};
//       if(fileImage != "") userData.logo = fileImage;
// }