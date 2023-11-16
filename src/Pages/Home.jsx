import HelloImage from '../assets/images/helloImage.png'
import SearchBar from '../components/static/SearchBar'
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
    </div>
  )
}

export default Home;