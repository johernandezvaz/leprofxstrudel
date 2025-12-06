declare module '@strudel/web' {
  export function initStrudel(config?: { prebake?: () => void | Promise<void> }): Promise<void>;
  export function evaluate(code: string): Promise<void>;
  export function evalScope(...modules: any[]): void;
  export function hush(): void;
  export function setCps(cps: number): void;
  export function getAudioContext(): AudioContext;
  export function note(pattern: string): any;
  export function sound(pattern: string): any;
  export function s(pattern: string): any;
  export function n(pattern: string): any;
  export function samples(source: string, options?: { prebake?: boolean }): Promise<void>;
}
