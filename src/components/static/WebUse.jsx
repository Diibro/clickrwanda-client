import WebService from "../../services/WebView";

import { useEffect, useState } from "react";
import { getAddedThisMonth, getAddedThisYear, getAddedToday } from "../../utils/dateFunctions";

const WebUse = () => {
     const [webVisits,setWebVisits] = useState({
          today: [],
          thisMonth: [],
          thisYear: [],
          total: 0
     });

     const updateWebVisits = async () => {
          const res = await WebService.getAllVisits();
          if(res) {
               const {status, data} = res;
               if(status === 'pass' && data){
                    setWebVisits((prev) => ({
                         ...prev,
                         today: getAddedToday(data, "v_date"),
                         thisMonth: getAddedThisMonth(data, "v_date"),
                         thisYear: getAddedThisYear(data, "v_date"),
                         total: data.length
                    }))
               }
          }
     }
     useEffect(() => {
          (async ()=> await updateWebVisits())();
     }, []);
     return (
          <div className="web-usage-container">
               <h2>Our Visitors</h2>
               <div className="visits">
                    <h3>Per Day:</h3>
                    <p>{webVisits.today.length}</p>
               </div>
               <div className="visits">
                    <h3>Per Month:</h3>
                    <p>{webVisits.thisMonth.length}</p>
               </div>
               <div className="visits">
                    <h3>Per Year: </h3>
                    <p>{webVisits.thisYear.length}</p>
               </div>
               <div className="visits">
                    <h3>Total:</h3>
                    <p>{webVisits.total}</p>
               </div>
          </div>
     )
}

export default WebUse;