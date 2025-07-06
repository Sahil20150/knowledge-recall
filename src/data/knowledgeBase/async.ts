import { KnowledgeItem } from '../types';

export const asyncItems: KnowledgeItem[] = [
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
// ... (rest of code omitted for brevity, see main file for full content)
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
  }
]; 