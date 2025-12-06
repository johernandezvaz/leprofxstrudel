'use client';

const ds = "https://raw.githubusercontent.com/felixroos/dough-samples/main/";

let preloadPromise: Promise<void> | null = null;
let isPreloaded = false;

export async function prebakeStrudel() {
  if (typeof window === 'undefined') {
    return;
  }

  console.log('[Strudel Setup] Starting prebake...');

  const core = await import('@strudel/core');
  const mini = await import('@strudel/mini');
  const tonal = await import('@strudel/tonal');
  const webaudio = await import('@strudel/webaudio');
  const web = await import('@strudel/web');
  const draw = await import('@strudel/draw');
  const codemirror = await import('@strudel/codemirror');

  const { initAudioOnFirstClick, registerSynthSounds, registerZZFXSounds } = webaudio;
  const { samples } = web;

  initAudioOnFirstClick();

  console.log('[Strudel Setup] Modules loaded, registering sounds...');

  await Promise.all([
    registerSynthSounds(),
    registerZZFXSounds(),
    samples(`${ds}tidal-drum-machines.json`),
    samples(`${ds}piano.json`),
    samples(`${ds}Dirt-Samples.json`),
    samples(`${ds}EmuSP12.json`),
    samples(`${ds}vcsl.json`),
    samples(`${ds}mridangam.json`),
  ]);

  console.log('[Strudel Setup] Prebake complete!');
}

export async function preloadStrudel(): Promise<void> {
  if (isPreloaded) {
    return Promise.resolve();
  }

  if (preloadPromise) {
    return preloadPromise;
  }

  preloadPromise = (async () => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      console.log('[Strudel Setup] Starting preload...');

      await prebakeStrudel();

      isPreloaded = true;
      console.log('[Strudel Setup] Preload complete!');
    } catch (error) {
      console.error('[Strudel Setup] Error during preload:', error);
      preloadPromise = null;
      throw error;
    }
  })();

  return preloadPromise;
}

export function isStrudelReady(): boolean {
  return isPreloaded;
}
