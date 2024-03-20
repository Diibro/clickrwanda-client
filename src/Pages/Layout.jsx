import {Routes, Route, useLocation} from 'react-router-dom';
import DesktopHeader from '../components/static/Header';
import Home from './Home';
import ContactBar from '../components/static/ContactBar';
import AdminLayout from '../Dashboard/Layout';
import CategoriesPage from './CategoriesPage';
import AdvertsPage from './AdvertsPage';
import Footer from '../components/static/Footer';
import { FilterProvider } from '../Contexts/FilterContext';
import UserForms from '../components/static/UserForms';
import UserLayout from '../Dashboard/Layout';
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


const Layout = () => {
     const location = useLocation();
     useEffect(() => {
          window.scrollTo(0,0);
     },[location.pathname] )
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
               <Route path="/forms/:params" element={<UserForms /> } />
               <Route path='*' element={<NotFound />}/>
          </Routes> 
          <AdvertView /> 
          <ShareButtons />
          {/* <Loadingv2 /> */}
          <LoadingV1 />
          <Footer /> 
          </ViewProvider>
           
     </FilterProvider>
     )
}

export default Layout