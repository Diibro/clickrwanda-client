import PropTypes from "prop-types";

const DashPlanCard = ({plan}) => {
     return (
          <>
               {
                    plan ? 
                    
                    <div className="admin-dash-plan-card">
                         <h2>{plan.plan_id}</h2>
                    </div>
                    :null
               }
          </>
          
     )
}

DashPlanCard.propTypes = {
     plan: PropTypes.object
}
export default DashPlanCard