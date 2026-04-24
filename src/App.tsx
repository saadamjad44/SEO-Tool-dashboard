import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import InputArea from './components/InputArea';
import TabNavigation from './components/TabNavigation';
import KeywordDensity from './components/KeywordDensity';
import MetaTagAnalyzer from './components/MetaTagAnalyzer';
import ReadabilityScore from './components/ReadabilityScore';
import WordCounter from './components/WordCounter';
import { TabType } from './types';
import { analyzeKeywords } from './utils/keywordAnalysis';
import { parseMetaTags } from './utils/metaTagParser';
import { calculateReadability } from './utils/readabilityCalculator';
import { getTextStatistics } from './utils/textStatistics';

function App() {
  const [text, setText] = useState('');
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('keyword');

  const keywords = useMemo(() => {
    if (!text.trim()) return [];
    const plainText = isHtmlMode ? text.replace(/<[^>]*>/g, ' ') : text;
    return analyzeKeywords(plainText);
  }, [text, isHtmlMode]);

  const metaTags = useMemo(() => {
    if (!isHtmlMode || !text.trim()) return [];
    return parseMetaTags(text);
  }, [text, isHtmlMode]);

  const readability = useMemo(() => {
    if (!text.trim()) return {
      fleschReadingEase: 0,
      fleschKincaidGrade: 0,
      averageSentenceLength: 0,
      averageWordLength: 0,
      complexWordsPercentage: 0,
      interpretation: 'No text to analyze',
      gradeLevel: 'N/A'
    };
    const plainText = isHtmlMode ? text.replace(/<[^>]*>/g, ' ') : text;
    return calculateReadability(plainText);
  }, [text, isHtmlMode]);

  const statistics = useMemo(() => {
    if (!text.trim()) return {
      wordCount: 0,
      characterCount: 0,
      characterCountNoSpaces: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      averageWordsPerSentence: 0,
      averageCharsPerWord: 0,
      readingTime: 0,
      speakingTime: 0
    };

    const plainText = isHtmlMode ? text.replace(/<[^>]*>/g, ' ') : text;
    const stats = getTextStatistics(plainText);

    const wordCount = stats.words;
    const characterCount = plainText.length;
    const characterCountNoSpaces = plainText.replace(/\s/g, '').length;
    const sentenceCount = stats.sentences;
    const paragraphCount = stats.paragraphs;
    const averageWordsPerSentence = Math.round((wordCount / sentenceCount) * 10) / 10;
    const averageCharsPerWord = Math.round((stats.characters / wordCount) * 10) / 10;
    const readingTime = Math.ceil(wordCount / 225);
    const speakingTime = Math.ceil(wordCount / 140);

    return {
      wordCount,
      characterCount,
      characterCountNoSpaces,
      sentenceCount,
      paragraphCount,
      averageWordsPerSentence,
      averageCharsPerWord,
      readingTime,
      speakingTime
    };
  }, [text, isHtmlMode]);

  const totalWords = useMemo(() => {
    const plainText = isHtmlMode ? text.replace(/<[^>]*>/g, ' ') : text;
    const words = plainText.match(/\b[\w']+\b/g);
    return words ? words.length : 0;
  }, [text, isHtmlMode]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <InputArea
          value={text}
          onChange={setText}
          isHtmlMode={isHtmlMode}
          onModeToggle={() => setIsHtmlMode(!isHtmlMode)}
        />

        <div className="bg-white rounded-lg shadow-lg p-6">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'keyword' && (
            <KeywordDensity keywords={keywords} totalWords={totalWords} />
          )}

          {activeTab === 'meta' && (
            <MetaTagAnalyzer metaTags={metaTags} />
          )}

          {activeTab === 'readability' && (
            <ReadabilityScore metrics={readability} />
          )}

          {activeTab === 'counter' && (
            <WordCounter stats={statistics} />
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          SEO Tools Dashboard - All analysis happens in your browser. No data is sent to any server.
        </div>
      </footer>
    </div>
  );
}

export default App;
