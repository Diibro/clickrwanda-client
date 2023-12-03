import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import AppData from "./AppContext";
import server from "../config/Server";

const FilterContext = createContext();

export const FilterProvider = ({children}) => {
     const [data] = useContext(AppData);
     const {adverts} = data;
     const [filter, setFilter] = useState({
          view: "",
          price: 0,
          date: "",
          adverts:[],
          subCategories: [],
          advertView: false,
          category_id: ""
     });
     const [category_id, setCategory_id] = useState("");

     const fetchAdverts = async (category_id) => {
          const options = {category_id};
          const fetchedAdverts = await server.searchAdverts('category',options);
          setFilter((prev) => ({...prev, adverts: fetchedAdverts}));
     }

     const resetFilter = () => {
          setFilter((prev) => ({
               ...prev,
               price: 0,
               adverts: adverts,
               subCategories:[],
               advertView: false
          }));
     }

     useEffect(() => {
          if(category_id === ""){
               setFilter((prev) => ({...prev, adverts: adverts}));
          }else{
               fetchAdverts(category_id);
          }
     }, [category_id]);
     return(
          <FilterContext.Provider value={[filter, setFilter, setCategory_id]}>{children}</FilterContext.Provider>
     )
}

FilterProvider.propTypes ={
     children:PropTypes.node.isRequired,
}
export default FilterContext;
