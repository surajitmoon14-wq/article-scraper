/**
 * Validates if a string is a valid URL and safe to scrape.
 * Blocks localhost and private IP ranges to prevent SSRF.
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    
    // Only allow HTTP and HTTPS
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return false;
    }

    const hostname = parsedUrl.hostname;

    // Block localhost and common private IP ranges
    const privateIpPatterns = [
      /^localhost$/i,
      /^127\./,
      /^10\./,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
      /^192\.168\./,
      /^0\./,
      /^169\.254\./,
      /^100\.(6[4-9]|[7-9][0-9]|1[0-1][0-9]|12[0-7])\./,
      /^198\.(1[8-9])\./,
      /^::1$/,
      /^fc00:/,
      /^fe80:/
    ];

    if (privateIpPatterns.some(pattern => pattern.test(hostname))) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
