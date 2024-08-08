import PropTypes from "prop-types";

const AgentContentCard = ({content}) => {
     return (
     <div className="agent-home-content-card" onClick={() => content.clickAction()}>
          <b>{content.count}</b>
          <p>{content.title}</p>
     </div>
     )
}

AgentContentCard.propTypes = {
     content: PropTypes.object
}
export default AgentContentCard