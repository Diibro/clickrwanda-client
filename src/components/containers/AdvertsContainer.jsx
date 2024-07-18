import PropTypes from 'prop-types';
import AdsContainer from './AdsContainer'

const AdvertsContainer = ({adverts}) => {
     return (
          <div className='ads-container'>
               <AdsContainer adverts={adverts} />
          </div>
     )
}

AdvertsContainer.propTypes = {
     adverts: PropTypes.array
}
export default AdvertsContainer