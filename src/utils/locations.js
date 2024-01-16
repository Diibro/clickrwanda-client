import axios from "axios";
const api = 'https://rwanda.p.rapidapi.com/';

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




export const getLocations = async () => {
     try {
          // const provinces = await axios.request(provincesOptions);
          const districts = await axios.request(districtsOptions);
          // const locations = await axios.request(allLocationsOptions);
          return {districts:districts.data}
     } catch (error) {
          console.error(error);
     }
}