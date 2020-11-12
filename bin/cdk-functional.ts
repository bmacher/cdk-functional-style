#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ClassBucketStack } from '../lib/class/class-bucket-stack';
import { ClassBucketUseStack } from '../lib/class/class-bucket-use-stack';
import { createBucketStack } from '../lib/functional/create-bucket-stack';
import { createBucketUseStack } from '../lib/functional/create-bucket-use-stack';

const app = new cdk.App();

const classBucketStack = new ClassBucketStack(app, 'ClassBucketStack');
new ClassBucketUseStack(app, 'ClassBucketUseStack', {
  bucket: classBucketStack.construct.bucket,
});

const { bucket } = createBucketStack(app, 'FunctionalBucketStack');
createBucketUseStack(app, 'FunctionalBucketUseStack', bucket);
