/**
 * Validates if a URL is a valid Guardian article URL.
 */
export function isValidGuardianUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname === 'www.theguardian.com';
  } catch {
    return false;
  }
}

/**
 * Extracts the article ID from a Guardian URL.
 * Example: https://www.theguardian.com/sport/2023/dec/01/example-article
 * Returns: sport/2023/dec/01/example-article
 */
export function extractArticleId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname !== 'www.theguardian.com') {
      return null;
    }

    const path = parsedUrl.pathname;
    if (!path || path === '/') {
      return null;
    }

    const articleId = path.startsWith('/') ? path.slice(1) : path;

    if (!articleId || articleId.split('/').length < 2) {
      return null;
    }

    return articleId;
  } catch {
    return null;
  }
}
