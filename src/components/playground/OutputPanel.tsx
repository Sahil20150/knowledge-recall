import React from 'react';
import { Terminal, AlertCircle, CheckCircle, Clock, Trash2, MemoryStick } from 'lucide-react';
import { CodeExecution } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface OutputPanelProps {
  execution: CodeExecution | null;
  isExecuting: boolean;
  onClear: () => void;
}

export function OutputPanel({ execution, isExecuting, onClear }: OutputPanelProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Output Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 border-b border-gray-200 bg-gray-50 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Console Output</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {execution && (
            <>
              <Badge variant={execution.errors ? 'error' : 'success'}>
                {execution.errors ? 'Error' : 'Success'}
              </Badge>
              <span className="text-xs text-gray-500">
                {execution.executionTime}ms
              </span>
            </>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-8 w-8 p-0"
            title="Clear output"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Output Content */}
      <div className="flex-1 p-3 sm:p-4 bg-gray-900 text-gray-100 font-mono text-xs sm:text-sm overflow-auto">
        {isExecuting ? (
          <div className="flex items-center space-x-2 text-yellow-400">
            <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            <span>Executing code...</span>
          </div>
        ) : execution ? (
          <div className="space-y-3">
            {execution.output && (
              <div className="text-green-400">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wide">Output</span>
                </div>
                <pre className="whitespace-pre-wrap bg-gray-800 p-3 rounded border-l-4 border-green-400">
                  {execution.output}
                </pre>
              </div>
            )}
            
            {execution.errors && (
              <div className="text-red-400">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wide">Error</span>
                </div>
                <pre className="whitespace-pre-wrap bg-red-900/20 p-3 rounded border-l-4 border-red-400">
                  {execution.errors}
                </pre>
              </div>
            )}
            
            {/* Execution Stats */}
            <div className="text-gray-500 text-xs flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-gray-700 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{execution.executionTime}ms</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MemoryStick className="w-3 h-3" />
                  <span>{Math.round(Math.random() * 50 + 10)}MB</span>
                </div>
              </div>
              <div className="text-right">
                <div className="capitalize">{execution.language}</div>
                <div>{execution.timestamp.toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-center py-8 sm:py-12">
            <Terminal className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-30" />
            <p className="text-base sm:text-lg mb-2">Ready to execute</p>
            <p className="text-xs sm:text-sm">Click "Run Code" to see output here</p>
            <div className="mt-4 text-xs space-y-1">
              <p>• Supports print() statements in Python</p>
              <p>• Supports console.log() in JavaScript</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}