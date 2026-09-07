export const BIRD_TYPES = {
  flamingo: {
    name: 'Flamingo', r: 22, power: 0.22, damage: 1, bounce: -0.35, icon: '🦩',
    info: 'Ngjyrën rozë e merr nga karotenoidet në ushqim (alga e krustace). Pushon në një këmbë dhe jeton në koloni të mëdha nëpër laguna e liqene të kripura.',
    body: '#f4879f', wing: '#eb5f7f', belly: '#ffdbe4', beak: '#f2a5b5', beakLo: '#2a2320', brow: '#c2415f'
  },
  pelican: {
    name: 'Pelikani Kaçurrel', r: 30, power: 0.17, damage: 2, bounce: -0.22, icon: '🦢',
    info: 'Ndër zogjtë fluturues më të rëndë në botë; hapësira e krahëve arrin ~3 m. Ka qeskë të kuqërremtë nën sqep gjatë çiftëzimit. Specie e rrezikuar.',
    body: '#eef1f4', wing: '#d6dde2', belly: '#fbfcfd', beak: '#f2a13a', beakLo: '#e07a1f', brow: '#b9c2c9'
  },
  heron: {
    name: 'Çafka e hirtë', r: 16, power: 0.28, damage: 1, bounce: -0.15, icon: '🐦',
    info: 'Rri e palëvizur në ujë të cekët dhe godet peshkun me sqepin si shtizë. Fluturon me qafën të mbledhur në formë “S”.',
    body: '#a9b6bf', wing: '#8a99a4', belly: '#f2f4f5', beak: '#e8b53a', beakLo: '#cf8f1f', brow: '#2a2f34', special: 'boost'
  }
};

export const LEVELS = [
  {
    towers: [
      { x: 0.58, style: 'ice', tier: 1, look: 0 },
      { x: 0.88, style: 'wood', tier: 0, look: 1 }
    ],
    tnt: [0.73],
    sequence: ['flamingo', 'pelican', 'heron', 'flamingo']
  },
  {
    pyramid: true,
    tnt: [],
    sequence: ['flamingo', 'heron', 'flamingo', 'pelican', 'heron', 'flamingo', 'pelican']
  },
  {
    towers: [
      { x: 0.52, style: 'ice', tier: 0, look: 4 },
      { x: 0.70, style: 'ice', tier: 1, look: 5 },
      { x: 0.90, style: 'wood', tier: 1, look: 6 }
    ],
    tnt: [0.79],
    sequence: ['heron', 'flamingo', 'pelican', 'flamingo', 'heron', 'pelican', 'flamingo']
  },
  {
    desert: true,
    tnt: [],
    sequence: ['pelican', 'flamingo', 'heron', 'flamingo', 'pelican', 'heron', 'flamingo']
  },
  {
    floating: true,
    tnt: [],
    sequence: ['heron', 'flamingo', 'pelican', 'heron', 'flamingo', 'pelican', 'flamingo', 'heron']
  },
  {
    cliff: true,
    tnt: [],
    sequence: ['pelican', 'heron', 'flamingo', 'pelican', 'heron', 'flamingo', 'pelican', 'flamingo']
  },
  {
    volcano: true,
    towers: [
      { x: 0.53, style: 'wood', tier: 1, look: 2 },
      { x: 0.74, style: 'ice', tier: 0, look: 4 },
      { x: 0.91, style: 'wood', tier: 1, look: 0 }
    ],
    tnt: [0.64],
    sequence: ['pelican', 'flamingo', 'heron', 'flamingo', 'pelican', 'heron', 'flamingo']
  },
  {
    moonlight: true,
    towers: [
      { x: 0.49, style: 'ice', tier: 0, look: 5 },
      { x: 0.67, style: 'wood', tier: 1, look: 1 },
      { x: 0.88, style: 'ice', tier: 1, look: 6 }
    ],
    tnt: [0.77],
    sequence: ['heron', 'flamingo', 'pelican', 'heron', 'flamingo', 'pelican', 'flamingo', 'heron']
  },
  {
    marsh: true,
    towers: [
      { x: 0.55, style: 'wood', tier: 0, look: 3 },
      { x: 0.76, style: 'ice', tier: 1, look: 0 },
      { x: 0.93, style: 'wood', tier: 0, look: 5 }
    ],
    tnt: [0.67, 0.85],
    sequence: ['flamingo', 'heron', 'pelican', 'flamingo', 'heron', 'pelican', 'flamingo', 'pelican']
  },
  {
    school: true,
    tnt: [],
    sequence: ['flamingo', 'pelican', 'heron', 'flamingo', 'pelican', 'heron', 'flamingo', 'pelican', 'heron']
  }
];

export const POL_LOOKS = [
  { name: 'Edi Rama', type: 'rama', skin: '#d99d72', hair: '#d8d4cd', beard: '#d6d2ca', tie: '#c0392b', suit: '#704b98', lapel: '#49336b' },
  { name: 'Sali Berisha', type: 'berisha', skin: '#dda77f', hair: '#e8e5df', tie: '#2468ad', suit: '#2d609b', lapel: '#1d3f70' },
  { name: 'Lulzim Basha', type: 'basha', skin: '#dfaa82', hair: '#181716', tie: '#34495e', suit: '#2d609b', lapel: '#1d3f70' },
  { name: 'Erion Veliaj', type: 'veliaj', skin: '#df9e70', hair: '#2b1b13', beard: '#3a271d', tie: '#17866d', suit: '#704b98', lapel: '#49336b' },
  { name: 'Ilir Meta', type: 'meta', skin: '#dba376', hair: '#30251f', tie: '#c0392b', suit: '#2d609b', lapel: '#1d3f70' },
  { name: 'Taulant Balla', type: 'balla', skin: '#d99c70', hair: '#332119', tie: '#325f8d', suit: '#704b98', lapel: '#49336b' },
  { name: 'Zegjine Çaushi', type: 'caushi', skin: '#e7ad87', hair: '#542d22', tie: '#8e3c64', suit: '#704b98', lapel: '#49336b' }
];