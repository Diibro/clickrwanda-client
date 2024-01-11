import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Loading from '../components/static/Loading';
import server from '../config/Server';
const BestCup = "https://res.cloudinary.com/dyjahjf1p/image/upload/v1704971692/clickrwanda/logos/best-sellers-cup-rb_yhgkq9.png";

const BestSellers = () => {
     return (
     <div className="page">
          <BestSellersHeader />
          <BestSellerBody />
     </div>
     )
}

const BestSellersHeader = () => {
     return(
          <div className="best-sellers-header">
               {/* <img src={BestCup} alt="Best Cup" /> */}
               <h2>Our Best Sellers</h2>
               <p>Discover which sellers have been ranked best for the best products, services and deals.</p>
          </div>
     )
}

const BestSellerBody = () => {
     const [loading, setLoading] = useState(false);
     const [content, setContent] = useState([]);
     const fetchData =async () => {
          try {
               setLoading(true);
               const {bestSellers} = await server.get('adverts',{boostSellers: true});
               if(bestSellers ){
                    setContent(bestSellers);
               }
          } catch (error) {
               console.log(error);
          }finally{
               setLoading(false);
          }
     }

     useEffect(() => {
          (async () => await fetchData())();
     }, [])
     return(
          <div className="best-sellers-body">
               {loading ? <Loading/> :
               content.map(item => <BestSellerSquare key={item.user_id} item={item} />) 
               }
          </div>
     )
}

const BestSellerSquare = ({item}) => {
     return(
          <div className="best-seller-square">
               <h2>{item.username}</h2>
          </div>
     )
}

BestSellerSquare.propTypes = {
     item: PropTypes.object
}

export default BestSellers