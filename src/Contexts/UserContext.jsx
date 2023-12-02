import { createContext } from "react";
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
     return(
          <UserContext.Provider value={[user, setUser]} >{children}</UserContext.Provider>
     )
}

UserProvider.propTypes = {
     children: PropTypes.node.isRequired,
}
export default UserContext;