import { useContext } from 'react';
import HelloImage from '../assets/images/helloImage.png'
import { Adverts, BoostedAds} from '../components/dynamic/Adverts.component';
import Categories from '../components/dynamic/Categories';
import { InnerSection } from '../components/dynamic/InnerSectionContainer';
import SearchBar from '../components/static/SearchBar';
import DeviceView from '../Contexts/ViewContext';
import { BoostedSellers } from '../components/dynamic/Special.components';

const Home = () => {
  const [deviceView] = useContext(DeviceView);
  const {isMobile} = deviceView;
  return (
    <div className="page home">
      <div className="hello-section">
        <div className='col'>
          <h1>Sell, Buy, Rent & Advertise <br />in Rwanda</h1>
          <SearchBar />
        </div>
        <img src={HelloImage} alt="hello section image" />
      </div>
      <BoostedSellers />
      <Categories limit={isMobile ? 12 : 14} />
      <InnerSection type="title" >
        {/* <Title content={{type: "medium", name: "Top picks for you", color: textColors.darkBlue, size: titleSize.medium}} /> */}
        Boosted Ads
      </InnerSection>
      <BoostedAds />
      <InnerSection type="title" >
        {/* <Title content={{type: "medium", name: "Top picks for you", color: textColors.darkBlue, size: titleSize.medium}} /> */}
        New Ads
      </InnerSection>
      <Adverts limit={50} />
    </div>
  )
}
export default Home;

