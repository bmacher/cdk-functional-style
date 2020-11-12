import * as cdk from '@aws-cdk/core';
import { ClassBucketConstruct } from './class-bucket-construct';

export class ClassBucketStack extends cdk.Stack {
  public readonly construct: ClassBucketConstruct;

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    this.construct = new ClassBucketConstruct(this, 'ClassBucketConstruct');
  }
}
