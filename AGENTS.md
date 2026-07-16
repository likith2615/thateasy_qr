# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **always running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Key Files

- `src/App.tsx` - Main application component
- `src/main.tsx` - React entry point
- `src/index.css` - Global styles and Tailwind CSS import
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite configuration
- `.mise.toml` - Toolchain versions (Node.js, pnpm)

## Styling

This project uses **Tailwind CSS v4** for styling. Use Tailwind utility classes directly in JSX. Tailwind is loaded via the Vite plugin — no PostCSS config needed.

## Design Context

- **Register**: `product` (interactive dashboard & QR tools)
- **Platform**: `adaptive` (cross-platform visual styling patterns)
- **Creative North Star**: "The Editorial Sanctuary" (classic serifs, warm cream backgrounds, quiet confidence, and zero neon/flashing elements)
- **Primary Color**: `#8E9C78` (Quiet Sage)
- **Background**: `#F7F5F0` (Warm Alabaster)
- **Text Color**: `#1C1C1A` (Deep Inkstone)
- **Borders**: `#D8D4C8` (Parchment Border)
- **Headings Font**: `Crimson Text` (serif)
- **Body Font**: `DM Sans` (sans-serif)

