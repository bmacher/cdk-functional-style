import '@aws-cdk/assert/jest';
import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import { createBucket } from '../create-bucket-construct';

describe('createBucketConstruct', () => {
  const stack = new cdk.Stack();

  const { bucket } = createBucket(stack, 'MyBucket');

  it('should create a S3 Bucket', () => {
    expect(stack).toHaveResource('AWS::S3::Bucket', {
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    });
  });

  it('should return the created bucket', () => {
    expect(bucket).toBeDefined();
    expect(bucket).toBeInstanceOf(s3.Bucket);
  });
});
