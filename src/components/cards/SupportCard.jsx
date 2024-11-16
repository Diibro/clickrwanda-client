import { useState } from "react";
import { TiMessages } from "react-icons/ti";
import PropTypes from 'prop-types';

const SupportOptions = [
     {name: "Vehicle Specialist", icon: "https://s3.eu-north-1.amazonaws.com/clickrwanda.s3.com/categories/0c06cd39-45cf-4918-9109-e8de0fa81b28-Vehicle.png", phone: "+250795958903", whatsapp: "+250795958903", services: ["Rent a Vehicle", "Buy a Vehicle", "Sell a used Vehicle", "Report any issues faced regarding vehicles","Know more about Vehicles in Rwanda"]},
     {name: "Real Estate Specialist", icon: "https://s3.eu-north-1.amazonaws.com/clickrwanda.s3.com/categories/c4009cde-4be9-4e92-8812-5bd36b035639-etate.png", phone: "+250739399391", whatsapp: "+250739399391", services: ["Rent a residential", "Buy a residential house","Rent commercial Property", "Buy commercial Property", "Buy plot of Land", "Sell plot of land", "Know more about Real Estate Property in Rwanda"]},
     {name: "Advertise With ClickRwanda", icon: "", phone: "+250739399391", whatsapp: "+250739399391", services: ["Know more about ads packages", "know more about shop Packages", "know more about Banner Packages", "Articles Packages", "Know more about the advantages of advertising with click rwanda"]},
     {name: "Jobs Specialist", icon: "https://s3.eu-north-1.amazonaws.com/clickrwanda.s3.com/categories/71741218-ed8f-479c-8085-1fcae1365be3-jobf.png", phone: "+250727559173", whatsapp: "+250727559173", services: ["Find your dream job", "Find the best employees for your business", "Available jobs in Rwanda", "Prepare for your job interview"]},
     {name: "Technical Support", icon: "", phone: "+250780795232", whatsapp: "+250780795232", services: ["Facing technical issues with clickrwanda", "Unable to upload your ad", "Unable to access you account"]},
     {name: "Clickrwanda Management", icon: "", phone: "+250783011621", whatsapp: "+250783011621", services: ["know more about Clickrwanda", "Our mission", "Our Vision", "How to be clickrwanda Partner"]},
     {name: "Chief Executive Officer", icon: "", phone: "+250787260494", whatsapp: "+250787260494", services: ["Talk to our CEO", "Explore even more about what Clickrwand can offer"]}
]




const SupportCard = () => {
     const [displaySupport, setDisplaySupport] = useState(false);


     const toggleSupport=() => {
          return setDisplaySupport(!displaySupport);
     }
     return (
          <>
               {
                    displaySupport ?
                    <div className="fixed bottom-0 left-0 md:bottom-[40px] md:right-[20px] w-full md:w-auto p-[10px] rounded-[10px]  z-50 bg-main-blue-700 shadow-md shadow-main-blue-500 cursor-pointer group hover:shadow-sm hover:bg-main-blue-500 transition-all duration-300">

                    </div>
                    :
                    <div className="fixed bottom-[40px] right-[20px] w-auto p-[10px] rounded-full z-50 bg-main-blue-700 shadow-md shadow-main-blue-500 cursor-pointer group hover:shadow-sm hover:bg-main-blue-500 transition-all duration-300 " onClick={toggleSupport}>
                         <i className="text-[1.8rem] text-main-blue-500 group-hover:text-main-blue-700 "><TiMessages /></i>
                    </div>
               }
          </>
          
     )
}

const SupportOption = ({option}) => {
     return (
          <div className="w-full flex items-center gap-[10px] border-[1.2px] border-gray-200 rounded-[50px] px-[10px] py-[5px] ">
               <img src={option.icon} width={30} height={30} className="w-[30px] aspect-square rounded-full border-[1.4px] border-green-600 p-[2.5px] " />
               <h4 className="text-[1.2rem] font-bold text-main-blue-700  ">{option.name}</h4>
          </div>
     )
}

SupportOption.propTypes = {
     option: PropTypes.shape({
          icon: PropTypes.string,
          name: PropTypes.string,
          phone:PropTypes.string,
          whatsapp: PropTypes.string,
          services: PropTypes.arrayOf(PropTypes.string)
     })
}

export default SupportCard