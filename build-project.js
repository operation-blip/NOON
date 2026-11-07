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
        noonMaroon: "#5A1508"
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
.express-tag {
  background-color: #FEEE00;
  color: #404553;
  font-weight: 900;
  font-style: italic;
  padding: 1px 7px;
  border-radius: 3px 8px 3px 8px;
  font-size: 10px;
  display: inline-flex;
  align-items: center;
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

// الكروت الـ 12 المربعة السفلية بصور منتجات استوديو مفرغة نظيفة مطابقة للصورة المرفقة
export const promoSquareCards = [
  { title: "شيك العروض", badge: "تبدأ من 1", is1111: true, cat: "deals", img: "" },
  { title: "المقاضي", badge: "تبدأ من 1", cat: "البقالة", img: "https://m.media-amazon.com/images/I/81I6xQ78H2L._AC_SL1500_.jpg" },
  { title: "الجوالات", badge: "خصم حتى 50%", cat: "الإلكترونيات", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=512&hei=512&fmt=jpeg&qlt=90" },
  { title: "اللابتوبات", badge: "خصم حتى 150", cat: "الإلكترونيات", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=512&hei=512&fmt=jpeg&qlt=90" },
  { title: "العناية الشخصية", badge: "خصم إضافي 10%", cat: "الجمال والعطور", img: "https://m.media-amazon.com/images/I/71k7R22+kXL._AC_SL1500_.jpg" },
  { title: "أزياء النساء", badge: "خصم 50-80%", cat: "أزياء النساء", img: "https://m.media-amazon.com/images/I/61S7BrCBj7L._AC_SL1500_.jpg" },
  { title: "أزياء الرجال", badge: "خصم 50-80%", cat: "أزياء الرجال", img: "https://m.media-amazon.com/images/I/61C+8r8rGJL._AC_SL1500_.jpg" },
  { title: "مكائن القهوة", badge: "خصم حتى 60%", cat: "المنزل", img: "https://m.media-amazon.com/images/I/61X8tA3tF1L._AC_SL1500_.jpg" },
  { title: "الصحة والتغذية", badge: "رصيد مسترجع 250", cat: "الصحة والتغذية", img: "https://m.media-amazon.com/images/I/71wF7Y6Q+JL._AC_SL1500_.jpg" },
  { title: "السماعات", badge: "خصم حتى 70%", cat: "الإلكترونيات", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-spacegray-202011?wid=512&hei=512&fmt=jpeg&qlt=90" },
  { title: "أجهزة للارتداء", badge: "خصم حتى 60%", cat: "الإلكترونيات", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-s10-202409?wid=512&hei=512&fmt=jpeg&qlt=90" },
  { title: "شنط الظهر", badge: "تبدأ من 19", cat: "أزياء الرجال", img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_SL1500_.jpg" }
];

// كتالوج منتجات حقيقي بصور منتجات استوديو على خلفية بيضاء نظيفة (بدون أي صور Unsplash)
const studioProductsRaw = [
  // الإلكترونيات والجوالات
  ["أبل", "آيفون 16 برو ماكس سعة 256 جيجابايت تيتانيوم صحراوي الجيل الخامس 5G مع فيس تايم", "الإلكترونيات", 5199, 5699, "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=800&hei=800&fmt=jpeg&qlt=90"],
  ["أبل", "آيفون 16 برو سعة 128 جيجابايت تيتانيوم طبيعي الجيل الخامس 5G", "الإلكترونيات", 4299, 4699, "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium?wid=800&hei=800&fmt=jpeg&qlt=90"],
  ["أبل", "آيفون 16 سعة 128 جيجابايت أزرق ألترامارين الجيل الخامس 5G", "الإلكترونيات", 3499, 3799, "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=800&hei=800&fmt=jpeg&qlt=90"],
  ["سامسونج", "جالكسي S24 ألترا ثنائي الشريحة 256 جيجابايت رام 12GB تيتانيوم رمادي 5G", "الإلكترونيات", 3899, 5399, "https://m.media-amazon.com/images/I/71WcjsOVOmL._AC_SL1500_.jpg"],
  ["سامسونج", "جالكسي زد فولد 6 ثنائي الشريحة سعة 512 جيجابايت فضي شادو 5G", "الإلكترونيات", 5999, 7299, "https://m.media-amazon.com/images/I/61BgEfmZC8L._AC_SL1500_.jpg"],
  ["أبل", "ماك بوك إير شاشة 13.6 بوصة شريحة M3 ذاكرة 256GB SSD سماء الليل", "الإلكترونيات", 4199, 4799, "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=800&hei=800&fmt=jpeg&qlt=90"],
  ["أبل", "ماك بوك برو 14 بوصة شريحة M3 Pro رام 18GB وذاكرة 512GB أسود فلكي", "الإلكترونيات", 7499, 8499, "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=800&hei=800&fmt=jpeg&qlt=90"],
  ["أبل", "آيباد برو 11 بوصة شاشة Ultra Retina XDR شريحة M4 سعة 256GB", "الإلكترونيات", 3899, 4399, "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-select-202405-11inch-spaceblack?wid=800&hei=800&fmt=jpeg&qlt=90"],
  ["أبل", "سماعة إيربودز برو (الجيل الثاني) مع علبة شحن MagSafe بمنفذ USB-C", "الإلكترونيات", 849, 1099, "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=800&hei=800&fmt=jpeg&qlt=90"],
  ["أبل", "سماعة الرأس اللاسلكية AirPods Max بخاصية إلغاء الضجيج النشط - رمادي فلكي", "الإلكترونيات", 1999, 2399, "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-spacegray-202011?wid=800&hei=800&fmt=jpeg&qlt=90"],
  ["أبل", "ساعة أبل واتش سيريس 10 مقاس 46 ملم إطار ألمنيوم أسود لامع", "الإلكترونيات", 1649, 1899, "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-s10-202409?wid=800&hei=800&fmt=jpeg&qlt=90"],
  ["سوني", "سماعة الرأس اللاسلكية WH-1000XM5 العازلة للضوضاء بالكامل - أسود", "الإلكترونيات", 1149, 1599, "https://m.media-amazon.com/images/I/51aXvjzcukL._AC_SL1500_.jpg"],
  ["جي بي إل", "سماعة بلوتوث محمولة JBL Flip 6 مقاومة للماء بقوة صوت فائقة", "الإلكترونيات", 379, 549, "https://m.media-amazon.com/images/I/61d5F64UDpL._AC_SL1500_.jpg"],

  // الألعاب
  ["سوني", "جهاز بلايستيشن 5 سليم (PS5 Slim) نسخة الأقراص سعة 1 تيرابايت - إصدار السعودية", "الألعاب", 1849, 2299, "https://m.media-amazon.com/images/I/41c+1k91kYL._AC_SL1000_.jpg"],
  ["سوني", "يد تحكم لاسلكية DualSense لجهاز بلايستيشن 5 - أبيض", "الألعاب", 269, 349, "https://m.media-amazon.com/images/I/61O9tWR6WDS._AC_SL1500_.jpg"],
  ["نينتندو", "جهاز نينتندو سويتش شاشة OLED مع وحدات تحكم Joy-Con نيون", "الألعاب", 1199, 1499, "https://m.media-amazon.com/images/I/61dYrzvBLbL._AC_SL1500_.jpg"],

  // المنزل والمطبخ
  ["فيليبس", "قلاية هوائية بحجم عائلي XXL سعة 6.2 لتر بقوة 2000 واط - أسود", "المنزل", 449, 899, "https://m.media-amazon.com/images/I/71+2bd2P4zL._AC_SL1500_.jpg"],
  ["ديلونجي", "ماكينة تحضير القهوة والإسبريسو ديديكا أرتي 15 بار ستانلس ستيل", "المنزل", 699, 999, "https://m.media-amazon.com/images/I/61X8tA3tF1L._AC_SL1500_.jpg"],
  ["سميج (SMEG)", "حماصة خبز ريترو بفتحتين بتصميم الخمسينات الإيطالي - أخضر باستيل", "المنزل", 649, 899, "https://m.media-amazon.com/images/I/51rA8-t2p2L._AC_SL1000_.jpg"],
  ["ستانلي", "مج حراري Quencher H2.0 حافظ للبرودة سعة 1.18 لتر بمصاصة - برتقالي", "المنزل", 169, 240, "https://m.media-amazon.com/images/I/51wX7O6xL6L._AC_SL1500_.jpg"],
  ["دايسون", "مكنسة كهربائية لاسلكية V15 Detect Absolute بكاشف الغبار الليزري", "المنزل", 2399, 3199, "https://m.media-amazon.com/images/I/61M6l+F6NBL._AC_SL1500_.jpg"],
  ["نسبرسو", "ماكينة قهوة كبسولات إيسينزا ميني مع خافق حليب إيروتشينو - أسود", "المنزل", 549, 849, "https://m.media-amazon.com/images/I/61f2G9rT8EL._AC_SL1500_.jpg"],

  // الجمال والعطور والصحة
  ["الماجد للعود", "عطر برستيج روبي أو دي بارفيوم 100 مل - عروض 11.11 الحصرية", "الجمال والعطور", 165, 330, "https://m.media-amazon.com/images/I/61tE7I0fP0L._AC_SL1500_.jpg"],
  ["ديور", "عطر سوفاج أو دي بارفيوم للرجال 100 مل - أصلي 100%", "الجمال والعطور", 489, 650, "https://m.media-amazon.com/images/I/61A8c5-yKVL._AC_SL1500_.jpg"],
  ["دايسون", "جهاز تصفيف الشعر إير راب الملتي ستايلر الكامل للشعر الطويل", "الجمال والعطور", 1999, 2499, "https://m.media-amazon.com/images/I/61g8G9R5ZBL._AC_SL1500_.jpg"],
  ["فيليبس", "ماكينة حلاقة وتنعيم اللحية للرجال OneBlade مقاومة للماء", "الجمال والعطور", 149, 249, "https://m.media-amazon.com/images/I/71k7R22+kXL._AC_SL1500_.jpg"],
  ["ناو فودز", "أوميجا 3 زيت السمك المقطر جزيئياً 1000 مجم - 200 كبسولة هلامية", "الصحة والتغذية", 65, 110, "https://m.media-amazon.com/images/I/71wF7Y6Q+JL._AC_SL1500_.jpg"],

  // البقالة والأزياء
  ["تايد", "مسحوق غسيل أوتوماتيكي مركز برائحة داوني الأصلية - 7 كجم", "البقالة", 59, 98, "https://m.media-amazon.com/images/I/81I6xQ78H2L._AC_SL1500_.jpg"],
  ["أديداس", "شنطة ظهر كلاسيكية مبطنة للابتوب والجامعة مقاومة للماء - أسود", "أزياء الرجال", 89, 179, "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_SL1500_.jpg"],
  ["كاسيو", "ساعة يد رجالية كلاسيكية ستانلس ستيل مقاومة للماء - فضي", "أزياء الرجال", 145, 220, "https://m.media-amazon.com/images/I/61C+8r8rGJL._AC_SL1500_.jpg"]
];

export function buildCleanCatalog(rawList, startId = 1) {
  const badges = ["عروض 11.11", "الأكثر مبيعاً", "خصم بنك البلاد 15%", "أقل سعر بالسنة", "هدية مجانية", "اختيار نون"];
  return rawList.map((item, idx) => ({
    id: startId + idx,
    brand: item[0],
    sku: "N" + (500000 + startId + idx) + "KSA",
    title: item[0] + " " + item[1],
    category: item[2],
    price: item[3],
    oldPrice: item[4],
    rating: Number((4.7 + (idx % 3) * 0.1).toFixed(1)),
    reviews: 210 + (idx * 87) % 3800,
    express: true,
    isMegaDeal: idx < 12,
    isBestseller: idx % 2 === 0,
    badge: badges[idx % badges.length],
    soldCount: "+" + (200 + (idx * 65) % 900) + " تم بيعها مؤخراً",
    image: item[5],
    gallery: [item[5]],
    colors: ["اللون الأصلي", "إصدار أسود", "إصدار فضي"],
    sizes: ["النسخة القياسية", "نسخة Pro"],
    highlights: [
      "منتج أصلي 100% بضمان الوكيل الرسمي في المملكة العربية السعودية لمدة سنتين",
      "مشمول في مهرجان عروض 11.11 الكبرى في نون السعودية مع شحن إكسبريس مجاني",
      "خصم إضافي 15% لحاملي بطاقات بنك البلاد أو 10% كاش باك ببطاقة نون الأول VISA",
      "قسّمها على 4 دفعات شهرية بدون فوائد أو رسوم عبر تابي أو تمارا"
    ],
    specs: {
      "العلامة التجارية": item[0],
      "القسم": item[2],
      "رقم الموديل": "N" + (500000 + startId + idx) + "KSA",
      "الضمان": "سنتين ضمان الوكيل بالسعودية",
      "الشحن": "نون إكسبريس السريع"
    }
  }));
}

export function generate100StudioBatch(batchNumber = 1) {
  const generatedRaw = [];
  const specsVar = [
    "إصدار الشرق الأوسط الرسمي", "النسخة المطورة 2026", "حجم التوفير العائلي",
    "الإصدار الاحترافي المحدود", "مع ضمان سنتين شامل", "الجيل الجديد كلياً",
    "نسخة الخليج المعتمدة", "الباقة المتكاملة مع الملحقات", "إصدار مهرجان 11.11", "الأكثر طلباً في الرياض"
  ];
  for (let i = 0; i < 100; i++) {
    const base = studioProductsRaw[i % studioProductsRaw.length];
    const variantText = specsVar[Math.floor(i / studioProductsRaw.length) % specsVar.length];
    const priceOffset = ((i * 17) % 90) - 30;
    const finalPrice = Math.max(35, base[3] + priceOffset);
    generatedRaw.push([
      base[0],
      base[1] + " - " + variantText + " [دفعة #" + batchNumber + "-" + (i + 1) + "]",
      base[2],
      finalPrice,
      Math.round(finalPrice * 1.32),
      base[5]
    ]);
  }
  return buildCleanCatalog(generatedRaw, Date.now());
}

export const initialProducts = buildCleanCatalog(studioProductsRaw, 1);

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
    reviews: 240,
    express: true,
    isMegaDeal: Boolean(body.isMegaDeal),
    isBestseller: true,
    badge: body.badge || "عروض 11.11",
    soldCount: "+300 تم بيعها مؤخراً",
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

  // الواجهة الرئيسية المطابقة للصورة وكود نون الأصلي
  'src/app/page.jsx': `"use client";
import { useState, useEffect, useRef } from "react";
import { initialProducts, navCategories, promoSquareCards } from "../lib/storeData";

// رمز عملة الريال السعودي الجديد في موقع نون (SAR Symbol SVG) + أيقونات نون الأصلية
const Icons = {
  SarSymbol: ({ className = "w-3.5 h-3.5 inline-block" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 3v18h2v-6h8v-2H8V9h9V7H8V3H6zm11 10v2h3v-2h-3zm-3 4v2h6v-2h-6z" />
    </svg>
  ),
  NoonLogoAr: () => (
    <div className="flex items-center gap-1.5 select-none">
      <span className="font-black text-[26px] sm:text-[30px] text-[#111] tracking-tight leading-none">نون</span>
      <svg className="w-7 h-7 text-[#111]" viewBox="0 0 40 40" fill="none">
        <path d="M11 22.5C11 28.299 15.701 33 21.5 33C27.299 33 32 28.299 32 22.5C32 19.8 30.9 17.3 29.2 15.5C30.3 17.2 30.8 19.3 30.4 21.5C29.6 26.2 25.3 29.5 20.5 29.1C15.7 28.7 12 24.7 12 19.9C12 18.2 12.5 16.6 13.3 15.3C11.8 17.3 11 19.8 11 22.5Z" fill="currentColor"/>
        <circle cx="21.5" cy="12.5" r="2.8" fill="currentColor"/>
      </svg>
    </div>
  ),
  Pin: () => (
    <svg className="w-4 h-4 text-[#111] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Search: () => (
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  ),
  User: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  ),
  OrdersBox: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  Heart: ({ filled }) => (
    <svg className={"w-4 h-4 transition " + (filled ? "text-red-500 fill-red-500" : "text-current fill-none")} stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Cart: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  Star: () => (
    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  ReplayBadge: () => (
    <div className="w-6 h-6 rounded-md bg-black/55 text-white flex items-center justify-center text-xs backdrop-blur-xs">
      ↻
    </div>
  )
};

export default function NoonSaudiExactReplica() {
  const [products, setProducts] = useState(initialProducts);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [city, setCity] = useState("الرياض");
  const [showCookie, setShowCookie] = useState(true);

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
    const savedProds = localStorage.getItem("noon_prods_v6");
    if (savedProds) setProducts(JSON.parse(savedProds));
    const savedOrders = localStorage.getItem("noon_orders_v6");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    const savedUser = localStorage.getItem("noon_user_v6");
    if (savedUser) setUserName(savedUser);
  }, []);

  function scrollPromoStrip(dir) {
    if (stripRef.current) {
      stripRef.current.scrollBy({ left: dir * 350, behavior: "smooth" });
    }
  }

  function openFullProductPage(p) {
    setActiveProduct(p);
    setActiveImage(p.image);
    setSelectedColor(p.colors?.[0] || "اللون الأصلي");
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
    localStorage.setItem("noon_orders_v6", JSON.stringify(updatedOrders));
    alert("تم تأكيد طلبك بنجاح! رقم الشحنة: " + order.orderNumber);
    setCart([]);
    setDiscountRate(0);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  }

  // بطاقة منتج نون الأصلية بصور استوديو مفرغة على خلفية بيضاء
  function ProductCard({ p }) {
    const disc = Math.max(0, Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100));
    const isFav = wishlist.includes(p.id);
    return (
      <div
        onClick={() => openFullProductPage(p)}
        className="cursor-pointer bg-white rounded-xl p-2.5 sm:p-3 border border-gray-200/80 hover:shadow-md transition-all flex flex-col justify-between relative group"
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

          <div className="relative h-44 sm:h-48 flex items-center justify-center my-1 bg-white rounded-lg overflow-hidden p-3">
            <img
              src={p.image}
              alt={p.title}
              className="h-full w-full object-contain group-hover:scale-105 transition duration-300"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p);
              }}
              className="absolute bottom-1.5 left-1.5 w-8 h-8 rounded-lg bg-white hover:bg-noonYellow text-noonDark shadow-md border border-gray-200 flex items-center justify-center transition"
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
            <span className="text-base sm:text-lg font-black text-noonDark tracking-tight">
              {Number(p.price).toLocaleString()}
            </span>
            <Icons.SarSymbol className="w-3.5 h-3.5 text-noonDark" />
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
            <span className="express-tag">إكسبريس</span>
            <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold">توصيل غداً</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ================================================================= */}
      {/* 1. الهيدر الأصفر العلوي المطابق للصورة المرفقة */}
      {/* ================================================================= */}
      <header className="bg-noonYellow sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 h-[58px] flex items-center justify-between gap-3 sm:gap-6">
          
          {/* اليمين: شعار نون + أكّد - الرياض */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <button
              onClick={() => {
                setActiveProduct(null);
                setCategory("all");
                setSearch("");
              }}
            >
              <Icons.NoonLogoAr />
            </button>

            <button
              onClick={() => setIsCityModalOpen(true)}
              className="flex items-center gap-1 text-xs sm:text-[13px] text-[#111] hover:opacity-80 transition"
            >
              <Icons.Pin />
              <span className="font-semibold hidden sm:inline">أكّد -</span>
              <strong className="font-extrabold">{city}</strong>
              <span className="text-[10px] mr-0.5">▾</span>
            </button>
          </div>

          {/* المنتصف: شريط البحث العريض مع أيقونة العدسة على اليمين كما في الصورة */}
          <div className="flex-1 max-w-[680px] relative">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setActiveProduct(null);
                setSearch(e.target.value);
              }}
              placeholder="بحث عن مسحوق غسيل"
              className="w-full h-[38px] pr-9 pl-4 rounded-[5px] bg-white text-xs sm:text-[13px] text-noonDark placeholder-gray-500 focus:outline-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              <Icons.Search />
            </span>
          </div>

          {/* اليسار: English 文A | تسجيل الدخول | الطلبات | المفضلة | عربة التسوق */}
          <div className="hidden lg:flex items-center gap-3.5 text-[12px] font-bold text-[#111] shrink-0">
            <button className="hover:opacity-75 flex items-center gap-1.5">
              <span>English</span>
              <span className="text-[11px] font-semibold">文A</span>
            </button>

            <span className="h-3.5 w-[1px] bg-black/20" />

            <button onClick={() => setIsAuthModalOpen(true)} className="hover:opacity-75 flex items-center gap-1.5">
              <span>{userName ? userName : "تسجيل الدخول"}</span>
              <Icons.User />
            </button>

            <span className="h-3.5 w-[1px] bg-black/20" />

            <button onClick={() => setIsOrdersModalOpen(true)} className="hover:opacity-75 flex items-center gap-1.5">
              <span>الطلبات</span>
              <Icons.OrdersBox />
            </button>

            <span className="h-3.5 w-[1px] bg-black/20" />

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

            <span className="h-3.5 w-[1px] bg-black/20" />

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

          {/* زر العربة للموبايل */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="lg:hidden bg-[#111] text-noonYellow px-2.5 py-1.5 rounded text-xs font-bold flex items-center gap-1 shrink-0"
          >
            <Icons.Cart />
            <span>{totalCartCount}</span>
          </button>
        </div>
      </header>

      {/* ================================================================= */}
      {/* 2. شريط التصنيفات الأبيض + كبسولة "احصل على توصيل مجاني مع نون one" */}
      {/* ================================================================= */}
      <nav className="bg-white border-b border-gray-200 sticky top-[58px] z-30">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 h-[42px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-[18px] overflow-x-auto no-scrollbar text-[12px] sm:text-[13px] font-bold text-[#111]">
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

          {/* كبسولة نون one المطابقة للصورة */}
          <button
            onClick={() => setCategory("deals")}
            className="hidden xl:flex items-center gap-1.5 border border-[#FEEE00] bg-[#FFFDF0] hover:bg-noonYellow/20 px-3 py-1 rounded-full text-[11px] font-extrabold text-[#111] shrink-0 shadow-2xs"
          >
            <span>احصل على توصيل مجاني مع</span>
            <span className="font-black text-[#111]">نون</span>
            <span className="bg-[#111] text-noonYellow px-1.5 py-0.2 rounded-full text-[9px] font-black">one</span>
            <span className="text-xs">‹</span>
          </button>
        </div>
      </nav>

      {/* ================================================================= */}
      {/* 3. عرض صفحة المنتج الكاملة أو الهوم بيدج المطابق للصورة */}
      {/* ================================================================= */}
      {activeProduct ? (
        <main className="max-w-[1380px] w-full mx-auto px-3 sm:px-6 py-5 flex-1 space-y-6">
          <div className="flex items-center justify-between bg-[#F7F7FA] px-4 py-2.5 rounded-xl border border-gray-200 text-xs">
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

          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 shadow-xs">
            <div className="lg:col-span-4 flex flex-col-reverse sm:flex-row gap-3">
              <div className="flex sm:flex-col gap-2 overflow-x-auto no-scrollbar shrink-0">
                {(activeProduct.gallery || [activeProduct.image]).map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(imgUrl)}
                    className={"w-16 h-16 rounded-lg border-2 p-1 bg-white " + (activeImage === imgUrl ? "border-noonBlue" : "border-gray-200")}
                  >
                    <img src={imgUrl} className="w-full h-full object-contain" alt="thumb" />
                  </button>
                ))}
              </div>
              <div className="flex-1 bg-white rounded-xl p-4 flex items-center justify-center relative min-h-[320px] border border-gray-100">
                <span className="absolute top-3 right-3 bg-noonDark text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {activeProduct.badge}
                </span>
                <img src={activeImage || activeProduct.image} alt={activeProduct.title} className="max-h-[300px] w-full object-contain" />
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
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-noonDark">
                    {Number(activeProduct.price).toLocaleString()}
                  </span>
                  <Icons.SarSymbol className="w-4 h-4 text-noonDark" />
                  <span className="text-xs text-gray-400 mr-1">(شامل ضريبة القيمة المضافة 15%)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400">كان: <del>{Number(activeProduct.oldPrice).toLocaleString()}</del></span>
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
                  <span className="express-tag">إكسبريس</span>
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
        <main className="max-w-[1440px] w-full mx-auto px-3 sm:px-6 py-4 flex-1 space-y-5">
          
          {/* =============================================================== */}
          {/* البانرات الـ 4 العلوية بصور المنتجات المفرغة المطابقة للصورة */}
          {/* =============================================================== */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            
            {/* 1. يمين الصورة: بانر صندوق عافية السماوي */}
            <div
              onClick={() => setCategory("الصحة والتغذية")}
              className="cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-b from-[#BCE6FF] via-[#DDF2FF] to-[#9CDCFF] p-5 flex flex-col justify-between relative h-[380px] sm:h-[410px] shadow-2xs group"
            >
              <div className="text-left space-y-0.5 z-10">
                <p className="text-xs font-extrabold text-[#111]">لك مجاناً</p>
                <h2 className="text-[28px] sm:text-[32px] font-black text-[#111] leading-tight">صندوق عافية</h2>
                <p className="text-[12px] font-bold text-[#111]/85 flex items-center justify-end gap-1">
                  <span>بإصدار محدود للطلبات بـ 499</span>
                  <Icons.SarSymbol className="w-3 h-3" />
                  <span>وأكثر</span>
                </p>
                <div className="pt-1 flex justify-end">
                  <span className="bg-[#FFD15C] text-[#111] font-black text-xs px-2.5 py-0.5 rounded inline-flex items-center gap-1 shadow-2xs">
                    <span>قيمته 1,200</span>
                    <Icons.SarSymbol className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* صورة منتجات العافية المفرغة */}
              <div className="relative h-48 flex items-center justify-center my-auto">
                <img
                  src="https://m.media-amazon.com/images/I/71wF7Y6Q+JL._AC_SL1500_.jpg"
                  alt="صندوق عافية"
                  className="max-h-44 object-contain mix-blend-multiply group-hover:scale-105 transition"
                />
              </div>

              <div className="flex items-center justify-between text-[9px] text-gray-700 z-10">
                <Icons.ReplayBadge />
                <span>*تطبق الشروط والأحكام</span>
              </div>
            </div>

            {/* 2. البانر الثاني: EMAAR الكحلي الفاخر */}
            <div
              onClick={() => setCategory("المنزل")}
              className="cursor-pointer rounded-2xl overflow-hidden bg-[#061B33] text-white flex flex-col justify-between relative h-[380px] sm:h-[410px] shadow-2xs group"
            >
              <div className="p-5 text-center space-y-1 z-10">
                <p className="italic font-serif text-xl sm:text-2xl text-[#E5C185]">Luxury Homes</p>
                <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-gray-200">LIKE NO OTHER</p>
                <p className="text-[9px] text-gray-400 pt-1">STARTING FROM</p>
                <div className="border border-white/25 bg-white/5 rounded-md py-1 px-4 inline-flex items-center gap-1.5">
                  <Icons.SarSymbol className="w-4 h-4 text-white" />
                  <span className="text-xl font-black tracking-wide">1.8Mn</span>
                </div>
                <p className="text-sm font-bold tracking-[0.28em] pt-1">EMAAR</p>
              </div>
              <div className="h-52 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80"
                  alt="EMAAR"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            {/* 3. البانر الثالث: عروض 11.11 بدعم من الماجد للعود + بنك البلاد */}
            <div
              onClick={() => setCategory("الجمال والعطور")}
              className="cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-b from-[#8A5CF6] via-[#C8A8FF] to-[#EFE4FF] p-4 flex flex-col justify-between relative h-[380px] sm:h-[410px] shadow-2xs group"
            >
              <div className="text-center space-y-1 z-10">
                <div className="inline-block bg-noonYellow text-[#111] border border-[#111] font-black px-3 py-0.2 rounded text-xs shadow-2xs">
                  عروض
                </div>
                <div className="text-3xl font-black text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)] leading-none">
                  11.11
                </div>
                <span className="bg-white text-[#D61F69] font-black text-[11px] px-3 py-0.5 rounded shadow-2xs inline-block">
                  بدأت الحين
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#111] pt-0.5">عروض جديدة كل يوم</h3>
                <div className="bg-white rounded-md px-3 py-1 inline-flex items-center gap-2 text-[11px] font-bold text-[#111] shadow-2xs">
                  <span>بدعم من:</span>
                  <strong className="font-black text-[#111]">الماجد للعود</strong>
                </div>
              </div>

              {/* منتجات مفرغة (جوال + عطر + سماعة JBL) */}
              <div className="my-1 flex items-center justify-center gap-2 h-32">
                <img
                  src="https://m.media-amazon.com/images/I/61A8c5-yKVL._AC_SL1500_.jpg"
                  alt="Perfume"
                  className="h-24 object-contain mix-blend-multiply group-hover:scale-105 transition"
                />
                <img
                  src="https://m.media-amazon.com/images/I/61d5F64UDpL._AC_SL1500_.jpg"
                  alt="JBL"
                  className="h-24 object-contain mix-blend-multiply group-hover:scale-105 transition"
                />
              </div>

              <div className="bg-white rounded-xl p-2 text-center shadow-xs border border-purple-100 relative">
                <p className="text-xs font-black text-[#111]">
                  خصم إضافي 15%* <span className="text-[#C81E1E] font-bold mr-1">بنك البلاد</span>
                </p>
                <p className="text-[9px] text-gray-500">مع بطاقات الخصم المباشر أو مسبقة الدفع</p>
              </div>
            </div>

            {/* 4. يسار الصورة: مقسوم إلى بطاقة نون الأول VISA بالأعلى + بانر أقل أسعار السنة بالأسفل */}
            <div className="flex flex-col gap-3.5 h-[380px] sm:h-[410px]">
              {/* البطاقة العلوية الصفراء: نون | الأول SAB */}
              <div
                onClick={() => setCategory("deals")}
                className="cursor-pointer h-[155px] bg-gradient-to-l from-[#FFF04D] to-noonYellow rounded-2xl p-4 flex items-center justify-between gap-2 shadow-2xs relative overflow-hidden group"
              >
                <div className="space-y-1 z-10 text-right">
                  <div className="flex items-center gap-1.5 text-xs font-black text-[#111]">
                    <span>نون</span>
                    <span>|</span>
                    <span className="text-[10px] font-extrabold">الأول SAB</span>
                    <span className="bg-red-600 text-white px-1 rounded text-[9px]">⟨⟩</span>
                  </div>
                  <h3 className="text-base sm:text-[17px] font-black text-[#111] leading-tight">
                    10% استرداد نقدي
                  </h3>
                  <p className="text-xs font-bold text-[#111]/80">كرصيد نون</p>
                  <p className="text-xs font-black text-[#111] flex items-center gap-1">
                    <span>+ 250</span>
                    <Icons.SarSymbol className="w-3 h-3" />
                    <span>مكافأة ترحيبية</span>
                  </p>
                  <span className="text-[8px] text-gray-700 block">*تطبق الشروط والأحكام</span>
                </div>

                {/* بطاقة فيزا نون الصفراء */}
                <div className="w-32 h-22 bg-noonYellow rounded-xl border border-yellow-500 shadow-md p-2.5 flex flex-col justify-between shrink-0 group-hover:scale-105 transition">
                  <div className="flex justify-between items-center text-[9px] font-black text-[#111]">
                    <span className="text-red-600">⟨⟩ SAB</span>
                    <span>VISA</span>
                  </div>
                  <div className="font-black text-2xl text-[#111] tracking-tighter text-left">noon</div>
                </div>
              </div>

              {/* البطاقة السفلية البنفسجية: أقل أسعار السنة مع صورة التوستر والمج الحراري المفرغة */}
              <div
                onClick={() => setCategory("المنزل")}
                className="cursor-pointer flex-1 bg-gradient-to-br from-[#8C52FF] via-[#A87BFF] to-[#D4B8FF] rounded-2xl p-4 text-white flex flex-col justify-between shadow-2xs relative overflow-hidden group"
              >
                <div className="flex justify-between items-start z-10">
                  <div className="text-right">
                    <h3 className="text-xl sm:text-2xl font-black leading-tight text-white">أقل أسعار السنة</h3>
                    <p className="text-xs text-white/90 font-bold">عروض جديدة كل يوم</p>
                  </div>
                  <div className="bg-noonYellow text-[#111] px-2.5 py-1 rounded-b-xl font-black text-center leading-tight shadow">
                    <span className="text-[10px] block">عروض</span>
                    <span className="text-base text-fuchsia-700">11.11</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 my-auto z-10">
                  <img
                    src="https://m.media-amazon.com/images/I/51rA8-t2p2L._AC_SL1000_.jpg"
                    alt="SMEG Toaster"
                    className="h-24 object-contain mix-blend-multiply rounded-lg bg-white/80 p-1 group-hover:scale-105 transition"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/51wX7O6xL6L._AC_SL1500_.jpg"
                    alt="Stanley"
                    className="h-24 object-contain mix-blend-multiply rounded-lg bg-white/80 p-1 group-hover:scale-105 transition"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================== */}
          {/* 4. شريط الكروت الـ 12 المربعة ذات الإطار الأصفر والشريط البني السفلي */}
          {/* =============================================================== */}
          <section className="bg-[#FFF9EB] p-3.5 sm:p-4 rounded-2xl border border-[#F5E6C8] relative">
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
                  className="cursor-pointer w-[98px] sm:w-[108px] shrink-0 flex flex-col items-center group"
                >
                  {/* المربع الأصفر بصور المنتجات المفرغة */}
                  <div className="w-full h-24 sm:h-26 rounded-2xl bg-gradient-to-b from-[#FFF6B3] to-[#FEEE00] border-2 border-[#FEEE00] overflow-hidden relative flex items-center justify-center p-2 shadow-2xs group-hover:scale-105 transition">
                    {card.is1111 ? (
                      <div className="text-center">
                        <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.2 rounded-full block mb-0.5">
                          عرض
                        </span>
                        <div className="bg-noonYellow border border-[#111] px-2 py-0.2 rounded font-black text-[11px] text-[#111]">
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
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    )}
                  </div>

                  {/* الكبسولة العنابية/البنية الداكنة تحت كل مربع كما في الصورة تماماً */}
                  <div className="-mt-2.5 z-10 bg-noonMaroon text-white text-[9px] sm:text-[10px] font-extrabold px-2.5 py-0.5 rounded-full whitespace-nowrap shadow flex items-center gap-0.5">
                    <span>{card.badge}</span>
                    {(card.badge.includes("تبدأ") || card.badge.includes("150") || card.badge.includes("250")) && (
                      <Icons.SarSymbol className="w-2.5 h-2.5 text-white" />
                    )}
                  </div>

                  <span className="text-[11px] sm:text-xs font-extrabold text-[#111] mt-1 text-center line-clamp-1 group-hover:text-noonBlue">
                    {card.title}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollPromoStrip(-1)}
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border items-center justify-center font-bold text-noonDark hover:bg-noonYellow transition"
            >
              ‹
            </button>
          </section>

          {/* =============================================================== */}
          {/* 5. شبكة المنتجات بصور الاستوديو البيضاء النظيفة */}
          {/* =============================================================== */}
          <section className="space-y-3 pt-2">
            <div className="bg-[#F7F7FA] p-3.5 sm:p-4 rounded-xl border border-gray-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-lg font-black text-[#111]">
                  {search
                    ? "نتائج البحث عن: " + search
                    : category === "all"
                    ? "عروض 11.11 وأحسن المنتجات في نون السعودية"
                    : category === "deals"
                    ? "شيك العروض وصفقات 11.11 الكبرى"
                    : category === "wishlist"
                    ? "قائمة المفضلة"
                    : "قسم " + category}
                </h2>
                <span className="text-xs bg-noonYellow text-[#111] px-2.5 py-0.5 rounded-full font-black">
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
      {/* 6. شريط الكوكيز السفلي العائم المطابق للصورة */}
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

      {/* الفوتر */}
      <footer className="bg-[#F7F7FA] border-t border-gray-200 mt-12">
        <div className="max-w-[1440px] mx-auto px-6 py-6 flex flex-wrap justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 نون السعودية للتسوق أونلاين. جميع الحقوق محفوظة.</p>
          <div className="flex flex-wrap items-center gap-2 font-bold text-noonDark">
            <span className="border px-2.5 py-1 rounded bg-white">mada مدى</span>
            <span className="border px-2.5 py-1 rounded bg-white">VISA</span>
            <span className="border px-2.5 py-1 rounded bg-white">Apple Pay</span>
            <span className="border px-2.5 py-1 rounded bg-white text-emerald-700">tabby تابي</span>
            <span className="border px-2.5 py-1 rounded bg-white text-pink-700">tamara تمارا</span>
          </div>
        </div>
      </footer>

      {/* نافذة الطلبات */}
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
                    <img src={i.image} className="w-14 h-14 object-contain rounded-lg bg-white" />
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
                localStorage.setItem("noon_user_v6", userName);
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

  // لوحة تحكم الإدارة المستقلة على الرابط /admin مع استيراد 100 منتج استوديو نظيف في المرة الواحدة
  'src/app/admin/page.jsx': `"use client";
import { useState, useEffect } from "react";
import { initialProducts, initialOrders, generate100StudioBatch } from "../../lib/storeData";

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
    const savedProds = localStorage.getItem("noon_prods_v6");
    const savedOrders = localStorage.getItem("noon_orders_v6");
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
    localStorage.setItem("noon_prods_v6", JSON.stringify(updated));
    setTitle(""); setPrice(""); setOldPrice(""); setImage("");
    alert("تم نشر المنتج في متجر نون بنجاح!");
  }

  function handleImport100Studio() {
    const new100 = generate100StudioBatch(batchCounter);
    setBatchCounter((prev) => prev + 1);
    const updated = [...new100, ...products];
    setProducts(updated);
    localStorage.setItem("noon_prods_v6", JSON.stringify(updated));
    alert("تم استيراد 100 منتج استوديو بصور مفرغة نظيفة بنجاح! إجمالي المنتجات الآن: " + updated.length + " منتج.");
  }

  function deleteProduct(id) {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("noon_prods_v6", JSON.stringify(updated));
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
            onClick={handleImport100Studio}
            className="bg-noonYellow hover:bg-yellow-300 text-noonDark font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg transition"
          >
            + استيراد 100 منتج استوديو دفعة واحدة
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
                <td className="p-3 font-bold flex items-center gap-2"><img src={p.image} className="w-10 h-10 object-contain rounded bg-white border p-0.5" /> {p.title}</td>
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
console.log("✅ Studio Cutout Images + Exact Noon KSA DOM Replica Completed!");
