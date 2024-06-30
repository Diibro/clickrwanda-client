// import AWS from 'aws-sdk';

// if (
//      !import.meta.env.VITE_AWS_ACCESS_KEY_ID ||
//      !import.meta.env.VITE_AWS_SECRET_ACCESS_KEY ||
//      !import.meta.env.VITE_REGION ||
//      !import.meta.env.VITE_BUCKET_NAME
// ) {
//      throw new Error("Missing required environment variables for AWS S3 configuration");
// }

// const s3 = new AWS.S3({
//      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
//      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
//      region: import.meta.env.VITE_REGION,
// });

// export const s3Config = {
//      bucketName: import.meta.env.VITE_BUCKET_NAME,
//      dirName: 'adverts',
//      region: import.meta.env.VITE_REGION,
//      s3Url: `https://s3.${import.meta.env.VITE_REGION}.amazonaws.com/${import.meta.env.VITE_BUCKET_NAME}/`,
// };

export const s3Folders = {
     adverts: 'adverts',
     banners: 'banners',
     categories: 'categories',
     logos: 'logos',
     payPlans: 'pay-plans',
     quotations: 'quotations'
};

// s3.listBuckets((err, data) => {
//      if (err) {
//        console.error('Error listing buckets:', err);
//      } else {
//        console.log('Buckets:', data.Buckets);
//      }
//    });

// export default s3;
