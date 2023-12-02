import HelloImage from '../assets/images/helloImage.png'
import { Adverts} from '../components/dynamic/Adverts.component';
import Categories from '../components/dynamic/Categories';
import { InnerSection } from '../components/dynamic/InnerSectionContainer';
import SearchBar from '../components/static/SearchBar';

const Home = () => {
  return (
    <div className="page home">
      <div className="hello-section">
        <div className='col'>
          <h1>Search anything in <br /> Rwanda</h1>
          <SearchBar />
        </div>
        <img src={HelloImage} alt="hello section image" />
      </div>
      <Categories limit={14} />
      <InnerSection type="title" >
        {/* <Title content={{type: "medium", name: "Top picks for you", color: textColors.darkBlue, size: titleSize.medium}} /> */}
        Top picks for you
      </InnerSection>
      <Adverts limit={40} />
    </div>
  )
}
export default Home;

