import React, { useState, useRef } from "react";
import {
  LayoutDashboard, Users, ClipboardCheck, FileText, FileSignature,
  CheckCircle2, Clock, AlertTriangle, Camera, Star, Play, ChevronRight,
  Plus, X, MessageCircle, Send, RotateCcw, Phone, MapPin
} from "lucide-react";

const CSS = `
  :root{
    --ink:#0E1B33; --ink2:#1B2D4F;
    --surface:#EEF1F6; --card:#FFFFFF; --border:#E1E7F0;
    --muted:#6B7A93; --text:#16223C;
    --amber:#F2A21C; --amber-soft:#FEF2DC;
    --green:#1B9E5F; --green-soft:#E4F6EC;
    --red:#DD4438; --red-soft:#FBE9E7;
    --blue:#2C66D9; --blue-soft:#E7EFFC;
    --radius:14px; --shadow:0 1px 3px rgba(14,27,51,.06),0 8px 24px rgba(14,27,51,.05);
  }
  *{box-sizing:border-box;margin:0;padding:0}
  .em-root{
    font-family:'Tahoma','Segoe UI',system-ui,'Arial',sans-serif; background:var(--surface);
    color:var(--text); direction:rtl; -webkit-font-smoothing:antialiased;
  }
  .app{display:grid; grid-template-columns:264px 1fr; min-height:100vh}

  /* ---------- Sidebar ---------- */
  .side{background:var(--ink); color:#fff; padding:22px 16px; display:flex; flex-direction:column; gap:6px; position:sticky; top:0; height:100vh}
  .brand{display:flex; align-items:center; gap:11px; padding:6px 8px 20px; border-bottom:1px solid rgba(255,255,255,.09); margin-bottom:14px}
  .lift{width:38px; height:38px; border-radius:10px; background:linear-gradient(160deg,var(--amber),#d8860c); display:grid; place-items:center; flex:none; box-shadow:0 4px 12px rgba(242,162,28,.35)}
  .lift svg{width:21px; height:21px}
  .brand b{font-size:16px; font-weight:800; line-height:1.2}
  .brand span{font-size:11px; color:#9fb0cc; font-weight:500}
  .nav{display:flex; flex-direction:column; gap:3px}
  .nav button{display:flex; align-items:center; gap:11px; width:100%; padding:11px 12px; border:0; border-radius:10px; background:transparent; color:#c4cfe2; font-family:inherit; font-size:14.5px; font-weight:500; cursor:pointer; text-align:right; transition:.15s}
  .nav button:hover{background:rgba(255,255,255,.06); color:#fff}
  .nav button.on{background:var(--amber); color:#1a1205; font-weight:700}
  .nav button.on svg{stroke:#1a1205}
  .nav button svg{width:19px; height:19px; stroke:currentColor; flex:none}
  .nav .badge{margin-inline-start:auto; background:rgba(255,255,255,.16); color:#fff; font-size:11px; font-weight:700; padding:2px 8px; border-radius:20px}
  .nav button.on .badge{background:rgba(0,0,0,.18); color:#1a1205}
  .side-foot{margin-top:auto; font-size:11px; color:#7e8fac; padding:10px 8px; line-height:1.7}

  /* ---------- Main ---------- */
  .main{padding:26px 32px; overflow:auto}
  .topbar{display:flex; align-items:center; justify-content:space-between; margin-bottom:24px}
  .topbar h1{font-size:23px; font-weight:800; color:var(--ink)}
  .topbar p{color:var(--muted); font-size:13.5px; margin-top:3px}
  .chip{display:inline-flex; align-items:center; gap:7px; background:var(--card); border:1px solid var(--border); padding:8px 14px; border-radius:30px; font-size:13px; font-weight:600; box-shadow:var(--shadow)}
  .dot{width:8px;height:8px;border-radius:50%;background:var(--green)}

  /* cards */
  .grid{display:grid; gap:16px}
  .kpis{grid-template-columns:repeat(5,1fr); margin-bottom:22px}
  .kpi{background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:17px 18px; box-shadow:var(--shadow)}
  .kpi .ic{width:36px;height:36px;border-radius:9px;display:grid;place-items:center;margin-bottom:11px}
  .kpi .ic svg{width:19px;height:19px}
  .kpi .num{font-size:27px;font-weight:900;color:var(--ink);line-height:1}
  .kpi .lab{font-size:12.5px;color:var(--muted);margin-top:5px;font-weight:500}
  .two{grid-template-columns:1.6fr 1fr; align-items:start}

  .panel{background:var(--card); border:1px solid var(--border); border-radius:var(--radius); box-shadow:var(--shadow); overflow:hidden}
  .panel h3{font-size:15.5px; font-weight:800; color:var(--ink); padding:16px 18px; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between}
  .panel h3 .mini{font-size:12px;font-weight:600;color:var(--muted)}
  .pbody{padding:6px 18px 16px}

  table{width:100%; border-collapse:collapse; font-size:13.5px}
  th{text-align:right; color:var(--muted); font-weight:600; font-size:12px; padding:11px 6px; border-bottom:1px solid var(--border)}
  td{padding:12px 6px; border-bottom:1px solid #F0F3F8}
  tr:last-child td{border-bottom:0}
  .tg{display:inline-flex; align-items:center; gap:6px; padding:3px 10px; border-radius:20px; font-size:11.5px; font-weight:700}
  .tg.ok{background:var(--green-soft); color:var(--green)} .tg.warn{background:var(--amber-soft); color:#b9760a}
  .tg.due{background:var(--red-soft); color:var(--red)} .tg.info{background:var(--blue-soft); color:var(--blue)}
  .tg.idle{background:#EEF1F6; color:var(--muted)}

  /* floor indicator signature element */
  .floors{display:flex; flex-direction:column-reverse; gap:5px; padding:4px}
  .flr{height:15px; border-radius:4px; background:#EDF1F7; position:relative; display:flex; align-items:center; padding:0 8px; font-size:10px; color:#9aa7bd; font-weight:700}
  .flr.done{background:linear-gradient(90deg,var(--green),#27b873); color:#fff}
  .flr.now{background:var(--amber); color:#3a2700; box-shadow:0 0 0 3px var(--amber-soft)}

  .alert{display:flex; gap:11px; padding:12px; border-radius:10px; margin-bottom:9px; font-size:13px; align-items:flex-start}
  .alert.r{background:var(--red-soft)} .alert.a{background:var(--amber-soft)}
  .alert b{display:block; font-weight:700; margin-bottom:2px}
  .alert span{color:var(--muted); font-size:12px}

  /* clients */
  .clist{grid-template-columns:repeat(3,1fr)}
  .ccard{background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:18px; box-shadow:var(--shadow); cursor:pointer; transition:.18s}
  .ccard:hover{transform:translateY(-2px); box-shadow:0 10px 28px rgba(14,27,51,.1); border-color:#c9d4e6}
  .ccard .ch{display:flex; align-items:center; gap:11px; margin-bottom:14px}
  .av{width:42px;height:42px;border-radius:11px;background:var(--blue-soft);color:var(--blue);display:grid;place-items:center;font-weight:800;font-size:16px;flex:none}
  .ccard .nm{font-weight:800;font-size:15px}
  .ccard .lo{font-size:12px;color:var(--muted)}
  .crow{display:flex;justify-content:space-between;font-size:12.5px;padding:6px 0;border-top:1px solid #F0F3F8}
  .crow span{color:var(--muted)} .crow b{font-weight:700}

  /* buttons */
  .btn{font-family:inherit; font-weight:700; font-size:14px; border:0; border-radius:11px; padding:13px 18px; cursor:pointer; transition:.15s; display:inline-flex; align-items:center; justify-content:center; gap:8px}
  .btn:hover{filter:brightness(1.05)} .btn:active{transform:scale(.985)}
  .btn.pri{background:var(--ink); color:#fff; width:100%}
  .btn.amber{background:var(--amber); color:#241700}
  .btn.green{background:var(--green); color:#fff; width:100%}
  .btn.ghost{background:#EEF1F6; color:var(--ink)}
  .btn.sm{padding:8px 14px; font-size:12.5px; border-radius:9px}
  .btn:disabled{opacity:.45; cursor:not-allowed}

  /* phone mockup */
  .phonewrap{display:flex; gap:34px; align-items:flex-start; flex-wrap:wrap}
  .phone{width:380px; max-width:100%; background:#0c1628; border-radius:38px; padding:11px; box-shadow:0 30px 60px rgba(14,27,51,.28); flex:none}
  .screen{background:var(--surface); border-radius:28px; overflow:hidden; height:720px; display:flex; flex-direction:column; position:relative}
  .stat{height:30px; background:var(--ink); color:#fff; display:flex; align-items:center; justify-content:space-between; padding:0 18px; font-size:11px; font-weight:700; flex:none}
  .scr-head{background:var(--ink); color:#fff; padding:10px 18px 16px; flex:none}
  .scr-head .t{font-size:16px;font-weight:800}
  .scr-head .s{font-size:11.5px;color:#9fb0cc;margin-top:2px}
  .steps{display:flex; gap:5px; margin-top:13px}
  .steps i{flex:1; height:4px; border-radius:3px; background:rgba(255,255,255,.18)}
  .steps i.on{background:var(--amber)}
  .scr-body{flex:1; overflow:auto; padding:16px}
  .fcard{background:var(--card); border:1px solid var(--border); border-radius:14px; padding:15px; margin-bottom:13px}
  .fcard .fl{font-size:11px;color:var(--muted);font-weight:600;margin-bottom:3px}
  .fcard .fv{font-size:14.5px;font-weight:700;display:flex;align-items:center;gap:7px}
  .map{height:120px;border-radius:11px;background:
      linear-gradient(135deg,#dbe6f5,#eaf0f8);
      position:relative;overflow:hidden;margin-bottom:13px;border:1px solid var(--border)}
  .map::before{content:"";position:absolute;inset:0;
      background-image:linear-gradient(#c5d4ea 1px,transparent 1px),linear-gradient(90deg,#c5d4ea 1px,transparent 1px);
      background-size:26px 26px;opacity:.6}
  .pin{position:absolute;top:50%;right:50%;transform:translate(50%,-100%);width:26px;height:26px;background:var(--red);border-radius:50% 50% 50% 0;rotate:-45deg;box-shadow:0 4px 10px rgba(0,0,0,.2)}
  .pin::after{content:"";position:absolute;inset:7px;background:#fff;border-radius:50%}

  .chk{display:flex; align-items:center; gap:11px; padding:11px 12px; background:var(--card); border:1px solid var(--border); border-radius:11px; margin-bottom:8px}
  .chk .nm{flex:1; font-size:13.5px; font-weight:600}
  .seg{display:flex; gap:5px; flex:none}
  .seg button{border:1px solid var(--border); background:#fff; border-radius:8px; width:34px; height:30px; cursor:pointer; display:grid; place-items:center; font-size:14px}
  .seg button.pass.on{background:var(--green); border-color:var(--green); color:#fff}
  .seg button.fail.on{background:var(--red); border-color:var(--red); color:#fff}

  textarea{width:100%; border:1px solid var(--border); border-radius:11px; padding:12px; font-family:inherit; font-size:13.5px; resize:vertical; min-height:80px; background:#fff}
  textarea:focus{outline:2px solid var(--amber); border-color:var(--amber)}
  .photos{display:flex; gap:8px; flex-wrap:wrap; margin:10px 0}
  .ph{width:62px; height:62px; border-radius:10px; background:var(--blue-soft); display:grid; place-items:center; color:var(--blue); position:relative; overflow:hidden}
  .ph img{width:100%;height:100%;object-fit:cover}
  .addph{width:62px;height:62px;border:2px dashed var(--border);border-radius:10px;display:grid;place-items:center;color:var(--muted);cursor:pointer;background:#fff}
  .sign{height:140px; border:2px dashed var(--border); border-radius:12px; background:#fff; touch-action:none; cursor:crosshair; display:block; width:100%}
  .signer{display:flex; gap:8px; margin:10px 0}
  .signer button{flex:1; padding:10px; border:1px solid var(--border); background:#fff; border-radius:10px; font-family:inherit; font-weight:600; font-size:13px; cursor:pointer}
  .signer button.on{border-color:var(--ink); background:var(--ink); color:#fff}
  .notice{background:var(--amber-soft); border:1px solid #f3d9a8; border-radius:11px; padding:12px; font-size:12.5px; color:#7a5310; line-height:1.7; margin:12px 0; display:flex; gap:9px}
  .scr-foot{padding:14px 16px; border-top:1px solid var(--border); background:var(--card); flex:none}

  .done-wrap{text-align:center; padding:30px 16px}
  .done-ic{width:74px;height:74px;border-radius:50%;background:var(--green-soft);color:var(--green);display:grid;place-items:center;margin:0 auto 16px}
  .done-wrap h2{font-size:19px;font-weight:800;color:var(--ink)}
  .done-wrap p{color:var(--muted);font-size:13px;margin-top:6px;line-height:1.7}
  .recap{text-align:right; background:var(--card); border:1px solid var(--border); border-radius:12px; padding:14px; margin-top:18px; font-size:13px}
  .recap div{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #F0F3F8}
  .recap div:last-child{border:0}

  /* forms */
  .form-grid{grid-template-columns:1fr 1fr; gap:14px}
  label.fld{display:block; font-size:12.5px; font-weight:600; color:var(--muted); margin-bottom:6px}
  input.in,select.in{width:100%; border:1px solid var(--border); border-radius:10px; padding:11px 12px; font-family:inherit; font-size:14px; background:#fff}
  input.in:focus,select.in:focus{outline:2px solid var(--amber); border-color:var(--amber)}

  .qitem{display:grid; grid-template-columns:1fr 90px 110px 34px; gap:8px; margin-bottom:8px; align-items:center}
  .total-box{background:var(--ink); color:#fff; border-radius:12px; padding:16px 18px; margin-top:14px}
  .total-box .r{display:flex;justify-content:space-between;padding:5px 0;font-size:13.5px;color:#c4cfe2}
  .total-box .r.big{font-size:18px;font-weight:900;color:#fff;border-top:1px solid rgba(255,255,255,.15);margin-top:6px;padding-top:11px}

  .timeline{position:relative;padding-inline-start:22px}
  .timeline::before{content:"";position:absolute;right:6px;top:4px;bottom:4px;width:2px;background:var(--border)}
  .tl{position:relative;padding:0 0 16px}
  .tl::before{content:"";position:absolute;right:-19px;top:3px;width:11px;height:11px;border-radius:50%;background:var(--green);border:2px solid #fff;box-shadow:0 0 0 2px var(--green-soft)}
  .tl .d{font-size:11.5px;color:var(--muted);font-weight:600}
  .tl .x{font-size:13.5px;font-weight:600;margin-top:2px}

  .hide{display:none !important}
  .toast{position:fixed; bottom:26px; right:26px; background:var(--ink); color:#fff; padding:14px 20px; border-radius:12px; font-weight:600; font-size:14px; box-shadow:0 12px 30px rgba(0,0,0,.25); z-index:99; display:flex; gap:10px; align-items:center; animation:up .3s}
  @keyframes up{from{transform:translateY(14px);opacity:0}}
  .stars{color:var(--amber);font-size:14px;letter-spacing:1px}
  @media(max-width:920px){
    .app{grid-template-columns:1fr}
    .side{position:static;height:auto;flex-direction:row;flex-wrap:wrap;align-items:center}
    .side .brand,.side-foot{width:100%}
    .nav{flex-direction:row;flex-wrap:wrap}
    .kpis{grid-template-columns:repeat(2,1fr)} .two,.form-grid{grid-template-columns:1fr} .clist{grid-template-columns:1fr}
    .main{padding:18px}
  }
`;

