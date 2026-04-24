import { ReadabilityMetrics } from '../types';
import { getTextStatistics } from './textStatistics';

export function calculateReadability(text: string): ReadabilityMetrics {
  if (!text.trim()) {
    return {
      fleschReadingEase: 0,
      fleschKincaidGrade: 0,
      averageSentenceLength: 0,
      averageWordLength: 0,
      complexWordsPercentage: 0,
      interpretation: 'No text to analyze',
      gradeLevel: 'N/A'
    };
  }

  const stats = getTextStatistics(text);
  const { words, sentences, syllables, characters } = stats;

  // Flesch Reading Ease: 206.835 - 1.015 × (words/sentences) - 84.6 × (syllables/words)
  const fleschReadingEase = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);

  // Flesch-Kincaid Grade Level: 0.39 × (words/sentences) + 11.8 × (syllables/words) - 15.59
  const fleschKincaidGrade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;

  const averageSentenceLength = words / sentences;
  const averageWordLength = characters / words;

  // Complex words: 3+ syllables
  const wordList = text.match(/\b[\w']+\b/g) || [];
  const complexWords = wordList.filter(word => {
    const syllableCount = countSyllables(word);
    return syllableCount >= 3;
  }).length;
  const complexWordsPercentage = (complexWords / words) * 100;

  let interpretation = '';
  let gradeLevel = '';

  const score = Math.max(0, Math.min(100, fleschReadingEase));

  if (score >= 90) {
    interpretation = 'Very Easy';
    gradeLevel = '5th grade';
  } else if (score >= 80) {
    interpretation = 'Easy';
    gradeLevel = '6th grade';
  } else if (score >= 70) {
    interpretation = 'Fairly Easy';
    gradeLevel = '7th grade';
  } else if (score >= 60) {
    interpretation = 'Standard';
    gradeLevel = '8th-9th grade';
  } else if (score >= 50) {
    interpretation = 'Fairly Difficult';
    gradeLevel = '10th-12th grade';
  } else if (score >= 30) {
    interpretation = 'Difficult';
    gradeLevel = 'College';
  } else {
    interpretation = 'Very Difficult';
    gradeLevel = 'College graduate';
  }

  return {
    fleschReadingEase: Math.round(score * 10) / 10,
    fleschKincaidGrade: Math.max(0, Math.round(fleschKincaidGrade * 10) / 10),
    averageSentenceLength: Math.round(averageSentenceLength * 10) / 10,
    averageWordLength: Math.round(averageWordLength * 10) / 10,
    complexWordsPercentage: Math.round(complexWordsPercentage * 10) / 10,
    interpretation,
    gradeLevel
  };
}

function countSyllables(word: string): number {
  word = word.toLowerCase().trim();
  if (word.length <= 3) return 1;

  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');

  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
}
