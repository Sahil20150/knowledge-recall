import { KnowledgeItem } from '../types';

export const aiItems: KnowledgeItem[] = [
  {
    id: 'ai-openai-integration',
    title: 'OpenAI API Integration & Chat Applications',
    category: 'ai',
    type: 'guide',
    description: 'Integrate OpenAI APIs for chat applications, text generation, and AI-powered features',
    code: `# Install OpenAI library
pip install openai
// ... (rest of code omitted for brevity, see main file for full content)
        return message.content
    except Exception as e:
        return f"Error: {str(e)}"`,
    explanation: 'OpenAI APIs provide access to powerful language models for building AI-powered applications, chatbots, and content generation systems.',
    bestPractices: [
      'Store API keys securely in environment variables',
      'Implement proper error handling and retries',
      'Use appropriate temperature settings for different use cases',
      'Implement rate limiting to avoid API quota issues',
      'Use function calling for structured data extraction',
      'Cache responses when appropriate',
      'Monitor API usage and costs',
      'Implement proper input validation'
    ],
    commonPitfalls: [
      'Exposing API keys in code',
      'Not handling API rate limits',
      'Using inappropriate temperature values',
      'Not validating user inputs',
      'Ignoring API response errors'
    ],
    codeExamples: [
      {
        title: 'Streaming Chat Response',
        code: `def stream_chat_response(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            stream=True
        )
        
        for chunk in response:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content
    except Exception as e:
        yield f"Error: {str(e)}"

# Usage in Flask
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    prompt = data.get('message', '')
    
    def generate():
        for chunk in stream_chat_response(prompt):
            yield f"data: {json.dumps({'content': chunk})}\\n\\n"
    
    return Response(generate(), mimetype='text/plain')`,
        language: 'python',
        explanation: 'Streaming responses provide real-time feedback to users and improve perceived performance.'
      }
    ],
    tags: ['ai', 'openai', 'chat', 'api', 'gpt'],
    difficulty: 'intermediate',
    language: 'python'
  },
  {
    id: 'rag-vector-search',
    title: 'RAG (Retrieval-Augmented Generation) Implementation',
    category: 'ai',
    type: 'guide',
    description: 'Build RAG systems with vector databases, embeddings, and semantic search for enhanced AI responses',
    code: `# Install required libraries
pip install langchain chromadb sentence-transformers openai
// ... (rest of code omitted for brevity, see main file for full content)
    return rag`,
    explanation: 'RAG systems combine retrieval of relevant documents with generative AI to provide more accurate and contextual responses based on specific knowledge bases.',
    bestPractices: [
      'Use appropriate chunk sizes for your use case',
      'Implement proper text preprocessing',
      'Choose suitable embedding models',
      'Use hybrid search (semantic + keyword)',
      'Implement caching for frequently accessed embeddings',
      'Monitor retrieval quality and relevance',
      'Use metadata filtering for better search',
      'Implement proper error handling'
    ],
    commonPitfalls: [
      'Using chunks that are too large or small',
      'Not preprocessing text properly',
      'Using inappropriate embedding models',
      'Not implementing proper error handling',
      'Ignoring search result relevance'
    ],
    tags: ['ai', 'rag', 'vector-search', 'embeddings', 'chromadb'],
    difficulty: 'advanced',
    language: 'python'
  },
  {
    id: 'ml-basic-models',
    title: 'Machine Learning Fundamentals & Model Training',
    category: 'ai',
    type: 'guide',
    description: 'Build and train machine learning models using scikit-learn, TensorFlow, and PyTorch',
    code: `# Install ML libraries
pip install scikit-learn tensorflow torch pandas numpy matplotlib
// ... (rest of code omitted for brevity, see main file for full content)
    return pipeline`,
    explanation: 'Machine learning enables computers to learn patterns from data and make predictions. This guide covers the complete ML pipeline from data preprocessing to model evaluation.',
    bestPractices: [
      'Always split data into train/validation/test sets',
      'Scale numerical features appropriately',
      'Handle missing values and outliers',
      'Use cross-validation for model selection',
      'Monitor for overfitting',
      'Feature engineering is crucial',
      'Use appropriate evaluation metrics',
      'Save and version your models'
    ],
    commonPitfalls: [
      'Data leakage between train and test sets',
      'Not scaling features properly',
      'Overfitting to training data',
      'Using inappropriate evaluation metrics',
      'Not handling class imbalance'
    ],
    tags: ['ml', 'scikit-learn', 'tensorflow', 'pandas', 'numpy'],
    difficulty: 'intermediate',
    language: 'python'
  }
]; 