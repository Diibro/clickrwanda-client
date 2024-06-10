import { useContext, useEffect, useState } from "react";
import { ActionBtn, SubmitButton } from "../dynamic/Buttons";
import Title from "../dynamic/TitleComponents"
import { textColors, titleSize } from "../styles"
import UserContext from "../../Contexts/UserContext";
import { ImCross, ImTicket } from "react-icons/im";
import {  useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AppData from "../../Contexts/AppContext";
import server from "../../config/Server";
import Loading from "./Loading";
import { TiTick } from "react-icons/ti";
import { AddAdvertForm } from "../dynamic/Adverts.component";
import { getLocations } from "../../utils/locations";
import { PaymentPlanForm } from "./PaymentPlans.component";
import {getRwandaTime} from "../../utils/dateFunctions";
import AgentService from "../../services/Agent";
import { fetchIds } from "../../utils/urlFunctions";


const UserForms = () => {
     // const [user] = useContext(UserContext);
     // const {activeForm} = user;
     const location = useLocation()
     const {pathname} = location
     const activeForm = pathname.split("/")[2];
     useEffect(() => {
          console.log(pathname.split('/'))
     },[])
     
     if(activeForm != '') {
          return (
               <div className="user-forms hide-scroll">
                    {activeForm === 'login' ? <LoginForm /> : activeForm === 'signup' ? <SignUpForm /> : activeForm === "add-advert" ? <AddAdvertForm /> : activeForm === "reset-password" ? <PasswordResetResponce /> : activeForm === "payment-plan-form" ? <PaymentPlanForm /> : activeForm === "agent-login" ? <AgentLoginForm /> : null}
               </div>
          )
     }else{
          return(
               <></>
          )
     }
  
}

const LoginForm = () => {
     const [,setUser] = useContext(UserContext);
     const {register, handleSubmit,setValue} = useForm();
     const [,setData] = useContext(AppData);
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();
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
          const emailInput = document.getElementById('email_02');
          const passwordInput = document.getElementById('password_02');
          if (emailInput && emailInput.value) {
               setValue('email', emailInput.value, {shouldValidate: true, shouldDirty:true});
          }
          if (passwordInput && passwordInput.value) {
               setValue('password', passwordInput.value, {shouldValidate: true, shouldDirty:true});
          }
     }, [setValue]);

     const submitForm = async (data) => {
          try {
               setLoading(true);
               console.log(data);
               const formData = new FormData();
               formData.append('email', data.email);
               formData.append('password', data.password);
               const res = await server.login(data);
               console.log(res);
               if(res.status === "pass"){
                    sessionStorage.setItem('loginToken', res.loginToken);
                    sessionStorage.setItem('userData', JSON.stringify(res.data));
                    setUser((prev) => ({
                         ...prev,
                         userInfo: res.data,
                         loggedIn: true,
                         activeForm:''
                    }));
                    if(res.data.role !== "user" ){
                         raiseAlert("success", `You have been logged as admin`, <TiTick />);
                         return navigate("/admin");
                    }else{
                         raiseAlert('success', `${res.message} as ${res.data.username}`, <TiTick />)
                         return  navigate('/user-dashboard');
                    }
                    
               }else{
                    
                    return raiseAlert('fail', `${res.message} .Try again`, <ImCross />);
               }
          } catch (error) {
               return raiseAlert('fail', 'An error occurred. Try again later', <ImCross />);
          }finally{
               setLoading(false);
          }
     }

     const requestPasswordReset = async() => {
          try {
               setLoading(true);
               const emailInput = document.getElementById("email_02");
               let email = emailInput.value;
               if(email && email != ""){
                    const res = await server.resetPassword('request-reset',{email});
                    if(res.status === "pass") {
                         // raiseAlert('success', `${res.message}`, <TiTick />);
                         navigate("/forms/reset-password")
                    }else{
                         return raiseAlert('fail', `${res.message} .Try again`, <ImCross />);
                    }
               }
          } catch (error) {
               console.log(error);
               return raiseAlert('fail', `Error .Try again`, <ImCross />);
          }finally{
               setLoading(false);
          }
          
     }

     

     return(
          <div className="form-container hide-scroll">
               <Title content={{type: "medium", color:textColors.blue, size: titleSize.medium, name:"Login"}} />
               {!loading ?
               <>
                    <form onSubmit={handleSubmit(submitForm)} autoComplete="on">
                    <div className="group">
                         <label htmlFor="email_02">Email: </label>
                         <input type="email" name="email" id="email_02" {...register('email')} autoComplete="email" placeholder="User email..."  />
                    </div>
                    <div className="group">
                         <label htmlFor="password_02">Password: </label>
                         <input type="password" name="password" id="password_02" {...register('password')} placeholder="User Password" autoComplete="current-password" />
                    </div>
                    <div className="group align-right">
                         <SubmitButton content={{title: "Log in", type: 'submit'}} />
                    </div>
                    <div className="group align-right">
                         <p onClick={requestPasswordReset} className="forgot-password-para">Forgot Password</p>
                    </div>
               </form>
               <div className="line-divider"><p>Or</p></div>
               <p className="other-link">Staff Login <b onClick={() => navigate("/forms/agent-login")}>Agent</b></p>
               <p className="other-link">Don&rsquo;t have account <b onClick={() => navigate("/forms/signup")}>Sign Up</b></p>
               </>
               
               :<Loading />}
          </div>
     )
}

