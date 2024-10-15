import {Routes, Route, useLocation} from 'react-router-dom';
import DesktopHeader from '../components/static/Header';
import Home from './Home';
import ContactBar from '../components/static/ContactBar';
import AdminLayout from '../User/Layout';
import CategoriesPage from './CategoriesPage';
import AdvertsPage from './AdvertsPage';
import Footer from '../components/static/Footer';
import { FilterProvider } from '../Contexts/FilterContext';
// import UserForms from '../components/static/UserForms';
import UserLayout from '../User/Layout';
import AdvertView from '../views/AdvertView';
import { ViewProvider } from '../Contexts/ViewContext';
import { AlertView } from '../views/AlertsViews';
import NotFound from './NotFound';
import AdvertPage from './AdvertPage';
import { LoadingV1 } from '../components/static/Loading';
import SearchPage from './SearchPage';
import VendorPage from './VendorPage';
import CategoryPage from './CategoryPage';
import SubCategoryPage from './SubCategoryPage';
import { ShareButtons } from '../components/dynamic/Containers';
import TermsPage from './TermsPage';
import PrivacyPage from './PrivacyPage';
import { useEffect } from 'react';
import HiringPage from './HiringPage';
import PasswordPage from './PasswordPage';
import BestSellers from './BestSellers';
import OpenShopPage from './OpenShopPage';
import QuotationPage from './QuotationPage';
import PaymentPlans from './PaymentPlans';
import TopDealsPage from './TopDealsPage';
import BoostedAdsPage from './BoostedAdsPage';
import WebsitesVisitors from './WebsitesVisitors';
import AgentLayout from '../Agent/AgentLayout';
import { getDateToday } from '../utils/dateFunctions';
import WebViewService from "../services/WebView";
import { fetchIds } from '../utils/urlFunctions';
import About from './About';
import HelpCenter from './HelpCenter';
import ContactPage from './ContactPage';
import PlanPaymentPage from './PlanPaymentPage';
import ContactSeller from '../components/containers/ContactSeller';
import Forms from './Forms';
import JobSeekerLayout from '../jobSeeker/Layout';
import LocationPage from './LocationPage';
import MarketPage from './MarketPage';
import OurShopPage from './OurShopPage';
import BlogsPage from './BlogsPage';


const Layout = () => {
     const location = useLocation();
     

     

     useEffect(() => {
          window.scrollTo(0,0);
          const saveVisit = async () => {
               const {v_id, r_id} = fetchIds(location);
               const v_date = getDateToday();
               const v_type = location.pathname === "/" ? "home" : location.pathname;
               const userType = localStorage.getItem('user-type');
               if(userType){
                    const webVisit = {v_date,v_type, v_id, r_id:null};
                    await WebViewService.addVisit(webVisit);
               }else {
                    const webVisit = {v_date,v_type, v_id, r_id};
                    await WebViewService.addVisit(webVisit);
               }
               
          }
          (async () => await saveVisit())();
     },[location.pathname] );
     
     return (
     <FilterProvider>
          <ViewProvider>
          <AlertView />
          <ContactBar />
          <DesktopHeader />
          <Routes>
               <Route index path='/' element={<Home />} />
               <Route path="/categories/*" element={<CategoriesPage />} />
               <Route  path='/user-dashboard/*' element={<AdminLayout />} />
               <Route path='/job-seeker-dashboard/*' element={<JobSeekerLayout />} />
               <Route path='/ads/*' element={<AdvertsPage />} />
               <Route path='/user-dashboard/*' element={<UserLayout />} />
               <Route path='/terms-&-conditions' element={<TermsPage />} />
               <Route path='/privacy-policy' element={<PrivacyPage/>} />
               <Route path='/ad/:name' element={<AdvertPage />}/>
               <Route path='/search' element={<SearchPage />} />
               <Route path='/vendor/:params'  element={<VendorPage/>}/>
               <Route path='/category/:params' element={<CategoryPage />} />
               <Route path='/sub-category/:params' element={<SubCategoryPage />} />
               <Route path='/hiring' element={<HiringPage />}/>
               {/**special pages */}
               <Route path='/best-sellers' element={<BestSellers/>} />
               <Route path='/accounts/:params' element={<PasswordPage />} />
               <Route path='/get-started' element={<OpenShopPage />} />
               <Route path='/send-request' element={<QuotationPage />} />
               <Route path='/payment-plans/*' element={<PaymentPlans />} />
               <Route path='/top-deals' element={<TopDealsPage />} />
               <Route path='/website-visits' element={<WebsitesVisitors />} />
               <Route path='/sponsored-ads' element={<BoostedAdsPage />} />
               {/* <Route path="/forms/:params" element={<UserForms /> } /> */}
               <Route path='/agent/*' element={<AgentLayout />} />
               <Route path="/about" element={<About />} />
               <Route path='/help-center' element={<HelpCenter />} />
               <Route path='/contact-us' element={<ContactPage />} />
               <Route path='/plan-payment' element={<PlanPaymentPage />} />
               <Route path='/location/*' element={<LocationPage />} />
               <Route path='/forms/*' element={<Forms />} />
               <Route path='/market/*' element={<MarketPage />}/>
               <Route path='/our-shop/*' element={<OurShopPage />} />
               <Route path='/blogs/*' element={<BlogsPage />} />
               <Route path='*' element={<NotFound />}/>
          </Routes> 
          <AdvertView /> 
          <ShareButtons />
          {/* <Loadingv2 /> */}
          <LoadingV1 />
          <ContactSeller />
          <Footer /> 
          </ViewProvider>
           
     </FilterProvider>
     )
}

export default Layout