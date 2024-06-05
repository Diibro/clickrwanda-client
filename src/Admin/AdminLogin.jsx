import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AppData from "../Contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminLayout";
import { SubmitButton } from "../components/dynamic/Buttons";
import { ImCross } from "react-icons/im";

import UserService from "../services/User";
import { TiTick } from "react-icons/ti";
import { textColors, titleSize } from "../components/styles";
import Title from "../components/dynamic/TitleComponents";
import Loading from "../components/static/Loading";

const AdminLogin = () => {
     const [loading,setLoading ] = useState(false);
     const {register, handleSubmit,} = useForm();
     const [,setData] = useContext(AppData);
     const [,setAdminData] = useContext(AdminContext);
     const navigate = useNavigate();

     const raiseAlert = (type, message, icon) => {
          console.log("I am raising a notification");
          setData((prev)=> ({
               ...prev,
               alertView:{
                    on: true,
                    content: {type, message, icon}
               }
          }));
          console.log("The notification is over");
     }

     const submitForm = async (data) =>{
          try {
               setLoading(true);
               const res = await UserService.login(data);
               console.log(res);
               if(res != null) {
                    if(res.status === "pass"){
                         const userInfo = res.data;
                         if(userInfo.role === "admin"){
                              sessionStorage.setItem('loginToken', res.loginToken);
                              sessionStorage.setItem('userData', JSON.stringify(res.data));
                              setAdminData((prev) => ({
                                   ...prev,
                                   logged: true,
                                   adminInfo: userInfo
                              }))
                              raiseAlert('success', `${res.message} as ${res.data.username}`, <TiTick />)
                              return navigate("/admin");
                         }else{
                              return raiseAlert('fail', `Cannot login. Try the other way`, <ImCross />);
                         }
                    }else{
                         return raiseAlert('fail', `${res.message} .`, <ImCross />);
                    }
               }else{
                    raiseAlert("fail", "Login failed. Contact super admin", <ImCross />);
               }
          } catch (error) {
               console.log(error);
               return raiseAlert('fail', `System error .Try again`, <ImCross />);
          }finally{
               setLoading(false);
          }
     }
     return (
     <div className="admin-login-page">
          <div className="user-forms hide-scroll">
               <div className="form-container hide-scroll">
               <Title content={{type: "medium", color:textColors.blue, size: titleSize.medium, name:"Admin Login"}} />
                    {
                         loading ? <Loading />:
                         <form onSubmit={handleSubmit(submitForm)}>
                              <div className="group">
                                   <label htmlFor="email">Email: </label>
                                   <input type="email" name="email" id="email" {...register('email')} required placeholder="User email..." />
                              </div>
                              <div className="group">
                                   <label htmlFor="password">Password:</label>
                                   <input type="password" name="password" id="password" {...register('password')} placeholder="User Password" />
                              </div>
                              <div className="group align-right">
                                   <SubmitButton content={{title: "Login", type: 'submit'}} />
                              </div>
                         </form>
                    }
                    <p className="other-link"><Link to="/">Back to Home</Link></p>
               </div>
          </div>
          
          
     </div>
     )
}

export default AdminLogin