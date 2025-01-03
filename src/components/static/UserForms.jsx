import { useContext, useEffect, useState } from "react";
import { ActionBtn, SubmitButton } from "../dynamic/Buttons";
import Title from "../dynamic/TitleComponents"
import { textColors, titleSize } from "../styles"
import UserContext from "../../Contexts/UserContext";
import {  Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import server from "../../config/Server";
import Loading from "./Loading";
import { getLocations } from "../../utils/locations";
import {getDateToday, getRwandaTime} from "../../utils/dateFunctions";
import AgentService from "../../services/Agent";
import { fetchIds } from "../../utils/urlFunctions";
import { showMainNotification } from "../../utils/AdminFunctions";
import uploadFile from "../../utils/aws-upload-functions";
import { s3Folders } from "../../config/s3Config";
import AppData from "../../Contexts/AppContext";
import SubCategoryService from "../../services/SubCategory";


const UserForms = () => {
          const navigate = useNavigate()
          return(
               <div className="user-types-container">
                    <div className="user-type-container">
                         <p>It is easy to sell online by using Click Rwanda. Register as a Seller and Put your products in front of thousands of customers and increase your visibility. </p>
                         <ActionBtn title="Continue as Seller" action={() => navigate('/forms/login')} />
                    </div>
                    <div className="user-type-container">
                         <p>Register as an agent and earn between 50%-100% of Commissions.</p>
                         <ActionBtn title="Continue as Agent" action={() => navigate('/forms/agent-login')}  />
                    </div>
                    <div className="user-type-container">
                         <p>Find your dream Job. Get exposed to several companies that work with Click Rwanda and land your dream job</p>
                         <ActionBtn title="Continue as Job Seeker" action={() => navigate('/forms/job-seeker-signup')} />
                    </div>
                    <div className="user-type-container">
                         <p>Whether you are a micro influencer or a celebrity with thousands/millions of followers, you can sign up to join our family, advertise for our sellers and get paid on time!</p>
                         <ActionBtn title="Continue as Influencer" action={() => navigate('/forms/influencer-login')} />
                    </div>
               </div>
          )
  
}

export const LoginForm = () => {
     const [,setUser] = useContext(UserContext);
     const [data, setData] = useContext(AppData);
     const{prevState} = data;
     const {register, handleSubmit,setValue, formState:{errors}} = useForm();
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();
     const from  = prevState ? `${prevState?.pathname}${prevState?.search}` : '/user-dashboard';


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
               const formData = new FormData();
               formData.append('email', data.email);
               formData.append('password', data.password);
               const res = await server.login(data);
               if(res.status === "pass"){
                    sessionStorage.setItem('loginToken', res.loginToken);
                    sessionStorage.setItem('userData', JSON.stringify(res.data));
                    setUser((prev) => ({
                         ...prev,
                         userInfo: res.data,
                         loggedIn: true,
                         role: 'seller'
                    }));
                    if(res.data.user_type === 'seller'){
                         setUser((prev) => ({
                              ...prev,
                              userInfo: res.data,
                              loggedIn: true,
                              role: 'seller'
                         }));
                         return showMainNotification('pass', `${res.message} as ${res.data.username}`, () => {
                              navigate(from);
                              setData(prev => ({...prev, prevState:null}));
                         });
                    }
                    if(res.data.user_type === "admin" ){
                         
                         return showMainNotification("fail", `You are lost please. Use the new way.`, () => navigate("/"));
                    }
                    
               }else{
                    
                    return showMainNotification('fail', `${res.message} .Try again`, () => {});
               }
          } catch (error) {
               return showMainNotification('fail', 'An error occurred. Try again later', () => {});
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
                         return showMainNotification('fail', `${res.message} .Try again`, ( ) => {});
                    }
               }
          } catch (error) {
               console.log(error);
               return showMainNotification('fail', `Error .Try again`, () => {});
          }finally{
               setLoading(false);
          }
          
     }

     

     return(
          <div className="form-container hide-scroll">
               <Title content={{type: "medium", color:textColors.blue, size: titleSize.medium, name:"Login as Seller" }} />
               {!loading ?
               <>
                    <form onSubmit={handleSubmit(submitForm)} autoComplete="on">
                    <div className="group">
                         <label htmlFor="email_02">Email: </label>
                         <input type="email" name="email" id="email_02" {...register('email', {required: 'Please enter email!'})} autoComplete="email" placeholder="User email..."  />
                    </div>
                    {errors.email ? <p className="form-errors">{errors.email.message}</p> : null}
                    <div className="group">
                         <label htmlFor="password_02">Password: </label>
                         <input type="password" name="password" id="password_02" {...register('password', {required:'Please enter password!'})} placeholder="User Password" autoComplete="current-password" />
                    </div>
                    {errors.password ? <p className="form-errors">{errors.password.message}</p> : null}
                    <div className="group align-right">
                         <SubmitButton content={{title: "Log in", type: 'submit'}} />
                    </div>
                    <div className="group align-right">
                         <p onClick={requestPasswordReset} className="forgot-password-para">Forgot Password</p>
                    </div>
               </form>
               <div className="line-divider"><p>Or</p></div>
               <p className="other-link">Don&rsquo;t have account <b onClick={() => navigate("/forms/signup")}>Sign Up</b></p>
               </>
               
               :<Loading />}
          </div>
     )
}

