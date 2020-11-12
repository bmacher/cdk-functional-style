import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

export function createBucket(scope: cdk.Construct, id: string) {
  const bucket = new s3.Bucket(scope, id, {
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
  });

  return {
    bucket,
  };
}
