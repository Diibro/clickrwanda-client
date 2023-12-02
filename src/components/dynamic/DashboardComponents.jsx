import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { MdAccountCircle, MdOutlinePayment } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { LiaAdversal } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
// import { useContext } from 'react';
// import DeviceView from '../../Contexts/ViewContext';

export const  MainContainer = ({children}) => {
     return(
          <div className="dashboard-main-container">
               {children}
          </div>
     )
}

const LinkContainer = ({content}) => {
     // const [deviceView] = useContext(DeviceView);
     // const {isMobile} = deviceView;
     const location = useLocation();
     const dashboardUrl = '/user-dashboard';
     return(
          <div className="dashboard-link">
               <Link to={`${dashboardUrl}${content.to}`} className={location.pathname === `${dashboardUrl}${content.to}` ? "dashboard-link-active" : ''}><i>{content.icon ? content.icon : null}</i> {content.name}</Link>
          </div>
     )
}

export const NavContainer = () => {
     return(
          <div className="dashboard-navbar">
                    <LinkContainer content={{to:'/', name: 'Home', icon: <MdAccountCircle />}} />
                    <LinkContainer content={{to:'/profile-settings', name: 'View Profile', icon: <IoSettings />}} />
                    <LinkContainer content={{to:'/user-adverts', name: 'My Adverts', icon: <LiaAdversal />}} />
                    <LinkContainer content={{to:'/payment-plans', name: 'Payment Plans', icon: <MdOutlinePayment />}} />
                    <LinkContainer content={{to:'/logout', name: 'Log out', icon: <CiLogout />}} />
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
     children: PropTypes.node.isRequired,
} 

MainContainer.propTypes = {
     children: PropTypes.node.isRequired,
}

ContentContainer.propTypes = {
     children: PropTypes.node.isRequired,
} 

LinkContainer.propTypes = {
     content: PropTypes.object
}