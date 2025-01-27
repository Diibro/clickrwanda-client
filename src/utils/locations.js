
// const api = 'https://rwanda.p.rapidapi.com/';
import locations from "../data/Location.json";

// const provincesOptions = {
//   method: 'GET',
//   url: `${api}provinces`,
//   headers: {
//     'X-RapidAPI-Key': '54bd11d350msh57b6121d40064c5p1ac709jsnfa82ce0de082',
//     'X-RapidAPI-Host': 'rwanda.p.rapidapi.com'
//   }
// };

// const allLocationsOptions = {
//      method: 'GET',
//      url: `${api}provinces`,
//      headers: {
//        'X-RapidAPI-Key': '54bd11d350msh57b6121d40064c5p1ac709jsnfa82ce0de082',
//        'X-RapidAPI-Host': 'rwanda.p.rapidapi.com'
//      }
//    };
// const districtsOptions = {
//      method: 'GET',
//      url: `${api}districts`,
//      headers: {
//        'X-RapidAPI-Key': '54bd11d350msh57b6121d40064c5p1ac709jsnfa82ce0de082',
//        'X-RapidAPI-Host': 'rwanda.p.rapidapi.com'
//      }
//    };




export const getLocations = () => {
      try {
            return locations
      } catch (error) {
            console.error(error);
      }
}

export const locationImages = {
      bugesera: "/districts/bugesera.jpg",
      gatsibo: "/districts/gatsibo.jpg",
      kayonza: "/districts/kayonza.jpeg",
      kirehe: "/districts/kirehe.webp",
      ngoma: "/districts/ngoma.jpg",
      nyagatare: "/districts/nyagatare.jpg",
      rwamagana: "/districts/rwamagana.jpg",
      gasabo: "/districts/gasabo.jpg",
      kicukiro: "/districts/kicukiro.jpg",
      nyarugenge: "/districts/nyarugenge.png",
      burera: "/districts/burera.jpg",
      gakenke: "/districts/gakenke.jpg",
      gicumbi: "/districts/gicumbi.jpg",
      musanze: "/districts/musanze.jpg",
      rulindo: "/districts/rulindo.jpeg",
      gisagara: "/districts/gisagara.webp",
      huye: "/districts/huye.jpg",
      kamonyi: "/districts/kamonyi.jpg",
      muhanga: "/districts/muhanga.jpg",
      nyamagabe: "/districts/nyamagabe.jpg",
      nyanza: "/districts/nyanza.jpg",
      nyaruguru: "/districts/nyaruguru.webp",
      ruhango: "/districts/ruhango.jpg",
      karongi: "/districts/karongi.jpg",
      ngororero: "/districts/ngororero.jpg",
      nyabihu: "/districts/nyabihu.jpeg",
      nyamasheke: "/districts/nyamasheke.jpg",
      rubavu: "/districts/rubavu.jpg",
      rusizi: "/districts/rusizi.jpeg",
      rutsiro: "/districts/rutsiro.jpg",
};