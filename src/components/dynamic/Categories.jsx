import PropTypes from 'prop-types';
import { useContext } from "react";
import AppData from "../../Contexts/AppContext";
import Loading from "../static/Loading";
import { Container } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { InnerSection } from './InnerSectionContainer';
import { CategoryContainerSquare } from './Containers';
import { MoreLink } from './LinksComponents';
import { dashReplacer } from '../../utils/otherFunctions';

const Categories = ({limit}) => {
     const [data] = useContext(AppData);
     const {categories} = data;
     return(
          <>
          {!categories ? <Loading /> : categories[0] ? (
               <Container>
               <InnerSection type="content">
                    {Array.isArray(categories) && limit != 0 ? categories.map(
                    (item, index) => index < limit ? <CategoryContainerSquare
                         view={`/categories/${dashReplacer(item.category_name)}`}
                         key={item.category_id} 
                         image={item.category_icon}
                         title={item.category_name}
                         ads_no={item.total_adverts > 0 ?` ${item.total_adverts} ads`: 'no ads'}/> : null
                    )
                    :Array.isArray(categories) && limit === 0   ? categories.map(
                         (item) => <CategoryContainerSquare 
                              view={`/categories/${dashReplacer(item.category_name)}`}
                              key={item.category_id} 
                              image={item.category_icon}
                              title={item.category_name}
                              ads_no={item.total_adverts > 0 ?` ${item.total_adverts} ads`: 'no ads'}
                              />
                    )
                    : <Loading />}
               </InnerSection>

               {limit 
                    ? <InnerSection  type="more"><MoreLink content={{message: "View more Categories", icon: FaArrowRight, dest: '/categories'}} /> </InnerSection> 
                    : <></>}
               </Container>
          
          ) : categories.status ? <Loading /> : <Loading /> }
          </>
     )
}


Categories.propTypes = {
     limit: PropTypes.number
}

export default Categories