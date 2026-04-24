import React from 'react';

interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
  isHtmlMode: boolean;
  onModeToggle: () => void;
}

const InputArea: React.FC<InputAreaProps> = ({ value, onChange, isHtmlMode, onModeToggle }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <label className="text-lg font-semibold text-gray-700">
          {isHtmlMode ? 'HTML Input' : 'Text Input'}
        </label>
        <button
          onClick={onModeToggle}
          className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
        >
          Switch to {isHtmlMode ? 'Text' : 'HTML'} Mode
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={isHtmlMode ? 'Paste your HTML code here...' : 'Enter or paste your content here...'}
        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
      />
      <div className="mt-2 text-sm text-gray-500">
        {value.length} characters
      </div>
    </div>
  );
};

export default InputArea;
