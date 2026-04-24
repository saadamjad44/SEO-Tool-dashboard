export interface KeywordData {
  keyword: string;
  count: number;
  density: number;
  status: 'optimal' | 'high' | 'low';
}

export interface MetaTag {
  name: string;
  content: string;
  status: 'pass' | 'warning' | 'fail';
  message?: string;
}

export interface ReadabilityMetrics {
  fleschReadingEase: number;
  fleschKincaidGrade: number;
  averageSentenceLength: number;
  averageWordLength: number;
  complexWordsPercentage: number;
  interpretation: string;
  gradeLevel: string;
}

export interface TextStatistics {
  wordCount: number;
  characterCount: number;
  characterCountNoSpaces: number;
  sentenceCount: number;
  paragraphCount: number;
  averageWordsPerSentence: number;
  averageCharsPerWord: number;
  readingTime: number;
  speakingTime: number;
}

export type TabType = 'keyword' | 'meta' | 'readability' | 'counter';
