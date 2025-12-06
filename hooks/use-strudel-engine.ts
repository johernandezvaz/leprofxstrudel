'use client';

import { useState, useCallback, useEffect } from 'react';
import { isStrudelReady } from '@/lib/strudel-setup';

interface StrudelEngineState {
  isReady: boolean;
  isPlaying: boolean;
  bpm: number;
  lastError: string | null;
  statusMessage: string;
}

interface StrudelEngineActions {
  run: (code: string) => Promise<void>;
  stop: () => void;
  setBpm: (bpm: number) => void;
}

export function useStrudelEngine(): StrudelEngineState & StrudelEngineActions {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpmState] = useState(120);
  const [lastError, setLastError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('Loading Strudel engine...');

  useEffect(() => {
    const checkReady = setInterval(() => {
      if (isStrudelReady()) {
        setIsReady(true);
        setStatusMessage('Ready to play');
        clearInterval(checkReady);
      }
    }, 100);

    return () => clearInterval(checkReady);
  }, []);

  const run = useCallback(async (code: string) => {
    if (!isReady) {
      setLastError('Strudel engine not ready yet, please wait...');
      return;
    }

    try {
      setStatusMessage('Evaluating code...');
      setLastError(null);

      const { evaluate, hush, getAudioContext } = await import('@strudel/web');

      const audioContext = getAudioContext();
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      hush();

      await evaluate(code);

      setIsPlaying(true);
      setStatusMessage('Playing...');

    } catch (error: any) {
      setLastError(error.message || 'Evaluation error');
      setStatusMessage('Error evaluating code');
      setIsPlaying(false);
      console.error('Strudel run error:', error);
    }
  }, [isReady]);

  const stop = useCallback(async () => {
    try {
      const { hush } = await import('@strudel/web');
      hush();

      setIsPlaying(false);
      setStatusMessage('Stopped');
      setLastError(null);
    } catch (error: any) {
      setLastError(error.message || 'Error stopping');
      console.error('Strudel stop error:', error);
    }
  }, []);

  const setBpm = useCallback(async (newBpm: number) => {
    setBpmState(newBpm);

    if (isPlaying) {
      try {
        const { setCps } = await import('@strudel/web');
        setCps(newBpm / 60);
      } catch (error) {
        console.error('Error setting BPM:', error);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (isPlaying) {
        import('@strudel/web').then(({ hush }) => {
          try {
            hush();
          } catch (error) {
            console.error('Cleanup error:', error);
          }
        });
      }
    };
  }, [isPlaying]);

  return {
    isReady,
    isPlaying,
    bpm,
    lastError,
    statusMessage,
    run,
    stop,
    setBpm,
  };
}
