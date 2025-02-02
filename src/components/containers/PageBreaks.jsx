import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types'

export const BecomeSeller = () => {
     const navigate = useNavigate();
     return (
          <div className="w-full p-[20px] rounded-[10px] bg-main-blue-700 flex flex-col items-center justify-start gap-[10px]">
               <SectionTitle title={"Become a seller on ClickRwanda"} />
               <div className="w-full md:w-[80%] flex flex-col items-center gap-[5px] ">
                    <PText text={"Selling on ClickRwanda is a simple and fast process. Simply click on the Get Started button below and follow onscreen instructions and make your business known to thousands of people visiting ClickRwanda daily. Click Here to start selling on ClickRwanda."} />
                    <p> </p>
                    <ActionBtn name="Get Started" action={() => navigate('/forms/signup')} />
               </div>
          </div>
     )
}

export const ExploreHotDeals = () => {

     return (
          <div className="w-full bg-main-blue-700 flex flex-col items-center gap-[10px] p-[20px] rounded-[10px]">
               <SectionTitle title={"Discover the best deals on ClickRwanda"} />
               <div className="w-full md:w-[80%] flex flex-col items-center gap-[5px] ">
                    <PText text={"View the best products, services, discounts from our verified sellers on our market place. Discover best best deals and get home delivery at any place in Rwanda."} />
               </div>
          </div>
     )
}

export const MakeMoneySection = () => {
     const navigate = useNavigate();

     return (
          <div className="w-full bg-main-blue-700 flex flex-col items-center gap-[10px] p-[20px] rounded-[10px] ">
               <SectionTitle title={"Make money on ClickRwanda."} />
               <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[20px] ">
                    <div className="w-full rounded-[20px] shadow-sm shadow-main-blue-500 p-[20px] items-center flex flex-col gap-[5px] ">
                         <PText text={"Sign up for agent Account and work as a ClickRwanda agent. Click here to get started."} />
                         <ActionBtn name="Become Agent" action={() => navigate('/forms/agent-signup')} />
                    </div>
                    <div className="w-full rounded-[20px] shadow-sm shadow-main-blue-500 p-[20px] items-center flex flex-col gap-[5px] ">
                         <PText text={"Sign up for influencer account on ClickRwanda and start earning from your followers on Social Medias. Click here to sign up"} />
                         <ActionBtn name="Influencer Signup" action={() => navigate('/forms/influencer-signup')} />
                    </div>
               </div>
          </div>
     )
}

export const SubscribeToPlans = () => {
     const navigate = useNavigate();
     return (
          <div className="w-full bg-main-blue-700 flex flex-col items-center gap-[10px] p-[20px] rounded-[10px] ">
               <SectionTitle title={"Boost Your Sales and Grow Your Business Today!"} />
               <div className="w-full grid grid-cols-1 gap-[20px] ">
                    <div className="w-full rounded-[20px] shadow-sm shadow-main-blue-500 p-[20px] items-center flex flex-col gap-[5px] ">
                         <PText text="Take your business to the next level by subscribing to our affordable plans designed to maximize your product visibility. With our platform, you can showcase your products to thousands of potential customers across Rwanda and beyond. " />
                         <ActionBtn name="Get Started" action={() => navigate('/payment-plans')} />
                    </div>
               </div>
          </div>
     )
}

export const FindJobBreakSection = () => {
     const navigate = useNavigate();
     return (
          <div className="w-full bg-main-blue-700 flex flex-col items-center gap-[10px] p-[20px] rounded-[10px] ">
               <SectionTitle title={"Find Your Dream Job with ClickRwanda"} />
               <PText text={"Your Journey to Success Starts Here!"} />
               <div className="w-full grid grid-cols-1 gap-[20px] ">
                    <div className="w-full rounded-[20px] shadow-sm shadow-main-blue-500 p-[20px] items-center flex flex-col gap-[5px]  ">
                         <PText text={"Take the first step towards your dream job by creating a Job Seeker Account today. With just a few clicks, you’ll unlock access to exclusive job listings and career-enhancing opportunities."} />
                         <ActionBtn name="Signup now" action={() => navigate('/forms/job-seeker-signup')} />
                    </div>
               </div>
          </div>
     )
}

const PText = ({text, props}) => {
     return (
          <p {...props} className="text-[0.9rem] font-medium text-gray-400 text-justify md:text-center" >{text}</p>
     )
}

const SectionTitle = ({title}) => {
     return (
          <div className="w-full  flex justify-center items-center">
               <h3 className="text-center text-gray-100 text-[1.2rem] md:[1.8rem] font-extrabold ">{title}</h3>
          </div>
     )
}

SectionTitle.propTypes = {
     title: PropTypes.string
}

PText.propTypes = {
     text: PropTypes.any,
     props: PropTypes.any
}
const ActionBtn = ({action, name}) => {
     return (
          <button className="text-gray-50 text-[0.8rem] bg-transparent  rounded-[30px] px-[20px] py-[10px] shadow-md shadow-main-blue-500 hover:shadow-sm hover:bg-main-blue-500 transition-all duration-300  "  onClick={action}>{name}</button>
     )
}

ActionBtn.propTypes = {
     name: PropTypes.string,
     action: PropTypes.func
}