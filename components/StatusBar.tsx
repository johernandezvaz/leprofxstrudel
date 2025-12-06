'use client';

import { ExternalLink } from 'lucide-react';

interface StatusBarProps {
  isReady: boolean;
  isPlaying: boolean;
}

export function StatusBar({ isReady, isPlaying }: StatusBarProps) {
  return (
    <div className="h-full bg-[#14121b] border-t border-[#262334] px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold text-[#a38761] uppercase tracking-wide">
            Quick Reference
          </h4>
          <a
            href="https://strudel.cc/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#a38761] hover:text-[#b89771] transition-colors hover:underline"
          >
            <span>Learn Strudel: Official Documentation</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h5 className="text-[#b7b7c5] font-medium mb-2">Keyboard Shortcuts</h5>
            <ul className="space-y-1 text-xs text-[#6b6a7a]">
              <li>
                <kbd className="px-1.5 py-0.5 bg-[#262334] rounded text-[#a38761] font-mono">Ctrl+Enter</kbd> /{' '}
                <kbd className="px-1.5 py-0.5 bg-[#262334] rounded text-[#a38761] font-mono">Cmd+Enter</kbd> - Run code
              </li>
              <li>
                <kbd className="px-1.5 py-0.5 bg-[#262334] rounded text-[#a38761] font-mono">Ctrl+.</kbd> /{' '}
                <kbd className="px-1.5 py-0.5 bg-[#262334] rounded text-[#a38761] font-mono">Cmd+.</kbd> - Stop
              </li>
              <li>
                <kbd className="px-1.5 py-0.5 bg-[#262334] rounded text-[#a38761] font-mono">Ctrl+Shift+P</kbd> /{' '}
                <kbd className="px-1.5 py-0.5 bg-[#262334] rounded text-[#a38761] font-mono">Cmd+Shift+P</kbd> - Command Palette
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-[#b7b7c5] font-medium mb-2">Strudel Basics</h5>
            <ul className="space-y-1 text-xs text-[#6b6a7a]">
              <li><code className="text-[#a38761]">sound("bd")</code> - Play bass drum</li>
              <li><code className="text-[#a38761]">.fast(2)</code> - Double speed</li>
              <li><code className="text-[#a38761]">.slow(2)</code> - Half speed</li>
              <li><code className="text-[#a38761]">.stack(...)</code> - Layer patterns</li>
            </ul>
          </div>
          <div>
            <h5 className="text-[#b7b7c5] font-medium mb-2">Pattern Functions</h5>
            <ul className="space-y-1 text-xs text-[#6b6a7a]">
              <li><code className="text-[#a38761]">.rev()</code> - Reverse pattern</li>
              <li><code className="text-[#a38761]">.echo()</code> - Add echo effect</li>
              <li><code className="text-[#a38761]">.gain()</code> - Adjust volume</li>
              <li><code className="text-[#a38761]">.vowel()</code> - Filter by vowel</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
