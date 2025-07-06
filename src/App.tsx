import React, { useState } from 'react';
import { Code, Book, Moon, Sun } from 'lucide-react';
import { PlaygroundView } from './components/playground/PlaygroundView';
import { KnowledgeView } from './components/knowledge/KnowledgeView';

function App() {
  const [activeTab, setActiveTab] = useState<'playground' | 'knowledge'>('knowledge');
  const [darkMode, setDarkMode] = useState(true);

  // Apply dark mode to document
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Code className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">CodeSpace by Sahil</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <nav className="flex items-center space-x-1">
              <button
                onClick={() => setActiveTab('playground')}
                className={`px-2 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  activeTab === 'playground'
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Code className="w-4 h-4 inline mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Playground</span>
                <span className="sm:hidden">Code</span>
              </button>
              <button
                onClick={() => setActiveTab('knowledge')}
                className={`px-2 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  activeTab === 'knowledge'
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Book className="w-4 h-4 inline mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Knowledge Base</span>
                <span className="sm:hidden">KB</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {activeTab === 'playground' ? <PlaygroundView /> : <KnowledgeView />}
      </main>
    </div>
  );
}

export default App;