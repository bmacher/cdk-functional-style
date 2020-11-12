# AWS CDK - The functional way!

This repo includes two approaches to work with AWS CDK. One is written in the standard objected-oriented way and the other in a functional style. What I like about the function style is that you can omit the the adaption of the `cdk.StackProps` when putting one resource from one stack into another. This becomes worse when using nested construct because then you have to push whatever resource you want to expose on stack along the constructs to the final stack class (`public readonly resource: any;`). The stack class (+ deeper constructs) that uses the resource needs the adaption of its props as I told before. With functional style we can make use of [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html) to omit the sometimes annoying type annotations. This will be shown in the following but first there is an example with object-oriented style.

The use case: 
1. `Stack a` initiates a `construct` that creates a `S3 Bucket`.
2. `Stack b` uses the `S3 Bucket` from `Stack a` and shows its ARN in the `Outputs`.

*Code will be explained with comments.*

## AWS CDK - Object-oriented style

### Bucket Construct

```ts
import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

export class ClassBucketConstruct extends cdk.Construct {
  // Expose the Bucket
  public readonly bucket: s3.Bucket;

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    this.bucket = new s3.Bucket(this, 'MyBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });
  }
}
```

### Bucket Stack

```ts
import * as cdk from '@aws-cdk/core';
import { ClassBucketConstruct } from './class-bucket-construct';

export class ClassBucketStack extends cdk.Stack {
  // Expose the Construct, could just be the Bucket as well
  public readonly construct: ClassBucketConstruct;

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    this.construct = new ClassBucketConstruct(this, 'ClassBucketConstruct');
  }
}
```

### Bucket Use Stack

```ts
import * as cdk from '@aws-cdk/core';

// Extend to use bucket
interface StackProps extends cdk.StackProps {
  bucketArn: string;
}

export class ClassBucketUseStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new cdk.CfnOutput(this, 'MyBucketArn', {
      value: props.bucketArn,
    });
  }
}
```

### Stack initiation

```ts
const app = new cdk.App();

const classBucketStack = new ClassBucketStack(app, 'ClassBucketStack');
new ClassBucketUseStack(app, 'ClassBucketUseStack', {
  // Put Bucket into Stack B
  bucket: classBucketStack.construct.bucket,
});
```

## AWS CDK - Function style

### Create Bucket Construct

```ts
import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

// Return type will be implict (: { bucket: s3.Bucket })
export function createBucket(scope: cdk.Construct, id: string) {
  const bucket = new s3.Bucket(scope, id, {
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
  });

  return {
    // Expose the Bucket
    bucket,
  };
}
```

### Create Bucket Stack

```ts
import * as cdk from '@aws-cdk/core';
import { createBucket } from './create-bucket-construct';

// Return type will be implict (: { bucket: s3.Bucket })
export function createBucketStack(scope: cdk.Construct, id: string) {
  const stack = new cdk.Stack(scope, id);

  const { bucket } = createBucket(stack, 'MyBucket');

  return {
    // Expose the Bucket
    bucket,
  };
}
```

### Create Bucket Use Stack

```ts
import * as cdk from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import { CfnOutput } from '@aws-cdk/core';

export function createBucketUseStack(
  scope: cdk.Construct,
  id: string,
  // Instead of StackProps we can use the Bucket as param
  bucket: Bucket,
) {
  const stack = new cdk.Stack(scope, id);

  new CfnOutput(stack, 'MyBucketArn', {
    value: bucket.bucketArn,
  });
}
```

### Stack initiation

```ts
const app = new cdk.App();

const { bucket } = createBucketStack(app, 'FunctionalBucketStack');
createBucketUseStack(app, 'FunctionalBucketUseStack', 
  // Put Bucket into Stack B
  bucket
);
```
