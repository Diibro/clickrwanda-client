
import {Routes, Route, useNavigate} from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import PayPlans from "./PayPlans";
import Logout from "./Logout";
import { useEffect } from "react";
import { UserReviews } from "./Reviews";
import { ContentContainer, MainContainer, NavContainer } from "./components/DashboardComponents";
import ShopStatistics from "./ShopStatistics";
import UserPlansPage from "./UserPlansPage";

const JobSeekerLayout = () => {
  const navigate = useNavigate();
    useEffect(() => {
      if(!sessionStorage.getItem('loginToken')){
        navigate('/');
      }
    }, []);
    return (
      <MainContainer>
        <NavContainer />
        <ContentContainer>
          <Routes>
            <Route path="/*" element={<Home />}/>
            <Route path="/profile-settings" element={<Profile />} />
            <Route path='/payment-plans' element={<PayPlans />} />
            <Route path="/user-reviews" element={<UserReviews />} />
            <Route path="/statistics" element={<ShopStatistics />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/user-plans" element={<UserPlansPage />} />
          </Routes>
        </ContentContainer>
        
      </MainContainer>
      
    )
}

export default JobSeekerLayout;