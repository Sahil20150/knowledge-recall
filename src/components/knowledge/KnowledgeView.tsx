import React, { useState } from 'react';
import { Search, Filter, Book, ArrowLeft, Grid3X3, List, ChevronLeft, ChevronRight } from 'lucide-react';
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
    <div className="h-full overflow-auto bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Book className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Knowledge Base</h2>
                <p className="text-gray-600">
                  Comprehensive guides for Python/Django and JavaScript/Express
                </p>
              </div>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
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
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-2xl font-bold text-purple-600">{knowledgeItems.length}</div>
              <div className="text-sm text-gray-600">Total Topics</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-2xl font-bold text-green-600">
                {knowledgeItems.filter(item => item.difficulty === 'beginner').length}
              </div>
              <div className="text-sm text-gray-600">Beginner</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-2xl font-bold text-orange-600">
                {knowledgeItems.filter(item => item.difficulty === 'intermediate').length}
              </div>
              <div className="text-sm text-gray-600">Intermediate</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-2xl font-bold text-red-600">
                {knowledgeItems.filter(item => item.difficulty === 'advanced').length}
              </div>
              <div className="text-sm text-gray-600">Advanced</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search topics, code examples, or tags..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg bg-white shadow-sm"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
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
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
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
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >
              <option value="all">All Languages</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="bash">Bash/CLI</option>
              <option value="both">Both Stacks</option>
            </select>
            
            <div className="flex items-center space-x-4 ml-auto">
              <div className="text-sm text-gray-500">
                <strong>{filteredItems.length}</strong> items found
              </div>
              {(searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedLanguage !== 'all') && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
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
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
                : "space-y-4 mb-8"
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
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredItems.length)} of {filteredItems.length} results
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-1">
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
                          className="h-8 w-8 p-0"
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
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* No Results */
          <div className="text-center py-16">
            <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Book className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}

        {/* Category Overview */}
        {filteredItems.length > 0 && selectedCategory === 'all' && !searchTerm && (
          <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getCategoryStats().map((category) => (
                <div
                  key={category.value}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                  onClick={() => {
                    setSelectedCategory(category.value);
                    setCurrentPage(1);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                      {category.label}
                    </span>
                    <Badge variant="default" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}