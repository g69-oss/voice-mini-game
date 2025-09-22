# Next.js App with Bun

A modern Next.js 14 application using Bun as the package manager, featuring TypeScript, Tailwind CSS, and the App Router.

## Features

- ⚡ **Bun** - Lightning-fast package manager and runtime
- 🚀 **Next.js 14** - Latest Next.js with App Router
- 🎯 **TypeScript** - Full type safety and modern features
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📱 **Responsive Design** - Mobile-first approach
- 🔧 **Modern Tooling** - ESLint, Prettier, and more

## Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh) installed on your system:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation

1. Install dependencies:

```bash
bun install
```

2. Start the development server:

```bash
bun run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run format` - Format code with Prettier
- `bun run typecheck` - Run TypeScript type checking
- `bun run clean` - Clean build artifacts

## Project Structure

```
src/
├── app/                 # App Router directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable components
│   └── ui/            # UI components
└── lib/               # Utility functions
    └── utils.ts       # Common utilities
```

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: Bun
- **Linting**: ESLint
- **Formatting**: Prettier

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Bun Documentation](https://bun.sh/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
