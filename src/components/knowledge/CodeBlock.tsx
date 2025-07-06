import React, { useState } from 'react';
import { Copy, Check, Play, ExternalLink, BookOpen, Code2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface CodeExample {
  title: string;
  code: string;
  language: string;
  explanation?: string;
}

interface CodeBlockProps {
  example: CodeExample;
  onRunCode?: (code: string, language: string) => void;
}

export function CodeBlock({ example, onRunCode }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(example.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleRun = async () => {
    if (!onRunCode || (example.language !== 'python' && example.language !== 'javascript')) {
      return;
    }
    
    setIsRunning(true);
    try {
      await onRunCode(example.code, example.language);
    } finally {
      setIsRunning(false);
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'python': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'javascript': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'bash': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'dockerfile': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'yaml': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'python':
      case 'javascript':
      case 'bash':
        return <ExternalLink className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const canRun = example.language === 'python' || example.language === 'javascript';

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:shadow-gray-900/50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Badge className={`${getLanguageColor(example.language)} border font-medium`}>
            <span className="flex items-center space-x-1">
              {getLanguageIcon(example.language)}
              <span className="capitalize text-xs sm:text-sm">{example.language}</span>
            </span>
          </Badge>
          <h5 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{example.title}</h5>
        </div>
        
        <div className="flex items-center space-x-2">
          {canRun && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 sm:px-3 text-xs hover:bg-green-50 hover:text-green-700 border border-transparent hover:border-green-200"
              onClick={handleRun}
              isLoading={isRunning}
              title="Run in playground"
            >
              <Play className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Run</span>
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCopy}
            className="h-8 px-2 sm:px-3 text-xs hover:bg-blue-50 hover:text-blue-700 border border-transparent hover:border-blue-200"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 mr-1 text-green-600" />
                <span className="text-green-600 hidden sm:inline">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </Button>
        </div>
      </div>
      
      {/* Code Content */}
      <div className="relative">
        <pre className="p-2 sm:p-4 bg-gray-900 text-gray-100 text-xs sm:text-sm overflow-x-auto leading-relaxed font-mono whitespace-pre-wrap break-words">
          <code className="block">{example.code}</code>
        </pre>
        
        {/* Language indicator overlay */}
        <div className="absolute top-2 right-2">
          <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
            {example.language}
          </span>
        </div>
      </div>
      
      {/* Explanation */}
      {example.explanation && (
        <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-100 dark:border-blue-800">
          <div className="flex items-start space-x-2">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h6 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Explanation</h6>
              <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 leading-relaxed">{example.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}