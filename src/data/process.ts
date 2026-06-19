export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'CNC — cięcie i formatowanie',
    description:
      'Sterowane numerycznie formatowanie płyt meblowych laminowanych i MDF. Precyzja do 0,1 mm, powtarzalność seryjna — każdy element identyczny.',
  },
  {
    number: '02',
    title: 'Oklejanie krawędzi PCV/ABS',
    description:
      'Automatyczne oklejanie wodoodpornymi obrzeżami PCV i ABS. Chronią przed wilgocią i uszkodzeniami mechanicznymi w intensywnie eksploatowanych placówkach.',
  },
  {
    number: '03',
    title: 'Obróbka metalu',
    description:
      'Własna sekcja gięcia profili stalowych i spawania stelaży. Okrągłe, owalne i płasko-owalne profile — dobierane do zastosowania i grupy wiekowej użytkownika.',
  },
  {
    number: '04',
    title: 'Lakiernia proszkowa',
    description:
      'Automatyczna lakiernia proszkowa: powłoka antykorozyjna i odporna na zarysowania. Wysoka odporność mechaniczna — kolor nie schodzi, nie łuszczy się, nie rdzewieje.',
  },
];
