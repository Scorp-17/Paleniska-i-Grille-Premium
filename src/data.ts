import { Product, GalleryItem, Feature } from "./types";

export const withBaseUrl = (assetPath: string) =>
  `${import.meta.env.BASE_URL}${assetPath.replace(/^\/+/, "")}`;

export const HERO_IMAGE = withBaseUrl(
  "assets/images/hero_garden_sunset_1784393641552.jpg",
);

export const PRODUCTS: Product[] = [
  {
    id: "palenisko-ogrodowe",
    name: "Ekskluzywne Palenisko Ogrodowe „Vulkan”",
    category: "paleniska",
    price: 3450,
    description:
      "Bądź w centrum ciepła. Nasze flagowe palenisko o geometrycznej formie, wykonane z najwyższej jakości stali Corten, która z czasem pokrywa się szlachetną, miedzianą patyną. Idealne połączenie rzemieślniczej precyzji z surowym, nowoczesnym designem.",
    features: [
      "Wykonane ze stali Corten o grubości 4 mm",
      "Wbudowany system cyrkulacji powietrza minimalizujący dym",
      "Stabilna, masywna konstrukcja odporna na wiatr",
      "Możliwość dokupienia dedykowanego rusztu do grillowania",
      "Zaprojektowane i wyprodukowane w Polsce",
    ],
    image: withBaseUrl("assets/images/palenisko_corten_geo_1784467056806.jpg"),
    materials: [
      { name: "Stal Corten (Szlachetna rdza)", priceModifier: 0 },
      { name: "Stal węglowa czarna (Żaroodporna)", priceModifier: -300 },
      { name: "Stal nierdzewna szczotkowana", priceModifier: 800 },
    ],
    sizes: [
      { name: "Średnica 80 cm", priceModifier: 0 },
      { name: "Średnica 100 cm (Grand)", priceModifier: 750 },
      { name: "Średnica 120 cm (Majestic)", priceModifier: 1600 },
    ],
  },
  {
    id: "palenisko-lesne-lesna-opowiesc",
    name: "Ażurowe Palenisko Artystyczne „Leśna Opowieść”",
    category: "paleniska",
    price: 2900,
    description:
      "Wycinane laserowo z niezwykłą dbałością o detale. Sferyczne palenisko przedstawiające sylwetki dzikich zwierząt i lasu. Po rozpaleniu ognia tworzy hipnotyzujący teatr cieni w Twoim ogrodzie, łącząc funkcję grzewczą z unikalnym dziełem sztuki użytkowej.",
    features: [
      "Wycinane ze stali o grubości aż 4 mm",
      "Trójwymiarowy, szczegółowy wzór leśny wypalany laserem 3D",
      "Sferyczny, bezpieczny kształt zapobiegający wypadaniu popiołu i iskier",
      "Stabilna podstawa ze zintegrowanym popielnikiem",
      "Pomalowane specjalistyczną ognioodporną farbą o odporności do 900°C",
    ],
    image: withBaseUrl("assets/images/palenisko_forest_1784467042876.jpg"),
    materials: [
      { name: "Stal węglowa czarna (Farba żaroodporna)", priceModifier: 0 },
      { name: "Stal Corten (Szlachetna rdza)", priceModifier: 400 },
    ],
    sizes: [
      { name: "Średnica 70 cm", priceModifier: 0 },
      { name: "Średnica 90 cm (XL)", priceModifier: 600 },
    ],
  },
  {
    id: "palenisko-gazowe-aura",
    name: "Luksusowe Palenisko Gazowe „Aura Table”",
    category: "paleniska",
    price: 7400,
    description:
      "Komfort, styl i automatyka na Twoim tarasie. Luksusowy stół ze zintegrowanym paleniskiem gazowym na naturalne kamienie wulkaniczne. Pozwala cieszyć się natychmiastowym, czystym płomieniem bez dymu i popiołu, sterowanym za pomocą wbudowanego panelu.",
    features: [
      "Palnik ze stali nierdzewnej o mocy grzewczej 12 kW",
      "W komplecie dekoracyjne kamienie wulkaniczne rozpraszające płomień",
      "Wytrzymała konstrukcja stołu odporna na mróz i promieniowanie UV",
      "Dyskretny, ukryty schowek na standardową butlę gazową 11kg",
      "Czujnik bezpieczeństwa wypływu gazu i automatyczny zapalnik",
    ],
    image: withBaseUrl("assets/images/palenisko_gaz_aura_1784467081603.jpg"),
    materials: [
      { name: "Kompozyt architektoniczny (Czarny Mat)", priceModifier: 0 },
      { name: "Stal i drewno teakowe", priceModifier: 1100 },
    ],
    sizes: [
      { name: "Blat 100 x 100 cm", priceModifier: 0 },
      { name: "Blat 120 x 120 cm (King Size)", priceModifier: 950 },
    ],
  },
  {
    id: "grill-premium",
    name: "Grill Rzemieślniczy Premium „Ignis”",
    category: "grille",
    price: 5890,
    description:
      "Zdefiniuj na nowo grillowanie na świeżym powietrzu. Ignis to coś więcej niż grill – to mobilna kuchnia ogrodowa łącząca kwasoodporną stal nierdzewną z detalami z naturalnego, impregnowanego drewna orzechowego. Wyposażony w precyzyjną regulację dopływu powietrza oraz zintegrowany popielnik.",
    features: [
      "Konstrukcja z podwójnymi ściankami ze stali nierdzewnej 316",
      "Ciężki, żeliwny ruszt modułowy z systemem łatwego czyszczenia",
      "Półki boczne z selekcjonowanego drewna orzechowego",
      "Termometr tarczowy zintegrowany z pokrywą",
      "Wytrzymałe, ciche koła ułatwiające transport",
    ],
    image: withBaseUrl("assets/images/grill_rzemieslniczy_1784393670820.jpg"),
    materials: [
      { name: "Stal nierdzewna i Orzech", priceModifier: 0 },
      { name: "Stal węglowa czarna i Dąb palony", priceModifier: -400 },
    ],
    sizes: [
      { name: "Ruszt Ø 60 cm", priceModifier: 0 },
      { name: "Ruszt Ø 80 cm (Professional)", priceModifier: 1200 },
    ],
  },
  {
    id: "stojak-wood-honeycomb",
    name: "Modułowy Stojak na Drewno „Plaster Miodu”",
    category: "drewutnie",
    price: 1950,
    description:
      "Modułowy system składowania drewna kominkowego i opałowego w kształcie plastra miodu. Pozwala na dowolną, geometryczną konfigurację brył, dzięki czemu stanowi niesamowitą ozdobę nowoczesnego ogrodu lub elewacji budynku, gwarantując suchość drewna.",
    features: [
      "Zestaw bazowy składa się z 3 modułów sześciokątnych",
      "Wysokogatunkowa stal lakierowana proszkowo na kolor głębokiego matu",
      "Możliwość dokupowania i łączenia nieskończonej ilości ogniw",
      "Konstrukcja odsunięta od gruntu dla ochrony przed wilgocią",
      "Specjalne otwory do kotwienia ściennego lub gruntowego",
    ],
    image: withBaseUrl("assets/images/stojak_wood_hex_1784467069539.jpg"),
    materials: [
      { name: "Stal czarna malowana proszkowo", priceModifier: 0 },
      { name: "Stal Corten (Rdzewiejąca)", priceModifier: 380 },
    ],
    sizes: [
      { name: "Pakiet 3 modułów (Szerokość ok. 150 cm)", priceModifier: 0 },
      { name: "Pakiet 5 modułów (Szerokość ok. 240 cm)", priceModifier: 850 },
    ],
  },
  {
    id: "drewutnik-loftowy",
    name: "Nowoczesny Drewutnik Loftowy „Kubik”",
    category: "drewutnie",
    price: 1850,
    description:
      "Zadbaj o eleganckie składowanie drewna. Minimalistyczny drewutnik o geometrycznej, loftowej bryle, który stanowi doskonałą ozdobę nowoczesnego ogrodu lub tarasu. Chroni drewno przed wilgocią z podłoża i zapewnia optymalną wentylację.",
    features: [
      "Rama z profili stalowych, malowana proszkowo",
      "Podwyższone dno chroniące przed wilgocią gruntową",
      "Powłoka antykorozyjna w kolorze głębokiego matowego antracytu",
      "Zintegrowana półka na rozpałkę i akcesoria",
      "Możliwość łączenia modułowego",
    ],
    image: withBaseUrl("assets/images/drewutnia_loft_1784393686455.jpg"),
    materials: [
      { name: "Stal malowana proszkowo (Antracyt)", priceModifier: 0 },
      { name: "Stal Corten (Efekt rdzy)", priceModifier: 350 },
    ],
    sizes: [
      { name: "Wymiary: 120 x 100 x 35 cm", priceModifier: 0 },
      { name: "Wymiary: 180 x 120 x 40 cm (XL)", priceModifier: 600 },
    ],
  },
  {
    id: "wanna-ofuro-japan",
    name: "Japońska Wanna Ogrodowa Ofuro „Zen-Bath”",
    category: "meble",
    price: 16900,
    description:
      "Zewnętrzna wanna kąpielowa w tradycyjnym stylu japońskim Ofuro z wbudowanym piecem opalanym drewnem. Łączy naturalne właściwości termo-drewna ze sterylną, luksusową wkładką ze stali nierdzewnej, oferując relaks i zdrowotne rytuały przez cały rok.",
    features: [
      "Szlachetna wkładka z kwasoodpornej stali nierdzewnej AISI 304",
      "Obudowa z wyselekcjonowanego, zabezpieczonego drewna cedrowego / Thermo-wood",
      "Wydajny zintegrowany piec grzewczy ze stali nierdzewnej z wysokim kominem",
      "W komplecie pasujące stylowe schodki wejściowe i pokrywa termiczna",
      "Pojemność dostosowana do relaksu dla 4-6 osób jednocześnie",
    ],
    image: withBaseUrl("assets/images/wanna_ofuro_japan_1784467094493.jpg"),
    materials: [
      { name: "Obudowa Thermo-Modrzew + Stal nierdzewna", priceModifier: 0 },
      {
        name: "Obudowa Cedr Kanadyjski + Stal nierdzewna",
        priceModifier: 2400,
      },
    ],
    sizes: [
      { name: "Średnica 180 cm (4-6 osób)", priceModifier: 0 },
      { name: "Średnica 200 cm (6-8 osób)", priceModifier: 3100 },
    ],
  },
  {
    id: "stoly-silnik-v8-craft",
    name: "Rzemieślniczy Stół Loftowy „V8 Engine Table”",
    category: "meble",
    price: 8200,
    description:
      "Niezwykłe dzieło sztuki użytkowej i inżynieryjny majsterszczyk w Twoim salonie lub biurze. Ekskluzywny, robiony ręcznie stół z autentycznego, wypolerowanego na lustro bloku silnika V8, zwieńczony grubym hartowanym szkłem i klimatycznym podświetleniem LED.",
    features: [
      "Wykonany w 100% ręcznie z oryginalnego, gruntownie odrestaurowanego silnika V8",
      "Wytrzymały blat z hartowanego szkła OptiWhite o grubości 10 mm z polerowanym szlifem",
      "Subtelne podświetlenie LED z palety RGB, ukryte w cylindrach, sterowane smartfonem",
      "Prawdziwe tłoki silnika służące za stabilne podpory mocujące szklany blat",
      "Unikalny wyrób kolekcjonerski, każdy stół posiada wybitą tabliczkę znamionową",
    ],
    image: withBaseUrl("assets/images/stoly_silnik_v8_1784467106087.jpg"),
    materials: [
      {
        name: "Blok żeliwny lakierowany (Efekt chrom / metalik)",
        priceModifier: 0,
      },
      {
        name: "Blok ze stopów lekkich aluminium (Wysoki poler)",
        priceModifier: 1200,
      },
    ],
    sizes: [
      { name: "Blat szklany 100 x 80 cm", priceModifier: 0 },
      { name: "Blat szklany 120 x 90 cm (Gabinetowy)", priceModifier: 850 },
    ],
  },
  {
    id: "meble-stal-drewno",
    name: "Zestaw Mebli Tarasowych „Silesia”",
    category: "meble",
    price: 8900,
    description:
      "Ekskluzywny salon pod gołym niebem. Stół oraz sześć komfortowych krzeseł stworzonych na bazie ciężkich stalowych profili i desek z certyfikowanego drewna egzotycznego Teak. Miękkie, hydrofobowe poduszki zapewniają maksymalny komfort i odporność na zmienną pogodę.",
    features: [
      "Drewno Teak o podwyższonej odporności na warunki atmosferyczne",
      "Konstrukcja stalowa zabezpieczona cynkowaniem ogniowym",
      "Szybkoschnące poduszki z tkaniny Sunbrella® premium",
      "Ergonomiczne oparcia i głębokie, komfortowe siedziska",
      "W 100% odporne na UV i opady deszczu",
    ],
    image: withBaseUrl("assets/images/meble_ogrodowe_1784393702453.jpg"),
    materials: [
      { name: "Stal ocynkowana + Teak", priceModifier: 0 },
      { name: "Stal nierdzewna + Teak", priceModifier: 1500 },
      { name: "Stal ocynkowana + Modrzew syberyjski", priceModifier: -1200 },
    ],
    sizes: [
      { name: "Zestaw dla 6 osób (Stół 180 cm)", priceModifier: 0 },
      { name: "Zestaw dla 8 osób (Stół 240 cm)", priceModifier: 2200 },
    ],
  },
];

