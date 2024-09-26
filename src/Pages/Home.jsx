import { useContext } from 'react';
import { AdWebsites, AdvertsContainer, BoostedAds, TodayDeals} from '../components/dynamic/Adverts.component';
import Categories from '../components/dynamic/Categories';
import SearchBar from '../components/static/SearchBar';
import DeviceView from '../Contexts/ViewContext';
import { BoostedSellers, RequestQuoteHeader } from '../components/dynamic/Special.components';
import { Helmet } from 'react-helmet';
import { HeroSectionBanner, HorizontalBanner, LeftBanner, RightBanner } from '../components/dynamic/Banners';
import { Banners } from '../config/banners';
import { useTranslation } from 'react-i18next';
import AppData from '../Contexts/AppContext';
import HomeLocationsSection from '../components/containers/HomeLocationsSection';
import AllCategoriesSection from '../components/containers/AllCategoriesSection';
import { BecomeSeller, ExploreHotDeals, MakeMoneySection, SubscribeToPlans } from '../components/containers/PageBreaks';
import JobSeekersSection from '../components/containers/JobSeekersSection';
import HomeCommissionAds from '../components/containers/HomeCommissionAds';
// import HomeHotCategories from '../components/containers/HomeHotCategories';
import JobsSection from '../components/containers/JobsSection';
import HomeShopContainer from '../components/containers/HomeShopContainer';

const Home = () => {
  const [deviceView] = useContext(DeviceView);
  const [data] = useContext(AppData);
  const {adverts} = data;
  const {isMobile, isTablet} = deviceView;
  const smallDevice = isMobile || isTablet;

  const [t] = useTranslation("global");
  const content = t("homePage", {returnObjects:true});

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
              {/* <h1>Sell, Buy, Rent & Advertise <br />in Rwanda</h1> */}
              <h1>{content.heroSection.heroMessage}</h1>
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
            {/** top deals section */}
          <TodayDeals />

          {/* first banner */}
          <HorizontalBanner items={Banners} upper={smallDevice ? 0 : 1} lower={0} />

          {/* Categories section */}
          <Categories limit={0} />

          {/* Premium ads section */}
          <BoostedAds />

          {/* {company advertisement} */}
          <SubscribeToPlans />
          {/* Second home page banner */}

          {/* jobs section */}
          <JobsSection />
          {/* Job Seekers section */}
          <JobSeekersSection />

          {/* new ads section */}
          <AdvertsContainer content={{title: content.newAdsSection.title, containerId: "new-ads-home-page-section", adverts: adverts, adsNo: 12}} />

          {/* hot deals section */}
          <ExploreHotDeals />
          <HomeCommissionAds />
          
          {/* our shop */}
          <HomeShopContainer/>
          {/* ads websites section */}
          <AdWebsites />

          {/* Locations section */}
          <HomeLocationsSection />
          {/* best sellers section */}
          <BoostedSellers />
           {/* get started as seller page break */}
           <BecomeSeller />
          {/* All categories with sub categories */}
          <AllCategoriesSection />

          {/* make money section */}
          <MakeMoneySection />
          
          </div>
          <div className="side right-side"><RightBanner items={Banners}/></div>
        </div>
      </div>
      </>
    
  )
}
export default Home;

