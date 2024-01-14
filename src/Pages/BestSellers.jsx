import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Loading from '../components/static/Loading';
import server from '../config/Server';
import {  SubmitButton } from '../components/dynamic/Buttons';
import { useNavigate } from 'react-router-dom';
import { getItemUrl } from '../utils/urlFunctions';
import { Helmet } from 'react-helmet';
// const BestCup = "https://res.cloudinary.com/dyjahjf1p/image/upload/v1704971692/clickrwanda/logos/best-sellers-cup-rb_yhgkq9.png";

const BestSellers = () => {
     return (
          <>
          <Helmet>
               <meta name="description" content='Discover which sellers have been ranked best for the best products, services and deals in Rwanda.' />
               <meta name='keyword' content='best sellers in Rwanda, best sellers on clickrwanda, buy and sell in rwanda, advertise in Rwanda' />
               <title>Best Sellers in Rwanda | Click Rwanda</title>
          </Helmet>
          <div className="page">
               <BestSellersHeader />
               <BestSellerBody />
          </div>
          </>
     
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
               const {bestSellers} = await server.get('adverts',{boostSellers: true, boostNum: 1000});
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
               content.map((item, index) =>  {
                    item.rank = index + 1;
                    return(<BestSellerSquare key={item.user_id} item={item} />)
                     
                    }) 
               }
          </div>
     )
}

const BestSellerSquare = ({item}) => {
     const navigate = useNavigate();
     const viewVendor = () => {
          return navigate(`/vendor/${getItemUrl(item.full_name, item.user_id)}`)
     }
     return(
          <div className="best-seller-square">
               <span className='seller-ranking'>{item.rank}</span>
               <div onClick={viewVendor} className='seller-img' style={{backgroundImage: `url(${item.profile_image})`}}>  </div>
               {/* <img className='seller-img' onClick={viewVendor} src={item.profile_image} /> */}
               <h4>{item.username}</h4>
               <div className="content">
                    <p>Total ads: {item.total_ads}</p>
                    <p>Ad Views: {item.total_views}</p>
                    <p><SubmitButton content={{title:'view Shop', action: () => viewVendor(), size:"small-text"}} /></p>
               </div>
               
          </div>
     )
}

BestSellerSquare.propTypes = {
     item: PropTypes.object
}

export default BestSellers