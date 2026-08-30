export type stop = {
  id: string;
  order: number;
  name_ar: string;
  name_en: string;
  lat: number;
  long: number;
};

type lineStops = stop[];

export const kourneshStops: lineStops = [
  {
    id: "k1",
    order: 1,
    name_ar: "فندق سيسل",
    name_en: "Cecil Hotel",
    lat: 31.200938,
    long: 29.898372,
  },
  {
    id: "k2",
    order: 2,
    name_ar: "الأزاريطة (بنك مصر)",
    name_en: "Azarita (Banque Misr)",
    lat: 31.206172,
    long: 29.905134,
  },
  {
    id: "k3",
    order: 3,
    name_ar: "خلف مكتبة الإسكندرية على البحر",
    name_en: "Behind Bibliotheca Alexandrina (Corniche)",
    lat: 31.209182,
    long: 29.909125,
  },
  {
    id: "k4",
    order: 4,
    name_ar: "إشارة سان مارك - ش بورسعيد",
    name_en: "San Mark Signal - Port Said St.",
    lat: 31.212266,
    long: 29.917171,
  },
  {
    id: "k5",
    order: 5,
    name_ar: "كوبرى الجامعة (بمبة) - ش بورسعيد",
    name_en: "University Bridge (Bomba) - Port Said St.",
    lat: 31.212931,
    long: 29.920354,
  },
  {
    id: "k6",
    order: 6,
    name_ar: "دوران كامب شيزار - ش بورسعيد",
    name_en: "Camp Shizar Roundabout - Port Said St.",
    lat: 31.214095,
    long: 29.922454,
  },
  {
    id: "k7",
    order: 7,
    name_ar: "دوران الإبراهيمية - ش بورسعيد",
    name_en: "Ibrahimia Roundabout - Port Said St.",
    lat: 31.2165,
    long: 29.926679,
  },
  {
    id: "k8",
    order: 8,
    name_ar: "دوران سبورتنج - ش بورسعيد",
    name_en: "Sporting Roundabout - Port Said St.",
    lat: 31.216389,
    long: 29.9325,
  },
  {
    id: "k9",
    order: 9,
    name_ar: "دوران كليوباترا - ش بورسعيد",
    name_en: "Cleopatra Roundabout - Port Said St.",
    lat: 31.222543,
    long: 29.936964,
  },
  {
    id: "k10",
    order: 10,
    name_ar: "بيع المصنوعات (سيدي جابر) - ش بورسعيد",
    name_en: "Bay' El-Masnouat (Sidi Gaber) - Port Said St.",
    lat: 31.219557,
    long: 29.931979,
  },
  {
    id: "k11",
    order: 11,
    name_ar: "محطة محمد محفوظ (الترام)",
    name_en: "Mohamed Mahfouz Tram Station",
    lat: 31.226919,
    long: 29.948293,
  },
  {
    id: "k12",
    order: 12,
    name_ar: "ش سوريا (بنك مصر)",
    name_en: "Syria St. (Banque Misr)",
    lat: 31.229241,
    long: 29.951055,
  },
  {
    id: "k13",
    order: 13,
    name_ar: "ش سوريا (بنك CIB)",
    name_en: "Syria St. (CIB Bank)",
    lat: 31.230035,
    long: 29.949945,
  },
  {
    id: "k14",
    order: 14,
    name_ar: "سلطانة ستانلي",
    name_en: "Stanley Sultana",
    lat: 31.233671,
    long: 29.949053,
  },
  {
    id: "k15",
    order: 15,
    name_ar: "نفق ستانلي",
    name_en: "Stanley Tunnel",
    lat: 31.235215,
    long: 29.950654,
  },
  {
    id: "k16",
    order: 16,
    name_ar: "سابا باشا (بافلة)",
    name_en: "Saba Pasha (Bafla)",
    lat: 31.239745,
    long: 29.955094,
  },
  {
    id: "k17",
    order: 17,
    name_ar: "إيفون جليم",
    name_en: "Yvonne Gleem",
    lat: 31.240546,
    long: 29.958559,
  },
  {
    id: "k18",
    order: 18,
    name_ar: "فندق بلازا",
    name_en: "Plaza Hotel",
    lat: 31.244644,
    long: 29.964763,
  },
  {
    id: "k19",
    order: 19,
    name_ar: "فندق 26 يوليو (بعد الإشارة)",
    name_en: "26th of July Hotel (After the Traffic Light)",
    lat: 31.248171,
    long: 29.9681,
  },
  {
    id: "k20",
    order: 20,
    name_ar: "كوكي مان",
    name_en: "Cookie Man",
    lat: 31.250579,
    long: 29.970069,
  },
  {
    id: "k21",
    order: 21,
    name_ar: "بعد إشارة 4×4 قبل الإقبال",
    name_en: "After 4×4 Traffic Light, Before El-Ekbal",
    lat: 31.253051,
    long: 29.972754,
  },
  {
    id: "k22",
    order: 22,
    name_ar: "نفق المحروسة",
    name_en: "El Mahrousa Tunnel",
    lat: 31.2545,
    long: 29.975758,
  },
  {
    id: "k23",
    order: 23,
    name_ar: "بنك HSBC",
    name_en: "HSBC Bank",
    lat: 31.255502,
    long: 29.9773,
  },
  {
    id: "k24",
    order: 24,
    name_ar: "النساجون الشرقيون",
    name_en: "Oriental Weavers",
    lat: 31.261966,
    long: 29.984099,
  },
  {
    id: "k25",
    order: 25,
    name_ar: "جيلياتي لبنان (البنك الأهلي)",
    name_en: "Gelati Lebanon (National Bank of Egypt)",
    lat: 31.267501,
    long: 29.987487,
  },
  {
    id: "k26",
    order: 26,
    name_ar: "نفق اسكندر إبراهيم على البحر",
    name_en: "Eskandar Ibrahim Tunnel (Corniche)",
    lat: 31.269979,
    long: 29.993453,
  },
  {
    id: "k27",
    order: 27,
    name_ar: "نفق 45 على البحر",
    name_en: "45 Tunnel (Corniche)",
    lat: 31.270566,
    long: 29.996027,
  },
];

