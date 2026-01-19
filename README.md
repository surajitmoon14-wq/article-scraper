# Guardian Article Extractor

A production-grade, full-stack article extraction platform built with Next.js and The Guardian Content API, optimized for Vercel Serverless deployment.

## 🚀 Overview

Guardian Article Extractor is a high-performance system designed to extract clean, structured content from The Guardian articles. It uses The Guardian's official Content API to provide reliable, legal, and fast access to article data.

### Key Features
- **API-First Architecture**: Uses The Guardian Content API for all article extraction (no web scraping)
- **Vercel Optimized**: Built specifically for serverless environments with optimized Node.js runtime
- **Clean SaaS UI**: Professional dashboard design using Tailwind CSS and Lucide icons
- **Secure**: Validates Guardian URLs only, preventing SSRF attacks
- **Accurate**: Provides word counts, author extraction, and publication dates directly from the API
- **Legal & Stable**: No scraping means no legal concerns and no breaking changes due to website structure changes

## 🛠 Tech Stack

- **Frontend**: Next.js 16+ (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (Serverless Functions with Node.js runtime)
- **API**: The Guardian Content API
- **Deployment**: Vercel

## 🏗 Architecture

The system follows a clean, modular architecture:

1. **API Layer (`app/api/scrape/route.ts`)**: Handles incoming POST requests, validates Guardian URLs, and coordinates the API integration
2. **Logic Layer (`lib/scraper.ts`)**: Contains the core Guardian API integration logic. It fetches article data and formats it into a consistent structure
3. **Validation Layer (`lib/validators.ts`)**: Ensures all processed URLs are valid Guardian article URLs and extracts article IDs
4. **UI Layer**: A collection of React components providing a seamless user experience

## 💻 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file and add your Guardian API key:
   ```bash
   GUARDIAN_API_KEY=your_api_key_here
   ```
   
   Get your API key from: https://open-platform.theguardian.com/

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open the application**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## ☁️ Vercel Deployment

This project is designed to be deployed on Vercel with zero configuration:

1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Import the project into Vercel
3. Add your Guardian API key in Vercel Environment Variables:
   - Name: `GUARDIAN_API_KEY`
   - Value: Your actual API key from The Guardian Open Platform
4. Vercel will automatically detect Next.js and deploy the application

## 🔐 Security Considerations

- **URL Validation**: Only accepts URLs from www.theguardian.com
- **No SSRF Risk**: No ability to fetch arbitrary URLs, only Guardian API calls
- **API Key Protection**: API key is never exposed to the client, only used server-side
- **User-Safe Errors**: Stack traces are never exposed to the client

## 📋 API Response Format

The API returns article data in the following format:

```json
{
  "title": "Article Title",
  "author": "Author Name",
  "published_date": "2023-12-01",
  "content_html": "<p>First paragraph...</p><p>Second paragraph...</p>",
  "content_text": "First paragraph...\n\nSecond paragraph...",
  "source": "theguardian.com",
  "word_count": 500
}
```

## 📄 License

Apache 2.0
