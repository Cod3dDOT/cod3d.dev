[![cod3d.dev](https://your-banner-url-here.gif)](https://github.com/cod3ddot/cod3d.dev)

# cod3d.dev

Personal website and blog built with Next.js v15, TailwindCSS v4, and PocketBase.

## Quick Setup

1. Install dependencies:
   ```bash
   bun install
   ```

2. Setup environment variables:
   ```bash
   # Follow .env.example to create .env file with:
   SITE_URL=your_site_url
   SITE_NAME=your_site_name
   POCKETBASE_HOST=your_pocketbase_host
   POCKETBASE_USER=your_pocketbase_user
   POCKETBASE_PASS=your_pocketbase_pass
   PRIVATE_DOWNLOAD_KEY=your_private_download_key
   ```

3. Start development server:
   ```bash
   bun dev
   ```

## Project Structure

```
├── src/
│   ├── app/                 # Next.js application pages and routes
│   │   └── (pages)/         # Page components and layouts
│   ├── components/          # Reusable UI components
│   │   ├── effects/         # Reusable effects
│   │   ├── footer/          # Footer and its components
│   │   ├── icons/           # Well, icons
│   │   ├── navigation/      # Navigation drawer
│   │   └── ...              # Other reusable UI components
│   ├── lib/                 # Utility functions and hooks
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # Custom React contexts
│   │   ├── markdown/        # Markdown processing utilities
│   │   ├── utils/           # General utilites
│   │   └── trustedTypes.ts  # Enables trusted types
│   ├── pocketbase/          # PocketBase configuration and client
│   └── styles/              # Global styles and theming
├── public/                  # Static assets and PWA files
└── scripts/                 # Scripts to generate some fun
```

## Core Technologies

- **Framework & Runtime**
  - [Next.js 15](https://nextjs.org) with App Router
  - [React 19](https://react.dev)
  - [Bun](https://bun.sh) as JavaScript runtime and package manager
  - TypeScript with strict mode

- **Styling & Design**
  - [TailwindCSS v4](https://tailwindcss.com)
  - [Geist & Geist Mono](https://vercel.com/font), [Pixelify Sans](https://fonts.google.com/specimen/Pixelify+Sans) fonts
  - Dark/Light theme support

- **Content & Data**
  - [PocketBase](https://pocketbase.io) for backend
  - [Unified](https://unifiedjs.com) for Markdown processing

- **Animation & Interaction**
  - [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling
  - [View transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)

- **Development Tools**
  - [Biome](https://biomejs.dev) for linting & formatting
  - [Lefthook](https://github.com/evilmartians/lefthook) for Git hooks
  - Conventional commits

## Development Tools

### Available Commands
- `bun dev` - Start development server
- `bun build` - Build production bundle (with telemetry disabled)
- `bun build:clean` - Clean build directory and rebuild
- `bun start` - Start production server
- `bun lint` - Run Biome linter
- `bun lint:fix` - Fix linting issues with Biome
- `bun analyze` - Analyze bundle size
- `bun generate:pokemons` - Generate Pokemon data
- `bun commit` - Interactive commit with conventional commit standards

### Security Features
- Content Security Policy (CSP)
- Strict CORS settings
- Trusted Types enforcement

## Blog Features

- Markdown with frontmatter support
- Syntax highlighting
- Math equations (KaTeX)
- Reading time estimation
- Image theming
- Code highlighting
- RSS feed

## Git Workflow

### Automated Git Hooks (via Lefthook)
- **Pre-commit**: Runs Biome to check and format staged files
- **Commit-msg**: Validates commit messages using commitlint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits (`bun run commit`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

   Copyright 2025 cod3ddot

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
