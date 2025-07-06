import { KnowledgeItem } from '../types';

export const packagesKnowledgeItems: KnowledgeItem[] = [
  {
    id: 'packages-pip-mastery',
    title: 'Python Package Management with pip',
    category: 'packages',
    type: 'guide',
    description: 'Master pip package management with requirements files, virtual environments, and dependency resolution',
    code: `# Basic pip commands
pip install package_name
pip install package_name==1.2.3  # Specific version
pip install package_name>=1.2.0  # Version range
pip install -r requirements.txt  # Install from file
pip install --upgrade package_name  # Upgrade package
pip uninstall package_name  # Remove package
pip list  # List installed packages
pip show package_name  # Show package info
pip freeze > requirements.txt  # Export dependencies

# Virtual environment workflow
python -m venv myenv
source myenv/bin/activate  # Mac/Linux
myenv\\Scripts\\activate     # Windows

# Install packages in virtual environment
pip install django requests numpy pandas

# Generate requirements file
pip freeze > requirements.txt

# Install from requirements file
pip install -r requirements.txt

# Development vs Production requirements
# requirements.txt (production)
django==4.2.0
requests==2.31.0
gunicorn==21.2.0

# requirements-dev.txt (development)
-r requirements.txt
pytest==7.4.0
black==23.7.0
flake8==6.0.0
pre-commit==3.3.3

# Install development dependencies
pip install -r requirements-dev.txt

# Advanced pip features
pip install --no-cache-dir package_name  # Skip cache
pip install --user package_name  # Install for user only
pip install --editable .  # Install in editable mode
pip download package_name  # Download without installing
pip check  # Check for broken dependencies

# Security best practices
pip install --require-hashes -r requirements.txt  # Verify hashes
pip audit  # Check for security vulnerabilities
pip list --outdated  # Check for outdated packages`,
    explanation: 'pip is the standard Python package installer. Understanding its commands is crucial for managing dependencies, security, and project maintenance.',
    bestPractices: [
      'Always use virtual environments',
      'Pin package versions in requirements.txt',
      'Separate dev and production dependencies',
      'Regularly update packages for security',
      'Use pip audit for vulnerability checks',
      'Document package purposes in requirements',
      'Use --require-hashes for security',
      'Keep requirements files updated'
    ],
    commonPitfalls: [
      'Installing packages globally',
      'Not pinning package versions',
      'Mixing dev and production dependencies',
      'Not checking for security vulnerabilities',
      'Using outdated pip versions'
    ],
    codeExamples: [
      {
        title: 'Requirements File Structure',
        code: `# requirements.txt - Production dependencies
Django==4.2.0
requests==2.31.0
psycopg2-binary==2.9.7
redis==4.6.0
celery==5.3.0
gunicorn==21.2.0

# requirements-dev.txt - Development dependencies
-r requirements.txt
pytest==7.4.0
pytest-django==4.5.2
black==23.7.0
flake8==6.0.0
mypy==1.5.0
pre-commit==3.3.3
coverage==7.3.0

# requirements-test.txt - Testing dependencies
-r requirements.txt
pytest==7.4.0
pytest-cov==4.1.0
factory-boy==3.3.0
faker==19.6.0`,
        language: 'text',
        explanation: 'Separate requirements files for production and development ensure clean deployments while providing development tools.'
      }
    ],
    tags: ['python', 'pip', 'packages', 'dependencies', 'requirements'],
    difficulty: 'beginner',
    language: 'bash'
  },
  {
    id: 'packages-npm-mastery',
    title: 'Node.js Package Management with npm',
    category: 'packages',
    type: 'guide',
    description: 'Master npm package management with package.json, scripts, and dependency management',
    code: `# Basic npm commands
npm install package_name
npm install package_name@1.2.3  # Specific version
npm install --save package_name  # Save to dependencies
npm install --save-dev package_name  # Save to devDependencies
npm install -g package_name  # Install globally
npm uninstall package_name  # Remove package
npm update package_name  # Update package
npm list  # List installed packages
npm outdated  # Check for outdated packages
npm audit  # Security audit

# Initialize new project
npm init  # Interactive initialization
npm init -y  # Use defaults

# Package.json structure
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack --mode production",
    "lint": "eslint src/",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.4.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.0",
    "eslint": "^8.45.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "keywords": ["nodejs", "express"],
  "author": "Your Name",
  "license": "MIT"
}

# Advanced npm features
npm ci  # Clean install (faster, more reliable)
npm run script_name  # Run custom scripts
npm run build && npm start  # Chain commands
npm cache clean --force  # Clear cache
npm shrinkwrap  # Lock dependency tree
npm ls --depth=0  # List top-level packages only

# Workspace management (monorepo)
# package.json (root)
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "scripts": {
    "build": "npm run build --workspaces",
    "test": "npm run test --workspaces"
  }
}

# Security and best practices
npm audit fix  # Fix security vulnerabilities
npm audit fix --force  # Force fix (may break things)
npm fund  # Show funding information
npm doctor  # Check environment`,
    explanation: 'npm is the default package manager for Node.js. It handles dependencies, scripts, and provides tools for project management and security.',
    bestPractices: [
      'Use package-lock.json for reproducible builds',
      'Separate dev and production dependencies',
      'Use semantic versioning',
      'Regularly run npm audit',
      'Use npm ci in production',
      'Define clear scripts in package.json',
      'Use workspaces for monorepos',
      'Keep dependencies updated'
    ],
    commonPitfalls: [
      'Installing packages globally unnecessarily',
      'Not using package-lock.json',
      'Mixing dev and production dependencies',
      'Not running security audits',
      'Using outdated npm versions'
    ],
    codeExamples: [
      {
        title: 'Well-Organized Package.json',
        code: `{
  "name": "my-express-api",
  "version": "1.0.0",
  "description": "RESTful API with Express.js",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/",
    "build": "webpack --mode production",
    "clean": "rm -rf dist/",
    "prebuild": "npm run clean",
    "postinstall": "npm run build"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.4.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.0",
    "supertest": "^6.3.3",
    "eslint": "^8.45.0",
    "prettier": "^3.0.0",
    "webpack": "^5.88.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "keywords": ["express", "api", "nodejs"],
  "author": "Your Name",
  "license": "MIT"
}`,
        language: 'json',
        explanation: 'Well-organized package.json with clear scripts for development, testing, and production workflows. This structure provides a standardized way to manage project dependencies, define build processes, and ensure consistent development environments across team members.'
      }
    ],
    tags: ['nodejs', 'npm', 'packages', 'dependencies', 'package.json'],
    difficulty: 'beginner',
    language: 'javascript'
  }
]; 