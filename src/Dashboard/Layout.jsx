
import {Routes, Route} from "react-router-dom";
import Home from "./Home";

const AdminLayout = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />}/>
    </Routes>
  )
}

export default AdminLayout