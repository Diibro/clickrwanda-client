import PropTypes from "prop-types";

const Title = ({content}) => {
     var styles = `title ${content.color || ''} ${content.size || ''}`;
     if(content.type === "small"){
          return(
               <h4 className={styles}>{content.name}</h4>
          )
     }else if(content.type === "medium"){
          return(
               <h3 className={styles}>{content.name}</h3>
          )
     }
     else if(content.type === "large"){
          return(
               <h2 className={styles}>{content.name}</h2>
          )
     }
     else{
          return(
               <h1 className={styles}>{content.name}</h1>
          )
     }
}

Title.propTypes = {
     content: PropTypes.object
}

export default Title;