
import React from 'react';

const VideoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

export const Header: React.FC = () => {
    return (
        <header className="w-full p-4 bg-brand-surface/50 border-b border-brand-primary/20 backdrop-blur-sm sticky top-0 z-10">
            <div className="max-w-4xl mx-auto flex items-center gap-3">
                <VideoIcon />
                <h1 className="text-2xl font-bold text-brand-text-primary tracking-tight">
                    AI Video Watcher
                </h1>
            </div>
        </header>
    );
};
