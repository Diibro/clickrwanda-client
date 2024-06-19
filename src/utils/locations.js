import axios from "axios";
const api = 'https://rwanda.p.rapidapi.com/';
import locations from "../data/Location.json";

const provincesOptions = {
  method: 'GET',
  url: `${api}provinces`,
  headers: {
    'X-RapidAPI-Key': '54bd11d350msh57b6121d40064c5p1ac709jsnfa82ce0de082',
    'X-RapidAPI-Host': 'rwanda.p.rapidapi.com'
  }
};

const allLocationsOptions = {
     method: 'GET',
     url: `${api}provinces`,
     headers: {
       'X-RapidAPI-Key': '54bd11d350msh57b6121d40064c5p1ac709jsnfa82ce0de082',
       'X-RapidAPI-Host': 'rwanda.p.rapidapi.com'
     }
   };
const districtsOptions = {
     method: 'GET',
     url: `${api}districts`,
     headers: {
       'X-RapidAPI-Key': '54bd11d350msh57b6121d40064c5p1ac709jsnfa82ce0de082',
       'X-RapidAPI-Host': 'rwanda.p.rapidapi.com'
     }
   };




export const getLocations = () => {
     try {
          return locations
     } catch (error) {
          console.error(error);
     }
}