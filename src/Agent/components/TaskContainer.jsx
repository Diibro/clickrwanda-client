import { ActionBtn } from "../../components/dynamic/Buttons";
import { getDateToday, isLaterThan } from "../../utils/dateFunctions"
import PropTypes from 'prop-types';
import { copyToClipboard } from "../../utils/otherFunctions";

const TaskContainer = ({agent,task}) => {
     return (
          <>
          {
               isLaterThan(getDateToday(), task.exp_date) ?  <div className="agent-task-container">
                    {task.v_ids ? 
                         task.v_ids.map((id, index) => <div className="row" key={`task_id-${id}-${index}`}>
                              <p>Share this link on your social medias.</p>
                              <b>{`https://share.clickrwanda.com/advert/${id}?ref=${agent.agent_id}`}</b>
                              <ActionBtn title="Copy Link" action={() => copyToClipboard(`https://share.clickrwanda.com/advert/${id}?ref=${agent.agent_id}`)} />
                         </div>)
                    : null}
               </div> : null
          }
          </>
     )
}

TaskContainer.propTypes = {
     agent: PropTypes.object,
     task: PropTypes.object,
}

export default TaskContainer