export function countSyllables(word: string): number {
  word = word.toLowerCase().trim();
  if (word.length <= 3) return 1;

  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');

  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
}

export function getTextStatistics(text: string) {
  if (!text.trim()) {
    return {
      words: 0,
      sentences: 0,
      syllables: 0,
      characters: 0,
      paragraphs: 0
    };
  }

  const words = text.match(/\b[\w']+\b/g) || [];
  const sentences = text.match(/[.!?]+/g) || [];
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);

  const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0);
  const characters = text.replace(/\s/g, '').length;

  return {
    words: words.length,
    sentences: Math.max(sentences.length, 1),
    syllables,
    characters,
    paragraphs: paragraphs.length || 1
  };
}
