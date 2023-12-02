import PropTypes from 'prop-types';
import InnerSectionContainer from './InnerSectionContainer';
import { useNavigate } from 'react-router-dom';

export const SectionContainer = ({content, title, sectionType}) => {
     return(
          <div className={sectionType === 'header' ? "section-container" : "section-container"}>
               {title === "header" ? <></> : <h2>{title}</h2>}
               <InnerSectionContainer content={content} />
          </div>
     )
}


const MainComponent = () => {
     return(
          <div></div>
     )
}

export const CategoryContainerSquare = ({image, title, ads_no, view }) => {
     const navigate = useNavigate();
     return (
          <div className="category-square" onClick={() => navigate(view)}>
               <img src={image} alt={title} />
               <h3>{title}</h3>
               <p className='small-paragraph'>{ads_no}</p>
          </div>
     )
}



export const CategoryContainerRow = ({title, subCategories}) =>{
     return(
          <div className="category-row">
               <h3>{title}</h3>
               <div className="row">
                    {subCategories}
               </div>
          </div>
     )
}

SectionContainer.propTypes = {
     content: PropTypes.any,
     title: PropTypes.string,
     sectionType: PropTypes.any
}

CategoryContainerSquare.propTypes = {
     image: PropTypes.string,
     title: PropTypes.string,
     ads_no: PropTypes.any,
     view: PropTypes.any
}


CategoryContainerRow.propTypes = { 
     title: PropTypes.string,
     subCategories: PropTypes.array
}



export default MainComponent;