const SignUpForm = () => {
     const {register, handleSubmit, formState: {errors}} = useForm();
     const [,setUser] = useContext(UserContext);
     const [,setData] = useContext(AppData);
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();
     const [locations, setLocations] = useState([]);
     const location = useLocation();

     const raiseAlert = (type, message, icon) => {
          setData((prev)=> ({
               ...prev,
               alertView:{
                    on: true,
                    content: {type, message, icon}
               }
          }));
     }
     const submitForm = async (data) => {
          try {
               let date  = getRwandaTime();
               const {r_id} = fetchIds(location);
               setLoading(true); // Set loading to true when submitting
               const formData = new FormData();
               formData.append('name', data.name);
               formData.append('username', data.username);
               formData.append('email', data.email);
               formData.append('phone', data.phone);
               formData.append('userType', 'user');
               formData.append('password', data.password);
               formData.append('location', JSON.stringify(data.location));
               formData.append('registrationDate', date);
               formData.append('r_id', r_id);
               const res = await server.register(formData);
               if (res.status === "pass") {
               raiseAlert('success', 'Successfully created the account', <ImTicket />);
               navigate("/forms/login")
               } else {
               if(res.error) console.log(res.error);
               raiseAlert('fail', `${res.message} .Try again`, <ImCross />);
               }
          } catch (error) {
               console.error('Error:', error);
               raiseAlert('fail', 'An error occurred. Try again later', <ImCross />);
          } finally {
            setLoading(false); // Set loading to false when the request is complete
          }
     }

     const onErrors = (error) => {
          if(error){
               raiseAlert('fail', 'please check well your information', <ImCross />);
          }
     }
     const closeForm = () => {
          setUser((prev) => ({...prev, activeForm:''}))
     }

     useEffect(() => {
          (async() => {
               const {districts} = await getLocations();
               // const {data} = districts;
               // setLocations(data);
               setLocations(districts.data);
          })()
     }, [])
     return(
          <div className="form-container hide-scroll">
               <i onClick={closeForm} className="close-icon"><ImCross/></i>
               <Title content={{type: "medium", color:textColors.blue, size: titleSize.medium, name:"Sign Up"}} />
               {loading ? <Loading /> : 
               <form onSubmit={handleSubmit(submitForm, onErrors)}>
               <div className="group">
                    <label htmlFor="name_01">Full name: </label>
                    <input type="text" name="name" id="name_01" {...register('name', {required: true})} placeholder="Ex: Adms Johns..."  />
               </div>
               <div className="group">
                    <label htmlFor="username_01">Business: </label>
                    <input type="text" name="username" id="username_01" {...register('username', {required: true})} placeholder="username..."  />
               </div>
               <div className="group">
                    <label htmlFor="email_01">Email: </label>
                    <input type="email" name="email" id="email_01" {...register('email', {required: true})} placeholder="User email..."  />
               </div>
               <div className="group">
                    <label htmlFor="phone_01">Phone: </label>
                    <input type="phone" name="phone" id="phone_01" {...register('phone', {required: true})} placeholder="Ex: +25078..."  />
               </div>
               <div className="group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" {...register('password', {required: true, minLength: {value:6, message:"password is short"}, maxLength: {value:12, message:"password is too long"}})} placeholder="User Password" />
               </div>
               <p className="form-errors">{errors?.password && errors.password.message}</p>
               <div className="group">
                    <label htmlFor="location01">Location: </label>
                    {/* <input type="text" name="location" id="location01" {...register('location', {required: true})} placeholder="City..."  /> */}
                    <select name="location" id="location01"  {...register('location', {required: false})}>
                         {locations[0] ? <option value="" selected  >Business location</option> : null}
                         {locations[0] ? <option value="Kigali" >Kigali</option> : null}
                         {locations[0] ? locations.map((item) => <option key={item}>{item}</option>) : <option value="" disabled>Loading...</option>}
                    </select>
               </div>
               <div className="group align-right">
                    <SubmitButton content={{title: "Sign Up", type: 'submit'}} />
               </div>
          </form>
               }
               <div className="line-divider"><p>Or</p></div>
               <p className="other-link">Have account <b onClick={() => navigate("/forms/login")}>Login</b></p>
               
          </div>
     )
}

