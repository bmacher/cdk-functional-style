#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkFunctionalStack } from '../lib/cdk-functional-stack';

const app = new cdk.App();
new CdkFunctionalStack(app, 'CdkFunctionalStack');
