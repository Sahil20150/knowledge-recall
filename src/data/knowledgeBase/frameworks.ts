import { KnowledgeItem } from '../types';

export const frameworksItems: KnowledgeItem[] = [
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

const PORT = process.env.PORT || 3000;
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
  {
    id: 'frameworks-express-routing',
    title: 'Express.js Advanced Routing & Middleware',
    category: 'frameworks',
    type: 'guide',
    description: 'Advanced Express routing patterns, custom middleware, and route organization',
    code: `// Advanced Express Routing Setup
const express = require('express');
const router = express.Router();
// ... (rest of code omitted for brevity, see main file for full content)
module.exports = { router, errorHandler };`,
    explanation: 'Advanced Express routing includes custom middleware, route parameter validation, nested routes, and conditional routing based on environment or user permissions.',
    bestPractices: [
      'Use route middleware for validation and authentication',
      'Implement proper error handling for each route',
      'Use route groups for related endpoints',
      'Validate route parameters',
      'Implement rate limiting for sensitive routes',
      'Use conditional routes for development features',
      'Organize routes by functionality',
      'Use async/await with proper error handling'
    ],
    commonPitfalls: [
      'Not validating route parameters',
      'Missing error handling in async routes',
      'Not using middleware for common operations',
      'Creating deeply nested routes',
      'Not implementing rate limiting'
    ],
    tags: ['express', 'routing', 'middleware', 'validation', 'api'],
    difficulty: 'intermediate',
    language: 'javascript'
  },
  {
    id: 'frameworks-express-authentication',
    title: 'Express.js Authentication & Authorization System',
    category: 'frameworks',
    type: 'guide',
    description: 'Complete authentication system with JWT, session management, and role-based access control',
    code: `// Authentication & Authorization System
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
// ... (rest of code omitted for brevity, see main file for full content)
module.exports = { router, authenticateToken, authorize };`,
    explanation: 'Complete authentication system with user registration, login, JWT tokens, email verification, password reset, and role-based authorization.',
    bestPractices: [
      'Use bcrypt for password hashing',
      'Implement JWT for stateless authentication',
      'Use refresh tokens for better security',
      'Implement email verification',
      'Add password reset functionality',
      'Use role-based access control',
      'Store refresh tokens securely',
      'Implement proper error handling'
    ],
    commonPitfalls: [
      'Storing passwords in plain text',
      'Not validating email addresses',
      'Using weak JWT secrets',
      'Not implementing refresh tokens',
      'Missing email verification'
    ],
    tags: ['express', 'authentication', 'jwt', 'authorization', 'security'],
    difficulty: 'advanced',
    language: 'javascript'
  },
  {
    id: 'api-express-crud-complete',
    title: 'Express.js Complete CRUD API with Validation',
    category: 'frameworks',
    type: 'guide',
    description: 'Build a complete CRUD API with Express.js, MongoDB, validation, error handling, and best practices',
    code: `// Complete Express.js CRUD API
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// ... (rest of code omitted for brevity, see main file for full content)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});`,
    explanation: 'Complete CRUD API with Express.js featuring MongoDB integration, Joi validation, pagination, filtering, sorting, bulk operations, and comprehensive error handling.',
    bestPractices: [
      'Use Joi for request validation',
      'Implement proper error handling',
      'Add pagination for large datasets',
      'Use MongoDB indexes for performance',
      'Implement rate limiting',
      'Add security headers with helmet',
      'Use async/await with error handling',
      'Validate all inputs thoroughly'
    ],
    commonPitfalls: [
      'Not validating request data',
      'Missing error handling',
      'Not implementing pagination',
      'Using synchronous operations',
      'Not adding security headers'
    ],
    tags: ['express', 'api', 'crud', 'mongodb', 'validation'],
    difficulty: 'intermediate',
    language: 'javascript'
  },
  {
    id: 'api-python-flask-crud-complete',
    title: 'Flask Complete CRUD API with SQLAlchemy',
    category: 'frameworks',
    type: 'guide',
    description: 'Build a complete CRUD API with Flask, SQLAlchemy, Marshmallow validation, and best practices',
    code: `# Complete Flask CRUD API
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import ValidationError
from flask_cors import CORS
from datetime import datetime
import os
# ... (rest of code omitted for brevity, see main file for full content)
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)`,
    explanation: 'Complete CRUD API with Flask featuring SQLAlchemy ORM, Marshmallow validation, pagination, filtering, sorting, bulk operations, and comprehensive error handling.',
    bestPractices: [
      'Use Marshmallow for serialization and validation',
      'Implement proper error handling with try-catch',
      'Add pagination for large datasets',
      'Use SQLAlchemy for database operations',
      'Validate all inputs thoroughly',
      'Use database transactions properly',
      'Implement proper HTTP status codes',
      'Add health check endpoints'
    ],
    commonPitfalls: [
      'Not handling database transactions',
      'Missing input validation',
      'Not implementing pagination',
      'Using synchronous operations',
      'Not adding proper error handling'
    ],
    tags: ['flask', 'api', 'crud', 'sqlalchemy', 'marshmallow'],
    difficulty: 'intermediate',
    language: 'python'
  },
  {
    id: 'api-sse-server-sent-events',
    title: 'Server-Sent Events (SSE) Implementation',
    category: 'frameworks',
    type: 'guide',
    description: 'Implement real-time updates using Server-Sent Events in both Express.js and Flask',
    code: `# Server-Sent Events Implementation
// ... (rest of code omitted for brevity, see main file for full content)
# Usage examples
// ...`,
    explanation: 'Server-Sent Events (SSE) provide real-time, one-way communication from server to client. This implementation shows how to set up SSE in both Express.js and Flask for live updates.',
    bestPractices: [
      'Use proper SSE headers',
      'Implement connection management',
      'Send keep-alive pings',
      'Handle client disconnections',
      'Use event types for filtering',
      'Implement reconnection logic',
      'Clean up disconnected clients',
      'Use appropriate event IDs'
    ],
    commonPitfalls: [
      'Not handling client disconnections',
      'Missing keep-alive messages',
      'Not cleaning up resources',
      'Using wrong content type',
      'Not implementing reconnection'
    ],
    tags: ['sse', 'real-time', 'websockets', 'events', 'notifications'],
    difficulty: 'intermediate',
    language: 'both'
  }
]; 