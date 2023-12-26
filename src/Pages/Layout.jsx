import {Routes, Route} from 'react-router-dom';
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
import { Loadingv2 } from '../components/static/Loading';
import SearchPage from './SearchPage';
import VendorPage from './VendorPage';
import CategoryPage from './CategoryPage';
import SubCategoryPage from './SubCategoryPage';
import { ShareButtons } from '../components/dynamic/Containers';
import TermsPage from './TermsPage';
import PrivacyPage from './PrivacyPage';


const Layout = () => {
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
               <Route path='/search/:params' element={<SearchPage />} />
               <Route path='/vendor/:params'  element={<VendorPage/>}/>
               <Route path='/category/:params' element={<CategoryPage />} />
               <Route path='/sub-category/:params' element={<SubCategoryPage />} />
               <Route path='*' element={<NotFound />}/>
          </Routes> 
          <AdvertView /> 
          <ShareButtons />
          <UserForms /> 
          <Loadingv2 />
          <Footer /> 
          </ViewProvider>
           
     </FilterProvider>
     )
}

export default Layout