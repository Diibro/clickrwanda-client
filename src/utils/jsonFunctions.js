export const jsonParser = (string) =>{
     try {
          return JSON.parse(string);
     } catch (error) {
          console.log(error);
          string = string.replace(/'/g, '"');
          console.log(string);
          return JSON.parse(string);
     }
}