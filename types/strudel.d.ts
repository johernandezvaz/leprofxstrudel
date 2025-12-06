declare module '@strudel/core' {
  export function repl(options?: any): any;
  export const Pattern: any;
  export const stack: any;
  export const sequence: any;
}

declare module '@strudel/webaudio' {
  export function getAudioContext(): AudioContext;
  export function initAudioOnFirstClick(): Promise<void>;
  export function webaudioOutput(options?: any): any;
  export function registerSynthSounds(): void;
  export function registerZZFXSounds(): void;
}

declare module '@strudel/transpiler' {
  export function evaluate(code: string, options?: any): any;
  export function transpiler(code: string, options?: any): any;
}

declare module '@strudel/mini' {
  export const mini: any;
}

declare module '@strudel/tonal' {
  export const tonal: any;
}
