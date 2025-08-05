# Land Chain - Blockchain-Based Land Registry System for Sri Lanka

A comprehensive blockchain-based land registry system built with React frontend, Ballerina microservices backend, Go blockchain service, and MySQL database.

## 🏗️ Project Architecture

This project consists of multiple interconnected services:

- **Frontend**: React + TypeScript + Vite application
- **Backend**: Ballerina microservices architecture
- **Blockchain**: Go-based blockchain service
- **Proxy**: Ballerina proxy service
- **SLUDI Service**: Separate Ballerina service for SLUDI verification
- **Database**: MySQL with Redis for caching

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Ballerina** (Distribution 2201.12.4 or higher)
- **Go** (v1.24.5 or higher)
- **MySQL** (v8.0 or higher)
- **Redis** server
- **Docker** and **Docker Compose** (optional, for containerized MySQL)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/iamvirul/land-chain.git
cd land-chain
```

### 2. Database Setup

#### Option A: Using Docker Compose (Recommended)

```bash
cd backend
docker-compose up -d
```

This will start MySQL on port 3000 with the following configuration:
- **Host**: localhost
- **Port**: 3000
- **Database**: land_chain
- **Username**: landchain_app
- **Password**: E9GF4JmY091K8l3XJ9XotLNuPRwF3O3J
- **Root Password**: 200528100634@Vn

#### Option B: Manual MySQL Setup

1. Install MySQL 8.0
2. Create database: `land_chain`
3. Create user: `landchain_app` with password: `E9GF4JmY091K8l3XJ9XotLNuPRwF3O3J`
4. Import the schema: `backend/modules/db/script.sql`

### 3. Redis Setup

Install and start Redis server:

```bash
# On macOS
brew install redis
brew services start redis

# On Ubuntu/Debian
sudo apt-get install redis-server
sudo systemctl start redis-server

# On Windows
# Download and install Redis from https://redis.io/download
```

## 🔧 Configuration Files

### Frontend Configuration (vite.config.ts)

The frontend is configured to proxy API requests to different backend services:

```typescript
server: {
  proxy: {
    "/api/auth": "http://localhost:9091/",
    "/api/lands": "http://localhost:9085/",
    "/api/legal_officer": "http://localhost:9080",
    "/api/land_officer": "http://localhost:9070",
    "/api/land_owner": "http://localhost:9098"
  }
}
```

### Backend Services Configuration

#### Main Backend Service (backend/Ballerina.toml)

```toml
[package]
org = "virulnirmala"
name = "backend"
version = "0.1.0"
distribution = "2201.12.4"

[build-options]
observabilityIncluded = true

[[platform.java21.dependency]]
groupId = "io.ballerina.stdlib"
artifactId = "persist.sql-native"
version = "1.6.0"
```

**Service Ports:**
- Auth Service: 9091
- Land Service: 9085
- Legal Officer Service: 9080
- Land Officer Service: 9070
- Land Owner Service: 9098

#### Proxy Service (proxy/Ballerina.toml)

```toml
[package]
org = "virulnirmala"
name = "proxy"
version = "0.1.0"
distribution = "2201.12.4"

[build-options]
observabilityIncluded = true
```

#### SLUDI Service (sludi-service/Ballerina.toml)

```toml
[package]
org = "hiranyasemindi"
name = "sludi_service"
version = "0.1.0"
distribution = "2201.12.7"

[build-options]
observabilityIncluded = true
```

**Service Port:** 9096

#### Blockchain Service (backend/blockchain/go.mod)

```go
module landchain

go 1.24.5

