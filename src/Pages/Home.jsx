import { useContext } from 'react';
// import HelloImage from '../assets/images/helloImage.png';
import { Adverts, BoostedAds, TodayDeals} from '../components/dynamic/Adverts.component';
import Categories from '../components/dynamic/Categories';
import { InnerSection } from '../components/dynamic/InnerSectionContainer';
import SearchBar from '../components/static/SearchBar';
import DeviceView from '../Contexts/ViewContext';
import { BoostedSellers, GetStartedV1, RequestQuoteHeader } from '../components/dynamic/Special.components';
import { Helmet } from 'react-helmet';

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
          <div className='col'>
            <h1>Sell, Buy, Rent & Advertise <br />in Rwanda</h1>
            <SearchBar />
          </div>
          <RequestQuoteHeader />
          {/* <img src={HelloImage} alt="hello section image" /> */}
        </div>
        <InnerSection type="title">Our Best Sellers</InnerSection>
        <BoostedSellers />
        <InnerSection type="title" >
          Today Deals
        </InnerSection>
        <TodayDeals />
        
        
        <InnerSection type="title" >
          Our top categories
        </InnerSection>
        <Categories limit={isMobile ? 12 : 14} />
        <InnerSection type="title" >
          Sponsored Ads
        </InnerSection>
        <BoostedAds />
        <InnerSection type="title" >
          New Ads
        </InnerSection>
        <Adverts eleId={"home-adverts"} limit={50} />
        <GetStartedV1 />
      </div>
    </>
    
  )
}
export default Home;

