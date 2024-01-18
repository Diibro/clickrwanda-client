import PropTypes from 'prop-types';
import { CategoryContainerSquare } from './Containers';
import { Link } from 'react-router-dom';


const InnerSectionContainer = ({content, type}) => {
  return(
       <div className={
          type === "category" ? "inner-container categories-container" 
          : type === "products" ? "inner-container products-container" 
          : type === "more" ? "inner-container view-more-container" 
          : "inner-container" }>
            {Array.isArray(content.data) && type === 'category' && content.limit != 0 ? content.data.map(
                 (item, index) => index < content.limit ? <CategoryContainerSquare 
                      key={item.category_id} 
                      image={item.category_icon}
                      title={item.category_name}
                      ads_no={232212}/> : null
            ) : Array.isArray(content.data) && type === 'category' && content.limit === 0   ? content.data.map(
                 (item) => <CategoryContainerSquare 
                      key={item.category_id} 
                      image={item.category_icon}
                      title={item.category_name}
                      ads_no={232212}
                      />
            )
            : type === "products" ? <>Profducts</> 
            : type === "more" ? <Link to={content.dest || '/'}>{content.message} {content.icon ? <i>{<content.icon />}</i> : <></>} </Link> 
            : type === "title"? <h3 className='section-title'>{content.title}</h3> :<></>
            }
       </div>
  )
}

export const InnerSection = ({children, type, eleId}) => {
     if(type === "more"){
          return(
               <div className='inner-container view-more-container'>
                    <b>{children}</b>
               </div>
          );
     }else if(type === "title"){
          return(
               <div className='inner-container no-margin'><h3 className='section-title'>{children}</h3> </div>
               // <div className='inner-container no-margin'>{children}</div>
          )
     }else if(type === "pagination"){
          return(
               <div className='inner-container pagination-container'>{children}</div>
          )
     }else if(type === 'full-width'){
          return(
               <div className='inner-container full-width'>{children}</div>     
          );
     }

     return(
               <div id={eleId} className='inner-container'>{children}</div>     
          );
}

InnerSection.propTypes = {
     children: PropTypes.any,
     type: PropTypes.string,
     eleId: PropTypes.any,
     link: PropTypes.any
}

InnerSectionContainer.propTypes = {
  content: PropTypes.any,
  type: PropTypes.any,
}

export default InnerSectionContainer;