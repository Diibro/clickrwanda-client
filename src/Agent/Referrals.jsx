import { useContext, useEffect } from "react"
import { AgentContext } from "./AgentLayout"
import MainRow from "./components/MainRow";
import Title from "./components/Title";
import RefShopCard from "./components/RefShopCard";
import RefWebVisitCard from "./components/RefWebVisitCard";

const Referrals = () => {
     const [agentData] = useContext(AgentContext);

     const {referrals,webVisitsRef } = agentData;

     useEffect(() => {
          console.log(webVisitsRef);
     },[])
     return (
     <>
          <Title><h2>Track your work</h2></Title>
          <MainRow>
               <Title><h3>Membership plans sold</h3></Title>
               
          </MainRow>
          <MainRow>
               <Title><h3>Shops Created using you referral Code:</h3></Title>
               {
                    referrals && referrals[0]
                    ? 
                    referrals.map((item, index) => <RefShopCard key={`${index}--${item.user_id}`} shop={item} /> )
                    : <p className="agent-not-found-paragraphs">No shops with your referral code are found. </p>  
               }
          </MainRow>
          <MainRow>
               <Title><h3>Referral Webvisits:</h3></Title>
               {
                    webVisitsRef && webVisitsRef[0] 
                    ? 
                    webVisitsRef.map((item, index) => <RefWebVisitCard key={`web-visit-card-ref-${index}`} visit={item} />)
                    : <p className="agent-not-found-paragraphs">No referred webvisits found.</p>
               }
          </MainRow>
     </>
     )
}

export default Referrals