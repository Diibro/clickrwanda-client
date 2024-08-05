import { useContext, useEffect, useState } from "react";
import { DashboardContainer, DashboardRow } from "./components/DashboardComponents";
import UserContext from "../Contexts/UserContext";
import UserSubscriptionCard from "./components/cards/UserSubscriptionCard";
import { getDateToday, isLaterThan } from "../utils/dateFunctions";

const PayPlans = () => {
  const [user] = useContext(UserContext);
  const {userSubscriptions:subscriptions} = user;
  const [catSubs,setCatSubs] = useState(null);

  const updateCatSubs = () => {
    const subs = {
      'Active Subscriptions': [],
      "Pending Subscriptions":[],
      "Rejected Subscriptions":[],
      "All Approved Subscriptions":[],

    };
    if(subscriptions){
      subscriptions.forEach(sub => {
        if(sub.status === "Approved" && isLaterThan(getDateToday(), sub.exp_date)){
          subs["Active Subscriptions"].push(sub);
        }else if(sub.status === "pending"){
          subs["Pending Subscriptions"].push(sub);
        }else if (sub.status === "rejected"){
          subs["Rejected Subscriptions"].push(sub);
        } else if(sub.status === "Approved"){
          subs["All Approved Subscriptions"].push(sub);
        }
        setCatSubs(subs);
      })
    }
  }

  useEffect(() => {
    updateCatSubs();
  }, [subscriptions]);

  useEffect(()=>{
    console.log(subscriptions);
  },[])
  return (
    <DashboardContainer>
      <DashboardRow>
        <h2>Below are your subscriptions.</h2>
      </DashboardRow>
      {catSubs ?  
        Object.entries(catSubs).map(([key,value],index) => 
          <div className="user-subscriptions-container" key={`user-subscriptions-container-${index}`}>
            <div className="title"><h3>{key}</h3><span>({value.length})</span></div>
            {
              value.map((sub,index) => <UserSubscriptionCard key={`user-subsction-card-${index}`} subscription={sub} />)
            }
          </div>

        )
      : <p className="no-ads-found">No subscriptions found.</p>}
    </DashboardContainer>
  )
}

export default PayPlans;