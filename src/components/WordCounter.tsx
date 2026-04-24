import React from 'react';
import { TextStatistics } from '../types';

interface WordCounterProps {
  stats: TextStatistics;
}

const WordCounter: React.FC<WordCounterProps> = ({ stats }) => {
  if (stats.wordCount === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Enter text to see statistics
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Words</div>
          <div className="text-3xl font-bold text-primary">{stats.wordCount}</div>
        </div>

        <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Characters</div>
          <div className="text-3xl font-bold text-success">{stats.characterCount}</div>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Sentences</div>
          <div className="text-3xl font-bold text-purple-600">{stats.sentenceCount}</div>
        </div>

        <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Paragraphs</div>
          <div className="text-3xl font-bold text-warning">{stats.paragraphCount}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-600">Characters (no spaces)</div>
          <div className="text-2xl font-bold text-gray-800">{stats.characterCountNoSpaces}</div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-600">Avg. Words per Sentence</div>
          <div className="text-2xl font-bold text-gray-800">{stats.averageWordsPerSentence}</div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-600">Avg. Characters per Word</div>
          <div className="text-2xl font-bold text-gray-800">{stats.averageCharsPerWord}</div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-600">Reading Time</div>
          <div className="text-2xl font-bold text-gray-800">{stats.readingTime} min</div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-3">Estimated Time:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Reading (200-250 wpm):</span>
            <span className="font-semibold text-gray-800">{stats.readingTime} minutes</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Speaking (130-150 wpm):</span>
            <span className="font-semibold text-gray-800">{stats.speakingTime} minutes</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Content Length Guidelines:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Blog post: 1,500-2,500 words</li>
          <li>• Social media post: 40-80 words</li>
          <li>• Meta description: 150-160 characters</li>
          <li>• Tweet: 280 characters max</li>
        </ul>
      </div>
    </div>
  );
};

export default WordCounter;
