import { Link, useLocation } from "react-router-dom"
import Logo from "../assets/logo/clickrwanda.png"
import { useEffect } from "react"
import { FaHome } from "react-icons/fa";
import { FaShop, FaUserSecret } from "react-icons/fa6";
import { RiAdvertisementFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { GrLogout } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";


const Navbar = () => {
     const location = useLocation();
     useEffect(()=> {
          // console.log(location.pathname);
     }, [location.pathname])
     return (
     <div className="admin-navbar hide-scroll">
          <div className="dash-logo-container">
               <Link to={"/admin/logout"}>
                    <img src={Logo} alt="clickrwanda-logo" />
               </Link>
          </div>
          <div className="dash-nav-container">
               <Link to={"/admin"}><i><FaHome /></i><span>Home</span></Link>
               <Link to={"/admin/agents"}><i><FaUserSecret /></i><span>Agents</span></Link>
               <Link to='/admin/adverts'><i><RiAdvertisementFill/></i><span>Adverts</span></Link>
               <Link to={"/admin/shops"}><i><FaShop/></i><span>Shops</span></Link>
               <Link><i><BiCategory /></i><span>Categories</span></Link>
               <Link to="/admin/plans"><i><FiPackage/></i><span>Plans</span></Link>
               <Link to={"/admin/settings"}><i><IoSettings/></i><span>Settings</span></Link>
               <Link to={"/admin/logout"}><i><GrLogout /></i><span>Logout</span></Link>
          </div>
     </div>
     )
}

export default Navbar