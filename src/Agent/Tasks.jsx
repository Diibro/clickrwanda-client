import MainRow from "./components/MainRow"
import Title from "./components/Title"

const Tasks = () => {
     return (
     <>
          <MainRow>
               <Title>
                    <h2>Today Tasks:</h2>
               </Title>
               <p className="agent-not-found-paragraphs">No tasks available today.</p>
          </MainRow>
     </>
     )
}

export default Tasks