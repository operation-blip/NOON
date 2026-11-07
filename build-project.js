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
  { id: 2, title: "سامسونج جالكسي S24 ألترا ثنائي الشريحة تيتانيوم رمادي 12GB رام 256GB", category: "الجوالات", price: 3899, oldPrice: 5399, rating: 4.8, reviews: 985, express: true, is