/* 
 [
  {
    order: 1,
    name_ar: "فندق سيسل",
    name_en: "Cecil Hotel",
    31.200937806024243, 29.898372338799685
  },
  {
    order: 2,
    name_ar: "الأزاريطة (بنك مصر)",
    name_en: "Azarita (Banque Misr)",
    31.206171695328276, 29.905134145454195
  },
  {
    order: 3,
    name_ar: "خلف مكتبة الإسكندرية على البحر",
    name_en: "Behind Bibliotheca Alexandrina (Corniche)",
    31.209181527634364, 29.909125272377953
  },
  {
    order: 4,
    name_ar: "إشارة سان مارك - ش بورسعيد",
    name_en: "San Mark Signal - Port Said St.",
    31.212265828105444, 29.91717100883828
  },
  {
    order: 5,
    name_ar: "كوبرى الجامعة (بمية) - ش بورسعيد",
    name_en: "University Bridge (Beymeh) - Port Said St.",
    ???
  },
  {
    order: 6,
    name_ar: "دوران كامب شيزار - ش بورسعيد",
    name_en: "Camp Shizar Roundabout - Port Said St.",
    31.214094677884386, 29.922453512043973
  },
  {
    order: 7,
    name_ar: "دوران الإبراهيمية - ش بورسعيد",
    name_en: "Ibrahimia Roundabout - Port Said St.",
    31.21649972941578, 29.9266790187125
  },
  {
    order: 8,
    name_ar: "دوران سبورتنج - ش بورسعيد",
    name_en: "Sporting Roundabout - Port Said St.",
    31.222588285254325, 29.936940682005755
  },
  {
    order: 9,
    name_ar: "دوران كليوباترا - ش بورسعيد",
    name_en: "Cleopatra Roundabout - Port Said St.",
    31.22254293033277, 29.936963985567903
    
  },
  {
    order: 10,
    name_ar: "بيع المصنوعات (سيدي جابر) - ش بورسعيد",
    name_en: "Bay' El-Masnouat (Sidi Gaber) - Port Said St.",
    31.219556915149358, 29.93197861208642
  },
  {
    order: 11,
    name_ar: "محطة محمد محفوظ (الترام)",
    name_en: "Mohamed Mahfouz Tram Station",
    31.226918940565508, 29.948293102162026
  },
  {
    order: 12,
    name_ar: "ش سوريا (بنك مصر)",
    name_en: "Syria St. (Banque Misr)",
    31.2292410848689, 29.95105473819317
  },
  {
    order: 13,
    name_ar: "ش سوريا (بنك CIB)",
    name_en: "Syria St. (CIB Bank)",
    31.230034713940963, 29.949945247773567
  },
  {
    order: 14,
    name_ar: "سلطانة ستانلي",
    name_en: "Stanley Sultana",
    31.23367118137139, 29.949053481129233
  },
  {
    order: 15,
    name_ar: "نفق ستانلي",
    name_en: "Stanley Tunnel",
    31.235214679122567, 29.9506535964726
  },
  {
    order: 16,
    name_ar: "سابا باشا (بافلة)",
    name_en: "Saba Pasha (Bafla)",
    31.239745372471933, 29.955093705243137
  },
  {
    order: 17,
    name_ar: "إيفون جليم",
    name_en: "Yvonne Gleem",
    31.24054621050062, 29.958558779645347
  },
  {
    order: 18,
    name_ar: "فندق بلازا",
    name_en: "Plaza Hotel",
    31.24464416151697, 29.96476255264814
  },
  {
    order: 19,
    name_ar: "فندق 26 يوليو (بعد الإشارة)",
    name_en: "26th of July Hotel (After the Traffic Light)",
    31.24817061467688, 29.968100031904108
  },
  {
    order: 20,
    name_ar: "كوكي مان",
    name_en: "Cookie Man",
    31.250579125800904, 29.97006928622533
  },
  {
    order: 21,
    name_ar: "بعد إشارة 4×4 قبل الإقبال",
    name_en: "After 4×4 Traffic Light, Before El-Ekbal",
    31.25305075580311, 29.972754404021455
  },
  {
    order: 22,
    name_ar: "نفق المحروسة",
    name_en: "El Mahrousa Tunnel",
    31.25450033794116, 29.975758012664148
  },
  {
    order: 23,
    name_ar: "بنك HSBC",
    name_en: "HSBC Bank",
    31.255502236998257, 29.977299618408228
  },
  {
    order: 24,
    name_ar: "النساجون الشرقيون",
    name_en: "Oriental Weavers",
    31.26196627665579, 29.984099187796787
  },
  {
    order: 25,
    name_ar: "جيلياتي لبنان (البنك الأهلي)",
    name_en: "Gelati Lebanon (National Bank of Egypt)",
    31.267500674609057, 29.987487488493255
  },
  {
    order: 26,
    name_ar: "نفق اسكندر إبراهيم على البحر",
    name_en: "Eskandar Ibrahim Tunnel (Corniche)",
    31.269979046152987, 29.993452562371683
  },
  {
    order: 27,
    name_ar: "نفق 45 على البحر",
    name_en: "45 Tunnel (Corniche)",
    31.270565505825882, 29.996027144507874
  },
];
*/
