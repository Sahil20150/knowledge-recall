export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  progress: UserProgress;
}

export interface UserProgress {
  completedLessons: string[];
  currentStreak: number;
  totalPoints: number;
  level: number;
}

export interface CodeExecution {
  id: string;
  code: string;
  language: 'python' | 'javascript';
  output: string;
  errors?: string;
  executionTime: number;
  timestamp: Date;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  lessons: Lesson[];
  estimatedTime: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  codeTemplate: {
    python: string;
    javascript: string;
  };
  expectedOutput: string;
  hints: string[];
  isCompleted: boolean;
}

export interface AIAssistance {
  type: 'explanation' | 'correction' | 'generation' | 'suggestion';
  content: string;
  confidence: number;
}

export interface TerminalSession {
  id: string;
  commands: TerminalCommand[];
  isActive: boolean;
}

export interface TerminalCommand {
  command: string;
  output: string;
  timestamp: Date;
  exitCode: number;
}