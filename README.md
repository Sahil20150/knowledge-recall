# DevPlayground - Full-Stack Learning Platform

A comprehensive AI-enhanced developer playground for learning full-stack development with Python/Django and JavaScript/Express.

## Features

### Core Learning Environment
- **Interactive Code Playground**: Monaco editor with syntax highlighting and real-time execution
- **Multi-Language Support**: Python and JavaScript with side-by-side comparison
- **Real-time Output**: Live code execution with detailed feedback
- **AI-Powered Assistance**: Context-aware code suggestions and error correction

### Learning Modules
- **Structured Curriculum**: Progressive learning path from basics to advanced
- **Hands-on Projects**: Real-world applications and challenges
- **Progress Tracking**: Visual progress indicators and achievement system
- **Collaborative Learning**: Real-time code sharing and peer review

### Technical Features
- **Docker Sandboxing**: Secure code execution environment
- **Database Integration**: PostgreSQL and MongoDB playgrounds
- **Real-time Communication**: WebSocket-based collaboration
- **Cloud Deployment**: AWS integration for production deployment

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Monaco Editor** for code editing
- **XTerm.js** for terminal emulation
- **Socket.io** for real-time features

### Backend (Planned)
- **Python/Django** REST API
- **Node.js/Express** REST API
- **PostgreSQL** and **MongoDB** databases
- **Redis** for caching and real-time features
- **Docker** for containerization

### Infrastructure
- **AWS EC2** for hosting
- **AWS S3** for static assets
- **AWS RDS** for managed databases
- **Docker Compose** for development

## Getting Started

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- AWS CLI (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/devplayground.git
cd devplayground
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Development Setup

1. **Frontend Development**:
```bash
npm run dev        # Start Vite development server
npm run build      # Build for production
npm run preview    # Preview production build
```

2. **Backend Development** (Coming Soon):
```bash
docker-compose up  # Start backend services
```

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Header, Sidebar)
│   ├── playground/     # Code playground components
│   ├── modules/        # Learning modules
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx            # Main application component
```

## Features in Development

### Phase 1 (Current)
- ✅ Interactive code playground
- ✅ Monaco editor integration
- ✅ Basic authentication
- ✅ Learning modules structure
- ✅ Progress tracking UI

### Phase 2 (Next)
- 🔄 Real code execution with Docker
- 🔄 Terminal emulator integration
- 🔄 Database playground
- 🔄 AI assistant integration
- 🔄 Real-time collaboration

### Phase 3 (Future)
- 📋 Cloud deployment integration
- 📋 Advanced AI features
- 📋 Community features
- 📋 Mobile app

## Security Features

- **Sandboxed Execution**: All code runs in isolated Docker containers
- **Rate Limiting**: Prevents abuse with request throttling
- **Input Validation**: Comprehensive input sanitization
- **Authentication**: Secure JWT-based authentication
- **Container Isolation**: Memory and time limits for code execution

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- **Q1 2025**: Full backend implementation
- **Q2 2025**: AI integration and advanced features
- **Q3 2025**: Mobile app and community features
- **Q4 2025**: Enterprise features and scaling

## Support

For support, email support@devplayground.com or join our Discord community.