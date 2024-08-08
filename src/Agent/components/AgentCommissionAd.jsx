import PropTypes from 'prop-types';
import { formatPrice } from '../../utils/otherFunctions';

const AgentCommissionAd = ({ad}) => {
     return (
          <div className="product-square-container">
               <div className="ad-image">
                    <img src={ad?.ad_image} alt="ad-image" />
               </div>
               <div className="content">
                    <h5 className='ad-title'><span>{ad?.ad_name}</span></h5>
                    <div className="agent-advert-row">
                         <b>Price:</b>
                         <span className="ad-price">Rwf {formatPrice(ad.ad_price)}</span>
                    </div>
                    <div className="agent-advert-row">
                         <b>Commission:</b>
                         <span>Rwf {formatPrice((70*ad.ad_price*ad.commission)/10000)}</span>
                    </div>
                    <div className="agent-advert-row">
                         <b>Status: </b>
                         {ad.status === 'pending' 
                         ? <span style={{color:'#925602'}}>{ad.status}</span>
                         : ad.status ==='Approved' ? <span style={{color: '#28C238'}}>{ad.status}</span> 
                         : <span style={{color: '#FA3C53'}}>{ad.status}</span>}
                    </div>
               </div>
          </div>
     )
}
AgentCommissionAd.propTypes = {
     ad: PropTypes.object
}
export default AgentCommissionAd