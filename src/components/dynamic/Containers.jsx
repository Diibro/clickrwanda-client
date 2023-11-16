import PropTypes from 'prop-types';

export const SectionContainer = ({content, title, sectionType}) => {
     return(
          <div className={sectionType === 'header' ? "section-container" : "section-container"}>
               {title === "header" ? <></> : <h2>{title}</h2>}
               <InnerSectionContainer content={content} />
          </div>
     )
}

SectionContainer.propTypes = {
     content: PropTypes.any,
     title: PropTypes.string,
     sectionType: PropTypes.any
}

export const InnerSectionContainer = ({content}) => {
     return(
          <div className={"inner-container" }>
               {content}
          </div>
     )
}

InnerSectionContainer.propTypes = {
     content: PropTypes.any
}

const MainComponent = () => {
     return(
          <div></div>
     )
}

export const CategoryContainerSquare = ({image, title, ads_no }) => {
     return (
          <div className="category-square">
               <img src={image} alt={title} />
               <h3>{title}</h3>
               <p className='small-paragraph'>{ads_no}</p>
          </div>
     )
}

CategoryContainerSquare.propTypes = {
     image: PropTypes.string,
     title: PropTypes.string,
     ads_no: PropTypes.number

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

CategoryContainerRow.propTypes = { 
     title: PropTypes.string,
     subCategories: PropTypes.array
}

export default MainComponent;