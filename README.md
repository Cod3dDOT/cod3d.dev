[![cod3d.dev](https://cod3d.dev/img/readme-next.cod3d.dev.gif)](https://github.com/cod3ddot/cod3d.dev)

# cod3d.dev

Personal website and blog built with Next.js v15, TailwindCSS v4, and PocketBase.

Visit: [cod3d.dev](https://cod3d.dev)
[analytics.cod3d.dev](https://analytics.cod3d.dev)

## Sitemap

```
├── /                    # Landing page
├── thoughts/
│   └── [article]/       # Article page
│       └── download/    # Article download endpoint
├── feed.xml             # RSS feed
├── sitemap.xml          # Sitemap
├── pgp-key.txt          # PGP to verify ownership
├── security.txt         # See https://securitytxt.org/, signed using pgp-key.txt
├── ads.txt              # See https://iabtechlab.com/ads-txt/
└── app-ads.txt          # See https://iabtechlab.com/ads-txt/
```

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
│   ├── app/                    # Next.js application pages and routes
│   │   └── (pages)/
│   │       ├── (components)/   # UI components specific to route
│   │       └── page.tsx/       # UI components for route
│   ├── components/             # Reusable UI components
│   │   ├── effects/            # Reusable effects
│   │   ├── footer/             # Footer and its components
│   │   ├── icons/              # Well, icons
│   │   ├── navigation/         # Navigation drawer
│   │   └── ...                 # Other reusable UI components
│   ├── lib/                    # Utility functions and hooks
│   │   ├── hooks/              # Custom React hooks
│   │   ├── context/            # Custom React contexts
│   │   ├── markdown/           # Markdown processing utilities
│   │   ├── utils/              # General utilites
│   │   └── trustedTypes.ts     # Enables trusted types
│   ├── pocketbase/             # PocketBase configuration and client
│   └── styles/                 # Global styles and theming
├── public/                     # Static assets and PWA files
└── scripts/                    # Scripts to generate some fun
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
  - [next-themes](https://github.com/pacocoursey/next-themes) for theming

- **Content & Data**
  - [PocketBase](https://pocketbase.io) for backend
  - [Unified](https://unifiedjs.com) for Markdown processing

- **Animation & Interaction**
  - [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling

- **Development Tools**
  - [Biome](https://biomejs.dev) for linting & formatting
  - [Lefthook](https://github.com/evilmartians/lefthook) for Git hooks
  - Conventional commits

- **Analytics**
  - [Umami](https://github.com/umami-software/umami) for privacy-friendly anallytics. See [analytics.cod3d.dev](https://analytics.cod3d.dev) for stats.

## Development Tools

### Available Commands
- `bun run dev` - Start development server
- `bun run build` - Build production bundle (with telemetry disabled)
- `bun run build:clean` - Clean build directory and rebuild
- `bun run start` - Start production server
- `bun run lint` - Run Biome linter
- `bun run lint:fix` - Fix linting issues with Biome
- `bun run analyze` - Analyze bundle size
- `bun run generate:pokemons` - Generate Pokemon data
- `bun run commit` - Interactive commit with conventional commit standards

## Features

- Markdown with frontmatter support, syntax highlighting, KaTeX and more.
- Reading time estimation
- Image theming
- RSS feed, download articles in original format (markdown)
- CSP, CORS, Trusted Types
- Middleware with download token generation

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

   Copyright 2025 cod3ddot@proton.me

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
