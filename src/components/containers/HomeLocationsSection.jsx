import { useEffect, useState } from "react"
import { getLocations } from "../../utils/locations";
import { useNavigate } from "react-router-dom";
import advertService from "../../services/Advert";
import { FaLocationCrosshairs } from "react-icons/fa6";

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
                         <div className="w-full flex flex-col  bg-main-blue-700 rounded-[10px] p-[20px]  gap-[20px] ">
                              <div className="w-full flex flex-col gap-[5px]">
                                   <h3 className="text-[1.4rem] font-extrabold text-gray-50 ">Ads per Area</h3>
                                   <p className="text-[0.8rem] text-gray-200   ">Discover products, services, best shops, and promotions in your locality!</p>
                              </div>
                              <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-[20px]  ">
                                   {
                                        newLocations ? 
                                        newLocations.map((location, index) => <span className="w-full flex items-center gap-[5px] text-[0.8rem] text-gray-100  cursor-pointer group" key={`home-section-location-${index}`} onClick={() => navigate(`/location?=${location?.name}`)}><i className="text-main-blue-600 group-hover:animate-spin"><FaLocationCrosshairs /></i> {location.name} <b className="text-[0.7rem] font-mono text-main-blue-600 ">({location.count} ads)</b></span>)
                                        :locations.map((location, index) => <span className="text-[0.8rem] text-gray-100  " key={`home-section-location-${index}`} onClick={() => navigate(`/location?=${location}`)}>{location}</span>)
                                   }
                              </div>
                         </div>
                    : null
               }
          </>
     )
}

export default HomeLocationsSection