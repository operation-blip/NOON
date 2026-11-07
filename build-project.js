const fs = require('fs');
const path = require('path');

const files = {
  'jsconfig.json': JSON.stringify({
    compilerOptions: {
      paths: { "@/*": ["./src/*"] }
    }
  }, null, 2),

  'next.config.mjs': `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
};
export default nextConfig;`,

  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        noonYellow: "#FEEE00",
        noonDark: "#404553",
        noonBlue: "#3866DF",
        noonGreen: "#38AE04",
        noonBg: "#F7F7FA",
        noonBorder: "#E2E5F1"
      },
      fontFamily: { cairo: ['Cairo', 'sans-serif'] }
    },
  },
  plugins: [],
};`,

  'postcss.config.js': `module.exports = {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};`,

  'src/app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap');
body {
  font-family: 'Cairo', sans-serif;
  background-color: #F7F7FA;
  color: #404553;
  -webkit-tap-highlight-color: transparent;
}
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.express-pill {
  background-color: #FEEE00;
  color: #404553;
  font-weight: 900;
  font-style: italic;
  padding: 1px 8px;
  border-radius: 4px 10px 4px 10px;
  font-size: 10px;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  letter-spacing: -0.3px;
}`,

  'src/app/layout.jsx': `import './globals.css';
export const metadata = {
  title: 'نون للتسوق أونلاين في السعودية | إلكترونيات، جوالات، أزياء، أجهزة منزلية والمزيد',
  description: 'تسوق أونلاين في المملكة العربية السعودية من نون - شحن إكسبريس سريع ودفع آمن',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
};
export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="pb-16 md:pb-0 antialiased selection:bg-noonYellow selection:text-noonDark">{children}</body>
    </html>
  );
}`,

  'src/lib/storeData.js': `export const trendingKeywords = [
  "آيفون 16 برو ماكس", "سامسونج S24 ألترا", "بلايستيشن 5 سليم", "قلاية هوائية فيليبس",
  "عطور شرقية", "ماكينة قهوة ديلونجي", "ماك بوك إير M3", "شاشة سامسونج 65", "أرز بسمتي", "عبايات خليجية"
];

// دوائر أقسام نون بصور منتجات حقيقية عالية الدقة كما في موقع نون الرسمي
export const quickCircles = [
  { name: "عروض الميجا", cat: "deals", badge: "خصم 70%", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=300&q=80" },
  { name: "الجوالات", cat: "الجوالات", badge: "آيفون 16", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=300&q=80" },
  { name: "اللابتوبات", cat: "الإلكترونيات", badge: "M3 & RTX", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80" },
  { name: "ألعاب الفيديو", cat: "الألعاب", badge: "PS5 Slim", img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=300&q=80" },
  { name: "أجهزة المطبخ", cat: "المنزل والمطبخ", badge: "نصف السعر", img: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=300&q=80" },
  { name: "القهوة والإسبريسو", cat: "المنزل والمطبخ", badge: "ديلونجي", img: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=300&q=80" },
  { name: "العطور الفاخرة", cat: "العطور والجمال", badge: "أصلي 100%", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=300&q=80" },
  { name: "العناية والجمال", cat: "العطور والجمال", badge: "بيوتي بوكس", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80" },
  { name: "الأزياء النسائية", cat: "الأزياء", badge: "موضة 2026", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80" },
  { name: "الأحذية الرياضية", cat: "الأزياء", badge: "نايكي وأديداس", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80" },
  { name: "الساعات الفاخرة", cat: "الأزياء", badge: "خصم إضافي", img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=300&q=80" },
  { name: "التلفزيونات", cat: "الإلكترونيات", badge: "4K QLED", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=300&q=80" },
  { name: "السماعات والساعات", cat: "الإلكترونيات", badge: "AirPods", img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=300&q=80" },
  { name: "السوبرماركت", cat: "السوبرماركت", badge: "كاش باك 5%", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80" },
  { name: "محلي بالسعودية", cat: "صُنع في السعودية", badge: "صُنع بالسعودية", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80" },
  { name: "الحقائب والسفر", cat: "الأزياء", badge: "تصفية", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80" }
];

const baseCatalog = [
  {
    id: 1,
    brand: "أبل (Apple)",
    sku: "N53489120A",
    title: "أبل آيفون 16 برو ماكس سعة 256 جيجابايت تيتانيوم صحراوي الجيل الخامس 5G مع فيس تايم - نسخة السعودية الرسمية",
    category: "الجوالات",
    price: 5199,
    oldPrice: 5699,
    rating: 4.9,
    reviews: 3420,
    express: true,
    isMegaDeal: true,
    isBestseller: true,
    badge: "الأكثر مبيعاً رقم #1",
    soldCount: "+900 تم بيعها مؤخراً",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["تيتانيوم صحراوي", "تيتانيوم طبيعي", "تيتانيوم أسود", "تيتانيوم أبيض"],
    sizes: ["256 جيجابايت", "512 جيجابايت", "1 تيرابايت"],
    highlights: [
      "شاشة Super Retina XDR مقاس 6.9 بوصة بتقنية ProMotion حتى 120Hz",
      "شريحة A18 Pro الخارقة مع محرك عصبي 16 نواة لميزات الذكاء الاصطناعي",
      "نظام كاميرات Pro احترافي بدقة 48MP مع تقريب بصري 5x وتسجيل فيديو 4K 120fps",
      "هيكل من التيتانيوم من الدرجة الخامسة فائق القوة والخفة مع زر التحكم بالكاميرا الجديد",
      "ضمان الوكيل الرسمي في المملكة العربية السعودية لمدة 24 شهراً"
    ],
    specs: {
      "العلامة التجارية": "Apple",
      "نظام التشغيل": "iOS 18",
      "حجم الشاشة": "6.9 بوصة",
      "شبكة الاتصال": "الجيل الخامس 5G",
      "الضمان": "سنتين ضمان الوكيل بالسعودية"
    }
  },
  {
    id: 2,
    brand: "سامسونج (Samsung)",
    sku: "N77812094S",
    title: "سامسونج جالكسي S24 ألترا ثنائي الشريحة تيتانيوم رمادي 12GB رام 256GB الجيل الخامس مع قلم S-Pen",
    category: "الجوالات",
    price: 3899,
    oldPrice: 5399,
    rating: 4.8,
    reviews: 2150,
    express: true,
    isMegaDeal: true,
    isBestseller: true,
    badge: "خصم 28%",
    soldCount: "+750 تم بيعها مؤخراً",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["تيتانيوم رمادي", "تيتانيوم أسود", "تيتانيوم بنفسجي", "تيتانيوم أصفر"],
    sizes: ["256 جيجابايت", "512 جيجابايت"],
    highlights: [
      "مدعوم بميزات Galaxy AI للترجمة الفورية والبحث بالصور وتحرير اللقطات",
      "كاميرا أساسية جبارة بدقة 200 ميجابكسل مع تقريب بصري فائق الدقة",
      "إطار خارجي من التيتانيوم المتين مع زجاج Corning Gorilla Armor المقاوم للانعكاس",
      "معالج Snapdragon 8 Gen 3 المخصص لأجهزة جالكسي لأداء ألعاب استثنائي"
    ],
    specs: {
      "العلامة التجارية": "Samsung",
      "الذاكرة العشوائية": "12 جيجابايت رام",
      "البطارية": "5000 مللي أمبير",
      "القلم الذكي": "قلم S-Pen مدمج",
      "الضمان": "سنتين ضمان الوكيل بالسعودية"
    }
  },
  {
    id: 3,
    brand: "سوني (Sony)",
    sku: "N99012458P",
    title: "سوني جهاز بلايستيشن 5 سليم (PS5 Slim) نسخة الأقراص سعة 1 تيرابايت - إصدار السعودية الرسمي مع يد تحكم DualSense",
    category: "الألعاب",
    price: 1849,
    oldPrice: 2299,
    rating: 4.9,
    reviews: 5120,
    express: true,
    isMegaDeal: true,
    isBestseller: true,
    badge: "عرض الميجا",
    soldCount: "+1500 تم بيعها مؤخراً",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["أبيض قياسي", "أسود منتصف الليل"],
    sizes: ["نسخة الأقراص 1TB", "النسخة الرقمية 1TB"],
    highlights: [
      "تصميم أنحف وأخف وزناً مع سعة تخزين داخلية كاملة 1 تيرابايت SSD فائق السرعة",
      "يدعم تتبع الأشعة (Ray Tracing) وألعاب بدقة 4K تصل إلى 120 إطاراً في الثانية",
      "يتضمن ذراع التحكم اللاسلكية DualSense بميزة الاهتزاز التفاعلي والأزرار التكيفية"
    ],
    specs: {
      "العلامة التجارية": "Sony PlayStation",
      "سعة التخزين": "1 تيرابايت SSD",
      "دقة العرض": "4K HDR 120Hz",
      "الضمان": "سنتين ضمان الوكيل بالسعودية"
    }
  },
  {
    id: 4,
    brand: "فيليبس (Philips)",
    sku: "N44102938H",
    title: "فيليبس قلاية هوائية بحجم عائلي XXL سعة 6.2 لتر بقوة 2000 واط بتقنية Rapid Air - أسود",
    category: "المنزل والمطبخ",
    price: 449,
    oldPrice: 899,
    rating: 4.8,
    reviews: 3120,
    express: true,
    isMegaDeal: true,
    isBestseller: true,
    badge: "خصم 50%",
    soldCount: "+1100 تم بيعها مؤخراً",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["أسود ملكي", "أسود وفضي"],
    sizes: ["6.2 لتر XXL", "4.1 لتر XL"],
    highlights: [
      "قلي صحي بنسبة دهون أقل حتى 90% بفضل تقنية الهواء السريع Rapid Air",
      "حجم عائلي كبير XXL يتسع لدجاجة كاملة أو 1.4 كجم من البطاطس المقلية",
      "شاشة لمس رقمية مع 7 برامج طهي مسبقة الإعداد وسلة آمنة للغسل في غسالة الأطباق"
    ],
    specs: {
      "العلامة التجارية": "Philips",
      "السعة": "6.2 لتر",
      "القدرة الكهربائية": "2000 واط",
      "الضمان": "سنتين ضمان الوكيل"
    }
  },
  {
    id: 5,
    brand: "أبل (Apple)",
    sku: "N33019284M",
    title: "أبل ماك بوك إير شاشة 13.6 بوصة شريحة M3 معالج ثماني النواة وذاكرة 256GB SSD - رمادي فلكي (لوحة مفاتيح عربي/إنجليزي)",
    category: "الإلكترونيات",
    price: 4199,
    oldPrice: 4799,
    rating: 4.9,
    reviews: 830,
    express: true,
    isMegaDeal: false,
    isBestseller: true,
    badge: "جديد M3",
    soldCount: "+400 تم بيعها مؤخراً",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"],
    colors: ["رمادي فلكي", "سماء الليل", "ضوء النجوم", "فضي"],
    sizes: ["256GB / 8GB RAM", "512GB / 16GB RAM"],
    highlights: [
      "أداء فائق السرعة بفضل شريحة Apple M3 مع عمر بطارية يصل إلى 18 ساعة",
      "شاشة Liquid Retina مقاس 13.6 بوصة تدعم مليار لون وسطوع 500 شمعة",
      "تصميم فائق النحافة بدون مروحة لعمل هادئ تماماً وشحن MagSafe 3"
    ],
    specs: { "العلامة التجارية": "Apple", "المعالج": "Apple M3", "حجم الشاشة": "13.6 بوصة", "الضمان": "سنتين حاسبات العرب" }
  },
  {
    id: 6,
    brand: "أبل (Apple)",
    sku: "N22910485A",
    title: "أبل سماعات إيربودز برو (الجيل الثاني) مع علبة شحن MagSafe بمنفذ USB-C وعزل ضوضاء نشط",
    category: "الإلكترونيات",
    price: 849,
    oldPrice: 1099,
    rating: 4.9,
    reviews: 4120,
    express: true,
    isMegaDeal: false,
    isBestseller: true,
    badge: "سعر مميز",
    soldCount: "+1200 تم بيعها مؤخراً",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80"],
    colors: ["أبيض"],
    sizes: ["USB-C MagSafe"],
    highlights: [
      "إلغاء ضجيج نشط مضاعف حتى مرتين مقارنة بالجيل السابق مع وضع شفافية متكيف",
      "صوت مكاني مخصص مع تتبع ديناميكي لحركة الرأس وشريحة H2 الذكية",
      "مقاومة للغبار والعرق والماء بمعيار IP54 للسماعات والعلبة"
    ],
    specs: { "العلامة التجارية": "Apple", "الاتصال": "Bluetooth 5.3", "منفذ الشحن": "USB Type-C" }
  },
  {
    id: 7,
    brand: "سامسونج (Samsung)",
    sku: "N66541209T",
    title: "شاشة سامسونج سمارت 65 بوصة بدقة 4K Crystal UHD تدعم شاهد ونتفليكس وAirPlay + ساوند بار هدية",
    category: "الإلكترونيات",
    price: 1999,
    oldPrice: 2899,
    rating: 4.7,
    reviews: 950,
    express: true,
    isMegaDeal: true,
    isBestseller: false,
    badge: "هدية ساوند بار",
    soldCount: "+320 تم بيعها مؤخراً",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80"],
    colors: ["أسود تيتان"],
    sizes: ["55 بوصة", "65 بوصة", "75 بوصة"],
    highlights: [
      "معالج Crystal 4K يمنحك ألواناً نابضة بالحياة وتبايناً فائقاً بفضل تقنية HDR",
      "نظام تشغيل Tizen الذكي يضم تطبيقات شاهد، نتفليكس، يوتيوب، وApple TV",
      "تصميم AirSlim نحيف للغاية يندمج مع حائط غرفة المعيشة بأناقة"
    ],
    specs: { "العلامة التجارية": "Samsung", "المقاس": "65 بوصة", "الدقة": "4K UHD (3840x2160)" }
  },
  {
    id: 8,
    brand: "ديلونجي (De'Longhi)",
    sku: "N88741236D",
    title: "ديلونجي ماكينة تحضير القهوة والإسبريسو ديديكا أرتي بقوة 1300 واط وضغط 15 بار مع عصا تبخير احترافية - فضي",
    category: "المنزل والمطبخ",
    price: 699,
    oldPrice: 999,
    rating: 4.8,
    reviews: 1540,
    express: true,
    isMegaDeal: false,
    isBestseller: true,
    badge: "اختيار نون",
    soldCount: "+620 تم بيعها مؤخراً",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80"],
    colors: ["ستانلس ستيل فضي", "أسود مطفي", "أحمر معدني"],
    sizes: ["الإصدار القياسي EC685", "إصدار أرتي EC885"],
    highlights: [
      "ضغط احترافي 15 بار لاستخلاص إسبريسو غني بالكريمة الكثيفة والرائحة الزكية",
      "نظام تسخين Thermoblock سريع يجعل الماكينة جاهزة للعمل خلال 35 ثانية فقط",
      "عصا تبخير حليب احترافية لتحضير الكابتشينو واللاتيه والفلات وايت كالمقاهي"
    ],
    specs: { "العلامة التجارية": "De'Longhi", "الضغط": "15 بار", "القدرة": "1300 واط" }
  },
  {
    id: 9,
    brand: "العربية للعود",
    sku: "N55214789F",
    title: "عطر عود ملكي فاخر أو دي بارفيوم 100 مل - ثبات عالي وفوحان شرقي أصيل بالمكونات الطبيعية",
    category: "العطور والجمال",
    price: 189,
    oldPrice: 380,
    rating: 4.8,
    reviews: 1620,
    express: true,
    isMegaDeal: true,
    isBestseller: true,
    badge: "الأكثر طلباً",
    soldCount: "+980 تم بيعها مؤخراً",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80"],
    colors: ["إصدار ذهبي ملكي"],
    sizes: ["100 مل", "200 مل حجم التوفير"],
    highlights: [
      "مزيج فاخر من دهن العود الكمبودي المعتق مع العنبر والزعفران والمسك الأبيض",
      "ثبات يدوم لأكثر من 48 ساعة على الملابس ومناسب للمناسبات الرسمية والهدايا",
      "زجاجة كريستالية فاخرة داخل علبة جلدية أنيقة"
    ],
    specs: { "التركيز": "Eau de Parfum", "الحجم": "100 مل", "العائلة العطرية": "شرقي - خشبي" }
  },
  {
    id: 10,
    brand: "دايسون (Dyson)",
    sku: "N11458963B",
    title: "دايسون جهاز تصفيف الشعر إير راب الملتي ستايلر الكامل للشعر الطويل - أزرق داكن ونحاسي",
    category: "العطور والجمال",
    price: 1999,
    oldPrice: 2499,
    rating: 4.9,
    reviews: 1340,
    express: true,
    isMegaDeal: false,
    isBestseller: true,
    badge: "إصدار خاص",
    soldCount: "+410 تم بيعها مؤخراً",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"],
    colors: ["أزرق بروسي ونحاسي", "نيكل ونحاسي", "وردي سيراميك"],
    sizes: ["المجموعة الكاملة مع صندوق الحفظ"],
    highlights: [
      "تجعيد وتمويج وتنعيم وتجفيف الشعر بتأثير Coanda الهوائي بدون حرارة مفرطة",
      "تحكم ذكي بالحرارة يقيس درجة تدفق الهواء أكثر من 40 مرة في الثانية لحماية لمعان الشعر",
      "يأتي مع 6 ملحقات متكاملة وصندوق تخزين جلدي فاخر مبطن بالمخمل"
    ],
    specs: { "العلامة التجارية": "Dyson", "القدرة": "1300 واط", "الضمان": "سنتين ضمان الوكيل" }
  },
  {
    id: 11,
    brand: "أزياء الخليج",
    sku: "N99852364W",
    title: "عباية خليجية سوداء فاخرة قماش كريب ملكي بتطريز هادئ على الأكمام مع طرحة شيفون متناسقة",
    category: "الأزياء",
    price: 159,
    oldPrice: 299,
    rating: 4.8,
    reviews: 940,
    express: true,
    isMegaDeal: false,
    isBestseller: true,
    badge: "موضة 2026",
    soldCount: "+560 تم بيعها مؤخراً",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"],
    colors: ["أسود ملكي", "كحلي داكن"],
    sizes: ["52", "54", "56", "58", "60"],
    highlights: [
      "قماش كريب سعودي فاخر بارد وانسيابي لا يتجعد بسهولة ومثالي للاستخدام اليومي والمناسبات",
      "تطريز يدوي دقيق على الأكمام مع قصة ربع كلوش مريحة وأنيقة",
      "تأتي مع طرحة شيفون طويلة بنفس التطريز مجاناً"
    ],
    specs: { "نوع القماش": "كريب ملكي فاخر", "القصة": "عادية / ربع كلوش", "الملحقات": "طرحة مجانية" }
  },
  {
    id: 12,
    brand: "نايكي (Nike)",
    sku: "N74125896S",
    title: "نايكي حذاء الجري الرياضي إير زوم بيجاسوس للرجال - وسادة هوائية مريحة وخفيف الوزن",
    category: "الأزياء",
    price: 329,
    oldPrice: 549,
    rating: 4.7,
    reviews: 610,
    express: true,
    isMegaDeal: false,
    isBestseller: false,
    badge: "أصلي 100%",
    soldCount: "+310 تم بيعها مؤخراً",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"],
    colors: ["أحمر رياضي", "أسود وأبيض", "رمادي"],
    sizes: ["41 EU", "42 EU", "43 EU", "44 EU", "45 EU"],
    highlights: [
      "نعل أوسط من فوم Nike React مع وحدتي Zoom Air لارتداد طاقة فائق في كل خطوة",
      "نسيج شبكي هندسي علوي يسمح بتهوية القدم ويقلل الوزن أثناء الجري والتمارين"
    ],
    specs: { "العلامة التجارية": "Nike", "الاستخدام": "الجري والتمارين اليومية", "الخامة": "نسيج شبكي ومطاط" }
  },
  {
    id: 13,
    brand: "الوليمة / كلاسيك",
    sku: "N36985214G",
    title: "أرز بسمتي هندي كلاسيك طويل الحبة فاخر - كيس 10 كجم + عبوة زيت طبخ 1.5 لتر هدية مجانية",
    category: "السوبرماركت",
    price: 79,
    oldPrice: 115,
    rating: 4.9,
    reviews: 3120,
    express: true,
    isMegaDeal: true,
    isBestseller: true,
    badge: "كاش باك 5%",
    soldCount: "+2400 تم بيعها مؤخراً",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80"],
    colors: ["كيس 10 كجم"],
    sizes: ["10 كجم + هدية", "5 كجم"],
    highlights: [
      "حبة طويلة جداً تنفش وتزداد طولاً عند الطبخ مثالية للكبسة السعودية والولائم",
      "معتق لمدة عامين لضمان النكهة الغنية وعدم التكسر أثناء الطهي"
    ],
    specs: { "الوزن": "10 كيلوجرام", "النوع": "بسمتي هندي طويل الحبة", "بلد المنشأ": "الهند" }
  },
  {
    id: 14,
    brand: "خيرات القصيم",
    sku: "N15975348M",
    title: "بوكس قهوة سعودية شقراء فاخرة بالهيل والزعفران مع تمر سكري القصيم الملكي الفاخر - صُنع في السعودية",
    category: "صُنع في السعودية",
    price: 95,
    oldPrice: 140,
    rating: 4.9,
    reviews: 1410,
    express: true,
    isMegaDeal: false,
    isBestseller: true,
    badge: "محلي 🇸🇦",
    soldCount: "+920 تم بيعها مؤخراً",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"],
    colors: ["بوكس الضيافة الملكي"],
    sizes: ["1 كجم قهوة + 1 كجم تمر سكري"],
    highlights: [
      "بن هرري محمص ومطحون بعناية على الطريقة السعودية الأصيلة مع الهيل الهندي الفاخر والزعفران",
      "يأتي مع عبوة تمر سكري القصيم مفتل ملكي من أجود مزارع المملكة العربية السعودية"
    ],
    specs: { "البرنامج": "محلي - صُنع في السعودية", "محتويات البوكس": "قهوة سعودية + تمر سكري", "التغليف": "علبة هدايا فاخرة" }
  }
];

// دالة ذكية لتوليد دفعات من 100 منتج حقيقي متنوع في كل مرة
export function generateBulkProducts(count = 100, startId = 1000) {
  const templates = [
    { brand: "أبل (Apple)", cat: "الجوالات", baseTitle: "أبل آيفون 16 برو سعة 256 جيجابايت الجيل الخامس 5G", basePrice: 4499, oldPrice: 4999, img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=80" },
    { brand: "سامسونج (Samsung)", cat: "الجوالات", baseTitle: "سامسونج جالكسي S24 بلس ثنائي الشريحة 256 جيجابايت 12 جيجا رام 5G", basePrice: 2999, oldPrice: 3899, img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=700&q=80" },
    { brand: "شاومي (Xiaomi)", cat: "الجوالات", baseTitle: "شاومي ريدمي نوت 13 برو بلس 5G سعة 512 جيجابايت كاميرا 200MP", basePrice: 1399, oldPrice: 1799, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80" },
    { brand: "أسوس (ASUS)", cat: "الإلكترونيات", baseTitle: "أسوس لابتوب الألعاب ROG Strix شاشة 16 بوصة 165Hz معالج Core i9", basePrice: 5499, oldPrice: 6499, img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=700&q=80" },
    { brand: "أبل (Apple)", cat: "الإلكترونيات", baseTitle: "أبل آيباد برو شاشة OLED مقاس 11 بوصة شريحة M4 واي فاي", basePrice: 3999, oldPrice: 4499, img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=700&q=80" },
    { brand: "سوني (Sony)", cat: "الإلكترونيات", baseTitle: "سوني سماعة رأس لاسلكية WH-1000XM5 عازلة للضوضاء بالكامل", basePrice: 1149, oldPrice: 1599, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80" },
    { brand: "إل جي (LG)", cat: "الإلكترونيات", baseTitle: "تلفزيون إل جي سمارت OLED مقاس 65 بوصة بدقة 4K وسرعة 120Hz للألعاب", basePrice: 4899, oldPrice: 6999, img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=700&q=80" },
    { brand: "نينجا (Ninja)", cat: "المنزل والمطبخ", baseTitle: "نينجا قلاية هوائية مزدوجة DualZone سعة 9.5 لتر بقوة 2470 واط", basePrice: 699, oldPrice: 1099, img: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=700&q=80" },
    { brand: "دايسون (Dyson)", cat: "المنزل والمطبخ", baseTitle: "دايسون مكنسة لاسلكية V15 Detect بقوة شفط جبارة وكشف الغبار بالليزر", basePrice: 2399, oldPrice: 3199, img: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=700&q=80" },
    { brand: "نسبرسو (Nespresso)", cat: "المنزل والمطبخ", baseTitle: "نسبرسو ماكينة تحضير القهوة لاتيسيما ون مع خافق حليب مدمج", basePrice: 999, oldPrice: 1399, img: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=700&q=80" },
    { brand: "ديور (Dior)", cat: "العطور والجمال", baseTitle: "ديور عطر سوفاج إليكسير المركز للرجال 100 مل - أصلي 100%", basePrice: 589, oldPrice: 750, img: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=80" },
    { brand: "شانيل (Chanel)", cat: "العطور والجمال", baseTitle: "شانيل عطر كوكو مدموزيل أو دي بارفيوم للنساء 100 مل", basePrice: 640, oldPrice: 790, img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80" },
    { brand: "كاسيو (Casio)", cat: "الأزياء", baseTitle: "كاسيو ساعة يد كلاسيكية فاخرة مقاومة للماء بسوار ستانلس ستيل", basePrice: 175, oldPrice: 280, img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80" },
    { brand: "أديداس (Adidas)", cat: "الأزياء", baseTitle: "أديداس حذاء ألترا بوست للجري والرياضة اليومية مريح جداً", basePrice: 349, oldPrice: 620, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80" },
    { brand: "نينتندو (Nintendo)", cat: "الألعاب", baseTitle: "نينتندو سويتش شاشة OLED مع لعبة ماريو كارت 8 ديلوكس", basePrice: 1299, oldPrice: 1649, img: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=700&q=80" },
    { brand: "أريال (Ariel)", cat: "السوبرماركت", baseTitle: "مسحوق غسيل أريال المركز للغسالات الأوتوماتيكية - عبوة التوفير 9 كجم", basePrice: 74, oldPrice: 115, img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80" },
    { brand: "تراث نجد", cat: "صُنع في السعودية", baseTitle: "مبخرة نجدية ملكية محفورة يدوياً مع أوقية عود مروكي طبيعي فاخر", basePrice: 145, oldPrice: 230, img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80" }
  ];

  const editions = ["إصدار 2026 الحديث", "نسخة الخليج والسعودية", "العرض الحصري", "النسخة المطورة Pro", "حجم التوفير العائلي", "الإصدار الملكي الفاخر"];
  const badges = ["الأكثر مبيعاً", "عرض الميجا", "خصم إضافي 15%", "اختيار نون", "هدية مجانية", "أقل سعر بالسوق"];

  const generated = [];
  for (let i = 0; i < count; i++) {
    const t = templates[i % templates.length];
    const ed = editions[i % editions.length];
    const priceVar = Math.max(25, t.basePrice + ((i % 7) - 3) * 15);
    const oldPriceVar = priceVar + Math.round(priceVar * 0.28);

    generated.push({
      id: startId + i,
      brand: t.brand,
      sku: "N" + (800000 + startId + i) + "KSA",
      title: t.baseTitle + " - " + ed + " (موديل #" + (i + 1) + ")",
      category: t.cat,
      price: priceVar,
      oldPrice: oldPriceVar,
      rating: Number((4.6 + (i % 4) * 0.1).toFixed(1)),
      reviews: 180 + (i * 37) % 2900,
      express: true,
      isMegaDeal: i % 5 === 0,
      isBestseller: i % 3 === 0,
      badge: badges[i % badges.length],
      soldCount: "+" + (120 + (i * 45) % 900) + " تم بيعها مؤخراً",
      image: t.img,
      gallery: [t.img],
      colors: ["أسود ملكي", "فضي تيتانيوم", "أبيض لؤلؤي"],
      sizes: ["الحجم القياسي", "الحجم الكبير Pro"],
      highlights: [
        "منتج أصلي 100% مضمون من نون السعودية مع شحن نون إكسبريس السريع",
        "خامات عالية الجودة وأداء فائق يلائم الاستخدام اليومي المكثف",
        "مشمول بضمان الوكيل المحلي في المملكة العربية السعودية لمدة سنتين",
        "إمكانية الاسترجاع المجاني السلس خلال 15 يوماً من تاريخ الاستلام"
      ],
      specs: {
        "العلامة التجارية": t.brand,
        "رقم الموديل": "N" + (800000 + startId + i) + "KSA",
        "حالة المنتج": "أصلي جديد 100%",
        "الشحن": "نون إكسبريس السريع",
        "الضمان": "سنتين ضمان الوكيل بالسعودية"
      }
    });
  }
  return generated;
}

// يبدأ المتجر بـ 64 منتجاً جاهزاً (الـ 14 الأساسية + 50 منتجاً إضافياً)
export const initialProducts = [...baseCatalog, ...generateBulkProducts(50, 200)];

export const initialOrders = [
  { id: 101, orderNumber: "NOON-KSA-88412", customerName: "عبدالله الغامدي", customerPhone: "0551234567", city: "الرياض", address: "حي الملقا، طريق الملك فهد", paymentMethod: "بطاقة مدى / فيزا", totalAmount: 5199, status: "خرج للتوصيل" },
  { id: 102, orderNumber: "NOON-KSA-91204", customerName: "سارة القحطاني", customerPhone: "0509876543", city: "جدة", address: "حي الروضة، شارع التحلية", paymentMethod: "تابي / تمارا (4 دفعات)", totalAmount: 2298, status: "تم التسليم" }
];`,

  'src/app/api/products/route.js': `import { NextResponse } from 'next/server';
import { initialProducts } from '../../../lib/storeData';

let productsDB = [...initialProducts];

export async function GET() {
  return NextResponse.json(productsDB);
}

export async function POST(request) {
  const body = await request.json();
  const newProd = {
    id: Date.now(),
    brand: body.brand || "نون السعودية",
    sku: "N" + Math.floor(100000 + Math.random() * 900000) + "A",
    title: body.title,
    category: body.category,
    price: Number(body.price),
    oldPrice: Number(body.oldPrice),
    rating: 4.9,
    reviews: 215,
    express: true,
    isMegaDeal: Boolean(body.isMegaDeal),
    isBestseller: true,
    badge: body.badge || "جديد",
    soldCount: "+250 تم بيعها مؤخراً",
    image: body.image,
    gallery: [body.image],
    colors: ["اللون القياسي", "إصدار خاص"],
    sizes: ["الحجم الأساسي"],
    highlights: [
      "منتج أصلي 100% متوفر في مستودعات نون السعودية للشحن الفوري",
      "ضمان الوكيل المعتمد لمدة 24 شهراً مع خدمة إرجاع مجاني"
    ],
    specs: {
      "العلامة التجارية": body.brand || "ماركة مسجلة",
      "القسم": body.category,
      "الضمان": "سنتين ضمان الوكيل"
    }
  };
  productsDB.unshift(newProd);
  return NextResponse.json(newProd, { status: 201 });
}`,

  'src/app/api/orders/route.js': `import { NextResponse } from 'next/server';
import { initialOrders } from '../../../lib/storeData';

let ordersDB = [...initialOrders];

export async function GET() {
  return NextResponse.json(ordersDB);
}

export async function POST(request) {
  const body = await request.json();
  const newOrder = {
    id: Date.now(),
    orderNumber: "NOON-KSA-" + Math.floor(10000 + Math.random() * 90000),
    customerName: body.customerName,
    customerPhone: body.customerPhone,
    city: body.city,
    address: body.address,
    paymentMethod: body.paymentMethod,
    totalAmount: Number(body.totalAmount),
    status: "قيد التجهيز"
  };
  ordersDB.unshift(newOrder);
  return NextResponse.json(newOrder, { status: 201 });
}`,

  // الواجهة الرئيسية + صفحة تفاصيل المنتج الكاملة + أيقونات SVG الاحترافية
  'src/app/page.jsx': `"use client";
import { useState, useEffect } from "react";
import { initialProducts, trendingKeywords, quickCircles } from "../lib/storeData";

// مجموعة أيقونات SVG احترافية مطابقة لتصميم نون (بدون أي إيموجي)
const Icons = {
  Search: () => (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  ),
  Cart: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  Heart: ({ filled }) => (
    <svg className={"w-4 h-4 transition " + (filled ? "text-red-500 fill-red-500" : "text-gray-500 fill-none")} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  User: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Pin: () => (
    <svg className="w-4 h-4 text-noonDark shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  Home: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Grid: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Tag: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  Truck: () => (
    <svg className="w-5 h-5 text-noonBlue shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-5 h-5 text-noonGreen shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Star: () => (
    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  Back: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
};

export default function NoonSaudiStore() {
  const [products, setProducts] = useState(initialProducts);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [sortBy, setSortBy] = useState("popular");
  const [city, setCity] = useState("الرياض");
  const [showAppBanner, setShowAppBanner] = useState(true);

  // حالة فتح صفحة تفاصيل المنتج الكاملة (Full Product Page State)
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoriesDrawerOpen, setIsCategoriesDrawerOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountRate, setDiscountRate] = useState(0);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("بطاقة مدى / فيزا");

  useEffect(() => {
    const savedProds = localStorage.getItem("noon_prods_v4");
    if (savedProds) setProducts(JSON.parse(savedProds));
    const savedUser = localStorage.getItem("noon_user_v4");
    if (savedUser) setUserName(savedUser);

    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % trendingKeywords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // فتح صفحة المنتج الكاملة
  function openFullProductPage(p) {
    setActiveProduct(p);
    setActiveImage(p.image);
    setSelectedColor(p.colors?.[0] || "اللون القياسي");
    setSelectedSize(p.sizes?.[0] || "النسخة القياسية");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  let filtered = products.filter((p) => {
    const matchCat =
      category === "all"
        ? true
        : category === "deals"
        ? p.isMegaDeal
        : category === "wishlist"
        ? wishlist.includes(p.id)
        : p.category === category;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);

  const megaDealsList = products.filter((p) => p.isMegaDeal).slice(0, 4);
  const bestsellersList = products.filter((p) => p.isBestseller).slice(0, 10);

  function addToCart(product) {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  }

  function updateQty(id, delta) {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0)
    );
  }

  function toggleWishlist(id) {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  function applyCoupon() {
    const code = couponCode.trim().toUpperCase();
    if (code === "KSA15" || code === "ALBILAD") {
      setDiscountRate(0.15);
      alert("تم تفعيل كود الخصم 15% بنجاح!");
    } else {
      alert("كود الخصم غير صحيح، جرّب: KSA15 أو ALBILAD");
    }
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const finalTotal = Math.round(subtotal * (1 - discountRate));
  const vat = Math.round(finalTotal * 0.15);
  const totalCartCount = cart.reduce((s, i) => s + i.qty, 0);

  async function handleCheckout(e) {
    e.preventDefault();
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName,
        customerPhone,
        city,
        address,
        paymentMethod,
        totalAmount: finalTotal,
      }),
    });
    const order = await res.json();
    const savedOrders = JSON.parse(localStorage.getItem("noon_orders_v4") || "[]");
    localStorage.setItem("noon_orders_v4", JSON.stringify([order, ...savedOrders]));
    alert("شكراً لتسوقك من نون السعودية!\\nتم تأكيد طلبك بنجاح ورقم الشحنة: " + order.orderNumber);
    setCart([]);
    setDiscountRate(0);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  }

  const categoriesList = [
    { name: "جميع الفئات", val: "all" },
    { name: "عروض الميجا", val: "deals" },
    { name: "الجوالات", val: "الجوالات" },
    { name: "الإلكترونيات", val: "الإلكترونيات" },
    { name: "المنزل والمطبخ", val: "المنزل والمطبخ" },
    { name: "العطور والجمال", val: "العطور والجمال" },
    { name: "الأزياء", val: "الأزياء" },
    { name: "السوبرماركت", val: "السوبرماركت" },
    { name: "ألعاب الفيديو", val: "الألعاب" },
    { name: "صُنع في السعودية", val: "صُنع في السعودية" },
  ];

  // بطاقة منتج مطابقة 100% لبطاقة موقع نون السعودية الرسمي
  function ProductCard({ p }) {
    const disc = Math.max(0, Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100));
    const isFav = wishlist.includes(p.id);
    return (
      <div
        onClick={() => openFullProductPage(p)}
        className="cursor-pointer bg-white rounded-xl p-2.5 sm:p-3 border border-noonBorder hover:shadow-lg transition-all flex flex-col justify-between relative group"
      >
        <div>
          {/* شريط الشارة العلوية وزر المفضلة SVG */}
          <div className="flex justify-between items-center mb-1.5 z-10 relative">
            <span className="bg-noonDark text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full truncate max-w-[125px]">
              {p.badge}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(p.id);
              }}
              className="w-7 h-7 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center hover:scale-110 transition"
              aria-label="المفضلة"
            >
              <Icons.Heart filled={isFav} />
            </button>
          </div>

          {/* صورة المنتج مع زر الإضافة السريع مثل نون */}
          <div className="relative h-40 sm:h-48 flex items-center justify-center my-1 bg-[#F8F9FB] rounded-lg overflow-hidden p-2">
            <img
              src={p.image}
              alt={p.title}
              className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-300"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p);
              }}
              className="absolute bottom-2 left-2 w-8 h-8 rounded-lg bg-white hover:bg-noonYellow text-noonDark shadow-md border border-gray-200 flex items-center justify-center transition"
              title="أضف إلى العربة"
            >
              <Icons.Cart />
            </button>
          </div>

          {/* شارة التقييم */}
          <div className="flex items-center gap-1 mt-2 mb-1">
            <span className="bg-[#F3F4F8] text-noonDark text-[10px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <span>{p.rating}</span>
              <span className="text-noonGreen"><Icons.Star /></span>
            </span>
            <span className="text-[10px] text-gray-400 font-semibold">({p.reviews})</span>
          </div>

          {/* عنوان المنتج */}
          <h3 className="text-[11px] sm:text-xs font-bold text-noonDark line-clamp-2 h-8 sm:h-9 group-hover:text-noonBlue leading-snug">
            {p.title}
          </h3>
        </div>

        {/* السعر وشارة نون إكسبريس */}
        <div className="mt-2 pt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] font-bold text-gray-500">ر.س</span>
            <span className="text-base sm:text-lg font-black text-noonDark tracking-tight">
              {Number(p.price).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs">
            <span className="line-through text-gray-400">
              {Number(p.oldPrice).toLocaleString()}
            </span>
            <span className="text-noonGreen font-extrabold">{disc}% خصم</span>
          </div>

          {p.soldCount && (
            <p className="text-[9px] text-gray-500 mt-1 truncate font-medium">{p.soldCount}</p>
          )}

          <div className="mt-2 pt-1.5 border-t border-gray-100 flex items-center justify-between">
            <span className="express-pill">إكسبريس</span>
            <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold">
              توصيل غداً
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. شريط التطبيق العلوي للجوال */}
      {showAppBanner && (
        <div className="md:hidden bg-[#1D212D] text-white px-3 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <button onClick={() => setShowAppBanner(false)} className="text-gray-400 text-sm px-1">✕</button>
            <div className="w-8 h-8 bg-noonYellow text-noonDark rounded-lg flex items-center justify-center font-black text-lg">n</div>
            <div className="leading-tight">
              <p className="font-bold text-[11px]">نون أفضل عبر التطبيق</p>
              <p className="text-[10px] text-gray-300">خصم إضافي 15% على أول طلب</p>
            </div>
          </div>
          <button onClick={() => setCategory("deals")} className="bg-noonYellow text-noonDark font-black px-3 py-1 rounded text-xs">
            افتح
          </button>
        </div>
      )}

      {/* 2. الهيدر الأصفر الرسمي لنون السعودية */}
      <header className="bg-noonYellow sticky top-0 z-40 shadow-xs border-b border-yellow-400">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-4 py-2.5 space-y-2">
          <div className="flex items-center justify-between gap-2.5 sm:gap-5">
            <div className="flex items-center gap-2 sm:gap-5 shrink-0">
              <button
                onClick={() => setIsCategoriesDrawerOpen(true)}
                className="md:hidden text-noonDark p-1"
                aria-label="القائمة"
              >
                <Icons.Menu />
              </button>

              <button
                onClick={() => {
                  setActiveProduct(null);
                  setCategory("all");
                  setSearch("");
                }}
                className="flex items-center gap-1.5"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-noonDark text-noonYellow rounded-full flex items-center justify-center font-black text-lg sm:text-xl">
                  n
                </div>
                <span className="font-black text-2xl sm:text-3xl text-noonDark tracking-tighter">
                  noon
                </span>
              </button>

              <div
                onClick={() => setIsCityModalOpen(true)}
                className="hidden md:flex items-center gap-2 bg-white/45 hover:bg-white/70 px-3 py-1.5 rounded-lg text-xs cursor-pointer transition"
              >
                <img src="https://flagcdn.com/w40/sa.png" alt="KSA" className="w-6 h-4 object-cover rounded-xs" />
                <div className="leading-tight">
                  <span className="text-gray-700 block text-[10px]">التوصيل إلى</span>
                  <strong className="font-black text-noonDark">{city} ▾</strong>
                </div>
              </div>
            </div>

            {/* شريط البحث الاحترافي */}
            <div className="flex-1 max-w-3xl relative">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setActiveProduct(null);
                  setSearch(e.target.value);
                }}
                placeholder={"ما الذي تبحث عنه؟ جرّب: " + trendingKeywords[placeholderIdx]}
                className="w-full py-2 sm:py-2.5 pr-4 pl-10 rounded-lg bg-white text-xs sm:text-sm text-noonDark focus:outline-none shadow-inner"
              />
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                <Icons.Search />
              </span>
            </div>

            {/* أزرار الحساب، المفضلة، والعربة */}
            <div className="hidden md:flex items-center gap-4 text-xs sm:text-sm font-bold text-noonDark shrink-0">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hover:opacity-75 border-l border-noonDark/20 pl-4 flex items-center gap-1.5"
              >
                <span>{userName ? "أهلاً، " + userName : "تسجيل الدخول"}</span>
                <Icons.User />
              </button>

              <button
                onClick={() => {
                  setActiveProduct(null);
                  setCategory("wishlist");
                }}
                className="hover:opacity-75 border-l border-noonDark/20 pl-4 flex items-center gap-1.5"
              >
                <span>المفضلة</span>
                <Icons.Heart filled={wishlist.length > 0} />
                {wishlist.length > 0 && (
                  <span className="bg-red-600 text-white text-[10px] px-1.5 rounded-full">{wishlist.length}</span>
                )}
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-noonDark text-noonYellow px-4 py-2 rounded-lg flex items-center gap-2 shadow-xs"
              >
                <Icons.Cart />
                <span>العربة</span>
                <span className="bg-noonBlue text-white text-xs px-2 py-0.2 rounded-full font-black">
                  {totalCartCount}
                </span>
              </button>
            </div>

            {/* زر المفضلة للموبايل */}
            <button
              onClick={() => {
                setActiveProduct(null);
                setCategory("wishlist");
              }}
              className="md:hidden bg-white/70 p-2 rounded-lg relative shrink-0"
            >
              <Icons.Heart filled={wishlist.length > 0} />
            </button>
          </div>
        </div>

        {/* شريط التوصيل إلى المدينة على الجوال */}
        <div
          onClick={() => setIsCityModalOpen(true)}
          className="md:hidden bg-[#FFF9B0] px-3 py-1.5 flex items-center justify-between text-xs border-t border-yellow-300 cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <Icons.Pin />
            <span className="text-gray-700">التوصيل إلى</span>
            <strong className="font-black text-noonDark underline">{city}</strong>
          </div>
          <span className="text-[10px] font-bold text-noonBlue">تغيير الموقع ◀</span>
        </div>
      </header>

      {/* 3. شريط التصنيفات الرئيسية */}
      <nav className="bg-white border-b border-noonBorder py-2 px-3 sm:px-4 shadow-2xs sticky top-[96px] md:top-[62px] z-30">
        <div className="max-w-[1440px] mx-auto flex items-center gap-5 sm:gap-7 overflow-x-auto no-scrollbar text-xs sm:text-sm font-bold">
          <button
            onClick={() => setIsCategoriesDrawerOpen(true)}
            className="text-noonBlue flex items-center gap-1.5 shrink-0 border-l pl-4 border-gray-200 font-black"
          >
            <Icons.Grid />
            <span>جميع الفئات</span>
          </button>
          {categoriesList.map((cat) => (
            <button
              key={cat.val}
              onClick={() => {
                setActiveProduct(null);
                setCategory(cat.val);
                setSearch("");
              }}
              className={
                category === cat.val && !activeProduct
                  ? "text-noonBlue border-b-2 border-noonBlue pb-0.5 shrink-0 font-black"
                  : "hover:text-noonBlue shrink-0 text-noonDark"
              }
            >
              {cat.name}
            </button>
          ))}
        </div>
      </nav>

      {/* ===================================================================== */}
      {/* عرض إما: 1) صفحة تفاصيل المنتج الكاملة (PDP) أو 2) الصفحة الرئيسية للمتجر */}
      {/* ===================================================================== */}
      {activeProduct ? (
        /* صفحة تفاصيل المنتج الكاملة بنفس تصميم نون السعودية (Full Noon PDP) */
        <main className="max-w-[1380px] w-full mx-auto px-3 sm:px-4 py-4 sm:py-6 flex-1 space-y-6">
          {/* شريط مسار التنقل والرجوع (Breadcrumbs) */}
          <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-noonBorder text-xs">
            <div className="flex items-center gap-2 text-gray-500 overflow-x-auto no-scrollbar">
              <button onClick={() => setActiveProduct(null)} className="hover:text-noonBlue font-bold text-noonDark flex items-center gap-1">
                <Icons.Back />
                <span>العودة للمتجر</span>
              </button>
              <span>/</span>
              <button
                onClick={() => {
                  setCategory(activeProduct.category);
                  setActiveProduct(null);
                }}
                className="hover:text-noonBlue font-semibold shrink-0"
              >
                {activeProduct.category}
              </button>
              <span>/</span>
              <span className="text-gray-400 truncate max-w-[200px] sm:max-w-md">{activeProduct.title}</span>
            </div>
            <span className="text-[11px] text-gray-400 hidden sm:inline">رقم الموديل: {activeProduct.sku || "N534891A"}</span>
          </div>

          {/* الشبكة الثلاثية لصفحة منتج نون: (المعرض يمين + المواصفات والسعر وسط + البائع والضمان يسار) */}
          <div className="bg-white rounded-2xl border border-noonBorder p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 shadow-xs">
            
            {/* العمود الأول: معرض صور المنتج (Gallery) */}
            <div className="lg:col-span-4 flex flex-col-reverse sm:flex-row gap-3">
              {/* الصور المصغرة */}
              <div className="flex sm:flex-col gap-2 overflow-x-auto no-scrollbar shrink-0">
                {(activeProduct.gallery || [activeProduct.image]).map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(imgUrl)}
                    className={
                      "w-16 h-16 rounded-lg border-2 p-1 bg-gray-50 shrink-0 transition " +
                      (activeImage === imgUrl ? "border-noonBlue" : "border-gray-200")
                    }
                  >
                    <img src={imgUrl} className="w-full h-full object-contain" alt="thumb" />
                  </button>
                ))}
              </div>

              {/* الصورة الرئيسية المكبرة */}
              <div className="flex-1 bg-[#F8F9FB] rounded-xl p-4 flex items-center justify-center relative min-h-[300px] sm:min-h-[380px] border border-gray-100">
                <span className="absolute top-3 right-3 bg-noonDark text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {activeProduct.badge}
                </span>
                <button
                  onClick={() => toggleWishlist(activeProduct.id)}
                  className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white shadow border flex items-center justify-center"
                >
                  <Icons.Heart filled={wishlist.includes(activeProduct.id)} />
                </button>
                <img
                  src={activeImage || activeProduct.image}
                  alt={activeProduct.title}
                  className="max-h-[320px] w-full object-contain mix-blend-multiply"
                />
              </div>
            </div>

            {/* العمود الثاني: تفاصيل السعر، الخيارات، وتقسيط تابي وتمارا */}
            <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-l border-gray-100 pb-5 lg:pb-0 lg:pl-6">
              <div>
                <span className="text-xs font-extrabold text-noonBlue uppercase tracking-wide">
                  {activeProduct.brand || activeProduct.category}
                </span>
                <h1 className="text-base sm:text-xl font-black text-noonDark leading-relaxed mt-1">
                  {activeProduct.title}
                </h1>

                <div className="flex items-center gap-3 mt-2">
                  <span className="bg-noonGreen text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    {activeProduct.rating} <Icons.Star />
                  </span>
                  <span className="text-xs text-noonBlue font-bold underline cursor-pointer">
                    {activeProduct.reviews} تقييم موثق من عملاء السعودية
                  </span>
                </div>
              </div>

              {/* صندوق السعر والخصم */}
              <div className="bg-[#F8F9FB] p-3.5 rounded-xl space-y-1 border border-gray-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-gray-500 font-bold">الآن:</span>
                  <span className="text-2xl sm:text-3xl font-black text-noonDark">
                    {Number(activeProduct.price).toLocaleString()} <span className="text-sm">ر.س</span>
                  </span>
                  <span className="text-xs text-gray-400">(شامل ضريبة القيمة المضافة 15%)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400">كان: <del>{Number(activeProduct.oldPrice).toLocaleString()} ر.س</del></span>
                  <span className="bg-green-100 text-noonGreen font-extrabold px-2 py-0.5 rounded">
                    وفّرت {(activeProduct.oldPrice - activeProduct.price).toLocaleString()} ر.س ({Math.round(((activeProduct.oldPrice - activeProduct.price) / activeProduct.oldPrice) * 100)}%)
                  </span>
                </div>
              </div>

              {/* صندوق تقسيط تابي وتمارا الرسمي */}
              <div className="border border-emerald-200 bg-emerald-50/50 p-3 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-noonDark">
                    قسّمها على 4 دفعات شهرية بقيمة <strong className="text-noonBlue text-sm">{Math.round(activeProduct.price / 4).toLocaleString()} ر.س</strong>
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5">بدون أي فوائد أو رسوم تأخير عبر تابي أو تمارا</p>
                </div>
                <div className="flex gap-1.5 shrink-0 font-black">
                  <span className="bg-white border px-2 py-1 rounded text-emerald-700">tabby</span>
                  <span className="bg-white border px-2 py-1 rounded text-pink-700">tamara</span>
                </div>
              </div>

              {/* اختيار اللون */}
              {activeProduct.colors && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-gray-500">
                    اللون المختار: <strong className="text-noonDark">{selectedColor}</strong>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.colors.map((col) => (
                      <button
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        className={
                          "px-3 py-1.5 rounded-lg text-xs font-bold border transition " +
                          (selectedColor === col
                            ? "border-noonBlue bg-blue-50 text-noonBlue"
                            : "border-gray-200 hover:border-gray-400")
                        }
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* اختيار السعة أو المقاس */}
              {activeProduct.sizes && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-gray-500">
                    السعة / الخيار: <strong className="text-noonDark">{selectedSize}</strong>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={
                          "px-3 py-1.5 rounded-lg text-xs font-bold border transition " +
                          (selectedSize === sz
                            ? "border-noonBlue bg-blue-50 text-noonBlue"
                            : "border-gray-200 hover:border-gray-400")
                        }
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* أزرار الإضافة للعربة والشراء الفوري */}
              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => addToCart(activeProduct)}
                  className="flex-1 bg-noonBlue hover:bg-blue-700 text-white font-black py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow transition"
                >
                  <Icons.Cart />
                  <span>إضافة إلى عربة التسوق</span>
                </button>
                <button
                  onClick={() => {
                    addToCart(activeProduct);
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="bg-noonYellow hover:bg-yellow-300 text-noonDark font-black px-6 py-3.5 rounded-xl text-sm transition"
                >
                  اشترِ الآن
                </button>
              </div>
            </div>

            {/* العمود الثالث: معلومات التوصيل، الضمان، والبائع (Buy Box) */}
            <div className="lg:col-span-3 space-y-3 text-xs">
              <div className="bg-[#F8F9FB] p-4 rounded-xl border border-gray-100 space-y-3">
                <div className="flex items-center justify-between border-b pb-2.5">
                  <span className="express-pill">إكسبريس</span>
                  <span className="text-noonGreen font-extrabold">متوفر في المخزون</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Icons.Truck />
                  <div>
                    <p className="font-bold text-noonDark">توصيل مجاني غداً إلى {city}</p>
                    <p className="text-[11px] text-gray-500">اطلب خلال 5 ساعات و 20 دقيقة للحصول عليه غداً</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Icons.Shield />
                  <div>
                    <p className="font-bold text-noonDark">ضمان الوكيل لمدة سنتين</p>
                    <p className="text-[11px] text-gray-500">منتج أصلي 100% معتمد في السعودية</p>
                  </div>
                </div>

                <div className="border-t pt-2.5 space-y-1">
                  <p className="text-gray-500">يباع ويشحن بواسطة: <strong className="text-noonBlue">نون السعودية (noon)</strong></p>
                  <p className="text-[11px] text-noonGreen font-bold">✓ إرجاع مجاني وسهل خلال 15 يوماً</p>
                  <p className="text-[11px] text-gray-600">✓ الدفع عند الاستلام متاح</p>
                </div>
              </div>

              {/* أبرز المميزات (Highlights) */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2">
                <h3 className="font-black text-noonDark text-sm border-b pb-1.5">أبرز المميزات</h3>
                <ul className="list-disc pr-4 space-y-1.5 text-gray-600 leading-relaxed">
                  {(activeProduct.highlights || [
                    "منتج أصلي 100% مضمون من نون السعودية",
                    "شحن نون إكسبريس سريع ومجاني",
                    "ضمان الوكيل لمدة 24 شهراً"
                  ]).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* جدول المواصفات الكاملة للمنتج (Product Specifications Table) */}
          <div className="bg-white rounded-2xl border border-noonBorder p-5 space-y-4">
            <h2 className="text-base sm:text-lg font-black text-noonDark border-b pb-2">
              المواصفات والتفاصيل الفنية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs sm:text-sm">
              {Object.entries(
                activeProduct.specs || {
                  "العلامة التجارية": activeProduct.brand || "نون",
                  "القسم": activeProduct.category,
                  "الحالة": "جديد وأصلي 100%",
                  "الشحن": "نون إكسبريس السريع",
                  "الضمان": "سنتين ضمان الوكيل بالسعودية"
                }
              ).map(([k, v], i) => (
                <div
                  key={k}
                  className={"flex justify-between p-2.5 rounded-lg " + (i % 2 === 0 ? "bg-gray-50" : "bg-white")}
                >
                  <span className="text-gray-500 font-bold">{k}</span>
                  <span className="font-extrabold text-noonDark">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* منتجات مشابهة مقترحة تحت صفحة المنتج */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-noonDark">منتجات مشابهة قد تعجبك</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
              {products
                .filter((item) => item.category === activeProduct.category && item.id !== activeProduct.id)
                .slice(0, 5)
                .map((item) => (
                  <ProductCard key={item.id} p={item} />
                ))}
            </div>
          </div>

          {/* شريط الإضافة للعربة الثابت أسفل شاشة الموبايل داخل صفحة المنتج */}
          <div className="md:hidden fixed bottom-12 inset-x-0 bg-white border-t border-gray-200 p-3 z-40 flex items-center justify-between gap-3 shadow-2xl">
            <div>
              <span className="text-[10px] text-gray-400 block">السعر شامل الضريبة</span>
              <strong className="text-lg font-black text-noonDark">{Number(activeProduct.price).toLocaleString()} ر.س</strong>
            </div>
            <button
              onClick={() => addToCart(activeProduct)}
              className="flex-1 bg-noonBlue text-white font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <Icons.Cart />
              <span>أضف إلى العربة</span>
            </button>
          </div>
        </main>
      ) : (
        /* ===================================================================== */
        /* الصفحة الرئيسية للمتجر (MAIN STOREFRONT VIEW) */
        /* ===================================================================== */
        <main className="max-w-[1440px] w-full mx-auto px-3 sm:px-4 py-4 flex-1 space-y-6">
          {/* شريط العروض البنكية السعودية */}
          <div className="bg-noonDark text-white rounded-xl py-2 px-4 flex flex-wrap items-center justify-between text-[11px] sm:text-xs gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-noonYellow text-noonDark font-black px-2 py-0.5 rounded">عروض البنوك السعودية</span>
              <span>خصم إضافي 15% لحاملي بطاقات مصرف البلاد ومدى بكود <strong className="text-noonYellow">ALBILAD</strong> أو <strong className="text-noonYellow">KSA15</strong></span>
            </div>
            <span className="text-noonYellow font-bold">توصيل إكسبريس مجاني</span>
          </div>

          {/* البانر الإعلاني الرئيسي */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
            <div className="lg:col-span-9 bg-gradient-to-l from-[#14161D] via-[#232838] to-noonDark rounded-2xl p-5 sm:p-9 text-white flex flex-col justify-center relative overflow-hidden min-h-[190px] sm:min-h-[260px]">
              <div className="z-10 max-w-lg space-y-2.5 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-noonYellow text-noonDark font-black text-[10px] sm:text-xs px-3 py-0.5 rounded-full">
                    مهرجان نون السعودية
                  </span>
                  <span className="bg-red-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                    عروض حصرية
                  </span>
                </div>
                <h1 className="text-xl sm:text-4xl font-black leading-tight">
                  خصومات كبرى تصل إلى <span className="text-noonYellow">70%</span> على الإلكترونيات والأزياء
                </h1>
                <p className="text-gray-300 text-[11px] sm:text-sm">
                  قسّط مشترياتك على 4 دفعات بدون فوائد مع تابي وتمارا • ضمان الوكيل سنتين
                </p>
                <button
                  onClick={() => setCategory("deals")}
                  className="bg-noonYellow text-noonDark font-black px-6 py-2.5 rounded-lg text-xs sm:text-sm shadow hover:bg-yellow-300 transition w-fit"
                >
                  تسوق العروض الآن
                </button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80"
                alt="Noon KSA"
                className="absolute left-0 top-0 h-full w-2/5 object-cover opacity-45 sm:opacity-65"
              />
            </div>

            <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3">
              <div
                onClick={() => setCategory("السوبرماركت")}
                className="cursor-pointer bg-gradient-to-br from-emerald-800 to-teal-950 rounded-2xl p-4 text-white flex flex-col justify-between"
              >
                <span className="text-[10px] bg-noonYellow text-black font-black px-2 py-0.5 rounded w-fit">
                  نون سوبرماركت
                </span>
                <h3 className="font-black text-sm sm:text-lg mt-1">اشترِ 5 واحصل على 5% كاش باك</h3>
                <span className="text-[11px] font-bold text-noonYellow">تسوق البقالة ←</span>
              </div>
              <div
                onClick={() => setCategory("صُنع في السعودية")}
                className="cursor-pointer bg-gradient-to-br from-amber-900 to-stone-900 rounded-2xl p-4 text-white flex flex-col justify-between"
              >
                <span className="text-[10px] bg-white text-amber-900 font-black px-2 py-0.5 rounded w-fit">
                  برنامج محلي 🇸🇦
                </span>
                <h3 className="font-black text-sm sm:text-lg mt-1">منتجات سعودية أصلية فاخرة</h3>
                <span className="text-[11px] font-bold text-noonYellow">اكتشف المحلي ←</span>
              </div>
            </div>
          </section>

          {/* الدوائر السريعة بصور المنتجات الحقيقية داخل إطارات نون الصفراء (بدون أي إيموجي) */}
          <section className="bg-white p-4 sm:p-5 rounded-2xl border border-noonBorder shadow-2xs">
            <div className="grid grid-rows-2 grid-flow-col gap-x-4 sm:gap-x-6 gap-y-4 overflow-x-auto no-scrollbar py-1">
              {quickCircles.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCategory(item.cat);
                    setSearch("");
                  }}
                  className="flex flex-col items-center gap-1.5 w-20 sm:w-24 shrink-0 group"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-noonYellow p-1 relative shadow-xs group-hover:scale-105 transition">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-noonDark text-noonYellow text-[8px] sm:text-[9px] font-extrabold px-1.5 py-0.2 rounded-full whitespace-nowrap shadow">
                      {item.badge}
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-extrabold text-noonDark text-center line-clamp-1 mt-1 group-hover:text-noonBlue">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* قسم عروض الميجا بالخلفية الصفراء المميزة لنون */}
          {category === "all" && !search && (
            <section className="bg-noonYellow p-4 sm:p-5 rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-base sm:text-2xl font-black text-noonDark">
                    عروض الميجا في السعودية
                  </h2>
                  <span className="bg-red-600 text-white text-[10px] sm:text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                    تنتهي خلال 08:14:52
                  </span>
                </div>
                <button
                  onClick={() => setCategory("deals")}
                  className="bg-noonDark text-white text-xs font-bold px-3.5 py-1.5 rounded-lg"
                >
                  عرض الكل
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
                {megaDealsList.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            </section>
          )}

          {/* شريط الأكثر مبيعاً القابل للسحب */}
          {category === "all" && !search && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-xl font-black text-noonDark">
                  الأكثر مبيعاً في {city}
                </h2>
                <span className="text-xs text-noonBlue font-bold">اسحب لليسار ←</span>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {bestsellersList.map((p) => (
                  <div key={p.id} className="w-[170px] sm:w-[225px] shrink-0">
                    <ProductCard p={p} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* شبكة كافة المنتجات مع شريط الفرز */}
          <section className="space-y-3">
            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-noonBorder flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-lg font-black text-noonDark">
                  {search
                    ? "نتائج البحث عن: " + search
                    : category === "all"
                    ? "جميع المنتجات في متجر نون السعودية"
                    : category === "deals"
                    ? "عروض الميجا والتصفية الكبرى"
                    : category === "wishlist"
                    ? "قائمة المفضلة"
                    : "قسم " + category}
                </h2>
                <span className="text-xs bg-noonYellow text-noonDark px-2.5 py-0.5 rounded-full font-black">
                  {filtered.length} منتج
                </span>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-bold bg-white"
              >
                <option value="popular">الترتيب: الأكثر شعبية</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="rating">الأعلى تقييماً</option>
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          </section>
        </main>
      )}

      {/* الفوتر الرسمي */}
      <footer className="bg-white border-t border-noonBorder mt-12">
        <div className="max-w-[1440px] mx-auto px-4 py-6 flex flex-wrap justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 نون السعودية للتسوق أونلاين. جميع الحقوق محفوظة.</p>
          <div className="flex flex-wrap items-center gap-2 font-bold text-noonDark">
            <span className="border px-2.5 py-1 rounded bg-gray-50">mada مدى</span>
            <span className="border px-2.5 py-1 rounded bg-gray-50">Apple Pay</span>
            <span className="border px-2.5 py-1 rounded bg-gray-50">VISA</span>
            <span className="border px-2.5 py-1 rounded bg-gray-50 text-emerald-700">tabby تابي</span>
            <span className="border px-2.5 py-1 rounded bg-gray-50 text-pink-700">tamara تمارا</span>
          </div>
        </div>
      </footer>

      {/* شريط التنقل السفلي الثابت للتليفون بأيقونات SVG نظيفة */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-40 grid grid-cols-5 py-2 text-[10px] font-bold text-gray-500 shadow-lg">
        <button
          onClick={() => {
            setActiveProduct(null);
            setCategory("all");
            setSearch("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={"flex flex-col items-center gap-1 " + (category === "all" && !activeProduct ? "text-noonBlue font-black" : "")}
        >
          <Icons.Home />
          <span>الرئيسية</span>
        </button>

        <button onClick={() => setIsCategoriesDrawerOpen(true)} className="flex flex-col items-center gap-1">
          <Icons.Grid />
          <span>الفئات</span>
        </button>

        <button
          onClick={() => {
            setActiveProduct(null);
            setCategory("deals");
          }}
          className={"flex flex-col items-center gap-1 " + (category === "deals" ? "text-red-600 font-black" : "")}
        >
          <Icons.Tag />
          <span>العروض</span>
        </button>

        <button onClick={() => setIsAuthModalOpen(true)} className="flex flex-col items-center gap-1">
          <Icons.User />
          <span>{userName ? userName : "حسابي"}</span>
        </button>

        <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center gap-1 relative text-noonDark font-black">
          <Icons.Cart />
          <span>العربة</span>
          {totalCartCount > 0 && (
            <span className="absolute -top-1 right-4 bg-noonBlue text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>

      {/* درج الفئات للجوال */}
      {isCategoriesDrawerOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex">
          <div className="bg-white w-72 h-full p-4 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-black text-base text-noonDark">جميع فئات نون السعودية</h3>
                <button onClick={() => setIsCategoriesDrawerOpen(false)} className="text-lg font-bold">✕</button>
              </div>
              <div className="space-y-1">
                {categoriesList.map((c) => (
                  <button
                    key={c.val}
                    onClick={() => {
                      setActiveProduct(null);
                      setCategory(c.val);
                      setIsCategoriesDrawerOpen(false);
                    }}
                    className="w-full text-right p-2.5 rounded-lg hover:bg-noonYellow/40 font-bold text-xs flex justify-between items-center"
                  >
                    <span>{c.name}</span>
                    <span>◀</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsCategoriesDrawerOpen(false)} />
        </div>
      )}

      {/* نافذة اختيار المدينة */}
      {isCityModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-black text-sm sm:text-base">اختر مدينة التوصيل في السعودية</h3>
              <button onClick={() => setIsCityModalOpen(false)} className="font-bold">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-bold">
              {["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة", "الخبر", "أبها", "تبوك"].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCity(c);
                    setIsCityModalOpen(false);
                  }}
                  className={"p-2.5 border rounded-xl text-right " + (city === c ? "bg-noonYellow border-noonDark" : "hover:bg-gray-50")}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* درج عربة التسوق */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col justify-between p-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-black text-base sm:text-lg">عربة التسوق ({city})</h3>
              <button onClick={() => setIsCartOpen(false)} className="font-bold text-xl">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cart.length === 0 ? (
                <p className="text-center text-gray-400 py-12 font-bold">عربة التسوق فارغة</p>
              ) : (
                cart.map((i) => (
                  <div key={i.id} className="flex items-center gap-3 border p-2.5 rounded-xl">
                    <img src={i.image} className="w-14 h-14 object-contain rounded-lg bg-gray-50" />
                    <div className="flex-1 text-xs">
                      <h4 className="font-bold line-clamp-1">{i.title}</h4>
                      <div className="font-black text-noonBlue mt-0.5">{i.price.toLocaleString()} ر.س</div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button onClick={() => updateQty(i.id, -1)} className="w-6 h-6 border rounded font-bold">-</button>
                        <span className="font-bold">{i.qty}</span>
                        <button onClick={() => updateQty(i.id, 1)} className="w-6 h-6 border rounded font-bold">+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t pt-3 space-y-2.5 text-xs">
                <div className="flex gap-2">
                  <input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="كود الخصم (KSA15 أو ALBILAD)"
                    className="flex-1 border rounded-lg px-2.5 py-2 uppercase"
                  />
                  <button onClick={applyCoupon} className="bg-noonDark text-white px-4 py-2 rounded-lg font-bold">تطبيق</button>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>ضريبة القيمة المضافة (15% شاملة):</span>
                  <span>{vat.toLocaleString()} ر.س</span>
                </div>
                <div className="flex justify-between text-base font-black text-noonDark">
                  <span>الإجمالي النهائي:</span>
                  <span>{finalTotal.toLocaleString()} ر.س</span>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-noonBlue text-white font-black py-3 rounded-xl text-sm shadow"
                >
                  إتمام الشراء والدفع ({finalTotal.toLocaleString()} ر.س)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* نافذة إتمام الطلب */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCheckout} className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-3 text-xs sm:text-sm">
            <h3 className="font-black text-base sm:text-lg border-b pb-2">عنوان التوصيل والدفع الآمن في السعودية</h3>
            <input required value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="الاسم الكامل للمستلم" className="w-full border p-2.5 rounded-lg" />
            <input required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="رقم الجوال السعودي (05XXXXXXXX)" className="w-full border p-2.5 rounded-lg" />
            <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder={"العنوان التفصيلي في " + city} className="w-full border p-2.5 rounded-lg" />
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border p-2.5 rounded-lg font-bold bg-white">
              <option value="بطاقة مدى / فيزا">بطاقة مدى / فيزا</option>
              <option value="تابي / تمارا (4 دفعات)">تقسيط تابي / تمارا (4 دفعات بدون فوائد)</option>
              <option value="Apple Pay">Apple Pay</option>
              <option value="الدفع عند الاستلام">الدفع عند الاستلام</option>
            </select>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="flex-1 bg-noonGreen text-white font-black py-2.5 rounded-lg">تأكيد الطلب الآن</button>
              <button type="button" onClick={() => setIsCheckoutOpen(false)} className="px-4 border rounded-lg">إلغاء</button>
            </div>
          </form>
        </div>
      )}

      {/* نافذة تسجيل الدخول */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 text-center">
            <div className="w-12 h-12 bg-noonYellow text-noonDark rounded-full flex items-center justify-center font-black text-2xl mx-auto">n</div>
            <h3 className="font-black text-base">مرحباً بك في نون السعودية</h3>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="أدخل اسمك الكريم"
              className="w-full border rounded-lg p-2.5 text-center text-sm"
            />
            <button
              onClick={() => {
                localStorage.setItem("noon_user_v4", userName);
                setIsAuthModalOpen(false);
              }}
              className="w-full bg-noonDark text-noonYellow font-black py-2.5 rounded-lg text-sm"
            >
              حفظ ودخول
            </button>
          </div>
        </div>
      )}
    </div>
  );
}`,

  // لوحة تحكم الإدارة والتجار المستقلة على الرابط /admin مع زر استيراد 100 منتج دفعة واحدة
  'src/app/admin/page.jsx': `"use client";
import { useState, useEffect } from "react";
import { initialProducts, initialOrders, generateBulkProducts } from "../../lib/storeData";

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("الجوالات");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const savedProds = localStorage.getItem("noon_prods_v4");
    const savedOrders = localStorage.getItem("noon_orders_v4");
    if (savedProds) setProducts(JSON.parse(savedProds));
    if (savedOrders) setOrders([...JSON.parse(savedOrders), ...initialOrders]);
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("كلمة المرور غير صحيحة! استخدم: admin123");
    }
  }

  async function addProduct(e) {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, price, oldPrice, image, isMegaDeal: true })
    });
    const newProd = await res.json();
    const updated = [newProd, ...products];
    setProducts(updated);
    localStorage.setItem("noon_prods_v4", JSON.stringify(updated));
    setTitle(""); setPrice(""); setOldPrice(""); setImage("");
    alert("تم نشر المنتج في متجر نون بنجاح!");
  }

  // استيراد 100 منتج كامل في المرة الواحدة بضغطة زر
  function import100ProductsBatch() {
    const newBatch = generateBulkProducts(100, Date.now());
    const updated = [...newBatch, ...products];
    setProducts(updated);
    localStorage.setItem("noon_prods_v4", JSON.stringify(updated));
    alert("✅ تم استيراد وإدراج 100 منتج جديد بالكامل في المتجر بنجاح! إجمالي المنتجات الآن: " + updated.length + " منتج.");
  }

  function deleteProduct(id) {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("noon_prods_v4", JSON.stringify(updated));
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-noonDark flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 text-center shadow-2xl">
          <div className="w-12 h-12 bg-noonYellow text-noonDark rounded-full flex items-center justify-center font-black text-2xl mx-auto">n</div>
          <h1 className="font-black text-xl">بوابة الإدارة والتجار - نون السعودية</h1>
          <p className="text-xs text-gray-500">مخصصة للمشرفين فقط (كلمة المرور: admin123)</p>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="أدخل كلمة مرور الإدارة" className="w-full border rounded-lg p-2.5 text-center text-sm" />
          <button type="submit" className="w-full bg-noonBlue text-white font-black py-2.5 rounded-lg text-sm">دخول للوحة التحكم</button>
        </form>
      </div>
    );
  }

  const totalSales = orders.reduce((s, o) => s + Number(o.totalAmount), 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 max-w-[1440px] mx-auto space-y-6">
      <div className="bg-noonDark text-white p-5 rounded-2xl flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="text-xs text-noonYellow font-bold">NOON KSA SELLER & ADMIN PORTAL</span>
          <h1 className="text-xl sm:text-2xl font-black">لوحة تحكم الإدارة المركزية</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={import100ProductsBatch}
            className="bg-noonYellow hover:bg-yellow-300 text-noonDark font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg transition"
          >
            + استيراد 100 منتج دفعة واحدة للمتجر
          </button>
          <button onClick={() => setIsAuthenticated(false)} className="bg-red-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm">
            تسجيل خروج
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border-r-4 border-noonGreen shadow-xs">
          <span className="text-xs text-gray-500 font-bold">إجمالي المبيعات</span>
          <h3 className="text-2xl font-black mt-1">{totalSales.toLocaleString()} ر.س</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border-r-4 border-noonBlue shadow-xs">
          <span className="text-xs text-gray-500 font-bold">إجمالي الطلبات</span>
          <h3 className="text-2xl font-black mt-1">{orders.length} طلب</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border-r-4 border-noonYellow shadow-xs">
          <span className="text-xs text-gray-500 font-bold">عدد المنتجات بالمتجر حالياً</span>
          <h3 className="text-2xl font-black mt-1">{products.length} منتج</h3>
        </div>
      </div>

      <form onSubmit={addProduct} className="bg-white p-5 rounded-xl border space-y-3 text-sm shadow-xs">
        <h2 className="font-black text-lg">إضافة منتج مخصص لمتجر نون</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="اسم المنتج" className="border p-2 rounded" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded font-bold bg-white">
            <option value="الجوالات">الجوالات</option>
            <option value="الإلكترونيات">الإلكترونيات</option>
            <option value="الألعاب">الألعاب</option>
            <option value="المنزل والمطبخ">المنزل والمطبخ</option>
            <option value="العطور والجمال">العطور والجمال</option>
            <option value="الأزياء">الأزياء</option>
            <option value="السوبرماركت">السوبرماركت</option>
            <option value="صُنع في السعودية">صُنع في السعودية</option>
          </select>
          <input required type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="السعر (ر.س)" className="border p-2 rounded" />
          <input required type="number" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} placeholder="السعر قبل الخصم" className="border p-2 rounded" />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input required type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="رابط صورة المنتج (https://...)" className="border p-2 rounded flex-1" />
          <button type="submit" className="bg-noonBlue text-white font-black px-6 py-2.5 rounded-lg">نشر في المتجر</button>
        </div>
      </form>

      <div className="bg-white p-5 rounded-xl border overflow-x-auto shadow-xs">
        <h2 className="font-black text-lg mb-3">الطلبات الواردة من العملاء ({orders.length})</h2>
        <table className="w-full text-right text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b"><th className="p-3">رقم الشحنة</th><th className="p-3">العميل</th><th className="p-3">المدينة والعنوان</th><th className="p-3">وسيلة الدفع</th><th className="p-3">الإجمالي</th><th className="p-3">الحالة</th></tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="p-3 font-black text-noonBlue">{o.orderNumber}</td>
                <td className="p-3">{o.customerName} ({o.customerPhone})</td>
                <td className="p-3">{o.city} - {o.address}</td>
                <td className="p-3 font-bold">{o.paymentMethod}</td>
                <td className="p-3 font-black">{Number(o.totalAmount).toLocaleString()} ر.س</td>
                <td className="p-3"><span className="bg-green-100 text-noonGreen px-2 py-1 rounded text-xs font-bold">{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-5 rounded-xl border overflow-x-auto shadow-xs">
        <h2 className="font-black text-lg mb-3">إدارة كتالوج المنتجات ({products.length} منتج)</h2>
        <table className="w-full text-right text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b"><th className="p-3">المنتج</th><th className="p-3">القسم</th><th className="p-3">السعر</th><th className="p-3">إجراء</th></tr>
          </thead>
          <tbody className="divide-y">
            {products.slice(0, 100).map((p) => (
              <tr key={p.id}>
                <td className="p-3 font-bold flex items-center gap-2"><img src={p.image} className="w-10 h-10 object-cover rounded" /> {p.title}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3 font-black">{Number(p.price).toLocaleString()} ر.س</td>
                <td className="p-3"><button onClick={() => deleteProduct(p.id)} className="text-red-600 font-bold hover:underline">حذف</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
}
console.log("✅ Noon KSA SVG UI + Full Product Page + 100-Product Importer Completed!");