/* ===== بيانات تجريبية ===== */
const SEED_CLIENTS = [
  { id:1, name:"برج الواحة السكني", loc:"حي الروضة، جدة", phone:"0555 123 456", elevators:3, contract:"ساري", remaining:2, rating:4.8,
    lifts:[{sn:"OT-2291",model:"Otis Gen2",floors:14},{sn:"OT-2292",model:"Otis Gen2",floors:14},{sn:"SC-118",model:"Schindler 3300",floors:6}],
    history:[{d:"12 يونيو 2026",x:"صيانة دورية — مكتملة ✓"},{d:"14 مايو 2026",x:"صيانة دورية — مكتملة ✓"},{d:"10 أبريل 2026",x:"استبدال حساس باب ✓"}] },
  { id:2, name:"مجمع النخيل التجاري", loc:"حي الحمراء، جدة", phone:"0566 778 990", elevators:5, contract:"ساري", remaining:3, rating:4.6,
    lifts:[{sn:"KO-540",model:"KONE MonoSpace",floors:8}], history:[{d:"08 يونيو 2026",x:"صيانة دورية — مكتملة ✓"}] },
  { id:3, name:"مستشفى الرعاية", loc:"حي السلامة، جدة", phone:"0533 221 100", elevators:6, contract:"قارب الانتهاء", remaining:1, rating:4.9,
    lifts:[{sn:"TH-9001",model:"ThyssenKrupp",floors:10}], history:[{d:"05 يونيو 2026",x:"صيانة طارئة — فرامل ✓"}] },
  { id:4, name:"فندق الشاطئ الذهبي", loc:"الكورنيش، جدة", phone:"0501 909 808", elevators:4, contract:"ساري", remaining:2, rating:4.5,
    lifts:[{sn:"MI-330",model:"Mitsubishi NEXIEZ",floors:18}], history:[{d:"02 يونيو 2026",x:"صيانة دورية — مكتملة ✓"}] },
  { id:5, name:"أبراج المروة", loc:"حي المروة، جدة", phone:"0544 656 565", elevators:2, contract:"ساري", remaining:4, rating:4.7,
    lifts:[{sn:"FJ-220",model:"Fujitec",floors:12}], history:[{d:"01 يونيو 2026",x:"صيانة دورية — مكتملة ✓"}] },
  { id:6, name:"مدارس المستقبل", loc:"حي النعيم، جدة", phone:"0577 343 212", elevators:1, contract:"منتهٍ", remaining:0, rating:4.4,
    lifts:[{sn:"HY-080",model:"Hyundai",floors:4}], history:[{d:"20 مايو 2026",x:"صيانة دورية — مكتملة ✓"}] },
];
const UPCOMING = [
  { t:"09:00 ص", c:"برج الواحة السكني", tech:"م. خالد", st:"الآن", stc:"warn" },
  { t:"11:30 ص", c:"أبراج المروة", tech:"م. سعد", st:"مجدولة", stc:"info" },
  { t:"01:00 م", c:"فندق الشاطئ الذهبي", tech:"م. خالد", st:"مجدولة", stc:"info" },
  { t:"البارحة", c:"مدارس المستقبل", tech:"م. سعد", st:"متأخرة", stc:"due" },
];
const SEED_INBOX = [
  { id:101, c:"برج الواحة السكني", lift:"OT-2291", note:"تآكل في كابل المصعد رقم 1 — يُنصح بالاستبدال خلال شهر", date:"12 يونيو", from:"الزيارة الميدانية" },
  { id:102, c:"مستشفى الرعاية", lift:"TH-9001", note:"ضعف في إضاءة الكابينة + حساس باب يحتاج معايرة", date:"05 يونيو", from:"الزيارة الميدانية" },
  { id:103, c:"فندق الشاطئ الذهبي", lift:"MI-330", note:"صوت غير طبيعي في المحرك — يحتاج فحص وتشحيم", date:"02 يونيو", from:"الزيارة الميدانية" },
];
const CHECK_ITEMS = ["الكابينة والأبواب","الحبال والكابلات","نظام الفرامل","لوحة التحكم","زر وهاتف الطوارئ","الإضاءة والتهوية","تشحيم المحرك","دقة التوقف عند الطوابق","أجهزة الأمان"];
const AR_MONTHS = ["يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر","يناير","فبراير","مارس","أبريل","مايو","يونيو"];