export const FEATURES: Feature[] = [
  {
    iconName: "ShieldCheck",
    title: "Stal Premium i Rzemiosło",
    description:
      "Stosujemy grubą, selekcjonowaną stal Corten, stal nierdzewną oraz precyzyjne spawy rzemieślnicze. Nasze produkty to inwestycja na pokolenia.",
  },
  {
    iconName: "CloudSun",
    title: "Odporność na Warunki",
    description:
      "Cynkowanie ogniowe, malowanie proszkowe klasy architektonicznej i hydrofobowe tkaniny gwarantują idealny wygląd przez cały rok.",
  },
  {
    iconName: "Sparkles",
    title: "Projekty na Wymiar",
    description:
      "Rozumiemy unikalność każdej przestrzeni. Modyfikujemy wymiary, materiały oraz detale wykończenia według Twoich indywidualnych potrzeb.",
  },
  {
    iconName: "Flame",
    title: "Unikalny Design i Klimat",
    description:
      "Nasze wzornictwo łączy ciepłą strukturę szlachetnego drewna z industrialnym chłodem stali, kreując niezrównany wieczorny klimat ogrodu.",
  },
];

export const GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    image: withBaseUrl("assets/images/palenisko_corten_geo_1784467056806.jpg"),
    title: "Wieczorny blask paleniska w ogrodzie przydomowym",
    category: "paleniska",
  },
  {
    id: "gal-2",
    image: withBaseUrl("assets/images/grill_rzemieslniczy_1784393670820.jpg"),
    title: "Grillowanie z przyjaciółmi na tarasie widokowym",
    category: "grille",
  },
  {
    id: "gal-3",
    image: withBaseUrl("assets/images/meble_ogrodowe_1784393702453.jpg"),
    title: "Zestaw mebli Silesia w minimalistycznej aranżacji",
    category: "meble",
  },
  {
    id: "gal-4",
    image: withBaseUrl("assets/images/drewutnia_loft_1784393686455.jpg"),
    title: "Loftowy drewutnik przy elewacji nowoczesnej willi",
    category: "drewutnie",
  },
  {
    id: "gal-5",
    image: withBaseUrl("assets/images/palenisko_forest_1784467042876.jpg"),
    title: "Ciepłe oświetlenie tarasu i palenisko rdzewiejące",
    category: "paleniska",
  },
  {
    id: "gal-6",
    image: withBaseUrl("assets/images/palenisko_gaz_aura_1784467081603.jpg"),
    title: "Zimowy wieczór z rozgrzanym grill-paleniskiem",
    category: "grille",
  },
];

