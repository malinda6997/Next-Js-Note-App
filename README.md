# CloudNote AI

![CloudNote AI Header](./readmeimages/Readme%20header%20img.png)

A modern, secure, and scalable note-taking application built with Next.js, TypeScript, and MongoDB. Features real-time authentication, cloud-based storage, and comprehensive deployment infrastructure using Docker, Jenkins, and Terraform on AWS.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Deployment](#deployment)
- [Infrastructure](#infrastructure)
- [Database](#database)
- [CI/CD Pipeline](#cicd-pipeline)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### 🎨 User Interface
- **Clean & Intuitive Design**: Modern, responsive UI built with React and Tailwind CSS
- **Dark Mode Support**: Eye-friendly interface for extended usage
- **Real-time Updates**: Seamless note synchronization

### 🔐 Authentication & Security
- **Secure Authentication**: NextAuth.js integration with session management
- **User Registration**: Streamlined signup process with validation
- **Password Protection**: Encrypted credential storage
- **JWT Token Support**: Stateless authentication

### 📝 Note Management
- **Create, Read, Update, Delete (CRUD)**: Full note lifecycle management
- **Cloud Storage**: MongoDB-backed persistent storage
- **Note Organization**: Dashboard with organized note viewing
- **Search & Filter**: Quick note discovery

### ⚙️ User Settings
- **Profile Management**: Update user preferences
- **Security Settings**: Password management
- **Account Configuration**: Customizable settings panel

---

## Tech Stack

### Frontend
- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **UI Components**: Shadcn/ui components (Button, Card, Dialog, Input, etc.)
- **State Management**: Context API with Providers

### Backend
- **Runtime**: Node.js
- **Server Framework**: Next.js API Routes
- **Authentication**: NextAuth.js
- **Database**: MongoDB
- **API**: RESTful API design

### DevOps & Infrastructure
- **Containerization**: Docker & Docker Hub
- **Container Orchestration**: Jenkins for CI/CD
- **Infrastructure as Code**: Terraform
- **Cloud Platform**: AWS (EC2, VPC, Security Groups)
- **Version Control**: Git with Webhook triggers

### Configuration & Linting
- **Linting**: ESLint with modern config
- **Environment**: Next.js environment variables
- **Configuration**: TypeScript strict mode

---

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CloudNote AI                       │
│                                                         │
│  ┌────────────────┐    ┌──────────────┐    ┌─────────┐ │
│  │   Frontend     │───▶│  Next.js API │───▶│MongoDB  │ │
│  │  (React/Next)  │    │   Routes     │    │ (Cloud) │ │
│  └────────────────┘    └──────────────┘    └─────────┘ │
│         │                                                │
│         │              ┌──────────────┐                 │
│         └─────────────▶│  NextAuth    │                 │
│                        │  (Auth Layer)│                 │
│                        └──────────────┘                 │
└─────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│          Deployment & Infrastructure                    │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │  Docker  │▶ │ DockerHub│▶ │ Jenkins  │▶ │  AWS   │ │
│  │ (Image)  │  │(Registry)│  │ (CI/CD)  │  │(Deploy)│ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Terraform (Infrastructure as Code)              │  │
│  │  - EC2 Instances   - VPC Configuration           │  │
│  │  - Security Groups - RDS/MongoDB Connection      │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: v5.0 or higher (Atlas or Local)
- **Git**: For version control
- **Docker**: (Optional) For containerization
- **AWS Account**: (Optional) For cloud deployment

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/cloudnote-ai.git
   cd cloudnote-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables** (see [Configuration](#configuration))

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   ```
   http://localhost:3000
   ```

---

## Installation

### Full Setup

```bash
# Clone repository
git clone https://github.com/yourusername/cloudnote-ai.git
cd cloudnote-ai

# Install dependencies
npm install

# Generate Next.js types
npm run build

# Start development server
npm run dev
```

### Project Structure

```
cloudnote-ai/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── auth/             # NextAuth configuration
│   │   ├── notes/            # Note endpoints
│   │   └── register/         # Registration endpoint
│   ├── dashboard/            # Protected routes
│   │   ├── notes/            # Notes management
│   │   └── settings/         # User settings
│   ├── login/                # Login page
│   ├── register/             # Registration page
│   └── layout.tsx            # Root layout
├── components/               # Reusable components
│   ├── Providers.tsx         # Context providers
│   ├── Sidebar.tsx           # Navigation sidebar
│   └── ui/                   # UI components
├── lib/                      # Utilities
│   ├── dbConnect.ts          # Database connection
│   ├── mongodb.ts            # MongoDB client
│   └── utils.ts              # Helper utilities
├── models/                   # Data models
│   └── Note.ts               # Note schema
├── public/                   # Static assets
├── Dockerfile                # Container image
├── docker-compose.yml        # Container orchestration
├── Jenkinsfile               # CI/CD pipeline
├── Terraform/                # IaC configuration
└── next.config.ts            # Next.js configuration
```

---

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cloudnote?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-min-32-characters

# NextAuth Providers (if using OAuth)
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret

# API Configuration
NODE_ENV=development
```

### TypeScript Configuration

The project uses strict TypeScript settings in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler"
  }
}
```

### ESLint Configuration

Linting rules are defined in `eslint.config.mjs`:

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix
```

---

## Usage

### Screenshots

#### Landing Page
![Landing Page](./readmeimages/landing%20page%20using%20server.png)

#### Login Page
![Login Page](./readmeimages/loging%20page%20using%20server.png)

#### Registration Page
![Registration Page](./readmeimages/register%20page%20using%20server.png)

#### Dashboard
![Dashboard](./readmeimages/dashbord%20using%20server.png)

### Basic Workflows

#### Create a Note
1. Navigate to Dashboard → Notes
2. Click "New Note"
3. Enter title and content
4. Click "Save"

#### View Notes
1. Go to Dashboard → Notes
2. All your notes appear in the list
3. Click any note to view details

#### Update a Note
1. Open a note from the dashboard
2. Edit the content
3. Click "Update"

#### Delete a Note
1. Open a note
2. Click "Delete"
3. Confirm deletion

#### Manage Settings
1. Go to Dashboard → Settings
2. Update profile information
3. Change password
4. Save changes

---

## Deployment

### Docker Deployment

#### Build Docker Image

```bash
# Build image locally
docker build -t cloudnote-ai:latest .

# Tag for Docker Hub
docker tag cloudnote-ai:latest yourusername/cloudnote-ai:latest

# Push to Docker Hub
docker push yourusername/cloudnote-ai:latest
```

![Docker Build](./readmeimages/docker%20image%20on%20server%20cmd.png)

![Docker Hub Versioning](./readmeimages/dockerhub%20versioning%20page.png)

![Docker Hub](./readmeimages/Dockerhub.png)

#### Run Container

```bash
# Run container with environment variables
docker run -d \
  --name cloudnote-ai \
  -p 3000:3000 \
  -e MONGODB_URI=your-mongodb-uri \
  -e NEXTAUTH_SECRET=your-secret \
  yourusername/cloudnote-ai:latest

# View logs
docker logs cloudnote-ai

# Stop container
docker stop cloudnote-ai
```

### Jenkins CI/CD Pipeline

The `Jenkinsfile` defines the automated deployment pipeline:

```groovy
pipeline {
    stages {
        build { ... }
        test { ... }
        deploy { ... }
    }
}
```

![Jenkins Pipeline](./readmeimages/jenkins%20pipeline.png)

**Pipeline Stages:**
1. **Build**: Compile Next.js application
2. **Test**: Run linting and tests
3. **Deploy**: Push to Docker Hub and deploy to AWS

#### Git Webhook Configuration

Automatic pipeline triggers via Git webhooks:

![Git Webhook Trigger](./readmeimages/git%20webhook%20trigger.png)

---

## Infrastructure

### Terraform Infrastructure as Code

Terraform manages all AWS resources:

```bash
# Initialize Terraform
terraform init

# Validate configuration
terraform validate

# Plan infrastructure changes
terraform plan

# Apply infrastructure
terraform apply

# Destroy infrastructure (use with caution)
terraform destroy
```

![Terraform Output](./readmeimages/terraform%20output.png)

### AWS Resources

#### EC2 Instances

![EC2 Instances](./readmeimages/aws%20ec2%20server.png)

- **Instance Type**: t3.medium (configurable)
- **AMI**: Ubuntu 22.04 LTS
- **Auto-scaling**: Enabled for production

#### VPC Configuration

![VPC Configuration](./readmeimages/aws%20vpc.png)

- **CIDR Block**: 10.0.0.0/16
- **Public Subnets**: 2 (high availability)
- **Private Subnets**: 2 (database tier)
- **Internet Gateway**: For public internet access
- **NAT Gateway**: For private subnet outbound traffic

#### Security Groups

![Security Groups](./readmeimages/security%20group%20inbound%20rules.png)

**Inbound Rules:**
- Port 80 (HTTP): From 0.0.0.0/0
- Port 443 (HTTPS): From 0.0.0.0/0
- Port 3000 (Application): From 0.0.0.0/0
- Port 22 (SSH): From admin IP only

**Outbound Rules:**
- All traffic allowed to 0.0.0.0/0

---

## Database

### MongoDB Setup

#### MongoDB Atlas (Cloud)

![MongoDB IP Anywhere Access](./readmeimages/mongo%20db%20ip%20anyware%20access.png)

1. Create cluster at https://www.mongodb.com/cloud/atlas
2. Create database user with strong password
3. Configure IP Whitelist (0.0.0.0/0 for development)
4. Copy connection string
5. Set `MONGODB_URI` in environment variables

#### Connection String Format

```
mongodb+srv://username:password@cluster.mongodb.net/cloudnote?retryWrites=true&w=majority
```

#### Database Schema

**Notes Collection:**
```json
{
  "_id": "ObjectId",
  "userId": "string",
  "title": "string",
  "content": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

#### Database Connection

The application connects via `lib/dbConnect.ts`:

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export async function dbConnect() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
}
```

---

## CI/CD Pipeline

### Automated Deployment Process

The Jenkins pipeline automates:

1. **Code Push**: Developer pushes to Git repository
2. **Webhook Trigger**: Git webhook triggers Jenkins pipeline
3. **Build Stage**: 
   - Pull latest code
   - Install dependencies
   - Build Next.js application
   - Run linting checks
4. **Test Stage**:
   - Run unit tests
   - Validate build output
5. **Deploy Stage**:
   - Build Docker image
   - Push to Docker Hub
   - Deploy to AWS EC2
   - Verify deployment

### Pipeline Configuration

**Jenkinsfile** defines all pipeline stages with:
- Conditional logic
- Error handling
- Notification alerts
- Deployment verification

---

## Security

### Best Practices Implemented

1. **Environment Secrets**: Sensitive data in `.env.local`
2. **Database Security**: MongoDB IP whitelisting
3. **Authentication**: NextAuth.js for secure sessions
4. **HTTPS**: SSL/TLS in production
5. **CORS**: API endpoint protection
6. **Input Validation**: Server-side validation
7. **SQL Injection Prevention**: MongoDB parameterized queries

### Security Group Rules

```
Inbound:
  - HTTP (80): 0.0.0.0/0
  - HTTPS (443): 0.0.0.0/0
  - SSH (22): <admin-ip>/32
  
Outbound:
  - All traffic: 0.0.0.0/0
```

### Checklist

- [ ] Change `NEXTAUTH_SECRET` to unique value
- [ ] Restrict MongoDB IP whitelist in production
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure firewall rules
- [ ] Regular security updates
- [ ] Monitor logs and alerts

---

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type checking
npm run type-check

# Format code
npm run format
```

### Development Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Commit changes: `git commit -m "Add feature"`
4. Push to remote: `git push origin feature/your-feature`
5. Create Pull Request
6. Pipeline runs automatically
7. Merge after approval

---

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Code Standards

- Follow ESLint rules
- Use TypeScript strictly
- Write clear commit messages
- Add comments for complex logic
- Test before submitting PR

---

## Troubleshooting

### Common Issues

#### MongoDB Connection Error
```
Error: connect ENOTFOUND cluster.mongodb.net
```
**Solution**: Check `MONGODB_URI` and network connectivity

#### NextAuth Error
```
Error: NEXTAUTH_SECRET not defined
```
**Solution**: Add `NEXTAUTH_SECRET` to `.env.local`

#### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**: 
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

#### Build Fails
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

---

## Performance Optimization

- **Next.js Image Optimization**: Automatic image compression
- **Code Splitting**: Route-based code splitting
- **Caching**: MongoDB query caching
- **CDN**: AWS CloudFront for static assets
- **Database Indexing**: Optimized MongoDB indexes

---

## Monitoring & Logging

### Application Logs
```bash
# View Docker logs
docker logs cloudnote-ai

# Real-time logs
docker logs -f cloudnote-ai
```

### Jenkins Build Logs
- Accessible from Jenkins dashboard
- Stored for audit trail
- Alert on build failures

### AWS CloudWatch
- Application metrics monitoring
- Log aggregation
- Custom alarms and notifications

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

For support, email support@cloudnote-ai.com or open an issue on GitHub.

### Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Terraform Documentation](https://www.terraform.io/docs)
- [Docker Documentation](https://docs.docker.com)

---

## Roadmap

- [ ] Real-time collaboration features
- [ ] Rich text editor integration
- [ ] Note tags and categories
- [ ] Advanced search with filters
- [ ] Mobile app (React Native)
- [ ] Offline sync capability
- [ ] API rate limiting
- [ ] Analytics dashboard

---

**Built with ❤️ by the CloudNote AI Team**

*Last Updated: May 2026*
