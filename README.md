# Article Scraper Pro

A production-grade, full-stack article extraction platform built with Next.js and optimized for Vercel Serverless deployment.

## 🚀 Overview

Article Scraper Pro is a high-performance system designed to extract clean, structured content from any news, blog, or article website. It removes advertisements, navigation menus, headers, footers, and other clutter to return just the meaningful content.

### Key Features
- **Production-Ready Scraping**: Utilizes `@mozilla/readability` for primary extraction and `cheerio` for robust fallback.
- **Vercel Optimized**: Built specifically for serverless environments with optimized Node.js runtime.
- **Clean SaaS UI**: Professional dashboard design using Tailwind CSS and Lucide icons.
- **Secure**: Implements strict URL validation and blocks private IP ranges (SSRF protection).
- **Accurate**: Provides word counts, author extraction, and publication date detection.

## 🛠 Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js Serverless Functions (Node.js runtime)
- **Scraping Libraries**: `jsdom`, `@mozilla/readability`, `cheerio`
- **Deployment**: Vercel

## 🏗 Architecture

The system follows a clean, modular architecture:

1. **API Layer (`app/api/scrape/route.ts`)**: Handles incoming POST requests, validates inputs, and coordinates the scraping process.
2. **Logic Layer (`lib/scraper.ts`)**: Contains the core scraping engine. It fetches HTML with a timeout, parses the DOM, and applies readability heuristics.
3. **Validation Layer (`lib/validators.ts`)**: Ensures all processed URLs are valid and safe.
4. **UI Layer**: A collection of React components providing a seamless user experience.

## 💻 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open the application**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## ☁️ Vercel Deployment

This project is designed to be deployed on Vercel with zero configuration:

1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Import the project into Vercel.
3. Vercel will automatically detect Next.js and deploy the application.

### Known Serverless Limitations
- **Timeout**: Vercel Serverless Functions have a maximum execution time (10s on Hobby, 60s on Pro). The scraper has a built-in 15s timeout to stay within these bounds.
- **Memory**: Scraping very large pages can consume significant memory. The system uses efficient parsing to mitigate this.

## 🔐 Security Considerations

- **SSRF Protection**: All URLs are validated against common private IP ranges to prevent Serverless Side Request Forgery.
- **Input Sanitization**: HTML is cleaned using Cheerio to remove potentially dangerous scripts and styles.
- **User-Safe Errors**: Stack traces are never exposed to the client.

## 📄 License

Apache 2.0
