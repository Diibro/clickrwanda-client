import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../AdminLayout";
import DashTitle from "../DashTitle";
import { PlansAllowedFields } from "../../../config/payPlans";
import { EditButton } from "../buttons/ActionButtons";
import { SubmitButton } from "../../../components/dynamic/Buttons";
import { showMainNotification, toggleForms } from "../../../utils/AdminFunctions";
import uploadFile from "../../../utils/aws-upload-functions";
import { s3Folders } from "../../../config/s3Config";
import PayPlanService from "../../../services/PaymentPlan"; 

const PlansForms = () => {
     const [adminData] = useContext(AdminContext);
     const {activeForm} = adminData;

     return (
          <>
               {
                    activeForm.type === "plans" ? 
                         <div className="admin-plan-forms-container">
                              {
                                   activeForm.formName === "Add Plan"? <AddPlanForm /> : activeForm.formName === "Update Plan" ? <UpdatePlanForm /> : null
                              }
                         </div>
                    : null
               }
          </>
     )
}

const AddPlanForm = () => {
     const [adminData, setAdminData ] = useContext(AdminContext);
     const {activeForm, paymentPlans} = adminData;
     const [plan,setPlan] = useState(null);
     const [planDesc, setPlanDesc] = useState(null);
     const [icon, setIcon] = useState(null);
     const [planLocation, setPlanLocation] = useState(null);

     const updatePlanDescription = () => {
          const allowedBenefits = document.querySelectorAll('.plan-input-allowed-benefits');
          const planDescription = {adsAllowed: planDesc.adsAllowed, adsPromoted: planDesc.adsPromoted, promotionPower: planDesc.promotionPower,allowed: [], unAllowed: []};
          if(planDesc.adsAllowed > 0) planDescription.allowed.push(`Ads Allowed: ${planDesc.adsAllowed}`);
          if(planDesc.adsPromoted > 0) planDescription.allowed.push(`Ads Promoted: ${planDesc.adsPromoted}`);
          if(planDesc.promotionPower && planDesc.promotionPower != '') planDescription.allowed.push(`Promotion Power: ${planDesc.promotionPower}`);
          if(allowedBenefits) {
               allowedBenefits.forEach(benefit => {
                    if(benefit.checked){
                         planDescription.allowed.push(benefit.value);
                    }else{
                         planDescription.unAllowed.push(benefit.value);
                    }
               })
          }
          return planDescription;
     }

     const closeFormsContainer = () => {
          toggleForms(false);
          setAdminData((prev) => ({
               ...prev,
               activeForm: "Admin Form",
          }))
     }

     const submitForm = async (e) => {
          e.preventDefault();
          try {
               // const iconUrl = await uploadFile(icon, s3Folders.payPlans);
               const iconUrl = "";
               const locationUrl = await uploadFile(planLocation, s3Folders.payPlans);
               const desc = updatePlanDescription();
               const newPlan  = {
                    plan_id: `plan_${paymentPlans.length + 2}`,
                    plan_name: plan.plan_name,
                    plan_amount: plan.plan_amount,
                    plan_icon: iconUrl,
                    location: locationUrl,
                    description: desc,
                    type: activeForm.planType,
                    active: 1
               }
               const res = await PayPlanService.save(newPlan);
               if(res){
                    if(res.status === "success"){
                         setAdminData(prev => ({
                              ...prev,
                              paymentPlans: [...paymentPlans, newPlan]
                         }));
                         showMainNotification("pass", res.message, closeFormsContainer());
                    }else{
                         showMainNotification("fail", res.message, () => {});
                    }
               }else{
                    showMainNotification("fail", "Applicatino error", () => {});
               }
              

          } catch (error) {
               console.log(error);
               showMainNotification("fail", "error adding the plan", () => {});
          }
     }
     return(
          <>
               <DashTitle>
                    <h4>Add {activeForm.planType} plan</h4>
               </DashTitle>
               <form className="admin-advert-update-form" onSubmit={async(e) => await submitForm(e)}>
                    <div className="group">
                         <label htmlFor="plan-input-name">Plan Name:</label>
                         <input type="text" name="plan-input-name" id="plan-input-name" onChange={(e) => setPlan(prev => ({...prev, plan_name: e.target.value}))} required/>
                    </div>
                    <div className="group">
                         <label htmlFor="plan-input-amount">Amount per month: </label>
                         <input type="number" name="plan-input-amount" id="plan-input-amount" onChange={(e) => setPlan(prev => ({...prev, plan_amount: e.target.value}))} required/>
                    </div>
                    <div className="group">
                         <label htmlFor="plan-input-location">Location on Website:</label>
                         <input type="file" name="plan-input-location" id="plan-input-location" onChange={e => setPlanLocation(e.target.files[0])} required/>
                         {planLocation ? <img src={URL.createObjectURL(planLocation)} alt="plan location" width={100} />: null}
                    </div>
                    <div className="group">
                         <label htmlFor="plan-input-icon">Plan Icon:</label>
                         <input type="file" name="plan-input-icon" id="plan-input-icon" onChange={(e) => setIcon(e.target.files[0])}/>
                         {icon ? <img src={URL.createObjectURL(icon)} alt="plan icon" width={100} />:null}
                    </div>
                    <div className="group">
                         <label htmlFor="plan-input-ads">Ads Allowed:</label>
                         <input type="number" name="plan-input-ads" id="plan-input-ads" onChange={(e) =>  setPlanDesc((prev) => ({...prev,adsAllowed: e.target.value}) )} required/>
                    </div>
                    <div className="group">
                         <label htmlFor="plan-input-promo-ads">Ads promoted</label>
                         <input type="number" name="plan-input-promo-ads" id="plan-input-promo-ads" onChange={(e) =>  setPlanDesc((prev) => ({...prev,adsPromoted: e.target.value}) )} required/>
                    </div>
                    <div className="group">
                         <label htmlFor="plan-input-promotion-power">Promotion Power: </label>
                         <input type="text" name="plan-input-promotion-power" id="plan-input-promotion-power" onChange={(e) =>  setPlanDesc((prev) => ({...prev, promotionPower: e.target.value}) )} />
                    </div>
                    <div className="group">
                         <label htmlFor="plan-input-allowed-field">Select plan benefits: </label>
                         {
                              PlansAllowedFields.map((item, index) => 
                              <div key={`plan-input-allowed-field-${index}`} type="checkbox" name="plan-input-allowed-field" id="plan-input-allowed-field" value={item} className="check-box-input-row" >
                                   <input type="checkbox" value={item} name={`plan-input-allowed-field-${index}`} id={`plan-input-allowed-field-${index}`} className="plan-input-allowed-benefits" />
                                   <label htmlFor={"plan-allowed-field-check-box"}>{item}</label>
                              </div>
                              )
                         }
                    </div>
                    <div className="group">
                         <input type="submit" value="Save Plan" />
                    </div>
               </form>
          </>
     )
}

