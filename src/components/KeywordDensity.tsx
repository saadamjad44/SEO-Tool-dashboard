import React from 'react';
import { KeywordData } from '../types';

interface KeywordDensityProps {
  keywords: KeywordData[];
  totalWords: number;
}

const KeywordDensity: React.FC<KeywordDensityProps> = ({ keywords, totalWords }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'text-success';
      case 'high':
        return 'text-error';
      case 'low':
        return 'text-warning';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'bg-success/10 text-success';
      case 'high':
        return 'bg-error/10 text-error';
      case 'low':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  if (keywords.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Enter text to analyze keyword density
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="text-sm text-gray-600">Total Words</div>
        <div className="text-3xl font-bold text-primary">{totalWords}</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Keyword/Phrase</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Count</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Density</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((keyword, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{keyword.keyword}</td>
                <td className="py-3 px-4 text-center">{keyword.count}</td>
                <td className={`py-3 px-4 text-center font-semibold ${getStatusColor(keyword.status)}`}>
                  {keyword.density.toFixed(2)}%
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(keyword.status)}`}>
                    {keyword.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Guidelines:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li><span className="text-success font-medium">Optimal:</span> 0.5% - 3% density</li>
          <li><span className="text-error font-medium">High:</span> Above 3% (potential over-optimization)</li>
          <li><span className="text-warning font-medium">Low:</span> Below 0.5% for target keywords</li>
        </ul>
      </div>
    </div>
  );
};

export default KeywordDensity;
