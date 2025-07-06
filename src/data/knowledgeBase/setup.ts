import { KnowledgeItem } from '../types';

export const setupKnowledgeItems: KnowledgeItem[] = [
  {
    id: 'setup-python-install',
    title: 'Python Installation (Cross-Platform)',
    category: 'setup',
    type: 'guide',
    description: 'Install Python on Mac, Windows, and Linux with version management using pyenv, winget, and package managers',
    code: `# Mac/Linux - Using pyenv (recommended)
curl https://pyenv.run | bash

# Add to ~/.bashrc or ~/.zshrc
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"

# Install Python
pyenv install 3.11.0
pyenv global 3.11.0

# Windows - Using winget (Windows 10+)
winget install Python.Python.3.11

# Windows - Using chocolatey
choco install python

# Ubuntu/Debian
sudo apt update
sudo apt install python3.11 python3.11-venv python3-pip

# Verify installation
python --version
pip --version`,
    explanation: 'pyenv is the best tool for managing multiple Python versions on Mac/Linux. It allows you to switch between Python versions per project. On Windows, winget is the modern package manager, while chocolatey is a popular alternative.',
    bestPractices: [
      'Use pyenv on Mac/Linux for version management',
      'Always verify installation with version checks',
      'Install pip and venv alongside Python',
      'Keep Python updated to latest stable version',
      'Use virtual environments for all projects'
    ],
    commonPitfalls: [
      'Installing Python from python.org on Mac (conflicts with system Python)',
      'Not adding Python to PATH on Windows',
      'Using system Python for development projects',
      'Mixing different Python installation methods'
    ],
    tags: ['python', 'installation', 'pyenv', 'setup', 'cross-platform'],
    difficulty: 'beginner',
    language: 'bash'
  },
  {
    id: 'setup-nodejs-install',
    title: 'Node.js Installation with Version Management',
    category: 'setup',
    type: 'guide',
    description: 'Install Node.js with NVM for seamless version management across projects',
    code: `# Mac/Linux - Using nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Windows - Download nvm-windows from GitHub
# https://github.com/coreybutler/nvm-windows

# Reload shell or restart terminal
source ~/.bashrc

# Install and use Node.js
nvm install 18.17.0
nvm install 20.9.0
nvm use 18.17.0
nvm alias default 18.17.0

# List available versions
nvm list-remote  # Available versions
nvm list         # Installed versions

# Project-specific version (.nvmrc)
echo "18.17.0" > .nvmrc
nvm use  # Uses version from .nvmrc

# Verify installation
node --version
npm --version`,
    explanation: 'NVM (Node Version Manager) is essential for JavaScript development as different projects often require different Node.js versions. It allows you to install multiple versions and switch between them easily.',
    bestPractices: [
      'Use .nvmrc files for project-specific Node versions',
      'Set a default Node version with nvm alias',
      'Keep LTS versions for production projects',
      'Update npm separately: npm install -g npm@latest',
      'Use nvm use before working on projects'
    ],
    commonPitfalls: [
      'Installing Node.js directly instead of using NVM',
      'Not reloading shell after NVM installation',
      'Forgetting to switch Node versions between projects',
      'Using outdated npm version with newer Node'
    ],
    codeExamples: [
      {
        title: 'Project Setup with .nvmrc',
        code: `# Create .nvmrc file
echo "18.17.0" > .nvmrc

# Auto-switch Node version
nvm use

# Install dependencies
npm install

# Verify correct version
node --version  # Should match .nvmrc`,
        language: 'bash',
        explanation: 'Using .nvmrc ensures all team members use the same Node.js version for consistent development environment.'
      }
    ],
    tags: ['nodejs', 'nvm', 'installation', 'setup', 'version-management'],
    difficulty: 'beginner',
    language: 'bash'
  },
  {
    id: 'setup-virtual-environments',
    title: 'Python Virtual Environments Mastery',
    category: 'setup',
    type: 'guide',
    description: 'Create and manage isolated Python environments using venv, pipenv, and conda',
    code: `# Method 1: venv (built-in, lightweight)
python -m venv myproject_env
source myproject_env/bin/activate  # Mac/Linux
myproject_env\\Scripts\\activate     # Windows

# Install packages
pip install django requests

# Deactivate
deactivate

# Method 2: pipenv (recommended for development)
pip install pipenv
pipenv install django requests
pipenv install --dev pytest black  # Dev dependencies
pipenv shell  # Activate environment
exit  # Deactivate

# Method 3: conda (data science projects)
conda create -n myproject python=3.11
conda activate myproject
conda install django requests
conda deactivate

# List environments
pipenv --venv  # Show current venv path
conda env list  # List conda environments`,
    explanation: 'Virtual environments prevent dependency conflicts between projects by creating isolated Python installations. Each project gets its own set of packages without affecting the global Python installation.',
    bestPractices: [
      'Always use virtual environments for Python projects',
      'Use pipenv for web development projects',
      'Use conda for data science and ML projects',
      'Keep requirements.txt updated',
      'Name environments descriptively',
      'Activate environment before installing packages'
    ],
    commonPitfalls: [
      'Installing packages globally instead of in virtual environment',
      'Forgetting to activate environment before work',
      'Committing virtual environment folders to git',
      'Using different environment tools in same project'
    ],
    codeExamples: [
      {
        title: 'Pipenv Workflow',
        code: `# Initialize project with Pipenv
pipenv --python 3.11

# Install packages
pipenv install django
pipenv install --dev pytest

# Generate requirements files
pipenv requirements > requirements.txt
pipenv requirements --dev > requirements-dev.txt

# Lock dependencies
pipenv lock

# Run commands in environment
pipenv run python manage.py runserver`,
        language: 'bash',
        explanation: 'Pipenv combines pip and virtualenv functionality, automatically creating and managing virtual environments with Pipfile for dependency tracking.'
      }
    ],
    tags: ['python', 'virtual-environments', 'pipenv', 'conda', 'venv'],
    difficulty: 'beginner',
    language: 'bash'
  }
]; 