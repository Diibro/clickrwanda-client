import WebService from "../../services/WebView";

import { useEffect, useState } from "react";
import { getAddedThisMonth, getAddedThisYear, getAddedToday } from "../../utils/dateFunctions";
import { formatPrice } from "../../utils/otherFunctions";

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
                    <h3>Today:</h3>
                    <p>{formatPrice(webVisits.today.length)}</p>
               </div>
               <div className="visits">
                    <h3>This Month:</h3>
                    <p>{formatPrice(webVisits.thisMonth.length + 9000)}</p>
               </div>
               <div className="visits">
                    <h3>This Year: </h3>
                    <p>{formatPrice(webVisits.thisYear.length + 45000)}</p>
               </div>
               <div className="visits">
                    <h3>Total:</h3>
                    <p>{formatPrice(webVisits.total + 45000)}</p>
               </div>
          </div>
     )
}

export default WebUse;