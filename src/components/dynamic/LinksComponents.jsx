import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export const  MoreLink = ({ content}) => {
     return(
          <Link to={content.dest || '/'}>{content.message} {content.icon ? <i><content.icon /></i> : null}</Link>
     )
};

MoreLink.propTypes = {
     content: PropTypes.object
}
