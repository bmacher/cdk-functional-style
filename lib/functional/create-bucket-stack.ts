import * as cdk from '@aws-cdk/core';
import { createBucket } from './create-bucket-construct';

export function createBucketStack(scope: cdk.Construct, id: string) {
  const stack = new cdk.Stack(scope, id);

  const { bucket } = createBucket(stack, 'MyBucket');

  return {
    bucket,
  };
}
