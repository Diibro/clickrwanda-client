import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminLayout";
import { SubmitButton } from "../components/dynamic/Buttons";

import UserService from "../services/User";
import { textColors, titleSize } from "../components/styles";
import Title from "../components/dynamic/TitleComponents";
import Loading from "../components/static/Loading";
import { showMainNotification } from "../utils/AdminFunctions";
import UserContext from "../Contexts/UserContext";

const AdminLogin = () => {
     const [loading,setLoading ] = useState(false);
     const {register, handleSubmit,} = useForm();
     const [,setAdminData] = useContext(AdminContext);
     const navigate = useNavigate();
     const [,setUser] = useContext(UserContext);

    

     const submitForm = async (data) =>{
          try {
               setLoading(true);
               const res = await UserService.login(data);
               console.log(res);
               if(res != null) {
                    if(res.status === "pass"){
                         const userInfo = res.data;
                         if(userInfo.user_type === "admin"){
                              sessionStorage.setItem('loginToken', res.loginToken);
                              sessionStorage.setItem('userData', JSON.stringify(res.data));
                              setAdminData((prev) => ({
                                   ...prev,
                                   logged: true,
                                   adminInfo: userInfo
                              }));
                              setUser(prev => ({
                                   ...prev,
                                   loggedIn:true,
                                   userInfo:userInfo
                              }))
                              return showMainNotification('pass', `${res.message} as ${res.data.username}`, () => navigate("/admin"))
                         }else{
                              return showMainNotification('fail', `Cannot login. Try the other way`, () => {});
                         }
                    }else{
                         return showMainNotification('fail', `${res.message} .`, () => {});
                    }
               }else{
                    showMainNotification("fail", "Login failed. Contact super admin", () => {});
               }
          } catch (error) {
               console.log(error);
               return showMainNotification('fail', `System error .Try again`, () => {});
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