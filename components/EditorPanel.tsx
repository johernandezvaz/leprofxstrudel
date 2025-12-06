'use client';

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

interface EditorPanelProps {
  code: string;
  onStatusUpdate?: (message: string) => void;
  onError?: (error: string | null) => void;
}

export interface EditorPanelRef {
  evaluate: () => Promise<void>;
  stop: () => void;
  getCode: () => string;
}

export const EditorPanel = forwardRef<EditorPanelRef, EditorPanelProps>(
  function EditorPanel({ code, onStatusUpdate, onError }, ref) {
    const editorContainerRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<any>(null);
    const isInitializedRef = useRef(false);

    useImperativeHandle(ref, () => ({
      evaluate: async () => {
        if (editorRef.current) {
          try {
            onStatusUpdate?.('Evaluating code...');
            onError?.(null);
            await editorRef.current.evaluate();
            onStatusUpdate?.('Playing...');
          } catch (error: any) {
            onError?.(error.message || 'Evaluation error');
            onStatusUpdate?.('Error evaluating code');
            throw error;
          }
        }
      },
      stop: () => {
        if (editorRef.current) {
          editorRef.current.stop();
          onStatusUpdate?.('Stopped');
          onError?.(null);
        }
      },
      getCode: () => {
        return editorRef.current?.code || code;
      },
    }));

    useEffect(() => {
      if (!editorContainerRef.current || isInitializedRef.current) {
        return;
      }

      const initEditor = async () => {
        try {
          const { StrudelMirror } = await import('@strudel/codemirror');
          const { getAudioContext } = await import('@strudel/webaudio');
          const { transpiler } = await import('@strudel/transpiler');
          const { prebakeStrudel } = await import('@/lib/strudel-setup');

          if (!editorContainerRef.current) return;

          const editor = new StrudelMirror({
            root: editorContainerRef.current,
            defaultOutput: 'webaudio',
            initialCode: code,
            pattern: '',
            transpiler,
            getTime: () => getAudioContext().currentTime,
            drawTime: [-2, 2],
            prebake: prebakeStrudel,
            afterEval: (info: any) => {
              if (info.error) {
                onError?.(info.error.message || 'Evaluation error');
                onStatusUpdate?.('Error');
              } else {
                onError?.(null);
                onStatusUpdate?.('Playing...');
              }
            },
          });

          editorRef.current = editor;
          isInitializedRef.current = true;

          editor.setTheme('material-darker');

          console.log('[EditorPanel] StrudelMirror initialized');
        } catch (error) {
          console.error('[EditorPanel] Error initializing StrudelMirror:', error);
          onError?.('Failed to initialize editor');
        }
      };

      initEditor();

      return () => {
        if (editorRef.current) {
          try {
            editorRef.current.stop();
          } catch (e) {
            console.error('Error cleaning up editor:', e);
          }
        }
      };
    }, []);

    return (
      <div className="flex flex-col h-full">
        <div
          ref={editorContainerRef}
          className="flex-1 bg-[#1a1823] overflow-auto"
          style={{
            minHeight: '400px',
          }}
        />

        <div className="px-4 py-2 bg-[#0f0e14] border-t border-[#262334]">
          <p className="text-xs text-[#b7b7c5]">
            <kbd className="px-2 py-0.5 bg-[#262334] rounded text-[#a38761]">Ctrl+Enter</kbd> or{' '}
            <kbd className="px-2 py-0.5 bg-[#262334] rounded text-[#a38761]">Cmd+Enter</kbd> to run code
          </p>
        </div>
      </div>
    );
  }
);
