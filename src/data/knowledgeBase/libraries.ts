import { KnowledgeItem } from '../types';

export const librariesItems: KnowledgeItem[] = [
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
// ... (rest of code omitted for brevity, see main file for full content)
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