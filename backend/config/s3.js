import AWS from "aws-sdk";

AWS.config.update({
    region: process.env.AWS_REGION,
})

const s3= new AWS.S3({       
    signatureVersion: "v4",
})

// no iam access key here beacuse we have iam role attached to our ec2 instance which has access to s3, so aws sdk will automatically pick up the credentials from the iam role

export default s3;