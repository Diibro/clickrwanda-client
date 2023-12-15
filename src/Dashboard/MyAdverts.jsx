import { useContext, useEffect, useState } from "react";
import { Loadingv2 } from "../components/static/Loading";
import { DashboardContainer, DashboardRow } from "../components/dynamic/DashboardComponents";
import server from "../config/Server";
import UserContext from "../Contexts/UserContext";
import PropTypes from 'prop-types'

const MyAdverts = () => {
  const [loading, setLoading] = useState(false);
  const [adverts, setAdverts] = useState([]);
  const [,setUser] = useContext(UserContext)

  const fetchAdverts = async() => {
    try {
      setLoading(true);
      const res = await server.getUserAdverts();
      if(res.status === "pass") {
        localStorage.setItem('userAds', JSON.stringify(res.data));
      }else{
        if(res.message === "No Authentication Token" || res.message === 'Authentication Error') setUser((prev) => ({...prev, activeForm:'login'}));
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }
  useEffect(() =>{
    fetchAdverts();
    if(localStorage.getItem('userAds')){
      setAdverts(JSON.parse("Adverts Available"));
    }else{
      console.log("fetching")
    }
  }, [])
  return (
    <>
      <DashboardContainer>
        <DashboardRow>
          <h2>My Adverts</h2>
        </DashboardRow>
        <DashboardRow>
          {adverts != "no data found" ? <AllAdverts content={adverts} />  :"No adverts found"}
        </DashboardRow>
      </DashboardContainer>
      {loading ? <Loadingv2 /> : null}
    </>
  )
}

const AllAdverts = ({content}) => {
  return(
    <>
      {JSON.stringify(content)}
    </>
  )
}

export default MyAdverts;

AllAdverts.propTypes = {
  content: PropTypes.any
}