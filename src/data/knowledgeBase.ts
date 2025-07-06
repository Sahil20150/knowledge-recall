import { setupKnowledgeItems } from './knowledgeBase/setup';
import { packagesKnowledgeItems } from './knowledgeBase/packages';
import { dsaItems } from './knowledgeBase/dsa';
import { oopItems } from './knowledgeBase/oop';
import { frameworksItems } from './knowledgeBase/frameworks';
import { databaseKnowledgeItems } from './knowledgeBase/database';
import { realtimeItems } from './knowledgeBase/realtime';
import { asyncItems } from './knowledgeBase/async';
import { dataHandlingItems } from './knowledgeBase/data-handling';
import { templatesItems } from './knowledgeBase/templates';
import { productionItems } from './knowledgeBase/production';
import { dockerItems } from './knowledgeBase/docker';
import { awsItems } from './knowledgeBase/aws';
import { aiItems } from './knowledgeBase/ai';
import { librariesItems } from './knowledgeBase/libraries';
import { CodeExample, KnowledgeItem } from './types';

export type { CodeExample, KnowledgeItem };

export const knowledgeItems: KnowledgeItem[] = [
  ...setupKnowledgeItems,
  ...packagesKnowledgeItems,
  ...dsaItems,
  ...oopItems,
  ...frameworksItems,
  ...databaseKnowledgeItems,
  ...realtimeItems,
  ...asyncItems,
  ...dataHandlingItems,
  ...templatesItems,
  ...productionItems,
  ...dockerItems,
  ...awsItems,
  ...aiItems,
  ...librariesItems
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