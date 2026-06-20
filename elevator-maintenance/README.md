<div dir="rtl">

# 🛗 مِصعد برو — نظام إدارة صيانة المصاعد

تطبيق **React + Vite** لإدارة زيارات الصيانة الدورية للمصاعد: جدولة الزيارات وتنفيذها ميدانياً، إنشاء عروض الأسعار، إدارة العقود، ولوحات متابعة لكل عميل وللشركة.

> ⚠️ **نموذج تجريبي:** البيانات للعرض فقط وتُحفظ في ذاكرة المتصفح (تُعاد عند التحديث). ميزات مثل التحقق الفعلي من GPS وإرسال واتساب وحفظ البيانات مُحاكاة في هذه النسخة.

---

## 🧩 المتطلبات

- [Node.js](https://nodejs.org/) الإصدار 18 أو أحدث.

## ▶️ التشغيل محلياً

```bash
npm install
npm run dev
```

ثم افتح الرابط الظاهر في الطرفية (عادةً `http://localhost:5173`).

## 🏗️ البناء للإنتاج

```bash
npm run build      # يُنتج مجلد dist/
npm run preview    # لمعاينة نسخة الإنتاج محلياً
```

---

## 🚀 الرفع على GitHub والنشر عبر Vercel

### 1) رفع المشروع على GitHub

أنشئ مستودعاً جديداً على GitHub (مثلاً `elevator-maintenance`)، ثم من جهازك:

```bash
git init
git add .
git commit -m "أول إصدار من نظام صيانة المصاعد"
git branch -M main
git remote add origin https://github.com/<اسم-حسابك>/elevator-maintenance.git
git push -u origin main
```

> الطريقة الأسهل بدون أوامر: من صفحة المستودع الجديد اختر **Add file ← Upload files** واسحب كل ملفات المشروع وأفلتها (عدا مجلد `node_modules`)، ثم **Commit changes**.

### 2) النشر عبر Vercel

1. ادخل [vercel.com](https://vercel.com) وسجّل الدخول بحساب GitHub.
2. اضغط **Add New… ← Project**، واختر المستودع الذي رفعته.
3. سيكتشف Vercel تلقائياً أنه مشروع **Vite** ويملأ الإعدادات:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. اضغط **Deploy** وانتظر دقيقة.
5. سيظهر رابط موقعك المباشر بالشكل: `https://elevator-maintenance.vercel.app`

بعد كل `git push` لاحق، سيعيد Vercel النشر تلقائياً. 🎉

---

## 🗂️ هيكل المشروع

```
elevator-maintenance/
├── index.html                       # صفحة Vite الجذرية
├── package.json                     # التبعيات والأوامر
├── vite.config.js                   # إعداد Vite + React
├── .gitignore
├── README.md
└── src/
    ├── main.jsx                     # نقطة دخول React
    └── ElevatorMaintenanceApp.jsx   # التطبيق كاملاً
```

---

## 🛣️ أفكار للتطوير القادم

- قاعدة بيانات حقيقية لحفظ العملاء والزيارات بشكل دائم.
- تكامل فعلي مع واتساب لإرسال العروض والتقارير وروابط التقييم.
- توليد تقرير زيارة PDF مع الصور والتوقيع.
- مسار منفصل لبلاغات الطوارئ مع زمن استجابة (SLA).
- تكامل الفاتورة الإلكترونية (ZATCA).

---

## 📄 الرخصة

منشور تحت رخصة MIT — حرّ الاستخدام والتعديل.

</div>
