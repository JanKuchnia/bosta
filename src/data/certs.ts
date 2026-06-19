export interface Certification {
  code: string;
  title: string;
  description: string;
}

export const certifications: Certification[] = [
  {
    code: 'PN-EN 1729-1:2016',
    title: 'Meble — Krzesła i stoły dla placówek edukacyjnych',
    description:
      'Norma określa wymiary mebli szkolnych dla poszczególnych grup wzrostowych uczniów (rozmiary 1–7). BOSTA stosuje pełny system numeracji zgodny z tą normą.',
  },
  {
    code: 'PN-EN 1729-2+A1:2016',
    title: 'Wymagania bezpieczeństwa i metody badań',
    description:
      'Norma definiuje wymagania wytrzymałościowe, stabilności i bezpieczeństwa dla krzeseł i stołów edukacyjnych. Każda seria produktów przechodzi testy zgodności.',
  },
  {
    code: 'Atest higieniczny E1',
    title: 'Klasa emisji formaldehydów E1',
    description:
      'Wszystkie materiały płytowe stosowane przez BOSTA posiadają atest higieniczny klasy E1 — najniższy dopuszczalny poziom emisji formaldehydów. Bezpieczne dla dzieci i placówek oświatowych.',
  },
];
