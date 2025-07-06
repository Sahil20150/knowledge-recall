import React, { useState } from 'react';
import { Search, Filter, Book, ArrowLeft, Grid3X3, List, ChevronLeft, ChevronRight, Target } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { KnowledgeItemCard } from './KnowledgeItemCard';
import { KnowledgeItemDetail } from './KnowledgeItemDetail';
import { knowledgeItems, categories, KnowledgeItem } from '../../data/knowledgeBase';

export function KnowledgeView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;
    const matchesLanguage = selectedLanguage === 'all' || 
                           item.language === selectedLanguage || 
                           item.language === 'both';
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesLanguage;
  });

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handleItemSelect = (item: KnowledgeItem) => {
    setSelectedItem(item);
  };

  const handleBackToList = () => {
    setSelectedItem(null);
  };

  const handleRunCode = async (code: string, language: string) => {
    console.log('Running code:', { code, language });
  };

  const getCategoryStats = () => {
    const stats = categories.slice(1).map(category => ({
      ...category,
      count: knowledgeItems.filter(item => item.category === category.value).length
    }));
    return stats.sort((a, b) => b.count - a.count);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedLanguage('all');
    setCurrentPage(1);
  };

  // If an item is selected, show detail view
  if (selectedItem) {
    return (
      <KnowledgeItemDetail
        item={selectedItem}
        onBack={handleBackToList}
        onRunCode={handleRunCode}
      />
    );
  }

  return (
    <div className="h-full overflow-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="p-2 sm:p-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-xl shadow-lg">
                <Book className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Knowledge Base</h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Comprehensive guides organized by language and technology stack
                </p>
              </div>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-1 self-start shadow-sm">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Language-based Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 p-4 rounded-xl shadow-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold">{knowledgeItems.length}</div>
                  <div className="text-sm opacity-90">Total Topics</div>
                </div>
                <Book className="w-8 h-8 opacity-80" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4 rounded-xl shadow-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold">
                    {knowledgeItems.filter(item => item.language === 'python').length}
                  </div>
                  <div className="text-sm opacity-90">Python</div>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold">🐍</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 dark:from-yellow-600 dark:to-yellow-700 p-4 rounded-xl shadow-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold">
                    {knowledgeItems.filter(item => item.language === 'javascript').length}
                  </div>
                  <div className="text-sm opacity-90">JavaScript</div>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold">⚡</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 p-4 rounded-xl shadow-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold">
                    {knowledgeItems.filter(item => item.language === 'both').length}
                  </div>
                  <div className="text-sm opacity-90">Full Stack</div>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold">🚀</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 sm:w-6 sm:h-6" />
            <input
              type="text"
              placeholder="🔍 Search topics, code examples, or tags..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 sm:pl-14 pr-4 py-4 sm:py-5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base sm:text-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm dark:shadow-gray-900/50 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-500"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full sm:w-auto"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              
              <select
                value={selectedDifficulty}
                onChange={(e) => {
                  setSelectedDifficulty(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full sm:w-auto"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              <select
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full sm:w-auto"
              >
                <option value="all">All Languages</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="bash">Bash/CLI</option>
                <option value="both">Both Stacks</option>
              </select>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto sm:ml-auto">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <strong>{filteredItems.length}</strong> items found
              </div>
              {(searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedLanguage !== 'all') && (
                <Button variant="outline" size="sm" onClick={clearFilters} className="w-full sm:w-auto">
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredItems.length > 0 ? (
          <>
            {/* Items Grid/List */}
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
                : "space-y-3 sm:space-y-4 mb-6 sm:mb-8"
            }>
              {paginatedItems.map((item) => (
                <KnowledgeItemCard
                  key={item.id}
                  item={item}
                  viewMode={viewMode}
                  onClick={() => handleItemSelect(item)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4 sm:space-y-0">
                <div className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
                  <span className="font-medium">Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredItems.length)}</span>
                  <span className="text-gray-500 dark:text-gray-500"> of {filteredItems.length} results</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg border-gray-300 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Previous</span>
                  </Button>
                  
                  <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? 'primary' : 'ghost'}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={`h-8 w-8 p-0 rounded-md ${
                            currentPage === pageNum 
                              ? 'bg-purple-600 text-white shadow-sm' 
                              : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg border-gray-300 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* No Results */
          <div className="text-center py-12 sm:py-16">
            <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 flex items-center justify-center shadow-lg">
              <Book className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">No items found</h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">Try adjusting your search terms or filters to find what you're looking for</p>
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="px-6 py-3 rounded-lg border-purple-300 dark:border-purple-600 hover:border-purple-500 dark:hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              Clear all filters
            </Button>
          </div>
        )}

        {/* Category Overview */}
        {filteredItems.length > 0 && selectedCategory === 'all' && !searchTerm && (
          <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Browse by Category</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {getCategoryStats().map((category) => (
                <div
                  key={category.value}
                  className="group relative p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-300 dark:hover:border-purple-500 cursor-pointer transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-900/50 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700"
                  onClick={() => {
                    setSelectedCategory(category.value);
                    setCurrentPage(1);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {category.label}
                    </span>
                    <Badge variant="default" className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700">
                      {category.count}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {category.count} {category.count === 1 ? 'topic' : 'topics'} available
                  </div>
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-purple-300 dark:group-hover:border-purple-500 transition-colors duration-200 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}