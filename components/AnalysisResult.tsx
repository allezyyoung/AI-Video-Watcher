
import React from 'react';
import { AnalysisType } from '../types';

interface AnalysisResultProps {
  result: string;
  isLoading: boolean;
  analysisType: AnalysisType | null;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
  </div>
);

const EmptyState: React.FC = () => (
    <div className="flex flex-col justify-center items-center h-full text-center text-brand-text-secondary p-4">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <p>Select an analysis type above to get started.</p>
    </div>
);


// A simple markdown-like parser for the result
const FormattedResult: React.FC<{ text: string }> = ({ text }) => {
    const lines = text.split('\n');
    return (
        <div className="space-y-2 text-brand-text-primary">
            {lines.map((line, index) => {
                line = line.trim();
                if (line.startsWith('* ')) {
                    return <p key={index} className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-brand-primary">{line.substring(2)}</p>;
                }
                if (/^\d{1,2}:\d{2}\s*-\s*/.test(line)) {
                    const parts = line.split(' - ');
                    return <p key={index}><span className="font-mono text-brand-secondary">{parts[0]}</span> - {parts.slice(1).join(' - ')}</p>;
                }
                if (line.length === 0) {
                     return <br key={index} />;
                }
                return <p key={index}>{line}</p>;
            })}
        </div>
    );
};

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, isLoading, analysisType }) => {
  return (
    <div className="flex-grow bg-brand-bg p-4 rounded-lg overflow-y-auto min-h-[200px] max-h-[400px]">
      {isLoading ? (
        <LoadingSpinner />
      ) : result ? (
        <div className="animate-fade-in">
          <FormattedResult text={result} />
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};
