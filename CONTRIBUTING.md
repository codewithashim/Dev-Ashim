# Contributing to Ashim OS Portfolio

First off, thank you for considering contributing to Ashim OS! It's people like you that make this project great.

## Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed and what behavior you expected to see**
* **Include screenshots if possible**
* **Include your environment details** (OS, Browser, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Provide specific examples to demonstrate the enhancement**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the TypeScript/React styleguides
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## Development Process

### Prerequisites

* Node.js 18.x or higher
* npm, yarn, or pnpm
* Git

### Setup Development Environment

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/Dev-Ashim.git
cd Dev-Ashim

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Run development server
npm run dev
```

### Development Workflow

1. **Create a branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/amazing-feature
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes** following our coding standards

3. **Test your changes** thoroughly

4. **Commit your changes** using clear commit messages:
   ```bash
   git commit -m "feat: add amazing feature"
   # or
   git commit -m "fix: resolve bug with window dragging"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request** with a clear title and description

## Coding Standards

### TypeScript

* Use TypeScript for all new code
* Define proper types, avoid `any` when possible
* Use interfaces for object shapes
* Use type aliases for unions and complex types

### React

* Use functional components with hooks
* Use `memo` for performance-critical components
* Use `useCallback` and `useMemo` appropriately
* Keep components small and focused

### Styling

* Use Tailwind CSS utility classes
* Follow the existing color scheme and design patterns
* Ensure responsive design for mobile devices
* Test accessibility features

### File Organization

```
src/
├── app/              # Next.js app directory
├── features/         # Feature modules
│   └── feature-name/
│       ├── components/
│       ├── hooks/
│       └── index.ts
└── shared/          # Shared resources
    ├── components/
    ├── hooks/
    ├── utils/
    └── types/
```

### Naming Conventions

* **Components**: PascalCase (`MyComponent.tsx`)
* **Files**: camelCase for utilities, PascalCase for components
* **Functions**: camelCase (`handleClick`, `fetchData`)
* **Constants**: UPPER_SNAKE_CASE (`MAX_WIDTH`)
* **Types/Interfaces**: PascalCase (`UserData`, `WindowState`)

### Git Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

* `feat:` New feature
* `fix:` Bug fix
* `docs:` Documentation changes
* `style:` Code style changes (formatting, etc.)
* `refactor:` Code refactoring
* `perf:` Performance improvements
* `test:` Adding or updating tests
* `chore:` Maintenance tasks

Examples:
```
feat: add dark mode toggle
fix: resolve window positioning bug
docs: update README with new features
refactor: improve performance of window rendering
```

## Testing

Before submitting a PR:

1. **Run the linter**:
   ```bash
   npm run lint
   ```

2. **Check types**:
   ```bash
   npm run type-check
   ```

3. **Test the build**:
   ```bash
   npm run build
   ```

4. **Test in multiple browsers** (Chrome, Firefox, Safari)

5. **Test responsive design** on different screen sizes

## Documentation

* Update README.md if you change functionality
* Add JSDoc comments for complex functions
* Update TypeScript types as needed
* Document new features in CHANGELOG.md

## Performance Considerations

* Use React.memo for expensive components
* Implement proper useCallback/useMemo
* Lazy load components when appropriate
* Optimize images and assets
* Test performance with React DevTools Profiler

## Accessibility

* Include proper ARIA labels
* Ensure keyboard navigation works
* Test with screen readers
* Maintain sufficient color contrast
* Support high contrast mode

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉

