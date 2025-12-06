export const snippets = [
  {
    name: 'Basic Beat',
    code: `sound("bd sd, hh*8")
  ._pianoroll()`
  },
  {
    name: 'Polyrhythm',
    code: `stack(
  sound("bd"),
  sound("hh*8").fast(2),
  sound("sd").slow(2)
)
  ._pianoroll()`
  },
  {
    name: 'Melodic Loop',
    code: `note("c3 eb3 g3 bb3")
  .s("sawtooth")
  .gain(0.5)
  ._pianoroll()`
  },
  {
    name: 'Advanced',
    code: `stack(
  sound("bd sd"),
  note("c2 eb2 g2 bb2")
    .s("sawtooth")
    .gain(0.4)
    .lpf(800),
  sound("hh*16")
    .gain(0.6)
)
  ._pianoroll()`
  }
];

export const defaultCode = snippets[0].code;