const Tag = ({ t, children }) => <span className={`tg ${t}`}>{children}</span>;
const Kpi = ({ bg, fg, Icon, num, lab }) => (
  <div className="kpi">
    <div className="ic" style={{ background: bg }}><Icon size={19} color={fg} strokeWidth={2} /></div>
    <div className="num">{num}</div><div className="lab">{lab}</div>
  </div>
);
const Top = ({ h, p }) => (
  <div className="topbar">
    <div><h1>{h}</h1><p>{p}</p></div>
    <div className="chip"><span className="dot"></span> متصل • م. خالد العتيبي</div>
  </div>
);

export default function ElevatorMaintenanceApp() {
  const [view, setView] = useState("dash");
  const [client, setClient] = useState(null);
  const [company, setCompany] = useState({ clients:8, contracts:6, visitsTotal:14, visitsDone:9, quotesPending:3 });
  const [inbox, setInbox] = useState(SEED_INBOX);
  const [toast, setToast] = useState(null);
  // visit
  const [vStep, setVStep] = useState(0);
  const [checks, setChecks] = useState(CHECK_ITEMS.map(n => ({ n, v:null })));
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState(0);
  const [signer, setSigner] = useState(null);
  const [signed, setSigned] = useState(false);
  // quotes & contracts
  const [quoteFor, setQuoteFor] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [form, setForm] = useState({ name:"", phone:"", loc:"", elev:2, dur:"12 شهراً", per:"زيارة واحدة/شهر" });

  const canvasRef = useRef(null);
  const drawing = useRef(false);

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(null), 3200); };
  const go = (v) => { setView(v); setClient(null); };

  /* ---- توقيع ---- */
  const pos = (e) => {
    const cv = canvasRef.current, r = cv.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x:(t.clientX - r.left) * (cv.width / r.width), y:(t.clientY - r.top) * (cv.height / r.height) };
  };
  const start = (e) => { drawing.current = true; const ctx = canvasRef.current.getContext("2d"); const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
  const move = (e) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current.getContext("2d"); const p = pos(e);
    ctx.lineWidth = 2.4; ctx.lineCap = "round"; ctx.strokeStyle = "#16223C";
    ctx.lineTo(p.x, p.y); ctx.stroke(); if (!signed) setSigned(true);
  };
  const end = () => { drawing.current = false; };
  const clearSign = () => { const cv = canvasRef.current; if (cv) cv.getContext("2d").clearRect(0,0,cv.width,cv.height); setSigned(false); };

  /* ---- إجراءات الزيارة ---- */
  const setChk = (i, val) => setChecks(prev => prev.map((c, idx) => idx === i ? { ...c, v: c.v === val ? null : val } : c));
  const resetVisit = () => { setVStep(0); setChecks(CHECK_ITEMS.map(n => ({ n, v:null }))); setNotes(""); setPhotos(0); setSigner(null); setSigned(false); };

  const finishVisit = (theChecks, theNotes) => {
    const flagged = theChecks.filter(c => c.v === "fail");
    if (flagged.length) {
      setCompany(c => ({ ...c, quotesPending: c.quotesPending + 1, visitsDone: Math.min(c.visitsDone + 1, c.visitsTotal) }));
      setInbox(list => [{ id: Date.now(), c:"برج الواحة السكني", lift:"OT-2291", note: theNotes || "بنود تحتاج صيانة من قائمة الفحص", date:"اليوم", from:"الزيارة الميدانية" }, ...list]);
      showToast("أُرسلت الملاحظات لقسم العروض + رابط تقييم للعميل");
    } else {
      setCompany(c => ({ ...c, visitsDone: Math.min(c.visitsDone + 1, c.visitsTotal) }));
      showToast("تم إغلاق الزيارة وإرسال رابط التقييم");
    }
    setVStep(5);
  };

  const autoDemo = () => {
    resetVisit();
    showToast("▶ يبدأ المثال التلقائي — شاهد خطوات الزيارة");
    const demoChecks = CHECK_ITEMS.map((n, i) => ({ n, v:(i === 1 || i === 4) ? "fail" : "pass" }));
    const demoNotes = "تآكل في كابل المصعد رقم 1، وضعف في إضاءة الكابينة — يُنصح بالاستبدال والمعايرة.";
    setTimeout(() => setVStep(1), 1000);
    setTimeout(() => setVStep(2), 2100);
    setTimeout(() => setChecks(demoChecks), 3200);
    setTimeout(() => setVStep(3), 4600);
    setTimeout(() => { setNotes(demoNotes); setPhotos(2); }, 5600);
    setTimeout(() => setVStep(4), 7000);
    setTimeout(() => {
      setSigner("مشرف الموقع");
      const cv = canvasRef.current;
      if (cv) { const ctx = cv.getContext("2d"); ctx.lineWidth=2.4; ctx.lineCap="round"; ctx.strokeStyle="#16223C";
        ctx.beginPath(); ctx.moveTo(40,95); ctx.bezierCurveTo(80,30,120,140,165,80); ctx.bezierCurveTo(205,30,245,125,295,70); ctx.stroke(); }
      setSigned(true);
    }, 8200);
    setTimeout(() => finishVisit(demoChecks, demoNotes), 9600);
  };

  /* ---- عقد جديد ---- */
  const createContract = () => {
    const name = form.name || "العميل الجديد";
    const months = form.dur.includes("24") ? 24 : form.dur.includes("6") ? 6 : 12;
    const per = form.per.includes("زيارتان") ? 2 : 1;
    const rows = [];
    for (let i = 0; i < Math.min(months, 12); i++) for (let k = 0; k < per; k++)
      rows.push({ d:`${AR_MONTHS[i % 12]} 2026`, x:`زيارة صيانة دورية — ${name}` });
    setSchedule({ count: months * per, rows });
    setCompany(c => ({ ...c, contracts: c.contracts + 1, clients: c.clients + 1 }));
    showToast(`تم إنشاء العقد وجدولة ${months * per} زيارة + إضافة ملف العميل`);
  };

  const NAV = [
    { id:"dash", label:"لوحة الشركة", Icon:LayoutDashboard },
    { id:"clients", label:"العملاء", Icon:Users },
    { id:"visit", label:"الزيارة الميدانية", Icon:ClipboardCheck, badge:"مباشر" },
    { id:"quotes", label:"العروض", Icon:FileText, badge:String(inbox.length) },
    { id:"contracts", label:"العقود", Icon:FileSignature },
  ];

  /* ================= العروض ================= */
  const QuoteBuilder = ({ name }) => {
    const items = [
      { d:"استبدال كابل المصعد (1)", q:1, p:1800 },
      { d:"معايرة حساس الباب", q:2, p:250 },
      { d:"أجور فنّية", q:1, p:400 },
    ];
    const sub = items.reduce((s, i) => s + i.q * i.p, 0), vat = Math.round(sub * 0.15), tot = sub + vat;
    return (
      <div className="panel"><h3>عرض سعر — {name}</h3><div className="pbody">
        {items.map((i, k) => (
          <div className="qitem" key={k}>
            <input className="in" defaultValue={i.d} /><input className="in" defaultValue={i.q} />
            <input className="in" defaultValue={`${i.p} ر.س`} /><button className="btn ghost sm" style={{ padding:8 }}><X size={14} /></button>
          </div>
        ))}
        <button className="btn ghost sm" style={{ marginTop:4 }}><Plus size={14} /> إضافة بند</button>
        <div className="total-box">
          <div className="r"><span>المجموع الفرعي</span><span>{sub.toLocaleString()} ر.س</span></div>
          <div className="r"><span>ضريبة القيمة المضافة 15%</span><span>{vat.toLocaleString()} ر.س</span></div>
          <div className="r big"><span>الإجمالي شامل الضريبة</span><span>{tot.toLocaleString()} ر.س</span></div>
        </div>
        <div className="notice" style={{ marginTop:12 }}><span>🧾</span><div>العرض متوافق مع متطلبات الفاتورة الإلكترونية (ZATCA). سيُرسل للعميل برابط للموافقة الإلكترونية.</div></div>
        <button className="btn green" style={{ marginTop:6 }} onClick={() => showToast("تم إرسال العرض للعميل عبر واتساب مع رابط الموافقة")}><Send size={15} /> إرسال العرض للعميل</button>
      </div></div>
    );
  };

  /* ================= شاشة الزيارة ================= */
  const VisitScreen = () => {
    const cl = SEED_CLIENTS[0];
    const bars = Array.from({ length:6 }, (_, i) => <i key={i} className={i <= vStep ? "on" : ""}></i>);
    const head = (t, s) => (
      <>
        <div className="stat"><span>9:41</span><span>📶 🔋 ١٠٠٪</span></div>
        <div className="scr-head"><div className="t">{t}</div><div className="s">{s}</div><div className="steps">{bars}</div></div>
      </>
    );
    if (vStep === 0) return (<>{head("زيارة صيانة دورية","برج الواحة السكني")}
      <div className="scr-body">
        <div className="fcard"><div className="fl">موعد الزيارة</div><div className="fv">🗓️ اليوم • 09:00 صباحاً</div></div>
        <div className="map"><div className="pin"></div></div>
        <div className="fcard"><div className="fl">موقع العميل</div><div className="fv"><MapPin size={15} /> {cl.loc}</div></div>
        <div className="fcard"><div className="fl">رقم جوال العميل</div><div className="fv"><Phone size={15} /> {cl.phone}</div>
          <div style={{ display:"flex", gap:8, marginTop:10 }}>
            <button className="btn ghost sm" style={{ flex:1 }} onClick={() => showToast("جارٍ الاتصال…")}>اتصال</button>
            <button className="btn amber sm" style={{ flex:1 }} onClick={() => showToast("فتح واتساب")}>واتساب</button>
          </div>
        </div>
      </div>
      <div className="scr-foot"><button className="btn pri" onClick={() => setVStep(1)}>📍 وصلت إلى الموقع</button></div></>);
    if (vStep === 1) return (<>{head("تأكيد الموقع","تحقّق GPS قبل البدء")}
      <div className="scr-body">
        <div className="map" style={{ height:170 }}><div className="pin"></div></div>
        <div className="notice" style={{ background:"#E4F6EC", borderColor:"#bce6cd", color:"#0c6b3f" }}><span>✅</span><div><b>تم التحقق من موقعك</b><br />أنت داخل نطاق موقع العميل (12 متراً). يمكنك بدء الزيارة الفعلية الآن.</div></div>
        <div className="fcard"><div className="fl">سيُسجَّل وقت البدء</div><div className="fv">⏱️ عند الضغط على "بدء الزيارة"</div></div>
      </div>
      <div className="scr-foot"><button className="btn green" onClick={() => setVStep(2)}>▶️ بدء الزيارة الفعلية</button></div></>);
    if (vStep === 2) return (<>{head("قائمة فحص المصعد","أشّر على حالة كل بند")}
      <div className="scr-body">
        {checks.map((c, i) => (
          <div className="chk" key={i}><div className="nm">{c.n}</div>
            <div className="seg">
              <button className={`pass ${c.v === "pass" ? "on" : ""}`} onClick={() => setChk(i, "pass")}>✓</button>
              <button className={`fail ${c.v === "fail" ? "on" : ""}`} onClick={() => setChk(i, "fail")}>!</button>
            </div>
          </div>
        ))}
      </div>
      <div className="scr-foot"><button className="btn pri" onClick={() => setVStep(3)}>التالي — الملاحظات والصور</button></div></>);
    if (vStep === 3) return (<>{head("الملاحظات والصور","وثّق ما يحتاج صيانة")}
      <div className="scr-body">
        <label className="fld">ملاحظات الزيارة</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="مثال: تآكل في كابل المصعد رقم 1، يُنصح بالاستبدال…" />
        <label className="fld" style={{ marginTop:12 }}>صور الموقع</label>
        <div className="photos">
          {Array.from({ length:photos }, (_, i) => <div className="ph" key={i}>🖼️</div>)}
          <div className="addph" onClick={() => setPhotos(p => p + 1)}><Camera size={20} /></div>
        </div>
        <div className="notice"><span>💡</span><div>البنود المؤشَّر عليها <b>"تحتاج صيانة"</b> ستُرسَل تلقائياً لقسم العروض مع هذه الملاحظات والصور.</div></div>
      </div>
      <div className="scr-foot"><button className="btn pri" onClick={() => setVStep(4)}>إنهاء الزيارة ←</button></div></>);
    if (vStep === 4) return (<>{head("إغلاق الزيارة","مطلوب توقيع المشرف أو العميل")}
      <div className="scr-body">
        <div className="notice"><span>📋</span><div><b>إشعار للموقّع:</b> سيتم إرسال عرض سعر بالبنود التي تحتاج صيانة، مع الملاحظات المرصودة وقت الزيارة.</div></div>
        <label className="fld">صفة الموقّع</label>
        <div className="signer">
          {["مشرف الموقع","العميل"].map(s => (
            <button key={s} className={signer === s ? "on" : ""} onClick={() => setSigner(s)}>{s}</button>
          ))}
        </div>
        <label className="fld">التوقيع</label>
        <canvas ref={canvasRef} className="sign" width={320} height={140}
          onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
          onTouchStart={start} onTouchMove={move} onTouchEnd={end} />
        <button className="btn ghost sm" style={{ marginTop:8 }} onClick={clearSign}>مسح التوقيع</button>
      </div>
      <div className="scr-foot"><button className="btn green" disabled={!(signer && signed)} onClick={() => finishVisit(checks, notes)}>✔ تم الانتهاء من الزيارة</button></div></>);
    // step 5
    const flagged = checks.filter(c => c.v === "fail").length;
    return (<>{head("اكتملت الزيارة","شكراً، تم الإغلاق بنجاح")}
      <div className="scr-body">
        <div className="done-wrap">
          <div className="done-ic"><CheckCircle2 size={40} /></div>
          <h2>تم الانتهاء من الزيارة</h2>
          <p>وُقّعت بواسطة <b>{signer}</b><br />وأُرسل للعميل رابط تقييم الزيارة ⭐</p>
          <div className="recap">
            <div><span>العميل</span><b>برج الواحة</b></div>
            <div><span>بنود تحتاج صيانة</span><b style={{ color: flagged ? "#DD4438" : "#1B9E5F" }}>{flagged} بند</b></div>
            <div><span>صور مرفقة</span><b>{photos}</b></div>
            <div><span>أُرسلت لقسم العروض</span><b style={{ color:"#1B9E5F" }}>{flagged ? "نعم ✓" : "لا حاجة"}</b></div>
          </div>
        </div>
      </div>
      <div className="scr-foot"><button className="btn pri" onClick={resetVisit}><RotateCcw size={15} /> زيارة جديدة (تجربة)</button></div></>);
  };

  /* ================= العروض الرئيسية ================= */
  function renderView() {
    if (view === "dash") {
      const pct = Math.round(company.visitsDone / company.visitsTotal * 100);
      const floors = Array.from({ length: company.visitsTotal }, (_, i) => {
        const n = i + 1, cls = n <= company.visitsDone ? "done" : n === company.visitsDone + 1 ? "now" : "";
        return <div className={`flr ${cls}`} key={n}>{n <= company.visitsDone ? "✓" : n === company.visitsDone + 1 ? "الآن" : ""}</div>;
      });
      return (<>
        <Top h="لوحة تحكم الشركة" p="نظرة عامة على الزيارات والعقود — يونيو 2026" />
        <div className="grid kpis">
          <Kpi bg="#E7EFFC" fg="#2C66D9" Icon={Users} num={company.clients} lab="عميل نشط" />
          <Kpi bg="#E4F6EC" fg="#1B9E5F" Icon={FileText} num={company.contracts} lab="عقد ساري" />
          <Kpi bg="#FEF2DC" fg="#b9760a" Icon={CheckCircle2} num={`${company.visitsDone}/${company.visitsTotal}`} lab="زيارات الشهر" />
          <Kpi bg="#FBE9E7" fg="#DD4438" Icon={Clock} num={company.visitsTotal - company.visitsDone} lab="زيارات متبقية" />
          <Kpi bg="#EDE7FB" fg="#7C4DD6" Icon={FileText} num={company.quotesPending} lab="عروض معلّقة" />
        </div>
        <div className="grid two">
          <div className="panel">
            <h3>زيارات اليوم <span className="mini">{UPCOMING.length} زيارات</span></h3>
            <div className="pbody"><table><thead><tr><th>الوقت</th><th>العميل</th><th>الفني</th><th>الحالة</th></tr></thead>
              <tbody>{UPCOMING.map((u, k) => (<tr key={k}><td><b>{u.t}</b></td><td>{u.c}</td><td>{u.tech}</td><td><Tag t={u.stc}>{u.st}</Tag></td></tr>))}</tbody>
            </table></div>
          </div>
          <div className="panel">
            <h3>إنجاز زيارات الشهر <span className="mini">{pct}%</span></h3>
            <div className="pbody" style={{ display:"flex", gap:14, alignItems:"stretch" }}>
              <div className="floors" style={{ flex:"none", width:64 }}>{floors}</div>
              <div style={{ flex:1, fontSize:13, color:"#6B7A93", lineHeight:1.9, alignSelf:"center" }}>
                أُنجزت <b style={{ color:"#0E1B33" }}>{company.visitsDone}</b> زيارة من أصل <b style={{ color:"#0E1B33" }}>{company.visitsTotal}</b> مجدولة هذا الشهر.<br />
                مؤشر الطوابق يرتفع مع كل زيارة مكتملة 🛗
              </div>
            </div>
          </div>
        </div>
        <div className="grid two" style={{ marginTop:16 }}>
          <div className="panel"><h3>تنبيهات تحتاج انتباهك</h3><div className="pbody">
            <div className="alert r"><span>⚠️</span><div><b>زيارة متأخرة — مدارس المستقبل</b><span>كانت مجدولة أمس ولم تُنفّذ. يُنصح بإعادة الجدولة.</span></div></div>
            <div className="alert a"><span>📄</span><div><b>عقد مستشفى الرعاية يقارب الانتهاء</b><span>متبقٍ 14 يوماً • زيارة واحدة فقط متبقية — جهّز عرض التجديد.</span></div></div>
            <div className="alert a"><span>🛗</span><div><b>{inbox.length} ملاحظات بانتظار عرض سعر</b><span>وردت من الزيارات الميدانية إلى قسم العروض.</span></div></div>
          </div></div>
          <div className="panel"><h3>أداء الخدمة</h3><div className="pbody" style={{ fontSize:13.5 }}>
            <div className="crow"><span>متوسط تقييم العملاء</span><b>4.7 <span className="stars">★★★★★</span></b></div>
            <div className="crow"><span>زيارات مكتملة بالموعد</span><b style={{ color:"#1B9E5F" }}>93%</b></div>
            <div className="crow"><span>متوسط زمن الاستجابة للطوارئ</span><b>1.8 ساعة</b></div>
            <div className="crow"><span>عروض مقبولة هذا الشهر</span><b>7 من 9</b></div>
          </div></div>
        </div>
      </>);
    }

    if (view === "clients") {
      if (client) {
        const c = client;
        return (<>
          <Top h={c.name} p={`لوحة العميل • ${c.loc}`} />
          <button className="btn ghost sm" style={{ marginBottom:16 }} onClick={() => setClient(null)}>→ رجوع للعملاء</button>
          <div className="grid kpis" style={{ gridTemplateColumns:"repeat(4,1fr)" }}>
            <Kpi bg="#E7EFFC" fg="#2C66D9" Icon={FileText} num={c.elevators} lab="مصعد مسجّل" />
            <Kpi bg="#FEF2DC" fg="#b9760a" Icon={Clock} num={c.remaining} lab="زيارة متبقية" />
            <Kpi bg="#E4F6EC" fg="#1B9E5F" Icon={CheckCircle2} num={c.history.length} lab="زيارة منفّذة" />
            <Kpi bg="#EDE7FB" fg="#7C4DD6" Icon={Star} num={c.rating} lab="متوسط التقييم" />
          </div>
          <div className="grid two">
            <div className="panel"><h3>المصاعد المسجّلة</h3><div className="pbody"><table>
              <thead><tr><th>الرقم التسلسلي</th><th>الموديل</th><th>الطوابق</th><th></th></tr></thead>
              <tbody>{c.lifts.map((l, k) => (<tr key={k}><td><b>{l.sn}</b></td><td>{l.model}</td><td>{l.floors}</td><td><Tag t="ok">يعمل</Tag></td></tr>))}</tbody>
            </table></div></div>
            <div className="panel"><h3>سجل الزيارات</h3><div className="pbody"><div className="timeline">
              {c.history.map((h, k) => (<div className="tl" key={k}><div className="d">{h.d}</div><div className="x">{h.x}</div></div>))}
            </div></div></div>
          </div>
          <div className="panel" style={{ marginTop:16 }}><h3>إجراءات</h3><div className="pbody" style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <button className="btn amber sm" onClick={() => showToast("تم فتح رابط واتساب للعميل")}><MessageCircle size={14} /> مراسلة عبر واتساب</button>
            <button className="btn ghost sm" onClick={() => showToast("تم إرسال رابط تقييم آخر زيارة")}><Star size={14} /> إرسال رابط تقييم</button>
            <button className="btn ghost sm" onClick={() => go("contracts")}><FileText size={14} /> إنشاء/تجديد عقد</button>
          </div></div>
        </>);
      }
      return (<>
        <Top h="العملاء" p="لكل عميل لوحة مستقلة بمصاعده وسجل زياراته" />
        <div className="grid clist">
          {SEED_CLIENTS.map(c => {
            const sc = c.contract === "ساري" ? "ok" : c.contract === "قارب الانتهاء" ? "warn" : "idle";
            return (
              <div className="ccard" key={c.id} onClick={() => setClient(c)}>
                <div className="ch"><div className="av">{c.name.slice(0,2)}</div><div><div className="nm">{c.name}</div><div className="lo">📍 {c.loc}</div></div></div>
                <div className="crow"><span>المصاعد</span><b>{c.elevators}</b></div>
                <div className="crow"><span>حالة العقد</span><Tag t={sc}>{c.contract}</Tag></div>
                <div className="crow"><span>زيارات متبقية</span><b style={{ color: c.remaining ? "#0E1B33" : "#DD4438" }}>{c.remaining}</b></div>
                <div className="crow"><span>متوسط التقييم</span><b>{c.rating} <span className="stars">★</span></b></div>
              </div>
            );
          })}
        </div>
      </>);
    }

    if (view === "visit") {
      return (<>
        <Top h="الزيارة الميدانية" p="تطبيق الفنّي — يعمل من الجوال أثناء الزيارة" />
        <div className="phonewrap">
          <div className="phone"><div className="screen"><VisitScreen /></div></div>
          <div style={{ flex:1, minWidth:260, maxWidth:380 }}>
            <div className="panel"><h3>كيف تعمل الزيارة؟</h3>
              <div className="pbody" style={{ fontSize:13.5, color:"#6B7A93", lineHeight:2 }}>
                جرّب الخطوات على الجوال يميناً:<br />
                <b style={{ color:"#0E1B33" }}>1.</b> الوصول للموقع + تأكيد GPS<br />
                <b style={{ color:"#0E1B33" }}>2.</b> بدء الزيارة الفعلية<br />
                <b style={{ color:"#0E1B33" }}>3.</b> تعبئة قائمة الفحص<br />
                <b style={{ color:"#0E1B33" }}>4.</b> الملاحظات وإرفاق الصور<br />
                <b style={{ color:"#0E1B33" }}>5.</b> الإنهاء + توقيع المشرف/العميل<br />
                عند وجود ملاحظات "تحتاج صيانة" تُرسَل تلقائياً لقسم <b style={{ color:"#0E1B33" }}>العروض</b>، ويُرسل للعميل <b style={{ color:"#0E1B33" }}>رابط تقييم</b>.
              </div>
              <div style={{ padding:"0 18px 16px" }}>
                <button className="btn amber" style={{ width:"100%" }} onClick={autoDemo}><Play size={16} /> تشغيل مثال تلقائي للزيارة</button>
              </div>
            </div>
          </div>
        </div>
      </>);
    }

    if (view === "quotes") {
      return (<>
        <Top h="قسم العروض" p="ملاحظات الزيارات الميدانية تصل هنا لتحويلها لعروض أسعار" />
        <div className="grid two">
          <div className="panel"><h3>الملاحظات الواردة <span className="mini">{inbox.length} ملاحظة</span></h3><div className="pbody">
            {inbox.map(q => (
              <div className="fcard" key={q.id} style={{ marginBottom:11 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                  <b style={{ fontSize:14 }}>{q.c}</b><Tag t="info">{q.from}</Tag>
                </div>
                <div style={{ fontSize:12, color:"#6B7A93" }}>مصعد {q.lift} • {q.date}</div>
                <div style={{ fontSize:13.5, margin:"8px 0", lineHeight:1.7 }}>{q.note}</div>
                <button className="btn amber sm" onClick={() => setQuoteFor(q.c)}><Plus size={14} /> إنشاء عرض سعر</button>
              </div>
            ))}
          </div></div>
          {quoteFor ? <QuoteBuilder name={quoteFor} /> :
            <div className="panel"><h3>منشئ العرض</h3><div className="pbody" style={{ color:"#6B7A93", fontSize:13.5 }}>
              اختر ملاحظة من اليمين لإنشاء عرض سعر بها، أو ابدأ عرضاً يدوياً.
              <button className="btn ghost" style={{ width:"100%", marginTop:14 }} onClick={() => setQuoteFor("عميل جديد")}>عرض سعر يدوي</button>
            </div></div>}
        </div>
      </>);
    }

    if (view === "contracts") {
      return (<>
        <Top h="العقود" p="إنشاء عقد يضيف العميل ويجدول زياراته تلقائياً" />
        <div className="grid two">
          <div className="panel"><h3>عقد جديد</h3><div className="pbody">
            <div className="grid form-grid">
              <div><label className="fld">اسم العميل</label><input className="in" value={form.name} onChange={e => setForm({ ...form, name:e.target.value })} placeholder="مثال: مجمع الياسمين" /></div>
              <div><label className="fld">رقم الجوال</label><input className="in" value={form.phone} onChange={e => setForm({ ...form, phone:e.target.value })} placeholder="05XX XXX XXX" /></div>
              <div><label className="fld">الموقع</label><input className="in" value={form.loc} onChange={e => setForm({ ...form, loc:e.target.value })} placeholder="الحي، المدينة" /></div>
              <div><label className="fld">عدد المصاعد</label><input className="in" type="number" value={form.elev} onChange={e => setForm({ ...form, elev:e.target.value })} /></div>
              <div><label className="fld">مدة العقد</label><select className="in" value={form.dur} onChange={e => setForm({ ...form, dur:e.target.value })}><option>6 أشهر</option><option>12 شهراً</option><option>24 شهراً</option></select></div>
              <div><label className="fld">زيارة شهرية</label><select className="in" value={form.per} onChange={e => setForm({ ...form, per:e.target.value })}><option>زيارة واحدة/شهر</option><option>زيارتان/شهر</option></select></div>
            </div>
            <div className="notice" style={{ marginTop:14 }}><span>📎</span><div>عند الحفظ يُنشأ ملف العميل ويُرفق العقد، وتُجدول الزيارات الشهرية تلقائياً في التقويم.</div></div>
            <button className="btn pri" onClick={createContract}>إنشاء العقد وجدولة الزيارات</button>
          </div></div>
          <div className="panel"><h3>الزيارات المجدولة {schedule && <span className="mini">{schedule.count} زيارة</span>}</h3>
            <div className="pbody" style={{ color:"#6B7A93", fontSize:13.5 }}>
              {schedule ? <div className="timeline" style={{ maxHeight:460, overflow:"auto" }}>
                {schedule.rows.map((r, k) => (<div className="tl" key={k}><div className="d">{r.d}</div><div className="x">{r.x}</div></div>))}
              </div> : "ستظهر هنا جدولة الزيارات بعد إنشاء العقد."}
            </div>
          </div>
        </div>
      </>);
    }
    return null;
  }

  return (
    <div className="em-root" dir="rtl">
      <style>{CSS}</style>
      <div className="app">
        <aside className="side">
          <div className="brand">
            <div className="lift">
              <svg viewBox="0 0 24 24" fill="none" stroke="#241700" strokeWidth="2.2"><path d="M4 3h16v18H4zM12 3v18M7 8l-1.5 2h3zM17 8l1.5 2h-3z" /></svg>
            </div>
            <div><b>مِصعد برو</b><br /><span>إدارة الصيانة الدورية</span></div>
          </div>
          <nav className="nav">
            {NAV.map(n => (
              <button key={n.id} className={view === n.id ? "on" : ""} onClick={() => go(n.id)}>
                <n.Icon size={19} strokeWidth={2} />{n.label}
                {n.badge && <span className="badge">{n.badge}</span>}
              </button>
            ))}
          </nav>
          <div className="side-foot">نموذج تجريبي • البيانات للعرض فقط<br />الإصدار التجريبي 0.1</div>
        </aside>
        <main className="main">{renderView()}</main>
      </div>
      {toast && <div className="toast">✅ {toast}</div>}
    </div>
  );
}
