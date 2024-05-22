import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlinePayment, MdRateReview } from "react-icons/md";
import { IoHome, IoSettings } from "react-icons/io5";
import { LiaAdversal } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import { useContext, useState } from 'react';
import UserContext from '../../Contexts/UserContext';
import DeviceView from '../../Contexts/ViewContext';

export const  MainContainer = ({children}) => {
     return(
          <div className="dashboard-main-container">
               {children}
          </div>
     )
}

export const DashboardContainer = ({children}) => {
     return (
          <div className='dashboard-container'>
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
               <Link to={`${dashboardUrl}${content.to}`} className={location.pathname === `${dashboardUrl}${content.to}` ? "dashboard-link-active" : ''}><i>{content.icon ? content.icon : null}</i> <span>{content.name}</span></Link>
          </div>
     )
}

export const NavContainer = () => {
     return(
          <div className="dashboard-navbar" id="dashboard-nav-bar">
                    <LinkContainer content={{to:'/', name: 'Home', icon: <IoHome />}} />
                    <LinkContainer content={{to:'/profile-settings', name: 'View Profile', icon: <IoSettings />}} />
                    <LinkContainer content={{to:'/user-adverts', name: 'My Adverts', icon: <LiaAdversal />}} />
                    <LinkContainer content={{to:'/user-reviews', name:  'Reviews', icon: <MdRateReview />}} />
                    <LinkContainer content={{to:'/payment-plans', name: 'Payment Plans', icon: <MdOutlinePayment />}} />
                    <LinkContainer content={{to:'/logout', name:'Log out', icon: <CiLogout />}} />
          </div>
     )
}

export const ContentContainer = ({children}) => {
     const [user] = useContext(UserContext);
     const {loggedIn} = user;
     const [deviceView] = useContext(DeviceView);
     const {isTablet,isMobile} = deviceView;
     const [navOn, setNavOn] = useState(false);

     const showHeader = (event) => {
          event.stopPropagation();
          let navbar = document.getElementById("dashboard-nav-bar");
          if(loggedIn && (isMobile || isTablet)){
               if(navOn){
                    
                    navbar.style.left = "-55%";
                    setNavOn(false);
               }else{
                    navbar.style.left = "0%";
                    setNavOn(true);
               }
          }
     }
     return(
          <div className='dashboard-content' onClick={showHeader}>
               {children}
               
          </div>
     )
}

export const DashboardRow = ({children}) => {
     return(
          <div className="dashboard-row">
               {children}
          </div>
     )
}

export const DashboardColumn = ({children}) => {
     return(
          <div className="dashboard-column">
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

DashboardContainer.propTypes = {
     children: PropTypes.any
}

DashboardRow.propTypes = {
     children: PropTypes.any
}

DashboardColumn.propTypes = {
     children: PropTypes.any
}