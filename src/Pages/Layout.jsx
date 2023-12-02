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


const Layout = () => {
     return (
     <FilterProvider>
          <ContactBar />
          <DesktopHeader />
          <Routes>
               <Route index path='/' element={<Home />} />
               <Route path="/categories/*" element={<CategoriesPage />} />
               <Route  path='/user-dashboard/*' element={<AdminLayout />} />
               <Route path='/ads/*' element={<AdvertsPage />} />
               <Route path='/user-dashboard/*' element={<UserLayout />} />
          </Routes> 
          <AdvertView /> 
          <UserForms /> 
          <Footer />  
     </FilterProvider>
     )
}

export default Layout