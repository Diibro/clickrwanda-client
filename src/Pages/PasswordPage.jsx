import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getItemUrlToken } from "../utils/urlFunctions";
import Loading from "../components/static/Loading";
import server from "../config/Server";
import { ActionBtn } from "../components/dynamic/Buttons";
import AppData from "../Contexts/AppContext";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { Helmet } from "react-helmet";

const PasswordPage = () => {
     const location = useLocation();
     const [loading, setLoading] = useState(false);
     const [validity, setValidity] = useState(true);
     const [userInfo, setUserInfo] = useState({});
     const [passOn, setPassOn] = useState(false);
     const [,setData] = useContext(AppData);
     const navigate = useNavigate();
     const passRef = useRef(null);
     const token = getItemUrlToken(location.search);
     const getTokenEmail = async() => {
          try {
               console.log(token);
               setLoading(true);
               const res = await server.resetPassword('check-password-reset' , {token});
               if(res.status === "pass"){
                    setUserInfo((prev) => ({...prev,email: res.userEmail}));
               }else{
                    console.log(res);
                    setValidity(false);
               }
          } catch (error) {
               console.log(error);
               setValidity(false);
          }finally{
               setLoading(false);
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

     const checkPasswords = (e) => {
          e.preventDefault();
          if(e.target.value === userInfo.newPassword){
               passRef.current.style.border = "1px solid green";
               setUserInfo((prev) => ({...prev, passCheck: true}));
          }else{
               passRef.current.style.border = "1px solid red";
               setUserInfo((prev) => ({...prev, passCheck: false}));
          }
     }
     
     const submitForm = async() => {
          try {
               if(userInfo.passCheck && userInfo.email){
                    setLoading(true);
                    const res = await server.resetPassword('reset-password', {email: userInfo.email, newPassword: userInfo.newPassword});
                    if(res.status === "pass"){
                         raiseAlert('success', `${res.message}`, <TiTick />);
                         return navigate('/');

                    }else{
                         return raiseAlert('fail', `${res.message} .Try again`, <ImCross />);
                    }
               }
          } catch (error) {
               console.log("Error in Submit Form", error);
               return raiseAlert('fail', `Error .Try again`, <ImCross />);
          }finally{
               setLoading(false);
          }
     }
     useEffect(() => {
          (async() => await getTokenEmail())();
     }, [location.search]);
  return (
     <>
     <Helmet>
          <title>Recover Your Password | Click Rwanda</title>
     </Helmet>
     <div className="password-reset-page">
     {!loading ? 
     validity ? 
     <div className="password-reset-container">
          <h2>Reset your password</h2>
          <div className="reset-form">
               <p>Account email: <b>{userInfo.email}</b></p>
               <div className="group">
                    <label htmlFor="password">New Password:</label>
                    <input type={`${passOn ? 'text' : "password"}`} id="password" name="password" onChange={(e) => setUserInfo((prev) => ({...prev, newPassword: e.target.value}))}/>
               </div>
               <div className="group">
                    <label htmlFor="re-password">Re-type password:</label>
                    <input  ref={passRef} type={`${passOn ? 'text' : "password"}`} id="re-password" name="re-password" disabled={userInfo.newPassword ? false : true} onChange={e => checkPasswords(e)} />
               </div>
               <div className="group ">
                    <div className="row">
                         <input type="checkbox" id="show-password" onChange={(e) => setPassOn(e.target.checked ? true : false)} />
                         <label htmlFor="show-password">Show password</label>
                    </div>
               </div>
               <div>
                    <ActionBtn title="Reset" action={async () => await submitForm()} />
               </div>
          </div>
     </div>
     :
     <div className="password-reset-container">
          <h2>Invalid Link</h2>
          <p>This link has expired. Please try again later!</p>
          
     </div>
     : <Loading /> }
     
    </div>
     </>
    
  )
}

export default PasswordPage;