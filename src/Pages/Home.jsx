import HelloImage from '../assets/images/helloImage.png'
import { Adverts} from '../components/dynamic/Adverts.component';
import Categories from '../components/dynamic/Categories';
import { InnerSection } from '../components/dynamic/InnerSectionContainer';
import Title from '../components/dynamic/TitleComponents';
import SearchBar from '../components/static/SearchBar';
import { textColors, titleSize } from '../components/styles';

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
        <Title content={{type: "medium", name: "Top picks for you", color: textColors.darkBlue, size: titleSize.medium}} />
      </InnerSection>
      <Adverts limit={40} />
    </div>
  )
}
export default Home;

