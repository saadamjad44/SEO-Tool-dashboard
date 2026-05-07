# SEO Tools Dashboard

## Quick Start (No Build Tool Needed)

### Option 1: Direct Browser (Recommended)
Simply open `demo.html` in your browser - it works immediately with no installation.

### Option 2: Python Server
```bash
python -m http.server 8000
```
Then open: http://localhost:8000/demo.html

### Option 3: PHP Server
```bash
php -S localhost:8000
```
Then open: http://localhost:8000/demo.html

## Why Build Tools Don't Work

Your system has Application Control policies blocking native modules (.node files) used by:
- Vite (Rollup)
- Parcel (SWC)

This is a security restriction, not a safety issue with the tools.

## Production Deployment

Upload the `demo.html` file to any web hosting - it's completely self-contained and works without a build step.

## Full Source Code

The complete React + TypeScript source is in the `src/` folder for future use when you have access to a system without these restrictions.
