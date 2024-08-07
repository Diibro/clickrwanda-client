
import PropTypes from 'prop-types';
import { useContext, useEffect} from "react";
import AppData from "../Contexts/AppContext";

export const AlertView = () => {
     const [data, setData] = useContext(AppData);
     const {alertView} = data;
     const content = alertView?.content;
     const {type} = content;
     useEffect(()=> {
          const timeoutId = setTimeout(() => {
               setData((prev) => ({
                    ...prev,
                    alertView: {
                         on:false,
                         content: {}
                    }
               }));
          }, 5000);
          return () => clearTimeout(timeoutId);
     }, [alertView]);
     return(
          <>
               {alertView.on ?
               <div className={`alert-view ${type}`}>
                    <i>{content?.icon}</i>
                    <p>{content?.message}</p>
               </div>
               : <></>}
          </>
          
     )
}

export const AlertViewV1 = ({content}) => {
     return (
          <div className={`alert-view-v1 ${content.type}`}>{content.message}</div>
     )
}

AlertView.propTypes = {
     content: PropTypes.object
}

AlertViewV1.propTypes = { 
     content: PropTypes.any
}