import { useContext } from 'react';
import { AdminContext } from '../AdminLayout'

const Notification = () => {
     const [adminData] = useContext(AdminContext)
     const {notification} = adminData;
     

     return (
     <div id='admin-notification' className={`admin-notification ${notification.type}-admin-notification`}>{notification.message}</div>
     )
}

export default Notification