export const SignUpForm = () => {
     const {register, handleSubmit, formState: {errors}} = useForm();
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();
     const [locations, setLocations] = useState([]);
     const location = useLocation();
     const [profileImage,setProfileImage] = useState(null);

     const submitForm = async (data) => {
          try {
               let date  = getRwandaTime();
               const {r_id} = fetchIds(location);
               setLoading(true); // Set loading to true when submitting
               const profileImageUrl = await uploadFile(profileImage, s3Folders.logos);
               const userData = {
                    name: data.username,
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    userType: 'seller',
                    password: data.password,
                    location: {location: data.location},
                    registrationDate: date,
                    r_id,
                    business_type: data.business_type,
                    user_image: profileImageUrl
               };
               const res = await server.register(userData);
               if (res.status === "pass") {
               showMainNotification('pass', 'Successfully created the account', () => navigate("/forms/login"));
               
               } else {
               if(res.error) console.log(res.error);
               showMainNotification('fail', `${res.message} .Try again`, () => {});
               }
          } catch (error) {
               console.error('Error:', error);
               showMainNotification('fail', 'An error occurred. Try again later', () => {});
          } finally {
            setLoading(false); // Set loading to false when the request is complete
          }
     }

     const onErrors = (error) => {
          if(error){
               showMainNotification('fail', 'please check well your information', () => {});
          }
     }

     useEffect(() => {
          (async() => {
               const {districts} = getLocations();
               // const {data} = districts;
               // setLocations(data);
               setLocations(districts);
          })()
     }, [])
     return(
          <div className="w-full md:w-[90%] lg:w-[80%] flex flex-col items-center gap-[10px] shadow-md rounded-[20px] px-[10px] py-[20px] ">
               <Title content={{type: "medium", color:textColors.blue, size: titleSize.medium, name:"Add your business"}} />
               {loading ? <Loading /> : 
               <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-[10px] shadow-sm rounded-[20px] p-[10px]" onSubmit={handleSubmit(submitForm, onErrors)}>
                    <div className="w-full flex flex-col items-start gap-[5px]">
                         <label htmlFor="business-type-01" className="text-[0.9rem] font-semibold text-main-blue-700">Business Size: </label>
                         <select className="w-[90%] py-[7.5px] px-[10px] text-[0.8rem] text-main-blue-700 border-gray-300 border bg-gray-50 rounded-[5px] outline-none " name="business-type-01" id="business-type-01" {...register('business_type', {required:'Please choose business type!'})}>
                              <option value="" disabled selected>Select Business size...</option>
                              <option value="Individual">Individual</option>
                              <option value="Small Business">Small Business</option>
                              <option value="Large Business">Large Business</option>
                         </select>
                         {errors.business_type ? <p className="form-errors">{errors.business_type.message}</p> : null}
                    </div>
                    <div className="w-full flex flex-col items-start gap-[5px]">
                         <label htmlFor="username_01" className="text-[0.9rem] font-semibold text-main-blue-700">Business Name: </label>
                         <input type="text" name="username" id="username_01" className="w-[90%] py-[7.5px] px-[10px] text-[0.8rem] text-main-blue-700 outline-none border-gray-300 border bg-gray-50 rounded-[5px]  " {...register('username', {required: "Pleas enter a username or business name!"})} placeholder="username..."  />
                    {errors.username ? <p className="form-errors">{errors.username.message}</p> :null}
                    </div>
                    <div className="w-full flex flex-col items-start gap-[5px]">
                         <label htmlFor="email_01" className="text-[0.9rem] font-semibold text-main-blue-700">Email: </label>
                         <input type="email" name="email" id="email_01" className="w-[90%] py-[7.5px] px-[10px] text-[0.8rem] text-main-blue-700 outline-none border-gray-300 border bg-gray-50 rounded-[5px]  " {...register('email', {required: "Please enter email!"})} placeholder="User email..."  />
                    {errors.email ? <p className="form-errors">{errors.email.message}</p> : null}
                    </div>
                    <div className="w-full flex flex-col items-start gap-[5px]">
                         <label htmlFor="phone_01" className="text-[0.9rem] font-semibold text-main-blue-700">Phone: </label>
                         <input type="phone" name="phone" id="phone_01" className="w-[90%] py-[7.5px] px-[10px] text-[0.8rem] text-main-blue-700 border-gray-300 outline-none border bg-gray-50 rounded-[5px]  " {...register('phone', {required: "Please enter you phone number"})} placeholder="Ex: +25078..."  />
                    {errors.phone ? <p className="form-errors">{errors.phone.message}</p> : null}
                    </div>
                    <div className="w-full flex flex-col items-start gap-[5px]">
                         <label htmlFor="password" className="text-[0.9rem] font-semibold text-main-blue-700">Password: </label>
                         <input type="password" id="password" className="w-[90%] py-[7.5px] px-[10px] text-[0.8rem] text-main-blue-700 border-gray-300 border outline-none bg-gray-50 rounded-[5px]  " name="password" {...register('password', {required: "Please enter a password", minLength: {value:6, message:"password is short"}, maxLength: {value:12, message:"password is too long"}})} placeholder="User Password" />
                    {errors.password ? <p className="form-errors">{errors.password.message}</p> :null}
                    </div>
                    <div className="w-full flex flex-col items-start gap-[5px]">
                         <label htmlFor="location01" className="text-[0.9rem] font-semibold text-main-blue-700">Location: </label>
                         {/* <input type="text" name="location" id="location01" {...register('location', {required: true})} placeholder="City..."  /> */}
                         <select className="w-[90%] py-[7.5px] px-[10px] text-[0.8rem] text-main-blue-700 border-gray-300 border bg-gray-50 rounded-[5px] outline-none  " name="location" id="location01"  {...register('location', {required: "Please select your location"})}>
                              {locations[0] ? <option value="" selected  >Business location</option> : null}
                              {locations[0] ? <option value="Kigali" >Kigali</option> : null}
                              {locations[0] ? locations.map((item) => <option key={item}>{item}</option>) : <option value="" disabled>Loading...</option>}
                         </select>
                         {errors.location ? <p className="form-errors">{errors.location.message}</p> : null}
                    </div>
                    <div className="w-full flex flex-col items-start gap-[5px]">
                         <label htmlFor="profile_image" className="text-[0.9rem] font-semibold text-main-blue-700">Business Logo:</label>
                         <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} className="w-[90%] py-[7.5px] px-[10px] outline-none text-[0.8rem] text-main-blue-700 border-gray-300 border bg-gray-50 rounded-[5px]  " required />
                         {
                              profileImage && profileImage instanceof File ? <img width={100} src={URL.createObjectURL(profileImage)}  /> : null
                         }
                         {errors.logo ? <p className="form-errors">{errors.logo.message}</p> :null}
                    </div>
                    
                    <div className="w-[90%] flex flex-col items-start gap-[5px] p-[10px] border border-gray-600 rounded-[10px]">
                         <h4 className="text-[1rem] font-semibold text-main-blue-700">Complete Payment: 10,000 Rwf</h4>
                         <p className="text-[0.8rem] font-medium text-gray-600">Mobile Money: <a href="tel: *182*8*1*058698*10000#" className="text-[0.9rem] font-bold text-main-blue-600 hover:text-main-blue-700">*182*8*1*058698*10000# </a> </p>
                         <p className="text-[0.8rem] text-orange-600 font-bold">You will able to login after your payment is verified</p>
                    </div>
                    <div className="w-full flex items-center justify-start gap-[10px]">
                         <input  type="checkbox" name="terms-check-box" id="terms-check-box" required/>
                         <label htmlFor="terms-check-box" className="text-[0.9rem] font-semibold text-main-blue-700">I accept the <Link to="/terms-&-conditions">Terms and Conditions</Link></label>
                    </div>
                    <div className="w-full flex items-center justify-start md:col-span-2">
                         <SubmitButton content={{title: "Sign Up", type: 'submit'}} />
                    </div>
               </form>
               }
               <div className="line-divider "><p>Or</p></div>
               <p className="text-[0.9rem] text-gray-600 w-full text-right px-[20px]">Have account <b className="text-[1rem] font-size text-main-blue-600 cursor-pointer px-[20px] py-[5px] rounded-[30px] border border-main-blue-600 mx-[5px] hover:bg-gray-200 transition-all duration-300 " onClick={() => navigate("/forms/login")}>Login</b></p>
               
          </div>
     )
}

