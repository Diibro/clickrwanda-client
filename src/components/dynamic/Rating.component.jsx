import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import PropTypes from 'prop-types';

const UserRating = ({ rating }) => {
     const roundedRating = Math.round(rating / 20); 

     const renderStars = (filledStars, halfStroke) => {
          const stars = [];

          for (let i = 0; i < filledStars; i++) {
               stars.push(<i key={i}><FaStar /></i>);
          }

          if (halfStroke) {
               stars.push(<i key="half"><FaStarHalfAlt /></i>);
          }

          const remainingStars = 5 - (filledStars + (halfStroke ? 1 : 0));

          for (let i = 0; i < remainingStars; i++) {
               stars.push(<i key={`empty-${i}`}><FaRegStar /></i>);
          }

          return stars;
     };

     return (
          <div className="rating">
               {renderStars(roundedRating, rating % 20 !== 0)}
          </div>
     );
};

UserRating.propTypes = {
     rating: PropTypes.number,
};

export default UserRating;
