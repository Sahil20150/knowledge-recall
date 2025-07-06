import { KnowledgeItem } from '../types';

export const realtimeItems: KnowledgeItem[] = [
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
// ... (rest of code omitted for brevity, see main file for full content)
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
// ... (rest of code omitted for brevity, see main file for full content)
export default new SocketService();`,
        language: 'javascript',
        explanation: 'Client-side Socket.io service for React applications with proper connection management and event handling.'
      }
    ],
    tags: ['socketio', 'realtime', 'websockets', 'chat', 'notifications'],
    difficulty: 'advanced',
    language: 'javascript'
  }
]; 