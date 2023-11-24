import {Routes, Route} from 'react-router-dom';
import DesktopHeader from '../components/static/Header';
import { MobileHeader } from '../components/static/Header';
import Home from './Home';
import ContactBar from '../components/static/ContactBar';
import { useEffect, useState } from 'react';
import AdminLayout from '../Dashboard/Layout';
import CategoriesPage from './CategoriesPage';
import AdvertsPage from './AdvertsPage';
import Footer from '../components/static/Footer';


const Layout = () => {
     const [isMobile, setIsMobile] = useState(false);
     const updateMobile = () => {
          if(window.innerWidth >= 768 ){
               setIsMobile(false);
          }else{
               setIsMobile(true);
          }
     }
     useEffect(()=> {
          updateMobile();
          window.addEventListener('resize', updateMobile);
     }, [isMobile])
     return (
     <>
          <ContactBar />
          { !isMobile ? <DesktopHeader /> : <MobileHeader />}
          <Routes>
               <Route index path='/' element={<Home />} />
               <Route path="/categories/*" element={<CategoriesPage />} />
               <Route  path='/user-dashboard/*' element={<AdminLayout />} />
               <Route path='/ads/*' element={<AdvertsPage />} />
          </Routes>   
          <Footer />  
     </>
     )
}

export default Layout