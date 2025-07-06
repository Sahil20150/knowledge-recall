export interface CodeExample {
  title: string;
  code: string;
  language: string;
  explanation?: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  category: 'setup' | 'packages' | 'dsa' | 'oop' | 'frameworks' | 'database' | 'realtime' | 'async' | 'data-handling' | 'templates' | 'production' | 'docker' | 'aws' | 'ai' | 'libraries';
  type: 'concept' | 'snippet' | 'algorithm' | 'pattern' | 'guide' | 'comparison' | 'command';
  description: string;
  code?: string;
  explanation: string;
  codeExamples?: CodeExample[];
  bestPractices?: string[];
  commonPitfalls?: string[];
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language?: 'python' | 'javascript'| 'bash' | 'dockerfile' | 'yaml' | 'both';
}

export const knowledgeItems: KnowledgeItem[] = [
  // ⚙️ 1. Setup & Startup
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

# Generate requirements.txt
pipenv requirements > requirements.txt

# Install from Pipfile
pipenv install

# Run commands in environment
pipenv run python manage.py runserver`,
        language: 'bash',
        explanation: 'Pipenv combines pip and virtualenv functionality, automatically creating and managing virtual environments with Pipfile for dependency tracking.'
      }
    ],
    tags: ['python', 'virtual-environment', 'pipenv', 'venv', 'conda'],
    difficulty: 'beginner',
    language: 'bash'
  },

  // 📦 2. Package Management
  {
    id: 'packages-pip-comprehensive',
    title: 'Python Package Management with pip',
    category: 'packages',
    type: 'command',
    description: 'Master pip commands for Python package installation, updates, and security',
    code: `# Basic installation
pip install django
pip install django==4.2.0  # Specific version
pip install "django>=4.0,<5.0"  # Version range

# Install from requirements
pip install -r requirements.txt
pip install -r requirements-dev.txt

# List and inspect packages
pip list
pip list --outdated
pip show django  # Detailed package info
pip show --files django  # Show installed files

# Upgrade packages
pip install --upgrade django
pip install --upgrade pip  # Upgrade pip itself

# Uninstall packages
pip uninstall django
pip uninstall -r requirements.txt  # Uninstall all

# Generate requirements
pip freeze > requirements.txt
pip freeze --local > requirements.txt  # Exclude global packages

# Security and maintenance
pip install pip-audit
pip-audit  # Check for vulnerabilities
pip check  # Check for dependency conflicts

# Advanced installation
pip install git+https://github.com/user/repo.git
pip install -e .  # Editable/development install
pip install --no-deps package  # Skip dependencies`,
    explanation: 'pip is the standard Python package installer. Understanding its commands is crucial for managing dependencies, security, and project maintenance.',
    bestPractices: [
      'Always use virtual environments with pip',
      'Pin exact versions in production (requirements.txt)',
      'Use version ranges for development flexibility',
      'Regularly audit packages for security vulnerabilities',
      'Keep pip itself updated',
      'Use --upgrade-strategy eager for comprehensive updates'
    ],
    commonPitfalls: [
      'Installing packages globally without virtual environment',
      'Not pinning versions in production',
      'Ignoring security warnings from pip-audit',
      'Using pip freeze without --local in virtual environments',
      'Not checking for dependency conflicts with pip check'
    ],
    codeExamples: [
      {
        title: 'Production Requirements Setup',
        code: `# requirements.txt (production)
Django==4.2.7
psycopg2-binary==2.9.7
gunicorn==21.2.0
redis==5.0.1

# requirements-dev.txt (development)
-r requirements.txt
pytest==7.4.3
black==23.9.1
flake8==6.1.0
django-debug-toolbar==4.2.0

# Install for development
pip install -r requirements-dev.txt`,
        language: 'bash',
        explanation: 'Separate requirements files for production and development ensure clean deployments while providing development tools.'
      }
    ],
    tags: ['python', 'pip', 'packages', 'requirements', 'security'],
    difficulty: 'beginner',
    language: 'bash'
  },
  {
    id: 'packages-npm-comprehensive',
    title: 'JavaScript Package Management with npm',
    category: 'packages',
    type: 'command',
    description: 'Complete npm guide for JavaScript package management, scripts, and security',
    code: `# Project initialization
npm init -y  # Quick init with defaults
npm init  # Interactive init

# Package installation
npm install express
npm install express@4.18.0  # Specific version
npm install --save-dev nodemon  # Dev dependency
npm install -g npm@latest  # Global update

# Install from package.json
npm install  # Install all dependencies
npm ci  # Clean install (production)

# Package management
npm update  # Update all packages
npm outdated  # Check for updates
npm list  # Show dependency tree
npm list --depth=0  # Top-level only

# Remove packages
npm uninstall express
npm uninstall --save-dev nodemon

# Security and maintenance
npm audit  # Security audit
npm audit fix  # Auto-fix vulnerabilities
npm audit fix --force  # Force fixes

# Scripts and execution
npm start
npm run dev
npm test
npx nodemon server.js  # Run without global install

# Advanced commands
npm pack  # Create tarball
npm publish  # Publish to registry
npm link  # Link local package
npm cache clean --force  # Clear cache`,
    explanation: 'npm is the default package manager for Node.js. It handles dependencies, scripts, and provides tools for project management and security.',
    bestPractices: [
      'Use npm ci in production for faster, reliable installs',
      'Regularly run npm audit for security checks',
      'Use npx instead of global installations',
      'Keep package.json scripts organized and documented',
      'Use exact versions for critical dependencies',
      'Commit package-lock.json to version control'
    ],
    commonPitfalls: [
      'Installing packages globally when local would suffice',
      'Ignoring npm audit warnings',
      'Not committing package-lock.json',
      'Using npm install instead of npm ci in production',
      'Not organizing package.json scripts properly'
    ],
    codeExamples: [
      {
        title: 'Complete package.json with Scripts',
        code: `{
  "name": "my-express-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "build": "webpack --mode production",
    "clean": "rm -rf dist/",
    "prepare": "husky install"
  },
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^7.5.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "jest": "^29.7.0",
    "eslint": "^8.50.0"
  }
}`,
        language: 'javascript',
        explanation: 'Well-organized package.json with clear scripts for development, testing, and production workflows.'
      }
    ],
    tags: ['javascript', 'npm', 'packages', 'nodejs', 'scripts'],
    difficulty: 'beginner',
    language: 'bash'
  },

  // 🧠 3. DSA Basics
  {
    id: 'dsa-python-loops-comprehensive',
    title: 'Python Loops and Iteration Mastery',
    category: 'dsa',
    type: 'snippet',
    description: 'Master Python loops, range, enumerate, zip, and advanced iteration patterns',
    code: `# Basic for loop with range
for i in range(5):  # 0, 1, 2, 3, 4
    print(f"Number: {i}")

# Range with start, stop, step
for i in range(1, 10, 2):  # 1, 3, 5, 7, 9
    print(i)

# Enumerate for index and value
fruits = ['apple', 'banana', 'orange']
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Enumerate with custom start
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}: {fruit}")  # 1: apple, 2: banana, 3: orange

# While loop with condition
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1

# List comprehension (Pythonic way)
squares = [x**2 for x in range(10)]
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# Dictionary comprehension
word_lengths = {word: len(word) for word in fruits}
squared_dict = {x: x**2 for x in range(5)}

# Set comprehension
unique_lengths = {len(word) for word in fruits}

# Zip for parallel iteration
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(f"{name} is {age} years old")

# Zip with different length lists
from itertools import zip_longest
list1 = [1, 2, 3]
list2 = ['a', 'b']
for num, letter in zip_longest(list1, list2, fillvalue='N/A'):
    print(f"{num}: {letter}")`,
    explanation: 'Python provides powerful iteration tools that make code more readable and efficient. Understanding these patterns is essential for writing Pythonic code.',
    bestPractices: [
      'Use enumerate() instead of range(len()) for index access',
      'Prefer list comprehensions over map/filter for simple operations',
      'Use zip() for parallel iteration of multiple sequences',
      'Choose while loops only when the number of iterations is unknown',
      'Use zip_longest() when lists have different lengths'
    ],
    commonPitfalls: [
      'Using range(len(list)) instead of enumerate()',
      'Creating empty lists and appending in loops instead of comprehensions',
      'Not handling different length lists when using zip()',
      'Using nested loops when zip() would be clearer'
    ],
    codeExamples: [
      {
        title: 'Advanced Iteration Patterns',
        code: `# Nested comprehensions
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [item for row in matrix for item in row]

# Conditional comprehensions
numbers = range(20)
even_squares = [x**2 for x in numbers if x % 2 == 0]
categorized = ['even' if x % 2 == 0 else 'odd' for x in numbers]

# Generator expressions (memory efficient)
large_squares = (x**2 for x in range(1000000))
sum_of_squares = sum(x**2 for x in range(100))

# Multiple assignment in loops
pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
for number, letter in pairs:
    print(f"{number}: {letter}")`,
        language: 'python',
        explanation: 'Advanced iteration patterns including nested comprehensions, conditional logic, and generator expressions for memory-efficient processing.'
      }
    ],
    tags: ['python', 'loops', 'iteration', 'comprehension', 'enumerate', 'zip'],
    difficulty: 'beginner',
    language: 'python'
  },
  {
    id: 'dsa-python-functional-detailed',
    title: 'Python Functional Programming Deep Dive',
    category: 'dsa',
    type: 'snippet',
    description: 'Master map, filter, reduce, and functional programming concepts in Python',
    code: `from functools import reduce
from operator import add, mul
import itertools

# Sample data
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
words = ['hello', 'world', 'python', 'programming']

# MAP: Transform each element
# Traditional approach
squares_traditional = []
for x in numbers:
    squares_traditional.append(x**2)

# Using map()
squares_map = list(map(lambda x: x**2, numbers))

# Using list comprehension (more Pythonic)
squares_comprehension = [x**2 for x in numbers]

# Map with multiple arguments
def power(base, exponent):
    return base ** exponent

bases = [2, 3, 4]
exponents = [2, 3, 2]
powers = list(map(power, bases, exponents))  # [4, 27, 16]

# FILTER: Select elements based on condition
# Traditional approach
evens_traditional = []
for x in numbers:
    if x % 2 == 0:
        evens_traditional.append(x)

# Using filter()
evens_filter = list(filter(lambda x: x % 2 == 0, numbers))

# Using list comprehension (more Pythonic)
evens_comprehension = [x for x in numbers if x % 2 == 0]

# Filter with custom function
def is_long_word(word):
    return len(word) > 5

long_words = list(filter(is_long_word, words))

# REDUCE: Combine elements into single value
# Sum using reduce
sum_reduce = reduce(lambda acc, x: acc + x, numbers, 0)
sum_builtin = sum(numbers)  # Preferred

# Product using reduce
product = reduce(lambda acc, x: acc * x, numbers, 1)
product_operator = reduce(mul, numbers, 1)  # Using operator module

# Find maximum using reduce
max_reduce = reduce(lambda acc, x: acc if acc > x else x, numbers)
max_builtin = max(numbers)  # Preferred

# Complex reduce example: group by length
def group_by_length(acc, word):
    length = len(word)
    if length not in acc:
        acc[length] = []
    acc[length].append(word)
    return acc

grouped = reduce(group_by_length, words, {})`,
    explanation: 'Functional programming concepts like map, filter, and reduce provide powerful ways to process data. While Python has more Pythonic alternatives, understanding these concepts is crucial for functional programming.',
    bestPractices: [
      'Use list comprehensions instead of map/filter for simple operations',
      'Use built-in functions (sum, max, min) instead of reduce when available',
      'Consider generator expressions for memory efficiency',
      'Use operator module functions instead of lambdas when possible',
      'Combine functional approaches with comprehensions for readability'
    ],
    commonPitfalls: [
      'Overusing map/filter when comprehensions are clearer',
      'Forgetting to convert map/filter objects to lists in Python 3',
      'Using reduce for operations that have built-in alternatives',
      'Creating complex lambda functions instead of named functions'
    ],
    codeExamples: [
      {
        title: 'Chaining Functional Operations',
        code: `# Chaining operations: get squares of even numbers > 5
numbers = range(1, 11)

# Functional approach
result_functional = list(
    map(lambda x: x**2,
        filter(lambda x: x > 5,
               filter(lambda x: x % 2 == 0, numbers)))
)

# Comprehension approach (more Pythonic)
result_comprehension = [x**2 for x in numbers if x % 2 == 0 and x > 5]

# Generator approach (memory efficient)
result_generator = (x**2 for x in numbers if x % 2 == 0 and x > 5)

print(f"Functional: {result_functional}")
print(f"Comprehension: {result_comprehension}")
print(f"Generator: {list(result_generator)}")`,
        language: 'python',
        explanation: 'Comparison of functional programming approach vs Python comprehensions, showing how comprehensions often provide clearer, more readable code.'
      },
      {
        title: 'Advanced Functional Patterns',
        code: `from functools import partial, wraps

# Partial application
def multiply(x, y):
    return x * y

double = partial(multiply, 2)  # Fix first argument
triple = partial(multiply, 3)

numbers = [1, 2, 3, 4, 5]
doubled = list(map(double, numbers))  # [2, 4, 6, 8, 10]

# Function composition
def compose(f, g):
    return lambda x: f(g(x))

def add_one(x):
    return x + 1

def square(x):
    return x ** 2

add_then_square = compose(square, add_one)
result = add_then_square(3)  # (3 + 1)² = 16

# Higher-order functions
def apply_twice(func, value):
    return func(func(value))

result = apply_twice(lambda x: x * 2, 5)  # ((5 * 2) * 2) = 20`,
        language: 'python',
        explanation: 'Advanced functional programming concepts including partial application, function composition, and higher-order functions.'
      }
    ],
    tags: ['python', 'functional', 'map', 'filter', 'reduce', 'lambda'],
    difficulty: 'intermediate',
    language: 'python'
  },
  {
    id: 'dsa-javascript-functional-detailed',
    title: 'JavaScript Array Methods and Functional Programming',
    category: 'dsa',
    type: 'snippet',
    description: 'Master JavaScript array methods: map, filter, reduce, and modern functional patterns',
    code: `// Sample data
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const words = ['hello', 'world', 'javascript', 'programming'];
const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false },
  { name: 'Charlie', age: 35, active: true }
];

// MAP: Transform each element
const squares = numbers.map(x => x ** 2);
const wordLengths = words.map(word => word.length);
const userNames = users.map(user => user.name);

// Map with index
const numbersWithIndex = numbers.map((num, index) => ({
  value: num,
  index: index,
  isEven: num % 2 === 0
}));

// FILTER: Select elements based on condition
const evens = numbers.filter(x => x % 2 === 0);
const longWords = words.filter(word => word.length > 5);
const activeUsers = users.filter(user => user.active);

// Filter with complex conditions
const complexFilter = users.filter(user => 
  user.age > 25 && user.active && user.name.startsWith('A')
);

// REDUCE: Combine elements into single value
const sum = numbers.reduce((acc, x) => acc + x, 0);
const product = numbers.reduce((acc, x) => acc * x, 1);
const max = numbers.reduce((acc, x) => Math.max(acc, x), -Infinity);

// Reduce to object
const usersByAge = users.reduce((acc, user) => {
  acc[user.age] = user;
  return acc;
}, {});

// Group by with reduce
const groupedByLength = words.reduce((acc, word) => {
  const length = word.length;
  if (!acc[length]) acc[length] = [];
  acc[length].push(word);
  return acc;
}, {});

// FIND: Get first matching element
const firstEven = numbers.find(x => x % 2 === 0);
const firstLongWord = words.find(word => word.length > 5);
const activeUser = users.find(user => user.active);

// SOME and EVERY: Boolean checks
const hasEven = numbers.some(x => x % 2 === 0);
const allPositive = numbers.every(x => x > 0);
const allActive = users.every(user => user.active);

// INCLUDES and INDEXOF
const hasNumber5 = numbers.includes(5);
const indexOfHello = words.indexOf('hello');
const lastIndexOfHello = words.lastIndexOf('hello');`,
    explanation: 'JavaScript array methods provide powerful functional programming capabilities. These methods return new arrays (immutable) and can be chained for complex data transformations.',
    bestPractices: [
      'Chain array methods for complex transformations',
      'Use find() instead of filter()[0] for single items',
      'Prefer some()/every() over manual boolean checks',
      'Use reduce() for complex aggregations and grouping',
      'Always provide initial values for reduce()',
      'Use arrow functions for concise transformations'
    ],
    commonPitfalls: [
      'Mutating arrays instead of using immutable methods',
      'Not providing initial value for reduce()',
      'Using forEach() when map() is more appropriate',
      'Forgetting that these methods return new arrays',
      'Using complex logic in arrow functions without readability'
    ],
    codeExamples: [
      {
        title: 'Method Chaining for Complex Operations',
        code: `const data = [
  { name: 'Alice', age: 25, salary: 50000, department: 'Engineering' },
  { name: 'Bob', age: 30, salary: 60000, department: 'Marketing' },
  { name: 'Charlie', age: 35, salary: 70000, department: 'Engineering' },
  { name: 'Diana', age: 28, salary: 55000, department: 'Marketing' }
];

// Complex chaining: Get average salary of Engineering employees over 25
const avgEngineeringSalary = data
  .filter(emp => emp.department === 'Engineering')
  .filter(emp => emp.age > 25)
  .map(emp => emp.salary)
  .reduce((sum, salary, _, arr) => sum + salary / arr.length, 0);

// Transform and group data
const departmentStats = data
  .reduce((acc, emp) => {
    const dept = emp.department;
    if (!acc[dept]) {
      acc[dept] = { count: 0, totalSalary: 0, employees: [] };
    }
    acc[dept].count++;
    acc[dept].totalSalary += emp.salary;
    acc[dept].employees.push(emp.name);
    return acc;
  }, {});

// Add average salary to each department
Object.keys(departmentStats).forEach(dept => {
  departmentStats[dept].avgSalary = 
    departmentStats[dept].totalSalary / departmentStats[dept].count;
});`,
        language: 'javascript',
        explanation: 'Method chaining allows for complex data transformations in a readable, functional style. Each method returns a new array, maintaining immutability.'
      },
      {
        title: 'Advanced Array Methods',
        code: `const numbers = [1, [2, 3], [4, [5, 6]], 7];
const nested = [[1, 2], [3, 4], [5, 6]];

// FLAT and FLATMAP
const flattened = numbers.flat();  // [1, 2, 3, 4, [5, 6], 7]
const deepFlattened = numbers.flat(2);  // [1, 2, 3, 4, 5, 6, 7]

// FlatMap: map + flat in one operation
const doubled = nested.flatMap(arr => arr.map(x => x * 2));
// Result: [2, 4, 6, 8, 10, 12]

// SORT with custom comparator
const people = ['Alice', 'bob', 'Charlie'];
const sortedCaseInsensitive = people.sort((a, b) => 
  a.toLowerCase().localeCompare(b.toLowerCase())
);

const numbersSorted = [3, 1, 4, 1, 5, 9].sort((a, b) => a - b);

// REVERSE (mutates original)
const reversed = [...numbers].reverse();  // Use spread to avoid mutation

// FROM and OF
const range = Array.from({length: 5}, (_, i) => i + 1);  // [1, 2, 3, 4, 5]
const letters = Array.from('hello');  // ['h', 'e', 'l', 'l', 'o']
const newArray = Array.of(1, 2, 3, 4, 5);  // [1, 2, 3, 4, 5]`,
        language: 'javascript',
        explanation: 'Advanced array methods for flattening, sorting, and creating arrays. Understanding these methods enables sophisticated data manipulation.'
      }
    ],
    tags: ['javascript', 'arrays', 'functional', 'map', 'filter', 'reduce'],
    difficulty: 'intermediate',
    language: 'javascript'
  },

  // 👨‍🏫 4. Object-Oriented Programming
  {
    id: 'oop-python-classes-comprehensive',
    title: 'Python Classes and Special Methods Deep Dive',
    category: 'oop',
    type: 'snippet',
    description: 'Master Python classes with special methods, properties, and advanced OOP concepts',
    code: `import uuid
from datetime import datetime
from typing import Optional, List

class User:
    # Class variables (shared by all instances)
    total_users = 0
    _valid_roles = ['admin', 'user', 'moderator']
    
    def __init__(self, name: str, email: str, age: int = 18, role: str = 'user'):
        """Initialize a new User instance with validation."""
        # Public attributes
        self.name = name
        self.email = email
        
        # Protected attributes (convention: single underscore)
        self._age = age
        self._role = role
        
        # Private attributes (name mangling: double underscore)
        self.__id = self._generate_id()
        self.__created_at = datetime.now()
        
        # Validation
        self._validate_email(email)
        self._validate_age(age)
        self._validate_role(role)
        
        # Update class variable
        User.total_users += 1
    
    def __str__(self) -> str:
        """String representation for end users."""
        return f"User({self.name}, {self.email})"
    
    def __repr__(self) -> str:
        """Developer representation for debugging."""
        return f"User(name='{self.name}', email='{self.email}', age={self._age}, role='{self._role}')"
    
    def __len__(self) -> int:
        """Custom length (number of characters in name)."""
        return len(self.name)
    
    def __eq__(self, other) -> bool:
        """Equality comparison based on email."""
        if isinstance(other, User):
            return self.email == other.email
        return False
    
    def __hash__(self) -> int:
        """Make User hashable for use in sets/dicts."""
        return hash(self.email)
    
    def __lt__(self, other) -> bool:
        """Less than comparison for sorting."""
        if isinstance(other, User):
            return self._age < other._age
        return NotImplemented
    
    # Properties with getters and setters
    @property
    def age(self) -> int:
        """Getter for age."""
        return self._age
    
    @age.setter
    def age(self, value: int) -> None:
        """Setter for age with validation."""
        self._validate_age(value)
        self._age = value
    
    @property
    def role(self) -> str:
        """Getter for role."""
        return self._role
    
    @role.setter
    def role(self, value: str) -> None:
        """Setter for role with validation."""
        self._validate_role(value)
        self._role = value
    
    @property
    def id(self) -> str:
        """Read-only property for user ID."""
        return self.__id
    
    @property
    def created_at(self) -> datetime:
        """Read-only property for creation timestamp."""
        return self.__created_at
    
    # Class methods (alternative constructors)
    @classmethod
    def from_string(cls, user_string: str) -> 'User':
        """Create User from comma-separated string."""
        parts = [part.strip() for part in user_string.split(',')]
        if len(parts) < 2:
            raise ValueError("String must contain at least name and email")
        
        name, email = parts[0], parts[1]
        age = int(parts[2]) if len(parts) > 2 else 18
        role = parts[3] if len(parts) > 3 else 'user'
        
        return cls(name, email, age, role)
    
    @classmethod
    def from_dict(cls, data: dict) -> 'User':
        """Create User from dictionary."""
        return cls(
            name=data['name'],
            email=data['email'],
            age=data.get('age', 18),
            role=data.get('role', 'user')
        )
    
    # Static methods (utility functions)
    @staticmethod
    def is_valid_email(email: str) -> bool:
        """Validate email format."""
        return '@' in email and '.' in email.split('@')[1]
    
    @staticmethod
    def is_valid_age(age: int) -> bool:
        """Validate age range."""
        return 0 <= age <= 150
    
    # Private methods (internal use only)
    def _generate_id(self) -> str:
        """Generate unique user ID."""
        return str(uuid.uuid4())[:8]
    
    def _validate_email(self, email: str) -> None:
        """Validate email and raise exception if invalid."""
        if not self.is_valid_email(email):
            raise ValueError(f"Invalid email format: {email}")
    
    def _validate_age(self, age: int) -> None:
        """Validate age and raise exception if invalid."""
        if not self.is_valid_age(age):
            raise ValueError(f"Age must be between 0 and 150, got: {age}")
    
    def _validate_role(self, role: str) -> None:
        """Validate role and raise exception if invalid."""
        if role not in self._valid_roles:
            raise ValueError(f"Role must be one of {self._valid_roles}, got: {role}")
    
    # Public methods
    def to_dict(self) -> dict:
        """Convert user to dictionary."""
        return {
            'id': self.__id,
            'name': self.name,
            'email': self.email,
            'age': self._age,
            'role': self._role,
            'created_at': self.__created_at.isoformat()
        }
    
    def update_profile(self, **kwargs) -> None:
        """Update user profile with keyword arguments."""
        for key, value in kwargs.items():
            if hasattr(self, key) and not key.startswith('_'):
                setattr(self, key, value)
            elif key == 'age':
                self.age = value  # Use property setter
            elif key == 'role':
                self.role = value  # Use property setter`,
    explanation: 'Python classes support powerful features including special methods (dunder methods), properties for controlled access, class/static methods, and proper encapsulation through naming conventions.',
    bestPractices: [
      'Use __init__ for instance initialization with validation',
      'Implement __str__ for user-friendly representation',
      'Implement __repr__ for developer debugging',
      'Use properties for controlled attribute access',
      'Follow naming conventions: public, _protected, __private',
      'Use class methods for alternative constructors',
      'Use static methods for utility functions',
      'Implement comparison methods (__eq__, __lt__) for sorting',
      'Make classes hashable with __hash__ when needed'
    ],
    commonPitfalls: [
      'Not implementing __repr__ for debugging',
      'Using direct attribute access instead of properties',
      'Not validating input in __init__ or setters',
      'Confusing class variables with instance variables',
      'Not making classes hashable when using in sets/dicts',
      'Overusing private attributes (double underscore)',
      'Not providing type hints for better code documentation'
    ],
    codeExamples: [
      {
        title: 'Usage Examples',
        code: `# Creating users
user1 = User("Alice", "alice@example.com", 25, "admin")
user2 = User.from_string("Bob, bob@example.com, 30, user")
user3 = User.from_dict({
    "name": "Charlie",
    "email": "charlie@example.com",
    "age": 35
})

# Using properties
print(user1.age)  # 25
user1.age = 26    # Uses setter with validation

# String representations
print(str(user1))   # User(Alice, alice@example.com)
print(repr(user1))  # User(name='Alice', email='alice@example.com', age=26, role='admin')

# Comparison and sorting
users = [user1, user2, user3]
users.sort()  # Sorts by age using __lt__

# Using in sets (requires __hash__)
user_set = {user1, user2, user3}

# Class information
print(f"Total users: {User.total_users}")
print(f"Valid roles: {User._valid_roles}")`,
        language: 'python',
        explanation: 'Demonstration of various class features including alternative constructors, properties, comparison, and class variables.'
      }
    ],
    tags: ['python', 'oop', 'classes', 'special-methods', 'properties'],
    difficulty: 'intermediate',
    language: 'python'
  },
  {
    id: 'oop-javascript-classes-modern',
    title: 'Modern JavaScript Classes with Private Fields',
    category: 'oop',
    type: 'snippet',
    description: 'Master modern JavaScript classes with private fields, static methods, and ES2022 features',
    code: `class User {
    // Static properties
    static totalUsers = 0;
    static validRoles = ['admin', 'user', 'moderator'];
    
    // Private fields (ES2022)
    #id;
    #createdAt;
    #password;
    
    constructor(name, email, age = 18, role = 'user') {
        // Validation
        this.#validateEmail(email);
        this.#validateAge(age);
        this.#validateRole(role);
        
        // Public properties
        this.name = name;
        this.email = email;
        
        // Protected properties (convention)
        this._age = age;
        this._role = role;
        
        // Private properties
        this.#id = this.#generateId();
        this.#createdAt = new Date();
        this.#password = null;
        
        User.totalUsers++;
    }
    
    // Getters and setters
    get age() {
        return this._age;
    }
    
    set age(value) {
        this.#validateAge(value);
        this._age = value;
    }
    
    get role() {
        return this._role;
    }
    
    set role(value) {
        this.#validateRole(value);
        this._role = value;
    }
    
    // Read-only properties
    get id() {
        return this.#id;
    }
    
    get createdAt() {
        return new Date(this.#createdAt);
    }
    
    // Public methods
    toString() {
        return \`User(\${this.name}, \${this.email})\`;
    }
    
    toJSON() {
        return {
            id: this.#id,
            name: this.name,
            email: this.email,
            age: this._age,
            role: this._role,
            createdAt: this.#createdAt.toISOString()
        };
    }
    
    updateProfile(updates) {
        const allowedFields = ['name', 'email', 'age', 'role'];
        
        for (const [key, value] of Object.entries(updates)) {
            if (allowedFields.includes(key)) {
                if (key === 'age' || key === 'role') {
                    this[key] = value; // Use setter
                } else {
                    this[key] = value;
                }
            }
        }
    }
    
    setPassword(password) {
        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters');
        }
        this.#password = this.#hashPassword(password);
    }
    
    verifyPassword(password) {
        return this.#password === this.#hashPassword(password);
    }
    
    // Static methods (alternative constructors)
    static fromString(userString) {
        const parts = userString.split(',').map(s => s.trim());
        if (parts.length < 2) {
            throw new Error('String must contain at least name and email');
        }
        
        const [name, email, age, role] = parts;
        return new User(
            name,
            email,
            age ? parseInt(age) : undefined,
            role
        );
    }
    
    static fromObject(obj) {
        return new User(obj.name, obj.email, obj.age, obj.role);
    }
    
    static isValidEmail(email) {
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        return emailRegex.test(email);
    }
    
    static isValidAge(age) {
        return Number.isInteger(age) && age >= 0 && age <= 150;
    }
    
    // Private methods
    #generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
    
    #validateEmail(email) {
        if (!User.isValidEmail(email)) {
            throw new Error(\`Invalid email format: \${email}\`);
        }
    }
    
    #validateAge(age) {
        if (!User.isValidAge(age)) {
            throw new Error(\`Age must be between 0 and 150, got: \${age}\`);
        }
    }
    
    #validateRole(role) {
        if (!User.validRoles.includes(role)) {
            throw new Error(\`Role must be one of \${User.validRoles.join(', ')}, got: \${role}\`);
        }
    }
    
    #hashPassword(password) {
        // Simple hash for demo (use proper hashing in production)
        return btoa(password).split('').reverse().join('');
    }
    
    // Symbol.iterator for making class iterable
    *[Symbol.iterator]() {
        yield this.name;
        yield this.email;
        yield this._age;
        yield this._role;
    }
    
    // Symbol.toPrimitive for type conversion
    [Symbol.toPrimitive](hint) {
        if (hint === 'number') {
            return this._age;
        }
        if (hint === 'string') {
            return this.toString();
        }
        return this.id;
    }
}

// Extending classes
class AdminUser extends User {
    #permissions;
    
    constructor(name, email, age, permissions = []) {
        super(name, email, age, 'admin');
        this.#permissions = new Set(permissions);
    }
    
    get permissions() {
        return Array.from(this.#permissions);
    }
    
    addPermission(permission) {
        this.#permissions.add(permission);
    }
    
    removePermission(permission) {
        this.#permissions.delete(permission);
    }
    
    hasPermission(permission) {
        return this.#permissions.has(permission);
    }
    
    toString() {
        return \`AdminUser(\${this.name}, \${this.email}, permissions: \${this.permissions.length})\`;
    }
}`,
    explanation: 'Modern JavaScript classes support private fields (#), static methods, getters/setters, and advanced features like Symbol.iterator for custom iteration behavior.',
    bestPractices: [
      'Use private fields (#) for truly private data',
      'Implement getters/setters for controlled access',
      'Use static methods for utility functions and alternative constructors',
      'Implement toString() and toJSON() for object representation',
      'Use Symbol.iterator for custom iteration',
      'Validate input in constructors and setters',
      'Use extends for inheritance with super() calls',
      'Follow naming conventions: public, _protected, #private'
    ],
    commonPitfalls: [
      'Trying to access private fields from outside the class',
      'Not calling super() in derived class constructors',
      'Forgetting that arrow functions don\'t have their own this',
      'Not validating input in constructors',
      'Mixing old prototype syntax with class syntax',
      'Not understanding the difference between static and instance methods'
    ],
    codeExamples: [
      {
        title: 'Usage Examples',
        code: `// Creating users
const user1 = new User('Alice', 'alice@example.com', 25, 'admin');
const user2 = User.fromString('Bob, bob@example.com, 30, user');
const user3 = User.fromObject({
    name: 'Charlie',
    email: 'charlie@example.com',
    age: 35
});

// Using getters and setters
console.log(user1.age); // 25
user1.age = 26; // Uses setter with validation

// Private fields are truly private
console.log(user1.id); // Works (public getter)
// console.log(user1.#id); // SyntaxError: Private field '#id' must be declared in an enclosing class

// Iteration
for (const value of user1) {
    console.log(value); // name, email, age, role
}

// Type conversion
console.log(+user1); // 26 (age)
console.log(\`\${user1}\`); // "User(Alice, alice@example.com)"

// Admin user
const admin = new AdminUser('Admin', 'admin@example.com', 30, ['read', 'write']);
admin.addPermission('delete');
console.log(admin.hasPermission('delete')); // true

// Class information
console.log(\`Total users: \${User.totalUsers}\`);`,
        language: 'javascript',
        explanation: 'Demonstration of modern JavaScript class features including private fields, getters/setters, iteration, and inheritance.'
      }
    ],
    tags: ['javascript', 'classes', 'private-fields', 'modern', 'es2022'],
    difficulty: 'intermediate',
    language: 'javascript'
  },

  // 🔧 5. Framework Usage
  {
    id: 'frameworks-django-models-comprehensive',
    title: 'Django Models and ORM Mastery',
    category: 'frameworks',
    type: 'snippet',
    description: 'Complete Django model definition with relationships, validation, and advanced ORM queries',
    code: `# models.py
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator, EmailValidator
from django.urls import reverse
from django.utils.text import slugify
import uuid

class TimestampedModel(models.Model):
    """Abstract base model with timestamp fields."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True

class Category(TimestampedModel):
    """Blog post category model."""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name_plural = "categories"
        ordering = ['name']
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['is_active']),
        ]
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('category_detail', kwargs={'slug': self.slug})

class Tag(models.Model):
    """Tag model for posts."""
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class PostManager(models.Manager):
    """Custom manager for Post model."""
    
    def published(self):
        return self.filter(status='published', is_active=True)
    
    def by_author(self, author):
        return self.filter(author=author)
    
    def popular(self, limit=10):
        return self.published().order_by('-view_count')[:limit]

class Post(TimestampedModel):
    """Blog post model with comprehensive features."""
    
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]
    
    # Basic fields
    title = models.CharField(
        max_length=200,
        validators=[MinLengthValidator(5)],
        help_text="Post title (5-200 characters)"
    )
    slug = models.SlugField(unique=True, blank=True)
    content = models.TextField()
    excerpt = models.TextField(
        max_length=300,
        blank=True,
        help_text="Brief description of the post"
    )
    
    # Relationships
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='posts'
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='posts'
    )
    tags = models.ManyToManyField(
        Tag,
        blank=True,
        related_name='posts'
    )
    
    # Status and visibility
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='draft'
    )
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    
    # Media
    featured_image = models.ImageField(
        upload_to='posts/%Y/%m/',
        null=True,
        blank=True
    )
    
    # Metrics
    view_count = models.PositiveIntegerField(default=0)
    like_count = models.PositiveIntegerField(default=0)
    
    # SEO fields
    meta_description = models.CharField(
        max_length=160,
        blank=True,
        help_text="SEO meta description"
    )
    meta_keywords = models.CharField(
        max_length=255,
        blank=True,
        help_text="SEO keywords (comma-separated)"
    )
    
    # Publishing
    published_at = models.DateTimeField(null=True, blank=True)
    
    # Custom manager
    objects = PostManager()
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', 'is_active']),
            models.Index(fields=['author', 'status']),
            models.Index(fields=['category', 'status']),
            models.Index(fields=['-published_at']),
            models.Index(fields=['-view_count']),
        ]
        constraints = [
            models.CheckConstraint(
                check=models.Q(view_count__gte=0),
                name='positive_view_count'
            ),
        ]
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        
        # Auto-generate excerpt if not provided
        if not self.excerpt and self.content:
            self.excerpt = self.content[:297] + '...' if len(self.content) > 300 else self.content
        
        # Set published_at when status changes to published
        if self.status == 'published' and not self.published_at:
            from django.utils import timezone
            self.published_at = timezone.now()
        
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('post_detail', kwargs={'slug': self.slug})
    
    @property
    def is_published(self):
        return self.status == 'published' and self.is_active
    
    def increment_view_count(self):
        """Increment view count atomically."""
        Post.objects.filter(pk=self.pk).update(view_count=models.F('view_count') + 1)
        self.refresh_from_db(fields=['view_count'])

class Comment(TimestampedModel):
    """Comment model for posts."""
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    content = models.TextField()
    is_approved = models.BooleanField(default=False)
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='replies'
    )
    
    class Meta:
        ordering = ['created_at']
        indexes = [
            models.Index(fields=['post', 'is_approved']),
            models.Index(fields=['author']),
        ]
    
    def __str__(self):
        return f'Comment by {self.author.username} on {self.post.title}'`,
    explanation: 'Django models define your database structure with relationships, validation, custom managers, and metadata. This example shows a complete blog system with posts, categories, tags, and comments.',
    bestPractices: [
      'Use abstract base models for common fields (timestamps)',
      'Add database indexes for frequently queried fields',
      'Use custom managers for common query patterns',
      'Implement proper __str__ methods for admin interface',
      'Use slug fields for SEO-friendly URLs',
      'Add constraints for data integrity',
      'Use select_related and prefetch_related for efficient queries',
      'Override save() method for custom logic',
      'Use proper field types and validators'
    ],
    commonPitfalls: [
      'Not adding database indexes for performance',
      'Using CharField instead of TextField for long content',
      'Not using related_name for reverse relationships',
      'Forgetting to handle null/blank properly',
      'Not using transactions for complex operations',
      'Creating N+1 query problems with relationships',
      'Not validating data in model methods'
    ],
    codeExamples: [
      {
        title: 'Advanced ORM Queries',
        code: `# Efficient queries with select_related and prefetch_related
posts = Post.objects.published()\\
    .select_related('author', 'category')\\
    .prefetch_related('tags', 'comments__author')

# Complex filtering
popular_posts = Post.objects.filter(
    status='published',
    view_count__gte=100,
    created_at__year=2024
).exclude(
    category__name='Archive'
).order_by('-view_count', '-created_at')

# Aggregation and annotation
from django.db.models import Count, Avg, Q

category_stats = Category.objects.annotate(
    post_count=Count('posts'),
    published_count=Count('posts', filter=Q(posts__status='published')),
    avg_views=Avg('posts__view_count')
).filter(post_count__gt=0)

# Complex queries with F expressions
from django.db.models import F

# Increment view count atomically
Post.objects.filter(pk=post_id).update(
    view_count=F('view_count') + 1
)

# Query optimization
posts_with_comment_count = Post.objects.published()\\
    .annotate(comment_count=Count('comments'))\\
    .filter(comment_count__gt=5)

# Bulk operations
Post.objects.bulk_create([
    Post(title=f'Post {i}', content=f'Content {i}', author_id=1)
    for i in range(100)
])

# Raw SQL when needed
posts = Post.objects.raw(
    "SELECT * FROM blog_post WHERE EXTRACT(month FROM created_at) = %s",
    [current_month]
)`,
        language: 'python',
        explanation: 'Advanced Django ORM techniques for efficient database queries, including joins, aggregation, and bulk operations.'
      }
    ],
    tags: ['django', 'models', 'orm', 'database', 'relationships'],
    difficulty: 'intermediate',
    language: 'python'
  },
  {
    id: 'frameworks-express-comprehensive',
    title: 'Express.js Complete Server Setup',
    category: 'frameworks',
    type: 'snippet',
    description: 'Production-ready Express server with middleware, routing, error handling, and security',
    code: `// server.js - Main server file
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy (for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        error: 'Too many authentication attempts, please try again later.'
    }
});
app.use('/api/auth/', authLimiter);

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Compression middleware
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json({ 
    limit: '10mb',
    verify: (req, res, buf) => {
        req.rawBody = buf;
    }
}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
    whitelist: ['sort', 'fields', 'page', 'limit']
}));

// Static files
app.use(express.static('public', {
    maxAge: '1d',
    etag: true
}));

// Custom middleware
const requestLogger = (req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(\`\${req.requestTime} - \${req.method} \${req.path} - IP: \${req.ip}\`);
    next();
};
app.use(requestLogger);

// Authentication middleware
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                success: false,
                error: 'Access token required' 
            });
        }
        
        // Verify JWT token (implement your JWT verification)
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user to request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ 
            success: false,
            error: 'Invalid or expired token' 
        });
    }
};

// Authorization middleware
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
        }
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: 'Insufficient permissions'
            });
        }
        
        next();
    };
};

// Async error handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', authenticateToken, require('./routes/users'));
app.use('/api/v1/posts', require('./routes/posts'));
app.use('/api/v1/admin', authenticateToken, authorize('admin'), require('./routes/admin'));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API documentation
app.get('/api', (req, res) => {
    res.json({
        message: 'API is running',
        version: '1.0.0',
        endpoints: {
            auth: '/api/v1/auth',
            users: '/api/v1/users',
            posts: '/api/v1/posts',
            admin: '/api/v1/admin'
        },
        documentation: '/api/docs'
    });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'API endpoint not found',
        path: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString()
    });
});

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({
            success: false,
            error: 'Validation Error',
            details: errors
        });
    }
    
    // Mongoose cast error (invalid ObjectId)
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            error: 'Invalid ID format'
        });
    }
    
    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            success: false,
            error: \`Duplicate value for \${field}\`
        });
    }
    
    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            error: 'Invalid token'
        });
    }
    
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            error: 'Token expired'
        });
    }
    
    // Default error
    res.status(err.statusCode || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Process terminated');
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    server.close(() => {
        console.log('Process terminated');
    });
});

const server = app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
    console.log(\`Environment: \${process.env.NODE_ENV || 'development'}\`);
    console.log(\`Health check: http://localhost:\${PORT}/health\`);
});

module.exports = app;`,
    explanation: 'Production-ready Express server with comprehensive security, middleware, error handling, and proper structure for scalable applications.',
    bestPractices: [
      'Use helmet for security headers',
      'Implement rate limiting to prevent abuse',
      'Use CORS properly with whitelist',
      'Sanitize input data to prevent injection attacks',
      'Implement proper error handling with specific error types',
      'Use compression for better performance',
      'Add request logging for debugging',
      'Implement graceful shutdown handling',
      'Use environment variables for configuration',
      'Structure routes in separate files'
    ],
    commonPitfalls: [
      'Not implementing proper error handling',
      'Exposing sensitive information in error messages',
      'Not using HTTPS in production',
      'Not implementing rate limiting',
      'Not sanitizing user input',
      'Not handling async errors properly',
      'Not setting up proper CORS',
      'Not implementing request logging'
    ],
    codeExamples: [
      {
        title: 'Route Handler with Validation',
        code: `// routes/posts.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');

// Validation middleware
const validatePost = [
    body('title')
        .isLength({ min: 5, max: 200 })
        .withMessage('Title must be between 5 and 200 characters'),
    body('content')
        .isLength({ min: 10 })
        .withMessage('Content must be at least 10 characters'),
    body('category')
        .optional()
        .isMongoId()
        .withMessage('Invalid category ID'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors.array()
            });
        }
        next();
    }
];

// @desc    Create new post
// @route   POST /api/v1/posts
// @access  Private
router.post('/', validatePost, asyncHandler(async (req, res) => {
    const { title, content, category, tags } = req.body;
    
    const post = await Post.create({
        title,
        content,
        category,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        author: req.user.id
    });
    
    await post.populate('author', 'name email');
    
    res.status(201).json({
        success: true,
        data: post
    });
}));

module.exports = router;`,
        language: 'javascript',
        explanation: 'Example route with proper validation, error handling, and response structure following REST API conventions.'
      }
    ],
    tags: ['express', 'middleware', 'security', 'error-handling', 'production'],
    difficulty: 'advanced',
    language: 'javascript'
  },

  // 💾 6. Database Integration
  {
    id: 'database-django-orm-advanced',
    title: 'Django ORM Advanced Queries and Optimization',
    category: 'database',
    type: 'snippet',
    description: 'Master Django ORM with complex queries, optimization techniques, and database best practices',
    code: `# Advanced Django ORM queries and optimization techniques
from django.db import models, transaction
from django.db.models import Q, F, Count, Sum, Avg, Max, Min, Case, When, Value
from django.db.models.functions import Coalesce, Concat, Extract, TruncDate
from django.core.paginator import Paginator
from django.utils import timezone
from datetime import datetime, timedelta

# Complex filtering with Q objects
def get_filtered_posts(search_term=None, category=None, date_range=None):
    """Get posts with complex filtering."""
    queryset = Post.objects.select_related('author', 'category')
    
    # Build complex Q object
    filters = Q(status='published')
    
    if search_term:
        search_filters = (
            Q(title__icontains=search_term) |
            Q(content__icontains=search_term) |
            Q(tags__name__icontains=search_term)
        )
        filters &= search_filters
    
    if category:
        filters &= Q(category__slug=category)
    
    if date_range:
        start_date, end_date = date_range
        filters &= Q(created_at__range=[start_date, end_date])
    
    return queryset.filter(filters).distinct()

# Aggregation and annotation
def get_category_statistics():
    """Get comprehensive category statistics."""
    return Category.objects.annotate(
        # Count posts
        total_posts=Count('posts'),
        published_posts=Count('posts', filter=Q(posts__status='published')),
        
        # Calculate averages
        avg_views=Avg('posts__view_count'),
        avg_likes=Avg('posts__like_count'),
        
        # Get extremes
        max_views=Max('posts__view_count'),
        latest_post=Max('posts__created_at'),
        
        # Conditional aggregation
        popular_posts=Count(
            'posts',
            filter=Q(posts__view_count__gte=1000, posts__status='published')
        ),
        
        # Calculate percentages
        engagement_rate=Case(
            When(total_posts=0, then=Value(0)),
            default=F('published_posts') * 100.0 / F('total_posts'),
            output_field=models.FloatField()
        )
    ).filter(total_posts__gt=0).order_by('-published_posts')

# Complex joins and prefetching
def get_posts_with_related_data():
    """Efficiently fetch posts with all related data."""
    return Post.objects.published()\\
        .select_related(
            'author',
            'category'
        )\\
        .prefetch_related(
            'tags',
            'comments__author',
            'comments__replies__author'
        )\\
        .annotate(
            comment_count=Count('comments', filter=Q(comments__is_approved=True)),
            tag_count=Count('tags'),
            latest_comment=Max('comments__created_at')
        )

# Subqueries and window functions
def get_trending_posts():
    """Get trending posts using subqueries."""
    from django.db.models import Subquery, OuterRef, Window
    from django.db.models.functions import Rank
    
    # Subquery to get recent view counts
    recent_views = Post.objects.filter(
        id=OuterRef('id'),
        postview__created_at__gte=timezone.now() - timedelta(days=7)
    ).aggregate(recent_views=Count('postview'))['recent_views']
    
    return Post.objects.published()\\
        .annotate(
            recent_view_count=Subquery(
                PostView.objects.filter(
                    post=OuterRef('pk'),
                    created_at__gte=timezone.now() - timedelta(days=7)
                ).aggregate(count=Count('id'))['count']
            ),
            # Ranking within category
            category_rank=Window(
                expression=Rank(),
                partition_by=[F('category')],
                order_by=F('view_count').desc()
            )
        )\\
        .filter(recent_view_count__gt=0)\\
        .order_by('-recent_view_count')

# Bulk operations for performance
def bulk_update_view_counts(post_views_data):
    """Efficiently update view counts for multiple posts."""
    with transaction.atomic():
        # Bulk update using F expressions
        for post_id, view_increment in post_views_data.items():
            Post.objects.filter(id=post_id).update(
                view_count=F('view_count') + view_increment,
                updated_at=timezone.now()
            )

def bulk_create_comments(comments_data):
    """Bulk create comments efficiently."""
    comments = [
        Comment(
            post_id=data['post_id'],
            author_id=data['author_id'],
            content=data['content']
        )
        for data in comments_data
    ]
    
    # Bulk create with batch size
    Comment.objects.bulk_create(comments, batch_size=100)

# Database functions and expressions
def get_posts_by_month():
    """Group posts by month using database functions."""
    return Post.objects.published()\\
        .annotate(
            month=TruncDate('created_at'),
            author_name=Concat('author__first_name', Value(' '), 'author__last_name'),
            days_since_published=Extract('day', timezone.now() - F('created_at'))
        )\\
        .values('month')\\
        .annotate(
            post_count=Count('id'),
            avg_views=Avg('view_count'),
            total_views=Sum('view_count')
        )\\
        .order_by('-month')

# Raw SQL for complex queries
def get_user_engagement_stats():
    """Get user engagement statistics using raw SQL."""
    return User.objects.raw('''
        SELECT 
            u.id,
            u.username,
            COUNT(DISTINCT p.id) as post_count,
            COUNT(DISTINCT c.id) as comment_count,
            AVG(p.view_count) as avg_post_views,
            SUM(p.like_count) as total_likes
        FROM auth_user u
        LEFT JOIN blog_post p ON u.id = p.author_id
        LEFT JOIN blog_comment c ON u.id = c.author_id
        WHERE u.is_active = true
        GROUP BY u.id, u.username
        HAVING COUNT(DISTINCT p.id) > 0
        ORDER BY total_likes DESC
    ''')

# Transaction management
@transaction.atomic
def create_post_with_tags(post_data, tag_names):
    """Create post with tags in a transaction."""
    # Create the post
    post = Post.objects.create(**post_data)
    
    # Get or create tags
    tags = []
    for tag_name in tag_names:
        tag, created = Tag.objects.get_or_create(
            name=tag_name,
            defaults={'slug': slugify(tag_name)}
        )
        tags.append(tag)
    
    # Add tags to post
    post.tags.set(tags)
    
    # Create initial view record
    PostView.objects.create(
        post=post,
        ip_address='127.0.0.1',
        user_agent='System'
    )
    
    return post

# Custom QuerySet methods
class PostQuerySet(models.QuerySet):
    def published(self):
        return self.filter(status='published', is_active=True)
    
    def by_author(self, author):
        return self.filter(author=author)
    
    def popular(self, days=30):
        cutoff_date = timezone.now() - timedelta(days=days)
        return self.filter(created_at__gte=cutoff_date).order_by('-view_count')
    
    def with_stats(self):
        return self.annotate(
            comment_count=Count('comments'),
            tag_count=Count('tags'),
            avg_rating=Avg('ratings__score')
        )

class PostManager(models.Manager):
    def get_queryset(self):
        return PostQuerySet(self.model, using=self._db)
    
    def published(self):
        return self.get_queryset().published()
    
    def popular(self, days=30):
        return self.get_queryset().popular(days)

# Pagination with optimization
def get_paginated_posts(page=1, per_page=10):
    """Get paginated posts with optimization."""
    posts = Post.objects.published()\\
        .select_related('author', 'category')\\
        .prefetch_related('tags')\\
        .with_stats()
    
    paginator = Paginator(posts, per_page)
    page_obj = paginator.get_page(page)
    
    return {
        'posts': page_obj,
        'has_previous': page_obj.has_previous(),
        'has_next': page_obj.has_next(),
        'total_pages': paginator.num_pages,
        'total_count': paginator.count
    }`,
    explanation: 'Advanced Django ORM techniques for complex queries, performance optimization, and database operations. These patterns are essential for building scalable Django applications.',
    bestPractices: [
      'Use select_related() for foreign key relationships',
      'Use prefetch_related() for many-to-many and reverse foreign keys',
      'Add database indexes for frequently queried fields',
      'Use F expressions for atomic updates',
      'Implement bulk operations for large datasets',
      'Use transactions for data consistency',
      'Create custom QuerySet methods for reusable queries',
      'Use database functions instead of Python processing',
      'Implement proper pagination for large datasets'
    ],
    commonPitfalls: [
      'N+1 query problems with relationships',
      'Not using select_related/prefetch_related',
      'Performing calculations in Python instead of database',
      'Not using bulk operations for large datasets',
      'Missing database indexes on filtered fields',
      'Not using transactions for related operations',
      'Loading entire QuerySets into memory',
      'Using raw SQL when ORM would suffice'
    ],
    tags: ['django', 'orm', 'database', 'optimization', 'queries'],
    difficulty: 'advanced',
    language: 'python'
  },

  // 🔌 7. Real-Time Communication
  {
    id: 'realtime-socketio-comprehensive',
    title: 'Socket.io Real-Time Communication',
    category: 'realtime',
    type: 'snippet',
    description: 'Complete Socket.io implementation for real-time features like chat, notifications, and live updates',
    code: `// server.js - Socket.io server setup
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const Redis = require('redis');

const app = express();
const server = http.createServer(app);

// Redis adapter for scaling across multiple servers
const redisClient = Redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
});

const io = socketIo(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    },
    // Use Redis adapter for horizontal scaling
    adapter: require('socket.io-redis')({
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
    })
});

// Authentication middleware for Socket.io
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error: No token provided'));
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return next(new Error('Authentication error: User not found'));
        }
        
        socket.userId = user.id;
        socket.username = user.username;
        socket.user = user;
        next();
    } catch (err) {
        next(new Error('Authentication error: Invalid token'));
    }
});

// Store active users and their socket IDs
const activeUsers = new Map();
const userRooms = new Map();

io.on('connection', (socket) => {
    console.log(\`User \${socket.username} connected: \${socket.id}\`);
    
    // Store user connection
    activeUsers.set(socket.userId, {
        socketId: socket.id,
        username: socket.username,
        connectedAt: new Date(),
        status: 'online'
    });
    
    // Notify others about user coming online
    socket.broadcast.emit('user_online', {
        userId: socket.userId,
        username: socket.username
    });
    
    // Send current online users to the newly connected user
    socket.emit('online_users', Array.from(activeUsers.values()));
    
    // Join user to their personal room for private messages
    socket.join(\`user_\${socket.userId}\`);
    
    // Chat functionality
    socket.on('join_room', async (data) => {
        try {
            const { roomId, roomType } = data;
            
            // Validate room access
            const hasAccess = await validateRoomAccess(socket.userId, roomId, roomType);
            if (!hasAccess) {
                socket.emit('error', { message: 'Access denied to this room' });
                return;
            }
            
            // Leave previous rooms (except personal room)
            const previousRooms = userRooms.get(socket.userId) || [];
            previousRooms.forEach(room => {
                if (!room.startsWith('user_')) {
                    socket.leave(room);
                }
            });
            
            // Join new room
            socket.join(roomId);
            userRooms.set(socket.userId, [roomId]);
            
            // Notify room about new user
            socket.to(roomId).emit('user_joined_room', {
                userId: socket.userId,
                username: socket.username,
                roomId
            });
            
            // Send room info and recent messages
            const roomInfo = await getRoomInfo(roomId);
            const recentMessages = await getRecentMessages(roomId, 50);
            
            socket.emit('room_joined', {
                roomId,
                roomInfo,
                messages: recentMessages
            });
            
        } catch (error) {
            socket.emit('error', { message: 'Failed to join room' });
        }
    });
    
    // Handle chat messages
    socket.on('send_message', async (data) => {
        try {
            const { roomId, message, messageType = 'text' } = data;
            
            // Validate message
            if (!message || message.trim().length === 0) {
                socket.emit('error', { message: 'Message cannot be empty' });
                return;
            }
            
            if (message.length > 1000) {
                socket.emit('error', { message: 'Message too long' });
                return;
            }
            
            // Check if user is in the room
            const userInRoom = socket.rooms.has(roomId);
            if (!userInRoom) {
                socket.emit('error', { message: 'You are not in this room' });
                return;
            }
            
            // Create message object
            const messageData = {
                id: generateMessageId(),
                roomId,
                userId: socket.userId,
                username: socket.username,
                message: message.trim(),
                messageType,
                timestamp: new Date(),
                edited: false
            };
            
            // Save message to database
            await saveMessage(messageData);
            
            // Broadcast message to room
            io.to(roomId).emit('new_message', messageData);
            
            // Update room's last activity
            await updateRoomActivity(roomId, messageData);
            
        } catch (error) {
            socket.emit('error', { message: 'Failed to send message' });
        }
    });
    
    // Handle private messages
    socket.on('send_private_message', async (data) => {
        try {
            const { recipientId, message } = data;
            
            // Validate recipient
            const recipient = await User.findById(recipientId);
            if (!recipient) {
                socket.emit('error', { message: 'Recipient not found' });
                return;
            }
            
            const messageData = {
                id: generateMessageId(),
                senderId: socket.userId,
                senderUsername: socket.username,
                recipientId,
                recipientUsername: recipient.username,
                message: message.trim(),
                timestamp: new Date(),
                isPrivate: true
            };
            
            // Save private message
            await savePrivateMessage(messageData);
            
            // Send to recipient if online
            io.to(\`user_\${recipientId}\`).emit('private_message', messageData);
            
            // Confirm to sender
            socket.emit('private_message_sent', messageData);
            
        } catch (error) {
            socket.emit('error', { message: 'Failed to send private message' });
        }
    });
    
    // Handle typing indicators
    socket.on('typing_start', (data) => {
        const { roomId } = data;
        socket.to(roomId).emit('user_typing', {
            userId: socket.userId,
            username: socket.username,
            roomId
        });
    });
    
    socket.on('typing_stop', (data) => {
        const { roomId } = data;
        socket.to(roomId).emit('user_stopped_typing', {
            userId: socket.userId,
            username: socket.username,
            roomId
        });
    });
    
    // Handle live notifications
    socket.on('subscribe_notifications', () => {
        socket.join(\`notifications_\${socket.userId}\`);
    });
    
    // Handle live document collaboration
    socket.on('join_document', async (data) => {
        const { documentId } = data;
        
        // Validate document access
        const hasAccess = await validateDocumentAccess(socket.userId, documentId);
        if (!hasAccess) {
            socket.emit('error', { message: 'Access denied to this document' });
            return;
        }
        
        socket.join(\`document_\${documentId}\`);
        
        // Notify others about new collaborator
        socket.to(\`document_\${documentId}\`).emit('collaborator_joined', {
            userId: socket.userId,
            username: socket.username
        });
    });
    
    socket.on('document_change', (data) => {
        const { documentId, changes, version } = data;
        
        // Broadcast changes to other collaborators
        socket.to(\`document_\${documentId}\`).emit('document_updated', {
            changes,
            version,
            userId: socket.userId,
            username: socket.username
        });
    });
    
    // Handle user status updates
    socket.on('update_status', (data) => {
        const { status } = data;
        const validStatuses = ['online', 'away', 'busy', 'invisible'];
        
        if (validStatuses.includes(status)) {
            activeUsers.set(socket.userId, {
                ...activeUsers.get(socket.userId),
                status
            });
            
            // Broadcast status update
            socket.broadcast.emit('user_status_changed', {
                userId: socket.userId,
                status
            });
        }
    });
    
    // Handle disconnection
    socket.on('disconnect', (reason) => {
        console.log(\`User \${socket.username} disconnected: \${reason}\`);
        
        // Remove from active users
        activeUsers.delete(socket.userId);
        userRooms.delete(socket.userId);
        
        // Notify others about user going offline
        socket.broadcast.emit('user_offline', {
            userId: socket.userId,
            username: socket.username
        });
        
        // Leave all rooms
        const rooms = Array.from(socket.rooms);
        rooms.forEach(room => {
            if (room !== socket.id) {
                socket.to(room).emit('user_left_room', {
                    userId: socket.userId,
                    username: socket.username,
                    roomId: room
                });
            }
        });
    });
    
    // Handle errors
    socket.on('error', (error) => {
        console.error(\`Socket error for user \${socket.username}:\`, error);
        socket.emit('error', { message: 'An error occurred' });
    });
});

// Utility functions
function generateMessageId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

async function validateRoomAccess(userId, roomId, roomType) {
    // Implement room access validation logic
    return true; // Simplified for example
}

async function getRoomInfo(roomId) {
    // Get room information from database
    return { id: roomId, name: 'Room Name', type: 'public' };
}

async function getRecentMessages(roomId, limit) {
    // Get recent messages from database
    return [];
}

async function saveMessage(messageData) {
    // Save message to database
    console.log('Saving message:', messageData);
}

async function savePrivateMessage(messageData) {
    // Save private message to database
    console.log('Saving private message:', messageData);
}

async function updateRoomActivity(roomId, messageData) {
    // Update room's last activity
    console.log('Updating room activity:', roomId);
}

async function validateDocumentAccess(userId, documentId) {
    // Validate document access
    return true;
}

// API endpoints for sending notifications
app.post('/api/notify', async (req, res) => {
    const { userId, notification } = req.body;
    
    // Send notification via Socket.io
    io.to(\`notifications_\${userId}\`).emit('notification', notification);
    
    res.json({ success: true });
});

// Broadcast to all users
app.post('/api/broadcast', async (req, res) => {
    const { message, type } = req.body;
    
    io.emit('broadcast', { message, type, timestamp: new Date() });
    
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});`,
    explanation: 'Complete Socket.io implementation with authentication, room management, private messaging, typing indicators, and real-time collaboration features.',
    bestPractices: [
      'Implement proper authentication for Socket.io connections',
      'Use Redis adapter for horizontal scaling',
      'Validate all incoming socket events',
      'Implement rate limiting for socket events',
      'Use rooms for organizing connections',
      'Handle disconnections gracefully',
      'Store connection state in external storage (Redis)',
      'Implement proper error handling',
      'Use namespaces for different features',
      'Monitor socket connections and performance'
    ],
    commonPitfalls: [
      'Not implementing authentication for socket connections',
      'Not handling disconnections properly',
      'Storing state only in memory (not scalable)',
      'Not validating socket event data',
      'Not implementing rate limiting',
      'Broadcasting to all users instead of specific rooms',
      'Not handling socket errors',
      'Memory leaks from not cleaning up listeners'
    ],
    codeExamples: [
      {
        title: 'Client-Side Socket.io Implementation',
        code: `// client.js - React/JavaScript client
import io from 'socket.io-client';

class SocketService {
    constructor() {
        this.socket = null;
        this.listeners = new Map();
    }
    
    connect(token) {
        this.socket = io(process.env.REACT_APP_SERVER_URL, {
            auth: { token },
            transports: ['websocket', 'polling']
        });
        
        this.socket.on('connect', () => {
            console.log('Connected to server');
        });
        
        this.socket.on('disconnect', (reason) => {
            console.log('Disconnected:', reason);
            if (reason === 'io server disconnect') {
                // Reconnect manually
                this.socket.connect();
            }
        });
        
        this.socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
        
        return this.socket;
    }
    
    joinRoom(roomId, roomType) {
        this.socket.emit('join_room', { roomId, roomType });
    }
    
    sendMessage(roomId, message, messageType = 'text') {
        this.socket.emit('send_message', {
            roomId,
            message,
            messageType
        });
    }
    
    sendPrivateMessage(recipientId, message) {
        this.socket.emit('send_private_message', {
            recipientId,
            message
        });
    }
    
    startTyping(roomId) {
        this.socket.emit('typing_start', { roomId });
    }
    
    stopTyping(roomId) {
        this.socket.emit('typing_stop', { roomId });
    }
    
    updateStatus(status) {
        this.socket.emit('update_status', { status });
    }
    
    subscribeToNotifications() {
        this.socket.emit('subscribe_notifications');
    }
    
    // Event listeners
    onMessage(callback) {
        this.socket.on('new_message', callback);
    }
    
    onPrivateMessage(callback) {
        this.socket.on('private_message', callback);
    }
    
    onUserOnline(callback) {
        this.socket.on('user_online', callback);
    }
    
    onUserOffline(callback) {
        this.socket.on('user_offline', callback);
    }
    
    onTyping(callback) {
        this.socket.on('user_typing', callback);
    }
    
    onStoppedTyping(callback) {
        this.socket.on('user_stopped_typing', callback);
    }
    
    onNotification(callback) {
        this.socket.on('notification', callback);
    }
    
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export default new SocketService();`,
        language: 'javascript',
        explanation: 'Client-side Socket.io service for React applications with proper connection management and event handling.'
      }
    ],
    tags: ['socketio', 'realtime', 'websockets', 'chat', 'notifications'],
    difficulty: 'advanced',
    language: 'javascript'
  },

  // 🌐 8. Async, Threading, Concurrency
  {
    id: 'async-python-comprehensive',
    title: 'Python Async/Await and Threading',
    category: 'async',
    type: 'snippet',
    description: 'Master Python asynchronous programming with asyncio, threading, and concurrent execution patterns',
    code: `import asyncio
import aiohttp
import threading
import concurrent.futures
import time
from typing import List, Dict, Any
from dataclasses import dataclass
import queue

# Basic async/await patterns
async def fetch_data(url: str, session: aiohttp.ClientSession) -> Dict[str, Any]:
    """Fetch data from URL asynchronously."""
    try:
        async with session.get(url) as response:
            if response.status == 200:
                return await response.json()
            else:
                return {"error": f"HTTP {response.status}"}
    except Exception as e:
        return {"error": str(e)}

async def fetch_multiple_urls(urls: List[str]) -> List[Dict[str, Any]]:
    """Fetch multiple URLs concurrently."""
    async with aiohttp.ClientSession() as session:
        # Create tasks for concurrent execution
        tasks = [fetch_data(url, session) for url in urls]
        
        # Wait for all tasks to complete
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        return results

# Async context managers
class AsyncDatabaseConnection:
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        self.connection = None
    
    async def __aenter__(self):
        # Simulate async connection
        await asyncio.sleep(0.1)
        self.connection = f"Connected to {self.connection_string}"
        print(f"Database connected: {self.connection}")
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        # Simulate async cleanup
        await asyncio.sleep(0.1)
        print(f"Database disconnected: {self.connection}")
        self.connection = None
    
    async def execute_query(self, query: str) -> List[Dict]:
        """Execute database query."""
        await asyncio.sleep(0.2)  # Simulate query execution
        return [{"result": f"Query executed: {query}"}]

# Async generators
async def async_number_generator(start: int, end: int, delay: float = 0.1):
    """Generate numbers asynchronously."""
    for i in range(start, end):
        await asyncio.sleep(delay)
        yield i

async def process_async_generator():
    """Process async generator."""
    async for number in async_number_generator(1, 6):
        print(f"Processing number: {number}")

# Producer-Consumer pattern with asyncio
class AsyncProducerConsumer:
    def __init__(self, max_queue_size: int = 10):
        self.queue = asyncio.Queue(maxsize=max_queue_size)
        self.is_running = False
    
    async def producer(self, name: str, items: List[Any]):
        """Produce items and put them in queue."""
        for item in items:
            await self.queue.put(f"{name}: {item}")
            print(f"Produced: {name}: {item}")
            await asyncio.sleep(0.1)
        
        # Signal completion
        await self.queue.put(None)
    
    async def consumer(self, name: str):
        """Consume items from queue."""
        while True:
            item = await self.queue.get()
            if item is None:
                # Signal to stop
                await self.queue.put(None)
                break
            
            print(f"Consumed by {name}: {item}")
            await asyncio.sleep(0.2)
            self.queue.task_done()
    
    async def run(self, producers_data: Dict[str, List[Any]], num_consumers: int = 2):
        """Run producer-consumer system."""
        # Create producer tasks
        producer_tasks = [
            self.producer(name, items) 
            for name, items in producers_data.items()
        ]
        
        # Create consumer tasks
        consumer_tasks = [
            self.consumer(f"Consumer-{i}") 
            for i in range(num_consumers)
        ]
        
        # Run all tasks concurrently
        await asyncio.gather(*producer_tasks, *consumer_tasks)

# Threading examples
class ThreadSafeCounter:
    def __init__(self):
        self._value = 0
        self._lock = threading.Lock()
    
    def increment(self):
        with self._lock:
            self._value += 1
    
    def get_value(self):
        with self._lock:
            return self._value

def cpu_bound_task(n: int) -> int:
    """CPU-intensive task for threading example."""
    result = 0
    for i in range(n):
        result += i ** 2
    return result

def io_bound_task(delay: float) -> str:
    """I/O-bound task simulation."""
    time.sleep(delay)
    return f"Task completed after {delay} seconds"

# Thread pool executor
def run_with_thread_pool():
    """Run tasks using ThreadPoolExecutor."""
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        # Submit CPU-bound tasks
        cpu_futures = [
            executor.submit(cpu_bound_task, 100000) 
            for _ in range(4)
        ]
        
        # Submit I/O-bound tasks
        io_futures = [
            executor.submit(io_bound_task, 1.0) 
            for _ in range(4)
        ]
        
        # Get results
        cpu_results = [future.result() for future in cpu_futures]
        io_results = [future.result() for future in io_futures]
        
        return cpu_results, io_results

# Process pool for CPU-intensive tasks
def run_with_process_pool():
    """Run CPU-intensive tasks using ProcessPoolExecutor."""
    with concurrent.futures.ProcessPoolExecutor(max_workers=4) as executor:
        futures = [
            executor.submit(cpu_bound_task, 1000000) 
            for _ in range(4)
        ]
        
        results = [future.result() for future in futures]
        return results

# Combining async and threading
async def async_with_threading():
    """Combine async and threading for mixed workloads."""
    loop = asyncio.get_event_loop()
    
    # Run CPU-bound task in thread pool
    with concurrent.futures.ThreadPoolExecutor() as executor:
        cpu_result = await loop.run_in_executor(
            executor, cpu_bound_task, 100000
        )
    
    # Run I/O-bound task asynchronously
    async with aiohttp.ClientSession() as session:
        io_result = await fetch_data("https://api.github.com/users/octocat", session)
    
    return cpu_result, io_result

# Async rate limiting
class AsyncRateLimiter:
    def __init__(self, max_calls: int, time_window: float):
        self.max_calls = max_calls
        self.time_window = time_window
        self.calls = []
        self.lock = asyncio.Lock()
    
    async def acquire(self):
        """Acquire permission to make a call."""
        async with self.lock:
            now = time.time()
            
            # Remove old calls outside time window
            self.calls = [call_time for call_time in self.calls 
                         if now - call_time < self.time_window]
            
            if len(self.calls) >= self.max_calls:
                # Calculate wait time
                oldest_call = min(self.calls)
                wait_time = self.time_window - (now - oldest_call)
                await asyncio.sleep(wait_time)
                return await self.acquire()
            
            self.calls.append(now)

# Example usage functions
async def main_async_examples():
    """Run async examples."""
    print("=== Async Examples ===")
    
    # Fetch multiple URLs
    urls = [
        "https://api.github.com/users/octocat",
        "https://api.github.com/users/defunkt",
        "https://api.github.com/users/pjhyett"
    ]
    
    start_time = time.time()
    results = await fetch_multiple_urls(urls)
    end_time = time.time()
    
    print(f"Fetched {len(results)} URLs in {end_time - start_time:.2f} seconds")
    
    # Async context manager
    async with AsyncDatabaseConnection("postgresql://localhost/mydb") as db:
        result = await db.execute_query("SELECT * FROM users")
        print(f"Query result: {result}")
    
    # Async generator
    await process_async_generator()
    
    # Producer-Consumer
    pc = AsyncProducerConsumer()
    await pc.run({
        "Producer1": ["item1", "item2", "item3"],
        "Producer2": ["itemA", "itemB", "itemC"]
    })
    
    # Combine async and threading
    cpu_result, io_result = await async_with_threading()
    print(f"CPU result: {cpu_result}, IO result: {io_result}")

def main_threading_examples():
    """Run threading examples."""
    print("\\n=== Threading Examples ===")
    
    # Thread-safe counter
    counter = ThreadSafeCounter()
    
    def increment_counter():
        for _ in range(1000):
            counter.increment()
    
    threads = [threading.Thread(target=increment_counter) for _ in range(5)]
    
    for thread in threads:
        thread.start()
    
    for thread in threads:
        thread.join()
    
    print(f"Final counter value: {counter.get_value()}")
    
    # Thread pool executor
    start_time = time.time()
    cpu_results, io_results = run_with_thread_pool()
    end_time = time.time()
    
    print(f"Thread pool completed in {end_time - start_time:.2f} seconds")
    print(f"CPU results: {cpu_results[:2]}...")  # Show first 2 results
    print(f"IO results: {io_results[:2]}...")

if __name__ == "__main__":
    # Run async examples
    asyncio.run(main_async_examples())
    
    # Run threading examples
    main_threading_examples()`,
    explanation: 'Comprehensive guide to Python asynchronous programming covering asyncio, threading, concurrent execution, and best practices for handling I/O-bound and CPU-bound tasks.',
    bestPractices: [
      'Use asyncio for I/O-bound tasks (network requests, file operations)',
      'Use threading for I/O-bound tasks when asyncio is not available',
      'Use multiprocessing for CPU-bound tasks',
      'Always use async context managers for resource management',
      'Implement proper error handling in async functions',
      'Use asyncio.gather() for concurrent execution',
      'Use locks for thread-safe operations',
      'Avoid blocking operations in async functions',
      'Use connection pooling for database operations'
    ],
    commonPitfalls: [
      'Using blocking operations in async functions',
      'Not handling exceptions in async tasks',
      'Creating too many threads (use thread pools)',
      'Not using locks for shared data in threading',
      'Mixing sync and async code incorrectly',
      'Not closing async resources properly',
      'Using asyncio for CPU-bound tasks',
      'Forgetting to await async functions'
    ],
    tags: ['python', 'async', 'threading', 'concurrency', 'asyncio'],
    difficulty: 'advanced',
    language: 'python'
  },

  // 📚 15. Common Libraries
  {
    id: 'libraries-python-essential',
    title: 'Essential Python Libraries for Web Development',
    category: 'libraries',
    type: 'guide',
    description: 'Comprehensive guide to essential Python libraries: requests, pydantic, celery, redis, and more',
    code: `# requests - HTTP library for Python
import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
import json

# Basic requests usage
def make_http_requests():
    """Examples of using requests library."""
    
    # GET request
    response = requests.get('https://api.github.com/users/octocat')
    if response.status_code == 200:
        user_data = response.json()
        print(f"User: {user_data['name']}")
    
    # POST request with JSON data
    data = {'name': 'John', 'email': 'john@example.com'}
    response = requests.post(
        'https://httpbin.org/post',
        json=data,
        headers={'Content-Type': 'application/json'}
    )
    
    # Request with authentication
    response = requests.get(
        'https://api.github.com/user',
        headers={'Authorization': 'token YOUR_TOKEN'}
    )
    
    # Session for connection pooling
    session = requests.Session()
    session.headers.update({'User-Agent': 'MyApp/1.0'})
    
    # Retry strategy
    retry_strategy = Retry(
        total=3,
        backoff_factor=1,
        status_forcelist=[429, 500, 502, 503, 504],
    )
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    
    return session.get('https://api.github.com/users/octocat')

# pydantic - Data validation using Python type annotations
from pydantic import BaseModel, validator, Field, EmailStr
from typing import Optional, List
from datetime import datetime

class Address(BaseModel):
    street: str
    city: str
    country: str
    postal_code: str = Field(..., regex=r'^\\d{5}(-\\d{4})?$')

class User(BaseModel):
    id: int
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    age: int = Field(..., ge=0, le=150)
    is_active: bool = True
    tags: List[str] = []
    address: Optional[Address] = None
    created_at: datetime = Field(default_factory=datetime.now)
    
    @validator('name')
    def name_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty')
        return v.title()
    
    @validator('tags')
    def tags_must_be_unique(cls, v):
        if len(v) != len(set(v)):
            raise ValueError('Tags must be unique')
        return v
    
    class Config:
        # Example of using Pydantic with ORM
        orm_mode = True
        # JSON schema customization
        schema_extra = {
            "example": {
                "id": 1,
                "name": "John Doe",
                "email": "john@example.com",
                "age": 30,
                "is_active": True,
                "tags": ["developer", "python"],
                "address": {
                    "street": "123 Main St",
                    "city": "New York",
                    "country": "USA",
                    "postal_code": "10001"
                }
            }
        }

# Usage of Pydantic models
def pydantic_examples():
    """Examples of using Pydantic for data validation."""
    
    # Valid data
    user_data = {
        "id": 1,
        "name": "john doe",
        "email": "john@example.com",
        "age": 30,
        "tags": ["developer", "python"]
    }
    
    user = User(**user_data)
    print(f"User: {user.name}")  # Will be title-cased
    print(f"JSON: {user.json()}")
    
    # Validation error handling
    try:
        invalid_user = User(
            id=1,
            name="",  # Invalid: empty name
            email="invalid-email",  # Invalid: not an email
            age=-5  # Invalid: negative age
        )
    except ValueError as e:
        print(f"Validation error: {e}")

# celery - Distributed task queue
from celery import Celery
from celery.result import AsyncResult
import time

# Celery configuration
app = Celery('tasks', broker='redis://localhost:6379/0')

app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
    result_backend='redis://localhost:6379/0',
    task_routes={
        'tasks.send_email': {'queue': 'email'},
        'tasks.process_image': {'queue': 'image_processing'},
    }
)

@app.task(bind=True, max_retries=3)
def send_email(self, to_email, subject, body):
    """Send email task with retry logic."""
    try:
        # Simulate email sending
        time.sleep(2)
        print(f"Email sent to {to_email}: {subject}")
        return {"status": "sent", "to": to_email}
    except Exception as exc:
        print(f"Email sending failed: {exc}")
        raise self.retry(exc=exc, countdown=60)

@app.task
def process_image(image_path, filters):
    """Process image with given filters."""
    # Simulate image processing
    time.sleep(5)
    return {
        "status": "processed",
        "image_path": image_path,
        "filters_applied": filters
    }

@app.task
def generate_report(user_id, report_type):
    """Generate user report."""
    # Simulate report generation
    time.sleep(10)
    return {
        "user_id": user_id,
        "report_type": report_type,
        "generated_at": datetime.now().isoformat(),
        "file_path": f"/reports/{user_id}_{report_type}.pdf"
    }

# Using Celery tasks
def celery_examples():
    """Examples of using Celery for background tasks."""
    
    # Send task to queue
    result = send_email.delay(
        "user@example.com",
        "Welcome!",
        "Welcome to our platform!"
    )
    
    print(f"Task ID: {result.id}")
    
    # Check task status
    if result.ready():
        print(f"Result: {result.result}")
    else:
        print("Task is still processing...")
    
    # Chain tasks
    from celery import chain
    workflow = chain(
        process_image.s("/path/to/image.jpg", ["resize", "blur"]),
        generate_report.s("user123", "image_analysis")
    )
    result = workflow.apply_async()
    
    # Group tasks
    from celery import group
    job = group([
        send_email.s(f"user{i}@example.com", "Newsletter", "Content")
        for i in range(10)
    ])
    result = job.apply_async()

# redis - In-memory data structure store
import redis
import json
from datetime import timedelta

class RedisCache:
    """Redis cache wrapper with common operations."""
    
    def __init__(self, host='localhost', port=6379, db=0):
        self.redis_client = redis.Redis(
            host=host,
            port=port,
            db=db,
            decode_responses=True
        )
    
    def set(self, key: str, value: any, expire: int = None):
        """Set a key-value pair with optional expiration."""
        if isinstance(value, (dict, list)):
            value = json.dumps(value)
        
        return self.redis_client.set(key, value, ex=expire)
    
    def get(self, key: str):
        """Get value by key."""
        value = self.redis_client.get(key)
        if value:
            try:
                return json.loads(value)
            except json.JSONDecodeError:
                return value
        return None
    
    def delete(self, key: str):
        """Delete a key."""
        return self.redis_client.delete(key)
    
    def exists(self, key: str):
        """Check if key exists."""
        return self.redis_client.exists(key)
    
    def increment(self, key: str, amount: int = 1):
        """Increment a counter."""
        return self.redis_client.incr(key, amount)
    
    def set_hash(self, key: str, mapping: dict):
        """Set hash fields."""
        return self.redis_client.hset(key, mapping=mapping)
    
    def get_hash(self, key: str, field: str = None):
        """Get hash field or entire hash."""
        if field:
            return self.redis_client.hget(key, field)
        return self.redis_client.hgetall(key)
    
    def add_to_set(self, key: str, *values):
        """Add values to a set."""
        return self.redis_client.sadd(key, *values)
    
    def get_set_members(self, key: str):
        """Get all set members."""
        return self.redis_client.smembers(key)
    
    def push_to_list(self, key: str, *values):
        """Push values to list."""
        return self.redis_client.lpush(key, *values)
    
    def pop_from_list(self, key: str):
        """Pop value from list."""
        return self.redis_client.rpop(key)

# Usage examples
def redis_examples():
    """Examples of using Redis for caching and data storage."""
    cache = RedisCache()
    
    # Simple caching
    cache.set("user:123", {"name": "John", "email": "john@example.com"}, expire=3600)
    user = cache.get("user:123")
    print(f"Cached user: {user}")
    
    # Counter
    cache.increment("page_views")
    views = cache.get("page_views")
    print(f"Page views: {views}")
    
    # Session storage
    session_data = {
        "user_id": 123,
        "username": "john_doe",
        "last_activity": datetime.now().isoformat()
    }
    cache.set("session:abc123", session_data, expire=1800)
    
    # Rate limiting
    user_id = "user:123"
    current_minute = int(time.time() // 60)
    rate_limit_key = f"rate_limit:{user_id}:{current_minute}"
    
    requests_count = cache.increment(rate_limit_key)
    cache.redis_client.expire(rate_limit_key, 60)  # Expire after 1 minute
    
    if requests_count > 100:  # Rate limit: 100 requests per minute
        print("Rate limit exceeded")
    else:
        print(f"Request allowed. Count: {requests_count}")

# Django REST Framework (DRF) integration
from rest_framework import serializers, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User as DjangoUser

class UserSerializer(serializers.ModelSerializer):
    """User serializer with custom validation."""
    
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = DjangoUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                 'password', 'confirm_password', 'is_active', 'date_joined']
        read_only_fields = ['id', 'date_joined']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Passwords don't match")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        user = DjangoUser.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

class UserViewSet(viewsets.ModelViewSet):
    """User ViewSet with custom actions."""
    
    queryset = DjangoUser.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=True, methods=['post'])
    def set_password(self, request, pk=None):
        """Custom action to change user password."""
        user = self.get_object()
        serializer = PasswordChangeSerializer(data=request.data)
        
        if serializer.is_valid():
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response({'status': 'password set'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def active_users(self, request):
        """Get all active users."""
        active_users = self.queryset.filter(is_active=True)
        serializer = self.get_serializer(active_users, many=True)
        return Response(serializer.data)`,
    explanation: 'Essential Python libraries for web development including HTTP requests, data validation, background tasks, caching, and API development.',
    bestPractices: [
      'Use requests sessions for connection pooling and persistent settings',
      'Implement retry strategies for HTTP requests',
      'Use Pydantic for data validation and serialization',
      'Configure Celery with proper queues and routing',
      'Implement proper error handling and retries in Celery tasks',
      'Use Redis for caching, sessions, and rate limiting',
      'Set appropriate expiration times for cached data',
      'Use DRF serializers for API data validation',
      'Implement proper authentication and permissions',
      'Use connection pooling for database and Redis connections'
    ],
    commonPitfalls: [
      'Not handling HTTP request timeouts and errors',
      'Not using connection pooling for repeated requests',
      'Ignoring Pydantic validation errors',
      'Not configuring Celery task routing properly',
      'Not implementing task retry logic',
      'Not setting Redis key expiration times',
      'Storing sensitive data in Redis without encryption',
      'Not implementing proper API pagination',
      'Not handling serialization errors in DRF'
    ],
    tags: ['python', 'libraries', 'requests', 'pydantic', 'celery', 'redis', 'drf'],
    difficulty: 'intermediate',
    language: 'python'
  }
];

export const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'setup', label: '⚙️ Setup & Startup' },
  { value: 'packages', label: '📦 Package Management' },
  { value: 'dsa', label: '🧠 DSA Basics' },
  { value: 'oop', label: '👨‍🏫 Object-Oriented Programming' },
  { value: 'frameworks', label: '🔧 Framework Usage' },
  { value: 'database', label: '💾 Database Integration' },
  { value: 'realtime', label: '🔌 Real-Time Communication' },
  { value: 'async', label: '🌐 Async & Threading' },
  { value: 'data-handling', label: '🧪 Data Handling' },
  { value: 'templates', label: '🧱 Template Engines' },
  { value: 'production', label: '🚀 Production Deployment' },
  { value: 'docker', label: '🐳 Docker Integration' },
  { value: 'aws', label: '☁️ AWS Deployment' },
  { value: 'ai', label: '🤖 AI/ML & RAG' },
  { value: 'libraries', label: '📚 Common Libraries' }
];