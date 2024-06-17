import { useContext} from "react"
import MainRow from "./components/MainRow"
import { AgentContext } from "./AgentLayout";
import AgentPaymentService from "../services/AgentPayment"; 
import Title from "./components/Title";
import { copyText } from "../utils/otherFunctions";
import { showMainNotification } from "../utils/AdminFunctions";
import { getDateToday, isLaterThan } from "../utils/dateFunctions";

const Home = () => {
     const [agentData,setAgentData] = useContext(AgentContext);
     const {agentInfo,totalAmount,payments } = agentData;

     

     const claimPayment = async () => {
          if(totalAmount < 100){
               showMainNotification("fail", "Amount must be greater than Rwf 500", () => {} )
          }
          else if(isLaterThan(payments[0].p_date, getDateToday())) {
               showMainNotification("fail", "Another Payment Can be claimed tomorrow.", () => {})
          }
          else{
               const payData = {
                    p_date: getDateToday(),
                    amount: totalAmount,
                    agent_id: agentInfo.agent_id,
                    status: "pending"
               };

               const res = await AgentPaymentService.save(payData);
               if(res.status === "success"){
                    setAgentData((prev) => ({
                         ...prev,
                         payments: [res.data, ...payments]
                    }))
                    showMainNotification('pass', res.message, () => {});
               }else{
                    showMainNotification('fail', res.message, () => {});
               }
          }

     }
     return (
     <>
          <MainRow>
               <div className="agent-welcome-container">
                    <h2>Welcome to Agent Dashboard</h2>
                    <p>Click Rwanda offers an ultimate and trusted way to make online and remotely. Just in a few clicks you will start making money.</p>
                    <p>Follow the steps below to make Click Rwanda your earning platform.</p>
               </div>
               <div className="agent-total-earnings-container">
                    <h2>Total Earnings:</h2>
                    <b>Rwf {totalAmount}</b>
                    <button className="agent-claim-button" disabled={totalAmount < 100} onClick={ () => claimPayment()}>Claim Payment</button>
               </div>
          </MainRow>
          <MainRow>
               <Title>
                    <h2>Make money on Click Rwanda</h2>
               </Title>
               <div className="agent-content-card">
                    <h4>1. Help people open shops on ClickRwanda</h4>
                    <p>Click Rwanda pays Rwf 200 to verified agents who help people to successfully open shops on the platform.</p>
                    <p>It is very simple. Simply copy the <b>Agent Open shop Link</b> below. Share it to many people and guide them well on the journey to open their own shops on Click Rwanda.</p>
                    <p>After opening the shop. Also guide them on how to add propducts on their shops.</p>
                    <p>Click the copy the link. <br /> <b id="agent-open-shop-link">{`https://clickrwanda.com/forms/signup?=${agentInfo?.agent_id}`}</b> <button onClick={() => copyText("agent-open-shop-link")}>Copy Link</button></p>
               </div>
               <div className="agent-content-card">
                    <h4>2. Perform tasks assigned by the system.</h4>
                    <p>Earn Money by performing simple tasks assigned by Click Rwanda to you. </p>
                    <p>These tasks include: </p>
                    <ul>
                         <li>Earn through people who view our premium products using your referral link.</li>
                         <li>Earn through people who view our premium shops using your referral link</li>
                    </ul>
               </div>
               <div className="agent-content-card">
                    <h4>3. Earn Commission by Selling our membership plans to business.</h4>
                    <p>By view our plans in our plans in the plans button in the footer, Select which to sell and earn commission by selling any of our plans.</p>
               </div>
          </MainRow>
          <MainRow>
               <Title>
                    <h2>Today Tasks:</h2>
               </Title>
               <p className="agent-not-found-paragraphs">No tasks available today.</p>
          </MainRow>
     </>
     )
}

export default Home