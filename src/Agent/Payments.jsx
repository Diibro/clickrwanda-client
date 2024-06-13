import { useContext } from "react"
import { AgentContext } from "./AgentLayout"
import MainRow from "./components/MainRow";
import Title from "./components/Title";
import AgentsPaymentTable from "./components/AgentsPaymentTable";

const Payments = () => {
     const [agentData] = useContext(AgentContext);
     const {payments} = agentData;

     return (
     <>
          <MainRow>
               <Title><h2>Track your payments:</h2></Title>
               <AgentsPaymentTable payments={payments} />
          </MainRow>
     </>
     )
}

export default Payments