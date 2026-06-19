export interface ProductSegment {
  id: string;
  anchor: string;
  overline: string;
  title: string;
  description: string;
  items: string[];
  image: string;
  imageAlt: string;
  imageLeft: boolean;
}

export const products: ProductSegment[] = [
  {
    id: 'szkolne',
    anchor: 'produkty',
    overline: 'Segment 01',
    title: 'Meble szkolne i edukacyjne',
    description:
      'Stoliki i ławki na stalowych stelażach z regulacją wzrostową ISO, krzesła ze sklejki bukowej kształtowanej, wyposażenie pracowni specjalistycznych odpornych na chemikalia. Zaoblone krawędzie i wzmocnione połączenia jako standard — nie opcja.',
    items: [
      'Ławki uczniowskie z regulacją wysokości (system ISO)',
      'Krzesła ze sklejki bukowej z ergonomicznym oparciem',
      'Stanowiska do pracowni chemicznych i komputerowych',
      'Szafy skrytkowe metalowe i płytowe',
      'Komplety do sal lekcyjnych i aul',
    ],
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Sala lekcyjna z szkolnymi ławkami i krzesłami BOSTA',
    imageLeft: true,
  },
  {
    id: 'przedszkolne',
    anchor: 'przedszkolne',
    overline: 'Segment 02',
    title: 'Meble przedszkolne',
    description:
      'Kolorowe serie dla najmłodszych: całkowite wyeliminowanie ostrych krawędzi, promienie zaokrągleń zgodne z normami bezpieczeństwa, atestowane materiały bez toksycznych lakierów. Meble, które wytrzymają generacje dzieci — bez uszczerbku na wyglądzie.',
    items: [
      'Stoły i krzesła dla grup wiekowych 3–6 lat',
      'Regały i meble do przechowywania zabawek',
      'Szatnie i wieszaki przedszkolne',
      'Certyfikowane materiały klasy E1',
      'Szeroka paleta kolorów',
    ],
    image: 'https://images.unsplash.com/photo-1587740920888-73dbff1e9e0b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Kolorowe meble przedszkolne z zaoblonymi krawędziami',
    imageLeft: false,
  },
  {
    id: 'biurowe',
    anchor: 'biurowe',
    overline: 'Segment 03',
    title: 'Meble biurowe i gabinetowe',
    description:
      'Systemy biurek pracowniczych, kontenery mobilne, szafy aktowe i lady recepcyjne do sekretariatów szkolnych i administracji. Ergonomia biurowa połączona z trwałością produkcji BOSTA — estetyka, która nie ustępuje w obliczu intensywnego użytkowania.',
    items: [
      'Biurka pracownicze i systemy modułowe',
      'Szafy aktowe i regały dokumentacji',
      'Kontenery mobilne z zamkami',
      'Lady recepcyjne i sekretariaty',
      'Wyposażenie gabinetów dyrektorskich',
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Meble biurowe BOSTA do administracji szkolnej',
    imageLeft: true,
  },
  {
    id: 'dedykowane',
    anchor: 'dedykowane',
    overline: 'Segment 04',
    title: 'Projekty dedykowane',
    description:
      'Niestandardowe zabudowy na wymiar dla placówek medycznych, hoteli, obiektów handlowych i magazynów wymagających hybrydowych konstrukcji metal–drewno. Każda realizacja poprzedzona kalkulacją i projektem technicznym — od pierwszego zapytania po montaż na miejscu.',
    items: [
      'Zabudowy na wymiar dla placówek medycznych',
      'Meble hotelowe i obiekty komercyjne',
      'Konstrukcje hybrydowe metal + drewno',
      'Projekty techniczne i kalkulacje',
      'Dostawa i montaż w całej Polsce',
    ],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Projekt dedykowany BOSTA — zabudowa na wymiar',
    imageLeft: false,
  },
];
