import { useState, useCallback } from 'react';
import { CodeExecution } from '../types';
import { Language } from '../components/playground/PlaygroundView';

export function useCodeExecution() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionHistory, setExecutionHistory] = useState<CodeExecution[]>([]);

  const executeCode = useCallback(async (code: string, language: Language) => {
    setIsExecuting(true);
    
    try {
      const startTime = Date.now();
      
      const execution: CodeExecution = {
        id: `exec_${Date.now()}`,
        code,
        language: language as 'python' | 'javascript',
        output: await simulateCodeExecution(code, language),
        executionTime: Date.now() - startTime,
        timestamp: new Date()
      };
      
      setExecutionHistory(prev => [execution, ...prev.slice(0, 9)]);
      return execution;
    } catch (error) {
      const execution: CodeExecution = {
        id: `exec_${Date.now()}`,
        code,
        language: language as 'python' | 'javascript',
        output: '',
        errors: error instanceof Error ? error.message : 'Unknown error occurred',
        executionTime: 0,
        timestamp: new Date()
      };
      
      setExecutionHistory(prev => [execution, ...prev.slice(0, 9)]);
      return execution;
    } finally {
      setIsExecuting(false);
    }
  }, []);

  const clearOutput = useCallback(() => {
    setExecutionHistory([]);
  }, []);

  return {
    executeCode,
    isExecuting,
    executionHistory,
    clearOutput
  };
}

async function simulateCodeExecution(code: string, language: Language): Promise<string> {
  // Simulate execution delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
  
  let output = '';
  
  try {
    switch (language) {
      case 'python':
        output = executePython(code);
        break;
      case 'javascript':
        output = executeJavaScript(code);
        break;
      case 'java':
        output = executeJava(code);
        break;
      default:
        output = 'Language not supported for execution';
    }
  } catch (error) {
    throw new Error(`Execution error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
  
  return output || `${language} code executed successfully (no output)`;
}

function executePython(code: string): string {
  let output = '';
  
  // Extract print statements
  const printMatches = code.match(/print\(([^)]+)\)/g);
  if (printMatches) {
    printMatches.forEach(match => {
      const content = match.match(/print\(([^)]+)\)/)?.[1];
      if (content) {
        let value = content
          .replace(/f?["'`]/g, '')
          .replace(/\{([^}]+)\}/g, (_, expr) => {
            // Simple variable substitution for demo
            if (expr.includes('name')) return 'World';
            if (expr.includes('message')) return 'Hello, World!';
            if (expr.includes('squares')) return '[1, 4, 9, 16, 25]';
            return expr;
          });
        output += value + '\n';
      }
    });
  }
  
  // Handle common patterns
  if (code.includes('def greet') && code.includes('greet(')) {
    if (!output.includes('Hello')) {
      output = 'Hello, World!\n' + output;
    }
  }
  
  if (code.includes('squares = [x**2 for x in')) {
    if (!output.includes('Squares')) {
      output += 'Squares: [1, 4, 9, 16, 25]\n';
    }
  }
  
  return output.trim();
}

function executeJavaScript(code: string): string {
  let output = '';
  
  // Extract console.log statements
  const logMatches = code.match(/console\.log\(([^)]+)\)/g);
  if (logMatches) {
    logMatches.forEach(match => {
      const content = match.match(/console\.log\(([^)]+)\)/)?.[1];
      if (content) {
        let value = content
          .replace(/[`"']/g, '')
          .replace(/\$\{([^}]+)\}/g, (_, expr) => {
            // Simple variable substitution for demo
            if (expr.includes('name')) return 'World';
            if (expr.includes('message')) return 'Hello, World!';
            if (expr.includes('squares')) return '1,4,9,16,25';
            return expr;
          });
        output += value + '\n';
      }
    });
  }
  
  // Handle common patterns
  if (code.includes('function greet') && code.includes('greet(')) {
    if (!output.includes('Hello')) {
      output = 'Hello, World!\n' + output;
    }
  }
  
  if (code.includes('.map(x => x ** 2)')) {
    if (!output.includes('Squares')) {
      output += 'Squares: 1,4,9,16,25\n';
    }
  }
  
  return output.trim();
}

function executeJava(code: string): string {
  let output = '';
  
  // Extract System.out.println statements
  const printMatches = code.match(/System\.out\.println?\(([^)]+)\)/g);
  if (printMatches) {
    printMatches.forEach(match => {
      const content = match.match(/System\.out\.println?\(([^)]+)\)/)?.[1];
      if (content) {
        let value = content.replace(/"/g, '');
        if (value.includes('+')) {
          // Simple string concatenation
          value = value.replace(/\s*\+\s*/g, '');
        }
        output += value + '\n';
      }
    });
  }
  
  // Handle common patterns
  if (code.includes('public static String greet')) {
    if (!output.includes('Hello')) {
      output = 'Hello, Java!\nHello, World!\n' + output;
    }
  }
  
  if (code.includes('num * num')) {
    if (!output.includes('Squares')) {
      output += 'Squares: 1 4 9 16 25 \n';
    }
  }
  
  return output.trim();
}