# Contributing to Bisclavret

Thank you for your interest in contributing to Bisclavret! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- Rust 1.70 or higher
- Git

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/bisclavret.git
   cd bisclavret
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/bisclavret/bisclavret.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Run in development mode**:
   ```bash
   npm run tauri:dev
   ```

## 🛠️ Development Guidelines

### Code Style

- **TypeScript**: Use strict typing, avoid `any`
- **React**: Use functional components with hooks
- **SCSS**: Follow BEM methodology, use variables and mixins
- **Git**: Use conventional commits

### Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── styles/        # SCSS stylesheets
└── main.tsx       # Application entry point
```

### Branching Strategy

- **`main`**: Stable, production-ready code
- **`feature/*`**: New features
- **`fix/*`**: Bug fixes
- **`docs/*`**: Documentation updates

## 📝 Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test thoroughly

3. **Commit your changes**:
   ```bash
   git commit -m "feature: add amazing new feature"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

## 🧪 Testing

- Run TypeScript type checking: `npm run type-check`
- Test the Tauri app: `npm run tauri:dev`
- Build for production: `npm run tauri:build`

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] TypeScript types are properly defined
- [ ] SCSS follows BEM methodology
- [ ] Changes are tested locally
- [ ] No console errors or warnings

### PR Description

Include:
- **What** the PR does
- **Why** the change is needed
- **How** to test the changes
- **Screenshots** if UI changes

## 🐛 Reporting Issues

When reporting bugs, please include:

- **OS and version**
- **Node.js version**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable

## 💡 Feature Requests

For feature requests:

- Check existing issues first
- Provide clear description
- Explain use case and benefits
- Consider implementation complexity

## 📄 License

By contributing to Bisclavret, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Discord**: [Join our community](https://discord.gg/bisclavret) (if available)

Thank you for contributing to Bisclavret! 🎉
