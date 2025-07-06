import { KnowledgeItem } from '../types';

export const dsaItems: KnowledgeItem[] = [
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
  }
]; 