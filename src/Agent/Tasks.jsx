import { useContext } from "react";
import MainRow from "./components/MainRow"
import TaskContainer from "./components/TaskContainer"
import Title from "./components/Title"
import { AgentContext } from "./AgentLayout";

const Tasks = () => {
     const [agentData] = useContext(AgentContext);
     const {tasks,agentInfo} = agentData;
     return (
     <>
          <MainRow>
               <Title>
                    <h2>Today Tasks:</h2>
               </Title>
               {
                    tasks && tasks.length ? 
                         tasks.map((task, index) => <TaskContainer key={`agent-task-cont-${index}` } task={task} agent={agentInfo} />)
                    :<p className="agent-not-found-paragraphs">No tasks available today.</p>
               }
          </MainRow>
     </>
     )
}

export default Tasks