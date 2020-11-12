#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BucketStack, BucketUseStack } from '../lib/object-oriented';
import { createBucketStack, createBucketUseStack } from '../lib/functional';

const app = new cdk.App();

const objectOrientedBucketStack = new BucketStack(app, 'ObjectOrientedBucketStack');
new BucketUseStack(app, 'ObjectOrientedBucketUseStack', {
  bucket: objectOrientedBucketStack.construct.bucket,
});

const { bucket } = createBucketStack(app, 'FunctionalBucketStack');
createBucketUseStack(app, 'FunctionalBucketUseStack', bucket);