const UpdatePlanForm = () => {
     const [adminData, setAdminData] = useContext(AdminContext);
     const {activeForm} = adminData;
     const [plan,setPlan] = useState(null);
     const [planDesc, setPlanDesc] = useState(null);
     const [planDescription, setPlanDescription] = useState({allowed: [], unAllowed: []})
     const [icon, setIcon] = useState(null);
     const [planLocation, setPlanLocation] = useState(null);

     const closeFormsContainer = () => {
          toggleForms(false);
          setAdminData((prev) => ({
               ...prev,
               activeForm: "Admin Form",
               objFocus:null
          }))
     }

     const updatePlanDescription = () => {
          const allowedBenefits = document.querySelectorAll('.plan-input-allowed-benefits');
          const planDescription = {adsAllowed: planDesc.adsAllowed, adsPromoted: planDesc.adsPromoted, promotionPower: planDesc.promotionPower,allowed: [], unAllowed: []};
          if(planDesc.adsAllowed > 0) planDescription.allowed.push(`Ads Allowed: ${planDesc.adsAllowed}`);
          if(planDesc.adsPromoted > 0) planDescription.allowed.push(`Ads Promoted: ${planDesc.adsPromoted}`);
          if(planDesc.promotionPower && planDesc.promotionPower != '') planDescription.allowed.push(`Promotion Power: ${planDesc.promotionPower}`);
          if(allowedBenefits) {
               allowedBenefits.forEach(benefit => {
                    if(benefit.checked){
                         planDescription.allowed.push(benefit.value);
                    }else{
                         planDescription.unAllowed.push(benefit.value);
                    }
               })
          }
          return planDescription;
     }

     const submitForm = (e) => {
          e.preventDefault();
     }

     useEffect(()=> {
          if(activeForm.objFocus){
               setPlan(activeForm.objFocus);
          }
     },[activeForm])
     useEffect(() => {
          if(plan){
               const tempDesc = plan.description
               if(tempDesc?.allowed){
                    setPlanDescription(prev => ({
                         ...prev,
                         allowed: tempDesc.allowed ? tempDesc.allowed : [],
                    }))
               }

               if(tempDesc?.allowed){
                    setPlanDescription(prev => ({
                         ...prev,
                         unAllowed: tempDesc.unAllowed ? tempDesc.unAllowed : []
                    }))
               }
               
          }
     },[plan]);
     return (
          <>
               {
                    plan ? 
                         <>
                              <DashTitle>
                                   <h4>Updating {plan.plan_type || activeForm.planType} plan : {plan.plan_name}</h4>
                              </DashTitle>
                              <form className="admin-advert-update-form" onSubmit={(e) => submitForm(e)}>
                                   <div className="group">
                                        <label htmlFor="plan-type">Plan Type:</label>
                                        <select name="plan-type" id="plan-type" onChange={(e) => setPlan(prev => ({...prev, plan_type: e.target.value}))}>
                                             <option value="" disabled selected>Change Plan type...</option>
                                             <option value="Individual">Individual Plan</option>
                                             <option value="Small Business">Small Business plan</option>
                                             <option value="Large Business">Large Business Plan</option>
                                             <option value="Extra Boost Plan">Extra Boost Plan</option>
                                        </select>
                                   </div>
                                   <div className="group">
                                        <label htmlFor="plan-input-name">Plan Name: <b>{plan.plan_name}</b></label>
                                        <input type="text" name="plan-input-name" id="plan-input-name" onChange={(e) => setPlan(prev => ({...prev, plan_name: e.target.value}))}/>
                                   </div>
                                   <div className="group">
                                        <label htmlFor="plan-input-amount">Amount per month: <b>{plan.plan_amount}</b></label>
                                        <input type="number" name="plan-input-amount" id="plan-input-amount" onChange={(e) => setPlan(prev => ({...prev, plan_amount: e.target.value}))} />
                                   </div>
                                   <div className="group">
                                        <label htmlFor="plan-input-ads">Ads Allowed: <b>{plan.description?.adsAllowed || null}</b></label>
                                        <input type="number" name="plan-input-ads" id="plan-input-ads" defaultValue={plan.description?.adsAllowed || 0} onChange={(e) =>  setPlanDesc((prev) => ({...prev,adsAllowed: e.target.value}) )} />
                                   </div>
                                   <div className="group">
                                        <label htmlFor="plan-input-promo-ads">Ads promoted: <b>{plan.description?.adsPromoted || null}</b></label>
                                        <input type="number" name="plan-input-promo-ads" id="plan-input-promo-ads" defaultValue={plan.description?.adsPromoted || 0} onChange={(e) =>  setPlanDesc((prev) => ({...prev,adsPromoted: e.target.value}) )} />
                                   </div>
                                   <div className="group">
                                        <label htmlFor="plan-input-promotion-power">Promotion Power: <b>{plan.description?.promotionPower || null}</b></label>
                                        <input type="text" name="plan-input-promotion-power" id="plan-input-promotion-power" defaultValue={plan.description?.promotionPower || ''} onChange={(e) =>  setPlanDesc((prev) => ({...prev, promotionPower: e.target.value}) )}/>
                                   </div>
                                   <div className="group">
                                        <label htmlFor="plan-input-location">Location on Website:</label>
                                        {<img src={plan.location} alt="plan location" width={100} /> }
                                        <input type="file" name="plan-input-location" id="plan-input-location" onChange={e => setPlanLocation(e.target.files[0])} />
                                        {planLocation && planLocation instanceof File ? <img src={URL.createObjectURL(planLocation)} alt="" width={70} /> : null}
                                   </div>
                                   <div className="group">
                                        <label htmlFor="plan-input-icon">Plan Icon:</label>
                                        {<img src={plan.plan_icon} alt="plan icon" width={100} />}
                                        <input type="file" name="plan-input-icon" id="plan-input-icon" onChange={(e) => setIcon(e.target.files[0])}/>
                                        {icon && icon instanceof File ? <img src={URL.createObjectURL(icon)} alt="new plan location" width={70}/> :null}
                                   </div>
                                   <div className="group">
                                        <label htmlFor="plan-input-allowed-field">Select plan benefits: </label>
                                        {
                                             planDescription.allowed.length ? planDescription.allowed.map((item, index) => 
                                             <div key={`plan-input-allowed-field-${index}`} type="checkbox" name="plan-input-allowed-field" id="plan-input-allowed-field" value={item} className="check-box-input-row" >
                                                  <input checked type="checkbox" value={item} name={`plan-input-allowed-field-${index}`} id={`plan-input-allowed-field-${index}`} className="plan-input-allowed-benefits" />
                                                  <label htmlFor={"plan-allowed-field-check-box"}>{item}</label>
                                             </div>
                                             ) : null
                                        }
                                        {
                                             planDescription.unAllowed.length ? planDescription.unAllowed.map((item, index) => 
                                             <div key={`plan-input-allowed-field-${index}`} type="checkbox" name="plan-input-allowed-field" id="plan-input-allowed-field" value={item} className="check-box-input-row" >
                                                  <input type="checkbox" value={item} name={`plan-input-allowed-field-${index}`} id={`plan-input-allowed-field-${index}`} className="plan-input-allowed-benefits" />
                                                  <label htmlFor={"plan-allowed-field-check-box"}>{item}</label>
                                             </div>
                                             ) : null
                                        }
                                        {
                                             !planDescription.allowed.length ? 
                                                  PlansAllowedFields.map((item, index) => 
                                                       <div key={`plan-input-allowed-field-${index}`} type="checkbox" name="plan-input-allowed-field" id="plan-input-allowed-field" value={item} className="check-box-input-row" >
                                                            <input type="checkbox" value={item} name={`plan-input-allowed-field-${index}`} id={`plan-input-allowed-field-${index}`} className="plan-input-allowed-benefits" />
                                                            <label htmlFor={"plan-allowed-field-check-box"}>{item}</label>
                                                       </div>
                                                  )
                                             :null
                                        }
                                   </div>
                                   <div className="group">
                                        <input type="submit" value="Save Changes" />
                                   </div>
                              </form>
                         </>
                    :null
               }
          </>
     )
}
export default PlansForms