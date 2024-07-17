import PropTypes from 'prop-types';
import AdvertRenderer from '../dynamic/Advert.componet';

const AdsContainer = ({adverts}) => {
     return (
          <>
               {
                    adverts.map(item => (<AdvertRenderer item={item} key={item.ad_id} />))
               }
          </>
     )
}

AdsContainer.propTypes = {
     adverts: PropTypes.array
}
export default AdsContainer