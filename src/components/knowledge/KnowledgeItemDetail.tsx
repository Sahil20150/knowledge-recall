import React from 'react';
import { ArrowLeft, Code, Book, Lightbulb, Target, ExternalLink, Clock, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { CodeBlock } from './CodeBlock';
import { KnowledgeItem } from '../../data/knowledgeBase';

interface KnowledgeItemDetailProps {
  item: KnowledgeItem;
  onBack: () => void;
  onRunCode: (code: string, language: string) => void;
}

export function KnowledgeItemDetail({ item, onBack, onRunCode }: KnowledgeItemDetailProps) {
  const getLanguageColor = (language?: string) => {
    switch (language) {
      case 'python': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'javascript': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'bash': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'dockerfile': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'yaml': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'both': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'snippet': return <Code className="w-5 h-5" />;
      case 'guide': return <Book className="w-5 h-5" />;
      case 'command': return <ExternalLink className="w-5 h-5" />;
      case 'concept': return <Lightbulb className="w-5 h-5" />;
      case 'pattern': return <Target className="w-5 h-5" />;
      case 'comparison': return <Target className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  return (
    <div className="h-full overflow-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="p-2 sm:p-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Back to Knowledge Base</span>
            <span className="sm:hidden">Back</span>
          </Button>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg self-start">
                {getTypeIcon(item.type)}
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{item.description}</p>
                
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                  <Badge variant={getDifficultyColor(item.difficulty) as any} className="border">
                    <span className="capitalize">{item.difficulty}</span>
                  </Badge>
                  
                  {item.language && (
                    <Badge className={`${getLanguageColor(item.language)} border font-medium`}>
                      <span className="capitalize">{item.language}</span>
                    </Badge>
                  )}
                  
                  <Badge variant="info" className="border">
                    {item.type}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 sm:space-y-8">
          {/* Main Code Block */}
          {item.code && (
            <Card className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Code className="w-5 h-5" />
                  <span>Code Example</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <CodeBlock
                  example={{
                    title: "Main Example",
                    code: item.code,
                    language: item.language || 'text',
                    explanation: item.explanation
                  }}
                  onRunCode={onRunCode}
                />
              </CardContent>
            </Card>
          )}
          
          {/* Additional Code Examples */}
          {item.codeExamples && item.codeExamples.length > 0 && (
            <Card className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Code className="w-5 h-5" />
                  <span>Additional Examples</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 px-2 sm:px-6">
                {item.codeExamples.map((example, index) => (
                  <CodeBlock
                    key={index}
                    example={example}
                    onRunCode={onRunCode}
                  />
                ))}
              </CardContent>
            </Card>
          )}
          
          {/* Best Practices */}
          {item.bestPractices && item.bestPractices.length > 0 && (
            <Card className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span>Best Practices</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <div className="bg-green-50 p-4 sm:p-6 rounded-lg border border-green-200">
                  <ul className="space-y-3">
                    {item.bestPractices.map((practice, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-green-800 leading-relaxed">{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Common Pitfalls */}
          {item.commonPitfalls && item.commonPitfalls.length > 0 && (
            <Card className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <ExternalLink className="w-5 h-5 text-red-600" />
                  <span>Common Pitfalls</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <div className="bg-red-50 p-4 sm:p-6 rounded-lg border border-red-200">
                  <ul className="space-y-3">
                    {item.commonPitfalls.map((pitfall, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-red-800 leading-relaxed">{pitfall}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Key Points (fallback if no best practices or pitfalls) */}
          {!item.bestPractices && !item.commonPitfalls && (
            <Card className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <span>Key Points</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200">
                  <p className="text-blue-800 leading-relaxed">{item.explanation}</p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Metadata */}
          <Card className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Topic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Difficulty Level</div>
                  <div className="font-semibold text-gray-900 capitalize">{item.difficulty}</div>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Content Type</div>
                  <div className="font-semibold text-gray-900 capitalize">{item.type}</div>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Language</div>
                  <div className="font-semibold text-gray-900 capitalize">
                    {item.language || 'General'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}