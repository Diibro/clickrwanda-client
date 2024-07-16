
import { DashboardContainer, DashboardRow } from "./components/DashboardComponents";
import UserPlansContainer from "./components/containers/UserPlansContainer";

const UserPlansPage = () => {
     return (
          <DashboardContainer>
               <DashboardRow>
                    <h2>Memberships plans</h2>
                    <p>Click on the <b>Choose Plan</b> button to choose your favorite plan.</p>
               </DashboardRow>
               
               <UserPlansContainer />
          </DashboardContainer>
     )
}

export default UserPlansPage