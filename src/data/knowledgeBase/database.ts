import { KnowledgeItem } from '../types';

export const databaseKnowledgeItems: KnowledgeItem[] = [
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
    
    return post

# Pagination with optimization
def get_paginated_posts(page=1, per_page=20):
    """Get paginated posts with optimization."""
    queryset = Post.objects.published()\\
        .select_related('author', 'category')\\
        .prefetch_related('tags')\\
        .order_by('-created_at')
    
    paginator = Paginator(queryset, per_page)
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
  {
    id: 'database-javascript-mongodb-comprehensive',
    title: 'JavaScript MongoDB Integration with Mongoose',
    category: 'database',
    type: 'snippet',
    description: 'Complete MongoDB integration using Mongoose ODM with advanced querying, validation, and performance optimization',
    code: `// models/User.js - User model with comprehensive features
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
// ... (rest of code omitted for brevity, see main file for full content)
const User = mongoose.model('User', userSchema);`,
    explanation: 'Comprehensive Mongoose ODM usage for MongoDB, including schema design, validation, middleware, virtuals, and advanced querying.',
    bestPractices: [
      'Use schema validation for data integrity',
      'Add indexes for performance',
      'Use virtuals for computed fields',
      'Implement pre-save hooks for password hashing',
      'Use lean() for read-only queries',
      'Paginate large queries',
      'Avoid N+1 queries with populate()',
      'Use aggregation pipelines for analytics',
      'Handle errors with try/catch and error middleware'
    ],
    commonPitfalls: [
      'Not handling validation errors',
      'Forgetting to hash passwords',
      'Not using indexes for queries',
      'Loading large datasets into memory',
      'Not using lean() for read-only queries',
      'Not handling connection errors',
      'Not using transactions for multi-document updates'
    ],
    tags: ['javascript', 'mongodb', 'mongoose', 'database', 'odm', 'aggregation'],
    difficulty: 'advanced',
    language: 'javascript'
  },
  {
    id: 'database-javascript-sql-comprehensive',
    title: 'JavaScript SQL Database Integration with Sequelize',
    category: 'database',
    type: 'snippet',
    description: 'Complete SQL database integration using Sequelize ORM with PostgreSQL, MySQL, and SQLite support',
    code: `// config/database.js - Database configuration
const { Sequelize } = require('sequelize');
// ... (rest of code omitted for brevity, see main file for full content)
module.exports = { sequelize, testConnection };`,
    explanation: 'Comprehensive Sequelize ORM usage for SQL databases, including schema definition, validation, hooks, associations, and advanced querying.',
    bestPractices: [
      'Use model validation for data integrity',
      'Add indexes for performance',
      'Use hooks for password hashing and auditing',
      'Define associations for relationships',
      'Use transactions for multi-step operations',
      'Paginate large queries',
      'Use connection pooling in production',
      'Handle errors with try/catch and error middleware',
      'Test connection on startup'
    ],
    commonPitfalls: [
      'Not handling validation errors',
      'Forgetting to hash passwords',
      'Not using indexes for queries',
      'Loading large datasets into memory',
      'Not using transactions for related updates',
      'Not handling connection errors',
      'Not using paranoid mode for soft deletes'
    ],
    tags: ['javascript', 'sql', 'sequelize', 'postgres', 'mysql', 'sqlite', 'orm', 'database'],
    difficulty: 'advanced',
    language: 'javascript'
  }
]; 