import { MetaTag } from '../types';

export function parseMetaTags(html: string): MetaTag[] {
  const results: MetaTag[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Title tag
  const title = doc.querySelector('title');
  if (title) {
    const length = title.textContent?.length || 0;
    let status: 'pass' | 'warning' | 'fail' = 'pass';
    let message = `${length} characters`;

    if (length < 30) {
      status = 'fail';
      message = `Too short (${length} chars). Recommended: 50-60 characters.`;
    } else if (length > 70) {
      status = 'warning';
      message = `Too long (${length} chars). Recommended: 50-60 characters.`;
    } else if (length >= 50 && length <= 60) {
      message = `Optimal length (${length} chars)`;
    }

    results.push({
      name: 'Title Tag',
      content: title.textContent || '',
      status,
      message
    });
  } else {
    results.push({
      name: 'Title Tag',
      content: '',
      status: 'fail',
      message: 'Missing title tag'
    });
  }

  // Meta description
  const description = doc.querySelector('meta[name="description"]');
  if (description) {
    const content = description.getAttribute('content') || '';
    const length = content.length;
    let status: 'pass' | 'warning' | 'fail' = 'pass';
    let message = `${length} characters`;

    if (length < 120) {
      status = 'fail';
      message = `Too short (${length} chars). Recommended: 150-160 characters.`;
    } else if (length > 170) {
      status = 'warning';
      message = `Too long (${length} chars). Recommended: 150-160 characters.`;
    } else if (length >= 150 && length <= 160) {
      message = `Optimal length (${length} chars)`;
    }

    results.push({
      name: 'Meta Description',
      content,
      status,
      message
    });
  } else {
    results.push({
      name: 'Meta Description',
      content: '',
      status: 'fail',
      message: 'Missing meta description'
    });
  }

  // Open Graph tags
  const ogTitle = doc.querySelector('meta[property="og:title"]');
  results.push({
    name: 'OG Title',
    content: ogTitle?.getAttribute('content') || '',
    status: ogTitle ? 'pass' : 'warning',
    message: ogTitle ? 'Present' : 'Missing Open Graph title'
  });

  const ogDescription = doc.querySelector('meta[property="og:description"]');
  results.push({
    name: 'OG Description',
    content: ogDescription?.getAttribute('content') || '',
    status: ogDescription ? 'pass' : 'warning',
    message: ogDescription ? 'Present' : 'Missing Open Graph description'
  });

  const ogImage = doc.querySelector('meta[property="og:image"]');
  results.push({
    name: 'OG Image',
    content: ogImage?.getAttribute('content') || '',
    status: ogImage ? 'pass' : 'warning',
    message: ogImage ? 'Present' : 'Missing Open Graph image'
  });

  // Twitter Card
  const twitterCard = doc.querySelector('meta[name="twitter:card"]');
  results.push({
    name: 'Twitter Card',
    content: twitterCard?.getAttribute('content') || '',
    status: twitterCard ? 'pass' : 'warning',
    message: twitterCard ? 'Present' : 'Missing Twitter Card'
  });

  // Canonical URL
  const canonical = doc.querySelector('link[rel="canonical"]');
  results.push({
    name: 'Canonical URL',
    content: canonical?.getAttribute('href') || '',
    status: canonical ? 'pass' : 'warning',
    message: canonical ? 'Present' : 'Missing canonical URL'
  });

  // Viewport
  const viewport = doc.querySelector('meta[name="viewport"]');
  results.push({
    name: 'Viewport',
    content: viewport?.getAttribute('content') || '',
    status: viewport ? 'pass' : 'fail',
    message: viewport ? 'Present' : 'Missing viewport meta tag'
  });

  return results;
}
