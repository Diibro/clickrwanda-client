import { useState } from "react"
import { locationImages } from "../../../utils/locations";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaPlus, } from "react-icons/fa6";
import PropTypes from "prop-types";
// import advertService from "../../../services/Advert";
import { useQuery } from "@tanstack/react-query";
import { MainServer } from "../../../services/beta/server";
import { BetaEndpoints } from "../../../services/beta/endpoints";
import locationsData from "../../../data/Location.json";

const HomeLocationsSection = () => {
     const locations = locationsData.districts;
     const locationStr = locations.join(',')
     const {data, isLoading, error} = useQuery({queryKey: "adsByLocation", queryFn: async() => await MainServer.fetch(`${BetaEndpoints.advert}/locations?locations=${locationStr}`),  staleTime: 120000, refetchInterval: 120000,refetchIntervalInBackground: false, refetchOnReconnect: true,})
     const [locsNo, setLocsNo]= useState(6);

     const updateLocsNumber = () => {
          return setLocsNo(prev => {
               if(prev >= locations.length) return 6;
               else return prev + 6;
          })
     }

     if(isLoading) return <div>Loading...</div>
     if(error instanceof Error) return <div>Error: {error.message}</div>
     const newLocations = data ? data.data : null
     return (
          <>
               {
                    locations && locations.length ?
                         <div className="w-full flex flex-col bg-main-blue-700 rounded-[10px] p-[20px]  gap-[20px] ">
                              <div className="w-full flex flex-col gap-[5px]">
                                   <h3 className="text-[1.4rem] font-extrabold text-gray-50 ">Popular Locations</h3>
                                   <p className="text-[0.8rem] text-gray-200   ">Discover products, services, best shops, and promotions in your locality!</p>
                              </div>
                              <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-[10px]  ">
                                   {

                                        newLocations && newLocations.length > 0 ? 
                                        newLocations.map((location, index) => locsNo >= index + 1 && <PopularLocationCard location={{name:location?.name, ads: location.count,image: locationImages[`${location?.name.toLowerCase()}`]}} key={`home-location-card-${index}`} />)
                                        :
                                        locations.map((location, index) => locsNo >= index + 1 && <PopularLocationCard location={{name:location,image: locationImages[`${location.toLowerCase()}`]}} key={`home-location-card-${index}`} />)
                                   }
                              </div>
                              <div className="w-full flex items-center justify-end">
                                   <button className="w-auto px-[20px] py-[7px] text-[0.8rem] text-white bg-main-gold-500 rounded-[5px] inline-flex items-center gap-[5px]" onClick={updateLocsNumber}>{locsNo < locations.length ? <><FaPlus /> Show More</> : "Show less"}</button>
                              </div>
                         </div>
                    : null
               }
          </>
     )
}

const PopularLocationCard = ({location}) => {
     const navigate = useNavigate();
     return(
          <div className="w-full h-auto overflow-hidden grid grid-cols-2 md:grid-cols-1 rounded-[5px] bg-gray-100 p-[5px]">
               <div className="w-full h-[100px]">
                    <img className="w-full h-full object-cover rounded-[5px]" src={location.image} alt={location.name} />
               </div>
               <div className="w-full h-full flex flex-col items-center justify-center p-[5px] ">
                    <h4 className="text-[1rem] text-main-blue-700 font-bold ">{location.name}</h4>
                    <span onClick={() => navigate(`/location?=${location?.name}`)} className="text-[0.8rem] cursor-pointer text-blue-600 flex items-center gap-[3px] font-normal"><b>View {location?.ads} ads</b> <i className="text-[18px]"><FaArrowRight /></i></span>
               </div>
          </div>
     )
} 

PopularLocationCard.propTypes = {
     location: PropTypes.shape ({
          name: PropTypes.string,
          image: PropTypes.string,
          ads: PropTypes.any
     })
}

export default HomeLocationsSection