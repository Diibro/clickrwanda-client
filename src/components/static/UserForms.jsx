import { useContext } from "react";
import { SubmitButton } from "../dynamic/Buttons";
import Title from "../dynamic/TitleComponents"
import { textColors, titleSize } from "../styles"
import UserContext from "../../Contexts/UserContext";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";


const UserForms = () => {
     const [user] = useContext(UserContext);
     const {activeForm} = user;
     if(activeForm != '') {
          return (
               <div className="user-forms">
                {activeForm === 'login' ? <LoginForm /> : activeForm === 'signup' ? <SignUpForm /> : null}
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
     const navigate = useNavigate();
     const submitForm = (e) => {
          e.preventDefault();
          console.log("submit form");
          navigate('/user-dashboard');
          setUser((prev) => ({
               ...prev,
               loggedIn: true,
               activeForm: ''
          }))
     }
     const closeForm = () => {
          setUser((prev) => ({...prev, activeForm:''}));
     }
     return(
          <div className="form-container">
               <i onClick={closeForm} className="close-icon"><ImCross/></i>
               <Title content={{type: "medium", color:textColors.blue, size: titleSize.medium, name:"Login"}} />
               <form onSubmit={submitForm}>
                    <div className="group">
                         <label htmlFor="email">Email: </label>
                         <input type="email" name="email" id="email_01" placeholder="User email..."  />
                    </div>
                    <div className="group">
                         <label htmlFor="password">Password: </label>
                         <input type="password" name="password" placeholder="User Password" />
                    </div>
                    <div className="group align-right">
                         <SubmitButton content={{title: "Log in", type: 'submit'}} />
                    </div>
               </form>
               <div className="line-divider"><p>Or</p></div>
               <p className="other-link">Don&rsquo;t have account <b onClick={() => setUser((prev) => ({...prev, activeForm:'signup'}))}>Sign Up</b></p>
          </div>
     )
}

const SignUpForm = () => {
     const [,setUser] = useContext(UserContext);
     const submitForm = (e) => {
          e.preventDefault();
          console.log("submit form");
     }
     const closeForm = () => {
          setUser((prev) => ({...prev, activeForm:''}))
     }
     return(
          <div className="form-container">
               <i onClick={closeForm} className="close-icon"><ImCross/></i>
               <Title content={{type: "medium", color:textColors.blue, size: titleSize.medium, name:"Sign Up"}} />
               <form onSubmit={submitForm}>
                    <div className="group">
                         <label htmlFor="name">Full name: </label>
                         <input type="text" name="name" id="name_01" placeholder="Ex: Adms Johns..."  />
                    </div>
                    <div className="group">
                         <label htmlFor="username">Username: </label>
                         <input type="text" name="username" id="username_01" placeholder="username..."  />
                    </div>
                    <div className="group">
                         <label htmlFor="email">Email: </label>
                         <input type="email" name="email" id="email_01" placeholder="User email..."  />
                    </div>
                    <div className="group">
                         <label htmlFor="name">Phone: </label>
                         <input type="phone" name="phone" id="phone_01" placeholder="Ex: +25078..."  />
                    </div>
                    <div className="group">
                         <label htmlFor="password">Password: </label>
                         <input type="password" name="password" placeholder="User Password" />
                    </div>
                    <div className="group align-right">
                         <SubmitButton content={{title: "Sign Up", type: 'submit'}} />
                    </div>
               </form>
               <div className="line-divider"><p>Or</p></div>
               <p className="other-link">Have account <b onClick={() => setUser((prev) => ({...prev, activeForm:'login'}))}>Login</b></p>
          </div>
     )
}

export default UserForms;