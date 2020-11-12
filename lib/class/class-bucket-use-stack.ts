import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

interface StackProps extends cdk.StackProps {
  bucket: s3.Bucket;
}

export class ClassBucketUseStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new cdk.CfnOutput(this, 'MyBucketArn', {
      value: props.bucket.bucketArn,
    });
  }
}
