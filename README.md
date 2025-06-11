# 🏛️ Sri Lanka Blockchain Land Registry

A modern, secure, and efficient land ownership management system for Sri Lanka using blockchain technology, AI-powered document analysis, and smart contracts.

## 🌟 Features

### 🔐 **Ultra-Secure**
- **Blockchain Technology**: Immutable land ownership records
- **SL-UDI Integration**: Digital identity verification
- **Smart Contracts**: Automated and transparent transactions
- **End-to-end Encryption**: Complete data protection

### ⚡ **Lightning Fast**
- **Instant Transactions**: Smart contract automation
- **Real-time Updates**: Live blockchain synchronization
- **Mobile Responsive**: Access anywhere, anytime
- **Progressive Web App**: Native app-like experience

### 🤖 **AI-Powered**
- **Sinhala NLP**: Advanced document analysis in Sinhala language
- **Automated Verification**: AI-driven document validation
- **Dispute Resolution**: Intelligent conflict resolution assistance
- **Predictive Analytics**: Land value and trend analysis

### 📱 **Modern Interface**
- **Clean Design**: Apple-level design aesthetics
- **Responsive Layout**: Works on all devices
- **Dark/Light Mode**: User preference support
- **Accessibility**: WCAG 2.1 compliant

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **Lucide React** for icons
- **React Router** for navigation

### Backend
- **Node.js** with Express
- **Blockchain Simulation** for demo purposes
- **Multer** for file uploads
- **CORS** enabled for cross-origin requests

### Development Tools
- **Vite** for fast development
- **ESLint** for code quality
- **TypeScript** for type safety
- **Concurrently** for running multiple processes

## 🏗️ Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Basic UI components
│   │   ├── common/         # Common components
│   │   ├── layout/         # Layout components
│   │   └── property/       # Property-specific components
│   ├── contexts/           # React contexts
│   ├── pages/              # Page components
│   └── types/              # TypeScript type definitions
├── backend/                # Backend server
├── public/                 # Static assets
└── docs/                   # Documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sri-lanka-blockchain-land-registry.git
   cd sri-lanka-blockchain-land-registry
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

## 🎯 Key Features Walkthrough

### 1. **User Registration & Authentication**
- SL-UDI digital identity integration
- Multi-step registration process
- Role-based access control (Citizen, Land Officer, Legal Official)

### 2. **Land Registration**
- Comprehensive property information capture
- GPS coordinate mapping
- Document upload with AI analysis
- Blockchain hash generation

### 3. **Property Search & Discovery**
- Advanced search functionality
- Filter by status, location, owner
- Interactive property details
- Dispute status indicators

### 4. **Document Management**
- Sinhala NLP document analysis
- Automated entity extraction
- Secure cloud storage
- Version control and audit trails

### 5. **Smart Contracts**
- Automated property transfers
- Lease agreements
- Mortgage contracts
- Dispute resolution workflows

### 6. **Dispute Resolution**
- AI-assisted case analysis
- Evidence management
- Stakeholder communication
- Resolution tracking

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Frontend
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Sri Lanka Land Registry

# Backend
PORT=3001
NODE_ENV=development
```

### Customization
- **Colors**: Modify `tailwind.config.js` for theme colors
- **Animations**: Update animation settings in Tailwind config
- **API Endpoints**: Configure in `src/config/api.ts`

## 📱 Mobile Support

The application is fully responsive and supports:
- **iOS Safari** 12+
- **Android Chrome** 80+
- **Progressive Web App** features
- **Offline functionality** (coming soon)

## 🌐 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 📦 Building for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview

# Deploy to production
npm run deploy
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- Use TypeScript for all new code
- Follow the existing code style
- Run ESLint before committing
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Government of Sri Lanka** for supporting digital transformation
- **Blockchain Community** for technical guidance
- **Open Source Contributors** for amazing tools and libraries

## 📞 Support

- **Documentation**: [docs.landregistry.lk](https://docs.landregistry.lk)
- **Email**: support@landregistry.lk
- **Phone**: +94 11 123 4567
- **Issues**: [GitHub Issues](https://github.com/yourusername/sri-lanka-blockchain-land-registry/issues)

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Basic land registration
- ✅ Property search
- ✅ Document management
- ✅ User authentication

### Phase 2 (Q2 2024)
- 🔄 Real blockchain integration
- 🔄 Advanced smart contracts
- 🔄 Mobile app release
- 🔄 API for third-party integration

### Phase 3 (Q3 2024)
- 📋 Government system integration
- 📋 Advanced analytics dashboard
- 📋 Multi-language support
- 📋 Offline functionality

### Phase 4 (Q4 2024)
- 📋 AI-powered land valuation
- 📋 Predictive dispute detection
- 📋 International standards compliance
- 📋 Cross-border property verification

---

**Built with ❤️ for Sri Lanka's Digital Future**

*Empowering transparent, secure, and efficient land ownership management through cutting-edge technology.*