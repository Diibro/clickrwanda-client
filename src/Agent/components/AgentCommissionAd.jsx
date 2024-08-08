import PropTypes from 'prop-types';
import { CImage } from '../../components/static/Image';

const AgentCommissionAd = ({ad}) => {
     return (
          <div className="agent-commission-product-card">
               <div className="ad-image">
                    <CImage image={ad.ad_image} />
               </div>
               <div className="content">
                    <h4 className='ad-title'>{ad.ad_name}</h4>
                    <p className="ad-price">Price:{ad.ad_price}</p>
                    <p>Commission: {ad.commission}</p>
                    <p>Status: {ad.status}</p>
               </div>
          </div>
     )
}
AgentCommissionAd.propTypes = {
     ad: PropTypes.object
}
export default AgentCommissionAd