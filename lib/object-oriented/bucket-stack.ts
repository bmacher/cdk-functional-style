import * as cdk from '@aws-cdk/core';
import { BucketConstruct } from './bucket-construct';

export class BucketStack extends cdk.Stack {
  public readonly construct: BucketConstruct;

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    this.construct = new BucketConstruct(this, 'BucketConstruct');
  }
}
