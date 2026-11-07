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
        noonBorder: "#E2E5F1",
        noonMaroon: "#581508"
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
}`,

  'src/app/layout.jsx': `import './globals.css';
export const metadata = {
  title: 'نون للتسوق أونلاين في السعودية - إلكترونيات، جوالات، أزياء، أجهزة منزلية والمزيد',
  description: 'تسوق أونلاين في المملكة العربية السعودية من نون - عروض 11.11 وشحن إكسبريس سريع',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
};
export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="pb-16 md:pb-0 antialiased selection:bg-noonYellow selection:text-noonDark">{children}</body>
    </html>
  );
}`,

  'src/lib/storeData.js': `export const navCategories = [
  "الإلكترونيات",
  "الجمال والعطور",
  "المنزل",
  "البقالة",
  "أزياء الرجال",
  "أزياء النساء",
  "مستلزمات الأم والبيبي",
  "الألعاب",
  "أزياء الأولاد",
  "الرياضة",
  "الصحة والتغذية",
  "القرطاسية",
  "كتب",
  "السيارات",
  "الموسيقى والميديا",
  "أحسن المنتجات"
];

// الكروت الـ 11 المربعة ذات الإطار الأصفر والشريط البني الداكن السفلي المطابقة للصورة تماماً
export const promoSquareCards = [
  { title: "شيك العروض", badge: "تبدأ من 1 ر.س", cat: "deals", is1111: true, img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=300&q=80" },
  { title: "المقاضي", badge: "تبدأ من 1 ر.س", cat: "البقالة", img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=300&q=80" },
  { title: "الجوالات", badge: "خصم حتى 50%", cat: "الإلكترونيات", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=300&q=80" },
  { title: "اللابتوبات", badge: "خصم حتى 150 ر.س", cat: "الإلكترونيات", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80" },
  { title: "العناية الشخصية", badge: "خصم إضافي 10%", cat: "الجمال والعطور", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80" },
  { title: "أزياء النساء", badge: "خصم 50-80%", cat: "أزياء النساء", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80" },
  { title: "أزياء الرجال", badge: "خصم 50-80%", cat: "أزياء الرجال", img: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=300&q=80" },
  { title: "مكائن القهوة", badge: "خصم حتى 60%", cat: "المنزل", img: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=300&q=80" },
  { title: "الصحة والتغذية", badge: "رصيد مسترجع 250 ر.س", cat: "الصحة والتغذية", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80" },
  { title: "السماعات", badge: "خصم حتى 70%", cat: "الإلكترونيات", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80" },
  { title: "أجهزة للارتداء", badge: "خصم حتى 60%", cat: "الإلكترونيات", img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=300&q=80" },
  { title: "شنط الظهر", badge: "تبدأ من 19 ر.س", cat: "أزياء الرجال", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80" }
];

// قائمة 100 منتج فريد ومميز بدون تكرار الأسماء
const uniqueCatalogList = [
  // الإلكترونيات والجوالات
  ["أبل", "آيفون 16 برو ماكس 256 جيجابايت تيتانيوم صحراوي 5G", "الإلكترونيات", 5199, 5699, "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=80"],
  ["أبل", "آيفون 16 برو 128 جيجابايت تيتانيوم طبيعي 5G", "الإلكترونيات", 4299, 4699, "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=80"],
  ["سامسونج", "جالكسي S24 ألترا 512 جيجابايت تيتانيوم رمادي 5G", "الإلكترونيات", 4199, 5899, "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=700&q=80"],
  ["سامسونج", "جالكسي زد فولد 6 القابل للطي 256 جيجابايت فضي", "الإلكترونيات", 5999, 7299, "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80"],
  ["أبل", "ماك بوك إير 13.6 بوصة شريحة M3 رام 8GB وذاكرة 256GB", "الإلكترونيات", 4199, 4799, "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80"],
  ["أبل", "ماك بوك برو 14 بوصة شريحة M3 Pro ذاكرة 512GB أسود فلكي", "الإلكترونيات", 7499, 8499, "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=700&q=80"],
  ["أبل", "آيباد برو 11 بوصة شاشة OLED شريحة M4 سعة 256GB", "الإلكترونيات", 3899, 4399, "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=700&q=80"],
  ["أبل", "سماعات إيربودز برو الجيل الثاني منفذ USB-C MagSafe", "الإلكترونيات", 849, 1099, "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=700&q=80"],
  ["سوني", "سماعة الرأس اللاسلكية WH-1000XM5 عازلة للضوضاء أسود", "الإلكترونيات", 1149, 1599, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"],
  ["أبل", "ساعة أبل واتش سيريس 10 مقاس 46 ملم أسود لامع", "الإلكترونيات", 1649, 1899, "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=700&q=80"],
  ["سامسونج", "شاشة ذكية 65 بوصة 4K Crystal UHD مع رسيفر مدمج", "الإلكترونيات", 1999, 2899, "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=700&q=80"],
  ["إل جي", "شاشة OLED ذكية 55 بوصة 4K تدعم 120Hz للألعاب", "الإلكترونيات", 3699, 5299, "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=700&q=80"],
  ["أسوس", "لابتوب الألعاب TUF Gaming F15 معالج i7 وكرت RTX 4060", "الإلكترونيات", 4299, 5199, "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=700&q=80"],
  ["شاومي", "هاتف 14T برو ثنائي الشريحة 512 جيجابايت كاميرا لايكا", "الإلكترونيات", 2399, 2899, "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80"],
  ["جي بي إل", "مكبر صوت بلوتوث محمول Flip 6 مقاوم للماء أسود", "الإلكترونيات", 379, 549, "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80"],

  // الجمال والعطور
  ["الماجد للعود", "عطر برستيج روبي أو دي بارفيوم 100 مل - إصدار 11.11", "الجمال والعطور", 165, 330, "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80"],
  ["ديور", "عطر سوفاج أو دي بارفيوم للرجال 100 مل أصلي", "الجمال والعطور", 489, 650, "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=80"],
  ["شانيل", "عطر بلو دي شانيل أو دي بارفيوم للرجال 100 مل", "الجمال والعطور", 620, 780, "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80"],
  ["دايسون", "جهاز تصفيف الشعر إير راب الملتي ستايلر الكامل", "الجمال والعطور", 1999, 2499, "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80"],
  ["لاروش بوزيه", "واقي شمس أنثيليوس SPF50+ للبشرة الدهنية والمختلطة", "الجمال والعطور", 79, 135, "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80"],
  ["العربية للعود", "عطر كلمات الشرقي الفاخر 100 مل بالعود والعنبر", "الجمال والعطور", 210, 420, "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=700&q=80"],
  ["فيليبس", "ماكينة حلاقة وتنعيم اللحية للرجال OneBlade Pro مقاومة للماء", "الجمال والعطور", 189, 299, "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=700&q=80"],

  // المنزل والمطبخ
  ["فيليبس", "قلاية هوائية بحجم عائلي XXL سعة 6.2 لتر 2000 واط", "المنزل", 449, 899, "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=700&q=80"],
  ["ديلونجي", "ماكينة قهوة وإسبريسو ديديكا ستانلس ستيل 15 بار", "المنزل", 699, 999, "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=700&q=80"],
  ["سميج (SMEG)", "حماصة خبز ريترو بفتحتين بتصميم كلاسيكي أخضر نعناعي", "المنزل", 649, 899, "https://images.unsplash.com/photo-1584990347449-a2d4c2c044c9?auto=format&fit=crop&w=700&q=80"],
  ["دايسون", "مكنسة كهربائية لاسلكية V15 Detect Absolute بالليزر", "المنزل", 2399, 3199, "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=700&q=80"],
  ["نينجا", "خلاط ومحضر طعام احترافي بقوة 1200 واط مع 3 سرعات", "المنزل", 499, 799, "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=700&q=80"],
  ["نسبرسو", "ماكينة قهوة كبسولات إيسينزا ميني مع خافق حليب إيروتشينو", "المنزل", 549, 849, "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80"],
  ["ستانلي", "مج حراري حافظ للبرودة والحرارة سعة 1.18 لتر بيد ومصاصة برتقالي", "المنزل", 169, 240, "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=700&q=80"],

  // الألعاب
  ["سوني", "جهاز بلايستيشن 5 سليم (PS5 Slim) نسخة الأقراص 1TB الرسمي", "الألعاب", 1849, 2299, "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=80"],
  ["سوني", "ذراع تحكم لاسلكي DualSense لبلايستيشن 5 أبيض وأسود", "الألعاب", 269, 349, "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=700&q=80"],
  ["نينتندو", "جهاز سويتش شاشة OLED مع أذرع تحكم نيون", "الألعاب", 1199, 1499, "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=700&q=80"],

  // البقالة والسوبرماركت
  ["تايد (Tide)", "مسحوق غسيل مركز للغسالات الأوتوماتيكية 7 كجم + داوني هدية", "البقالة", 59, 98, "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80"],
  ["الوليمة", "أرز بسمتي هندي مزة طويل الحبة فاخر - كيس 10 كجم", "البقالة", 79, 115, "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80"],
  ["الجوف", "زيت زيتون عضوي بكر ممتاز عصرة أولى - عبوة 2 لتر", "البقالة", 89, 130, "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80"],
  ["تمور القصيم", "بوكس قهوة سعودية شقراء بالهيل والزعفران مع تمر سكري ملكي", "البقالة", 95, 140, "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80"],

  // الأزياء الرجالية والنسائية
  ["عبايات الجوهرة", "عباية خليجية سوداء كريب ملكي مطرزة مع طرحة شيفون", "أزياء النساء", 159, 299, "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80"],
  ["نايكي", "حذاء الجري الرياضي إير زوم بيجاسوس للرجال أحمر وأسود", "أزياء الرجال", 329, 549, "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"],
  ["كاسيو", "ساعة يد رجالية كلاسيكية ستانلس ستيل مقاومة للماء فضي", "أزياء الرجال", 145, 220, "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80"],
  ["أديداس", "شنطة ظهر رياضية ومدرسية مقاومة للماء تتسع للابتوب 15.6 بوصة", "أزياء الرجال", 89, 179, "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"]
];

export function buildUniqueProducts(list, startId = 1) {
  const badges = ["عروض 11.11", "الأكثر مبيعاً", "خصم إضافي 15%", "أقل سعر بالسنة", "هدية مجانية", "اختيار نون"];
  return list.map((item, idx) => ({
    id: startId + idx,
    brand: item[0],
    sku: "N" + (450000 + startId + idx) + "KSA",
    title: item[0] + " - " + item[1],
    category: item[2],
    price: item[3],
    oldPrice: item[4],
    rating: Number((4.6 + (idx % 4) * 0.1).toFixed(1)),
    reviews: 195 + (idx * 63) % 3400,
    express: true,
    isMegaDeal: idx < 12,
    isBestseller: idx % 2 === 0,
    badge: badges[idx % badges.length],
    soldCount: "+" + (150 + (idx * 55) % 950) + " تم بيعها مؤخراً",
    image: item[5],
    gallery: [item[5]],
    colors: ["اللون الأصلي", "أسود ملكي", "فضي تيتانيوم"],
    sizes: ["الإصدار القياسي", "حجم عائلي / Pro"],
    highlights: [
      "منتج أصلي 100% مشمول في مهرجان عروض 11.11 الكبرى في نون السعودية",
      "خصم إضافي 15% عند الدفع ببطاقات مصرف البلاد أو استرداد نقدي 10% ببطاقة نون الأول",
      "شحن نون إكسبريس مجاني وسريع مع ضمان الوكيل المحلي لمدة سنتين",
      "إمكانية التقسيط المريح على 4 دفعات بدون فوائد عبر تابي أو تمارا"
    ],
    specs: {
      "العلامة التجارية": item[0],
      "القسم": item[2],
      "رقم الموديل": "N" + (450000 + startId + idx) + "KSA",
      "الضمان": "سنتين ضمان الوكيل بالسعودية",
      "الشحن": "نون إكسبريس السريع"
    }
  }));
}

// دالة توليد 100 منتج فريد تماماً عند الضغط على زر الاستيراد في لوحة التحكم
export function generate100UniqueBatch(batchNumber = 1) {
  const brands = ["سامسونج", "أبل", "سوني", "فيليبس", "ديلونجي", "الماجد للعود", "دايسون", "نينجا", "تايد", "أديداس", "نايكي", "كاسيو", "براون", "تيفال", "إل جي", "شاومي", "هونر", "لينوفو", "إتش بي", "لوريال"];
  const itemsNouns = [
    { name: "سماعة بلوتوث لاسلكية عازلة للضجيج إصدار خاص", cat: "الإلكترونيات", p: 349, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" },
    { name: "ساعة ذكية رياضية مقاومة للماء بشاشة AMOLED", cat: "الإلكترونيات", p: 499, img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80" },
    { name: "ماكينة تحضير القهوة المقطرة والإسبريسو الرقمية", cat: "المنزل", p: 579, img: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80" },
    { name: "قلاية هوائية ديجيتال بدون زيت بشاشة لمس ذكية", cat: "المنزل", p: 399, img: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80" },
    { name: "عطر شرقي فاخر بالعود والعنبر والمسك الملكي", cat: "الجمال والعطور", p: 195, img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80" },
    { name: "مجموعة سيروم فيتامين سي والهيالورونيك للعناية بالبشرة", cat: "الصحة والتغذية", p: 125, img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80" },
    { name: "حقيبة ظهر عملية مبطنة للابتوب والسفر اليومي", cat: "أزياء الرجال", p: 119, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80" },
    { name: "حذاء رياضي مريح للمشي والجري لمسافات طويلة", cat: "الرياضة", p: 289, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
    { name: "عبوة توفير مسحوق ومنظف غسيل أوتوماتيكي مركز", cat: "البقالة", p: 68, img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80" },
    { name: "شاشة ألعاب مسطحة فائقة السرعة بدقة 4K HDR", cat: "الإلكترونيات", p: 1599, img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80" }
  ];
  constcapacities = ["سعة 128GB", "سعة 256GB", "حجم عائلي 5 لتر", "وزن 8 كجم", "مقاس 55 بوصة", "إصدار 100 مل", "طقم 6 قطع", "قوة 1800 واط", "الجيل الخامس 5G", "إصدار محدود 11.11"];

  const rawBatch = [];
  for (let i = 0; i < 100; i++) {
    const b = brands[(i + batchNumber) % brands.length];
    const item = itemsNouns[i % itemsNouns.length];
    const cap = capacities[Math.floor(i / 10) % capacities.length];
    const uniquePrice = item.p + ((i * 13) % 180);
    rawBatch.push([
      b,
      item.name + " - " + cap + " (كود " + (batchNumber * 1000 + i) + ")",
      item.cat,
      uniquePrice,
      Math.round(uniquePrice * 1.35),
      item.img
    ]);
  }
  return buildUniqueProducts(rawBatch, Date.now());
}

export const initialProducts = buildUniqueProducts(uniqueCatalogList, 1);

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
    badge: body.badge || "عروض 11.11",
    soldCount: "+250 تم بيعها مؤخراً",
    image: body.image,
    gallery: [body.image],
    colors: ["اللون القياسي"],
    sizes: ["الحجم الأساسي"],
    highlights: ["منتج أصلي 100% متوفر في مستودعات نون السعودية للشحن الفوري"],
    specs: { "العلامة التجارية": body.brand || "ماركة مسجلة", "القسم": body.category }
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

  // الواجهة الرئيسية المطابقة للصورة المرفقة 100%
  'src/app/page.jsx': `"use client";
import { useState, useEffect, useRef } from "react";
import { initialProducts, navCategories, promoSquareCards } from "../lib/storeData";

const Icons = {
  NoonCrescent: () => (
    <svg className="w-7 h-7 text-noonDark" viewBox="0 0 36 36" fill="currentColor">
      <path d="M18 3C9.716 3 3 9.716 3 18c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-1.42-.2-2.793-.57-4.095a11.5 11.5 0 0 1-19.335 8.19A11.5 11.5 0 0 1 19.905 3.57C19.28 3.195 18.65 3 18 3zm3.5 6a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
    </svg>
  ),
  Pin: () => (
    <svg className="w-4 h-4 text-noonDark shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Search: () => (
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  ),
  User: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  ),
  OrdersBox: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Heart: ({ filled }) => (
    <svg className={"w-4 h-4 transition " + (filled ? "text-red-500 fill-red-500" : "text-current fill-none")} stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Cart: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  Star: () => (
    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
};

export default function NoonSaudiExactReplica() {
  const [products, setProducts] = useState(initialProducts);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [city, setCity] = useState("الرياض");
  const [showCookie, setShowCookie] = useState(true);

  // حالة صفحة المنتج المستقلة
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
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

  const stripRef = useRef(null);

  useEffect(() => {
    const savedProds = localStorage.getItem("noon_prods_v5");
    if (savedProds) setProducts(JSON.parse(savedProds));
    const savedOrders = localStorage.getItem("noon_orders_v5");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    const savedUser = localStorage.getItem("noon_user_v5");
    if (savedUser) setUserName(savedUser);
  }, []);

  function scrollPromoStrip(dir) {
    if (stripRef.current) {
      stripRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
    }
  }

  function openFullProductPage(p) {
    setActiveProduct(p);
    setActiveImage(p.image);
    setSelectedColor(p.colors?.[0] || "اللون الأصلي");
    setSelectedSize(p.sizes?.[0] || "الإصدار القياسي");
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
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);

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
    if (code === "KSA15" || code === "ALBILAD" || code === "1111") {
      setDiscountRate(0.15);
      alert("تم تفعيل خصم 15% الإضافي بنجاح!");
    } else {
      alert("جرّب كود: KSA15 أو ALBILAD");
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
    const updatedOrders = [order, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem("noon_orders_v5", JSON.stringify(updatedOrders));
    alert("تم تأكيد طلبك بنجاح! رقم الشحنة: " + order.orderNumber);
    setCart([]);
    setDiscountRate(0);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  }

  function ProductCard({ p }) {
    const disc = Math.max(0, Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100));
    const isFav = wishlist.includes(p.id);
    return (
      <div
        onClick={() => openFullProductPage(p)}
        className="cursor-pointer bg-white rounded-xl p-2.5 sm:p-3 border border-noonBorder hover:shadow-lg transition-all flex flex-col justify-between relative group"
      >
        <div>
          <div className="flex justify-between items-center mb-1.5 z-10 relative">
            <span className="bg-noonDark text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full truncate max-w-[130px]">
              {p.badge}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(p.id);
              }}
              className="w-7 h-7 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center hover:scale-110 transition"
            >
              <Icons.Heart filled={isFav} />
            </button>
          </div>

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

          <div className="flex items-center gap-1 mt-2 mb-1">
            <span className="bg-[#F3F4F8] text-noonDark text-[10px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <span>{p.rating}</span>
              <span className="text-noonGreen"><Icons.Star /></span>
            </span>
            <span className="text-[10px] text-gray-400 font-semibold">({p.reviews})</span>
          </div>

          <h3 className="text-[11px] sm:text-xs font-bold text-noonDark line-clamp-2 h-8 sm:h-9 group-hover:text-noonBlue leading-snug">
            {p.title}
          </h3>
        </div>

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
            <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold">توصيل غداً</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FA]">
      {/* ================================================================= */}
      {/* 1. الهيدر الأصفر العلوي المطابق للصورة المرفقة بالمللي */}
      {/* ================================================================= */}
      <header className="bg-noonYellow sticky top-0 z-40 border-b border-yellow-400/60">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-6">
          
          {/* أقصى اليمين: شعار نون بالعربية + أيقونة الهلال + أكّد - الرياض */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <button
              onClick={() => {
                setActiveProduct(null);
                setCategory("all");
                setSearch("");
              }}
              className="flex items-center gap-1.5"
            >
              <span className="font-black text-2xl sm:text-3xl text-noonDark tracking-tight">نون</span>
              <Icons.NoonCrescent />
            </button>

            <button
              onClick={() => setIsCityModalOpen(true)}
              className="flex items-center gap-1 text-xs sm:text-sm text-noonDark hover:opacity-80 transition"
            >
              <Icons.Pin />
              <span className="text-gray-700 font-medium hidden sm:inline">أكّد -</span>
              <strong className="font-extrabold">{city}</strong>
              <span className="text-[10px]">▾</span>
            </button>
          </div>

          {/* المنتصف: شريط البحث الأبيض العريض (بحث عن مسحوق غسيل) */}
          <div className="flex-1 max-w-2xl relative">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setActiveProduct(null);
                setSearch(e.target.value);
              }}
              placeholder="بحث عن مسحوق غسيل"
              className="w-full h-9 sm:h-10 pr-9 pl-4 rounded-md bg-white text-xs sm:text-sm text-noonDark placeholder-gray-400 focus:outline-none shadow-2xs"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              <Icons.Search />
            </span>
          </div>

          {/* أقصى اليسار: الروابط مع الفواصل الرأسية بالترتيب المطابق للصورة */}
          <div className="hidden lg:flex items-center gap-3.5 text-xs font-bold text-noonDark shrink-0">
            <button className="hover:opacity-75 flex items-center gap-1">
              <span>English</span>
              <span className="text-xs font-normal border px-1 rounded border-noonDark/40">文A</span>
            </button>

            <span className="h-4 w-[1px] bg-noonDark/25" />

            <button onClick={() => setIsAuthModalOpen(true)} className="hover:opacity-75 flex items-center gap-1.5">
              <span>{userName ? userName : "تسجيل الدخول"}</span>
              <Icons.User />
            </button>

            <span className="h-4 w-[1px] bg-noonDark/25" />

            <button onClick={() => setIsOrdersModalOpen(true)} className="hover:opacity-75 flex items-center gap-1.5">
              <span>الطلبات</span>
              <Icons.OrdersBox />
            </button>

            <span className="h-4 w-[1px] bg-noonDark/25" />

            <button
              onClick={() => {
                setActiveProduct(null);
                setCategory("wishlist");
              }}
              className="hover:opacity-75 flex items-center gap-1.5 relative"
            >
              <span>المفضلة</span>
              <Icons.Heart filled={wishlist.length > 0} />
              {wishlist.length > 0 && (
                <span className="bg-red-600 text-white text-[9px] px-1 rounded-full">{wishlist.length}</span>
              )}
            </button>

            <span className="h-4 w-[1px] bg-noonDark/25" />

            <button onClick={() => setIsCartOpen(true)} className="hover:opacity-75 flex items-center gap-1.5 relative">
              <span>عربة التسوق</span>
              <Icons.Cart />
              {totalCartCount > 0 && (
                <span className="bg-noonBlue text-white text-[10px] px-1.5 rounded-full font-black">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

          {/* أيقونة العربة السريعة للموبايل */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="lg:hidden bg-noonDark text-noonYellow px-2.5 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 shrink-0"
          >
            <Icons.Cart />
            <span>{totalCartCount}</span>
          </button>
        </div>
      </header>

      {/* ================================================================= */}
      {/* 2. شريط التصنيفات الأبيض + كبسولة "احصل على توصيل مجاني مع نون one" */}
      {/* ================================================================= */}
      <nav className="bg-white border-b border-gray-200 sticky top-14 sm:top-16 z-30">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 h-11 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-5 overflow-x-auto no-scrollbar text-xs sm:text-[13px] font-bold text-noonDark">
            {navCategories.map((catName) => (
              <button
                key={catName}
                onClick={() => {
                  setActiveProduct(null);
                  setCategory(catName === "أحسن المنتجات" ? "all" : catName);
                  setSearch("");
                }}
                className={
                  "shrink-0 transition hover:text-noonBlue " +
                  (category === catName ? "text-noonBlue font-black border-b-2 border-noonBlue pb-1" : "")
                }
              >
                {catName}
              </button>
            ))}
          </div>

          {/* كبسولة نون one اليسرى المطابقة للصورة */}
          <button
            onClick={() => setCategory("deals")}
            className="hidden xl:flex items-center gap-1.5 border-2 border-noonYellow bg-yellow-50/50 hover:bg-noonYellow/30 px-3 py-1 rounded-full text-[11px] font-extrabold text-noonDark shrink-0 transition"
          >
            <span>احصل على توصيل مجاني مع</span>
            <span className="bg-noonDark text-white px-2 py-0.2 rounded-full text-[10px] font-black">
              نون <span className="text-noonYellow">one</span>
            </span>
            <span>‹</span>
          </button>
        </div>
      </nav>

      {/* ================================================================= */}
      {/* عرض صفحة تفاصيل المنتج الكاملة أو الصفحة الرئيسية المطابقة للصورة */}
      {/* ================================================================= */}
      {activeProduct ? (
        <main className="max-w-[1380px] w-full mx-auto px-3 sm:px-6 py-5 flex-1 space-y-6">
          <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-noonBorder text-xs">
            <div className="flex items-center gap-2 text-gray-500">
              <button onClick={() => setActiveProduct(null)} className="hover:text-noonBlue font-black text-noonDark">
                ← العودة للصفحة الرئيسية
              </button>
              <span>/</span>
              <span className="font-bold text-noonBlue">{activeProduct.category}</span>
              <span>/</span>
              <span className="text-gray-400 truncate max-w-xs">{activeProduct.title}</span>
            </div>
            <span className="text-[11px] text-gray-400 hidden sm:inline">كود المنتج: {activeProduct.sku}</span>
          </div>

          <div className="bg-white rounded-2xl border border-noonBorder p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 shadow-xs">
            <div className="lg:col-span-4 flex flex-col-reverse sm:flex-row gap-3">
              <div className="flex sm:flex-col gap-2 overflow-x-auto no-scrollbar shrink-0">
                {(activeProduct.gallery || [activeProduct.image]).map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(imgUrl)}
                    className={"w-16 h-16 rounded-lg border-2 p-1 bg-gray-50 " + (activeImage === imgUrl ? "border-noonBlue" : "border-gray-200")}
                  >
                    <img src={imgUrl} className="w-full h-full object-contain" alt="thumb" />
                  </button>
                ))}
              </div>
              <div className="flex-1 bg-[#F8F9FB] rounded-xl p-4 flex items-center justify-center relative min-h-[320px] border border-gray-100">
                <span className="absolute top-3 right-3 bg-noonDark text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {activeProduct.badge}
                </span>
                <img src={activeImage || activeProduct.image} alt={activeProduct.title} className="max-h-[300px] w-full object-contain mix-blend-multiply" />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-l border-gray-100 pb-5 lg:pb-0 lg:pl-6">
              <div>
                <span className="text-xs font-extrabold text-noonBlue">{activeProduct.brand}</span>
                <h1 className="text-base sm:text-xl font-black text-noonDark leading-relaxed mt-1">{activeProduct.title}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="bg-noonGreen text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    {activeProduct.rating} <Icons.Star />
                  </span>
                  <span className="text-xs text-gray-500 font-bold">({activeProduct.reviews} تقييم موثق)</span>
                </div>
              </div>

              <div className="bg-[#F8F9FB] p-3.5 rounded-xl space-y-1 border border-gray-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-noonDark">
                    {Number(activeProduct.price).toLocaleString()} <span className="text-sm">ر.س</span>
                  </span>
                  <span className="text-xs text-gray-400">(شامل الضريبة)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400">كان: <del>{Number(activeProduct.oldPrice).toLocaleString()} ر.س</del></span>
                  <span className="bg-green-100 text-noonGreen font-extrabold px-2 py-0.5 rounded">
                    وفرت {(activeProduct.oldPrice - activeProduct.price).toLocaleString()} ر.س
                  </span>
                </div>
              </div>

              <div className="border border-emerald-200 bg-emerald-50/50 p-3 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-noonDark">
                    قسّمها على 4 دفعات بقيمة <strong className="text-noonBlue">{Math.round(activeProduct.price / 4).toLocaleString()} ر.س</strong>
                  </p>
                  <p className="text-[11px] text-gray-500">بدون فوائد مع تابي أو تمارا</p>
                </div>
                <div className="flex gap-1.5 font-black">
                  <span className="bg-white border px-2 py-1 rounded text-emerald-700">tabby</span>
                  <span className="bg-white border px-2 py-1 rounded text-pink-700">tamara</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => addToCart(activeProduct)}
                  className="flex-1 bg-noonBlue hover:bg-blue-700 text-white font-black py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow"
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
                  className="bg-noonYellow text-noonDark font-black px-6 py-3.5 rounded-xl text-sm"
                >
                  اشترِ الآن
                </button>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-3 text-xs">
              <div className="bg-[#F8F9FB] p-4 rounded-xl border border-gray-100 space-y-2.5">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="express-pill">إكسبريس</span>
                  <span className="text-noonGreen font-extrabold">متوفر بالمخزون</span>
                </div>
                <p className="font-bold text-noonDark">توصيل مجاني غداً إلى {city}</p>
                <p className="text-gray-500">يباع ويشحن بواسطة: <strong className="text-noonBlue">نون السعودية</strong></p>
                <p className="text-noonGreen font-bold">✓ ضمان الوكيل لمدة سنتين</p>
                <p className="text-noonGreen font-bold">✓ إرجاع مجاني خلال 15 يوماً</p>
              </div>
            </div>
          </div>
        </main>
      ) : (
        /* ================================================================= */
        /* 3. شبكة البانرات الـ 4 العلوية + شريط الكروت الـ 11 المطابق للصورة */
        /* ================================================================= */
        <main className="max-w-[1440px] w-full mx-auto px-3 sm:px-6 py-4 flex-1 space-y-5">
          
          {/* شبكة البانرات الـ 4 العلوية المطابقة للصورة بالضبط */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            
            {/* العمود 1 (يمين الصورة): صندوق عافية السماوي */}
            <div
              onClick={() => setCategory("الصحة والتغذية")}
              className="cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-b from-[#BCE6FF] via-[#DDF2FF] to-[#87CEFA] p-5 flex flex-col justify-between relative min-h-[340px] sm:min-h-[380px] shadow-xs group border border-sky-200"
            >
              <div className="text-center space-y-1 z-10">
                <span className="text-xs font-bold text-noonDark">لك مجاناً</span>
                <h2 className="text-2xl sm:text-3xl font-black text-noonDark tracking-tight">صندوق عافية</h2>
                <p className="text-xs font-bold text-noonDark/80">بإصدار محدود للطلبات بـ 499 ر.س وأكثر</p>
                <div className="pt-1">
                  <span className="bg-noonYellow text-noonDark font-black text-xs px-3 py-1 rounded-md shadow-2xs inline-block">
                    قيمته 1,200 ر.س
                  </span>
                </div>
              </div>
              <div className="relative h-48 flex items-center justify-center mt-2">
                <img
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
                  alt="صندوق عافية"
                  className="max-h-44 object-contain rounded-xl shadow-md group-hover:scale-105 transition"
                />
              </div>
              <span className="text-[9px] text-gray-600 text-left">*تطبق الشروط والأحكام</span>
            </div>

            {/* العمود 2: بانر إعمار العقاري الكحلي الفاخر */}
            <div
              onClick={() => setCategory("المنزل")}
              className="cursor-pointer rounded-2xl overflow-hidden bg-[#071D35] text-white flex flex-col justify-between relative min-h-[340px] sm:min-h-[380px] shadow-xs group"
            >
              <div className="p-5 text-center space-y-1.5 z-10">
                <p className="italic font-serif text-lg sm:text-xl text-amber-200">Luxury Homes</p>
                <p className="text-xs tracking-widest uppercase font-semibold text-gray-300">LIKE NO OTHER</p>
                <p className="text-[10px] text-gray-400 pt-1">STARTING FROM</p>
                <div className="border border-white/25 bg-white/5 rounded-lg py-1.5 px-4 inline-block">
                  <span className="text-xl font-black tracking-wide">AED 1.8Mn</span>
                </div>
                <p className="text-sm font-bold tracking-[0.25em] pt-1">EMAAR</p>
              </div>
              <div className="h-48 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80"
                  alt="EMAAR"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            {/* العمود 3: بانر عروض 11.11 البنفسجي بدعم من الماجد للعود + بنك البلاد */}
            <div
              onClick={() => setCategory("الجمال والعطور")}
              className="cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-b from-[#8C52FF] via-[#CBA8FF] to-[#F3E8FF] p-4 flex flex-col justify-between relative min-h-[340px] sm:min-h-[380px] shadow-xs group border border-purple-200"
            >
              <div className="text-center space-y-1 z-10">
                <div className="inline-block bg-noonYellow text-noonDark font-black px-3 py-0.5 rounded-t-lg text-xs">
                  عروض
                </div>
                <div className="text-3xl font-black text-white drop-shadow">11.11</div>
                <span className="bg-white text-pink-600 font-black text-[11px] px-3 py-0.5 rounded shadow-2xs inline-block">
                  بدأت الحين
                </span>
                <h3 className="text-base sm:text-lg font-black text-noonDark pt-1">عروض جديدة كل يوم</h3>
                <div className="bg-white/90 rounded-lg px-3 py-1 inline-flex items-center gap-2 text-[11px] font-bold text-noonDark shadow-2xs">
                  <span>بدعم من:</span>
                  <strong className="font-black text-amber-900">الماجد للعود</strong>
                </div>
              </div>

              <div className="my-2 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=500&q=80"
                  alt="11.11 Deals"
                  className="h-28 object-contain rounded-lg group-hover:scale-105 transition"
                />
              </div>

              <div className="bg-white rounded-xl p-2 text-center shadow-xs border border-purple-100">
                <p className="text-xs font-black text-noonDark">
                  خصم إضافي 15% <span className="text-red-600 font-bold">بنك البلاد</span>
                </p>
                <p className="text-[10px] text-gray-500">مع بطاقات الحسم المباشر أو مسبقة الدفع</p>
              </div>
            </div>

            {/* العمود 4 (يسار الصورة): مقسوم إلى بانر بطاقة نون الأول VISA بالأعلى + بانر أقل أسعار السنة بالأسفل */}
            <div className="flex flex-col gap-3.5 min-h-[340px] sm:min-h-[380px]">
              {/* البطاقة العلوية الصفراء: نون الأول VISA */}
              <div
                onClick={() => setCategory("deals")}
                className="cursor-pointer flex-1 bg-noonYellow rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xs border border-yellow-400 relative overflow-hidden group"
              >
                <div className="space-y-1 z-10">
                  <div className="flex items-center gap-1.5 text-xs font-black text-noonDark">
                    <span>نون</span>
                    <span>|</span>
                    <span className="bg-red-600 text-white px-1.5 py-0.2 rounded text-[10px]">الأول SAB</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-noonDark leading-tight">
                    10% استرداد نقدي
                  </h3>
                  <p className="text-xs font-bold text-noonDark/80">كرصيد نون</p>
                  <span className="bg-white/80 text-noonDark font-black text-[11px] px-2 py-0.5 rounded inline-block">
                    + 250 ر.س مكافأة ترحيبية
                  </span>
                </div>

                {/* تصميم بطاقة فيزا نون الصفراء */}
                <div className="w-32 h-20 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-xl border-2 border-white shadow-md p-2 flex flex-col justify-between shrink-0 group-hover:rotate-3 transition">
                  <div className="flex justify-between items-center text-[9px] font-black text-noonDark">
                    <span>VISA</span>
                    <span>SAB</span>
                  </div>
                  <div className="font-black text-xl text-noonDark tracking-tighter">noon</div>
                </div>
              </div>

              {/* البطاقة السفلية البنفسجية: أقل أسعار السنة */}
              <div
                onClick={() => setCategory("المنزل")}
                className="cursor-pointer flex-1 bg-gradient-to-r from-[#8C52FF] to-[#B689FF] rounded-2xl p-4 text-white flex items-center justify-between gap-3 shadow-xs relative overflow-hidden group"
              >
                <div className="space-y-1 z-10">
                  <span className="bg-noonYellow text-noonDark font-black text-[10px] px-2 py-0.5 rounded">
                    عروض 11.11
                  </span>
                  <h3 className="text-lg sm:text-xl font-black leading-tight">أقل أسعار السنة</h3>
                  <p className="text-xs text-purple-100 font-semibold">عروض جديدة كل يوم</p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=300&q=80"
                  alt="أقل أسعار السنة"
                  className="w-24 h-24 object-cover rounded-xl border-2 border-white/40 group-hover:scale-105 transition"
                />
              </div>
            </div>
          </section>

          {/* ================================================================= */}
          {/* 4. شريط الكروت الـ 11 المربعة ذات الإطار الأصفر والشريط البني السفلي */}
          {/* ================================================================= */}
          <section className="bg-[#FFF8EC] p-3.5 sm:p-4 rounded-2xl border border-orange-100 relative">
            {/* زر التمرير الأيمن */}
            <button
              onClick={() => scrollPromoStrip(1)}
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border items-center justify-center font-bold text-noonDark hover:bg-noonYellow transition"
            >
              ›
            </button>

            <div
              ref={stripRef}
              className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth px-1"
            >
              {promoSquareCards.map((card, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setCategory(card.cat);
                    setSearch("");
                  }}
                  className="cursor-pointer w-[100px] sm:w-[112px] shrink-0 flex flex-col items-center group"
                >
                  {/* المربع ذو الخلفية والإطار الأصفر */}
                  <div className="w-full h-24 sm:h-28 rounded-2xl bg-gradient-to-b from-[#FFF3B0] to-noonYellow border-2 border-noonYellow overflow-hidden relative flex items-center justify-center p-1.5 shadow-2xs group-hover:scale-105 transition">
                    {card.is1111 ? (
                      <div className="text-center">
                        <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.2 rounded-full block mb-0.5">
                          عرض
                        </span>
                        <div className="bg-noonYellow border border-noonDark px-2 py-0.5 rounded font-black text-xs text-noonDark">
                          عروض
                        </div>
                        <div className="text-2xl font-black text-fuchsia-700 leading-none mt-0.5">
                          11.11
                        </div>
                      </div>
                    ) : (
                      <img
                        src={card.img}
                        alt={card.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    )}
                  </div>

                  {/* الشريط الكبسولة البني/العنابي الداكن أسفل كل مربع كما في الصورة تماماً */}
                  <div className="-mt-2.5 z-10 bg-noonMaroon text-white text-[9px] sm:text-[10px] font-extrabold px-2.5 py-0.5 rounded-full whitespace-nowrap shadow">
                    {card.badge}
                  </div>

                  {/* اسم القسم تحت الكبسولة */}
                  <span className="text-[11px] sm:text-xs font-extrabold text-noonDark mt-1 text-center line-clamp-1 group-hover:text-noonBlue">
                    {card.title}
                  </span>
                </div>
              ))}
            </div>

            {/* زر التمرير الأيسر */}
            <button
              onClick={() => scrollPromoStrip(-1)}
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border items-center justify-center font-bold text-noonDark hover:bg-noonYellow transition"
            >
              ‹
            </button>
          </section>

          {/* ================================================================= */}
          {/* 5. شريط الفرز وعدد المنتجات + شبكة المنتجات غير المتكررة */}
          {/* ================================================================= */}
          <section className="space-y-3 pt-1">
            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-noonBorder flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-lg font-black text-noonDark">
                  {search
                    ? "نتائج البحث عن: " + search
                    : category === "all"
                    ? "عروض 11.11 والمنتجات الأكثر طلباً في السعودية"
                    : category === "deals"
                    ? "شيك العروض وصفقات 11.11 الكبرى"
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
                <option value="popular">الأكثر شعبية</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="rating">الأعلى تقييماً</option>
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ================================================================= */}
      {/* 6. شريط ملفات تعريف الارتباط السفلي العائم (Cookie Banner المطابق للصورة) */}
      {/* ================================================================= */}
      {showCookie && (
        <div className="fixed bottom-14 md:bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white border border-gray-200 shadow-2xl rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-4 max-w-xl w-[94%] text-xs">
          <div className="flex items-center gap-2">
            <span>🍪</span>
            <p className="text-noonDark font-semibold">
              نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا.{" "}
              <span className="text-noonBlue underline cursor-pointer">تعرف على المزيد</span>
            </p>
          </div>
          <div className="flex items-center gap-2 mr-auto">
            <button
              onClick={() => setShowCookie(false)}
              className="border border-gray-300 hover:bg-gray-50 text-noonDark font-bold px-3 py-1 rounded-md"
            >
              تخصيص
            </button>
            <button
              onClick={() => setShowCookie(false)}
              className="bg-noonBlue hover:bg-blue-700 text-white font-bold px-4 py-1 rounded-md"
            >
              قبول
            </button>
          </div>
        </div>
      )}

      {/* الفوتر الرسمي */}
      <footer className="bg-white border-t border-noonBorder mt-12">
        <div className="max-w-[1440px] mx-auto px-6 py-6 flex flex-wrap justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 نون السعودية للتسوق أونلاين. جميع الحقوق محفوظة.</p>
          <div className="flex flex-wrap items-center gap-2 font-bold text-noonDark">
            <span className="border px-2.5 py-1 rounded bg-gray-50">mada مدى</span>
            <span className="border px-2.5 py-1 rounded bg-gray-50">VISA</span>
            <span className="border px-2.5 py-1 rounded bg-gray-50">Apple Pay</span>
            <span className="border px-2.5 py-1 rounded bg-gray-50 text-emerald-700">tabby تابي</span>
            <span className="border px-2.5 py-1 rounded bg-gray-50 text-pink-700">tamara تمارا</span>
          </div>
        </div>
      </footer>

      {/* شريط التنقل السفلي للموبايل */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-40 grid grid-cols-5 py-2 text-[10px] font-bold text-gray-500">
        <button
          onClick={() => {
            setActiveProduct(null);
            setCategory("all");
            setSearch("");
          }}
          className={"flex flex-col items-center gap-1 " + (category === "all" && !activeProduct ? "text-noonBlue font-black" : "")}
        >
          <span>الرئيسية</span>
        </button>
        <button onClick={() => setCategory("الإلكترونيات")} className="flex flex-col items-center gap-1">
          <span>الإلكترونيات</span>
        </button>
        <button onClick={() => setCategory("deals")} className="flex flex-col items-center gap-1 text-red-600 font-black">
          <span>عروض 11.11</span>
        </button>
        <button onClick={() => setIsOrdersModalOpen(true)} className="flex flex-col items-center gap-1">
          <span>الطلبات</span>
        </button>
        <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center gap-1 text-noonDark font-black">
          <span>العربة ({totalCartCount})</span>
        </button>
      </div>

      {/* نافذة الطلبات (Orders Modal) */}
      {isOrdersModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-black text-base">طلباتي وتتبع الشحنات</h3>
              <button onClick={() => setIsOrdersModalOpen(false)} className="font-bold">✕</button>
            </div>
            {orders.length === 0 ? (
              <p className="text-center text-gray-400 py-8 text-xs font-bold">لا توجد طلبات سابقة حالياً</p>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {orders.map((o) => (
                  <div key={o.id} className="border p-3 rounded-xl text-xs flex justify-between items-center">
                    <div>
                      <strong className="text-noonBlue block">{o.orderNumber}</strong>
                      <span className="text-gray-500">{o.city} - {o.address}</span>
                    </div>
                    <div className="text-left">
                      <span className="font-black block">{Number(o.totalAmount).toLocaleString()} ر.س</span>
                      <span className="bg-green-100 text-noonGreen px-2 py-0.5 rounded text-[10px] font-bold">{o.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* نافذة اختيار المدينة */}
      {isCityModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-black text-base">اختر مدينة التوصيل في السعودية</h3>
              <button onClick={() => setIsCityModalOpen(false)} className="font-bold">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
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
              <h3 className="font-black text-base">عربة التسوق ({city})</h3>
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
          <form onSubmit={handleCheckout} className="bg-white rounded-2xl max-w-md w-full p-6 space-y-3 text-xs sm:text-sm">
            <h3 className="font-black text-base border-b pb-2">عنوان التوصيل والدفع الآمن في السعودية</h3>
            <input required value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="الاسم الكامل للمستلم" className="w-full border p-2.5 rounded-lg" />
            <input required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="رقم الجوال السعودي (05XXXXXXXX)" className="w-full border p-2.5 rounded-lg" />
            <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder={"العنوان التفصيلي في " + city} className="w-full border p-2.5 rounded-lg" />
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border p-2.5 rounded-lg font-bold bg-white">
              <option value="بطاقة مدى / فيزا">بطاقة مدى / فيزا</option>
              <option value="بطاقة نون الأول VISA (10% كاش باك)">بطاقة نون الأول VISA (10% استرداد نقدي)</option>
              <option value="تابي / تمارا (4 دفعات)">تقسيط تابي / تمارا (بدون فوائد)</option>
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
            <h3 className="font-black text-base">تسجيل الدخول إلى نون السعودية</h3>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="أدخل اسمك الكريم"
              className="w-full border rounded-lg p-2.5 text-center text-sm"
            />
            <button
              onClick={() => {
                localStorage.setItem("noon_user_v5", userName);
                setIsAuthModalOpen(false);
              }}
              className="w-full bg-noonDark text-noonYellow font-black py-2.5 rounded-lg text-sm"
            >
              دخول
            </button>
          </div>
        </div>
      )}
    </div>
  );
}`,

  // لوحة تحكم الإدارة المستقلة على الرابط /admin مع توليد 100 منتج فريد في المرة الواحدة
  'src/app/admin/page.jsx': `"use client";
import { useState, useEffect } from "react";
import { initialProducts, initialOrders, generate100UniqueBatch } from "../../lib/storeData";

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [batchCounter, setBatchCounter] = useState(1);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("الإلكترونيات");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const savedProds = localStorage.getItem("noon_prods_v5");
    const savedOrders = localStorage.getItem("noon_orders_v5");
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
    localStorage.setItem("noon_prods_v5", JSON.stringify(updated));
    setTitle(""); setPrice(""); setOldPrice(""); setImage("");
    alert("تم نشر المنتج في متجر نون بنجاح!");
  }

  function handleImport100Unique() {
    const new100 = generate100UniqueBatch(batchCounter);
    setBatchCounter((prev) => prev + 1);
    const updated = [...new100, ...products];
    setProducts(updated);
    localStorage.setItem("noon_prods_v5", JSON.stringify(updated));
    alert("تم استيراد 100 منتج فريد وجديد بالكامل بنجاح! إجمالي المنتجات الآن: " + updated.length + " منتج.");
  }

  function deleteProduct(id) {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("noon_prods_v5", JSON.stringify(updated));
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-noonDark flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 text-center shadow-2xl">
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
          <span className="text-xs text-noonYellow font-bold">NOON KSA ADMIN PORTAL</span>
          <h1 className="text-xl sm:text-2xl font-black">لوحة تحكم الإدارة المركزية</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleImport100Unique}
            className="bg-noonYellow hover:bg-yellow-300 text-noonDark font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg transition"
          >
            + استيراد 100 منتج فريد دفعة واحدة
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
        <h2 className="font-black text-lg">إضافة منتج جديد لمتجر نون</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="اسم المنتج" className="border p-2 rounded" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded font-bold bg-white">
            <option value="الإلكترونيات">الإلكترونيات</option>
            <option value="الجمال والعطور">الجمال والعطور</option>
            <option value="المنزل">المنزل</option>
            <option value="البقالة">البقالة</option>
            <option value="أزياء الرجال">أزياء الرجال</option>
            <option value="أزياء النساء">أزياء النساء</option>
            <option value="الألعاب">الألعاب</option>
            <option value="الرياضة">الرياضة</option>
            <option value="الصحة والتغذية">الصحة والتغذية</option>
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
        <h2 className="font-black text-lg mb-3">إدارة كتالوج المنتجات ({products.length} منتج)</h2>
        <table className="w-full text-right text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b"><th className="p-3">المنتج</th><th className="p-3">القسم</th><th className="p-3">السعر</th><th className="p-3">إجراء</th></tr>
          </thead>
          <tbody className="divide-y">
            {products.slice(0, 120).map((p) => (
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
console.log("✅ Exact Noon KSA Screenshot Replica Completed!");