export const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Janusz Wiśniewski",
    role: "Właściciel rezydencji w Konstancinie",
    text: "Palenisko Vulkan to absolutne arcydzieło. Stal Corten po kilku miesiącach nabrała niesamowitej barwy. Każdy wieczór spędzony przy tym ogniu z rodziną ma niepowtarzalny urok. Wykonanie i dbałość o detal są na najwyższym światowym poziomie.",
    rating: 5,
  },
  {
    id: "t-2",
    name: "Marta Kowalska",
    role: "Architekt krajobrazu",
    text: "Polecam te produkty moim najbardziej wymagającym klientom. Drewutnie i meble ogrodowe Silesia idealnie komponują się z nowoczesną, minimalistyczną architekturą. Są nie tylko piękne, ale przede wszystkim odporne na polskie kapryśne zimy.",
    rating: 5,
  },
  {
    id: "t-3",
    name: "Piotr Nowak",
    role: "Pasjonat grillowania",
    text: "Grill Ignis przeszedł moje najśmielsze oczekiwania. Regulacja dopływu powietrza działa niesamowicie precyzyjnie, a żeliwny ruszt trzyma temperaturę jak żaden inny grill, który miałem. Drewno orzechowe na półkach to klasa sama w sobie.",
    rating: 5,
  },
];
