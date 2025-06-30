
import PropTypes from "prop-types";
import PlanCard from "./PlanCard"; // adjust path as needed

const PlansContainer = ({ planGroup }) => {
     return (
          <section className="w-full px-4 py-8 bg-gray-100">
               <div className="max-w-6xl mx-auto">
               <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
                    {planGroup.name}
               </h2>

               <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {planGroup.plans.map((plan, index) => (
                    <PlanCard
                         key={index}
                         name={plan.name}
                         price={plan.price}
                         benefits={plan.benefits}
                    />
                    ))}
               </div>
               </div>
          </section>
     );
};

PlansContainer.propTypes = {
     planGroup: PropTypes.shape({
     name: PropTypes.string.isRequired,
     plans: PropTypes.arrayOf(
          PropTypes.shape({
               name: PropTypes.string.isRequired,
               price: PropTypes.string.isRequired,
               benefits: PropTypes.arrayOf(PropTypes.string).isRequired,
          })
     ).isRequired,
     }).isRequired,
};

export default PlansContainer;
