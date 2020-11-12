import * as cdk from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import { CfnOutput } from '@aws-cdk/core';

export function createBucketUseStack(
  scope: cdk.Construct,
  id: string,
  bucket: Bucket,
) {
  const stack = new cdk.Stack(scope, id);

  new CfnOutput(stack, 'MyBucketArn', {
    value: bucket.bucketArn,
  });
}
