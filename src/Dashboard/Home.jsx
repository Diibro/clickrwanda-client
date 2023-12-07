import { useContext } from "react"
import UserContext from "../Contexts/UserContext"
const Home = () => {
  const [user] = useContext(UserContext);
  const {userInfo} = user;

  return (
    <>
      <div>
        welcome back of beloved user {userInfo.name}
      </div>
    </>
  )
}

export default Home