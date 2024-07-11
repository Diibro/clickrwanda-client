import { useContext} from "react"
import MainRow from "./components/MainRow"
import { AgentContext } from "./AgentLayout";
import AgentPaymentService from "../services/AgentPayment"; 
import Title from "./components/Title";
import { showMainNotification } from "../utils/AdminFunctions";
import { getDateToday, isLaterThan } from "../utils/dateFunctions";
import AgentContentCard from "./components/AgentContentCard";
import { countVisits } from "../utils/agentFunctions";
import { useNavigate } from "react-router-dom";
import { copyText } from "../utils/otherFunctions";
import TaskContainer from "./components/TaskContainer";

const Home = () => {
     const [agentData,setAgentData] = useContext(AgentContext);
     const {agentInfo,totalAmount,payments, referrals, webVisitsRef:webVisits,packageSold, tasks } = agentData;
     const navigate = useNavigate();

     const claimPayment = async () => {
          if(totalAmount < 500){
               showMainNotification("fail", "Amount must be greater than Rwf 500", () => {} )
          }
          else if(payments.length && !isLaterThan(payments[0].p_date, getDateToday())) {
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
                    <h2>Welcome <span>{agentInfo?.a_name}</span></h2>
                    <p>Click Rwanda offers an ultimate and trusted way to make online and remotely.</p>
               </div>
               <div className="agent-total-earnings-container">
                    <h2>Total Earnings:</h2>
                    <b>Rwf {totalAmount}</b>
                    <button className="agent-claim-button" disabled={totalAmount < 500} onClick={ () => claimPayment()}>Claim Payment</button>
               </div>
          </MainRow>
          <MainRow>
               <AgentContentCard content={{title: "Packages Sold", count: packageSold?.length || 0}} />
               <AgentContentCard content={{title: "Shops Opened", count: referrals?.length || 0}} />
               <AgentContentCard content={{title: "Shop Visits", count: countVisits(webVisits, "v_type", "/vendor")}} />
               <AgentContentCard content={{title: "Advert Visits", count: countVisits(webVisits, "v_type", "/ad")}} />
               {/* <AgentContentCard content={{title: "Shops Opened", count: 0}} />
               <AgentContentCard content={{title: "Shops Opened", count: 0}} /> */}
          </MainRow>
          <MainRow>
               <Title>
                    <h2>Make money on Click Rwanda</h2>
               </Title>
               <div className="agent-content-card">
                    <h4>1. Sell Click Rwanda membership plans.</h4>
                    <p>Earn 20% commission on every package you sell. On every successful payment by any business referred by you, you will be paid 20% of the amount paid.</p>
                    <p>By Selling Click Rwanda packages, you earn a rank in the top agents who are the ones given more tasks than others.</p>
                    <p><button onClick={() => navigate('/agent/pay-plans')}>View Packages</button></p>
               </div>
               <div className="agent-content-card">
                    <h4>2. Advertisement of premium ads</h4>
                    <p>Every agent is assigned a task by Click Rwanda about the ads to advertise. You can find the tasks assigned to you in the tasks section.</p>
                    <p>Simply you copy the ad link and share via your social medias, whatsapp and other platforms. Then you get paid some amount on the every clicks you get. More clicks more money.</p>
                    <p><button onClick={() => navigate("/agent/tasks")}>View Tasks today</button></p>
               </div>
               <div className="agent-content-card">
                    <h4>3. Help people open shops on ClickRwanda</h4>
                    <p>Click Rwanda pays Rwf 20 to verified agents who help people to successfully open shops on the platform.</p>
                    <p>It is very simple. Simply copy the <b>Agent Open shop Link</b> in the tasks Section. Share it to many people and guide them well on the journey to open their own shops on Click Rwanda.</p>
                    <p>Click the copy the link. <br /> <b id="agent-open-shop-link">{`https://clickrwanda.com/forms/signup?=${agentInfo?.agent_id}`}</b> <button onClick={() => copyText("agent-open-shop-link")}>Copy Link</button></p>
                    {/* <p><button onClick={() => navigate("/agent/tasks")}>View Tasks</button></p> */}
               </div>
               <div className="agent-content-card">
                    <h4>4. Other Tasks</h4>
                    <p>Agents on Click Rwanda can earn huge money by performing others tasks assigned to them. These tasks include advertising our top sellers. </p>
                    <p><button onClick={() => navigate("/agent/tasks")}>View Available</button></p>
               </div>
               
          </MainRow>
          <MainRow>
               <Title>
                    <h2>Today Tasks:</h2>
               </Title>
               {
                    tasks && tasks[0] ? 
                         tasks.map((task, index) => <TaskContainer key={`agent-task-cont-${index}` } task={task} agent={agentInfo} />)
                    :<p className="agent-not-found-paragraphs">No tasks available today.</p>
               }
               
          </MainRow>
     </>
     )
}

export default Home