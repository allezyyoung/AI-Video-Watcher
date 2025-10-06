
import React, { useState, useCallback } from 'react';
import { analyzeVideoContent } from './services/geminiService';
import { UrlInputForm } from './components/UrlInputForm';
import { AnalysisPanel } from './components/AnalysisPanel';
import { AnalysisType } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [currentAnalysisType, setCurrentAnalysisType] = useState<AnalysisType | null>(null);
  const [error, setError] = useState('');

  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
    return null;
  };

  const handleUrlSubmit = (url: string) => {
    setError('');
    setAnalysisResult('');
    setVideoId(null);
    setCurrentAnalysisType(null);

    const id = getYouTubeVideoId(url);
    if (id) {
      setYoutubeUrl(url);
      setVideoId(id);
    } else {
      setError('Invalid YouTube URL. Please enter a valid link.');
    }
  };
  
  const handleAnalysisRequest = useCallback(async (type: AnalysisType) => {
    if (!youtubeUrl) {
      setError('Please enter a YouTube URL first.');
      return;
    }

    setIsLoading(true);
    setAnalysisResult('');
    setError('');
    setCurrentAnalysisType(type);

    try {
      const result = await analyzeVideoContent(youtubeUrl, type);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setAnalysisResult('');
    } finally {
      setIsLoading(false);
    }
  }, [youtubeUrl]);

  const handleClear = () => {
    setYoutubeUrl('');
    setVideoId(null);
    setIsLoading(false);
    setAnalysisResult('');
    setCurrentAnalysisType(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 w-full">
        <div className="w-full max-w-4xl mx-auto">
          <UrlInputForm onSubmit={handleUrlSubmit} initialUrl={youtubeUrl} />
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg animate-fade-in">
              <p>{error}</p>
            </div>
          )}
          {videoId && (
            <AnalysisPanel
              videoId={videoId}
              onAnalyzeAction={handleAnalysisRequest}
              isLoading={isLoading}
              result={analysisResult}
              currentAnalysisType={currentAnalysisType}
              onClear={handleClear}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