export const PasswordResetResponce = () => {
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

export const AgentLoginForm = () => {
     const [loading,setLoading ] = useState(false);
     const [,setUser] = useContext(UserContext);
     const {register, handleSubmit,formState: {errors}} = useForm();
     const navigate = useNavigate();

     const submitForm = async (data) => {
          try {
               setLoading(true);
               data.agent_type = 'agent';
               const res = await AgentService.login(data);
               if(res != null){
                    if(res.status === "success" ){
                         const {data, agentToken } = res;
                         sessionStorage.setItem("agentData", JSON.stringify(data));
                         sessionStorage.setItem("agentToken", agentToken);
                         setUser((prev) => ({
                              ...prev,
                              userInfo: res.data,
                              loggedIn: true,
                              activeForm:'',
                              role: 'agent'
                         }));
                         localStorage.setItem('user-type', 'agent');
                         return  showMainNotification("pass",res.message, () => navigate("/agent"));
                    }else{
                         return showMainNotification("fail",res.message, () => {});
                    }
               }else{
                    return showMainNotification('fail', `Server error .Try again later`, () => {});
               }
               
          } catch (error) {
               console.log(error);
               return showMainNotification('fail', `System error .Try again`, () => {});
          }finally{
               setLoading(false);
          }
     } 
     return (
          <div className="form-container hide-scroll">
               <Title content={{type: "medium", color:textColors.blue, size: titleSize.medium, name:"Login as Agent"}} />
               {
                    loading ? <Loading /> :
                    <form onSubmit={handleSubmit(submitForm)}>
                         <div className="group">
                              <label htmlFor="a_email">Email: </label>
                              <input type="email" name="a_email" id="a_email" {...register('a_email', {required:'Please enter email!'})} placeholder="User email..." />
                         </div>
                         {errors.a_email ? <p className="form-errors">{errors.a_email.message}</p> : null}
                         <div className="group">
                              <label htmlFor="a_password">Password:</label>
                              <input type="password" name="a_password" id="a_password" {...register('a_password', {required: 'Please enter password!'})} placeholder="User Password" />
                         </div>
                         {errors.a_password ? <p className="form-errors">{errors.a_password.message}</p> : null}
                         <div className="group align-right">
                              <SubmitButton content={{title: "Login", type: 'submit'}} />
                         </div>
                         <div className="group align-right">
                              <p onClick={() => navigate('/forms/agent-reset-password')} className="forgot-password-para">Forgot Password</p>
                         </div>
                    </form>
               }
               
               <div className="line-divider"><p>Or</p></div>
               <p className="other-link">Don&apos;t have account <b onClick={() => navigate("/forms/agent-signup")}>Sign Up</b></p>
          </div>
     )
}


export const AgentSignUpForm = () => {
     const [loading,setLoading ] = useState(false);
     const {register, handleSubmit, formState: {errors}} = useForm();
     const [locations, setLocations] = useState([]);
     const navigate = useNavigate();
     const [socialLinks, setSocialLinks] = useState({
          Tiktok: "",
          Instagram: "",
          Twitter: "",
     })
     

     const submitForm = async(data) => {
          try {
               setLoading(true);
               
               data.location = JSON.stringify({location: data.location});
               data.social_links = JSON.stringify(socialLinks);
               data.active = 1;
               data.verified = 0;
               data.registrationDate = getDateToday();
               data.agent_type = 'agent';
               const res = await AgentService.save(data);
               if(res){
                    if(res.status === "success"){
                         showMainNotification("pass", res.message, () => navigate("/forms/agent-login"));
                    }else{
                         showMainNotification("fail", res.message, () => {});
                    }
               }else{
                    showMainNotification("fail", "server error.", () => {})
               }
               
          } catch (error) {
               console.log(error);
               showMainNotification("fail", "application error. Refresh the page and try again");
          }finally{
               setLoading(false);
          }
     }

     useEffect(() => {
          (async() => {
               const {districts} = getLocations();
               // const {data} = districts;
               // setLocations(data);
               setLocations(districts);
          })()
     }, [])

     return(
          <div className="form-container hide-scroll">
               <Title content={{type: "medium", color:textColors.blue, size: titleSize.medium, name:"Signup for Agent Account"}} />
               {
                    loading ? <Loading /> : 
                    <form onSubmit={handleSubmit(submitForm)}>
                         <div className="group">
                              <label htmlFor="name_01">Full name: </label>
                              <input type="text" name="a_name" id="name_01" {...register('a_name', {required: "Please enter your name"})} placeholder="Ex: Adms Johns..."  />
                         </div>
                         {errors.a_name ? <p className="form-errors">{errors.a_name.message}</p> : null}
                         <div className="group">
                              <label htmlFor="a_email">Email: </label>
                              <input type="email" name="a_email" id="a_email" {...register('a_email', {required: "Please enter your email!"})} placeholder="User email..." />
                         </div>
                         {errors.a_email ? <p className="form-errors">{errors.a_email.message}</p> : null}
                         <div className="group">
                              <label htmlFor="phone_01">Phone: </label>
                              <input type="phone" name="a_phone" id="phone_01" {...register('a_phone', {required: "Please enter a valid phone number!"})} placeholder="Ex: +25078..."  />
                         </div>
                         {errors.a_phone ? <p className="form-errors">{errors.a_phone.message}</p> : null}
                         <div className="group">
                              <label htmlFor="a_password">Password:</label>
                              <input type="password" name="a_password" id="a_password" {...register('a_password', {required: "Please enter password"})} placeholder="User Password" />
                         </div>
                         {errors.a_password ? <p className="form-errors">{errors.a_password.message}</p> : null}
                         <div className="group">
                              <label htmlFor="location01">Location: </label>
                              {/* <input type="text" name="location" id="location01" {...register('location', {required: true})} placeholder="City..."  /> */}
                              <select name="location" id="location01"  {...register('location', {required: "Please select your location!"})}>
                                   {locations[0] ? <option value="" selected  >Location</option> : null}
                                   {locations[0] ? <option value="Kigali" >Kigali</option> : null}
                                   {locations[0] ? locations.map((item) => <option key={item}>{item}</option>) : <option value="" disabled>Loading...</option>}
                              </select>
                         </div>
                         {errors.location ? <p className="form-errors">{errors.location.message}</p> : null}
                         {
                              // Object.entries(socialLinks).map(([key, value]) => 
                              //      <div className="group" key={`social-link-${key}`}>
                              //           <label htmlFor={`social-link-${key}`}>{key}:</label>
                              //           <input type="url" name={`social-link-${key}`} id={`social-link-${key}`} placeholder={value}  onChange={(e) => setSocialLinks(prev => ({...prev, [key]: e.target.value}))} />
                              //      </div>
                              // ) 
                         }
                         <div className="terms-group">
                              <input type="checkbox" name="terms-check-box" id="terms-check-box" required/>
                              <label htmlFor="terms-check-box">I accept the <Link to="/terms-&-conditions">Terms and Conditions</Link></label>
                         </div>
                         <div className="group align-right">
                              <SubmitButton content={{title: "Submit", type: 'submit'}} />
                         </div>
                    </form>
               }
               <div className="line-divider"><p>Or</p></div>
               <p className="other-link">Have account <b onClick={() => navigate("/forms/agent-login")}>Login</b></p>
          </div>
     )
}

export const AgentResetPasswordForm = () => {
     const [loading, setLoading] = useState(false);
     const {register, handleSubmit, formState: {errors}, watch} = useForm();
     const password = watch('new_password');
     const navigate = useNavigate();
     const submitForm = async(data) => {
          try {
               setLoading(true);
               data.agent_type = 'agent';
               const res = await AgentService.resetPassword(data);
               if(res){
                    if(res.status === "pass") {
                         showMainNotification('pass', res.message, () => navigate('/forms/agent-login'))
                    }else{
                         showMainNotification('fail', res.message, () => {});
                    }
               }else{
                    showMainNotification('fail', 'System error. Contact technical support if this issue persists', () => {})
               }
          } catch (error) {
               console.log(error);
               showMainNotification('fail', 'error processing your request. Try gain later.')
          }finally{
               setLoading(false);
          }
     }
     return (
          <div className="form-container hide-scroll">
               {
                    loading ? <Loading /> :
                    <>
                         <Title content={{type: "medium", color:textColors.blue, size: titleSize.medium, name:"Agent: Reset Password"}} />
                         <form onSubmit={handleSubmit(submitForm)}>
                              <div className="group">
                                   <label htmlFor="email">Email used:</label>
                                   <input type="text" name="email" id="email" {...register('a_email', {required:"Email is required!"})} />
                              </div>
                              {errors.a_email ? <p className="form-errors">{errors.a_email.message}</p> : null}
                              <div className="group">
                                   <label htmlFor="phone">Phone Number:</label>
                                   <input type="tel" name="phone" id="phone" {...register('a_phone', {required:"Phone number is required!"})} />
                              </div>
                              {errors.a_phone ? <p className="form-errors">{errors.a_phone.message}</p> : null}
                              <div className="group">
                                   <label htmlFor="new_password">New Password: </label>
                                   <input type="password" name="new_password" id="new_password" {...register('new_password', {required: "Please enter new Password!", minLength: {value:6, message:"password is short"}, maxLength: {value:12, message:"password is too long"}})} />
                              </div>
                              {errors.new_password ? <p className="form-errors">{errors.new_password.message}</p> :null}
                              <div className="group">
                                   <label htmlFor="co_password">Confirm Password:</label>
                                   <input type="password" name="co_password" id="co_password" {...register('co_password', {
                                             required: "Please confirm your new Password", 
                                             validate: value => value === password || 'Passwords do not match.' 
                                   })} />
                              </div>
                              {errors.co_password ? <p className="form-errors">{errors.co_password.message}</p> : null}
                              <div className="group align-right">
                                   <SubmitButton content={{title: "Submit", type: 'submit'}} />
                              </div>
                         </form>
                         <div className="line-divider"><p>Or</p></div>
                         <p className="other-link">Go back <b onClick={() => navigate("/forms/agent-login")}>Login</b></p>
                    </>
                    
               }
          </div>
     )
}

export const JobSeekerLogin = () => {
     const [,setUser] = useContext(UserContext);
     const [data, setData] = useContext(AppData);
     const{prevState} = data;
     const from  = prevState ? `${prevState?.pathname}${prevState?.search}` : '/job-seeker-dashboard';
     const [loading,setLoading] = useState(false);
     const {register,handleSubmit} = useForm();
     const navigate = useNavigate();
     const submitForm = async(data) =>{
          try {
               setLoading(true);
               const formData = new FormData();
               formData.append('email', data.email);
               formData.append('password', data.password);
               const res = await server.login(data);
               if(res.status === "pass"){
                    sessionStorage.setItem('loginToken', res.loginToken);
                    sessionStorage.setItem('userData', JSON.stringify(res.data));
                    setUser((prev) => ({
                         ...prev,
                         userInfo: res.data,
                         loggedIn: true,
                         role: 'job-seeker'
                    }));
                    if(res.data.user_type === "job-seeker" ){
                         return showMainNotification("pass", `You have been logged as job seeker`, () => {
                              navigate(from);
                              setData(prev => ({...prev, prevState:null}));
                         });
                    }else{
                         return showMainNotification('fail', `Not register as a job seeker. Try with other credentials`, () => {});
                    }
                    
               }else{
                    
                    return showMainNotification('fail', `${res.message} .Try again`, () => {});
               }
          } catch (error) {
               return showMainNotification('fail', 'An error occurred. Try again later', () => {});
          }finally{
               setLoading(false);
          }

     };
     return (
          <div className="form-container hide-scroll">
               <Title content={{type: "medium", color:textColors.blue, size: titleSize.medium, name:"Login as Job Seeker"}} />
               {
                    loading ? <Loading /> :
                    <form onSubmit={handleSubmit(submitForm)}>
                         <div className="group">
                              <label htmlFor="a_email">Email: </label>
                              <input type="email" name="a_email" id="a_email" {...register('email')} required placeholder="User email..." />
                         </div>
                         <div className="group">
                              <label htmlFor="a_password">Password:</label>
                              <input type="password" name="a_password" id="a_password" {...register('password')} placeholder="User Password" />
                         </div>
                         <div className="group align-right">
                              <SubmitButton content={{title: "Login", type: 'submit'}} />
                         </div>
                    </form>
               }
               
               <div className="line-divider"><p>Or</p></div>
               <p className="other-link">Don&apos;t have account <b onClick={() => navigate("/forms/job-seeker-signup")}>Sign Up</b></p>
          </div>
     )
}

export const JobSeekerSignUp = () => {
     const [,setUser] = useContext(UserContext);
     const [loading,setLoading] = useState(false);
     const {register,handleSubmit} = useForm();
     const [locations, setLocations] = useState([]);
     const [subCategories,setSubCategories] = useState(null);
     const [profileImage,setProfileImage] = useState(null);
     const [userCV,setUserCV] = useState(null);
     const navigate = useNavigate();
     
     const categoryId = "bed1566b-5901-4af9-ae80-708c293aa925";

     const submitForm = async(data) => {
          try {
               setLoading(true);
               let date  = getRwandaTime();
               const profileImageUrl = await uploadFile(profileImage, s3Folders.logos);
               const userData = {
                    name: data.name,
                    username: data.name,
                    email: data.email,
                    phone: data.phone,
                    userType: 'job-seeker',
                    password: data.password,
                    location: {location: data.location},
                    registrationDate: date,
                    r_id:null,
                    business_type: "individual",
                    user_image: profileImageUrl
               }
               const res = await server.register(userData);
               if(res){
                    if(res.status === "pass"){
                         console.log(res);
                         sessionStorage.setItem('loginToken', res.loginToken);
                         sessionStorage.setItem('userData', JSON.stringify(res.data));
                         setUser((prev) => ({
                              ...prev,
                              userInfo: res.data,
                              loggedIn: true
                         }));
                         showMainNotification('pass', `Successfully created your job seeker account`, () => {});
                         const cvUrl = await uploadFile(userCV, s3Folders.userCVs);
                         const advertData = {
                              ad_name: data.name,
                              description: {desc: {type:"textarea",value: data.description}, userCv: {type:"url", value:cvUrl}},
                              ad_type: "service",
                              contact: data.phone,
                              ad_image: profileImageUrl,
                              ad_price: 0,
                              ad_images: [],
                              registrationDate: date,
                              sub_category_id: data.sub_category
                         }
                         const adRes = await server.addAdvert(advertData);
                         if(adRes.status === "pass"){
                              showMainNotification("pass", "Thanks. Once our team approves you. You will be live on our platform", () => navigate('/job-seeker-dashboard'));                         
                         }else{
                              showMainNotification('fail',adRes.message, () => {});
                         }
                    }else{
                         console.log(res);
                         showMainNotification('fail', 'error creating you account. try again later', () => {});
                    }
               }
          } catch (error) {
               console.log(error);
               showMainNotification('fail', "Application error. Try again later", () => {});
          }finally{
               setLoading(false);
          }
     };

     useEffect(() => {
          (async() => {
               const {districts} = getLocations();
               const subCategoriesData = await SubCategoryService.searchCategory(categoryId);
               if(subCategoriesData) {
                    setSubCategories(subCategoriesData.data);
               }
               // const {data} = districts;
               // setLocations(data);
               setLocations(districts);
          })()
     }, []);

     return (
          <div className="form-container hide-scroll">
               <Title content={{type: "medium", color:textColors.blue, size: titleSize.medium, name:"Signup as Job Seeker"}} />
               {
                    loading ? <Loading /> : 
                    <form onSubmit={handleSubmit(submitForm)}>
                         <div className="group">
                              <label htmlFor="name_01">Full name: </label>
                              <input type="text" name="a_name" id="name_01" {...register('name', {required: true})} placeholder="Ex: Adms Johns..."  />
                         </div>
                         <div className="group">
                              <label htmlFor="a_email">Email: </label>
                              <input type="email" name="a_email" id="a_email" {...register('email')} required placeholder="User email..." />
                         </div>
                         <div className="group">
                              <label htmlFor="phone_01">Phone: </label>
                              <input type="phone" name="a_phone" id="phone_01" {...register('phone', {required: true})} placeholder="Ex: +25078..."  />
                         </div>
                         <div className="group">
                              <label htmlFor="a_password">Password:</label>
                              <input type="password" name="a_password" id="a_password" {...register('password')} placeholder="User Password" />
                         </div>
                         <div className="group">
                              <label htmlFor="location01">Location: </label>
                              {/* <input type="text" name="location" id="location01" {...register('location', {required: true})} placeholder="City..."  /> */}
                              <select name="location" id="location01"  {...register('location', {required: true})}>
                                   {locations[0] ? <option value="" selected  >Business location</option> : null}
                                   {locations[0] ? <option value="Kigali" >Kigali</option> : null}
                                   {locations[0] ? locations.map((item) => <option key={item}>{item}</option>) : <option value="" disabled>Loading...</option>}
                              </select>
                         </div>
                         <div className="group">
                              <label htmlFor="profile-image">Profile Image: </label>
                              <input type="file" onChange={(e) =>setProfileImage(e.target.files[0])} name="profile-image" id="profile-image" required/>
                              {profileImage ? <img src={URL.createObjectURL(profileImage)} alt="user profile image" width={80} /> : null}
                         </div>
                         <div className="group">
                              <label htmlFor="sub_category">Choose field:</label>
                              <select name="sub_category" id="sub_category" {...register('sub_category', {required: true})}>
                                   <>
                                        <option value="" selected disabled>Select field</option>
                                        {subCategories && subCategories.length ? 
                                   subCategories.map((item, index) => <option key={`job-seeker-sub-${index}`} value={item.sub_id}>{item.sub_name}</option>) 
                                   : <option value={""} disabled>Loading</option>}
                                   </>
                              </select>
                         </div>
                         <div className="group">
                              <label htmlFor="description">Your Bio:</label>
                              <textarea name="description" id="description" cols={10} rows={5} {...register('description', {required: true})}></textarea>
                         </div>
                         <div className="group">
                              <label htmlFor="user-cv">CV:</label>
                              <input type="file" name="user-cv" id="user-cv" accept="application/pdf" onChange={(e) => setUserCV(e.target.files[0])} />
                         </div>
                         <div className="terms-group">
                              <input type="checkbox" name="terms-check-box" id="terms-check-box" required/>
                              <label htmlFor="terms-check-box">I accept the <Link to="/terms-&-conditions">Terms and Conditions</Link></label>
                         </div>
                         <div className="group align-right">
                              <SubmitButton content={{title: "Submit", type: 'submit'}} />
                         </div>
                    </form>
               }
               <div className="line-divider"><p>Or</p></div>
               <p className="other-link">Have account <b onClick={() => navigate("/forms/job-seeker-login")}>Login</b></p>
          </div>
     )
}

export const InfluencerSignUpForm = () => {
     const [loading,setLoading ] = useState(false);
     const {register, handleSubmit,} = useForm();
     const [locations, setLocations] = useState([]);
     const navigate = useNavigate();
     const [socialLinks, setSocialLinks] = useState({
          Tiktok: "",
          Instagram: "",
          Twitter: "",
     })
     

     const submitForm = async(data) => {
          try {
               setLoading(true);
               
               data.location = JSON.stringify({location: data.location});
               data.social_links = JSON.stringify(socialLinks);
               data.active = 1;
               data.verified = 0;
               data.registrationDate = getDateToday();
               data.agent_type = 'influencer';
               const res = await AgentService.save(data);
               if(res){
                    if(res.status === "success"){
                         showMainNotification("pass", res.message, () => navigate("/forms/influencer-login"));
                    }else{
                         showMainNotification("fail", res.message, () => {});
                    }
               }else{
                    showMainNotification("fail", "server error.", () => {})
               }
               
          } catch (error) {
               console.log(error);
               showMainNotification("fail", "application error. Refresh the page and try again");
          }finally{
               setLoading(false);
          }
     }

     useEffect(() => {
          (async() => {
               const {districts} = getLocations();
               // const {data} = districts;
               // setLocations(data);
               setLocations(districts);
          })()
     }, [])

     return(
          <div className="form-container hide-scroll">
               <Title content={{type: "medium", color:textColors.blue, size: titleSize.medium, name:"Signup for Influencer Account"}} />
               {
                    loading ? <Loading /> : 
                    <form onSubmit={handleSubmit(submitForm)}>
                         <div className="group">
                              <label htmlFor="name_01">Full name: </label>
                              <input type="text" name="a_name" id="name_01" {...register('a_name', {required: true})} placeholder="Ex: Adms Johns..."  />
                         </div>
                         <div className="group">
                              <label htmlFor="a_email">Email: </label>
                              <input type="email" name="a_email" id="a_email" {...register('a_email')} required placeholder="User email..." />
                         </div>
                         <div className="group">
                              <label htmlFor="phone_01">Phone: </label>
                              <input type="phone" name="a_phone" id="phone_01" {...register('a_phone', {required: true})} placeholder="Ex: +25078..."  />
                         </div>
                         <div className="group">
                              <label htmlFor="a_password">Password:</label>
                              <input type="password" name="a_password" id="a_password" {...register('a_password')} placeholder="User Password" />
                         </div>
                         <div className="group">
                              <label htmlFor="location01">Location: </label>
                              {/* <input type="text" name="location" id="location01" {...register('location', {required: true})} placeholder="City..."  /> */}
                              <select name="location" id="location01"  {...register('location', {required: true})}>
                                   {locations[0] ? <option value="" selected  >Location</option> : null}
                                   {locations[0] ? <option value="Kigali" >Kigali</option> : null}
                                   {locations[0] ? locations.map((item) => <option key={item}>{item}</option>) : <option value="" disabled>Loading...</option>}
                              </select>
                         </div>
                         {
                              Object.entries(socialLinks).map(([key, value]) => 
                                   <div className="group" key={`social-link-${key}`}>
                                        <label htmlFor={`social-link-${key}`}>{key}: (should have 10k followers)</label>
                                        <input type="url" name={`social-link-${key}`} id={`social-link-${key}`} placeholder={value}  onChange={(e) => setSocialLinks(prev => ({...prev, [key]: e.target.value}))} />
                                   </div>
                              ) 
                         }
                         <div className="terms-group">
                              <input type="checkbox" name="terms-check-box" id="terms-check-box" required/>
                              <label htmlFor="terms-check-box">I accept the <Link to="/terms-&-conditions">Terms and Conditions</Link></label>
                         </div>
                         <div className="group align-right">
                              <SubmitButton content={{title: "Submit", type: 'submit'}} />
                         </div>
                    </form>
               }
               <div className="line-divider"><p>Or</p></div>
               <p className="other-link">Have account <b onClick={() => navigate("/forms/influencer-login")}>Login</b></p>
          </div>
     )
}

export const InfluencerLoginForm = () => {
     const [loading,setLoading ] = useState(false);
     const [,setUser] = useContext(UserContext);
     const {register, handleSubmit,} = useForm();
     const navigate = useNavigate();

     const submitForm = async (data) => {
          try {
               setLoading(true);
               data.agent_type = 'influencer';
               const res = await AgentService.login(data);
               if(res != null){
                    if(res.status === "success" ){
                         const {data, agentToken } = res;
                         sessionStorage.setItem("agentData", JSON.stringify(data));
                         sessionStorage.setItem("agentToken", agentToken);
                         setUser((prev) => ({
                              ...prev,
                              userInfo: res.data,
                              loggedIn: true,
                              activeForm:'',
                              role: 'influencer'
                         }));
                         return  showMainNotification("pass",res.message, () => navigate("/agent"));
                    }else{
                         return showMainNotification("fail",res.message, () => {});
                    }
               }else{
                    return showMainNotification('fail', `Server error .Try again later`, () => {});
               }
               
          } catch (error) {
               console.log(error);
               return showMainNotification('fail', `System error .Try again`, () => {});
          }finally{
               setLoading(false);
          }
     } 
     return (
          <div className="form-container hide-scroll">
               <Title content={{type: "medium", color:textColors.blue, size: titleSize.medium, name:"Login as an Influencer"}} />
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
                         <div className="group align-right">
                              <p onClick={() => navigate('/forms/influencer-reset-password')} className="forgot-password-para">Forgot Password</p>
                         </div>
                    </form>
               }
               
               <div className="line-divider"><p>Or</p></div>
               <p className="other-link">Don&apos;t have account <b onClick={() => navigate("/forms/influencer-signup")}>Sign Up</b></p>
          </div>
     )
}

