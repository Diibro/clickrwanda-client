
import PropTypes from "prop-types";

const PlanCard = ({ name, price, benefits }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-xl transition-all duration-300 flex flex-col">
      <h3 className="text-xl font-semibold text-main-blue-600 mb-2">{name}</h3>
      <p className="text-lg font-bold text-gray-900 mb-4">{price}</p>

      <ul className="flex-1 mb-6 space-y-2">
        {benefits.map((benefit, index) => (
          <li
            key={index}
            className="text-sm text-gray-700 flex items-start gap-2"
          >
            <span className="text-green-500 mt-1">✓</span> {benefit}
          </li>
        ))}
      </ul>

      <button className="mt-auto bg-main-gold-600 hover:bg-main-gold-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300">
        Choose {name}
      </button>
    </div>
  );
};

PlanCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  benefits: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PlanCard;
