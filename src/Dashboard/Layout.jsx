
import {Routes, Route} from "react-router-dom";
import Home from "./Home";
import { ContentContainer, MainContainer, NavContainer } from "../components/dynamic/DashboardComponents";
import Profile from "./Profile";
import PayPlans from "./PayPlans";
import MyAdverts from "./MyAdverts";
import Logout from "./Logout";

const UserLayout = () => {
  return (
    <MainContainer>
      <NavContainer />
      <ContentContainer>
        <Routes>
          <Route path="/*" element={<Home />}/>
          <Route path="/profile-settings" element={<Profile />} />
          <Route path='/payment-plans' element={<PayPlans />} />
          <Route path="/user-adverts" element={<MyAdverts />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </ContentContainer>
      
    </MainContainer>
    
  )
}

export default UserLayout