export const getAdvertsInfo = (adverts) => {
     const dividedAds = {
          newAdverts: [],
          todayDeals: [],
          websiteAds: [],
          boosted: [],
     }

     if(adverts) {
          for(const item of adverts){
               if (item.plan_name === 'VIP' || item.plan_name === 'basic' || item.plan_name === 'VVIP'){
                    dividedAds.boosted.push(item);
               }else if(item.plan_name === 'sponsored'){
                    dividedAds.websiteAds.push(item);
               }else if (item.plan_name === 'urgent' || item.ad_discount > 0){
                    dividedAds.todayDeals.push(item);
               }else {
                    dividedAds.newAdverts.push(item);
               }
          }
     }

     return dividedAds;
}

export const getSimilarAds = (adverts, advert) => {
     const similarAds = {
          sameCategory: [],
          sameVendor: []
     }
     if(adverts && adverts[0]){
          adverts.forEach(ad => {
               if(ad.ad_id !== advert.ad_id) {
                    if(ad.user_id === advert.user_id){
                         similarAds.sameVendor.push(ad);
                    }else if(ad.sub_id === advert.sub_id){
                         similarAds.sameCategory.push(ad);
                    }
               }
          });
     }
     return similarAds;
}