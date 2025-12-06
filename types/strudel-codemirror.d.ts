declare module '@strudel/codemirror' {
  export interface StrudelMirrorOptions {
    root: HTMLElement;
    defaultOutput?: string;
    initialCode?: string;
    pattern?: string;
    transpiler?: any;
    getTime?: () => number;
    drawTime?: [number, number];
    prebake?: () => Promise<void>;
    afterEval?: (info: { error?: Error }) => void;
  }

  export class StrudelMirror {
    constructor(options: StrudelMirrorOptions);
    evaluate(): Promise<void>;
    stop(): void;
    setTheme(theme: string): void;
    code: string;
  }
}

declare module '@strudel/draw' {
  export const pianoroll: any;
  export const punchcard: any;
  export const scope: any;
  export const slider: any;
}
