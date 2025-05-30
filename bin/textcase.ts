#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TextcaseStack } from '../lib/textcase-stack';

const app = new cdk.App();
new TextcaseStack(app, 'TextcaseStack', {
  domainName: 'vberkoz.com',
  subdomain: 'textcase',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});