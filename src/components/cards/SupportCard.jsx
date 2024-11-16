import { useState } from "react";
import { TiMessages } from "react-icons/ti";
import PropTypes from 'prop-types';
import { RxCross2 } from "react-icons/rx";
import { BiArrowBack } from "react-icons/bi";
import { MdCall, MdWhatsapp } from "react-icons/md";

const SupportOptions = [
     {name: "Vehicle Specialist", icon: "https://s3.eu-north-1.amazonaws.com/clickrwanda.s3.com/categories/0c06cd39-45cf-4918-9109-e8de0fa81b28-Vehicle.png", phone: "+250795958903", whatsapp: "+250795958903", services: ["Rent a Vehicle", "Buy a Vehicle", "Sell a used Vehicle", "Report any issues faced regarding vehicles","Know more about Vehicles in Rwanda"]},
     {name: "Real Estate Specialist", icon: "https://s3.eu-north-1.amazonaws.com/clickrwanda.s3.com/categories/c4009cde-4be9-4e92-8812-5bd36b035639-etate.png", phone: "+250739399391", whatsapp: "+250739399391", services: ["Rent a residential", "Buy a residential house","Rent commercial Property", "Buy commercial Property", "Buy plot of Land", "Sell plot of land", "Know more about Real Estate Property in Rwanda"]},
     {name: "Advertise With ClickRwanda", icon: "https://s3.eu-north-1.amazonaws.com/clickrwanda.s3.com/staff/advertise-clickrwanda.jpg", phone: "+250739399391", whatsapp: "+250739399391", services: ["Know more about ads packages", "know more about shop Packages", "know more about Banner Packages", "Articles Packages", "Know more about the advantages of advertising with click rwanda"]},
     {name: "Jobs Specialist", icon: "https://s3.eu-north-1.amazonaws.com/clickrwanda.s3.com/categories/71741218-ed8f-479c-8085-1fcae1365be3-jobf.png", phone: "+250727559173", whatsapp: "+250727559173", services: ["Find your dream job", "Find the best employees for your business", "Available jobs in Rwanda", "Prepare for your job interview"]},
     {name: "Technical Support", icon: "https://s3.eu-north-1.amazonaws.com/clickrwanda.s3.com/staff/picture.jpg", phone: "+250780795232", whatsapp: "+250780795232", services: ["Facing technical issues with clickrwanda", "Unable to upload your ad", "Unable to access you account"]},
     {name: "Clickrwanda Management", icon: "https://s3.eu-north-1.amazonaws.com/clickrwanda.s3.com/staff/manager.png", phone: "+250783011621", whatsapp: "+250783011621", services: ["know more about Clickrwanda", "Our mission", "Our Vision", "How to be clickrwanda Partner"]},
     {name: "Chief Executive Officer", icon: "https://s3.eu-north-1.amazonaws.com/clickrwanda.s3.com/staff/boss.png", phone: "+250787260494", whatsapp: "+250787260494", services: ["Talk to our CEO", "Explore even more about what Clickrwand can offer"]}
]

const SupportCard = () => {
     const [displaySupport, setDisplaySupport] = useState(false);
     const [selectedOption, setSelectedOption] = useState(null);

     const toggleSupport=() => {
          return setDisplaySupport(!displaySupport);
     }

     const resetSelectedOption = () => {
          return setSelectedOption(null);
     }
     return (
          <>
               {
                    displaySupport ?
                    <div className="fixed bottom-0  md:bottom-[40px] right-0 md:right-[20px] w-full md:w-[400px] p-[10px] rounded-[10px]  z-50 bg-white cursor-pointer group shadow-sm shadow-gray-600 transition-all duration-300">
                         <div className="w-full flex items-center gap-[10px] justify-between p-[10px] my-[5px] bg-main-blue-700 rounded-[5px]  ">
                              <div className="w-auto flex items-center">
                                   {
                                        selectedOption 
                                        ? <div className="w-full flex items-center gap-[5px]">
                                             <img src={selectedOption.icon} width={30} height={30} className="w-[30px] aspect-square rounded-full border-[1.4px] border-green-600 p-[2.5px] " />
                                             <h4 className="text-white text-[0.8rem] md:text-[1.2rem] font-bold white  ">{selectedOption.name}</h4>
                                        </div>
                                        : <h3 className="text-white text-[0.8rem] md:text-[1.2rem] font-bold ">Contact Click Rwanda Support</h3>
                                   }
                              </div>
                              <div className="w-auto flex items-center gap-[5px]">
                                   {selectedOption && <i className="cursor-pointer text-[1.4rem] text-gray-500 hover:text-main-blue-500 " onClick={resetSelectedOption}><BiArrowBack /></i>}
                                   <i className="cursor-pointer text-[1.4rem] text-gray-500 hover:text-main-blue-500 " onClick={toggleSupport}><RxCross2 /></i>
                              </div>
                              
                         </div>
                         {
                              selectedOption 
                              ? <SelectedOption option={selectedOption} />
                              : <OptionsContainer options={SupportOptions} cb={(option) => setSelectedOption(option)} />
                         }
                    </div>
                    :
                    <div className="fixed bottom-[40px] right-[20px] w-auto p-[10px] rounded-full z-50 bg-main-blue-700 shadow-md shadow-main-blue-500 cursor-pointer group hover:shadow-sm hover:bg-main-blue-500 transition-all duration-300 " onClick={toggleSupport}>
                         <i className="text-[1.8rem] text-main-blue-500 group-hover:text-main-blue-700 "><TiMessages /></i>
                    </div>
               }
          </>
          
     )
}

