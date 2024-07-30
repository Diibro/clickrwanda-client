import { useEffect, useState } from "react"
import { getLocations } from "../../utils/locations";
import { useNavigate } from "react-router-dom";

const HomeLocationsSection = () => {
     const [locations, setLocations] = useState(null);
     const navigate = useNavigate();
     useEffect(() => {
          (async() => {
               const {districts} = getLocations();
               // const {data} = districts;
               // setLocations(data);
               setLocations(districts);
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
                                        locations.map((location, index) => <span key={`home-section-location-${index}`} onClick={() => navigate(`/location?=${location}`)}>{location}</span>)
                                   }
                              </div>
                         </div>
                    : null
               }
          </>
     )
}

export default HomeLocationsSection