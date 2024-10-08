import { useContext, useEffect, useState} from "react"
import MainRow from "./components/MainRow"
import { AgentContext } from "./AgentLayout";
import AgentPaymentService from "../services/AgentPayment"; 
import Title from "./components/Title";
import { showMainNotification } from "../utils/AdminFunctions";
import { getDateToday, isLaterThan } from "../utils/dateFunctions";
import AgentContentCard from "./components/AgentContentCard";
import { countVisits } from "../utils/agentFunctions";
import { useNavigate } from "react-router-dom";
import { copyToClipboard } from "../utils/otherFunctions";
import AgentService from "../services/Agent";

const Home = () => {
     const [agentData,setAgentData] = useContext(AgentContext);
     const {agentInfo,totalAmount,payments, referrals, webVisitsRef:webVisits,packageSold} = agentData;
     const [commissionAdsNo,setCommissionAdsNo] = useState(0);
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

     const showAddAdForm = () => {
          navigate(`/forms/add-advert?=commission?=${agentInfo.agent_id}`);
     }

     useEffect(() => {
          if(agentInfo){
               (async() => {
                    const res = await AgentService.getCounts({agent_id: agentInfo.agent_id});
                    if(res){
                         const {data} = res;
                         setCommissionAdsNo(data.commissionAdsCount);
                    }
               })();
          }
     },[agentInfo]);
     return (
     <>
          <MainRow>
               <div className="agent-welcome-container">
                    <h2>Welcome <span>{agentInfo?.a_name}</span></h2>
                    <p>Click Rwanda offers an ultimate and trusted way to make money online and remotely.</p>
               </div>
               <div className="agent-total-earnings-container">
                    <h2>Total Earnings:</h2>
                    <b>Rwf {totalAmount}</b>
                    <button className="agent-claim-button" disabled={totalAmount < 500} onClick={ () => claimPayment()}>Claim Payment</button>
               </div>
          </MainRow>
          {
               agentInfo?.agent_type !== 'influencer' ?
                    <MainRow>
                         <AgentContentCard content={{title: "Packages Sold", count: packageSold?.length || 0, clickAction: () => navigate('/agent/referrals#agent-packages-solid')}} />
                         {/* <AgentContentCard content={{title: "Shops Opened", count: referrals?.length || 0, clickAction: () => navigate('/agent/referrals#agent-shops-opened')}} /> */}
                         <AgentContentCard content={{title: "Commission Products", count: commissionAdsNo, clickAction: () => navigate('/agent/commission-products')}} />
                         <AgentContentCard content={{title: "Advert Visits", count: countVisits(webVisits, "v_type", "/ad"), clickAction: () => navigate('/agent/referrals#agent-advert-visits')}} />
                    </MainRow>               
               :
                    <MainRow>
                         <AgentContentCard content={{title: "Bought packages", count: packageSold?.length || 0}} />
                         {/* <AgentContentCard content={{title: "Opened Shops", count: referrals?.length || 0}} /> */}
                         <AgentContentCard content={{title: "Total Clicks", count: countVisits(webVisits, "v_type", "/ad")}} />
                    </MainRow>

          }
          <MainRow>
               <Title>
                    <h2>Make money on Click Rwanda</h2>
               </Title>
               {
                    agentInfo?.agent_type !== 'influencer' ? 
                    <>
                         <div className="agent-content-card">
                              <h4>1. Sell Click Rwanda membership plans.</h4>
                              <p>Earn 30% commission on every package you sell. On every successful payment by any business referred by you, you will be paid 30% of the amount paid.</p>
                              <p>By Selling Click Rwanda packages, you earn a rank in the top agents who are the ones given more tasks than others.</p>
                              <p><button onClick={() => navigate('/agent/pay-plans')}>View Packages</button></p>
                         </div>
                         <div className="agent-content-card">
                              <h4>2. Advertisement of featured ads</h4>
                              <p>Every agent is assigned a task by Click Rwanda about the ads to advertise. You can find the tasks assigned to you in the tasks section.</p>
                              <p>Simply you copy the ad link and share via your social medias, whatsapp and other platforms. Then you get paid some amount on the every clicks you get. More clicks more money.</p>
                              <p><button onClick={() => navigate("/agent/tasks")}>View Tasks today</button></p>
                         </div>
                         {/* <div className="agent-content-card">
                              <h4>3. Help people open shops on ClickRwanda</h4>
                              <p>Click Rwanda pays Rwf 20 to verified agents who help people to successfully open shops on the platform.</p>
                              <p>It is very simple. Simply copy the <b>Agent Open shop Link</b> in the tasks Section. Share it to many people and guide them well on the journey to open their own shops on Click Rwanda.</p>
                              <p>Click the copy the link. <br /> <b id="agent-open-shop-link">{`https://clickrwanda.com/forms/signup?=${agentInfo?.agent_id}`}</b> <button onClick={() => copyToClipboard(`https://clickrwanda.com/forms/signup?=${agentInfo?.agent_id}`)}>Copy Link</button></p>
                              <p><button onClick={() => navigate("/agent/tasks")}>View Tasks</button></p>
                         </div> */}
                         <div className="agent-content-card">
                              <h4>3. Earn Commission on products.</h4>
                              <p>Click Rwanda pays 70% of the commission earned upon successful transaction of the producsts brought by the agents.</p>
                              <p>To post a deal on clickrwanda market click the button below and fill in the information of deal or product and you will be paid 70% of the commission earned upon successful transaction of the deal.</p>
                              <p><button onClick={showAddAdForm}>Post Commission Deals</button></p>
                         </div>
                    </> : 
                    <>
                         <div className="agent-content-card">
                              <h4>1. Create content about Click  Rwanda Packages.</h4>
                              <p>Earn 30% commission on every package bought from the content you make about ClickRwanda membership packages. On every successful payment by any business referred by you, you will be paid 30% of the amount paid.</p>
                              <p>By Selling Click Rwanda packages, you not only earn commission but also earn a good reputation from the ClickRwanda Platform.</p>
                              <p><button onClick={() => navigate('/agent/pay-plans')}>View Packages</button></p>
                         </div>
                         <div className="agent-content-card">
                              <h4>2. Advertisement of featured ads</h4>
                              <p>Visit the tasks section and choose the products of your choice to advertise. You will be paid for every click you get from your social media visitors.</p>
                              <p>Simply you copy the ad link and share via your social medias, whatsapp and other platforms. Then you get paid some amount on the every clicks you get. More clicks more money.</p>
                              <p><button onClick={() => navigate("/agent/tasks")}>View Tasks</button></p>
                         </div>
                         {/* <div className="agent-content-card">
                              <h4>3. Help people open shops on ClickRwanda</h4>
                              <p>Click Rwanda pays Rwf 20 to verified agents who help people to successfully open shops on the platform.</p>
                              <p>It is very simple. Simply copy the <b>Agent Open shop Link</b> in the tasks Section. Share it to many people and guide them well on the journey to open their own shops on Click Rwanda.</p>
                              <p>Click the copy the link. <br /> <b id="agent-open-shop-link">{`https://clickrwanda.com/forms/signup?=${agentInfo?.agent_id}`}</b> <button onClick={() => copyToClipboard(`https://clickrwanda.com/forms/signup?=${agentInfo?.agent_id}`)}>Copy Link</button></p>
                         </div>
                         <div className="agent-content-card">
                              <h4>4. Earn Commission on products.</h4>
                              <p>Click Rwanda pays 70% of the commission earned upon successful transaction of the producsts brought by the agents.</p>
                              <p>To get started, deal with a shop or seller. Create for them a shop on click Rwanda using your agent-shop sign link, click to copy the link <button onClick={() => copyToClipboard(`https://clickrwanda.com/forms/signup?=${agentInfo?.agent_id}`)}>Copy Link</button></p>
                              <p>Subscribe to the Commision package for sellers. Once Approved, start uploading the seller&apos;s products by clicking the button below.</p>
                              <p><button onClick={showAddAdForm}>Post Commission Deals</button></p>
                         </div> */}
                    </>
               }
               
               
          </MainRow>
     </>
     )
}

export default Home