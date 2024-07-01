
import { PaymentPlansContainer } from "../components/static/PaymentPlans.component"
import MainRow from "./components/MainRow"
import Title from "./components/Title"

const AgentPlans = () => {
     return (
          <MainRow>
               <Title>
                    <h2>Sell Our packages</h2>
               </Title>
               <PaymentPlansContainer />
          </MainRow>
     )
}

export default AgentPlans