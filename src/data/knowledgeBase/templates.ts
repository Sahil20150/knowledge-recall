import { KnowledgeItem } from '../types';

export const templatesItems: KnowledgeItem[] = [
  {
    id: 'templates-jinja2-comprehensive',
    title: 'Jinja2 Template Engine Mastery',
    category: 'templates',
    type: 'guide',
    description: 'Complete Jinja2 templating with advanced features, inheritance, macros, and best practices',
    code: `# Install Jinja2
pip install jinja2
// ... (rest of code omitted for brevity, see main file for full content)
const html = renderProducts(productData);
document.getElementById('app').innerHTML = html;`,
    explanation: 'Template engines provide a way to generate dynamic HTML content by combining templates with data. Jinja2 (Python) and Handlebars (JavaScript) are powerful templating engines with features like inheritance, macros, and custom filters.',
    bestPractices: [
      'Use template inheritance for consistent layouts',
      'Create reusable macros and components',
      'Implement proper escaping for security',
      'Use custom filters for data formatting',
      'Keep templates simple and readable',
      'Separate logic from presentation',
      'Use template caching for performance',
      'Implement proper error handling'
    ],
    commonPitfalls: [
      'Putting too much logic in templates',
      'Not escaping user input',
      'Creating overly complex templates',
      'Not using template inheritance',
      'Ignoring template caching'
    ],
    tags: ['templates', 'jinja2', 'handlebars', 'html', 'dynamic-content'],
    difficulty: 'intermediate',
    language: 'both'
  }
]; 