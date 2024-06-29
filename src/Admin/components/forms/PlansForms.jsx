import { useContext, useState } from "react";
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
                                   activeForm.formName === "Add Plan"? <AddPlanForm /> : activeForm.formName === "Update Pla" ? <UpdatePlanForm /> : null
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
          
          return {};
     }

     const closeFormsContainer = () => {
          toggleForms(false);
          setAdminData((prev) => ({
               ...prev,
               activeForm: "Admin Form"

          }))
     }

     const submitForm = async (e) => {
          e.preventDefault();
          try {
               const iconUrl = await uploadFile(icon, s3Folders.payPlans);
               const locationUrl = await uploadFile(planLocation, s3Folders.payPlans);
               const desc = updatePlanDescription();

               setPlan((prev) => ({
                    ...prev,
                    plan_id: `plan_${paymentPlans.length + 1}`,
                    plan_icon: iconUrl,
                    location: locationUrl,
                    description: desc,
                    type: activeForm.planType,
                    active: 1
               }));

               const res = await PayPlanService.save(plan);
               if(res.status === "success"){
                    setAdminData(prev => ({
                         ...prev,
                         paymentPlans: [...paymentPlans, plan]
                    }));
                    showMainNotification("pass", res.message, closeFormsContainer());
               }else{
                    showMainNotification("fail", res.message, () => {});
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
                         <input type="file" name="plan-input-icon" id="plan-input-icon" onChange={(e) => setIcon(e.target.files[0])} required/>
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
                         <input type="text" name="plan-input-promotion-power" id="plan-input-promotion-power" onChange={(e) =>  setPlanDesc((prev) => ({...prev, promotionPower: e.target.value}) )} required />
                    </div>
                    <div className="group">
                         <label htmlFor="plan-input-allowed-field">Select plan benefits: </label>
                         {
                              PlansAllowedFields.map((item, index) => 
                              <div key={`plan-input-allowed-field-${index}`} type="checkbox" name="plan-input-allowed-field" id="plan-input-allowed-field" value={item} className="check-box-input-row" >
                                   <input type="checkbox" name={`plan-input-allowed-field-${index}`} id={`plan-input-allowed-field-${index}`} />
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
     return (
          <>
               <h2>Update plan</h2>
          </>
     )
}
export default PlansForms