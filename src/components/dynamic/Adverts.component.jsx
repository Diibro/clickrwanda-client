import { Container } from "@mui/material";
import Loading from "../static/Loading";
import { InnerSection } from "./InnerSectionContainer";
import AppData from "../../Contexts/AppContext";
import { useContext } from "react";
import PropTypes from 'prop-types';
import { FaArrowRight } from "react-icons/fa";
import { AdvertRenderer} from "./Advert.componet";
import { MoreLink } from "./LinksComponents";

export const Adverts = ({limit}) => {
      const [data] = useContext(AppData);
      const {adverts} = data

      if(limit != 0 && adverts && adverts[0] && adverts != "no data found") {
        return(
          <>
            <InnerSection type="content">
              {
                adverts.map((item, index) => ( index <= limit ? (
                  <AdvertRenderer key={item.ad_id} item={item}/>
                ) : null))
              }
            </InnerSection>
            <InnerSection type="more" ><MoreLink content={{message: "all ads", dest: '/ads', icon: FaArrowRight}} /></InnerSection>
          </>
        )
      }else if(limit === 0 && adverts && adverts[0] && adverts != "no data found" ){
        return(
            <InnerSection type="content">
              {
                adverts.map((item) => (
                  <AdvertRenderer key={item.ad_id} item={item}/>
                ))
              }
            </InnerSection>
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