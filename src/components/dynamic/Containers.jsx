import PropTypes from 'prop-types';
import InnerSectionContainer from './InnerSectionContainer';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
     EmailShareButton,
     FacebookShareButton,
     InstapaperShareButton,
     LinkedinShareButton,
     PinterestShareButton,
     TelegramShareButton,
     TwitterShareButton,
     WhatsappShareButton,
     EmailIcon,
     FacebookIcon,
     InstapaperIcon,
     LinkedinIcon,
     PinterestIcon,
     TelegramIcon,
     TwitterIcon,
     WhatsappIcon,
   } from "react-share";

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
                    <img src={image} alt={title} />
               </div>
               <h3>{title}</h3>
               <p className='small-paragraph'>{ads_no}</p>
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

export const ShareButtons = ({url, name, image}) => {

     return  (
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
          <div className="share-buttons">
          <FacebookShareButton url={url} title={name}>
               <FacebookIcon size={20} round />
          </FacebookShareButton>
          <EmailShareButton url={url} subject={name} body='check out this link:'>
               <EmailIcon size={20} round />
          </EmailShareButton>
          <TwitterShareButton url={url} title={name}>
               <TwitterIcon size={20} round />
          </TwitterShareButton>
          <WhatsappShareButton url={url} title={name}>
               <WhatsappIcon size={20} round />
          </WhatsappShareButton>
          <InstapaperShareButton url={url} title={name}>
               <InstapaperIcon size={20} round />
          </InstapaperShareButton>
          <PinterestShareButton url={url} media={image} description={name}>
               <PinterestIcon size={20} round />
          </PinterestShareButton>
          <LinkedinShareButton url={url} title={name}>
               <LinkedinIcon size={20} round />
          </LinkedinShareButton>
          <TelegramShareButton url={url} title={name}>
               <TelegramIcon size={20} round />
          </TelegramShareButton>
          </div>
     </>
     ) ;
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

ShareButtons.propTypes = {
     url: PropTypes.string,
     name: PropTypes.any,
     image: PropTypes.any,
}



export default MainComponent;