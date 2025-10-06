
import React from 'react';
import { AnalysisType } from '../types';
import { VideoPlayer } from './VideoPlayer';
import { AnalysisResult } from './AnalysisResult';

interface AnalysisPanelProps {
  videoId: string;
  onAnalyzeAction: (type: AnalysisType) => void;
  isLoading: boolean;
  result: string;
  currentAnalysisType: AnalysisType | null;
  onClear: () => void;
}

const AnalysisButton: React.FC<{
  type: AnalysisType;
  onClick: (type: AnalysisType) => void;
  currentType: AnalysisType | null;
  isLoading: boolean;
}> = ({ type, onClick, currentType, isLoading }) => {
  const isActive = currentType === type;
  return (
    <button
      onClick={() => onClick(type)}
      disabled={isLoading}
      className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
        isActive
          ? 'bg-brand-secondary text-white shadow-md'
          : 'bg-brand-surface hover:bg-white/10'
      }`}
    >
      {isLoading && isActive ? 'Analyzing...' : type}
    </button>
  );
};

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({
  videoId,
  onAnalyzeAction,
  isLoading,
  result,
  currentAnalysisType,
  onClear,
}) => {
  return (
    <div className="mt-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <VideoPlayer videoId={videoId} />
          <button
            onClick={onClear}
            className="mt-4 w-full text-center bg-red-500/20 text-red-300 hover:bg-red-500/40 font-semibold px-4 py-2 rounded-md transition-colors duration-300"
          >
            Analyze Another Video
          </button>
        </div>
        <div className="bg-brand-surface p-6 rounded-xl shadow-lg border border-white/10 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">AI Analysis</h2>
          </div>
          <div className="flex gap-2 mb-4 p-1 bg-brand-bg rounded-lg">
            {Object.values(AnalysisType).map((type) => (
              <AnalysisButton
                key={type}
                type={type}
                onClick={onAnalyzeAction}
                currentType={currentAnalysisType}
                isLoading={isLoading}
              />
            ))}
          </div>
          <AnalysisResult 
            result={result} 
            isLoading={isLoading}
            analysisType={currentAnalysisType} 
          />
        </div>
      </div>
    </div>
  );
};
