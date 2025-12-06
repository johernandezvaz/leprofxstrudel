'use client';

import { Play, Square } from 'lucide-react';

interface TransportPanelProps {
  isPlaying: boolean;
  isReady: boolean;
  statusMessage: string;
  lastError: string | null;
  onPlay: () => void;
  onStop: () => void;
}

export function TransportPanel({
  isPlaying,
  isReady,
  statusMessage,
  lastError,
  onPlay,
  onStop,
}: TransportPanelProps) {
  return (
    <div
      className={`h-full bg-[#14121b] border-l border-[#262334] flex flex-col transition-all duration-300 ${
        isPlaying ? 'shadow-[0_0_30px_rgba(163,135,97,0.15)]' : ''
      }`}
    >
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-[#a38761] mb-1">Transport</h3>
          <div className="h-px bg-gradient-to-r from-transparent via-[#a38761] to-transparent opacity-30"></div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onPlay}
            className="w-full py-4 bg-[#a38761] hover:bg-[#b89771] text-[#1a1823] font-bold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(163,135,97,0.4)] flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" fill="currentColor" />
            {isPlaying ? 'Re-Run' : 'Play'}
          </button>

          <button
            onClick={onStop}
            className="w-full py-4 bg-transparent border-2 border-[#a38761] text-[#a38761] hover:bg-[#a38761] hover:text-[#1a1823] font-bold rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Square className="w-5 h-5" fill="currentColor" />
            Stop
          </button>
        </div>

        <div className="space-y-2 pt-4 border-t border-[#262334]">
          <h4 className="text-xs font-semibold text-[#b7b7c5] uppercase tracking-wide">Status Log</h4>
          <div className="bg-[#0f0e14] rounded-lg p-3 min-h-[120px] max-h-[240px] overflow-y-auto">
            <div className="space-y-1">
              <p className={`text-sm font-mono ${lastError ? 'text-[#ff6b6b]' : 'text-[#a38761]'}`}>
                {lastError ? `❌ ${lastError}` : `✓ ${statusMessage}`}
              </p>
              {isReady && (
                <p className="text-xs text-[#b7b7c5]">
                  • Engine: <span className="text-[#6dd46f]">Ready</span>
                </p>
              )}
              {isPlaying && (
                <p className="text-xs text-[#b7b7c5]">
                  • Status: <span className="text-[#a38761] animate-pulse">Playing</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
