import { KeywordData } from '../types';
import { stopWords } from './stopWords';

export function analyzeKeywords(text: string, targetKeywords: string[] = []): KeywordData[] {
  if (!text.trim()) return [];

  const words = text.toLowerCase().match(/\b[\w']+\b/g) || [];
  const totalWords = words.length;

  const keywordMap = new Map<string, number>();

  // Single words
  words.forEach(word => {
    if (!stopWords.has(word) && word.length > 2) {
      keywordMap.set(word, (keywordMap.get(word) || 0) + 1);
    }
  });

  // 2-word phrases
  for (let i = 0; i < words.length - 1; i++) {
    const phrase = `${words[i]} ${words[i + 1]}`;
    keywordMap.set(phrase, (keywordMap.get(phrase) || 0) + 1);
  }

  // 3-word phrases
  for (let i = 0; i < words.length - 2; i++) {
    const phrase = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
    keywordMap.set(phrase, (keywordMap.get(phrase) || 0) + 1);
  }

  // 4-word phrases
  for (let i = 0; i < words.length - 3; i++) {
    const phrase = `${words[i]} ${words[i + 1]} ${words[i + 2]} ${words[i + 3]}`;
    keywordMap.set(phrase, (keywordMap.get(phrase) || 0) + 1);
  }

  const results: KeywordData[] = [];

  keywordMap.forEach((count, keyword) => {
    if (count > 1) {
      const density = (count / totalWords) * 100;
      let status: 'optimal' | 'high' | 'low' = 'optimal';

      if (density > 3) status = 'high';
      else if (density < 0.5 && targetKeywords.includes(keyword)) status = 'low';

      results.push({ keyword, count, density, status });
    }
  });

  return results.sort((a, b) => b.count - a.count).slice(0, 20);
}
