import { KnowledgeItem } from '../types';

export const oopItems: KnowledgeItem[] = [
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
  }
]; 