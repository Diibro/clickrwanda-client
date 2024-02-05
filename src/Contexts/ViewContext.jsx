import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const DeviceView = createContext();

export const ViewProvider = ({children}) => {
     const [deviceView, setDeviceView] = useState({
          isMobile: false,
          isTablet: false,
     });
     const updateView = () => {
          if(window.innerWidth <= 768  ){
               setDeviceView((prev) => ({...prev,isMobile: true}));
          }else if( window.innerWidth > 768 && window.innerWidth <= 992){
               setDeviceView((prev) => ({...prev,isMobile: false, isTablet: true}));
          }else{
               setDeviceView((prev) => ({...prev, isMobile:false, isTablet: false}))
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
