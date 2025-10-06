
import React, { useState } from 'react';

interface UrlInputFormProps {
  onSubmit: (url: string) => void;
  initialUrl: string;
}

export const UrlInputForm: React.FC<UrlInputFormProps> = ({ onSubmit, initialUrl }) => {
  const [url, setUrl] = useState(initialUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url);
    }
  };
  
  return (
    <div className="bg-brand-surface p-6 rounded-xl shadow-lg border border-white/10 animate-fade-in">
        <p className="text-brand-text-secondary mb-4 text-center">
            Paste a YouTube link below to begin. The AI will analyze the video's content for you.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-grow bg-brand-bg border border-white/20 rounded-md px-4 py-3 text-brand-text-primary focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow duration-300"
            />
            <button
            type="submit"
            className="bg-brand-primary text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-blue-500 transition-colors duration-300"
            >
            Analyze Video
            </button>
        </form>
    </div>
  );
};
