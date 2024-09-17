
import { useNavigate } from "react-router-dom"
import { showMainNotification } from "../utils/AdminFunctions";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    showMainNotification('fail', 'The page requested does not exist.', () => navigate('/'));
  }, [] );
  return (
    <div>Page not found</div>
  )
}

export default NotFound