const PasswordResetResponce = () => {
     const navigate = useNavigate();
     const [user] = useContext(UserContext);
     const {email } = user.userInfo;
     const closeForm = () => {
          navigate("/forms/login")
     }
     return (
          <div className="form-container hide-scroll">
               <p className="pass-reset-responce">An email containing the password reset link has been sent to the email <b>{email}</b> .</p>
               <p className="pass-reset-responce">Check the email to reset your password</p>
               <div className="group align-right">
                    <ActionBtn title="Login" action={closeForm} />
               </div>
               
          </div>
     )
}

const AgentLoginForm = () => {
     const [loading,setLoading ] = useState(false);
     const [,setUser] = useContext(UserContext);
     const {register, handleSubmit,} = useForm();
     const [,setData] = useContext(AppData);
     const navigate = useNavigate();

     const raiseAlert = (type, message, icon) => {
          setData((prev)=> ({
               ...prev,
               alertView:{
                    on: true,
                    content: {type, message, icon}
               }
          }));
     }
     const submitForm = async (data) => {
          try {
               setLoading(true);
               const res = await AgentService.login(data);
               if(res != null){
                    if(res.status === "success" ){
                         const {data, agentToken } = res;
                         sessionStorage.setItem("agentData", JSON.stringify(data));
                         sessionStorage.setItem("agentToken", agentToken);
                         raiseAlert("success",res.message, <TiTick />);
                         setUser((prev) => ({
                              ...prev,
                              userInfo: res.data,
                              loggedIn: true,
                              activeForm:''
                         }));
                         return navigate("/agent");
                    }else{
                         return raiseAlert("fail",res.message, <ImCross />);
                    }
               }else{
                    return raiseAlert('fail', `Server error .Try again later`, <ImCross />);
               }
               
          } catch (error) {
               console.log(error);
               return raiseAlert('fail', `System error .Try again`, <ImCross />);
          }finally{
               navigate("/agent");
               setLoading(false);
          }
     } 
     return (
          <div className="form-container hide-scroll">
               <Title content={{type: "medium", color:textColors.blue, size: titleSize.medium, name:"Agent Login"}} />
               {
                    loading ? <Loading /> :
                    <form onSubmit={handleSubmit(submitForm)}>
                         <div className="group">
                              <label htmlFor="a_email">Email: </label>
                              <input type="email" name="a_email" id="a_email" {...register('a_email')} required placeholder="User email..." />
                         </div>
                         <div className="group">
                              <label htmlFor="a_password">Password:</label>
                              <input type="password" name="a_password" id="a_password" {...register('a_password')} placeholder="User Password" />
                         </div>
                         <div className="group align-right">
                              <SubmitButton content={{title: "Login", type: 'submit'}} />
                         </div>
                    </form>
               }

          </div>
     )
}



export default UserForms;