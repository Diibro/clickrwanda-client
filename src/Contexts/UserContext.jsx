import { createContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { useState } from "react";

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
          const token = localStorage.getItem('loginToken') || null;
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