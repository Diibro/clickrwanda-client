import { useContext } from 'react';
import { AdWebsites, AdvertsContainer, BoostedAds, TodayDeals} from '../components/dynamic/Adverts.component';
import Categories from '../components/dynamic/Categories';
import SearchBar from '../components/static/SearchBar';
import DeviceView from '../Contexts/ViewContext';
import { RequestQuoteHeader } from '../components/dynamic/Special.components';
import { Helmet } from 'react-helmet';
import { HeroSectionBanner, HorizontalBanner} from '../components/dynamic/Banners';
import { Banners } from '../config/banners';
import { useTranslation } from 'react-i18next';
import AppData from '../Contexts/AppContext';
import HomeLocationsSection from '../components/containers/HomeLocationsSection';
// import AllCategoriesSection from '../components/containers/AllCategoriesSection';
import {  ExploreHotDeals, MakeMoneySection, SubscribeToPlans } from '../components/containers/PageBreaks';
// import JobSeekersSection from '../components/containers/JobSeekersSection';
import HomeCommissionAds from '../components/containers/HomeCommissionAds';
// import HomeHotCategories from '../components/containers/HomeHotCategories';
import JobsSection from '../components/containers/JobsSection';
// import HomeShopContainer from '../components/containers/HomeShopContainer';
import { HomeBlogsSection } from './BlogsPage';

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
      <div className="w-full flex flex-col items-center gap-[10px]">
        <div className="w-full rounded-[5px] py-[10px] flex items-start bg-main-blue-700  ">
          <div className="w-full lg:w-[60%] py-[10px] px-[5px] flex flex-col gap-[5px]">
            <div className='w-full flex flex-col'>
              {/* <h1>Sell, Buy, Rent & Advertise <br />in Rwanda</h1> */}
              <h1 className='text-white text-[1.8rem] lg:text-[2.4rem] font-extrabold text-center md:text-start  '>{content.heroSection.heroMessage}</h1>
              <SearchBar />
            </div>
            <RequestQuoteHeader />
          </div>
          <div className=" hidden lg:flex w-50% lg:w-[40%]">
              {isMobile ? null : <HeroSectionBanner items={Banners} />}
          </div>
          {/* <img src={HelloImage} alt="hello section image" /> */}
        </div>
        <div className="w-full flex flex-col items-center justify-start gap-[20px] py-[5px] relative ">
            {/* Sponsored ads section */}
            <BoostedAds />
            {/* hot deals section */}
          <ExploreHotDeals />

            {/** top deals section */}
          <TodayDeals />

          {/* hot deals section */}
          <HomeCommissionAds />

          {/* first banner */}
          <HorizontalBanner items={Banners} upper={smallDevice ? 0 : 1} lower={0} />


          {/* jobs section */}
          <JobsSection />

          {/* {company advertisement} */}
          <SubscribeToPlans />

          {/* new ads section */}
          <AdvertsContainer content={{title: content.newAdsSection.title, containerId: "new-ads-home-page-section", adverts: adverts, adsNo: 12}} />

          {/* Categories section */}
          <Categories limit={0} />

          {/* Second home page banner */}

          
          {/* Job Seekers section */}
          {/* <JobSeekersSection /> */}
          
          {/* our shop */}
          {/* <HomeShopContainer/> */}

          {/* blogs */}
          <HomeBlogsSection showTitle={true} />
          {/* ads websites section */}
          <AdWebsites />

          {/* Locations section */}
          <HomeLocationsSection />
          {/* get started as seller page break */}
          {/* <BecomeSeller /> */}
          {/* best sellers section */}
          {/* <BoostedSellers /> */}
           
          {/* All categories with sub categories */}
          {/* <AllCategoriesSection /> */}

          {/* make money section */}
          <MakeMoneySection />
        </div>
      </div>
      </>
    
  )
}
export default Home;

