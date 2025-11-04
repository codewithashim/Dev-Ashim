# Ashim OS - Linux-Inspired Portfolio

A stunning, interactive portfolio website that emulates a lightweight Linux desktop OS experience. Built with Next.js, React, TypeScript, and TailwindCSS.

![Ashim OS Preview](https://via.placeholder.com/1200x600/0b0f14/22c55e?text=Ashim+OS+Portfolio)

## ✨ Features

### Desktop Environment
- **Native OS Feel**: Draggable, resizable windows with minimize, maximize, and close controls
- **Application Dock**: Quick access to all portfolio apps with visual feedback
- **System Topbar**: Live clock, system status icons, and theme controls
- **Command Palette**: Quick command access with `Cmd/Ctrl+K`

### Interactive Terminal
A fully functional pseudo-terminal with built-in commands:
- `help` - Show all available commands
- `about` - Display biography and information
- `skills` - List categorized technical skills
- `experience` - Show work history
- `projects` - List all projects
- `open <project-id>` - Open project details window
- `resume` - Display full resume
- `download resume` - Download resume as PDF
- `contact` - Show contact information
- `email` - Open email client
- `clear` - Clear terminal
- `exit` - Close terminal window

### Portfolio Apps
- **About**: Personal information, skills overview, and education
- **Projects**: Detailed showcase of notable projects with expandable details
- **Resume**: Professional resume with download option
- **Contact**: Contact form and social links
- **Terminal**: Interactive command-line interface

### Accessibility & UX
- ✅ Semantic HTML with proper ARIA labels
- ✅ Keyboard navigation support
- ✅ Focus styles for keyboard users
- ✅ High contrast mode toggle
- ✅ Screen reader friendly
- ✅ Responsive design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/codewithashim/portfolio.git
cd portfolio

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
# Create optimized production build
npm run build
# or
yarn build
# or
pnpm build

# Start production server
npm start
# or
yarn start
# or
pnpm start
```

### Static Export (Optional)

```bash
# Generate static HTML export
npm run export
# or
yarn export
# or
pnpm export
```

The static files will be in the `out/` directory.

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── Desktop.tsx         # Main desktop shell
│   ├── Topbar.tsx          # System topbar
│   ├── Dock.tsx            # Application dock
│   ├── Window.tsx          # Draggable window component
│   ├── CommandPalette.tsx  # Quick command interface
│   └── apps/
│       ├── AboutApp.tsx    # About application
│       ├── ProjectsApp.tsx # Projects showcase
│       ├── ResumeApp.tsx   # Resume viewer
│       ├── ContactApp.tsx  # Contact form
│       └── TerminalApp.tsx # Interactive terminal
├── hooks/
│   └── useDesktopStore.ts  # Zustand state management
├── types/
│   └── index.ts            # TypeScript type definitions
├── data/
│   └── portfolio.ts        # Portfolio content data
├── public/
│   ├── favicon.ico         # Site favicon
│   └── logo.svg            # Logo asset
└── package.json            # Dependencies and scripts
```

## 🎨 Customization

### Update Portfolio Content

Edit `data/portfolio.ts` to update:
- Personal information
- Skills and technologies
- Work experience
- Projects
- Education

### Modify Theme Colors

Update colors in `tailwind.config.ts`:

```typescript
colors: {
  'os-bg': '#0b0f14',           // Background
  'os-surface': '#161b22',       // Surface elements
  'os-border': '#30363d',        // Borders
  'os-text': '#c9d1d9',          // Text
  'os-text-muted': '#8b949e',    // Muted text
  'os-accent-green': '#22c55e',  // Primary accent
  'os-accent-teal': '#14b8a6',   // Secondary accent
  // Add more custom colors
}
```

### Add New Terminal Commands

Edit `components/apps/TerminalApp.tsx` and add to the `commands` object:

```typescript
const commands: Record<string, () => void> = {
  // ... existing commands
  mycommand: () => {
    addLines(['Your command output here'])
  }
}
```

## 🌐 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Deploy

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

### Static Hosting (GitHub Pages, S3, etc.)

```bash
npm run export
# Upload contents of 'out/' directory
```

## 🧪 Testing Checklist

### Functionality Tests
- [ ] All dock apps open correctly
- [ ] Windows can be dragged to new positions
- [ ] Windows can be resized from corner
- [ ] Minimize button hides window
- [ ] Maximize button toggles fullscreen
- [ ] Close button removes window
- [ ] Multiple windows can be opened simultaneously
- [ ] Windows layer correctly (z-index)

### Terminal Tests
- [ ] Terminal opens with ` key
- [ ] All commands execute correctly:
  - [ ] `help` shows command list
  - [ ] `about` displays bio
  - [ ] `skills` shows skills
  - [ ] `experience` shows work history
  - [ ] `projects` lists projects
  - [ ] `open <project>` opens project window
  - [ ] `resume` displays resume
  - [ ] `contact` shows contact info
  - [ ] `email` opens mailto link
  - [ ] `clear` clears terminal
  - [ ] `exit` closes terminal
- [ ] Command history works (↑/↓ arrows)
- [ ] Auto-scroll to bottom on new output

### Command Palette Tests
- [ ] Opens with `Cmd/Ctrl+K`
- [ ] Closes with `Esc`
- [ ] Search filters commands
- [ ] Can navigate with arrow keys
- [ ] Enter key executes command
- [ ] Opens correct app for each command

### UI/UX Tests
- [ ] Clock updates every minute
- [ ] High contrast mode toggles correctly
- [ ] Dock shows active app indicators
- [ ] Hover effects work on all interactive elements
- [ ] Welcome message shows when no windows open

### Accessibility Tests
- [ ] All interactive elements keyboard accessible
- [ ] Tab navigation works correctly
- [ ] Focus indicators visible
- [ ] ARIA labels present on controls
- [ ] Screen reader announces content changes
- [ ] High contrast mode improves readability

### Responsive Tests
- [ ] Layout adapts to tablet screens (768px)
- [ ] Layout adapts to mobile screens (375px)
- [ ] Windows constrained to viewport
- [ ] Touch interactions work on mobile

### Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance Tests
- [ ] Initial page load < 3 seconds
- [ ] Window animations smooth (60fps)
- [ ] Terminal command execution instant
- [ ] No memory leaks after extended use
- [ ] Lighthouse score > 90

## 🛠️ Technologies Used

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **Command Palette**: cmdk

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Ashim Rudra Paul**
- Email: codewithashim@gmail.com
- GitHub: [@codewithashim](https://github.com/codewithashim)
- LinkedIn: [Ashim Rudra Paul](https://linkedin.com/in/ashimrudrapaul)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/codewithashim/portfolio/issues).

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

**Note**: This is a portfolio website template. The design and functionality are optimized for desktop browsers. Mobile support is included but the experience is best on larger screens.

