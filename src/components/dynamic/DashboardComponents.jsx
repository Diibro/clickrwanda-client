import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { MdAccountCircle, MdOutlinePayment } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { LiaAdversal } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import { useContext } from 'react';
import DeviceView from '../../Contexts/ViewContext';

export const  MainContainer = ({children}) => {
     return(
          <div className="dashboard-main-container">
               {children}
          </div>
     )
}

const LinkContainer = ({content}) => {
     // const [deviceView] = useContext(DeviceView);
     // const {isMobile, isTablet} = deviceView;
     const location = useLocation();
     const dashboardUrl = '/user-dashboard';
     return(
          <div className="dashboard-link">
               <Link to={`${dashboardUrl}${content.to}`} className={location.pathname === `${dashboardUrl}${content.to}` ? "dashboard-link-active" : ''}><i>{content.icon ? content.icon : null}</i> {content.name}</Link>
          </div>
     )
}

export const NavContainer = () => {
     const [deviceView] = useContext(DeviceView);
     const {isMobile, isTablet} = deviceView;
     let cond = isMobile || isTablet || false;
     return(
          <div className="dashboard-navbar">
                    <LinkContainer content={{to:'/', name: !cond ? 'Home' : '', icon: <MdAccountCircle />}} />
                    <LinkContainer content={{to:'/profile-settings', name: !cond ?'View Profile' : '', icon: <IoSettings />}} />
                    <LinkContainer content={{to:'/user-adverts', name: !cond ? 'My Adverts' : '', icon: <LiaAdversal />}} />
                    <LinkContainer content={{to:'/payment-plans', name: !cond ? 'Payment Plans' : '', icon: <MdOutlinePayment />}} />
                    <LinkContainer content={{to:'/logout', name: !cond ? 'Log out' : '', icon: <CiLogout />}} />
          </div>
     )
}

export const ContentContainer = ({children}) => {
     return(
          <div className='dashboard-content'>
               {children}
          </div>
     )
}
NavContainer.propTypes = {
     children: PropTypes.any,
} 

MainContainer.propTypes = {
     children: PropTypes.node.isRequired,
}

ContentContainer.propTypes = {
     children: PropTypes.any,
} 

LinkContainer.propTypes = {
     content: PropTypes.object
}