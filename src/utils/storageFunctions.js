import  LZString from 'lz-string';

export const saveData = (key, value, expiryInSeconds) => {
     try {
          const now = new Date();
          const expiryTime = now.getTime() + expiryInSeconds * 1000;
          const compressedData = LZString.compress(JSON.stringify({value, expiryTime}))
          localStorage.setItem(key, compressedData);
     } catch (error) {
          console.log(error)
     }
}

export const getData = (key) => {
     const storedData = localStorage.getItem(key);
     if (storedData) {
          const decompressedData = LZString.decompress(storedData)
          if(decompressedData){
               const { value, expiryTime } = JSON.parse(decompressedData);
               const now = new Date().getTime();
               if (now < expiryTime) {
                    return value;
               } else {
                    localStorage.removeItem(key);
               }
          }
     }

     return null;
}

export const getDataLocal = (key) => {
     const storedData = localStorage.getItem(key);
     if (storedData) {
          const decompressedData = LZString.decompress(storedData)
          if(decompressedData){
               const { value, expiryTime } = JSON.parse(decompressedData);
               const now = new Date().getTime();
               if (now < expiryTime) {
                    return {value, expired: false};
               } else {
                    return {value, expired: true};
               }
          }
          
     }

     return null;
}
