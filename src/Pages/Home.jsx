import { useContext } from 'react';
// import HelloImage from '../assets/images/helloImage.png';
import { AdWebsites, Adverts, BoostedAds, TodayDeals} from '../components/dynamic/Adverts.component';
import Categories from '../components/dynamic/Categories';
import { InnerSection } from '../components/dynamic/InnerSectionContainer';
import SearchBar from '../components/static/SearchBar';
import DeviceView from '../Contexts/ViewContext';
import { BoostedSellers, RequestQuoteHeader } from '../components/dynamic/Special.components';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { HeroSectionBanner, HorizontalBanner, LeftBanner, RightBanner } from '../components/dynamic/Banners';
import { Banners } from '../config/banners';

const Home = () => {
  const [deviceView] = useContext(DeviceView);
  const {isMobile} = deviceView;
  return (
    <>
      <Helmet>
        <meta name="description" content="Click Rwanda is one of the leading classified ads platforms that enable users buy, sell, advertise their products and services on the Rwandan market in a few clicks"/>
        <meta name="keywords" content="clickrwanda, sell in Rwanda,buy and sell anything in Rwanda, rent in rwanda, buy in rwanda, advertise in rwanda, rwanda marketplace, buy, rent, advertise" />
        <title>Sell, Buy, Rent & Advertise in Rwanda</title>
      </Helmet>
      <div className="page home">
        <div className="hello-section">
          <div className="sec-1">
            <div className='col'>
              <h1>Sell, Buy, Rent & Advertise <br />in Rwanda</h1>
              <SearchBar />
            </div>
            <RequestQuoteHeader />
          </div>
          <div className="sec-banner">
              {isMobile ? null : <HeroSectionBanner items={Banners} />}
          </div>
          {/* <img src={HelloImage} alt="hello section image" /> */}
        </div>
        <div className="page-main">
          <div className="side"><LeftBanner items={Banners} /></div>
          <div className="page-content">
          <InnerSection type="title">
            Our Best Sellers
            <Link to='/best-sellers'>View All</Link>
          </InnerSection>
          <BoostedSellers />
          <HorizontalBanner items={Banners} />
          <InnerSection type="title" >
            Today Deals
            <Link to='/top-deals'>View All</Link>
          </InnerSection>
          <TodayDeals />
          
          
          <InnerSection type="title" >
            Our top categories
          </InnerSection>
          <Categories limit={isMobile ? 12 : 14} />
          <InnerSection type="title" >
            Premium Ads
            <Link to='/sponsored-ads'>View All</Link>
          </InnerSection>
          <BoostedAds />
          <HorizontalBanner items={Banners} />
          <InnerSection type="title" eleId={"home-new-ads"} >
            New Ads
          </InnerSection>
          <Adverts eleId={"home-adverts"} limit={50} />
          <InnerSection type="title" >
          Sponsored Ads
          </InnerSection>
          <AdWebsites />
          {/* <GetStartedV1 /> */}
          </div>
          <div className="side right-side"><RightBanner items={Banners}/></div>
        </div>
      </div>
    </>
    
  )
}
export default Home;

