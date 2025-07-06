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
      case 'java': return 'bg-red-100 text-red-800 border-red-200';
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
        className="hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-l-purple-500 bg-white"
        onClick={onClick}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-1.5 bg-purple-50 rounded-lg">
                  {getTypeIcon(item.type)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant={getDifficultyColor(item.difficulty) as any} className="border">
                  <span className="flex items-center space-x-1">
                    {getDifficultyIcon(item.difficulty)}
                    <span className="capitalize">{item.difficulty}</span>
                  </span>
                </Badge>
                
                {item.language && (
                  <Badge className={`${getLanguageColor(item.language)} border font-medium`}>
                    <span className="capitalize">{item.language}</span>
                  </Badge>
                )}
                
                <Badge variant="info" className="text-xs border">
                  {item.type}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
                {item.tags.length > 4 && (
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    +{item.tags.length - 4} more
                  </span>
                )}
              </div>
            </div>
            
            <ChevronRight className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="hover:shadow-xl transition-all duration-200 cursor-pointer border-l-4 border-l-purple-500 bg-white h-full"
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-1.5 bg-purple-50 rounded-lg">
            {getTypeIcon(item.type)}
          </div>
          <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">
            {item.title}
          </CardTitle>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant={getDifficultyColor(item.difficulty) as any} className="border">
              <span className="flex items-center space-x-1">
                {getDifficultyIcon(item.difficulty)}
                <span className="capitalize">{item.difficulty}</span>
              </span>
            </Badge>
            
            {item.language && (
              <Badge className={`${getLanguageColor(item.language)} border font-medium`}>
                <span className="capitalize">{item.language}</span>
              </Badge>
            )}
            
            <Badge variant="info" className="text-xs border">
              {item.type}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                +{item.tags.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-gray-500">
              {item.code ? 'Has code examples' : 'Conceptual guide'}
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}