import React from 'react';
import { MetaTag } from '../types';

interface MetaTagAnalyzerProps {
  metaTags: MetaTag[];
}

const MetaTagAnalyzer: React.FC<MetaTagAnalyzerProps> = ({ metaTags }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return '✓';
      case 'warning':
        return '⚠';
      case 'fail':
        return '✗';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-success/10 border-success text-success';
      case 'warning':
        return 'bg-warning/10 border-warning text-warning';
      case 'fail':
        return 'bg-error/10 border-error text-error';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-600';
    }
  };

  if (metaTags.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Switch to HTML mode and paste your HTML to analyze meta tags
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {metaTags.map((tag, index) => (
        <div key={index} className={`p-4 border-2 rounded-lg ${getStatusColor(tag.status)}`}>
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-800">{tag.name}</h3>
            <span className="text-2xl">{getStatusIcon(tag.status)}</span>
          </div>

          {tag.content && (
            <div className="mb-2 p-3 bg-white rounded border border-gray-200">
              <p className="text-sm text-gray-700 break-words">{tag.content}</p>
            </div>
          )}

          {tag.message && (
            <p className="text-sm font-medium">{tag.message}</p>
          )}
        </div>
      ))}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Best Practices:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Title: 50-60 characters for optimal display in search results</li>
          <li>• Meta Description: 150-160 characters to avoid truncation</li>
          <li>• Include Open Graph tags for better social media sharing</li>
          <li>• Add Twitter Card tags for Twitter previews</li>
          <li>• Use canonical URLs to avoid duplicate content issues</li>
        </ul>
      </div>
    </div>
  );
};

export default MetaTagAnalyzer;
