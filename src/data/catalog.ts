export interface ProductVariant {
  description: string;
  price: number;
  originalPrice?: number;
  warranty?: string;
  isAddon?: boolean;
}

export interface CatalogProduct {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  variants: ProductVariant[];
}

export interface CatalogCategory {
  id: string;
  name: string;
  products: CatalogProduct[];
}

export const CATALOG_EMAIL = 'biuro@bosta.com.pl';

export const catalogCategories: CatalogCategory[] = [
  {
    id: 'szkolne',
    name: 'Meble szkolne',
    products: [
      {
        id: 'stolik-1os-marek',
        name: 'Stolik 1-os. BOSTA Marek regulowany',
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Stolik szkolny jednoosobowy BOSTA Marek z regulacją wzrostową',
        variants: [
          { description: 'koszyk – półka stolika (dodatkowa opłata)', price: 60, isAddon: true },
          { description: 'blat 50 × 65 cm – sklejka 16 mm z laminatem HPL w kolorze buk', price: 699, originalPrice: 779, warranty: '5 LAT' },
          { description: 'blat 50 × 65 cm – płyta meblowa 18 mm + obrzeże PCV 2 mm', price: 517, originalPrice: 584 },
        ],
      },
      {
        id: 'stolik-2os-marek',
        name: 'Stolik 2-os. BOSTA Marek regulowany',
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Stolik szkolny dwuosobowy BOSTA Marek z regulacją wzrostową',
        variants: [
          { description: 'koszyk – półka stolika (dodatkowa opłata)', price: 60, isAddon: true },
          { description: 'blat 50 × 130 cm – sklejka 16 mm z laminatem HPL w kolorze buk', price: 796, originalPrice: 882, warranty: '5 LAT' },
          { description: 'blat 50 × 130 cm – płyta meblowa 18 mm + obrzeże PCV 2 mm', price: 593, originalPrice: 659 },
        ],
      },
    ],
  },
  {
    id: 'przedszkolne',
    name: 'Meble przedszkolne',
    products: [
      {
        id: 'stol-kids',
        name: 'Stół prostokątny BOSTA Kids',
        image: 'https://kupmeble.pl/thumbnails/vertical/product/22158/900x600/page-57-ad190d56.webp',
        imageAlt: 'Stół prostokątny BOSTA Kids dla dzieci przedszkolnych',
        variants: [
          { description: 'blat 120 × 60 cm – płyta laminowana kolor biały, wys. 46 cm', price: 390, originalPrice: 450 },
          { description: 'blat 120 × 60 cm – płyta laminowana kolor buk, wys. 52 cm', price: 390, originalPrice: 450 },
        ],
      },
      {
        id: 'krzeslo-kids',
        name: 'Krzesło przedszkolne BOSTA Kids',
        image: 'https://kupmeble.pl/thumbnails/vertical/product/22158/900x600/page-57-ad190d56.webp',
        imageAlt: 'Krzesło przedszkolne BOSTA Kids ze sklejki bukowej',
        variants: [
          { description: 'rozmiar 1 – wys. siedziska 26 cm, sklejka bukowa lakierowana', price: 175, originalPrice: 199, warranty: '3 LATA' },
          { description: 'rozmiar 2 – wys. siedziska 30 cm, sklejka bukowa lakierowana', price: 185, originalPrice: 209, warranty: '3 LATA' },
          { description: 'rozmiar 3 – wys. siedziska 34 cm, sklejka bukowa lakierowana', price: 195, originalPrice: 219, warranty: '3 LATA' },
        ],
      },
    ],
  },
  {
    id: 'nauczycielskie',
    name: 'Meble do pokoju nauczycielskiego i gabinetów',
    products: [
      {
        id: 'biurko-nauczyciel',
        name: 'Biurko nauczycielskie BOSTA Standard',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Biurko nauczycielskie BOSTA Standard do gabinetu',
        variants: [
          { description: 'blat 130 × 65 cm – płyta melaminowana, bez kontenera', price: 640, originalPrice: 720 },
          { description: 'blat 130 × 65 cm – płyta melaminowana + kontener 3-szufladowy', price: 890, originalPrice: 980, warranty: '5 LAT' },
        ],
      },
      {
        id: 'szafa-gabinet',
        name: 'Szafa aktowa do gabinetu BOSTA Standard',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Szafa aktowa do gabinetu nauczycielskiego BOSTA Standard',
        variants: [
          { description: '2-drzwiowa, wym. 80 × 40 × 198 cm – płyta melaminowana', price: 780, originalPrice: 860 },
        ],
      },
    ],
  },
  {
    id: 'pracownie',
    name: 'Meble do pracowni przedmiotowych',
    products: [
      {
        id: 'stol-laboratoryjny',
        name: 'Stół laboratoryjny BOSTA Chem',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Stół laboratoryjny odporny na chemikalia BOSTA Chem',
        variants: [
          { description: 'blat 120 × 60 cm – laminat HPL antychemiczny, stelaż stalowy', price: 980, originalPrice: 1100, warranty: '5 LAT' },
          { description: 'blat 160 × 60 cm – laminat HPL antychemiczny, stelaż stalowy', price: 1240, originalPrice: 1390, warranty: '5 LAT' },
        ],
      },
      {
        id: 'stol-komputerowy',
        name: 'Stolik do pracowni komputerowej BOSTA PC',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Stolik do pracowni komputerowej BOSTA PC z miejscem na jednostkę',
        variants: [
          { description: 'blat 100 × 60 cm – płyta HPL z podstawą pod jednostkę', price: 720, originalPrice: 800 },
        ],
      },
    ],
  },
  {
    id: 'dodatkowe-klas',
    name: 'Wyposażenie dodatkowe klas',
    products: [
      {
        id: 'szafa-uczniowska',
        name: 'Szafa skrytkowa metalowa BOSTA Metal',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Szafa skrytkowa metalowa BOSTA Metal do sali lekcyjnej',
        variants: [
          { description: '9-skrytkowa, wym. 90 × 45 × 180 cm', price: 1350, originalPrice: 1500 },
          { description: '12-skrytkowa, wym. 120 × 45 × 180 cm', price: 1650, originalPrice: 1820 },
        ],
      },
      {
        id: 'tablica-szkolna',
        name: 'Tablica szkolna biała magnetyczna',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Tablica szkolna biała magnetyczna do sali lekcyjnej',
        variants: [
          { description: '120 × 90 cm – ceramiczna powierzchnia magnetyczna', price: 490, originalPrice: 560 },
          { description: '180 × 90 cm – ceramiczna powierzchnia magnetyczna', price: 680, originalPrice: 770 },
        ],
      },
    ],
  },
  {
    id: 'akcesoria',
    name: 'Akcesoria meblowe',
    products: [
      {
        id: 'koszyk-polka',
        name: 'Koszyk – półka pod blat stolika',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Koszyk metalowy – półka pod blat stolika szkolnego BOSTA',
        variants: [
          { description: 'do stolika jednoosobowego, szer. 45 cm', price: 60 },
          { description: 'do stolika dwuosobowego, szer. 110 cm', price: 75 },
        ],
      },
      {
        id: 'stopki-regulowane',
        name: 'Stopki poziomujące do mebli',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Stopki poziomujące regulowane do mebli BOSTA',
        variants: [
          { description: 'stalowe z nakrętką M8 (opakowanie 4 szt.)', price: 18 },
          { description: 'z nasadką plastikową ø 40 mm (opakowanie 4 szt.)', price: 22 },
        ],
      },
    ],
  },
  {
    id: 'biurowe',
    name: 'Meble biurowe',
    products: [
      {
        id: 'biurko-pracownicze',
        name: 'Biurko pracownicze BOSTA Office',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Biurko pracownicze BOSTA Office do biura',
        variants: [
          { description: 'blat 140 × 70 cm – płyta melaminowana kolor biały', price: 580, originalPrice: 650 },
          { description: 'blat 160 × 80 cm – płyta melaminowana kolor buk', price: 720, originalPrice: 790, warranty: '5 LAT' },
        ],
      },
      {
        id: 'szafa-aktowa',
        name: 'Szafa aktowa BOSTA Office',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Szafa aktowa BOSTA Office do biura',
        variants: [
          { description: '3-drzwiowa, wym. 120 × 40 × 198 cm – płyta melaminowana', price: 1100, originalPrice: 1250 },
        ],
      },
    ],
  },
  {
    id: 'biblioteki',
    name: 'Meble do bibliotek i czytelni',
    products: [
      {
        id: 'regal-biblioteczny',
        name: 'Regał biblioteczny BOSTA Libra',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Regał biblioteczny BOSTA Libra',
        variants: [
          { description: 'jednostronny, wym. 90 × 30 × 180 cm – płyta laminowana', price: 620, originalPrice: 700 },
          { description: 'dwustronny, wym. 90 × 60 × 180 cm – płyta laminowana', price: 890, originalPrice: 990, warranty: '5 LAT' },
        ],
      },
      {
        id: 'stolik-czytelni',
        name: 'Stolik do czytelni BOSTA Libra',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Stolik do czytelni BOSTA Libra',
        variants: [
          { description: 'blat 120 × 60 cm – płyta melaminowana, nogi drewniane buk', price: 520, originalPrice: 590 },
        ],
      },
    ],
  },
  {
    id: 'szatnie',
    name: 'Wyposażenie szatni',
    products: [
      {
        id: 'wieszak-szatniowy',
        name: 'Wieszak szatniowy BOSTA Szatnia',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Wieszak szatniowy metalowy BOSTA Szatnia',
        variants: [
          { description: '10-haczyków, stelaż stalowy lakierowany proszkowo', price: 340, originalPrice: 390 },
          { description: '16-haczyków z półką na buty, stelaż stalowy', price: 480, originalPrice: 540 },
        ],
      },
      {
        id: 'lawka-szatniowa',
        name: 'Ławka szatniowa BOSTA Szatnia',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Ławka szatniowa z siedziskiem drewnianym BOSTA Szatnia',
        variants: [
          { description: 'dł. 120 cm – siedzisko z drewna sosnowego, nogi stalowe', price: 280, originalPrice: 320 },
          { description: 'dł. 180 cm – siedzisko z drewna sosnowego, nogi stalowe', price: 380, originalPrice: 430 },
        ],
      },
    ],
  },
  {
    id: 'stalowe',
    name: 'Konstrukcje stalowe',
    products: [
      {
        id: 'stelaz-lawki',
        name: 'Stelaż stalowy do ławki szkolnej',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Stelaż stalowy do ławki szkolnej z regulacją wzrostową BOSTA',
        variants: [
          { description: 'rozmiar 3–4 (wys. regulowana 52–64 cm) – lakier proszkowy antracyt', price: 285, originalPrice: 320, warranty: '5 LAT' },
          { description: 'rozmiar 4–6 (wys. regulowana 58–76 cm) – lakier proszkowy antracyt', price: 310, originalPrice: 350, warranty: '5 LAT' },
        ],
      },
      {
        id: 'stelaz-biurka',
        name: 'Stelaż stalowy do biurka',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Stelaż stalowy do biurka – lakier proszkowy BOSTA',
        variants: [
          { description: 'szer. 120 cm – lakier proszkowy czarny', price: 340, originalPrice: 380 },
          { description: 'szer. 160 cm – lakier proszkowy czarny', price: 390, originalPrice: 440 },
        ],
      },
    ],
  },
  {
    id: 'uslugi',
    name: 'Usługi',
    products: [
      {
        id: 'montaz-dostawa',
        name: 'Dostawa i montaż na terenie Polski',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Usługa dostawy i montażu mebli szkolnych BOSTA',
        variants: [
          { description: 'wycena indywidualna w zależności od lokalizacji i zakresu', price: 0 },
        ],
      },
      {
        id: 'projekt-techniczny',
        name: 'Projekt techniczny i wizualizacja',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Usługa projektu technicznego i wizualizacji mebli BOSTA',
        variants: [
          { description: 'projekt na podstawie rzutu pomieszczenia – bezpłatny przy zamówieniu', price: 0 },
        ],
      },
    ],
  },
  {
    id: 'zaslepki',
    name: 'Zaślepki plastikowe',
    products: [
      {
        id: 'zaslepki-rury',
        name: 'Zaślepki do rur stalowych',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Zaślepki plastikowe do rur stalowych mebli BOSTA',
        variants: [
          { description: 'ø 25 mm – kolor czarny (opakowanie 100 szt.)', price: 35 },
          { description: 'ø 32 mm – kolor czarny (opakowanie 100 szt.)', price: 40 },
          { description: 'ø 40 mm – kolor czarny (opakowanie 100 szt.)', price: 48 },
        ],
      },
    ],
  },
  {
    id: 'relaks',
    name: 'Strefa Relaksu',
    products: [
      {
        id: 'fotel-relaksacyjny',
        name: 'Fotel wypoczynkowy BOSTA Relax',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Fotel wypoczynkowy BOSTA Relax do strefy relaksu',
        variants: [
          { description: 'tapicerka tkaninowa – kolor szary', price: 890, originalPrice: 990 },
          { description: 'tapicerka ekoskóra – kolor czarny', price: 1050, originalPrice: 1180, warranty: '3 LATA' },
        ],
      },
      {
        id: 'sofa-relaks',
        name: 'Sofa 2-osobowa BOSTA Relax',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Sofa dwuosobowa BOSTA Relax do strefy wypoczynku',
        variants: [
          { description: 'szer. 140 cm – tapicerka tkaninowa szara', price: 1490, originalPrice: 1690 },
          { description: 'szer. 140 cm – tapicerka ekoskóra czarna', price: 1750, originalPrice: 1950, warranty: '3 LATA' },
        ],
      },
    ],
  },
];
