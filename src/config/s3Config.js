// export const s3Config =  {
//      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
//      secretAccessKey: "orvN1NiJ9eTnyvzLsI5S5/SUaXnNQvhhhaF7jOwb",
//      bucketName: "clickrwanda.s3.com",
//      dirName: "adverts",
//      region: "eu-north-1",
//      s3Url: "https://s3.eu-north-1.amazonaws.com/clickrwanda.s3.com/"
// }

// export const s3Folders = {
//      adverts: "adverts",
//      banners: "banners",
//      categories: "categories",
//      logos: "logos",
//      payPlans: "pay-plans",
//      quotations: "quotations"
// }

// aws-config.js
// import AWS from 'aws-sdk';

// // import { CognitoIdentityServiceProvider } from 'aws-sdk';

// AWS.config.update({
//      accessKeyId: "AKIA6ODVAPPY43PDXM4L",
//      secretAccessKey: "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",
//      region: "eu-north-1",
// });

// const s3 = new AWS.S3();
// // const s3 = new CognitoIdentityServiceProvider.S3();

// export default s3;

import AWS from 'aws-sdk';

const s3 = new AWS.S3({
     accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
     secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
     region: import.meta.env.VITE_REGION,
});

export const s3Config = {
     bucketName: import.meta.env.VITE_BUCKET_NAME,
     dirName: 'adverts',
     region: import.meta.env.VITE_REGION,
     s3Url: `https://s3.${import.meta.env.VITE_REGION}.amazonaws.com/${import.meta.env.VITE_BUCKET_NAME}/`,
};

export const s3Folders = {
     adverts: 'adverts',
     banners: 'banners',
     categories: 'categories',
     logos: 'logos',
     payPlans: 'pay-plans',
     quotations: 'quotations'
};

export default s3;
