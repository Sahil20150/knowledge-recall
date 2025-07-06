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
  language?: 'python' | 'javascript'| 'bash' | 'dockerfile' | 'yaml' | 'nginx' | 'both';
} 