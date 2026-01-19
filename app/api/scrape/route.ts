import { isValidGuardianUrl, extractArticleId } from '@/lib/validators';
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

    if (!isValidGuardianUrl(url)) {
      return Response.json(
        { error: 'Only Guardian articles are supported' },
        { status: 400 }
      );
    }

    const articleId = extractArticleId(url);
    if (!articleId) {
      return Response.json(
        { error: 'Please enter a valid The Guardian article URL.' },
        { status: 400 }
      );
    }

    const result = await scrapeArticle(url);
    return Response.json(result);
  } catch (error) {
    console.error('API error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    if (errorMessage.includes('Guardian API key is not configured')) {
      return Response.json({ error: errorMessage }, { status: 500 });
    }

    if (errorMessage.includes('Guardian API error') || errorMessage.includes('Article not found')) {
      return Response.json({ error: errorMessage }, { status: 502 });
    }

    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
