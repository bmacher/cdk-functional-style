import '@aws-cdk/assert/jest';
import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import { createBucketStack } from '../create-bucket-stack';

describe('createBucketStack', () => {
  const app = new cdk.App();

  it('should return an object with a S3 Bucket', () => {
    const stack = createBucketStack(app, 'MyStack');

    expect(stack.bucket).toBeDefined();
    expect(stack.bucket).toBeInstanceOf(s3.Bucket);
  });
});
