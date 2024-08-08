import { useContext, useEffect, useState } from "react"
import MainRow from "./components/MainRow"
import Title from "./components/Title"
import { AgentContext } from "./AgentLayout";
import AgentService from "../services/Agent";
import CommissionAdsContainer from "./components/CommissionAdsContainer";

const CommissionProducts = () => {
     const [agentData] = useContext(AgentContext);
     const {agentInfo} = agentData;

     const [commissionAds, setCommissionAds] = useState(null);

     useEffect(() => {
          (async() => {
               const res = await AgentService.getCommissionAdsByAgent(agentInfo.agent_id);
               if(res) {
                    const {data} = res;
                    console.log(data);
                    setCommissionAds(data);
               }
          })();
     },[agentInfo]);
     return (
          <>
               <MainRow>
                    <Title>
                         <h2>My Commission Products</h2>
                    </Title>
                    <CommissionAdsContainer ads={commissionAds} />
               </MainRow>
          </>
     )
}

export default CommissionProducts