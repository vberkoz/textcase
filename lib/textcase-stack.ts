import { DockerImage, Duration, RemovalPolicy, Stack, type StackProps } from "aws-cdk-lib";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";
import { Distribution, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { S3BucketOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import type { Construct } from "constructs";
import * as path from 'node:path';

interface TextcaseStackProps extends StackProps {
    domainName: string;
    subdomain: string;
    env: {
        account: string | undefined;
        region: string | undefined;
    };
}

export class TextcaseStack extends Stack {
    constructor(scope: Construct, id: string, props: TextcaseStackProps) {
        super(scope, id, props);

        const siteDomain = `${props.subdomain}.${props.domainName}`;
        const hostedZone = HostedZone.fromLookup(this, 'Zone', {
            domainName: props.domainName,
        });

        const cert = new Certificate(this, 'SiteCertificate', {
            domainName: siteDomain,
            validation: CertificateValidation.fromDns(hostedZone),
        });

        const siteBucket = new Bucket(this, 'SiteBucket', {
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'index.html',
            publicReadAccess: false,
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });

        const distribution = new Distribution(this, 'Distribution', {
            defaultRootObject: 'index.html',
            defaultBehavior: {
                origin: S3BucketOrigin.withOriginAccessControl(siteBucket),
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            domainNames: [siteDomain],
            certificate: cert,
            errorResponses: [
                {
                    httpStatus: 404,
                    responseHttpStatus: 200,
                    responsePagePath: '/index.html',
                    ttl: Duration.minutes(5)
                },
                {
                    httpStatus: 403,
                    responseHttpStatus: 200,
                    responsePagePath: '/index.html',
                    ttl: Duration.minutes(5)
                },
            ],
        });

        new BucketDeployment(this, 'BucketDeployment', {
            sources: [
                Source.asset(path.join(process.cwd(), 'dist')),
            ],
            destinationBucket: siteBucket,
            distributionPaths: ['/*'],
            distribution,
        });

        new ARecord(this, 'AliasRecord', {
            zone: hostedZone,
            recordName: props.subdomain,
            target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
        });
    }
}