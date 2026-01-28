<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI portfolio

This project is a Vite + React single-page application generated from Gemini AI Studio.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Create an `.env.local` file in this folder and set:
   `GEMINI_API_KEY=your_gemini_api_key_here`
3. Run the app:
   `npm run dev`

## Build for Production

1. Ensure `.env.local` (or `.env`) contains `GEMINI_API_KEY`.
2. Build the app:
   `npm run build`
3. The static files will be generated in the `dist/` directory.

> ⚠️ **Important – API Key Exposure**
>
> This is a fully static frontend build. During `npm run build`, the `GEMINI_API_KEY` value is embedded into the JavaScript bundle.
> Anyone can inspect the built site in the browser (DevTools) and see this key.
>
> Recommended usage:
> - Use this setup for personal portfolio, demos, or learning.
> - Use a restricted or disposable Gemini API key.
> - For production or sensitive use-cases, move the Gemini call to a backend/API proxy that keeps the real key on the server.

## Deploy to GitHub Pages (User/Org site)

This folder is intended to be deployed as a static site to a GitHub Pages **User/Org root** repository: `https://<user>.github.io/`.

### Manual deployment

1. Run the production build:
   `npm run build`
2. Upload the contents of the `dist/` folder to your GitHub Pages hosting (for example, to the `gh-pages` branch of your `user.github.io` repo).

### CI/CD with GitHub Actions

In the repository root, you can add a workflow (for example: `.github/workflows/deploy-portfolio.yml`) that:

- Installs dependencies in the `Portfolio/` directory.
- Builds the app with `npm run build`.
- Publishes the `Portfolio/dist` folder to GitHub Pages.

Make sure to configure a `GEMINI_API_KEY` secret in your GitHub repository and pass it into the build step as an environment variable.
