export const saveData = (key, value, expiryInSeconds) => {
     const now = new Date();
     const expiryTime = now.getTime() + expiryInSeconds * 1000;
     localStorage.setItem(key, JSON.stringify({ value, expiryTime }));
}

export const getData = (key) => {
     const storedData = localStorage.getItem(key);
     if (storedData) {
          const { value, expiryTime } = JSON.parse(storedData);
          const now = new Date().getTime();
     if (now < expiryTime) {
          return value;
     } else {
          localStorage.removeItem(key);
     }
     }

     return null;
}

export const getDataLocal = (key) => {
     const storedData = localStorage.getItem(key);
     if (storedData) {
          const { value, expiryTime } = JSON.parse(storedData);
          const now = new Date().getTime();
          if (now < expiryTime) {
               return {value, expired: false};
          } else {
               return {value, expired: true};
          }
     }

     return null;
}
