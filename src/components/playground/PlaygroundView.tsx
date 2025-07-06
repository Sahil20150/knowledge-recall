import React, { useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { OutputPanel } from './OutputPanel';
import { LanguageSelector } from './LanguageSelector';
import { useCodeExecution } from '../../hooks/useCodeExecution';

export type Language = 'python' | 'javascript';

export function PlaygroundView() {
  const [language, setLanguage] = useState<Language>('python');
  const [code, setCode] = useState<Record<Language, string>>({
    python: getDefaultCode('python'),
    javascript: getDefaultCode('javascript')  });
  
  const { executeCode, isExecuting, executionHistory, clearOutput } = useCodeExecution();
  
  const currentCode = code[language];
  
  const handleCodeChange = (newCode: string) => {
    setCode(prev => ({ ...prev, [language]: newCode }));
  };
  
  const handleExecute = async () => {
    await executeCode(currentCode, language);
  };

  const handleClear = () => {
    setCode(prev => ({ ...prev, [language]: getDefaultCode(language) }));
    clearOutput();
  };
  
  const latestExecution = executionHistory[0] || null;

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border-b border-gray-200 bg-white space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Code Editor</h2>
          <LanguageSelector language={language} onChange={setLanguage} />
        </div>
        
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
          <span>Execution: 30s max</span>
          <span>•</span>
          <span>Memory: 512MB</span>
        </div>
      </div>
      
      {/* Editor and Output */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-auto">
        <div className="flex-1 border-b lg:border-b-0 lg:border-r border-gray-200 min-h-0 overflow-auto">
          <CodeEditor
            language={language}
            code={currentCode}
            onChange={handleCodeChange}
            onExecute={handleExecute}
            onClear={handleClear}
            isExecuting={isExecuting}
          />
        </div>
        
        <div className="w-full lg:w-96 min-h-0 overflow-auto">
          <OutputPanel
            execution={latestExecution}
            isExecuting={isExecuting}
            onClear={clearOutput}
          />
        </div>
      </div>
    </div>
  );
}

function getDefaultCode(language: Language): string {
  switch (language) {
    case 'python':
      return `# Python Playground
print("Hello, Python!")

# Variables and data types
name = "World"
numbers = [1, 2, 3, 4, 5]

# Function definition
def greet(name):
    return f"Hello, {name}!"

# Function call
message = greet(name)
print(message)

# List comprehension
squares = [x**2 for x in numbers]
print(f"Squares: {squares}")`;

    case 'javascript':
      return `// JavaScript Playground
console.log("Hello, JavaScript!");

// Variables and data types
const name = "World";
const numbers = [1, 2, 3, 4, 5];

// Function definition
function greet(name) {
    return \`Hello, \${name}!\`;
}

// Function call
const message = greet(name);
console.log(message);

// Array methods
const squares = numbers.map(x => x ** 2);
console.log(\`Squares: \${squares}\`);`;

    default:
      return '';
  }
}