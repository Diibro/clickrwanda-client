import PropTypes from "prop-types"

const DashCard = () => {
     return (
          <div className="dashcard"></div>
     )
}

export const DashHomeCard = ({content}) => {
     return (
          <div onClick={content?.action} className={`w-full shadow-sm shadow-gray-400 aspect-[100/50] flex flex-col items-center justify-center rounded-[5px] p-[10px] bg-white   home-dash-card-${content.classname}`}>
               <h2 className="text-[2rem] text-gray-700 font-bold text-center  ">{content?.count}</h2>
               <b className="text-[0.9rem] font-bold text-gray-900 ">{content?.name}</b>
          </div>
     )
}

DashHomeCard.propTypes = {
     content: PropTypes.object
}


export default DashCard;