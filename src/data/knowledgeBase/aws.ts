import { KnowledgeItem } from '../types';

export const awsItems: KnowledgeItem[] = [
  {
    id: 'aws-ec2-setup',
    title: 'AWS EC2 Instance Setup & Management',
    category: 'aws',
    type: 'guide',
    description: 'Launch and configure EC2 instances with security groups, key pairs, and best practices',
    code: `# AWS CLI setup
aws configure
# Enter your Access Key ID, Secret Access Key, default region
// ... (rest of code omitted for brevity, see main file for full content)
sudo systemctl enable nginx`,
    explanation: 'EC2 instances are virtual servers in AWS cloud. This guide covers launching instances, configuring security groups, and setting up basic web services.',
    bestPractices: [
      'Use IAM roles instead of access keys when possible',
      'Configure security groups with minimal required access',
      'Use key pairs for SSH access',
      'Tag instances for better resource management',
      'Use appropriate instance types for your workload',
      'Enable CloudWatch monitoring',
      'Use Elastic IPs for static public IPs'
    ],
    commonPitfalls: [
      'Opening all ports (0.0.0.0/0) in security groups',
      'Not using key pairs for SSH access',
      'Forgetting to terminate unused instances',
      'Not backing up important data',
      'Using default security group settings'
    ],
    codeExamples: [
      {
        title: 'EC2 User Data Script',
        code: `#!/bin/bash
# Install updates
yum update -y
// ... (rest of code omitted for brevity, see main file for full content)
yum install -y git python3-pip`,
        language: 'bash',
        explanation: 'User data scripts run when instances first launch, allowing automated setup and configuration.'
      }
    ],
    tags: ['aws', 'ec2', 'cloud', 'deployment', 'security'],
    difficulty: 'intermediate',
    language: 'bash'
  },
  {
    id: 'aws-s3-storage',
    title: 'AWS S3 Bucket Management & Operations',
    category: 'aws',
    type: 'guide',
    description: 'Create and manage S3 buckets for file storage, static website hosting, and data backup',
    code: `# Create S3 bucket
aws s3 mb s3://my-unique-bucket-name-12345
// ... (rest of code omitted for brevity, see main file for full content)
    }
  ]
}'`,
    explanation: 'S3 provides scalable object storage for files, images, backups, and static website hosting. It offers high durability and availability with various storage classes.',
    bestPractices: [
      'Use unique bucket names globally',
      'Enable versioning for important data',
      'Configure lifecycle policies for cost optimization',
      'Use appropriate storage classes (Standard, IA, Glacier)',
      'Set up cross-region replication for disaster recovery',
      'Use bucket policies for access control',
      'Enable server-side encryption',
      'Use CloudFront for content delivery'
    ],
    commonPitfalls: [
      'Making buckets public without proper security review',
      'Not using versioning for critical data',
      'Storing all data in Standard storage class',
      'Not setting up proper CORS policies',
      'Forgetting to configure lifecycle policies'
    ],
    tags: ['aws', 's3', 'storage', 'cloud', 'backup'],
    difficulty: 'intermediate',
    language: 'bash'
  },
  {
    id: 'aws-lambda-functions',
    title: 'AWS Lambda Serverless Functions',
    category: 'aws',
    type: 'guide',
    description: 'Create and deploy serverless functions with AWS Lambda for event-driven applications',
    code: `# Python Lambda function
import json
import boto3
// ... (rest of code omitted for brevity, see main file for full content)
aws apigateway create-rest-api \\
  --name my-api \\
  --description "API for Lambda function"`,
    explanation: 'AWS Lambda allows you to run code without provisioning servers. Functions are triggered by events and automatically scale based on demand.',
    bestPractices: [
      'Keep functions small and focused',
      'Use environment variables for configuration',
      'Implement proper error handling',
      'Use appropriate timeout values',
      'Optimize cold start times',
      'Use layers for shared dependencies',
      'Implement proper logging',
      'Use dead letter queues for failed executions'
    ],
    commonPitfalls: [
      'Creating functions that are too large',
      'Not handling errors properly',
      'Using synchronous calls when async would work',
      'Not setting appropriate timeouts',
      'Forgetting to configure environment variables'
    ],
    codeExamples: [
      {
        title: 'Lambda with DynamoDB Integration',
        code: `import boto3
import json
// ... (rest of code omitted for brevity, see main file for full content)
        }`,
        language: 'python',
        explanation: 'Lambda functions can integrate with other AWS services like DynamoDB for data persistence. This serverless architecture allows for event-driven processing, automatic scaling, and cost-effective execution without managing server infrastructure.'
      }
    ],
    tags: ['aws', 'lambda', 'serverless', 'functions', 'api'],
    difficulty: 'intermediate',
    language: 'python'
  }
]; 