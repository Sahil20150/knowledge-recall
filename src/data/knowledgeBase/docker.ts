import { KnowledgeItem } from '../types';

export const dockerItems: KnowledgeItem[] = [
  {
    id: 'docker-basics',
    title: 'Docker Fundamentals & Container Management',
    category: 'docker',
    type: 'guide',
    description: 'Learn Docker basics: images, containers, Dockerfile creation, and container orchestration',
    code: `# Install Docker (Ubuntu)
sudo apt update
sudo apt install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
// ... (rest of code omitted for brevity, see main file for full content)
docker volume prune`,
    explanation: 'Docker provides containerization technology that packages applications with their dependencies, ensuring consistent deployment across different environments.',
    bestPractices: [
      'Use specific image tags instead of latest',
      'Keep Dockerfiles minimal and efficient',
      'Use multi-stage builds for smaller images',
      'Run containers as non-root users',
      'Use .dockerignore to exclude unnecessary files',
      'Set appropriate resource limits',
      'Use health checks for containers',
      'Implement proper logging strategies'
    ],
    commonPitfalls: [
      'Using latest tag in production',
      'Running containers as root',
      'Not cleaning up unused images and containers',
      'Exposing unnecessary ports',
      'Not using .dockerignore files'
    ],
    codeExamples: [
      {
        title: 'Multi-stage Dockerfile',
        code: `# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`,
        language: 'dockerfile',
        explanation: 'Multi-stage builds create smaller production images by separating build and runtime environments. This approach reduces image size by excluding build tools and dependencies from the final image, improving security and deployment efficiency.'
      }
    ],
    tags: ['docker', 'containers', 'deployment', 'devops'],
    difficulty: 'beginner',
    language: 'dockerfile'
  },
  {
    id: 'docker-compose-orchestration',
    title: 'Docker Compose Multi-Container Applications',
    category: 'docker',
    type: 'guide',
    description: 'Orchestrate multiple containers with Docker Compose for development and production',
    code: `# docker-compose.yml
version: '3.8'
// ... (rest of code omitted for brevity, see main file for full content)
docker-compose build --no-cache`,
    explanation: 'Docker Compose simplifies multi-container application management by defining services, networks, and volumes in a single YAML file.',
    bestPractices: [
      'Use specific image versions',
      'Define health checks for services',
      'Use environment files for configuration',
      'Implement proper service dependencies',
      'Use named volumes for persistent data',
      'Configure resource limits',
      'Use restart policies appropriately',
      'Separate development and production configs'
    ],
    commonPitfalls: [
      'Not using health checks',
      'Exposing database ports unnecessarily',
      'Not backing up volumes',
      'Using root user in containers',
      'Not setting resource limits'
    ],
    codeExamples: [
      {
        title: 'Production Docker Compose',
        code: `version: '3.8'
// ... (rest of code omitted for brevity, see main file for full content)
      retries: 3`,
        language: 'yaml',
        explanation: 'Production configurations include resource limits, health checks, and restart policies.'
      }
    ],
    tags: ['docker', 'compose', 'orchestration', 'microservices'],
    difficulty: 'intermediate',
    language: 'yaml'
  },
  {
    id: 'docker-production-deployment',
    title: 'Docker Production Deployment Strategies',
    category: 'docker',
    type: 'guide',
    description: 'Deploy Docker containers to production with best practices for security, monitoring, and scaling',
    code: `# Production Dockerfile
FROM node:18-alpine AS base
// ... (rest of code omitted for brevity, see main file for full content)
          periodSeconds: 10`,
    explanation: 'Production Docker deployments require security hardening, monitoring, scaling strategies, and proper resource management.',
    bestPractices: [
      'Use non-root users in containers',
      'Implement health checks',
      'Use secrets management for sensitive data',
      'Set resource limits and requests',
      'Implement proper logging',
      'Use image scanning for vulnerabilities',
      'Implement rolling updates',
      'Monitor container metrics'
    ],
    commonPitfalls: [
      'Running containers as root',
      'Not implementing health checks',
      'Storing secrets in images',
      'Not setting resource limits',
      'Not monitoring container health'
    ],
    tags: ['docker', 'production', 'deployment', 'kubernetes', 'swarm'],
    difficulty: 'advanced',
    language: 'dockerfile'
  }
]; 