export interface ScrapeResult {
  title: string;
  author: string | null;
  published_date: string;
  content_html: string;
  content_text: string;
  source: string;
  word_count: number;
}

interface GuardianApiResponse {
  response: {
    status: string;
    content: {
      id: string;
      webTitle: string;
      fields?: {
        bodyText?: string;
        headline?: string;
        byline?: string;
        publication?: string;
      };
      webPublicationDate: string;
    } | null;
  };
}

export async function scrapeArticle(url: string): Promise<ScrapeResult> {
  const apiKey = process.env.GUARDIAN_API_KEY;

  if (!apiKey) {
    throw new Error('Guardian API key is not configured');
  }

  const articleId = url.replace(/^https:\/\/www\.theguardian\.com\//, '');

  const apiUrl = `https://content.guardianapis.com/${articleId}?api-key=${apiKey}&show-fields=bodyText,headline,byline,publication`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Article not found');
    }
    throw new Error(`Guardian API error: ${response.status} ${response.statusText}`);
  }

  const data: GuardianApiResponse = await response.json();

  if (data.response.status !== 'ok' || !data.response.content) {
    throw new Error('Article not found');
  }

  const content = data.response.content;
  const bodyText = content.fields?.bodyText || '';
  const paragraphs = bodyText.split('\n\n').filter(p => p.trim());
  const contentHtml = paragraphs.map(p => `<p>${p.trim()}</p>`).join('\n');
  const contentText = bodyText.trim();
  const wordCount = countWords(contentText);

  let publishedDate = '1970-01-01';
  try {
    const date = new Date(content.webPublicationDate);
    if (!isNaN(date.getTime())) {
      publishedDate = date.toISOString().split('T')[0];
    }
  } catch {
    // Keep default date
  }

  return {
    title: content.fields?.headline || content.webTitle || 'Untitled',
    author: content.fields?.byline || null,
    published_date: publishedDate,
    content_html: contentHtml,
    content_text: contentText,
    source: 'theguardian.com',
    word_count: wordCount,
  };
}

function countWords(text: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}
