#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Textcase } from '../lib/textcase';

const app = new cdk.App();
new Textcase(app, 'Textcase', {
  domainName: 'vberkoz.com',
  subdomain: 'textcase',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});