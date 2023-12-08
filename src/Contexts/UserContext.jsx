import { createContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { useState } from "react";
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({children}) => {
     const [user, setUser] = useState({
          userId: '',
          userAdverts: [],
          userInfo: {},
          activeForm: '',
          loggedIn: false
     });
     useEffect(() => {
          const token = Cookies.get('clickrwanda-server-token');
          console.log(token);
          if(token){
               const storedData = localStorage.getItem('userData');
               if(storedData){
                    const userData = JSON.parse(storedData);
                    setUser((prev) => ({
                    ...prev,
                    userInfo: userData,
                    loggedIn: true
                    }))
               }
          }
     }, []);
     
     return(
          <UserContext.Provider value={[user, setUser]} >{children}</UserContext.Provider>
     )
}

UserProvider.propTypes = {
     children: PropTypes.node.isRequired,
}
export default UserContext;