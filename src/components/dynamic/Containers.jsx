import PropTypes from 'prop-types';
import InnerSectionContainer from './InnerSectionContainer';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
     EmailShareButton,
     FacebookShareButton,
     // InstapaperShareButton,
     LinkedinShareButton,
     PinterestShareButton,
     TelegramShareButton,
     TwitterShareButton,
     WhatsappShareButton,
     EmailIcon,
     FacebookIcon,
     // InstapaperIcon,
     LinkedinIcon,
     PinterestIcon,
     TelegramIcon,
     TwitterIcon,
     WhatsappIcon,
   } from "react-share";
import { useContext, useEffect, useState } from 'react';
import AppData from '../../Contexts/AppContext';
import { ImCross } from 'react-icons/im';
import { ActionBtn } from './Buttons';
import { copyToClipboard, formatPrice } from '../../utils/otherFunctions';
// import { AnyImage } from '../static/Image';

export const SectionContainer = ({content, title, sectionType}) => {
     return(
          <div className={sectionType === 'header' ? "section-container" : "section-container"}>
               {title === "header" ? <></> : <h2>{title}</h2>}
               <InnerSectionContainer content={content} />
          </div>
     )
}


const MainComponent = () => {
     return(
          <div></div>
     )
}

export const CategoryContainerSquare = ({image, title, ads_no, view }) => {
     const navigate = useNavigate();
     return (
          <div className="category-square" onClick={() => navigate(view)}>
               <div className="img">
                    <img src={image} alt={title} loading='lazy' />
                    {/* <AnyImage image={{src:image, alt: title, action: () => {}}} /> */}
               </div>
               <div className="content">
                    <p>
                         {title}
                         <span className='small-paragraph'> {formatPrice(ads_no)}</span>
                    </p>
                    
               </div>
          </div>
     )
}



export const CategoryContainerRow = ({title, subCategories}) =>{
     return(
          <div className="category-row">
               <h3>{title}</h3>
               <div className="row">
                    {subCategories}
               </div>
          </div>
     )
}

export const ShareButtons = () => {
     const [data, setData] = useContext(AppData);
     const {shareAlert} = data;
     const {url, name, image} = shareAlert.content;
     const [showShare, setShowShare] = useState(false);
     const closeShareButtons = () => {
          setData(prev => ({
               ...prev,
               shareAlert: {
                    on: false,
                    content: {url: null, name: null, image: null}
               }
          }))
     }

     useEffect(() => {
          setShowShare(shareAlert.on);
     }, [shareAlert.on]);
     return showShare ?  (
          <>
               <Helmet>
               <meta property="og:title" content={name} />
               <meta property="og:image" content={image} />
               <meta property="og:url" content={url} />
               {/* Other necessary meta tags for Facebook */}

               <meta name="twitter:card" content="summary_large_image" />
               <meta name="twitter:title" content={name} />
               <meta name="twitter:image" content={image} />
               {/* Other necessary meta tags for Twitter */}
               </Helmet>
               <div className='share-buttons-container'>
                    <i className='close-icon' onClick={closeShareButtons}><ImCross /></i>
                    <div className="share-buttons">
                         <div className="copy-link-container">
                              <ActionBtn title='Copy Share Link' action={() => copyToClipboard(url)} />
                         </div>
                         <FacebookShareButton className='share-btn' url={url} title={name}>
                              <FacebookIcon size={32} round />
                              <span>Facebook</span>
                         </FacebookShareButton>
                         <EmailShareButton className='share-btn' url={url} subject={name} body='check out this link:'>
                              <EmailIcon size={32} round />
                              <span>Email</span>
                         </EmailShareButton>
                         <TwitterShareButton className='share-btn' url={url} title={name}>
                              <TwitterIcon size={32} round />
                              <span>Twitter</span>
                         </TwitterShareButton>
                         <WhatsappShareButton className='share-btn' url={url} title={name}>
                              <WhatsappIcon size={32} round />
                              <span>WhatsApp</span>
                         </WhatsappShareButton>
                         <PinterestShareButton className='share-btn' url={url} media={image} description={name}>
                              <PinterestIcon size={32} round />
                              <span>Pinterest</span>
                         </PinterestShareButton>
                         <LinkedinShareButton className='share-btn' url={url} title={name}>
                              <LinkedinIcon size={32} round />
                              <span>LinkedIn</span>
                         </LinkedinShareButton>
                         <TelegramShareButton className='share-btn' url={url} title={name}>
                              <TelegramIcon size={32} round />
                              <span>Telegram</span>
                         </TelegramShareButton>
                    </div>
               </div> 
          </>
     
     ) : null;
}

SectionContainer.propTypes = {
     content: PropTypes.any,
     title: PropTypes.string,
     sectionType: PropTypes.any
}

CategoryContainerSquare.propTypes = {
     image: PropTypes.string,
     title: PropTypes.string,
     ads_no: PropTypes.any,
     view: PropTypes.any
}


CategoryContainerRow.propTypes = { 
     title: PropTypes.string,
     subCategories: PropTypes.array
}





export default MainComponent;