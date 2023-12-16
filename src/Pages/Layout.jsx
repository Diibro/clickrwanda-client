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
               <Route path='/ad/:name' element={<AdvertPage />}/>
               <Route path='/search/:params' element={<SearchPage />} />
               <Route element={<NotFound />}/>
          </Routes> 
          <AdvertView /> 
          <UserForms /> 
          <Loadingv2 />
          <Footer /> 
          </ViewProvider>
           
     </FilterProvider>
     )
}

export default Layout