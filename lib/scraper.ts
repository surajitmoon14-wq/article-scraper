import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import * as cheerio from 'cheerio';

export interface ScrapeResult {
  title: string;
  author: string | null;
  published_date: string | null;
  content_html: string;
  content_text: string;
  source: string;
  word_count: number;
}

export async function scrapeArticle(url: string): Promise<ScrapeResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch article: ${response.status} ${response.statusText}`
      );
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
      throw new Error('The provided URL does not point to a valid HTML document.');
    }

    const html = await response.text();
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (article) {
      const textContent = article.textContent ?? '';
      const resolvedTitle =
        article.title?.trim() ||
        dom.window.document.title?.trim() ||
        'Untitled';

      const contentHtml = cleanHtml(article.content ?? '');

      return {
        title: resolvedTitle,
        author: article.byline || null,
        published_date: extractDate(html),
        content_html: contentHtml,
        content_text: textContent.trim(),
        source: new URL(url).hostname,
        word_count: countWords(textContent),
      };
    }

    return scrapeWithCheerio(html, url);
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out after 15 seconds');
    }

    throw error;
  }
}

function countWords(text: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function extractDate(html: string): string | null {
  const $ = cheerio.load(html);

  const dateSelectors = [
    'meta[property="article:published_time"]',
    'meta[name="publish-date"]',
    'meta[name="pubdate"]',
    'meta[property="og:published_time"]',
    'time[datetime]',
  ];

  for (const selector of dateSelectors) {
    const el = $(selector);
    const dateStr = el.attr('content') || el.attr('datetime');

    if (dateStr) {
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString().split('T')[0];
      }
    }
  }

  return null;
}

function cleanHtml(html: string): string {
  const $ = cheerio.load(html);

  $('script, style, iframe, nav, footer, header, aside, form, button, input').remove();

  $('*').each((_, el) => {
    const $el = $(el);
    const attrs = $el.attr();

    if (attrs) {
      for (const attr of Object.keys(attrs)) {
        if (!['src', 'href', 'alt', 'title'].includes(attr)) {
          $el.removeAttr(attr);
        }
      }
    }
  });

  return $('body').html() || '';
}

function scrapeWithCheerio(html: string, url: string): ScrapeResult {
  const $ = cheerio.load(html);

  $('script, style, iframe, nav, footer, header, aside, form, button, input, .ads, #ads, .sidebar').remove();

  const resolvedTitle =
    $('title').text().trim() ||
    $('h1').first().text().trim() ||
    'Untitled';

  let bestElement: ReturnType<typeof $> | null = null;
  let maxParagraphs = 0;

  $('div, article, section').each((_, el) => {
    const $el = $(el);
    const pCount = $el.find('p').length;
    if (pCount > maxParagraphs) {
      maxParagraphs = pCount;
      bestElement = $el;
    }
  });

  const contentElement = bestElement ?? $('body');
  const contentHtml = cleanHtml(contentElement.html() || '');
  const contentText = contentElement.text().trim();

  return {
    title: resolvedTitle,
    author: $('meta[name="author"]').attr('content') || null,
    published_date: extractDate(html),
    content_html: contentHtml,
    content_text: contentText,
    source: new URL(url).hostname,
    word_count: countWords(contentText),
  };
}
