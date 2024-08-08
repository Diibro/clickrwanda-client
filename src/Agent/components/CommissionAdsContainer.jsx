import PropTypes from 'prop-types';
import AgentCommissionAd from './AgentCommissionAd';

const CommissionAdsContainer = ({ads}) => {
     return (
          <div className='agent-commission-products-container'>
               {ads && ads.length ? 
                    ads.map((ad, index) => <AgentCommissionAd key={`agent-commission-ad-${index}`} ad={ad} />)
               : <p className='no-ads-found'></p>}
          </div>
     )
}

CommissionAdsContainer.propTypes = {
     ads: PropTypes.array
}
export default CommissionAdsContainer