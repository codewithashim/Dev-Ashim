# Ashim OS - Portfolio Website

A modern, interactive portfolio website designed as an operating system interface. Built with Next.js 14, TypeScript, and Tailwind CSS.

![Ashim OS](./public/og-image.png)

## 🚀 Features

- **OS-Style Interface**: Interactive desktop environment with window management
- **Draggable Windows**: Fully functional window system with minimize, maximize, and close
- **Terminal Emulator**: Built-in terminal with custom commands
- **Command Palette**: Quick access to all features via keyboard shortcuts (Cmd/Ctrl + K)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode**: High contrast mode for better accessibility
- **Performance Optimized**: React.memo, useCallback, and lazy loading for optimal performance
- **SEO Optimized**: Complete meta tags and Open Graph support
- **Analytics Ready**: Built-in analytics and error tracking structure
- **Accessibility**: WCAG compliant with ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **UI Components**: Lucide React Icons, CMDK
- **Code Quality**: ESLint, Prettier

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/codewithashim/Portfolio.git

# Navigate to the project directory
cd Portfolio

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Create environment file
cp .env.example .env.local

# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Home page
├── features/              # Feature-based modules
│   ├── about/            # About application
│   ├── boot/             # Boot loader animation
│   ├── contact/          # Contact application
│   ├── desktop/          # Desktop environment
│   ├── projects/         # Projects showcase
│   ├── resume/           # Resume viewer
│   ├── terminal/         # Terminal emulator
│   └── window/           # Window management
└── shared/               # Shared resources
    ├── components/       # Reusable components
    │   ├── CommandPalette.tsx
    │   ├── ContextMenu.tsx
    │   └── ErrorBoundary.tsx
    ├── constants/        # App constants
    ├── data/            # Portfolio data
    ├── hooks/           # Custom React hooks
    │   ├── useClickOutside.ts
    │   ├── useDesktopStore.ts
    │   ├── useKeyboardShortcut.ts
    │   ├── useLocalStorage.ts
    │   └── useWindowSize.ts
    ├── lib/             # Utility libraries
    │   ├── analytics.ts
    │   └── logger.ts
    ├── types/           # TypeScript types
    └── utils/           # Utility functions
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_LOG_LEVEL=info
```

### Portfolio Data

Update your information in `src/shared/data/portfolio.ts`:

```typescript
export const portfolioData: PortfolioData = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@example.com',
  // ... other fields
}
```

## 🎨 Customization

### Theme Colors

Edit colors in `tailwind.config.ts` or `src/app/globals.css`:

```css
:root {
  --os-bg: #0b0f14;
  --os-accent-green: #22c55e;
  --os-accent-teal: #14b8a6;
}
```

### Adding New Apps

1. Create a new feature directory under `src/features/`
2. Add the app component
3. Register it in `src/shared/types/index.ts`
4. Add to the dock in `src/features/desktop/components/Dock.tsx`

## 📊 Analytics & Monitoring

The project includes built-in structure for:

- **Analytics**: Page views, events, user interactions
- **Error Tracking**: Error boundary and logging system
- **Performance Monitoring**: Ready for integration with services like Sentry, Google Analytics, or Plausible

To enable analytics, implement the TODO sections in:
- `src/shared/lib/analytics.ts`
- `src/shared/lib/logger.ts`

## 🔑 Keyboard Shortcuts

- `Cmd/Ctrl + K`: Open command palette
- `` ` ``: Open terminal
- `Esc`: Close modals and dialogs
- `Arrow Keys`: Navigate in command palette

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📦 Building for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/codewithashim/Portfolio)

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- **Netlify**: Use `next build` as build command
- **AWS Amplify**: Configure build settings for Next.js
- **Docker**: Create a Dockerfile for containerized deployment

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Ashim Rudra Paul**

- Website: [ashim.dev](https://ashim.dev)
- GitHub: [@codewithashim](https://github.com/codewithashim)
- LinkedIn: [ashimrudrapaul](https://linkedin.com/in/ashimrudrapaul)

## 🙏 Acknowledgments

- Inspired by modern OS interfaces (macOS, Ubuntu)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Built with [Next.js](https://nextjs.org/)

## 📝 Changelog

### Version 1.0.0 (Current)

- ✨ Initial release
- 🎨 OS-style interface with window management
- ⚡ Performance optimizations
- ♿ Accessibility improvements
- 🔍 SEO enhancements
- 📊 Analytics structure
- 🐛 Error boundary implementation

---

Made with ❤️ by Ashim Rudra Paul
