export const jsonParserV1 = (string) =>{
     if(string){
          let newString = JSON.stringify(string);
          try {

               return JSON.parse(string);
          } catch (error) {
               return JSON.parse(newString.trim());
          }
     }else{
          return [];
     }
     
}

export const jsonParserV2 = (string) =>{
     if(string){
          let newString = JSON.stringify(string);
          try {

               return JSON.parse(string);
          } catch (error) {
               return JSON.parse(newString.trim());
          }
     }else{
          return {status: "currently no description"};
     }
     
}

export const parseString = (string) =>{
     if(string){
          try {
               let newString = JSON.stringify(string);
               try {

                    return JSON.parse(string);
               } catch (error) {
                    return JSON.parse(newString.trim());
               }
          } catch (error) {
               console.log(error);
               return null;
          }
     }else{
          return null;
     }
     
}