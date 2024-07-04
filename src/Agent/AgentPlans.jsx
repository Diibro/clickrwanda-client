import { useContext } from "react"
import AgentPlansContainer from "./components/AgentPlansContainer"
import MainRow from "./components/MainRow"
import Title from "./components/Title"
import { AgentContext } from "./AgentLayout"

const AgentPlans = () => {
     const [agentData] = useContext(AgentContext);
     const {agentInfo} = agentData 
     return (
          <MainRow>
               <Title>
                    <h2>Sell Our packages</h2>
               </Title>
               <p>Click on the Sell Package button to copy the link.</p>
               <AgentPlansContainer agent={agentInfo} />
          </MainRow>
     )
}

export default AgentPlans