export const InfluencerResetPasswordForm = () => {
     const [loading, setLoading] = useState(false);
     const {register, handleSubmit, formState: {errors}, watch} = useForm();
     const password = watch('new_password');
     const navigate = useNavigate();
     const submitForm = async(data) => {
          try {
               setLoading(true);
               data.agent_type = 'influencer';
               const res = await AgentService.resetPassword(data);
               if(res){
                    if(res.status === "pass") {
                         showMainNotification('pass', res.message, () => navigate('/forms/influencer-login'))
                    }else{
                         showMainNotification('fail', res.message, () => {});
                    }
               }else{
                    showMainNotification('fail', 'System error. Contact technical support if this issue persists', () => {})
               }
          } catch (error) {
               console.log(error);
               showMainNotification('fail', 'error processing your request. Try gain later.')
          }finally{
               setLoading(false);
          }
     }
     return (
          <div className="form-container hide-scroll">
               {
                    loading ? <Loading /> :
                    <>
                         <Title content={{type: "medium", color:textColors.blue, size: titleSize.medium, name:"Influencer: Reset Password"}} />
                         <form onSubmit={handleSubmit(submitForm)}>
                              <div className="group">
                                   <label htmlFor="email">Email used:</label>
                                   <input type="text" name="email" id="email" {...register('a_email', {required:"Email is required!"})} />
                              </div>
                              {errors.a_email ? <p className="form-errors">{errors.a_email.message}</p> : null}
                              <div className="group">
                                   <label htmlFor="phone">Phone Number:</label>
                                   <input type="tel" name="phone" id="phone" {...register('a_phone', {required:"Phone number is required!"})} />
                              </div>
                              {errors.a_phone ? <p className="form-errors">{errors.a_phone.message}</p> : null}
                              <div className="group">
                                   <label htmlFor="new_password">New Password: </label>
                                   <input type="password" name="new_password" id="new_password" {...register('new_password', {required: "Please enter new Password!", minLength: {value:6, message:"password is short"}, maxLength: {value:12, message:"password is too long"}})} />
                              </div>
                              {errors.new_password ? <p className="form-errors">{errors.new_password.message}</p> :null}
                              <div className="group">
                                   <label htmlFor="co_password">Confirm Password:</label>
                                   <input type="password" name="co_password" id="co_password" {...register('co_password', {
                                             required: "Please confirm your new Password", 
                                             validate: value => value === password || 'Passwords do not match.' 
                                   })} />
                              </div>
                              {errors.co_password ? <p className="form-errors">{errors.co_password.message}</p> : null}
                              <div className="group align-right">
                                   <SubmitButton content={{title: "Submit", type: 'submit'}} />
                              </div>
                         </form>
                         <div className="line-divider"><p>Or</p></div>
                         <p className="other-link">Go back <b onClick={() => navigate("/forms/influencer-login")}>Login</b></p>
                    </>
                    
               }
          </div>
     )
}

export default UserForms;