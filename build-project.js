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
        noonPink: "#FDF2F8"
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
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`,

  'src/app/layout.jsx': `import './globals.css';
export const metadata = {
  title: 'نون للتسوق أونلاين في السعودية - إلكترونيات، جوالات، أزياء، أجهزة منزلية والمزيد',
  description: 'تسوق أونلاين في المملكة العربية السعودية من نون - عروض يومية وشحن إكسبريس سريع',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
};
export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="pb-16 md:pb-0">{children}</body>
    </html>
  );
}`,

  'src/lib/storeData.js': `export const trendingKeywords = [
  "آيفون 18 برو", "أرز", "عطور", "سامسونج فولد 8", "تلفزيونات", "مسحوق غسيل",
  "بلايستيشن 5", "بطاقات الهدايا", "قلاية هوائية", "أواني سُفرة وتقديم", "أطقم القهوة والشاي", "واقي شمس"
];

export const quickCircles = [
  { name: "عروض اليوم", cat: "deals", icon: "🔥", badge: "خصم 70%", bg: "bg-red-50 border-red-200" },
  { name: "السوبرماركت", cat: "السوبرماركت", icon: "🛒", badge: "كاش باك", bg: "bg-lime-50 border-lime-200" },
  { name: "الجوالات", cat: "الجوالات", icon: "📱", badge: "آيفون 16", bg: "bg-blue-50 border-blue-200" },
  { name: "اللابتوبات", cat: "الإلكترونيات", icon: "💻", badge: "ذكاء اصطناعي", bg: "bg-indigo-50 border-indigo-200" },
  { name: "الجمال والعطور", cat: "العطور والجمال", icon: "✨", badge: "أصلي 100%", bg: "bg-pink-50 border-pink-200" },
  { name: "الأزياء النسائية", cat: "الأزياء", icon: "👗", badge: "موسم جديد", bg: "bg-rose-50 border-rose-200" },
  { name: "الأزياء الرجالية", cat: "الأزياء", icon: "👔", badge: "أناقة", bg: "bg-sky-50 border-sky-200" },
  { name: "الأجهزة المنزلية", cat: "المنزل والمطبخ", icon: "🍳", badge: "توفير", bg: "bg-amber-50 border-amber-200" },
  { name: "التلفزيونات", cat: "الإلكترونيات", icon: "📺", badge: "4K UHD", bg: "bg-purple-50 border-purple-200" },
  { name: "ألعاب الفيديو", cat: "الألعاب", icon: "🎮", badge: "PS5", bg: "bg-violet-50 border-violet-200" },
  { name: "الساعات", cat: "الأزياء", icon: "⌚", badge: "فخامة", bg: "bg-stone-100 border-stone-300" },
  { name: "القهوة والشاي", cat: "المنزل والمطبخ", icon: "☕", badge: "إسبريسو", bg: "bg-orange-50 border-orange-200" },
  { name: "بطاقات الهدايا", cat: "الألعاب", icon: "🎁", badge: "شحن فوري", bg: "bg-teal-50 border-teal-200" },
  { name: "تصفية شاملة", cat: "deals", icon: "🏷️", badge: "أقل سعر", bg: "bg-yellow-50 border-yellow-300" },
  { name: "محلي 🇸🇦", cat: "صُنع في السعودية", icon: "🌴", badge: "صنع بالسعودية", bg: "bg-emerald-50 border-emerald-200" },
  { name: "مستلزمات السفر", cat: "الأزياء", icon: "🧳", badge: "حقائب", bg: "bg-cyan-50 border-cyan-200" }
];

