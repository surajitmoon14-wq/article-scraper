import { NextRequest, NextResponse } from 'next/server';
import { isValidUrl } from '@/lib/validators';
import { scrapeArticle } from '@/lib/scraper';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    if (!isValidUrl(url)) {
      return NextResponse.json(
        { error: 'Invalid or forbidden URL. Only public HTTP/HTTPS URLs are allowed.' },
        { status: 400 }
      );
    }

    const result = await scrapeArticle(url);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Scraping error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred while scraping the article.';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
