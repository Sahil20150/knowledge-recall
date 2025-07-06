import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Copy, Save, Clock, MemoryStick } from 'lucide-react';
import { Button } from '../ui/Button';
import { Language } from './PlaygroundView';

interface CodeEditorProps {
  language: Language;
  code: string;
  onChange: (value: string) => void;
  onExecute: () => void;
  onClear: () => void;
  isExecuting: boolean;
}

export function CodeEditor({ 
  language, 
  code, 
  onChange, 
  onExecute, 
  onClear,
  isExecuting 
}: CodeEditorProps) {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getMonacoLanguage = (lang: Language): string => {
    switch (lang) {
      case 'python': return 'python';
      case 'javascript': return 'javascript';
      case 'java': return 'java';
      default: return 'plaintext';
    }
  };

  const getFileExtension = (lang: Language): string => {
    switch (lang) {
      case 'python': return '.py';
      case 'javascript': return '.js';
      case 'java': return '.java';
      default: return '.txt';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 capitalize">
            {language}
          </span>
          <span className="text-xs text-gray-500">
            {getFileExtension(language)}
          </span>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>Line {code.split('\n').length}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCopy}
            className="h-8 w-8 p-0"
            title="Copy code"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClear}
            className="h-8 w-8 p-0"
            title="Clear editor"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <Button 
            variant="primary" 
            size="sm" 
            onClick={onExecute}
            isLoading={isExecuting}
            className="ml-2"
            disabled={!code.trim()}
          >
            <Play className="w-4 h-4 mr-1" />
            Run Code
          </Button>
        </div>
      </div>
      
      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={getMonacoLanguage(language)}
          value={code}
          onChange={(value) => onChange(value || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: language === 'python' ? 4 : 2,
            insertSpaces: true,
            renderLineHighlight: 'all',
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}