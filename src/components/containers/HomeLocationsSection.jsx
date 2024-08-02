import { useEffect, useState } from "react"
import { getLocations } from "../../utils/locations";
import { useNavigate } from "react-router-dom";
import advertService from "../../services/Advert";

const HomeLocationsSection = () => {
     const [locations, setLocations] = useState(null);
     const [newLocations,setNewLocations] = useState(null);
     const navigate = useNavigate();
     const fetchLocationCounts = async(locations) => {
          const res = await advertService.getCountsByLocation(locations);
          if(res){
               const data = res.data;
               if(data && data.length){
                    setNewLocations(data);
               }
          }
     }
     useEffect(() => {
          (async() => {
               const {districts} = getLocations();
               // const {data} = districts;
               // setLocations(data);
               setLocations(districts);
               await fetchLocationCounts(districts);
          })();
     },[])
     return (
          <>
               {
                    locations && locations.length ?
                         <div className="home-locations-section">
                              <div className="locations-title">
                                   <h3>Ads per Area</h3>
                                   <p>Discover products, services, best shops, and promotions in your locality!</p>
                              </div>
                              <div className="locations-content">
                                   {
                                        newLocations ? 
                                        newLocations.map((location, index) => <span key={`home-section-location-${index}`} onClick={() => navigate(`/location?=${location?.name}`)}>{location.name} <b>({location.count} ads)</b></span>)
                                        :locations.map((location, index) => <span key={`home-section-location-${index}`} onClick={() => navigate(`/location?=${location}`)}>{location}</span>)
                                   }
                              </div>
                         </div>
                    : null
               }
          </>
     )
}

export default HomeLocationsSection