require (
    filippo.io/edwards25519 v1.1.0
    github.com/go-sql-driver/mysql v1.9.3
    github.com/joho/godotenv v1.5.1
)
```

**Service Port:** 8080

### Environment Configuration

#### Blockchain Service (.env)

Create `backend/blockchain/.env`:

```env
API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJCeXRlU2Vla2VycyIsIm5hbWUiOiJMYW5kQ2hhaW4tQmxvY2tjaGFpbiIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9.tzcCRcSX2bD-CB3ZYOOtnEkJj6LVEqY2NQ3nEuR7zmk
DB_DSN=root:Hiru2005@@tcp(127.0.0.1:3306)/land_chain?parseTime=true
```

#### SLUDI Service Configuration

Create `sludi-service/Config.toml`:

```toml
[SLUDIDatabase]
host = "localhost"
port = 3306
user = "landchain_app"
password = "E9GF4JmY091K8l3XJ9XotLNuPRwF3O3J"
database = "land_chain"
```

## 🏃‍♂️ Running the Services

### 1. Start the Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at: `http://localhost:5173`

### 2. Start the Backend Services

#### Main Backend Service

```bash
cd backend
bal run
```

This starts multiple services on different ports:
- Auth Service: http://localhost:9091
- Land Service: http://localhost:9085
- Legal Officer Service: http://localhost:9080
- Land Officer Service: http://localhost:9070
- Land Owner Service: http://localhost:9098

#### Proxy Service

```bash
cd proxy
bal run
```

#### SLUDI Service

```bash
cd sludi-service
bal run
```

Service available at: http://localhost:9096

### 3. Start the Blockchain Service

```bash
cd backend/blockchain
go mod tidy
go run main.go
```

Service available at: http://localhost:8080

## 🔗 Service Dependencies

The services must be started in the following order:

1. **Database** (MySQL + Redis)
2. **SLUDI Service** (Port 9096)
3. **Blockchain Service** (Port 8080)
4. **Backend Services** (Ports 9070, 9080, 9085, 9091, 9098)
5. **Proxy Service**
6. **Frontend** (Port 5173)

## 📊 Database Schema

The database schema is automatically initialized from:
- `backend/modules/db/script.sql`

Key tables include:
- `users` - User authentication and profile data
- `lands` - Land registry information
- `legal_officers` - Legal officer details
- `land_officers` - Land officer details
- `user_types` - User role definitions
- `users_has_user_types` - User role assignments

## 🔐 Security Configuration

### SSL/TLS Certificates

The project includes SSL certificate configuration in:
- `backend/resources/certificates/`
- `proxy/resources/certificates/`

### JWT Configuration

JWT tokens are used for authentication with:
- Service tokens for API access
- Socket tokens for WebSocket connections
- Redis-based session management

## 🧪 Testing

### API Testing

Use the provided HTTP files for testing:
- `backend/land_chain.http` - Backend API endpoints
- `backend/blockchain/blockchain.http` - Blockchain API endpoints

### Running Tests

```bash
# Frontend tests
npm run lint

# Backend tests
cd backend
bal test

# Blockchain tests
cd backend/blockchain
go test ./...
```

## 📦 Building for Production

### Frontend Build

```bash
npm run build
```

### Backend Build

```bash
cd backend
bal build

cd ../proxy
bal build

cd ../sludi-service
bal build
```

### Blockchain Build

```bash
cd backend/blockchain
go build -o blockchain-service main.go
```

## 🐳 Docker Deployment

The project includes Docker configuration for MySQL:

```bash
cd backend
docker-compose up -d
```

For full containerization, create additional Dockerfiles for each service.

## 🔧 Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure all required ports are available
2. **Database Connection**: Verify MySQL is running and credentials are correct
3. **Redis Connection**: Ensure Redis server is running on localhost:6379
4. **SLUDI Service**: Must be running before backend services start
5. **Environment Variables**: Ensure all .env files are properly configured

### Service Health Checks

- Frontend: http://localhost:5173
- Auth Service: http://localhost:9091/auth
- SLUDI Service: http://localhost:9096/sludi_service
- Blockchain Service: http://localhost:8080/api/v1/transfer

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Organization**: virulnirmala (Backend & Proxy)
- **Organization**: hiranyasemindi (SLUDI Service)

## 📞 Support

For support and questions, please open an issue in the GitHub repository.