export const initialProducts = [
  // الجوالات
  { id: 1, title: "أبل آيفون 16 برو ماكس سعة 256 جيجابايت تيتانيوم صحراوي 5G - نسخة الشرق الأوسط", category: "الجوالات", price: 5199, oldPrice: 5699, rating: 4.9, reviews: 3420, express: true, isMegaDeal: true, isBestseller: true, badge: "الأكثر مبيعاً", soldCount: "+900 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80" },
  { id: 2, title: "سامسونج جالكسي S24 ألترا ثنائي الشريحة تيتانيوم رمادي 12GB رام 256GB - الجيل الخامس", category: "الجوالات", price: 3899, oldPrice: 5399, rating: 4.8, reviews: 2150, express: true, isMegaDeal: true, isBestseller: true, badge: "خصم 28%", soldCount: "+750 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80" },
  { id: 3, title: "أبل آيفون 15 سعة 128 جيجابايت أزرق الجيل الخامس مع فيس تايم", category: "الجوالات", price: 2999, oldPrice: 3799, rating: 4.8, reviews: 1890, express: true, isMegaDeal: false, isBestseller: true, badge: "عرض خاص", soldCount: "+500 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80" },
  { id: 4, title: "سامسونج جالكسي زد فولد 6 ثنائي الشريحة 512 جيجابايت 12 جيجا رام فضي 5G", category: "الجوالات", price: 6299, oldPrice: 7699, rating: 4.9, reviews: 640, express: true, isMegaDeal: false, isBestseller: false, badge: "هدية سماعة", soldCount: "+200 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80" },
  { id: 5, title: "هونر ماجيك V3 القابل للطي 512 جيجابايت 12 جيجا رام أخضر 5G", category: "الجوالات", price: 5499, oldPrice: 6899, rating: 4.9, reviews: 420, express: true, isMegaDeal: false, isBestseller: false, badge: "أنحف هاتف", soldCount: "+150 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80" },

  // الإلكترونيات واللابتوبات
  { id: 6, title: "أبل ماك بوك إير شاشة 13.6 بوصة شريحة M3 معالج ثماني النواة وذاكرة 256GB", category: "الإلكترونيات", price: 4199, oldPrice: 4799, rating: 4.9, reviews: 830, express: true, isMegaDeal: true, isBestseller: true, badge: "جديد", soldCount: "+400 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" },
  { id: 7, title: "أبل سماعات إيربودز برو (الجيل الثاني) مع علبة شحن MagSafe بمنفذ USB-C", category: "الإلكترونيات", price: 849, oldPrice: 1099, rating: 4.9, reviews: 4120, express: true, isMegaDeal: false, isBestseller: true, badge: "سعر مميز", soldCount: "+1200 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80" },
  { id: 8, title: "شاشة سامسونج سمارت 65 بوصة بدقة 4K Crystal UHD + ساوند بار هدية مجانية", category: "الإلكترونيات", price: 1999, oldPrice: 2899, rating: 4.7, reviews: 950, express: true, isMegaDeal: true, isBestseller: false, badge: "هدية ساوند بار", soldCount: "+320 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80" },
  { id: 9, title: "أبل آيباد إير شاشة 11 بوصة شريحة M2 سعة 128 جيجابايت واي فاي رمادي فلكي", category: "الإلكترونيات", price: 2299, oldPrice: 2699, rating: 4.8, reviews: 710, express: true, isMegaDeal: false, isBestseller: false, badge: "الأكثر طلباً", soldCount: "+280 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80" },
  { id: 10, title: "أبل واتش سيريس 10 مقاس 46 ملم إطار ألمنيوم أسود لامع مع حزام رياضي", category: "الإلكترونيات", price: 1649, oldPrice: 1899, rating: 4.9, reviews: 620, express: true, isMegaDeal: false, isBestseller: true, badge: "وصل حديثاً", soldCount: "+450 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80" },
  { id: 11, title: "أسوس لابتوب الألعاب TUF Gaming شاشة 15.6 بوصة 144Hz معالج i7 وكرت RTX 4060", category: "الإلكترونيات", price: 4299, oldPrice: 5199, rating: 4.8, reviews: 390, express: true, isMegaDeal: false, isBestseller: false, badge: "خصم 150 ر.س إضافي", soldCount: "+190 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80" },

  // الألعاب وبطاقات الهدايا
  { id: 12, title: "سوني جهاز بلايستيشن 5 سليم (PS5 Slim) نسخة الأقراص - إصدار السعودية الرسمي", category: "الألعاب", price: 1849, oldPrice: 2299, rating: 4.9, reviews: 5120, express: true, isMegaDeal: true, isBestseller: true, badge: "عرض الميجا", soldCount: "+1500 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80" },
  { id: 13, title: "سوني يد تحكم لاسلكية DualSense لجهاز بلايستيشن 5 - أبيض وأسود", category: "الألعاب", price: 269, oldPrice: 349, rating: 4.8, reviews: 1840, express: true, isMegaDeal: false, isBestseller: true, badge: "أصلي 100%", soldCount: "+800 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=600&q=80" },
  { id: 14, title: "نينتندو سويتش إصدار شاشة OLED مع وحدات تحكم Joy-Con نيون", category: "الألعاب", price: 1199, oldPrice: 1499, rating: 4.8, reviews: 920, express: true, isMegaDeal: false, isBestseller: false, badge: "كاش باك 150 ر.س", soldCount: "+340 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=600&q=80" },

  // المنزل والمطبخ والأجهزة
  { id: 15, title: "فيليبس قلاية هوائية بحجم عائلي XXL سعة 6.2 لتر بقوة 2000 واط - أسود", category: "المنزل والمطبخ", price: 449, oldPrice: 899, rating: 4.8, reviews: 3120, express: true, isMegaDeal: true, isBestseller: true, badge: "خصم 50%", soldCount: "+1100 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80" },
  { id: 16, title: "ديلونجي ماكينة تحضير القهوة والإسبريسو ديديكا بقوة 1300 واط - ستانلس ستيل", category: "المنزل والمطبخ", price: 699, oldPrice: 999, rating: 4.8, reviews: 1540, express: true, isMegaDeal: false, isBestseller: true, badge: "اختيار نون", soldCount: "+620 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80" },
  { id: 17, title: "دايسون مكنسة كهربائية لاسلكية V15 Detect Absolute بقوة شفط فائقة", category: "المنزل والمطبخ", price: 2399, oldPrice: 3199, rating: 4.9, reviews: 480, express: true, isMegaDeal: false, isBestseller: false, badge: "تقنية الليزر", soldCount: "+210 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80" },
  { id: 18, title: "طقم أواني سُفرة وتقديم وطهي جرانيت غير لاصق مكون من 10 قطع - بيج ملكي", category: "المنزل والمطبخ", price: 299, oldPrice: 599, rating: 4.6, reviews: 870, express: true, isMegaDeal: false, isBestseller: false, badge: "عرض العائلة", soldCount: "+430 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1584990347449-a2d4c2c044c9?auto=format&fit=crop&w=600&q=80" },
  { id: 19, title: "أطقم القهوة والشاي الفاخرة المذهبة 24 قطعة مع صينية تقديم", category: "المنزل والمطبخ", price: 179, oldPrice: 320, rating: 4.8, reviews: 1120, express: true, isMegaDeal: false, isBestseller: false, badge: "ضيافة سعودية", soldCount: "+590 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80" },

  // العطور والجمال
  { id: 20, title: "عطر عود ملكي فاخر أو دي بارفيوم 100 مل - ثبات عالي وفوحان شرقي أصيل", category: "العطور والجمال", price: 189, oldPrice: 380, rating: 4.8, reviews: 1620, express: true, isMegaDeal: true, isBestseller: true, badge: "الأكثر طلباً", soldCount: "+980 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80" },
  { id: 21, title: "ديور عطر سوفاج أو دي بارفيوم للرجال 100 مل - أصلي 100%", category: "العطور والجمال", price: 489, oldPrice: 650, rating: 4.9, reviews: 2890, express: true, isMegaDeal: false, isBestseller: true, badge: "أصلي مضمون", soldCount: "+1300 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80" },
  { id: 22, title: "دايسون جهاز تصفيف الشعر إير راب الملتي ستايلر الكامل للشعر الطويل", category: "العطور والجمال", price: 1999, oldPrice: 2499, rating: 4.9, reviews: 1340, express: true, isMegaDeal: false, isBestseller: false, badge: "إصدار خاص", soldCount: "+410 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80" },
  { id: 23, title: "واقي شمس لاروش بوزيه أنثيليوس غير لامع SPF50+ للبشرة الدهنية والمختلطة", category: "العطور والجمال", price: 79, oldPrice: 135, rating: 4.9, reviews: 3790, express: true, isMegaDeal: false, isBestseller: true, badge: "بيوتي بوكس", soldCount: "+2100 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80" },

  // الأزياء والموضة
  { id: 24, title: "عباية خليجية سوداء فاخرة بتطريز هادئ على الأكمام مع طرحة متناسقة", category: "الأزياء", price: 159, oldPrice: 299, rating: 4.8, reviews: 940, express: true, isMegaDeal: false, isBestseller: true, badge: "موضة 2026", soldCount: "+560 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80" },
  { id: 25, title: "نايكي حذاء الجري الرياضي إير زوم للرجال - مريح وخفيف الوزن", category: "الأزياء", price: 329, oldPrice: 549, rating: 4.7, reviews: 610, express: true, isMegaDeal: false, isBestseller: false, badge: "أصلي 100%", soldCount: "+310 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
  { id: 26, title: "كاسيو ساعة يد كلاسيكية ستانلس ستيل مقاومة للماء - فضي", category: "الأزياء", price: 145, oldPrice: 220, rating: 4.8, reviews: 1450, express: true, isMegaDeal: false, isBestseller: true, badge: "الأكثر مبيعاً", soldCount: "+890 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80" },
  { id: 27, title: "حقيبة ظهر عصرية مقاومة للماء تتسع للابتوب 15.6 بوصة مع منفذ شحن USB", category: "الأزياء", price: 89, oldPrice: 179, rating: 4.6, reviews: 530, express: true, isMegaDeal: false, isBestseller: false, badge: "خصم 50%", soldCount: "+420 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80" },

  // السوبرماركت والبقالة
  { id: 28, title: "أرز بسمتي هندي كلاسيك طويل الحبة - كيس 10 كجم + زيت طبخ هدية", category: "السوبرماركت", price: 79, oldPrice: 115, rating: 4.9, reviews: 3120, express: true, isMegaDeal: true, isBestseller: true, badge: "اشتر 5 واحصل على 5% كاش باك", soldCount: "+2400 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80" },
  { id: 29, title: "مسحوق غسيل أريال الأوتوماتيكي برائحة النظافة الأصلية - 7 كجم", category: "السوبرماركت", price: 64, oldPrice: 95, rating: 4.8, reviews: 1890, express: true, isMegaDeal: false, isBestseller: true, badge: "حجم عائلي", soldCount: "+1750 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80" },
  { id: 30, title: "زيت زيتون بكر ممتاز عصرة أولى على البارد - عبوة 2 لتر", category: "السوبرماركت", price: 85, oldPrice: 120, rating: 4.9, reviews: 940, express: true, isMegaDeal: false, isBestseller: false, badge: "طبيعي 100%", soldCount: "+670 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80" },

  // صُنع في السعودية (محلي)
  { id: 31, title: "بوكس قهوة سعودية فاخرة بالهيل والزعفران مع تمر سكري القصيم ملكي", category: "صُنع في السعودية", price: 95, oldPrice: 140, rating: 4.9, reviews: 1410, express: true, isMegaDeal: false, isBestseller: true, badge: "محلي 🇸🇦", soldCount: "+920 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80" },
  { id: 32, title: "مبخرة خشبية نجدية فاخرة مشغولة يدوياً مع أوقية عود مروكي طبيعي", category: "صُنع في السعودية", price: 135, oldPrice: 210, rating: 4.9, reviews: 680, express: true, isMegaDeal: false, isBestseller: false, badge: "تراث سعودي 🇸🇦", soldCount: "+390 تم بيعها مؤخراً", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80" }
];

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
    title: body.title,
    category: body.category,
    price: Number(body.price),
    oldPrice: Number(body.oldPrice),
    rating: 4.9,
    reviews: 120,
    express: true,
    isMegaDeal: Boolean(body.isMegaDeal),
    isBestseller: true,
    badge: body.badge || "جديد",
    soldCount: "+100 تم بيعها مؤخراً",
    image: body.image
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

  // واجهة متجر نون السعودية المطابقة 100% للموبايل والكمبيوتر
  'src/app/page.jsx': `"use client";
import { useState, useEffect } from "react";
import { initialProducts, trendingKeywords, quickCircles } from "../lib/storeData";

export default function NoonSaudiStore() {
  const [products, setProducts] = useState(initialProducts);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [sortBy, setSortBy] = useState("popular");
  const [city, setCity] = useState("الرياض");
  const [showAppBanner, setShowAppBanner] = useState(true);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
    const savedProds = localStorage.getItem("noon_prods_v3");
    if (savedProds) setProducts(JSON.parse(savedProds));
    const savedUser = localStorage.getItem("noon_user_v3");
    if (savedUser) setUserName(savedUser);

    // تبديل كلمات البحث التلقائي مثل موقع نون الأصلي
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % trendingKeywords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

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
      alert("🎉 تم تفعيل خصم 15% الإضافي بنجاح!");
    } else {
      alert("كود الخصم غير صحيح، جرّب الكود: KSA15 أو ALBILAD");
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
    const savedOrders = JSON.parse(localStorage.getItem("noon_orders_v3") || "[]");
    localStorage.setItem("noon_orders_v3", JSON.stringify([order, ...savedOrders]));
    alert("✅ شكراً لتسوقك من نون السعودية!\\nتم تأكيد طلبك بنجاح ورقم الشحنة: " + order.orderNumber);
    setCart([]);
    setDiscountRate(0);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  }

  const categoriesList = [
    { name: "جميع الفئات", val: "all" },
    { name: "عروض اليوم 🔥", val: "deals" },
    { name: "الجوالات", val: "الجوالات" },
    { name: "الإلكترونيات", val: "الإلكترونيات" },
    { name: "المنزل والمطبخ", val: "المنزل والمطبخ" },
    { name: "العطور والجمال", val: "العطور والجمال" },
    { name: "الأزياء", val: "الأزياء" },
    { name: "السوبرماركت", val: "السوبرماركت" },
    { name: "ألعاب الفيديو", val: "الألعاب" },
    { name: "محلي 🇸🇦", val: "صُنع في السعودية" },
  ];

  // مكون بطاقة المنتج الموحد (Responsive Product Card)
  function ProductCard({ p }) {
    const disc = Math.max(0, Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100));
    const isFav = wishlist.includes(p.id);
    return (
      <div className="bg-white rounded-xl p-2.5 sm:p-3 shadow-xs hover:shadow-md transition border border-gray-100 flex flex-col justify-between relative group">
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="bg-noonDark text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full truncate max-w-[115px]">
              {p.badge}
            </span>
            <button
              onClick={() => toggleWishlist(p.id)}
              className="w-7 h-7 rounded-full bg-white shadow-xs border flex items-center justify-center text-xs"
            >
              {isFav ? "❤️" : "🤍"}
            </button>
          </div>

          <div
            onClick={() => setSelectedProduct(p)}
            className="cursor-pointer h-36 sm:h-44 flex items-center justify-center my-1.5 bg-gray-50 rounded-lg overflow-hidden relative"
          >
            <img
              src={p.image}
              alt={p.title}
              className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p);
              }}
              className="absolute bottom-2 left-2 w-8 h-8 rounded-lg bg-white/95 hover:bg-noonYellow text-noonDark shadow-md border flex items-center justify-center font-black text-base transition"
              title="أضف إلى العربة"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-1 mb-1">
            <span className="bg-noonGreen text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
              {p.rating} ★
            </span>
            <span className="text-[10px] text-gray-400">({p.reviews})</span>
          </div>

          <h3
            onClick={() => setSelectedProduct(p)}
            className="cursor-pointer text-[11px] sm:text-xs font-bold text-noonDark line-clamp-2 h-8 sm:h-9 hover:text-noonBlue leading-snug"
          >
            {p.title}
          </h3>
        </div>

        <div className="mt-2 pt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] text-gray-500">ر.س</span>
            <span className="text-base sm:text-lg font-black text-noonDark">
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
            <p className="text-[9px] text-gray-500 mt-1 truncate">🔥 {p.soldCount}</p>
          )}

          <div className="mt-2 pt-1.5 border-t border-gray-100 flex items-center justify-between">
            <span className="bg-noonYellow text-noonDark text-[10px] font-black px-2 py-0.5 rounded-tl-md rounded-br-md italic">
              إكسبريس
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-500 font-semibold">
              توصيل غداً
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. شريط "نون أفضل عبر التطبيق" الخاص بالموبايل مثل نون السعودية تماماً */}
      {showAppBanner && (
        <div className="md:hidden bg-gray-900 text-white px-3 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <button onClick={() => setShowAppBanner(false)} className="text-gray-400 text-sm px-1">
              ✕
            </button>
            <div className="w-8 h-8 bg-noonYellow text-noonDark rounded-lg flex items-center justify-center font-black text-lg">
              n
            </div>
            <div className="leading-tight">
              <p className="font-bold text-[11px]">نون أفضل عبر التطبيق</p>
              <p className="text-[10px] text-gray-300">عروض حصرية على التطبيق</p>
            </div>
          </div>
          <button
            onClick={() => setCategory("deals")}
            className="bg-noonYellow text-noonDark font-black px-3 py-1 rounded text-xs"
          >
            افتح
          </button>
        </div>
      )}

      {/* 2. الهيدر الأصفر الرسمي لنون السعودية (متجاوب للموبايل والكمبيوتر) */}
      <header className="bg-noonYellow sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-4 py-2.5 space-y-2">
          <div className="flex items-center justify-between gap-2.5 sm:gap-4">
            {/* الشعار وزر القائمة */}
            <div className="flex items-center gap-2 sm:gap-5 shrink-0">
              <button
                onClick={() => setIsCategoriesDrawerOpen(true)}
                className="md:hidden text-noonDark text-xl p-1"
                aria-label="فتح القائمة"
              >
                ☰
              </button>
              <button
                onClick={() => {
                  setCategory("all");
                  setSearch("");
                }}
                className="flex items-center gap-1"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-noonDark text-noonYellow rounded-full flex items-center justify-center font-black text-lg sm:text-xl">
                  n
                </div>
                <span className="font-black text-2xl sm:text-3xl text-black tracking-tight">
                  noon
                </span>
              </button>

              {/* محدد الموقع على الكمبيوتر */}
              <div
                onClick={() => setIsCityModalOpen(true)}
                className="hidden md:flex items-center gap-2 bg-white/40 hover:bg-white/60 px-3 py-1 rounded-md text-xs cursor-pointer transition"
              >
                <img
                  src="https://flagcdn.com/w40/sa.png"
                  alt="KSA"
                  className="w-6 h-4 object-cover rounded-xs"
                />
                <div className="leading-tight">
                  <span className="text-gray-700 block text-[10px]">التوصيل إلى ▼</span>
                  <strong className="font-black text-noonDark">{city}</strong>
                </div>
              </div>
            </div>

            {/* شريط البحث التفاعلي مع الكلمات الدلالية لنون */}
            <div className="flex-1 max-w-3xl relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={"ابحث عن " + trendingKeywords[placeholderIdx] + "..."}
                className="w-full py-2 sm:py-2.5 pr-3.5 pl-9 rounded-lg bg-white text-xs sm:text-sm text-noonDark focus:outline-none shadow-inner"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                🔍
              </span>
            </div>

            {/* أزرار الكمبيوتر (الدخول، المفضلة، العربة) */}
            <div className="hidden md:flex items-center gap-4 text-xs sm:text-sm font-bold text-noonDark shrink-0">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hover:opacity-75 border-l border-noonDark/20 pl-3 flex items-center gap-1.5"
              >
                <span>{userName ? "أهلاً، " + userName : "تسجيل الدخول"}</span>
                <span>👤</span>
              </button>

              <button
                onClick={() => setCategory("wishlist")}
                className="hover:opacity-75 border-l border-noonDark/20 pl-3 flex items-center gap-1.5"
              >
                <span>المفضلة</span>
                <span>❤️ ({wishlist.length})</span>
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-noonDark text-noonYellow px-3.5 py-1.5 rounded-lg flex items-center gap-2"
              >
                <span>العربة</span>
                <span className="bg-noonBlue text-white text-xs px-2 py-0.2 rounded-full font-black">
                  {totalCartCount}
                </span>
              </button>
            </div>

            {/* زر المفضلة السريع على الموبايل */}
            <button
              onClick={() => setCategory("wishlist")}
              className="md:hidden bg-white/60 p-2 rounded-lg text-xs font-bold relative shrink-0"
            >
              ❤️
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
          </div>

          {/* شريط الكلمات البحثية الرائجة السريع (يظهر على الجوال والكمبيوتر مثل نون) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-[11px] pt-0.5">
            {trendingKeywords.map((kw) => (
              <button
                key={kw}
                onClick={() => setSearch(kw)}
                className="bg-white/50 hover:bg-white text-noonDark font-semibold px-2.5 py-0.5 rounded-full shrink-0 transition"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        {/* شريط التوصيل إلى الرياض المخصص لشاشة الجوال */}
        <div
          onClick={() => setIsCityModalOpen(true)}
          className="md:hidden bg-[#fff8a6] px-3 py-1.5 flex items-center justify-between text-xs border-t border-yellow-300 cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <span>📍</span>
            <span className="text-gray-700">التوصيل إلى</span>
            <strong className="font-black text-noonDark underline">{city}</strong>
          </div>
          <span className="text-[10px] text-gray-600">تغيير المدينة ◀</span>
        </div>
      </header>

      {/* 3. شريط التصنيفات الأفقي */}
      <nav className="bg-white border-b py-2 px-3 sm:px-4 shadow-xs sticky top-[104px] md:top-[88px] z-30">
        <div className="max-w-[1440px] mx-auto flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar text-xs sm:text-sm font-bold">
          <button
            onClick={() => setIsCategoriesDrawerOpen(true)}
            className="text-noonBlue flex items-center gap-1.5 shrink-0 border-l pl-3 border-gray-200 font-black"
          >
            <span>☰ الفئات</span>
          </button>
          {categoriesList.map((cat) => (
            <button
              key={cat.val}
              onClick={() => {
                setCategory(cat.val);
                setSearch("");
              }}
              className={
                category === cat.val
                  ? "text-noonBlue border-b-2 border-noonBlue pb-0.5 shrink-0 font-black"
                  : "hover:text-noonBlue shrink-0 text-noonDark"
              }
            >
              {cat.name}
            </button>
          ))}
        </div>
      </nav>

      {/* شريط العروض البنكية السعودية (مصرف البلاد + كاش باك البقالة) */}
      <div className="bg-noonDark text-white text-[11px] sm:text-xs py-2 px-3 text-center flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
        <span className="bg-noonYellow text-noonDark font-black px-2 py-0.5 rounded shrink-0">
          عروض السعودية
        </span>
        <span className="truncate">
          خصم إضافي 15% مع بطاقات مصرف البلاد بكود <strong className="text-noonYellow">ALBILAD</strong> • أو كود <strong className="text-noonYellow">KSA15</strong>
        </span>
      </div>

      {/* المحتوى الرئيسي */}
      <main className="max-w-[1440px] w-full mx-auto px-3 sm:px-4 py-4 flex-1 space-y-5">
        {/* 4. البانر الإعلاني المتحرك والعروض الحصرية */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          <div className="lg:col-span-9 bg-gradient-to-l from-[#14161d] via-[#242938] to-noonDark rounded-2xl p-5 sm:p-9 text-white flex flex-col justify-center relative overflow-hidden min-h-[190px] sm:min-h-[260px]">
            <div className="z-10 max-w-lg space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-noonYellow text-noonDark font-black text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full">
                  عروض نون السعودية الكبرى
                </span>
                <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
                  خصم إضافي 250 ر.س
                </span>
              </div>
              <h1 className="text-xl sm:text-4xl font-black leading-tight">
                تخفيضات حتى <span className="text-noonYellow">70%</span> على الجوالات والأجهزة المنزلية
              </h1>
              <p className="text-gray-300 text-[11px] sm:text-sm">
                قسّط مشترياتك على 4 دفعات بدون فوائد مع تابي وتمارا • توصيل نون إكسبريس مجاني
              </p>
              <button
                onClick={() => setCategory("deals")}
                className="bg-noonYellow text-noonDark font-black px-5 py-2 rounded-lg text-xs sm:text-sm shadow hover:bg-yellow-300 transition"
              >
                تسوق العروض الآن
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80"
              alt="Noon Banner"
              className="absolute left-0 top-0 h-full w-2/5 object-cover opacity-40 sm:opacity-65"
            />
          </div>

          {/* بانرات جانبية */}
          <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3">
            <div
              onClick={() => setCategory("السوبرماركت")}
              className="cursor-pointer bg-gradient-to-br from-emerald-800 to-teal-950 rounded-2xl p-3.5 sm:p-4 text-white flex flex-col justify-between"
            >
              <span className="text-[10px] bg-noonYellow text-black font-black px-2 py-0.5 rounded w-fit">
                عروض السوبرماركت
              </span>
              <h3 className="font-black text-sm sm:text-lg mt-1">
                اشترِ 5 واحصل على 5% كاش باك
              </h3>
              <span className="text-[11px] font-bold text-noonYellow mt-1">تسوق البقالة ←</span>
            </div>
            <div
              onClick={() => setCategory("صُنع في السعودية")}
              className="cursor-pointer bg-gradient-to-br from-green-900 to-stone-900 rounded-2xl p-3.5 sm:p-4 text-white flex flex-col justify-between"
            >
              <span className="text-[10px] bg-white text-emerald-900 font-black px-2 py-0.5 rounded w-fit">
                برنامج محلي 🇸🇦
              </span>
              <h3 className="font-black text-sm sm:text-lg mt-1">منتجات صُنعت في السعودية</h3>
              <span className="text-[11px] font-bold text-noonYellow mt-1">ادعم المحلي ←</span>
            </div>
          </div>
        </section>

        {/* 5. شبكة الدوائر السريعة مزدوجة الصفوف (2-Row Swipable Circles مثل تطبيق نون) */}
        <section className="bg-white p-3.5 sm:p-5 rounded-2xl shadow-xs">
          <div className="grid grid-rows-2 grid-flow-col gap-x-4 gap-y-4 overflow-x-auto no-scrollbar py-1">
            {quickCircles.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCategory(item.cat);
                  setSearch("");
                }}
                className="flex flex-col items-center gap-1.5 w-20 sm:w-24 shrink-0 group"
              >
                <div
                  className={
                    "w-14 h-14 sm:w-18 sm:h-18 rounded-full border-2 flex items-center justify-center text-2xl sm:text-3xl relative shadow-2xs group-hover:scale-105 transition " +
                    item.bg
                  }
                >
                  {item.icon}
                  <span className="absolute -bottom-1.5 bg-noonDark text-noonYellow text-[8px] sm:text-[9px] font-extrabold px-1.5 py-0.2 rounded-full whitespace-nowrap">
                    {item.badge}
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs font-extrabold text-noonDark text-center line-clamp-1 mt-1">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 6. الثلاثي المميز لنون السعودية: (أسباب أكثر للتسوق + عروض الميجا الصفراء + تحت الأضواء) */}
        {category === "all" && !search && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* أسباب أكثر للتسوق */}
            <div className="lg:col-span-4 bg-white p-4 rounded-2xl border shadow-xs flex flex-col justify-between space-y-3">
              <h2 className="text-base sm:text-lg font-black text-noonDark">
                أسباب أكثر للتسوق 🛍️
              </h2>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                <div
                  onClick={() => setCategory("الإلكترونيات")}
                  className="cursor-pointer bg-blue-50 p-3 rounded-xl flex flex-col justify-between"
                >
                  <span className="text-2xl">🎧</span>
                  <div>
                    <h4 className="font-black text-xs sm:text-sm text-noonDark">الأعلى تقييماً</h4>
                    <p className="text-[10px] text-gray-500">منتجات بـ 4.8+ نجوم</p>
                  </div>
                </div>
                <div
                  onClick={() => setCategory("الجوالات")}
                  className="cursor-pointer bg-amber-50 p-3 rounded-xl flex flex-col justify-between"
                >
                  <span className="text-2xl">🚀</span>
                  <div>
                    <h4 className="font-black text-xs sm:text-sm text-noonDark">وصل حديثاً</h4>
                    <p className="text-[10px] text-gray-500">أحدث إصدارات 2026</p>
                  </div>
                </div>
                <div
                  onClick={() => setCategory("deals")}
                  className="cursor-pointer bg-red-50 p-3 rounded-xl flex flex-col justify-between"
                >
                  <span className="text-2xl">🏷️</span>
                  <div>
                    <h4 className="font-black text-xs sm:text-sm text-noonDark">غرفة التصفية</h4>
                    <p className="text-[10px] text-gray-500">خصومات حتى 70%</p>
                  </div>
                </div>
                <div
                  onClick={() => setCategory("العطور والجمال")}
                  className="cursor-pointer bg-pink-50 p-3 rounded-xl flex flex-col justify-between"
                >
                  <span className="text-2xl">🎁</span>
                  <div>
                    <h4 className="font-black text-xs sm:text-sm text-noonDark">هدايا مجانية</h4>
                    <p className="text-[10px] text-gray-500">عروض 1+1 مجاناً</p>
                  </div>
                </div>
              </div>
            </div>

            {/* صندوق عروض الميجا باللون الأصفر الرسمي لنون */}
            <div className="lg:col-span-8 bg-noonYellow p-4 rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-xl font-black text-noonDark">
                    عروض الميجا اليومية ⚡
                  </h2>
                  <span className="bg-red-600 text-white text-[10px] sm:text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                    ⏱️ 09:42:18
                  </span>
                </div>
                <button
                  onClick={() => setCategory("deals")}
                  className="bg-noonDark text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                >
                  كل العروض
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {megaDealsList.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 7. شريط الأكثر مبيعاً في السعودية (Horizontal Carousel للموبايل والكمبيوتر) */}
        {category === "all" && !search && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-xl font-black text-noonDark">
                الأكثر مبيعاً في الرياض والسعودية 🔥
              </h2>
              <span className="text-xs text-noonBlue font-bold">اسحب للمزيد ←</span>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {bestsellersList.map((p) => (
                <div key={p.id} className="w-[165px] sm:w-[220px] shrink-0">
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. شريط الفلترة والترتيب وشبكة كافة المنتجات */}
        <section className="space-y-3">
          <div className="bg-white p-3.5 sm:p-4 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-lg font-black text-noonDark">
                {search
                  ? "نتائج البحث عن: " + search
                  : category === "all"
                  ? "مقترح لك في السعودية"
                  : category === "deals"
                  ? "عروض الميجا والتصفية الكبرى 🔥"
                  : category === "wishlist"
                  ? "قائمة المفضلة ❤️"
                  : "قسم " + category}
              </h2>
              <span className="text-[11px] bg-gray-100 px-2 py-0.5 rounded-full font-bold">
                {filtered.length} منتج
              </span>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-2.5 py-1.5 text-xs font-bold bg-white"
            >
              <option value="popular">الأكثر شعبية</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
              <option value="rating">الأعلى تقييماً</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl text-center space-y-3">
              <p className="font-bold text-gray-500">لا توجد منتجات مطابقة لبحثك حالياً</p>
              <button
                onClick={() => {
                  setCategory("all");
                  setSearch("");
                }}
                className="bg-noonYellow text-noonDark font-black px-4 py-2 rounded-lg text-xs"
              >
                عرض جميع المنتجات
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* 9. الفوتر الرسمي لنون السعودية */}
      <footer className="bg-white border-t mt-10">
        <div className="bg-gray-50 border-b py-5 px-4">
          <div className="max-w-[1440px] mx-auto flex flex-wrap justify-between items-center gap-4 text-xs">
            <div>
              <h3 className="font-black text-sm sm:text-base text-noonDark">
                نحن دائماً جاهزون لمساعدتك
              </h3>
              <p className="text-gray-500">تواصل معنا عبر قنوات الدعم الرسمية في السعودية</p>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 font-bold">
              <div>📧 care@noon.com</div>
              <div>📞 800-116-0210</div>
              <div>💬 help.noon.com</div>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 py-6 flex flex-wrap justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 نون السعودية للتسوق أونلاين. جميع الحقوق محفوظة.</p>
          <div className="flex flex-wrap items-center gap-2 font-bold text-noonDark">
            <span className="border px-2 py-1 rounded bg-gray-50">mada مدى</span>
            <span className="border px-2 py-1 rounded bg-gray-50">Apple Pay</span>
            <span className="border px-2 py-1 rounded bg-gray-50">VISA</span>
            <span className="border px-2 py-1 rounded bg-gray-50 text-emerald-700">tabby تابي</span>
            <span className="border px-2 py-1 rounded bg-gray-50 text-pink-700">tamara تمارا</span>
          </div>
        </div>
      </footer>

      {/* 10. شريط التنقل السفلي الثابت للتليفون (Mobile Sticky Bottom Nav مثل تطبيق نون تماماً) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-40 grid grid-cols-5 py-1.5 text-[10px] font-bold text-gray-500 shadow-lg">
        <button
          onClick={() => {
            setCategory("all");
            setSearch("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={"flex flex-col items-center gap-0.5 " + (category === "all" ? "text-noonBlue font-black" : "")}
        >
          <span className="text-base">🏠</span>
          <span>الرئيسية</span>
        </button>

        <button
          onClick={() => setIsCategoriesDrawerOpen(true)}
          className="flex flex-col items-center gap-0.5"
        >
          <span className="text-base">🗂️</span>
          <span>الفئات</span>
        </button>

        <button
          onClick={() => setCategory("deals")}
          className={"flex flex-col items-center gap-0.5 " + (category === "deals" ? "text-red-600 font-black" : "")}
        >
          <span className="text-base">🔥</span>
          <span>العروض</span>
        </button>

        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="flex flex-col items-center gap-0.5"
        >
          <span className="text-base">👤</span>
          <span>{userName ? userName : "حسابي"}</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-0.5 relative text-noonDark font-black"
        >
          <span className="text-base">🛒</span>
          <span>العربة</span>
          {totalCartCount > 0 && (
            <span className="absolute top-0 right-4 bg-noonBlue text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>

      {/* ================= النوافذ التفاعلية (Modals & Drawers) ================= */}

      {/* درج جميع الفئات للجوال (Categories Mobile Drawer) */}
      {isCategoriesDrawerOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex">
          <div className="bg-white w-72 h-full p-4 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-black text-base text-noonDark">تصفح أقسام نون السعودية</h3>
                <button onClick={() => setIsCategoriesDrawerOpen(false)} className="text-lg font-bold">
                  ✕
                </button>
              </div>
              <div className="space-y-1">
                {categoriesList.map((c) => (
                  <button
                    key={c.val}
                    onClick={() => {
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

      {/* نافذة اختيار المدينة السعودية */}
      {isCityModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-black text-sm sm:text-base">اختر مدينة التوصيل في السعودية 🇸🇦</h3>
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
                  📍 {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* نافذة تفاصيل المنتج السريعة */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-2xl w-full p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 left-3 w-8 h-8 rounded-full bg-gray-100 font-bold"
            >
              ✕
            </button>
            <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center">
              <img src={selectedProduct.image} className="max-h-56 sm:max-h-64 object-contain" />
            </div>
            <div className="flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <span className="text-xs font-bold text-noonBlue">{selectedProduct.category}</span>
                <h2 className="text-sm sm:text-base font-black leading-snug">{selectedProduct.title}</h2>
                <div className="text-xl sm:text-2xl font-black">
                  {Number(selectedProduct.price).toLocaleString()} ر.س
                </div>
                <span className="text-[11px] text-gray-500 block">
                  شامل ضريبة القيمة المضافة السعودية 15%
                </span>
                <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-xs">
                  قسّمها على 4 دفعات شهرية بقيمة{" "}
                  <strong>{Math.round(selectedProduct.price / 4)} ر.س</strong> بدون فوائد مع{" "}
                  <strong>تابي</strong> أو <strong>تمارا</strong>.
                </div>
              </div>
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full bg-noonYellow text-noonDark font-black py-3 rounded-xl shadow"
              >
                إضافة إلى عربة التسوق
              </button>
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
              <button onClick={() => setIsCartOpen(false)} className="font-bold text-xl">
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cart.length === 0 ? (
                <p className="text-center text-gray-400 py-12 font-bold">عربة التسوق فارغة</p>
              ) : (
                cart.map((i) => (
                  <div key={i.id} className="flex items-center gap-3 border p-2.5 rounded-xl">
                    <img src={i.image} className="w-14 h-14 object-cover rounded-lg" />
                    <div className="flex-1 text-xs">
                      <h4 className="font-bold line-clamp-1">{i.title}</h4>
                      <div className="font-black text-noonBlue mt-0.5">
                        {i.price.toLocaleString()} ر.س
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button
                          onClick={() => updateQty(i.id, -1)}
                          className="w-6 h-6 border rounded font-bold"
                        >
                          -
                        </button>
                        <span className="font-bold">{i.qty}</span>
                        <button
                          onClick={() => updateQty(i.id, 1)}
                          className="w-6 h-6 border rounded font-bold"
                        >
                          +
                        </button>
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
                  <button
                    onClick={applyCoupon}
                    className="bg-noonDark text-white px-4 py-2 rounded-lg font-bold"
                  >
                    تطبيق
                  </button>
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

      {/* نافذة إتمام الطلب والدفع */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCheckout}
            className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-3 text-xs sm:text-sm"
          >
            <h3 className="font-black text-base sm:text-lg border-b pb-2">
              عنوان التوصيل والدفع في السعودية 🇸🇦
            </h3>
            <input
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="الاسم الكامل للمستلم"
              className="w-full border p-2.5 rounded-lg"
            />
            <input
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="رقم الجوال السعودي (05XXXXXXXX)"
              className="w-full border p-2.5 rounded-lg"
            />
            <input
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={"العنوان التفصيلي في " + city}
              className="w-full border p-2.5 rounded-lg"
            />
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border p-2.5 rounded-lg font-bold bg-white"
            >
              <option value="بطاقة مدى / فيزا">💳 بطاقة مدى / فيزا</option>
              <option value="تابي / تمارا (4 دفعات)">🛍️ تقسيط تابي / تمارا (4 دفعات بدون فوائد)</option>
              <option value="Apple Pay">🍎 Apple Pay</option>
              <option value="الدفع عند الاستلام">💵 الدفع عند الاستلام</option>
            </select>
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-noonGreen text-white font-black py-2.5 rounded-lg"
              >
                تأكيد الطلب الآن
              </button>
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="px-4 border rounded-lg"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* نافذة تسجيل الدخول */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 text-center">
            <div className="w-12 h-12 bg-noonYellow text-noonDark rounded-full flex items-center justify-center font-black text-2xl mx-auto">
              n
            </div>
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
                localStorage.setItem("noon_user_v3", userName);
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

  // لوحة تحكم الإدارة والتجار المنفصلة تماماً على الرابط /admin
  'src/app/admin/page.jsx': `"use client";
import { useState, useEffect } from "react";
import { initialProducts, initialOrders } from "../../lib/storeData";

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
    const savedProds = localStorage.getItem("noon_prods_v3");
    const savedOrders = localStorage.getItem("noon_orders_v3");
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
    localStorage.setItem("noon_prods_v3", JSON.stringify(updated));
    setTitle(""); setPrice(""); setOldPrice(""); setImage("");
    alert("✅ تم نشر المنتج في متجر نون بنجاح!");
  }

  function deleteProduct(id) {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("noon_prods_v3", JSON.stringify(updated));
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
        <button onClick={() => setIsAuthenticated(false)} className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg text-xs sm:text-sm">
          تسجيل خروج
        </button>
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
          <span className="text-xs text-gray-500 font-bold">عدد المنتجات بالمتجر</span>
          <h3 className="text-2xl font-black mt-1">{products.length} منتج</h3>
        </div>
      </div>

      <form onSubmit={addProduct} className="bg-white p-5 rounded-xl border space-y-3 text-sm shadow-xs">
        <h2 className="font-black text-lg">إضافة منتج جديد لمتجر نون</h2>
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
    </div>
  );
}`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
}
console.log("✅ Noon KSA Mobile-Responsive Replica Completed!");
