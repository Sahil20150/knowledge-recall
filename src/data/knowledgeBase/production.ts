import { KnowledgeItem } from '../types';

export const productionItems: KnowledgeItem[] = [
  {
    id: 'deployment-ci-cd',
    title: 'CI/CD Pipeline with GitHub Actions',
    category: 'production',
    type: 'guide',
    description: 'Set up continuous integration and deployment pipelines using GitHub Actions for automated testing and deployment',
    code: `# .github/workflows/deploy.yml
name: Deploy to Production
// ... (rest of code omitted for brevity, see main file for full content)
        EOF`,
    explanation: 'CI/CD pipelines automate the process of testing, building, and deploying applications, ensuring consistent and reliable deployments.',
    bestPractices: [
      'Run tests before deployment',
      'Use environment-specific configurations',
      'Implement rollback strategies',
      'Monitor deployment health',
      'Use secrets for sensitive data',
      'Implement proper logging',
      'Use blue-green deployments',
      'Automate database migrations'
    ],
    commonPitfalls: [
      'Not testing before deployment',
      'Deploying directly to production',
      'Not using environment variables',
      'Ignoring deployment logs',
      'Not having rollback procedures'
    ],
    codeExamples: [
      {
        title: 'Environment-Specific Configuration',
        code: `# config/production.py
import os
// ... (rest of code omitted for brevity, see main file for full content)
    },
}`,
        language: 'python',
        explanation: 'Environment-specific configurations ensure proper settings for different deployment stages.'
      }
    ],
    tags: ['deployment', 'ci-cd', 'github-actions', 'automation'],
    difficulty: 'intermediate',
    language: 'yaml'
  },
  {
    id: 'deployment-nginx-config',
    title: 'Nginx Production Configuration & SSL',
    category: 'production',
    type: 'guide',
    description: 'Configure Nginx as a reverse proxy with SSL certificates, load balancing, and security headers',
    code: `# /etc/nginx/sites-available/myapp
server {
    listen 80;
    server_name myapp.com www.myapp.com;
    return 301 https://$server_name$request_uri;
}
// ... (rest of code omitted for brevity, see main file for full content)
0 12 * * * /usr/bin/certbot renew --quiet`,
    explanation: 'Nginx serves as a reverse proxy, load balancer, and SSL terminator for production web applications, providing security, performance, and reliability.',
    bestPractices: [
      'Use SSL/TLS for all traffic',
      'Implement security headers',
      'Enable gzip compression',
      'Configure proper caching',
      'Set up rate limiting',
      'Use load balancing for high availability',
      'Monitor access logs',
      'Regular SSL certificate renewal'
    ],
    commonPitfalls: [
      'Not configuring SSL properly',
      'Missing security headers',
      'Not enabling compression',
      'Incorrect proxy settings',
      'Not monitoring logs'
    ],
    tags: ['nginx', 'ssl', 'reverse-proxy', 'load-balancing', 'security'],
    difficulty: 'intermediate',
    language: 'nginx'
  },
  {
    id: 'deployment-monitoring',
    title: 'Production Monitoring & Logging Setup',
    category: 'production',
    type: 'guide',
    description: 'Implement comprehensive monitoring and logging for production applications using Prometheus, Grafana, and ELK stack',
    code: `# Prometheus configuration
# prometheus.yml
// ... (rest of code omitted for brevity, see main file for full content)
  grafana_data:`,
    explanation: 'Production monitoring and logging are essential for maintaining application health, performance, and debugging issues in real-time.',
    bestPractices: [
      'Monitor key metrics (CPU, memory, response time)',
      'Set up alerting for critical issues',
      'Use structured logging (JSON)',
      'Implement health checks',
      'Monitor external dependencies',
      'Set up log aggregation',
      'Use distributed tracing',
      'Monitor business metrics'
    ],
    commonPitfalls: [
      'Not monitoring application metrics',
      'Ignoring log files',
      'Not setting up alerting',
      'Not monitoring external services',
      'Not implementing health checks'
    ],
    tags: ['monitoring', 'prometheus', 'grafana', 'logging', 'health-checks'],
    difficulty: 'advanced',
    language: 'python'
  }
]; 