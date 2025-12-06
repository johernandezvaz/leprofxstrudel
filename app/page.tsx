'use client';

import { useState, useEffect, useRef } from 'react';
import { EditorPanel, type EditorPanelRef } from '@/components/EditorPanel';
import { TransportPanel } from '@/components/TransportPanel';
import { StatusBar } from '@/components/StatusBar';
import { CommandPaletteModal } from '@/components/CommandPaletteModal';
import { defaultCode } from '@/lib/snippets';
import { preloadStrudel, isStrudelReady } from '@/lib/strudel-setup';

export default function Home() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Loading Strudel engine...');
  const [lastError, setLastError] = useState<string | null>(null);
  const editorRef = useRef<EditorPanelRef>(null);

  useEffect(() => {
    preloadStrudel();

    const checkReady = setInterval(() => {
      if (isStrudelReady()) {
        setIsReady(true);
        setStatusMessage('Ready to play');
        clearInterval(checkReady);
      }
    }, 100);

    return () => clearInterval(checkReady);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '.') {
        e.preventDefault();
        handleStop();
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleRun = async () => {
    if (!isReady) {
      setLastError('Strudel engine not ready yet, please wait...');
      return;
    }

    try {
      setIsPlaying(true);
      await editorRef.current?.evaluate();
    } catch (error: any) {
      setIsPlaying(false);
      console.error('Error running code:', error);
    }
  };

  const handleStop = () => {
    editorRef.current?.stop();
    setIsPlaying(false);
  };

  const handleStatusUpdate = (message: string) => {
    setStatusMessage(message);
    if (message === 'Playing...') {
      setIsPlaying(true);
    } else if (message === 'Stopped') {
      setIsPlaying(false);
    }
  };

  const handleError = (error: string | null) => {
    setLastError(error);
    if (error) {
      setIsPlaying(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-[#1a1823] via-[#1a1823] to-[#241f2e] text-[#f4f4f7]">
      <header className="flex-shrink-0 bg-[#1a1823]/90 backdrop-blur-sm border-b border-[#262334] sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#a38761] to-[#c9a775] bg-clip-text text-transparent">
              Le Prof Strudel Lab
            </h1>
            <span className="px-3 py-1 bg-[#a38761]/10 border border-[#a38761]/30 rounded-full text-xs font-medium text-[#a38761]">
              Live Coding IDE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#14121b] border border-[#262334] rounded-lg">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isPlaying
                    ? 'bg-[#a38761] animate-pulse shadow-[0_0_8px_rgba(163,135,97,0.8)]'
                    : isReady
                    ? 'bg-[#6dd46f]'
                    : 'bg-[#6b6a7a]'
                }`}
              />
              <span className="text-sm text-[#b7b7c5]">
                {isPlaying ? 'Playing…' : isReady ? 'Ready' : 'Audio Idle'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex min-h-0">
        <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          <div className="flex-1 min-h-0">
            <EditorPanel
              ref={editorRef}
              code={defaultCode}
              onStatusUpdate={handleStatusUpdate}
              onError={handleError}
            />
          </div>

          <div className="w-full lg:w-80 flex-shrink-0">
            <TransportPanel
              isPlaying={isPlaying}
              isReady={isReady}
              statusMessage={statusMessage}
              lastError={lastError}
              onPlay={handleRun}
              onStop={handleStop}
            />
          </div>
        </div>
      </main>

      <footer className="flex-shrink-0 h-32">
        <StatusBar isReady={isReady} isPlaying={isPlaying} />
      </footer>

      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onRunCode={handleRun}
        onStop={handleStop}
      />
    </div>
  );
}
