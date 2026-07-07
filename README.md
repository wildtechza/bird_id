This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Static Export and `next` Assets

This project is configured for static export via `output: 'export'` in `next.config.ts`. Build the static site and rename the assets folder from `_next` to `next` with:

```bash
npm run export:rename
```

This will:
- Run `next build` to output static files into `out/`
- Rename `out/_next` to `out/next`
- Update references in text assets from `/_next/...` to `/next/...`

## Mobile App with Capacitor

The `mobile/` folder contains a Capacitor project for building native Android and iOS apps from the Next.js web app.

### Prerequisites

- Android Studio (for Android development)
- Node.js and npm
- Capacitor CLI (installed as project dependency)

### Setup

1. Build the Next.js app and copy assets to the mobile folder:
   ```bash
   npm run export:rename
   cp -r out/* mobile/www/
   ```

2. Install dependencies in the mobile folder:
   ```bash
   cd mobile
   npm install
   ```

### Development Commands

From the `mobile/` directory:

- **Copy web assets to native project:**
  ```bash
  npx cap copy android
  ```

- **Sync plugins and copy assets:**
  ```bash
  npx cap sync android
  ```

- **Build and run on Android device/emulator:**
  ```bash
  npx cap run android
  ```

- **Open Android project in Android Studio:**
  ```bash
  npx cap open android
  ```
  *Note: If Android Studio path is not found, set the environment variable:*
  ```bash
  export CAPACITOR_ANDROID_STUDIO_PATH="/path/to/android-studio/bin/studio.sh"
  ```

### Workflow

1. Make changes to the Next.js app
2. Build and export: `npm run export:rename` (from root)
3. Copy to mobile: `cp -r out/* mobile/www/`
4. Sync with native: `cd mobile && npx cap sync android`
5. Run on device: `npx cap run android`


Serve the contents of `out/` with any static file server.
