# GitHub Actions CI/CD Setup

## 📋 Workflows Created

### 1. **CI/CD Pipeline** (`.github/workflows/ci.yml`)

**Triggers**: Push to `main`/`develop`, Pull Requests

- ✅ Tests on Node.js 18.x and 20.x
- ✅ MongoDB service with authentication
- ✅ Linting, unit tests, e2e tests
- ✅ Test coverage reporting
- ✅ Build artifacts for `main` branch

### 2. **Quick Check** (`.github/workflows/quick-check.yml`)

**Triggers**: Push to feature branches, Pull Requests

- ⚡ Fast feedback loop
- ✅ Linting and unit tests only
- ✅ Build verification

### 3. **Release** (`.github/workflows/release.yml`)

**Triggers**: Git tags (e.g., `v1.0.0`)

- 🚀 Full test suite
- 📦 Build and release creation
- 📁 Release artifacts

## 🔧 Features

### ✅ **Automated Testing**

- Unit tests with Jest
- Integration/E2E tests with MongoDB
- Linting with ESLint
- Test coverage reports

### ✅ **Multi-Node Support**

- Tests on Node.js 18.x and 20.x
- Matrix strategy for compatibility

### ✅ **MongoDB Integration**

- Containerized MongoDB service
- Authentication configured
- Test database isolation

### ✅ **Environment Configuration**

- Automated .env creation
- Secure secrets management
- Environment-specific configs

## 🚀 How to Use

### **Push to Feature Branch**

```bash
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

→ Runs **Quick Check** workflow

### **Create Pull Request**

```bash
gh pr create --title "Add new feature" --body "Description"
```

→ Runs **CI/CD Pipeline** workflow

### **Merge to Main**

```bash
git checkout main
git merge feature/new-feature
git push origin main
```

→ Runs full **CI/CD Pipeline** + **Build**

### **Create Release**

```bash
git tag v1.0.0
git push origin v1.0.0
```

→ Runs **Release** workflow

## 📊 Status Badges

Add these to your README.md:

```markdown
![CI/CD](https://github.com/yourusername/test-be-pro/actions/workflows/ci.yml/badge.svg)
![Tests](https://github.com/yourusername/test-be-pro/actions/workflows/quick-check.yml/badge.svg)
[![codecov](https://codecov.io/gh/yourusername/test-be-pro/branch/main/graph/badge.svg)](https://codecov.io/gh/yourusername/test-be-pro)
```

## 🔐 Required Secrets

Add these in GitHub Settings → Secrets and variables → Actions:

1. **CODECOV_TOKEN** (optional)
   - Sign up at https://codecov.io
   - Add your repository
   - Copy the token to GitHub secrets

## 📝 Package.json Scripts Verification

Make sure these scripts exist in your `package.json`:

```json
{
  "scripts": {
    "build": "nest build",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "test:cov": "jest --coverage"
  }
}
```

## 🐛 Troubleshooting

### **MongoDB Connection Issues**

- Check MongoDB service health in logs
- Verify MONGODB_URI format
- Ensure authentication credentials match

### **Test Failures**

- Check if all dependencies are installed
- Verify test database is properly isolated
- Review test environment setup

### **Build Issues**

- Ensure TypeScript compilation succeeds locally
- Check for missing dependencies
- Verify all imports are correct

## 🎯 Benefits

✅ **Automated Quality Gates**

- No broken code reaches main branch
- Consistent test execution
- Early bug detection

✅ **Fast Feedback**

- Quick checks on feature branches
- Detailed reports on main branches
- Coverage tracking over time

✅ **Release Automation**

- Tagged releases with artifacts
- Consistent build process
- Release notes generation
