import React from 'react';
import { ReadabilityMetrics } from '../types';

interface ReadabilityScoreProps {
  metrics: ReadabilityMetrics;
}

const ReadabilityScore: React.FC<ReadabilityScoreProps> = ({ metrics }) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-error';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 70) return 'bg-success';
    if (score >= 50) return 'bg-warning';
    return 'bg-error';
  };

  if (metrics.fleschReadingEase === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Enter text to analyze readability
      </div>
    );
  }

  const score = metrics.fleschReadingEase;

  return (
    <div>
      <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">Flesch Reading Ease Score</div>
          <div className={`text-6xl font-bold mb-2 ${getScoreColor(score)}`}>
            {score.toFixed(1)}
          </div>
          <div className="text-xl font-semibold text-gray-700 mb-1">{metrics.interpretation}</div>
          <div className="text-sm text-gray-600">{metrics.gradeLevel}</div>
        </div>

        <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getScoreBackground(score)} transition-all duration-500`}
            style={{ width: `${Math.min(100, score)}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-600">Flesch-Kincaid Grade</div>
          <div className="text-2xl font-bold text-gray-800">{metrics.fleschKincaidGrade}</div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-600">Avg. Sentence Length</div>
          <div className="text-2xl font-bold text-gray-800">{metrics.averageSentenceLength} words</div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-600">Avg. Word Length</div>
          <div className="text-2xl font-bold text-gray-800">{metrics.averageWordLength} chars</div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-600">Complex Words</div>
          <div className="text-2xl font-bold text-gray-800">{metrics.complexWordsPercentage}%</div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Recommendations:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          {metrics.averageSentenceLength > 25 && (
            <li>• Try shortening sentences (current avg: {metrics.averageSentenceLength} words)</li>
          )}
          {metrics.complexWordsPercentage > 20 && (
            <li>• Reduce complex words ({metrics.complexWordsPercentage}% of content)</li>
          )}
          {score < 60 && (
            <li>• Aim for a score of 60+ for better readability</li>
          )}
          {score >= 60 && score < 70 && (
            <li>• Good readability! Consider simplifying further for wider audience</li>
          )}
          {score >= 70 && (
            <li>• Excellent readability! Your content is easy to understand</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ReadabilityScore;
