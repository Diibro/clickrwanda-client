import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../Contexts/UserContext";
import { DashboardContainer, DashboardRow } from "../components/dynamic/DashboardComponents";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { SubmitButton } from "../components/dynamic/Buttons";
import server from "../config/Server";
import AppData from "../Contexts/AppContext";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { Loadingv2 } from "../components/static/Loading";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const {userInfo} = user;
  const [,setData] = useContext(AppData);
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
    setProfileImage(userInfo.profile_image);
  }

  const changeProfileImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileImage(file);
      setNewImage(URL.createObjectURL(file));
    }

  } 

  const raiseAlert = (type, message, icon) => {
    setData((prev)=> ({
         ...prev,
         alertView:{
              on: true,
              content: {type, message, icon}
         }
    }));
}

  useEffect(() => {
    updateProfileImage();
  }, [newImage, user]);

  const submitForm = async (data) => {
    try {
      setLoading(true);
      const newData = new FormData();
      if(data.name != "") newData.append('name', data.name);
      if(data.username != "") newData.append('username', data.username);
      if(data.phone != "") newData.append('phone', data.name);
      
      if(data.location != "") {
        const location = {location: data.location, street: data.street || userInfo.location?.street || userInfo.user_location.street};
        newData.append('location', JSON.stringify(location));
      }
      if(fileImage != "") newData.append('logo', fileImage);
      const res = await server.updateUser(newData);
      if(res.status === "pass" ){
        raiseAlert('success', `${res.message}`, <TiTick />);
        const responce = await server.getUserData();
        if(responce.status === "pass"){
          localStorage.setItem('userData', JSON.stringify(responce.data));
        }
      }else{
        if(res.message === "No Authentication Token" || res.message === 'Authentication Error') setUser((prev) => ({...prev, activeForm:'login'}));
        return raiseAlert('fail', `${res.message} .Try again`, <ImCross />);
      }
    } catch (error) {
      console.log("Error : ", error);
      return raiseAlert('fail', 'An error occurred. Try again later', <ImCross />);
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
      <DashboardContainer>
        <form onSubmit={handleSubmit(submitForm)} >
          <DashboardRow>
            <h2>Profile Information: </h2>
          </DashboardRow>
          <DashboardRow>
            <div className="dash-col">
              <label htmlFor="profileImage">Profile Image:</label>
              <div className="image-dash-col">
                <input ref={profileRef} type="file" name="profileImage" accept="image/*" style={{display: "none"}} onChange={changeProfileImage} />
                <i className="edit-icon" onClick={promptNewFile}><FaEdit /></i>
                <img src={profileImage} alt="profile image" style={{ width: "100%" }} />
              </div>
            </div>
            <div className="dash-col">
              <div className="group">
                <label htmlFor="name">Full name:</label>
                <input type="text" name="name" {...register('name')} placeholder={userInfo.name || userInfo.full_name}/>
              </div>
              <div className="group">
                <label htmlFor="username">Business name:</label>
                <input type="text" name="username" {...register('username')} placeholder={userInfo.username}/>
              </div>
              
              
            </div>
          </DashboardRow>
          <DashboardRow>
            <h2> Contact Information: </h2>
          </DashboardRow>
          <DashboardRow>
            <div className="dash-col">
              <div className="group">
                <label htmlFor="email">Email Address:</label>
                <input type="email" name="email" disabled placeholder={userInfo.email || userInfo.user_email}/>
              </div>
              
            </div>
            <div className="dash-col">
              <div className="group">
                <label htmlFor="phone">Phone Number:</label>
                <input type="phone" name="phone" {...register('phone')} placeholder={userInfo.phone || userInfo.user_phone}/>
              </div>
            </div>
          </DashboardRow>
          <DashboardRow>
            <div className="dash-col">
              <div className="group">
                <label htmlFor="location">Business Location:</label>
                <input type="text" name="location" id="location" {...register('location')} placeholder={userInfo?.location?.location || userInfo.user_location?.location || "City"} />
              </div>
            </div>
            <div className="dash-col">
              <div className="group">
                <label htmlFor="street">Street:</label>
                <input type="text" name="street" id="street" {...register('street')} placeholder={userInfo?.location?.street || userInfo.user_location?.street ||"Address Street"} />
              </div>
            </div>
          </DashboardRow>
          <DashboardRow>
            <SubmitButton content={{title: "Save Changes", type: "submit"}} />
          </DashboardRow>
        </form>
        
      </DashboardContainer>
      {loading ? <Loadingv2 /> : null}
    </>
    
  )
}

export default Profile;

// const temp ={
//   if(localStorage.getItem('loginToken')) userData.loginToken = localStorage.getItem('loginToken');
//       if(data.name != "") userData.name = data.name;
//       if(data.username != "") userData.username = data.username;
//       if(data.phone != "") userData.phone = data.phone;
//       if(data.location != "") userData.location = {location: data.location, street: data.street || ""};
//       if(fileImage != "") userData.logo = fileImage;
// }