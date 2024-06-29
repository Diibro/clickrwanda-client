export const s3Config =  {
     accessKeyId: "AKIA6ODVAPPY43PDXM4L",
     secretAccessKey: "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",
     bucketName: "clickrwanda.s3.com",
     dirName: "adverts",
     region: "eu-north-1",
     s3Url: "https://s3.eu-north-1.amazonaws.com/clickrwanda.s3.com/"
}

export const s3Folders = {
     adverts: "adverts",
     banners: "banners",
     categories: "categories",
     logos: "logos",
     payPlans: "pay-plans",
     quotations: "quotations"
}

// aws-config.js
import AWS from 'aws-sdk';

// import { CognitoIdentityServiceProvider } from 'aws-sdk';

AWS.config.update({
     accessKeyId: "AKIA6ODVAPPY43PDXM4L",
     secretAccessKey: "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",
     region: "eu-north-1",
});

const s3 = new AWS.S3();
// const s3 = new CognitoIdentityServiceProvider.S3();

export default s3;
