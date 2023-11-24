import { Container } from "@mui/material";
import Loading from "../static/Loading";
import { InnerSection } from "./InnerSectionContainer";
import AppData from "../../Contexts/AppContext";
import { useContext } from "react";
import PropTypes from 'prop-types';
import { FaArrowRight } from "react-icons/fa";
import { ProductSquare, ServiceSquare } from "./Advert.componet";
import { MoreLink } from "./LinksComponents";

export const Adverts = ({limit}) => {
      const [data] = useContext(AppData);
      const {adverts} = data
      console.log(adverts)

      if(limit != 0 && adverts && adverts[0] && adverts != "no data found") {
        return(
          <Container sx={{p:0}}>
            <InnerSection type="content">
              {
                adverts.map((item, index) => ( index <= limit ? (
                  
                  item.ad_type === "product" ? <ProductSquare key={item.ad_id}
                  image={item.ad_image}
                  title={item.ad_name}
                  price={item.ad_price}
                  plan={item.plan_name}
                  condition="Best condition"
                  />
                 : <ServiceSquare 
                    key={item} 
                    image={item.ad_image} 
                    title={item.ad_name}
                    plan={item.plan_name}
                    description="best services"
                  />
                ) : null))
              }
            </InnerSection>
            <InnerSection type="more" ><MoreLink content={{message: "all ads", dest: '/ads', icon: FaArrowRight}} /></InnerSection>
          </Container>
        )
      }else if(limit === 0 && adverts && adverts[0] && adverts != "no data found" ){
        return(
          <Container sx={{p:0}}>
            <InnerSection type="content">
              {
                adverts.map((item) => (
                  
                  item.ad_type === "product" ? <ProductSquare key={item.ad_id}
                  image={item.ad_image}
                  title={item.ad_name}
                  price={item.ad_price}
                  plan={item.plan_name}
                  condition="Best condition"
                  />
                 : <ServiceSquare 
                    key={item} 
                    image={item.ad_image} 
                    title={item.ad_name}
                    plan={item.plan_name}
                    description="best services"
                  />
                ))
              }
            </InnerSection>
          </Container>
        )
      }else{
        return(
          <Container>
            <Loading />
          </Container>
        )
      }
    
    }

Adverts.propTypes = {
     limit: PropTypes.number
}