import React, { useState } from 'react';
import { Code, Book } from 'lucide-react';
import { PlaygroundView } from './components/playground/PlaygroundView';
import { KnowledgeView } from './components/knowledge/KnowledgeView';

function App() {
  const [activeTab, setActiveTab] = useState<'playground' | 'knowledge'>('knowledge');

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Code className="w-8 h-8 text-purple-600" />
            <h1 className="text-xl font-bold text-gray-900">CodeSpace by Sahil</h1>
          </div>
          
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('playground')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'playground'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Playground
            </button>
            <button
              onClick={() => setActiveTab('knowledge')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'knowledge'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Book className="w-4 h-4 inline mr-2" />
              Knowledge Base
            </button>
          </nav>
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