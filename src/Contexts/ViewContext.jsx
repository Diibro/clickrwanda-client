import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const DeviceView = createContext();

export const ViewProvider = ({children}) => {
     const [deviceView, setDeviceView] = useState({
          isMobile: false,
     });
     const updateView = () => {
          if(window.innerWidth >= 768){
               setDeviceView((prev) => ({...prev,isMobile: false}));
          }else{
               setDeviceView((prev) => ({...prev,isMobile: true}));
          }
     }

     useEffect(()=> {
          updateView();
          window.addEventListener('resize', updateView);
     }, []);

     return(
          <DeviceView.Provider value={[deviceView, setDeviceView]}>
               {children}
          </DeviceView.Provider>
     )
}

ViewProvider.propTypes = {
     children: PropTypes.node.isRequired,
}
export default DeviceView;