const OptionsContainer = ({options, cb}) => {
     return (
          <div className="w-full flex flex-col gap-[5px] ">
               {
                    options.map((option, index) => <SupportOption option={option} key={`support-option-{${index}}`} onClick={() => cb(option)} />)
               }
          </div>
     )
}

OptionsContainer.propTypes = {
     options: PropTypes.arrayOf(PropTypes.shape({
          icon: PropTypes.string,
          name: PropTypes.string,
          phone:PropTypes.string,
          whatsapp: PropTypes.string,
          services: PropTypes.arrayOf(PropTypes.string)
     })),
     cb: PropTypes.func
}

const SupportOption = ({option, onClick}) => {
     return (
          <div 
               onClick={onClick}
               className="w-full flex items-center gap-[10px] border-[1.2px] border-gray-200 hover:border-gray-200 transition-all duration-300 rounded-[50px] px-[5px] py-[5px] hover:bg-gray-200 group "
               >
               <img src={option.icon} width={30} height={30} className="w-[40px] h-[40px] rounded-full border-[1.4px] border-green-600 p-[2.5px] " />
               <h4 className="text-[0.8rem] font-bold text-main-blue-700 ">{option.name}</h4>
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
     }),
     onClick: PropTypes.func
}

const SelectedOption = ({option}) => {
     return (
          <div className="w-[95%] mx-auto flex flex-col items-center gap-[5px]">
               <div className="w-full flex flex-col items-start ">
                    <p className="text-[0.8rem] text-gray-700 ">Would like to request any of these services:</p>
                    {
                         option.services.map((service, index) => <p key={`support-card-${option.name}-${index}`} className="text-[0.8rem] text-gray-700 ">{index + 1}. {service}</p> )
                    }
               </div>
               <div className="w-full flex items-center gap-[10px]">
                    <a href={`tel:${option.phone}`} className="flex items-center gap-[5px] p-[5px] rounded-[30px] w-auto text-gray-700 border-[1.2px] border-main-blue-700 text-[0.8rem]"><i className="w-[30px] h-[30px]  text-main-blue-700 text-[24px] p-[5px] border-[1.2px] border-main-blue-700 rounded-full flex items-center justify-center "><MdCall/></i> Direct Call</a>
                    <a href={`https://wa.me/${option.whatsapp}?text=${encodeURIComponent(`Hello Click Rwanda ${option.name}.`)}`} className="flex items-center gap-[5px] p-[5px] rounded-[30px] w-auto text-gray-700 border-[1.2px] border-main-blue-700 text-[0.8rem]"><i className="w-[30px] h-[30px]  text-main-green-600 text-[24px] p-[5px] border-[1.2px] border-main-green-600 rounded-full flex items-center justify-center " ><MdWhatsapp/></i> Whatsapp</a>
               </div>
          </div>
     )
}

SelectedOption.propTypes = {
     option: PropTypes.shape({
          icon: PropTypes.string,
          name: PropTypes.string,
          phone:PropTypes.string,
          whatsapp: PropTypes.string,
          services: PropTypes.arrayOf(PropTypes.string)
     })
}
export default SupportCard