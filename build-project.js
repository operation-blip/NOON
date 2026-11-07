const fs = require('fs');
const path = require('path');

const files = {
  'jsconfig.json': JSON.stringify({
    compilerOptions: {
      paths: {
        "@/*": ["./src/*"]
      }
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
body { font-family: 'Cairo', sans-serif; background-color: #F7F7FA; color: #404553; }`,

  'src/app/layout.jsx': `import './globals.css';
export const metadata = {
  title: 'نون السعودية | تسوق أونلاين - مشروع التخرج',
  description: 'منظومة نون السعودية المتكاملة للتجارة الإلكترونية',
};
export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}`,

  'src/lib/storeData.js': `export const initialProducts = [
  { id: 1, title: "أبل آيفون 16 برو ماكس سعة 256 جيجابايت تيتانيوم صحراوي 5G - نسخة السعودية", category: "الجوالات", price: 5199, oldPrice: 5699, rating: 4.9, reviews: 1420, express: true, isMegaDeal: true, badge: "الأكثر مبيعاً", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80" },
  { id: 2, title: "سامسونج جالكسي S24 ألترا ثنائي الشريحة تيتانيوم رمادي 12GB رام 256GB", category: "الجوالات", price: 3899, oldPrice: 5399, rating: 4.8, reviews: 985, express: true, isMegaDeal: true, badge: "خصم 28%", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80" },
  { id: 3, title: "سوني بلايستيشن 5 سليم (PS5 Slim) نسخة الأقراص - إصدار السعودية الرسمي", category: "الألعاب", price: 1849, oldPrice: 2299, rating: 4.9, reviews: 2150, express: true, isMegaDeal: true, badge: "عرض الميجا", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80" },
  { id: 4, title: "فيليبس قلاية هوائية بحجم عائلي XXL سعة 6.2 لتر بقوة 2000 واط - أسود", category: "المنزل والمطبخ", price: 449, oldPrice: 899, rating: 4.7, reviews: 640, express: true, isMegaDeal: true, badge: "خصم 50%", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80" },
  { id: 5, title: "أبل ماك بوك إير شاشة 13.6 بوصة شريحة M3 معالج ثماني النواة وذاكرة 256GB", category: "الإلكترونيات", price: 4199, oldPrice: 4799, rating: 4.9, reviews: 310, express: true, isMegaDeal: false, badge: "جديد", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" },
  { id: 6, title: "عطر عود ملكي فاخر أو دي بارفيوم 100 مل - ثبات عالي وفوحان شرقي أصيل", category: "العطور والجمال", price: 189, oldPrice: 380, rating: 4.8, reviews: 520, express: true, isMegaDeal: false, badge: "الأكثر طلباً", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80" },
  { id: 7, title: "ديلونجي ماكينة تحضير القهوة والإسبريسو ديديكا بقوة 1300 واط - ستانلس ستيل", category: "المنزل والمطبخ", price: 699, oldPrice: 999, rating: 4.8, reviews: 870, express: true, isMegaDeal: false, badge: "اختيار نون", image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80" },
  { id: 8, title: "بوكس قهوة سعودية فاخرة بالهيل والزعفران مع تمر سكري ملكي - صُنع في السعودية", category: "صُنع في السعودية", price: 95, oldPrice: 140, rating: 4.9, reviews: 410, express: true, isMegaDeal: false, badge: "محلي 🇸🇦", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80" }
];

export const initialOrders = [
  { id: 101, orderNumber: "NOON-KSA-88412", customerName: "عبدالله الغامدي", customerPhone: "0551234567", city: "الرياض", address: "حي الملقا، طريق الملك فهد", paymentMethod: "بطاقة مدى / فيزا", totalAmount: 5199, status: "خرج للتوصيل" }
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
    isMegaDeal: true,
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

  'src/app/page.jsx': `"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { initialProducts } from "../lib/storeData";

export default function NoonStore() {
  const [products, setProducts] = useState(initialProducts);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("الرياض");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("بطاقة مدى / فيزا");

  useEffect(() => {
    const savedProds = localStorage.getItem("noon_prods");
    if (savedProds) setProducts(JSON.parse(savedProds));
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = category === "all" ? true : category === "deals" ? p.isMegaDeal : p.category === category;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function addToCart(product) {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const vat = Math.round(subtotal * 0.15);

  async function handleCheckout(e) {
    e.preventDefault();
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerName, customerPhone, city, address, paymentMethod, totalAmount: subtotal })
    });
    const order = await res.json();
    const savedOrders = JSON.parse(localStorage.getItem("noon_orders") || "[]");
    localStorage.setItem("noon_orders", JSON.stringify([order, ...savedOrders]));
    alert("✅ تم تأكيد الطلب بنجاح! رقم التتبع: " + order.orderNumber);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-noonDark text-white text-xs py-2 px-4 flex justify-between items-center">
        <span>منظومة نون السعودية المتكاملة - مشروع التخرج</span>
        <Link href="/admin" className="bg-noonYellow text-noonDark font-black px-3 py-1 rounded">
          لوحة تحكم الإدارة والتجار ←
        </Link>
      </div>

      <header className="bg-noonYellow sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <button onClick={() => setCategory("all")} className="flex items-center gap-1.5">
              <div className="w-9 h-9 bg-noonDark text-noonYellow rounded-full flex items-center justify-center font-black text-xl">n</div>
              <span className="font-black text-3xl text-black">noon</span>
            </button>
            <div className="hidden md:flex items-center gap-2 bg-white/50 px-3 py-1 rounded text-xs">
              <span>🇸🇦 التوصيل إلى:</span>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="bg-transparent font-black focus:outline-none">
                <option value="الرياض">الرياض</option>
                <option value="جدة">جدة</option>
                <option value="الدمام">الدمام</option>
                <option value="مكة المكرمة">مكة المكرمة</option>
              </select>
            </div>
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ما الذي تبحث عنه؟ (آيفون 16، سامسونج، بلايستيشن 5، قلاية...)"
            className="flex-1 max-w-2xl py-2.5 px-4 rounded-md bg-white text-sm focus:outline-none"
          />

          <button onClick={() => setIsCartOpen(true)} className="bg-noonDark text-noonYellow px-4 py-2 rounded-md font-bold text-sm flex items-center gap-2">
            <span>العربة</span>
            <span className="bg-noonBlue text-white text-xs px-2 py-0.5 rounded-full">{cart.reduce((s, i) => s + i.qty, 0)}</span>
          </button>
        </div>
      </header>

      <nav className="bg-white border-b py-2.5 px-4 shadow-xs">
        <div className="max-w-[1400px] mx-auto flex gap-6 overflow-x-auto text-sm font-bold">
          {["all", "deals", "الجوالات", "الإلكترونيات", "الألعاب", "المنزل والمطبخ", "العطور والجمال", "صُنع في السعودية"].map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} className={category === cat ? "text-noonBlue underline shrink-0" : "hover:text-noonBlue shrink-0"}>
              {cat === "all" ? "جميع الفئات" : cat === "deals" ? "عروض الميجا 🔥" : cat}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-[1400px] w-full mx-auto px-4 py-6 flex-1 space-y-6">
        <div className="bg-gradient-to-l from-noonDark to-slate-800 rounded-2xl p-6 sm:p-10 text-white">
          <span className="bg-noonYellow text-noonDark font-black text-xs px-3 py-1 rounded-full">مهرجان نون السعودية</span>
          <h1 className="text-2xl sm:text-4xl font-black mt-2">خصومات تصل إلى 60% + شحن إكسبريس مجاني</h1>
          <p className="text-gray-300 text-sm mt-1">قسّط على 4 دفعات مع تابي وتمارا • شامل ضريبة القيمة المضافة 15%</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((p) => {
            const disc = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
            return (
              <div key={p.id} className="bg-white rounded-xl p-3 shadow-xs border flex flex-col justify-between">
                <div>
                  <span className="bg-noonDark text-white text-[10px] font-bold px-2 py-0.5 rounded">{p.badge}</span>
                  <div className="h-44 flex items-center justify-center my-2 bg-gray-50 rounded-lg overflow-hidden">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold line-clamp-2 h-10">{p.title}</h3>
                </div>
                <div className="mt-3">
                  <div className="text-lg font-black">{p.price.toLocaleString()} ر.س</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="line-through text-gray-400">{p.oldPrice.toLocaleString()} ر.س</span>
                    <span className="text-noonGreen font-bold">خصم {disc}%</span>
                  </div>
                  <div className="mt-3 pt-2 border-t flex items-center justify-between">
                    <span className="bg-noonYellow text-noonDark text-[11px] font-black px-2 py-0.5 rounded-full italic">⚡ إكسبريس</span>
                    <button onClick={() => addToCart(p)} className="bg-noonDark text-noonYellow text-xs font-bold px-3 py-1.5 rounded-lg">+ أضف</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col justify-between p-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-black text-lg">عربة التسوق ({city})</h3>
              <button onClick={() => setIsCartOpen(false)} className="font-bold text-xl">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cart.map((i) => (
                <div key={i.id} className="flex items-center gap-3 border p-2 rounded-lg">
                  <img src={i.image} className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1 text-xs">
                    <h4 className="font-bold line-clamp-1">{i.title}</h4>
                    <div className="font-black text-noonBlue">{i.price} ر.س (×{i.qty})</div>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="border-t pt-3 space-y-2 text-xs">
                <div className="flex justify-between"><span>ضريبة القيمة المضافة (15%):</span><span>{vat.toLocaleString()} ر.س</span></div>
                <div className="flex justify-between text-base font-black"><span>الإجمالي النهائي:</span><span>{subtotal.toLocaleString()} ر.س</span></div>
                <button onClick={() => setIsCheckoutOpen(true)} className="w-full bg-noonBlue text-white font-black py-3 rounded-lg text-sm">إتمام الشراء والدفع</button>
              </div>
            )}
          </div>
        </div>
      )}

      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
              <form onSubmit={handleCheckout} className="bg-white rounded-2xl max-w-md w-full p-6 space-y-3 text-sm">
                <h3 className="font-black text-lg border-b pb-2">بيانات التوصيل والدفع في السعودية 🇸🇦</h3>
                <input required value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="الاسم الكامل" className="w-full border p-2 rounded" />
                <input required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="رقم الجوال (05XXXXXXXX)" className="w-full border p-2 rounded" />
                <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="العنوان التفصيلي" className="w-full border p-2 rounded" />
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border p-2 rounded font-bold">
                  <option value="بطاقة مدى / فيزا">💳 بطاقة مدى / فيزا</option>
                  <option value="تابي / تمارا (4 دفعات)">🛍️ تقسيط تابي / تمارا</option>
                  <option value="Apple Pay">🍎 Apple Pay</option>
                  <option value="الدفع عند الاستلام">💵 الدفع عند الاستلام</option>
                </select>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 bg-noonGreen text-white font-black py-2.5 rounded-lg">تأكيد الطلب</button>
                  <button type="button" onClick={() => setIsCheckoutOpen(false)} className="px-4 border rounded-lg">إلغاء</button>
                </div>
              </form>
            </div>
      )}
    </div>
  );
}`,

  'src/app/admin/page.jsx': `"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { initialProducts, initialOrders } from "../../lib/storeData";

export default function AdminPage() {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("الجوالات");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const savedProds = localStorage.getItem("noon_prods");
    const savedOrders = localStorage.getItem("noon_orders");
    if (savedProds) setProducts(JSON.parse(savedProds));
    if (savedOrders) setOrders([...JSON.parse(savedOrders), ...initialOrders]);
  }, []);

  async function addProduct(e) {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, price, oldPrice, image })
    });
    const newProd = await res.json();
    const updated = [newProd, ...products];
    setProducts(updated);
    localStorage.setItem("noon_prods", JSON.stringify(updated));
    setTitle(""); setPrice(""); setOldPrice(""); setImage("");
  }

  return (
    <div className="min-h-screen p-6 max-w-[1400px] mx-auto space-y-6">
      <div className="bg-white p-5 rounded-xl border flex justify-between items-center">
        <h1 className="text-2xl font-black">لوحة تحكم نون السعودية (Admin & Seller Center)</h1>
        <Link href="/" className="bg-noonYellow text-noonDark font-black px-4 py-2 rounded-lg text-sm">العودة للمتجر ←</Link>
      </div>

      <form onSubmit={addProduct} className="bg-white p-5 rounded-xl border space-y-3 text-sm">
        <h2 className="font-black text-lg">إضافة منتج جديد للمتجر</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="اسم المنتج" className="border p-2 rounded" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded font-bold">
            <option value="الجوالات">الجوالات</option>
            <option value="الإلكترونيات">الإلكترونيات</option>
            <option value="الألعاب">الألعاب</option>
            <option value="المنزل والمطبخ">المنزل والمطبخ</option>
          </select>
          <input required type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="السعر (ر.س)" className="border p-2 rounded" />
          <input required type="number" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} placeholder="السعر قبل الخصم" className="border p-2 rounded" />
        </div>
        <div className="flex gap-3">
          <input required type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="رابط صورة المنتج (https://...)" className="border p-2 rounded flex-1" />
          <button type="submit" className="bg-noonBlue text-white font-black px-6 py-2 rounded-lg">نشر في المتجر</button>
        </div>
      </form>

      <div className="bg-white p-5 rounded-xl border overflow-x-auto">
        <h2 className="font-black text-lg mb-3">الطلبات المستلمة ({orders.length})</h2>
        <table className="w-full text-right text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b"><th className="p-3">رقم الطلب</th><th className="p-3">العميل</th><th className="p-3">المدينة</th><th className="p-3">الدفع</th><th className="p-3">الإجمالي</th><th className="p-3">الحالة</th></tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((o) => (
              <tr key={o.id}><td className="p-3 font-black text-noonBlue">{o.orderNumber}</td><td className="p-3">{o.customerName}</td><td className="p-3">{o.city}</td><td className="p-3">{o.paymentMethod}</td><td className="p-3 font-black">{Number(o.totalAmount).toLocaleString()} ر.س</td><td className="p-3"><span className="bg-green-100 text-noonGreen px-2 py-1 rounded text-xs font-bold">{o.status}</span></td></tr>
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
console.log("✅ Vercel Auto-Generator Completed!");
