
export const conditionalSort = (arr, cond) => {
     return arr.sort((a,b) => {
          if(a[cond] < b[cond]){
               return -1;
          }

          if(a[cond] > b[cond]){
               return 1;
          } 
          return 0;
     })
}

export const filterPrices =  (arr) => {
     const totalAds = arr.length;
     const sortedArr = conditionalSort(arr, 'ad_price');
     let maxPrice = sortedArr[totalAds - 1].ad_price;
     switch(true){
          case maxPrice <= 100000:
               maxPrice = 100000;
               break;
          case maxPrice > 100000 && maxPrice <= 1000000:
               maxPrice = 1000000;
               break;
          case maxPrice > 1000000 && maxPrice <= 10000000:
               maxPrice = 10000000;
               break;
          case maxPrice > 10000000 && maxPrice <= 100000000:
               maxPrice = 100000000;
               break;
          case maxPrice > 100000000 && maxPrice <= 1000000000:
               maxPrice = 1000000000;
               break;
          case maxPrice > 1000000000 && maxPrice <= 10000000000:
               maxPrice = 10000000000;
               break;
          default:
               break;
     }
     let increment = maxPrice / 5;
     let startingPrice = 0;

     let filteredPrices = [];
     
     for (let i = 0; i <= 5; i++) {
         filteredPrices.push(startingPrice + i * increment);
     }
     return filteredPrices;
}
export const filterByPrice = (ads,filterData) => {
     if(filterData.max !== undefined && filterData.max !== 0){
          return ads.filter((item) => item.ad_price >= filterData.min && item.ad_price <= filterData.max);
     }else{
          return ads.filter(item => item.ad_price >= filterData.min )
     }
     
} 

export const sortByAny = (arr, key) => {
     return arr.sort((a, b) => {
     const valA = a[key];
     const valB = b[key];

     if (typeof valA === 'string' && typeof valB === 'string') {
          return valB.localeCompare(valA);
     }

     if (valA < valB) {
          return 1;
     }
     if (valA > valB) {
          return -1;
     }
     return 0;
     });
}

export const searchByKey = (arr, key, searchValue) => {
     if(searchValue && searchValue !== " " && searchValue !== ""){
          return arr.filter(item => {
               if(typeof(item[key]) === "string"){
                    return item[key].toLowerCase().includes(searchValue.toLowerCase());
               }else{
                    return false;
               }
               
          })
     }else{    
          return arr;
     }
}