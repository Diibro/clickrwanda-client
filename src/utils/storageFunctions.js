export const saveData = (key, value, expiryInSeconds) => {
     const now = new Date();
     const expiryTime = now.getTime() + expiryInSeconds * 1000;
     sessionStorage.setItem(key, JSON.stringify({ value, expiryTime }));
}

export const getData = (key) => {
     const storedData = sessionStorage.getItem(key);
     if (storedData) {
          const { value, expiryTime } = JSON.parse(storedData);
          const now = new Date().getTime();
     if (now < expiryTime) {
          return value;
     } else {
          sessionStorage.removeItem(key);
     }
     }

     return null;
}