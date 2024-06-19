import { createContext, useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import AgentsPage from "./AgentsPage";
import AdvertsPage from "./AdvertsPage";
import Settings from "./Settings";
import ShopsPage from "./ShopsPage";
import Logout from "./Logout";


import AdminForms from "./components/forms/AdminForms";
import Notification from "./components/Notification";
import { sortByAny } from "../utils/filterFunctions";

//importing services 
import { getLocations } from "../utils/locations";
import CategoryService from "../services/Category";
import AgentService from "../services/Agent";
import UserService from "../services/User";
import AdvertService from "../services/Advert";
import SubCategoryService from "../services/SubCategory";
import WebViewService from "../services/WebView";
import PayPlanService from "../services/PaymentPlan";

export const AdminContext = createContext();

const AdminLayout = () => {
     const [adminData, setAdminData] = useState({
          logged: false,
          adminInfo: null,
          categories:null,
          subCategories: null,
          locations:null,
          agents: null,
          shops: null,
          adverts: null,
          webVisits: null,
          paymentPlans: null,
          activeForm: {type: "default", formName: "", objFocus: null},
          notification: {type:"",message:"Notification"},
     });

     const {logged, activeForm} = adminData;

     const fetchData = async () => {
          const {districts} = getLocations();
          const catRes = await CategoryService.getAll();
          const agents = await AgentService.getAll();
          const shops = await UserService.getAll();
          const adverts = await AdvertService.getAll();
          const subCats = await SubCategoryService.getAll();
          const webViews = await WebViewService.getAllVisits();
          const plans = await PayPlanService.getAll();
          console.log(adverts);
          console.log(shops);
          setAdminData((prev) => ({
               ...prev,
               locations: districts,
               categories: catRes.data,
               agents: sortByAny(agents.data, "registration_date"),
               shops: sortByAny(shops.data, "reg_date"),
               adverts:sortByAny(adverts.data, "ad_date"),
               subCategories: subCats.data,
               webVisits: webViews.data,
               paymentPlans: plans.data
          }))
     }

     const checkLogin = () =>{
          try {
               const loginToken = sessionStorage.getItem("loginToken");
               const userInfoString = sessionStorage.getItem("userData");
               if(userInfoString  && userInfoString != undefined) {
                    const userinfo = JSON.parse(userInfoString);
                    if(loginToken && userinfo && userinfo.role === "admin"){
                         setAdminData((prev) => ({...prev, logged:true, adminInfo:userinfo}))
                    }
               }
               
          } catch (error) {
               console.log(error);
          }
          
     }

     useEffect(() => {
          checkLogin();
          (async() => await fetchData())();
     }, [])
     return (
          <AdminContext.Provider value={[adminData, setAdminData]}>
               {logged ? 
               <div className="admin-layout">
                    <Navbar />
                    <div className="admin-main-content">
                         <div className="admin-content hide-scroll">
                              <Routes>
                                   <Route index path="/" element={<Home />} />
                                   <Route path="/agents/*" element={<AgentsPage />} />
                                   <Route path="/adverts" element={<AdvertsPage />} />
                                   <Route path="/settings" element={<Settings />} />
                                   <Route path="/shops" element={<ShopsPage />} />
                                   <Route path="/logout" element={<Logout />} />
                              </Routes>
                         </div>
                         {activeForm ? <AdminForms /> : null}
                         <Notification />
                    </div>
                    
                    
               </div>
               :<AdminLogin />
               }
          </AdminContext.Provider>
     )
     
}

export default AdminLayout