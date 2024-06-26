import PropTypes from "prop-types"

const DashCard = () => {
     return (
          <div className="dashcard"></div>
     )
}

export const DashHomeCard = ({content}) => {
     return (
          <div onClick={content?.action} className={`home-dash-card home-dash-card-${content.classname}`}>
               <h2>{content?.count}</h2>
               <b>{content?.name}</b>
          </div>
     )
}

DashHomeCard.propTypes = {
     content: PropTypes.object
}


export default DashCard;