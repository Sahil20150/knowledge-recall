import { KnowledgeItem } from '../types';

export const dataHandlingItems: KnowledgeItem[] = [
  {
    id: 'data-handling-csv-processing',
    title: 'CSV Data Processing & Analysis',
    category: 'data-handling',
    type: 'guide',
    description: 'Comprehensive CSV data processing with pandas, data cleaning, transformation, and analysis',
    code: `# Install required libraries
pip install pandas numpy matplotlib seaborn openpyxl
// ... (rest of code omitted for brevity, see main file for full content)
    // Render the template
    const html = renderProducts(productData);
    document.getElementById('app').innerHTML = html;`,
    explanation: 'CSV data processing involves loading, cleaning, transforming, and analyzing structured data. This guide covers both Python and JavaScript approaches with comprehensive data manipulation techniques.',
    bestPractices: [
      'Always explore data before processing',
      'Handle missing values appropriately',
      'Use appropriate data types',
      'Create data validation checks',
      'Document data transformations',
      'Use efficient data structures',
      'Implement error handling',
      'Save intermediate results'
    ],
    commonPitfalls: [
      'Not checking data quality',
      'Ignoring missing values',
      'Using wrong data types',
      'Not validating results',
      'Processing large files in memory'
    ],
    tags: ['csv', 'pandas', 'data-processing', 'analysis', 'cleaning'],
    difficulty: 'intermediate',
    language: 'both'
  }
]; 