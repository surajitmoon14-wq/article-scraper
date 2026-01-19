import { isValidUrl } from '@/lib/validators';
import { scrapeArticle } from '@/lib/scraper';

export const runtime = 'nodejs';

export async function GET() {
  return Response.json({ error: 'Method not allowed. Use POST.' }, { status: 405 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const url = typeof body?.url === 'string' ? body.url : '';

    if (!url) {
      return Response.json({ error: 'URL is required' }, { status: 400 });
    }

    if (!isValidUrl(url)) {
      return Response.json(
        {
          error:
            'Invalid or forbidden URL. Only public HTTP/HTTPS URLs are allowed.',
        },
        { status: 400 }
      );
    }

    const result = await scrapeArticle(url);
    return Response.json(result);
  } catch (error) {
    console.error('Scraping error:', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred while scraping the article.';

    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
