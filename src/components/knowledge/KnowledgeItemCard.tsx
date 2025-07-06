import React from 'react';
import { Code, Book, Lightbulb, Target, TrendingUp, Zap, ExternalLink, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { KnowledgeItem } from '../../data/knowledgeBase';

interface KnowledgeItemCardProps {
  item: KnowledgeItem;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

export function KnowledgeItemCard({ item, viewMode, onClick }: KnowledgeItemCardProps) {
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

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return <Target className="w-3 h-3" />;
      case 'intermediate': return <TrendingUp className="w-3 h-3" />;
      case 'advanced': return <Zap className="w-3 h-3" />;
      default: return <Target className="w-3 h-3" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'snippet': return <Code className="w-4 h-4" />;
      case 'guide': return <Book className="w-4 h-4" />;
      case 'command': return <ExternalLink className="w-4 h-4" />;
      case 'concept': return <Lightbulb className="w-4 h-4" />;
      case 'pattern': return <Target className="w-4 h-4" />;
      case 'comparison': return <TrendingUp className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  if (viewMode === 'list') {
    return (
      <Card 
        className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-purple-500 bg-white dark:bg-gray-800 dark:border-l-purple-400 dark:hover:shadow-gray-900/50 hover:scale-[1.02] hover:border-l-purple-600 dark:hover:border-l-purple-400"
        onClick={onClick}
      >
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-lg flex-shrink-0 shadow-sm">
                  <div className="text-white">
                    {getTypeIcon(item.type)}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{item.title}</h3>
              </div>
              
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                <Badge variant={getDifficultyColor(item.difficulty) as any} className="border">
                  <span className="flex items-center space-x-1">
                    {getDifficultyIcon(item.difficulty)}
                    <span className="capitalize text-xs sm:text-sm">{item.difficulty}</span>
                  </span>
                </Badge>
                
                {item.language && (
                  <Badge className={`${getLanguageColor(item.language)} border font-medium`}>
                    <span className="capitalize text-xs sm:text-sm">{item.language}</span>
                  </Badge>
                )}
                
                <Badge variant="info" className="text-xs border">
                  {item.type}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="inline-block bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-200 dark:border-purple-700">
                    #{tag}
                  </span>
                ))}
                {item.tags.length > 3 && (
                  <span className="inline-block bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full border border-gray-200 dark:border-gray-600">
                    +{item.tags.length - 3} more
                  </span>
                )}
              </div>
            </div>
            
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500 ml-2 sm:ml-4 flex-shrink-0 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-l-purple-500 bg-white dark:bg-gray-800 dark:border-l-purple-400 h-full dark:hover:shadow-gray-900/50 hover:scale-[1.02] hover:border-l-purple-600 dark:hover:border-l-purple-400"
      onClick={onClick}
    >
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-2 sm:space-x-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-lg flex-shrink-0 shadow-sm">
            <div className="text-white">
              {getTypeIcon(item.type)}
            </div>
          </div>
          <CardTitle className="text-base sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {item.title}
          </CardTitle>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            <Badge variant={getDifficultyColor(item.difficulty) as any} className="border">
              <span className="flex items-center space-x-1">
                {getDifficultyIcon(item.difficulty)}
                <span className="capitalize text-xs sm:text-sm">{item.difficulty}</span>
              </span>
            </Badge>
            
            {item.language && (
              <Badge className={`${getLanguageColor(item.language)} border font-medium`}>
                <span className="capitalize text-xs sm:text-sm">{item.language}</span>
              </Badge>
            )}
            
            <Badge variant="info" className="text-xs border">
              {item.type}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="inline-block bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-200 dark:border-purple-700">
                #{tag}
              </span>
            ))}
            {item.tags.length > 2 && (
              <span className="inline-block bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full border border-gray-200 dark:border-gray-600">
                +{item.tags.length - 2}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-3">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {item.code ? '📝 Has code examples' : '📚 Conceptual guide'}
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}