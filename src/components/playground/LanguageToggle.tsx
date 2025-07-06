import React from 'react';
import { cn } from '../../utils/cn';

interface LanguageToggleProps {
  language: 'python' | 'javascript';
  onChange: (language: 'python' | 'javascript') => void;
}

export function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onChange('python')}
        className={cn(
          'px-3 py-1 rounded-md text-sm font-medium transition-colors',
          language === 'python'
            ? 'bg-white text-purple-700 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        )}
      >
        Python
      </button>
      <button
        onClick={() => onChange('javascript')}
        className={cn(
          'px-3 py-1 rounded-md text-sm font-medium transition-colors',
          language === 'javascript'
            ? 'bg-white text-purple-700 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        )}
      >
        JavaScript
      </button>
    </div>
  );
}