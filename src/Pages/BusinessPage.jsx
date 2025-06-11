import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
const BusinessPage = () => {
     return (
          <div className="w-full flex flex-col items-center gap-[40px] bg-white rounded-[5px]">
               {/* <div className='w-full flex flex-col  items-center justify-center gap-[10px] p-[40px] bg-gray-100'>
                    <p className='md:text-[1.2rem] text-center text-[0.9rem] font-extrabold text-main-blue-700'>Get your Business listed on ClickRwanda by Payment only 10,000 Rwf</p>
                    <Link to={'/forms/signup'} className='w-auto text-[0.9rem] font-bold py-[7.5px] px-[10px] rounded-[40px] text-white bg-main-gold-500 hover:bg-main-blue-700 transition-all duration-200'>Get Started</Link>
               </div> */}
               <div className="rounded-[10px] py-[20px] grid grid-cols-1 md:grid-cols-2 gap-[5px] w-full items-center justify-center ">
                    <div className="w-full flex flex-col items-start justify-center gap-[10px] p-[20px]">
                         <h2 className="lg:text-[2.4rem] text-[2rem] font-extrabold text-main-blue-700 text-center">Add Your Business on Clickrwanda Today</h2>
                         <p className="lg:text-[1.2rem] text-[0.9rem] text-gray-700 font-semibold text-center ">Start selling in all over with only a few clicks by adding your business on clickrwanda.</p>
                    </div>
                    <div className="w-full flex items-center justify-center">
                         <img src="/banners/Sell-Rwanda.gif" alt="sell in rwanda gif" className="w-[70%] h-auto rounded-[20px] bg-white" />
                    </div>
               </div>
               <div className="w-full flex flex-col gap-[10px] p-[30px] items-center justify-center bg-gray-100">
                    <h2 className='lg:text-[2rem] text-[1.8rem] font-bold text-main-gold-600 text-center '>Enjoy Various benefits working with us</h2>
                    <div className='w-full p-[20px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[10px] '>
                         <BenefitCard title=' Increased Market Visibility' content="ClickRwanda.com provides a platform to showcase your products and services to a large, targeted audience within Rwanda. Businesses can leverage the sites traffic to increase brand awareness and visibility" />
                         <BenefitCard title='Cost-Effective Advertising' content="Advertising on ClickRwanda.com is more affordable compared to traditional methods like TV or radio ads. Businesses can effectively promote their offerings without a significant marketing budget." />
                         <BenefitCard title='24/7 Accessibility' content='An online shop on ClickRwanda ensures that customers can access your products and services at any time, providing convenience and potentially boosting sales.' />
                         <BenefitCard title="Enhanced Credibility" content="Being featured on ClickRwanda enhances a business's credibility and trustworthiness among local consumers who recognize and trust the platform." />
                    </div>
               </div>
               {/* <div className='w-full flex flex-col  items-center justify-center gap-[10px] p-[40px]'>
                    <p className='md:text-[1.2rem] text-center text-[0.9rem] font-extrabold text-main-blue-700'>Get your Business listed on ClickRwanda by Payment only 10,000 Rwf</p>
                    <Link to={'/forms/signup'} className='w-auto text-[0.9rem] font-bold py-[7.5px] px-[10px] rounded-[40px] text-white bg-main-gold-500 hover:bg-main-blue-700 transition-all duration-200'>Get Started</Link>
               </div> */}
          </div>
     )
}

const BenefitCard = ({title, content}) => {
     return (
          <div className="w-full flex flex-col items-center gap-[10px] p-[20px] bg-white rounded-[5px] ">
               <h3 className='text-[1rem] text-center font-bold text-main-blue-700'>{title}</h3>
               <p className='text-[0.8rem] text-center text-gray-700'>{content}</p>
          </div>
     )
}

BenefitCard.propTypes = {
     title: PropTypes.string,
     content: PropTypes.string
}   

export default BusinessPage