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
        noonBg: "#F7F7FA"
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
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
body { font-family: 'Cairo', sans-serif; background-color: #F7F7FA; color: #404553; }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`,

  'src/app/layout.jsx': `import './globals.css';
export const metadata = {
  title: 'نون السعودية | تسوق أونلاين للإلكترونيات، الجوالات، الأزياء، العطور والمزيد',
  description: 'تسوق أونلاين في المملكة العربية السعودية من نون - شحن إكسبريس سريع ودفع آمن',
};
export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}`,

  'src/lib/storeData.js': `export const initialProducts = [
  // 1. الجوالات (Mobiles)
  { id: 1, title: "أبل آيفون 16 برو ماكس سعة 256 جيجابايت تيتانيوم صحراوي 5G - نسخة الشرق الأوسط", category: "الجوالات", price: 5199, oldPrice: 5699, rating: 4.9, reviews: 3420, express: true, isMegaDeal: true, badge: "الأكثر مبيعاً", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80" },
  { id: 2, title: "سامسونج جالكسي S24 ألترا ثنائي الشريحة تيتانيوم رمادي 12GB رام 256GB - الجيل الخامس", category: "الجوالات", price: 3899, oldPrice: 5399, rating: 4.8, reviews: 2150, express: true, isMegaDeal: true, badge: "خصم 28%", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80" },
  { id: 3, title: "أبل آيفون 15 سعة 128 جيجابايت أزرق الجيل الخامس مع فيس تايم", category: "الجوالات", price: 2999, oldPrice: 3799, rating: 4.8, reviews: 1890, express: true, isMegaDeal: false, badge: "عرض خاص", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80" },
  { id: 4, title: "شاومي 14T برو ثنائي الشريحة 512 جيجابايت 12 جيجا رام تيتانيوم أسود 5G", category: "الجوالات", price: 2399, oldPrice: 2899, rating: 4.7, reviews: 640, express: true, isMegaDeal: false, badge: "عدسات لايكا", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80" },
  { id: 5, title: "هونر ماجيك V3 القابل للطي 512 جيجابايت 12 جيجا رام أخضر 5G", category: "الجوالات", price: 5499, oldPrice: 6899, rating: 4.9, reviews: 420, express: true, isMegaDeal: false, badge: "أنحف هاتف قابل للطي", image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80" },

  // 2. الإلكترونيات واللابتوبات (Electronics)
  { id: 6, title: "أبل ماك بوك إير شاشة 13.6 بوصة شريحة M3 معالج ثماني النواة وذاكرة 256GB", category: "الإلكترونيات", price: 4199, oldPrice: 4799, rating: 4.9, reviews: 830, express: true, isMegaDeal: true, badge: "جديد", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" },
  { id: 7, title: "أبل سماعات إيربودز برو (الجيل الثاني) مع علبة شحن MagSafe بمنفذ USB-C", category: "الإلكترونيات", price: 849, oldPrice: 1099, rating: 4.9, reviews: 4120, express: true, isMegaDeal: false, badge: "سعر مميز", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80" },
  { id: 8, title: "شاشة سامسونج سمارت 65 بوصة بدقة 4K Crystal UHD تدعم شاهد ونتفليكس", category: "الإلكترونيات", price: 1999, oldPrice: 2899, rating: 4.7, reviews: 950, express: true, isMegaDeal: false, badge: "شحن مجاني", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80" },
  { id: 9, title: "أبل آيباد إير شاشة 11 بوصة شريحة M2 سعة 128 جيجابايت واي فاي رمادي فلكي", category: "الإلكترونيات", price: 2299, oldPrice: 2699, rating: 4.8, reviews: 710, express: true, isMegaDeal: false, badge: "الأكثر طلباً", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80" },
  { id: 10, title: "أبل واتش سيريس 10 مقاس 46 ملم إطار ألمنيوم أسود لامع مع حزام رياضي", category: "الإلكترونيات", price: 1649, oldPrice: 1899, rating: 4.9, reviews: 620, express: true, isMegaDeal: false, badge: "وصل حديثاً", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80" },
  { id: 11, title: "أسوس لابتوب الألعاب TUF Gaming شاشة 15.6 بوصة 144Hz معالج i7 وكرت RTX 4060", category: "الإلكترونيات", price: 4299, oldPrice: 5199, rating: 4.8, reviews: 390, express: true, isMegaDeal: false, badge: "للألعاب الثقيلة", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80" },

  // 3. ألعاب الفيديو (Gaming)
  { id: 12, title: "سوني جهاز بلايستيشن 5 سليم (PS5 Slim) نسخة الأقراص - إصدار السعودية الرسمي", category: "الألعاب", price: 1849, oldPrice: 2299, rating: 4.9, reviews: 5120, express: true, isMegaDeal: true, badge: "عرض الميجا", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80" },
  { id: 13, title: "سوني يد تحكم لاسلكية DualSense لجهاز بلايستيشن 5 - أبيض وأسود", category: "الألعاب", price: 269, oldPrice: 349, rating: 4.8, reviews: 1840, express: true, isMegaDeal: false, badge: "أصلي 100%", image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=600&q=80" },
  { id: 14, title: "نينتندو سويتش إصدار شاشة OLED مع وحدات تحكم Joy-Con نيون", category: "الألعاب", price: 1199, oldPrice: 1499, rating: 4.8, reviews: 920, express: true, isMegaDeal: false, badge: "الأكثر مبيعاً", image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=600&q=80" },

  // 4. المنزل والمطبخ والأجهزة (Home & Kitchen)
  { id: 15, title: "فيليبس قلاية هوائية بحجم عائلي XXL سعة 6.2 لتر بقوة 2000 واط - أسود", category: "المنزل والمطبخ", price: 449, oldPrice: 899, rating: 4.8, reviews: 3120, express: true, isMegaDeal: true, badge: "خصم 50%", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80" },
  { id: 16, title: "ديلونجي ماكينة تحضير القهوة والإسبريسو ديديكا بقوة 1300 واط - ستانلس ستيل", category: "المنزل والمطبخ", price: 699, oldPrice: 999, rating: 4.8, reviews: 1540, express: true, isMegaDeal: false, badge: "اختيار نون", image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80" },
  { id: 17, title: "دايسون مكنسة كهربائية لاسلكية V15 Detect Absolute بقوة شفط فائقة", category: "المنزل والمطبخ", price: 2399, oldPrice: 3199, rating: 4.9, reviews: 480, express: true, isMegaDeal: false, badge: "تقنية الليزر", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80" },
  { id: 18, title: "طقم أواني طهي جرانيت غير لاصق مكون من 10 قطع - بيج ملكي", category: "المنزل والمطبخ", price: 299, oldPrice: 599, rating: 4.6, reviews: 870, express: true, isMegaDeal: false, badge: "عرض العائلة", image: "https://images.unsplash.com/photo-1584990347449-a2d4c2c044c9?auto=format&fit=crop&w=600&q=80" },
  { id: 19, title: "نسبرسو ماكينة قهوة إيسينزا ميني كبسولات - أحمر روبي", category: "المنزل والمطبخ", price: 429, oldPrice: 649, rating: 4.8, reviews: 1120, express: true, isMegaDeal: false, badge: "هدية كبسولات", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80" },

  // 5. العطور والجمال (Beauty & Fragrances)
  { id: 20, title: "عطر عود ملكي فاخر أو دي بارفيوم 100 مل - ثبات عالي وفوحان شرقي أصيل", category: "العطور والجمال", price: 189, oldPrice: 380, rating: 4.8, reviews: 1620, express: true, isMegaDeal: false, badge: "الأكثر طلباً", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80" },
  { id: 21, title: "ديور عطر سوفاج أو دي بارفيوم للرجال 100 مل - أصلي 100%", category: "العطور والجمال", price: 489, oldPrice: 650, rating: 4.9, reviews: 2890, express: true, isMegaDeal: false, badge: "أصلي مضمون", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80" },
  { id: 22, title: "دايسون جهاز تصفيف الشعر إير راب الملتي ستايلر الكامل للشعر الطويل", category: "العطور والجمال", price: 1999, oldPrice: 2499, rating: 4.9, reviews: 1340, express: true, isMegaDeal: false, badge: "إصدار خاص", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80" },
  { id: 23, title: "مجموعة العناية المتكاملة بالبشرة فيتامين سي وحمض الهيالورونيك - 4 قطع", category: "العطور والجمال", price: 129, oldPrice: 240, rating: 4.7, reviews: 790, express: true, isMegaDeal: false, badge: "نضارة فورية", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80" },

  // 6. الأزياء والموضة (Fashion)
  { id: 24, title: "عباية خليجية سوداء فاخرة بتطريز هادئ على الأكمام مع طرحة متناسقة", category: "الأزياء", price: 159, oldPrice: 299, rating: 4.8, reviews: 940, express: true, isMegaDeal: false, badge: "موضة 2026", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80" },
  { id: 25, title: "نايكي حذاء الجري الرياضي إير زوم للرجال - مريح وخفيف الوزن", category: "الأزياء", price: 329, oldPrice: 549, rating: 4.7, reviews: 610, express: true, isMegaDeal: false, badge: "أصلي 100%", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
  { id: 26, title: "كاسيو ساعة يد كلاسيكية ستانلس ستيل مقاومة للماء - فضي", category: "الأزياء", price: 145, oldPrice: 220, rating: 4.8, reviews: 1450, express: true, isMegaDeal: false, badge: "الأكثر مبيعاً", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80" },
  { id: 27, title: "حقيبة ظهر عصرية مقاومة للماء تتسع للابتوب 15.6 بوصة مع منفذ شحن USB", category: "الأزياء", price: 89, oldPrice: 179, rating: 4.6, reviews: 530, express: true, isMegaDeal: false, badge: "خصم 50%", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80" },

  // 7. السوبرماركت والبقالة (Grocery)
  { id: 28, title: "أرز بسمتي هندي كلاسيك طويل الحبة - كيس 10 كجم + زيت طبخ هدية", category: "السوبرماركت", price: 79, oldPrice: 115, rating: 4.9, reviews: 3120, express: true, isMegaDeal: false, badge: "عرض التوفير", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80" },
  { id: 29, title: "مسحوق غسيل أريال الأوتوماتيكي برائحة النظافة الأصلية - 7 كجم", category: "السوبرماركت", price: 64, oldPrice: 95, rating: 4.8, reviews: 1890, express: true, isMegaDeal: false, badge: "حجم عائلي", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80" },
  { id: 30, title: "زيت زيتون بكر ممتاز عصرة أولى على البارد - عبوة 2 لتر", category: "السوبرماركت", price: 85, oldPrice: 120, rating: 4.9, reviews: 940, express: true, isMegaDeal: false, badge: "طبيعي 100%", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80" },

  // 8. صُنع في السعودية (Mahali)
  { id: 31, title: "بوكس قهوة سعودية فاخرة بالهيل والزعفران مع تمر سكري القصيم ملكي", category: "صُنع في السعودية", price: 95, oldPrice: 140, rating: 4.9, reviews: 1410, express: true, isMegaDeal: false, badge: "محلي 🇸🇦", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80" },
  { id: 32, title: "مبخرة خشبية نجدية فاخرة مشغولة يدوياً مع أوقية عود مروكي طبيعي", category: "صُنع في السعودية", price: 135, oldPrice: 210, rating: 4.9, reviews: 680, express: true, isMegaDeal: false, badge: "تراث سعودي 🇸🇦", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80" }
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
    badge: body.badge || "جديد",
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

  // واجهة العميل (منفصلة تماماً بدون أي إشارة للوحة الإدارة)
  'src/app/page.jsx': `"use client";
import { useState, useEffect } from "react";
import { initialProducts } from "../lib/storeData";

export default function NoonStore() {
  const [products, setProducts] = useState(initialProducts);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [city, setCity] = useState("الرياض");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountRate, setDiscountRate] = useState(0);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("بطاقة مدى / فيزا");

  useEffect(() => {
    const savedProds = localStorage.getItem("noon_prods_v2");
    if (savedProds) setProducts(JSON.parse(savedProds));
  }, []);

  let filtered = products.filter((p) => {
    const matchCat = category === "all" ? true : category === "deals" ? p.isMegaDeal : category === "wishlist" ? wishlist.includes(p.id) : p.category === category;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
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
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0));
  }

  function toggleWishlist(id) {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  function applyCoupon() {
    if (couponCode.trim().toUpperCase() === "KSA15") {
      setDiscountRate(0.15);
      alert("🎉 تم تطبيق كود الخصم KSA15 بنجاح! خصم 15% إضافي.");
    } else {
      alert("كود الخصم غير صحيح، جرّب الكود: KSA15");
    }
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const finalTotal = Math.round(subtotal * (1 - discountRate));
  const vat = Math.round(finalTotal * 0.15);

  async function handleCheckout(e) {
    e.preventDefault();
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerName, customerPhone, city, address, paymentMethod, totalAmount: finalTotal })
    });
    const order = await res.json();
    const savedOrders = JSON.parse(localStorage.getItem("noon_orders_v2") || "[]");
    localStorage.setItem("noon_orders_v2", JSON.stringify([order, ...savedOrders]));
    alert("✅ شكراً لتسوقك من نون السعودية!\\nتم تأكيد طلبك بنجاح ورقم الشحنة: " + order.orderNumber);
    setCart([]);
    setDiscountRate(0);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  }

  const categoriesList = [
    { name: "جميع الفئات", val: "all" },
    { name: "عروض الميجا 🔥", val: "deals" },
    { name: "الجوالات", val: "الجوالات" },
    { name: "الإلكترونيات", val: "الإلكترونيات" },
    { name: "ألعاب الفيديو", val: "الألعاب" },
    { name: "المنزل والمطبخ", val: "المنزل والمطبخ" },
    { name: "العطور والجمال", val: "العطور والجمال" },
    { name: "الأزياء", val: "الأزياء" },
    { name: "السوبرماركت", val: "السوبرماركت" },
    { name: "صُنع في السعودية 🇸🇦", val: "صُنع في السعودية" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* الهيدر الأصفر الرسمي لنون السعودية */}
      <header className="bg-noonYellow sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5 shrink-0">
            <button onClick={() => { setCategory("all"); setSearch(""); }} className="flex items-center gap-1.5">
              <div className="w-9 h-9 bg-noonDark text-noonYellow rounded-full flex items-center justify-center font-black text-xl">n</div>
              <span className="font-black text-3xl text-black tracking-tight">noon</span>
            </button>

            <div className="hidden md:flex items-center gap-2 bg-white/50 px-3 py-1 rounded-md text-xs">
              <span>🇸🇦 التوصيل إلى:</span>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="bg-transparent font-black focus:outline-none cursor-pointer">
                <option value="الرياض">الرياض</option>
                <option value="جدة">جدة</option>
                <option value="الدمام">الدمام</option>
                <option value="مكة المكرمة">مكة المكرمة</option>
                <option value="المدينة المنورة">المدينة المنورة</option>
                <option value="الخبر">الخبر</option>
              </select>
            </div>
          </div>

          <div className="flex-1 max-w-3xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ما الذي تبحث عنه؟ (آيفون 16، سامسونج، بلايستيشن 5، قلاية هوائية، عطور، أرز...)"
              className="w-full py-2.5 px-4 rounded-md bg-white text-sm focus:outline-none shadow-inner"
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button onClick={() => setCategory("wishlist")} className="bg-white/60 hover:bg-white px-3 py-2 rounded-md font-bold text-xs sm:text-sm flex items-center gap-1.5">
              <span>❤️ المفضلة</span>
              <span className="bg-red-600 text-white text-[11px] px-1.5 rounded-full">{wishlist.length}</span>
            </button>

            <button onClick={() => setIsCartOpen(true)} className="bg-noonDark text-noonYellow px-4 py-2 rounded-md font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs">
              <span>🛒 العربة</span>
              <span className="bg-noonBlue text-white text-xs px-2 py-0.5 rounded-full">{cart.reduce((s, i) => s + i.qty, 0)}</span>
            </button>
          </div>
        </div>
      </header>

      {/* شريط التصنيفات الرئيسية */}
      <nav className="bg-white border-b py-2.5 px-4 shadow-xs sticky top-[60px] z-30">
        <div className="max-w-[1440px] mx-auto flex gap-6 overflow-x-auto no-scrollbar text-sm font-bold">
          {categoriesList.map((cat) => (
            <button
              key={cat.val}
              onClick={() => setCategory(cat.val)}
              className={category === cat.val ? "text-noonBlue border-b-2 border-noonBlue pb-1 shrink-0 font-black" : "hover:text-noonBlue shrink-0 text-noonDark"}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </nav>

      {/* شريط تنبيه الكوبون */}
      <div className="bg-noonDark text-white text-xs py-2 px-4 text-center">
        استخدم كود الخصم <strong className="text-noonYellow">KSA15</strong> للحصول على خصم إضافي 15% عند الدفع ببطاقات مدى أو تابي وتمارا • توصيل نون إكسبريس مجاني
      </div>

      {/* المحتوى الرئيسي للمتجر */}
      <main className="max-w-[1440px] w-full mx-auto px-4 py-5 flex-1 space-y-6">
        {/* البانر الإعلاني */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-9 bg-gradient-to-l from-[#14161d] via-[#282d3c] to-noonDark rounded-2xl p-6 sm:p-10 text-white flex flex-col justify-center relative overflow-hidden min-h-[240px]">
            <div className="z-10 max-w-xl space-y-3">
              <span className="bg-noonYellow text-noonDark font-black text-xs px-3 py-1 rounded-full inline-block">عروض نون السعودية الكبرى</span>
              <h1 className="text-2xl sm:text-4xl font-black leading-tight">خصومات تصل إلى <span className="text-noonYellow">60%</span> على كافة الأقسام</h1>
              <p className="text-gray-300 text-xs sm:text-sm">قسّط مشترياتك على 4 دفعات بدون فوائد مع تابي وتمارا • ضمان الوكيل المحلي سنتين</p>
              <button onClick={() => setCategory("deals")} className="bg-noonYellow text-noonDark font-black px-6 py-2.5 rounded-md text-sm hover:bg-yellow-300 transition">
                تسوق عروض الميجا
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-4">
            <div onClick={() => setCategory("العطور والجمال")} className="cursor-pointer bg-gradient-to-br from-amber-900 to-stone-900 rounded-2xl p-4 text-white flex flex-col justify-between">
              <span className="text-[10px] bg-amber-400 text-black font-bold px-2 py-0.5 rounded w-fit">أصلي 100%</span>
              <h3 className="font-black text-lg mt-1">عطور الشرق والعود</h3>
              <span className="text-xs font-bold text-noonYellow">تسوق الآن ←</span>
            </div>
            <div onClick={() => setCategory("المنزل والمطبخ")} className="cursor-pointer bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl p-4 text-white flex flex-col justify-between">
              <span className="text-[10px] bg-noonYellow text-black font-bold px-2 py-0.5 rounded w-fit">خصم حتى 50%</span>
              <h3 className="font-black text-lg mt-1">أجهزة المطبخ والقهوة</h3>
              <span className="text-xs font-bold text-noonYellow">اكتشف العروض ←</span>
            </div>
          </div>
        </div>

        {/* الدوائر السريعة للأقسام */}
        <div className="bg-white p-4 rounded-xl shadow-xs flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          {[
            { label: "الجوالات", icon: "📱", cat: "الجوالات" },
            { label: "اللابتوبات والشاشات", icon: "💻", cat: "الإلكترونيات" },
            { label: "ألعاب الفيديو", icon: "🎮", cat: "الألعاب" },
            { label: "أجهزة المطبخ", icon: "☕", cat: "المنزل والمطبخ" },
            { label: "العطور والجمال", icon: "✨", cat: "العطور والجمال" },
            { label: "الأزياء والعبايات", icon: "👗", cat: "الأزياء" },
            { label: "السوبرماركت", icon: "🛒", cat: "السوبرماركت" },
            { label: "صُنع بالسعودية", icon: "🇸🇦", cat: "صُنع في السعودية" }
          ].map((item) => (
            <button key={item.label} onClick={() => setCategory(item.cat)} className="flex flex-col items-center gap-2 shrink-0 group px-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-noonYellow/30 border border-noonYellow flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-105 transition">
                {item.icon}
              </div>
              <span className="text-xs font-extrabold text-noonDark group-hover:text-noonBlue">{item.label}</span>
            </button>
          ))}
        </div>

        {/* شريط الفرز وعدد المنتجات */}
        <div className="bg-white p-4 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black">{category === "all" ? "جميع منتجات نون السعودية" : category === "deals" ? "عروض الميجا اليومية ⚡" : category}</h2>
            <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full font-bold">{filtered.length} منتج</span>
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded-md px-3 py-1.5 text-xs sm:text-sm font-bold bg-white">
            <option value="popular">الترتيب: الأكثر شعبية</option>
            <option value="price-asc">السعر: من الأقل للأعلى</option>
            <option value="price-desc">السعر: من الأعلى للأقل</option>
            <option value="rating">الأعلى تقييماً</option>
          </select>
        </div>

        {/* شبكة المنتجات */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((p) => {
            const disc = Math.max(0, Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100));
            const isFav = wishlist.includes(p.id);
            return (
              <div key={p.id} className="bg-white rounded-xl p-3 shadow-xs hover:shadow-md transition border border-gray-100 flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-noonDark text-white text-[10px] font-bold px-2 py-0.5 rounded">{p.badge}</span>
                    <button onClick={() => toggleWishlist(p.id)} className={isFav ? "text-red-500 text-sm" : "text-gray-300 hover:text-red-500 text-sm"}>❤️</button>
                  </div>
                  <div onClick={() => setSelectedProduct(p)} className="cursor-pointer h-44 flex items-center justify-center my-2 bg-gray-50 rounded-lg overflow-hidden">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="bg-noonGreen text-white text-[10px] font-bold px-1.5 py-0.2 rounded">{p.rating} ★</span>
                    <span className="text-[10px] text-gray-400">({p.reviews})</span>
                  </div>
                  <h3 onClick={() => setSelectedProduct(p)} className="cursor-pointer text-xs sm:text-sm font-bold line-clamp-2 h-10 hover:text-noonBlue leading-snug">{p.title}</h3>
                </div>

                <div className="mt-3">
                  <div className="text-lg font-black text-noonDark">{Number(p.price).toLocaleString()} <span className="text-xs font-normal">ر.س</span></div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="line-through text-gray-400">{Number(p.oldPrice).toLocaleString()} ر.س</span>
                    <span className="text-noonGreen font-extrabold">خصم {disc}%</span>
                  </div>
                  <div className="mt-3 pt-2 border-t flex items-center justify-between">
                    <div>
                      <span className="bg-noonYellow text-noonDark text-[10px] font-black px-2 py-0.5 rounded-full italic">⚡ إكسبريس</span>
                      <span className="block text-[10px] text-gray-500 mt-0.5">توصيل غداً إلى {city}</span>
                    </div>
                    <button onClick={() => addToCart(p)} className="bg-noonYellow hover:bg-yellow-300 text-noonDark font-black text-xs px-3 py-1.5 rounded-lg shadow-xs">
                      + أضف
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* الفوتر الرسمي */}
      <footer className="bg-white border-t mt-12 py-8 text-xs text-gray-500">
        <div className="max-w-[1440px] mx-auto px-4 flex flex-wrap justify-between items-center gap-4">
          <p>© 2026 نون السعودية للتسوق أونلاين. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2 font-bold text-noonDark">
            <span className="border px-2 py-1 rounded">mada مدى</span>
            <span className="border px-2 py-1 rounded">Apple Pay</span>
            <span className="border px-2 py-1 rounded">VISA</span>
            <span className="border px-2 py-1 rounded text-emerald-700">tabby تابي</span>
            <span className="border px-2 py-1 rounded text-pink-700">tamara تمارا</span>
          </div>
        </div>
      </footer>

      {/* نافذة تفاصيل المنتج وتقسيط تابي وتمارا */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gray-100 font-bold">✕</button>
            <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center">
              <img src={selectedProduct.image} className="max-h-64 object-contain" />
            </div>
            <div className="flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <span className="text-xs font-bold text-noonBlue">{selectedProduct.category}</span>
                <h2 className="text-base font-black">{selectedProduct.title}</h2>
                <div className="text-2xl font-black">{Number(selectedProduct.price).toLocaleString()} ر.س</div>
                <span className="text-xs text-gray-500 block">شامل ضريبة القيمة المضافة السعودية 15%</span>
                <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-xs">
                  قسّمها على 4 دفعات شهرية بقيمة <strong>{Math.round(selectedProduct.price / 4)} ر.س</strong> بدون فوائد مع <strong>تابي</strong> أو <strong>تمارا</strong>.
                </div>
              </div>
              <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="w-full bg-noonYellow text-noonDark font-black py-3 rounded-lg">
                إضافة إلى عربة التسوق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* سلة التسوق الجانبية */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col justify-between p-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-black text-lg">عربة التسوق ({city})</h3>
              <button onClick={() => setIsCartOpen(false)} className="font-bold text-xl">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cart.length === 0 ? (
                <p className="text-center text-gray-400 py-12 font-bold">عربة التسوق فارغة</p>
              ) : (
                cart.map((i) => (
                  <div key={i.id} className="flex items-center gap-3 border p-2 rounded-lg">
                    <img src={i.image} className="w-14 h-14 object-cover rounded" />
                    <div className="flex-1 text-xs">
                      <h4 className="font-bold line-clamp-1">{i.title}</h4>
                      <div className="font-black text-noonBlue">{i.price.toLocaleString()} ر.س</div>
                      <div className="flex items-center gap-2 mt-1">
                        <button onClick={() => updateQty(i.id, -1)} className="px-2 border rounded font-bold">-</button>
                        <span className="font-bold">{i.qty}</span>
                        <button onClick={() => updateQty(i.id, 1)} className="px-2 border rounded font-bold">+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t pt-3 space-y-2 text-xs">
                <div className="flex gap-2">
                  <input value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="كود الخصم (KSA15)" className="flex-1 border rounded px-2 py-1.5 uppercase" />
                  <button onClick={applyCoupon} className="bg-noonDark text-white px-3 py-1.5 rounded font-bold">تطبيق</button>
                </div>
                <div className="flex justify-between"><span>ضريبة القيمة المضافة (15% شاملة):</span><span>{vat.toLocaleString()} ر.س</span></div>
                <div className="flex justify-between text-base font-black"><span>الإجمالي النهائي:</span><span>{finalTotal.toLocaleString()} ر.س</span></div>
                <button onClick={() => setIsCheckoutOpen(true)} className="w-full bg-noonBlue text-white font-black py-3 rounded-lg text-sm">إتمام الشراء والدفع</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* نافذة إتمام الطلب */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCheckout} className="bg-white rounded-2xl max-w-md w-full p-6 space-y-3 text-sm">
            <h3 className="font-black text-lg border-b pb-2">تأكيد العنوان والدفع الآمن 🇸🇦</h3>
            <input required value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="الاسم الكامل للمستلم" className="w-full border p-2.5 rounded-lg" />
            <input required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="رقم الجوال السعودي (05XXXXXXXX)" className="w-full border p-2.5 rounded-lg" />
            <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="العنوان التفصيلي (الحي، الشارع، رقم المبنى)" className="w-full border p-2.5 rounded-lg" />
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border p-2.5 rounded-lg font-bold">
              <option value="بطاقة مدى / فيزا">💳 بطاقة مدى / فيزا</option>
              <option value="تابي / تمارا (4 دفعات)">🛍️ تقسيط تابي / تمارا (بدون فوائد)</option>
              <option value="Apple Pay">🍎 Apple Pay</option>
              <option value="الدفع عند الاستلام">💵 الدفع عند الاستلام</option>
            </select>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="flex-1 bg-noonGreen text-white font-black py-2.5 rounded-lg">تأكيد الطلب ({finalTotal.toLocaleString()} ر.س)</button>
              <button type="button" onClick={() => setIsCheckoutOpen(false)} className="px-4 border rounded-lg">إلغاء</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}`,

  // لوحة تحكم الإدارة والتجار (منفصلة تماماً على المسار /admin ومحمية بتسجيل دخول)
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
    const savedProds = localStorage.getItem("noon_prods_v2");
    const savedOrders = localStorage.getItem("noon_orders_v2");
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
    localStorage.setItem("noon_prods_v2", JSON.stringify(updated));
    setTitle(""); setPrice(""); setOldPrice(""); setImage("");
    alert("✅ تم نشر المنتج في متجر نون بنجاح!");
  }

  function deleteProduct(id) {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("noon_prods_v2", JSON.stringify(updated));
  }

  function importBulkNoonCatalog() {
    const extraBatch = [
      { id: Date.now() + 1, title: "سامسونج شاشة ألعاب أوديسي G5 منحنية 32 بوصة 165Hz", category: "الإلكترونيات", price: 1099, oldPrice: 1599, rating: 4.8, reviews: 410, express: true, isMegaDeal: true, badge: "صفقة اليوم", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80" },
      { id: Date.now() + 2, title: "نينجا خلاط كهربائي ومحضر طعام بقوة 1200 واط", category: "المنزل والمطبخ", price: 499, oldPrice: 799, rating: 4.9, reviews: 820, express: true, isMegaDeal: true, badge: "الأكثر مبيعاً", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80" },
      { id: Date.now() + 3, title: "شانيل عطر بلو دي شانيل أو دي بارفيوم 100 مل", category: "العطور والجمال", price: 620, oldPrice: 780, rating: 4.9, reviews: 1950, express: true, isMegaDeal: false, badge: "أصلي 100%", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80" },
      { id: Date.now() + 4, title: "صندوق تمر خلاص القصيم فاخر ملكي - 8 عبوات", category: "صُنع في السعودية", price: 89, oldPrice: 130, rating: 4.9, reviews: 1120, express: true, isMegaDeal: false, badge: "إنتاج السعودية 🇸🇦", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80" }
    ];
    const updated = [...extraBatch, ...products];
    setProducts(updated);
    localStorage.setItem("noon_prods_v2", JSON.stringify(updated));
    alert("✅ تم استيراد دفعة منتجات نون الإضافية بنجاح!");
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-noonDark flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 text-center shadow-2xl">
          <div className="w-12 h-12 bg-noonYellow text-noonDark rounded-full flex items-center justify-center font-black text-2xl mx-auto">n</div>
          <h1 className="font-black text-xl">بوابة الإدارة والتجار - نون السعودية</h1>
          <p className="text-xs text-gray-500">هذه البوابة منفصلة ومخصصة للمشرفين فقط (كلمة المرور: admin123)</p>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="أدخل كلمة مرور الإدارة" className="w-full border rounded-lg p-2.5 text-center text-sm" />
          <button type="submit" className="w-full bg-noonBlue text-white font-black py-2.5 rounded-lg text-sm">دخول للوحة التحكم</button>
        </form>
      </div>
    );
  }

  const totalSales = orders.reduce((s, o) => s + Number(o.totalAmount), 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-[1440px] mx-auto space-y-6">
      <div className="bg-noonDark text-white p-5 rounded-2xl flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="text-xs text-noonYellow font-bold">NOON KSA SELLER & ADMIN PORTAL</span>
          <h1 className="text-2xl font-black">لوحة تحكم الإدارة المركزية</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={importBulkNoonCatalog} className="bg-noonYellow text-noonDark font-black px-4 py-2 rounded-lg text-xs sm:text-sm">
            ⚡ استيراد دفعة منتجات نون إضافية
          </button>
          <button onClick={() => setIsAuthenticated(false)} className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg text-xs sm:text-sm">
            تسجيل خروج
          </button>
        </div>
      </div>

      {/* إحصائيات المبيعات */}
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

      {/* نموذج إضافة منتج جديد */}
      <form onSubmit={addProduct} className="bg-white p-5 rounded-xl border space-y-3 text-sm shadow-xs">
        <h2 className="font-black text-lg">إضافة منتج جديد لمتجر نون</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="اسم المنتج" className="border p-2 rounded" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded font-bold">
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
        <div className="flex gap-3">
          <input required type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="رابط صورة المنتج (https://...)" className="border p-2 rounded flex-1" />
          <button type="submit" className="bg-noonBlue text-white font-black px-6 py-2 rounded-lg">نشر في المتجر</button>
        </div>
      </form>

      {/* جدول الطلبات */}
      <div className="bg-white p-5 rounded-xl border overflow-x-auto shadow-xs">
        <h2 className="font-black text-lg mb-3">الطلبات الواردة من العملاء ({orders.length})</h2>
        <table className="w-full text-right text-sm border-collapse">
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

      {/* جدول المنتجات */}
      <div className="bg-white p-5 rounded-xl border overflow-x-auto shadow-xs">
        <h2 className="font-black text-lg mb-3">إدارة كتالوج المنتجات ({products.length} منتج)</h2>
        <table className="w-full text-right text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b"><th className="p-3">المنتج</th><th className="p-3">القسم</th><th className="p-3">السعر</th><th className="p-3">إجراء</th></tr>
          </thead>
          <tbody className="divide-y">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="p-3 font-bold flex items-center gap-2"><img src={p.image} className="w-10 h-10 object-cover rounded" /> {p.title}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3 font-black">{p.price.toLocaleString()} ر.س</td>
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
console.log("✅ Noon KSA Full Catalog & Separated Admin Completed!");
