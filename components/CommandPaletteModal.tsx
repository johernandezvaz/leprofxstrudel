'use client';

import { useEffect } from 'react';
import { Play, Square, X } from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunCode: () => void;
  onStop: () => void;
}

export function CommandPaletteModal({
  isOpen,
  onClose,
  onRunCode,
  onStop,
}: CommandPaletteModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    {
      icon: Play,
      label: 'Run code',
      shortcut: 'Ctrl+Enter',
      action: () => {
        onRunCode();
        onClose();
      },
    },
    {
      icon: Square,
      label: 'Stop',
      shortcut: 'Ctrl+.',
      action: () => {
        onStop();
        onClose();
      },
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
      onClick={onClose}
    >
      <div
        className="bg-[#14121b] border border-[#a38761] rounded-lg shadow-[0_0_50px_rgba(163,135,97,0.3)] w-full max-w-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-[#0f0e14] border-b border-[#262334]">
          <h3 className="text-lg font-semibold text-[#a38761]">Command Palette</h3>
          <button
            onClick={onClose}
            className="text-[#b7b7c5] hover:text-[#a38761] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-2">
          {commands.map((command, index) => (
            <button
              key={index}
              onClick={command.action}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#262334] rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3">
                <command.icon className="w-5 h-5 text-[#a38761]" />
                <span className="text-[#f4f4f7] group-hover:text-[#a38761] transition-colors">
                  {command.label}
                </span>
              </div>
              {command.shortcut && (
                <kbd className="px-2 py-1 bg-[#0f0e14] border border-[#262334] rounded text-xs text-[#b7b7c5] font-mono">
                  {command.shortcut}
                </kbd>
              )}
            </button>
          ))}
        </div>

        <div className="px-4 py-2 bg-[#0f0e14] border-t border-[#262334]">
          <p className="text-xs text-[#6b6a7a]">
            Press <kbd className="px-1 py-0.5 bg-[#262334] rounded text-[#a38761]">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}
