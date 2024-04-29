// export const filterPrices = (arr) => {
//      const total_Ads = arr.length;
//      const sortedArr = conditionalSort(arr, "ad_price");
//      let min_price = sortedArr[0].ad_price;
//      let max_price = sortedArr[total_Ads - 1].ad_price;

//      let priceDiff = (max_price - min_price) / 5;

//      let filteredPrices = [];

//      let price = min_price;
//      for (let i = 0; i < 5; i++){
//           filteredPrices.push(Math.ceil(price / 1000) * 1000);
//           price +=  priceDiff;
//      }

//      return filteredPrices;
// }

export const filterPrices = (arr) => {
     const total_Ads = arr.length;
     const sortedArr = conditionalSort(arr, "ad_price");
     let min_price = sortedArr[0].ad_price;
     let max_price = sortedArr[total_Ads - 1].ad_price;
 
     let priceDiff = max_price - min_price;
     let numIntervals = 5; // Number of intervals you want
 
     // Determine the increment value based on the difference
     let increment = Math.ceil(priceDiff / numIntervals);
 
     // Round down the min_price to the nearest increment value
     let startingPrice = Math.floor(min_price / increment) * increment;
 
     let filteredPrices = [];
 
     // Generate the price range based on the number of intervals
     for (let i = 0; i <= numIntervals; i++) {
         filteredPrices.push(startingPrice + i * increment);
     }
 
     return filteredPrices;
 }
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

export const filterByPrice = (ads,filterData) => {
     if(filterData.max !== undefined && filterData.max !== 0){
          return ads.filter((item) => item.ad_price >= filterData.min && item.ad_price <= filterData.max);
     }else{
          return ads.filter(item => item.ad_price >= filterData.min )
     }
     
} 