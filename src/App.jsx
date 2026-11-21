import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Music,
  Film,
  Tv,
  User,
  MessageSquare,
  ArrowLeft,
  Wifi,
  Battery,
  ExternalLink,
  Cpu,
  Sprout,
  GraduationCap,
  MapPin,
  Trophy,
  Volume2,
  VolumeX,
  Send,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2,
  Sparkles,
  Gamepad2,
  Sun,
  Moon,
  Cookie,
  RotateCcw,
  Delete,
  Play,
  Pause,
} from "lucide-react";

const FORMSPREE_URL = "https://formspree.io/f/xnpdpzwg";

// Web Audio API ile sıfır gecikmeli mekanik tıklama ve yılbaşı çanı tınısı
const playClickSound = (soundEnabled) => {
  if (!soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.045);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {}
};

const playTreeBellSound = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const notes = [659.25, 880, 1174.66];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const startTime = ctx.currentTime + idx * 0.09;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.055, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.65);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.7);
    });
  } catch (e) {}
};

const FOLDERS = [
  {
    id: "kariyer",
    title: "Kariyer",
    subtitle: "Otomasyon & SCADA",
    icon: Briefcase,
    accent: "from-amber-500/30 to-orange-600/30",
    iconColor: "text-amber-300",
    tabs: ["Genel Bakış", "Deneyim & Eğitim", "Teknik Yetkinlikler"],
  },
  {
    id: "muzikler",
    title: "Müziklerim",
    subtitle: "Kasetçalar & Listem",
    icon: Music,
    accent: "from-rose-500/30 to-red-700/30",
    iconColor: "text-rose-300",
    tabs: ["Kasetçalar"],
  },
  {
    id: "diziler",
    title: "Dizilerim",
    subtitle: "İz Bırakanlar",
    icon: Tv,
    accent: "from-emerald-500/30 to-teal-700/30",
    iconColor: "text-emerald-300",
    tabs: ["Kült Diziler"],
  },
  {
    id: "filmler",
    title: "Filmlerim",
    subtitle: "Kült & Unutulmazlar",
    icon: Film,
    accent: "from-indigo-500/30 to-blue-700/30",
    iconColor: "text-indigo-300",
    tabs: ["Favori Filmler"],
  },
  {
    id: "kurabiye",
    title: "Şans Kurabiyesi",
    subtitle: "Günün Pozitif Notu",
    icon: Cookie,
    accent: "from-yellow-500/30 to-amber-700/30",
    iconColor: "text-yellow-300",
    tabs: ["Kurabiyeni Kır"],
  },
  {
    id: "oyun",
    title: "Günün Oyunu",
    subtitle: "Faruk Parolla",
    icon: Gamepad2,
    accent: "from-violet-500/30 to-fuchsia-700/30",
    iconColor: "text-violet-300",
    tabs: ["Kelime Tahmini"],
  },
  {
    id: "hakkimda",
    title: "Hakkımda",
    subtitle: "Ağrı, İzmir & GS",
    icon: User,
    accent: "from-red-600/30 to-amber-500/30",
    iconColor: "text-amber-300",
    tabs: ["Ben Kimim?"],
  },
  {
    id: "mesaj",
    title: "Mesaj Bırak",
    subtitle: "Anonim Not Defteri",
    icon: MessageSquare,
    accent: "from-sky-500/30 to-cyan-700/30",
    iconColor: "text-sky-300",
    tabs: ["Bana Yaz"],
  },
];

const MUSIC_DATA = [
  {
    artist: "Adamlar",
    image: "/images/adamlar.jpg",
    genre: "Türkçe Alternatif Rock",
    vibe: "Sözleri tokat gibi, ritmi sert. Gece vardiyalarının ve uzun yolların tek eşlikçisi.",
    songs: ["Sarılırım Birine", "Koca Yaşlı Şişko Dünya", "Acının İlacı", "Zombi"],
    color: "from-amber-500/20 to-red-600/20",
  },
  {
    artist: "Turkodi Roma",
    image: "/images/turkodi.jpg",
    genre: "Alternatif / Indie",
    vibe: "Kafayı boşaltmak istediğim anlarda açtığım, kendine has dingin bir atmosfer.",
    songs: ["Seninle", "Gece Yarısı", "Uzaklarda"],
    color: "from-purple-500/20 to-indigo-600/20",
  },
  {
    artist: "Dolu Kadehi Ters Tut",
    image: "/images/dktt.jpg",
    genre: "Alternatif Rock / Indie Pop",
    vibe: "Bazen enerjik bazen ağır melankolik; o günkü moduma göre mutlaka bir karşılığı var.",
    songs: ["Yapma N'olursun", "Madem", "Gitme", "Neyin Var?"],
    color: "from-rose-500/20 to-orange-600/20",
  },
];

const SERIES_DATA = [
  {
    title: "LOST",
    image: "/images/jack.jpg",
    tag: "Jack Shephard",
    quote: "We have to go back, Kate!",
    whyMe:
      "Jack'in her şeyi düzeltme takıntısı ve omuzlarındaki bitmeyen sorumluluk hissi bana çok tanıdık geliyor. İnsanın bazen kontrolü bırakmayı öğrenmesi gerektiğini en sert yerden anlatan dizi.",
    gradient: "from-emerald-950 to-slate-900",
  },
  {
    title: "Game of Thrones",
    image: "/images/got.jpg",
    tag: "Jon Snow • Gece Nöbeti",
    quote: "Kill the boy, Jon Snow. Winter is almost upon us. Kill the boy and let the man be born.",
    whyMe:
      "Üstat Aemon'un bu sözü benim için bir kırılma noktasıdır. Hayatta sorumluluk aldığında artık çocukça tereddütlere yer kalmadığını ve büyümek için eski halini geride bırakman gerektiğini hatırlatır.",
    gradient: "from-slate-900 to-zinc-900",
  },
  {
    title: "Gibi",
    image: "/images/gibi.jpg",
    tag: "Yılmaz • İlkkan • Ersoy",
    quote: "Senin hiçbir şeyden haberin yok, bu kadar bilgisiz olup bu kadar fikrin olması inanılmaz.",
    whyMe:
      "Hayatın saçmalıklarını ciddiye almadan gülüp geçebilmenin en iyi yolu. En sıradan muhabbetin bile nasıl absürt bir krize dönüşebileceğini gösterip kafa dağıtıyor.",
    gradient: "from-amber-950 to-stone-900",
  },
  {
    title: "Shōgun",
    image: "/images/shogun.jpg",
    tag: "Lord Toranaga",
    quote: "Rüzgarı kontrol edemezsin ama yelkenini ona göre ayarlayabilirsin.",
    whyMe:
      "Sabrın, stratejinin ve panik yapmadan doğru anı beklemenin gücü. Kriz anlarında bağırmak yerine sessizce hamle kurmanın ne kadar yıkıcı olabileceğini sevdim.",
    gradient: "from-red-950 to-neutral-900",
  },
  {
    title: "Banshee",
    image: "/images/banshee.jpg",
    tag: "Lucas Hood",
    quote: "Geçmişin peşini bırakmaz, sadece ne kadar uzağa koşabileceğini test eder.",
    whyMe:
      "Saf aksiyon ve tavizsiz duruş. Yanlışlarla dolu bir geçmişe rağmen kendi kurallarını koyup geri adım atmayan karakterlerin hikayesi her zaman ilgimi çeker.",
    gradient: "from-sky-950 to-slate-900",
  },
  {
    title: "The Penguin",
    image: "/images/penguin.jpg",
    tag: "Oz Cobb",
    quote: "Kimse sana hak ettiğini vermez, gidip kendin söküp alırsın.",
    whyMe:
      "En alttan başlayıp kimsenin ciddiye almadığı birinin, hırs ve zekayla masadaki tüm dengeleri değiştirmesi. Hırsın karanlık ama gerçekçi yüzü.",
    gradient: "from-purple-950 to-neutral-950",
  },
  {
    title: "True Detective",
    image: "/images/true-detective.jpg",
    tag: "Rust Cohle",
    quote: "Zaman düz bir çemberdir. Yaptığımız ve yapacağımız her şeyi tekrar tekrar yapacağız.",
    whyMe:
      "Rust Cohle'un dünyaya filtresiz ve tavizsiz bakışı. Herkesin kendini kandırdığı yerde gerçekleri olduğu gibi söylemekten çekinmeyen o soğukkanlı felsefe.",
    gradient: "from-teal-950 to-stone-950",
  },
  {
    title: "Moon Knight",
    image: "/images/moonknight.jpg",
    tag: "Marc Spector / Steven Grant",
    quote: "Karanlıkla savaşmak için bazen kendi içindeki kaosu kabul etmen gerekir.",
    whyMe:
      "İnsanın kendi zihninin içindeki çatışmalarla yüzleşmesi ve zayıflık sandığı yönlerini bir güce dönüştürmesi fikri çok etkileyiciydi.",
    gradient: "from-indigo-950 to-slate-950",
  },
];

const MOVIES_DATA = [
  {
    title: "In Bruges (2008)",
    image: "/images/inbruges.jpg",
    tag: "Ray & Ken",
    quote: "Belki de cehennem budur; sonsuza dek Bruges'de kalmak.",
    whyMe:
      "Hem kahkaha attırıp hem boğazı düğümleyen o ince çizgi. İnsanın yaptığı hataların vicdanında nasıl yankılandığını masalsı ama acımasız bir dille anlatıyor.",
    gradient: "from-indigo-950 to-amber-950",
  },
  {
    title: "Good Will Hunting (1997)",
    image: "/images/good-will-hunting.jpg",
    tag: "Will Hunting & Sean",
    quote: "Senin suçun değil evlat. Senin suçun değil.",
    whyMe:
      "Potansiyelin olmasına rağmen kendini sabote etme korkusu ve insanın kabuğunu kırması. Bir teknik insan olarak kafa yapısına ve kırılma anlarına çok yakın hissettiğim bir film.",
    gradient: "from-amber-950 to-stone-900",
  },
  {
    title: "Bullet Train (2022)",
    image: "/images/bullet-train.jpg",
    tag: "Uğur Böceği",
    quote: "Hayatta tesadüf diye bir şey yoktur, her şey birbirine bağlıdır.",
    whyMe:
      "Yüksek tempo, kusursuz kurgu ve şanssızlığın ortasında bile soğukkanlılığını koruyan mizah anlayışı. Baştan sona hiç sıkmayan saf eğlence.",
    gradient: "from-rose-950 to-purple-950",
  },
  {
    title: "Dune (2021–2024)",
    image: "/images/dune.jpg",
    tag: "Paul Atreides",
    quote: "Korku akıl katilidir. Korkunun üzerimden ve içimden geçmesine izin vereceğim.",
    whyMe:
      "Devasa görsel atmosferi ve insanın kendi kaderiyle yüzleşme cesareti. Bilinmezin ortasında korkuyu yenip kontrolü ele alma felsefesi.",
    gradient: "from-orange-950 to-stone-950",
  },
  {
    title: "The Banshees of Inisherin (2022)",
    image: "/images/banshees.jpg",
    tag: "Pádraic & Colm",
    quote: "İyi biri olmak, geriye kalan her şeyden daha önemlidir.",
    whyMe:
      "Bir insanın durup dururken hayatındaki bağları kesmesi ve yalnızlığın ne kadar ağır sonuçlar doğurabileceği üzerine çok sarsıcı bir hikaye.",
    gradient: "from-emerald-950 to-slate-900",
  },
  {
    title: "The Matrix (1999)",
    image: "/images/matrix.jpg",
    tag: "Neo & Morpheus",
    quote: "Yolu bilmekle o yolda yürümek arasında fark vardır.",
    whyMe:
      "Sistemlerin nasıl çalıştığını sorgulamak ve kuralların ötesini görebilmek. Mesleğim gereği sistem mantığıyla uğraşırken ilham veren klasik.",
    gradient: "from-green-950 to-black",
  },
];

const FORTUNE_QUOTES = [
  "Bugün ertelediğin o küçük adım, yarın en gurur duyduğun hikayene dönüşebilir.",
  "Yüzündeki gülümseme, tanımadığın birinin bile gününü güzelleştirmeye yeter.",
  "En güzel manzaralar, en dik yokuşların sonunda karşına çıkar. Yola devam!",
  "Şu an tam olman gereken yerdesin; güzel tesadüfler çok yakında kapını çalacak.",
  "Kendine biraz kahve veya çay ısmarla, bugün gerçekten iyi iş çıkardın.",
  "Bazen hiçbir plan yapmamak, hayatın sana hazırladığı en güzel sürprize yer açar.",
  "Enerjin o kadar temiz ki, girdiğin her ortama kendiliğinden huzur taşıyorsun.",
  "Yeni yıl sana hiç beklemediğin bir anda 'İyi ki!' diyeceğin harika başlangıçlar getirsin.",
  "Küçük bir mola ver, derin bir nefes al; her şey sandığından çok daha yolunda gidiyor.",
  "Kalbinin sıcaklığı etrafındaki herkesi ısıtıyor, bunu sakın kaybetme.",
  "Bugün şans senden yana; aklından geçen o güzel fikri hayata geçirmenin tam zamanı.",
  "Hayat kısa, sevdiğin şarkıyı biraz daha aç ve anın tadını çıkar.",
  "Senin gibi samimi insanların yolu her zaman açık ve aydınlık olur.",
  "Zor sandığın düğümler, sabırla beklediğinde kendiliğinden çözülür.",
  "Gözlerindeki ışıltı, en karanlık gecede bile yolunu bulmana yeter.",
  "Bugün kendine nazik davran; dünyanın senin neşene ihtiyacı var.",
  "Güzel haberler yolda! Çok yakında yüzünü güldürecek bir mesaj alacaksın.",
  "Her yeni gün, bembeyaz bir sayfa ve yeni bir gülümseme fırsatıdır.",
];

const FIVE_LETTER_WORDS = [
  "KASET",
  "GÜNEŞ",
  "KAHVE",
  "ROMAN",
  "ŞARKI",
  "BULUT",
  "DENİZ",
  "ÇİÇEK",
  "RADYO",
  "HAYAL",
  "KÖPRÜ",
  "ZİRVE",
  "SABAH",
  "BAHÇE",
  "MÜZİK",
].filter((w) => w.length === 5);

const KEYBOARD_ROWS = [
  ["E", "R", "T", "Y", "U", "I", "O", "P", "Ğ", "Ü"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ş", "İ"],
  ["ENTER", "Z", "C", "V", "B", "N", "M", "Ö", "Ç", "DEL"],
];

// Hafif ve Akıcı Kar Yağışı Katmanı
const SnowfallLayer = ({ count = 24, zIndexClass = "z-[5]" }) => {
  const flakes = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 37 + 11) % 98}%`,
        delay: (i % 7) * 0.85,
        duration: 7.5 + (i % 6) * 1.4,
        size: i % 4 === 0 ? 4 : i % 2 === 0 ? 3 : 2,
        drift: i % 2 === 0 ? 14 : -14,
        opacity: i % 3 === 0 ? 0.72 : 0.42,
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden ${zIndexClass}`}>
      {flakes.map((flake) => (
        <motion.span
          key={flake.id}
          initial={{ y: -20, x: 0, opacity: 0 }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, flake.drift, 0],
            opacity: [0, flake.opacity, flake.opacity, 0],
          }}
          transition={{
            duration: flake.duration,
            repeat: Infinity,
            delay: flake.delay,
            ease: "linear",
          }}
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
          }}
          className="absolute top-0 rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.5)]"
        />
      ))}
    </div>
  );
};

// ---------- Seed'li rastgelelik: ağaç her açılışta AYNI, ama doğal görünür ----------
const mulberry32 = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const PINE_CX = 150;
const PINE_BASE = 372;
const PINE_TOP = 60;
const pineWidth = (t) => 108 * Math.pow(1 - t, 0.82) + 5;
const f1 = (n) => Math.round(n * 10) / 10;
const quadAt = (p0, p1, p2, u) => {
  const a = (1 - u) * (1 - u);
  const b = 2 * (1 - u) * u;
  const c = u * u;
  return { x: a * p0.x + b * p1.x + c * p2.x, y: a * p0.y + b * p1.y + c * p2.y };
};

// Ağaç geometrisi bir kez, rastgele ama sabit tohumla üretilir:
// her dal elle çizilmiş gibi farklı uzunluk / sarkma / iğne yoğunluğuna sahip.
const buildPine = () => {
  const rnd = mulberry32(2027);
  const GREENS = ["#2f6b52", "#3a7a5d", "#27593f", "#4b9174"];
  const LIGHT = ["#5aa585", "#74b99a", "#4a8f72", "#8cc9ad"];
  const LEVELS = 32;
  const branches = [];
  const twigs = [];
  const snow = [];
  const tips = [];

  for (let i = 0; i < LEVELS; i++) {
    const t = i / (LEVELS - 1);
    const baseY = PINE_BASE - (PINE_BASE - PINE_TOP) * Math.pow(t, 0.92) + (rnd() - 0.5) * 4;

    [-1, 1].forEach((side) => {
      const L = pineWidth(t) * (0.78 + rnd() * 0.42);
      const droop = (13 + rnd() * 9) * (1 - t * 0.55);
      const p0 = { x: PINE_CX, y: baseY };
      const p2 = { x: PINE_CX + side * L, y: baseY + droop + (rnd() - 0.5) * 3 };
      const p1 = { x: PINE_CX + side * L * 0.52, y: baseY - 3 - rnd() * 5 };
      const delay = 1.4 + t * 4.6 + (side > 0 ? 0.06 : 0) + rnd() * 0.08;

      branches.push({
        d: `M${f1(p0.x)} ${f1(p0.y)} Q${f1(p1.x)} ${f1(p1.y)} ${f1(p2.x)} ${f1(p2.y)}`,
        w: f1(1.8 + (1 - t) * 3.4),
        color: GREENS[Math.floor(rnd() * GREENS.length)],
        delay,
      });
      tips.push({ x: p2.x, y: p2.y, t });

      // Sarkan çam iğnesi demetleri
      const count = t < 0.7 ? 5 : 3;
      const s = 0.55 + 0.45 * (1 - t);
      for (let k = 0; k <= count; k++) {
        const u = k === count ? 1 : 0.18 + (k / count) * 0.78 + rnd() * 0.05;
        const P = quadAt(p0, p1, p2, u);
        const len = (8 + rnd() * 9) * s;
        const end = { x: P.x + side * (1 + rnd() * 5) * s, y: P.y + len };
        const ctrl = { x: P.x + side * rnd() * 3, y: P.y + len * 0.5 };
        twigs.push({
          d: `M${f1(P.x)} ${f1(P.y)} Q${f1(ctrl.x)} ${f1(ctrl.y)} ${f1(end.x)} ${f1(end.y)}`,
          w: f1(0.9 + s * 0.5),
          color: LIGHT[Math.floor(rnd() * LIGHT.length)],
          delay: delay + u * 0.45 + 0.12,
        });
      }

      // Dal üstündeki kar çizgisi (ressam en sonda ışık vurur)
      if (rnd() < 0.75) {
        const a = quadAt(p0, p1, p2, 0.22);
        const b = quadAt(p0, p1, p2, 0.55);
        const c = quadAt(p0, p1, p2, 0.85);
        const ctl = { x: 2 * b.x - (a.x + c.x) / 2, y: 2 * b.y - (a.y + c.y) / 2 };
        snow.push({
          d: `M${f1(a.x)} ${f1(a.y - 1.6)} Q${f1(ctl.x)} ${f1(ctl.y - 1.6)} ${f1(c.x)} ${f1(c.y - 1.6)}`,
          w: f1(1.3 + (1 - t) * 1.2),
          delay: 6.0 + t * 1.3 + rnd() * 0.2,
        });
      }
    });
  }

  // Dal uçlarına asılan süs topları
  const pool = tips.filter((p) => p.t > 0.04 && p.t < 0.62);
  const baubles = [];
  for (let i = 0; i < 10 && pool.length; i++) {
    const p = pool.splice(Math.floor(rnd() * pool.length), 1)[0];
    const r = f1(3.2 + rnd() * 1.8);
    baubles.push({ x: f1(p.x), y: f1(p.y + 3.5), r, kind: i % 3, delay: 8.0 + i * 0.11 });
  }

  // Işık kablosu (girlandlar) + ampuller
  const garlands = [];
  const lights = [];
  const BULBS = ["#ffd27a", "#ffb4a8", "#bfe3ff", "#fff1c2"];
  [0.06, 0.2, 0.34, 0.48, 0.62, 0.76].forEach((t, gi) => {
    const y = PINE_BASE - (PINE_BASE - PINE_TOP) * Math.pow(t, 0.92) + 4;
    const w = pineWidth(t) * 0.7;
    const p0 = { x: PINE_CX - w, y: y - 3 };
    const p1 = { x: PINE_CX, y: y + 13 };
    const p2 = { x: PINE_CX + w, y: y - 3 };
    const delay = 7.0 + gi * 0.15;
    garlands.push({
      d: `M${f1(p0.x)} ${f1(p0.y)} Q${f1(p1.x)} ${f1(p1.y)} ${f1(p2.x)} ${f1(p2.y)}`,
      delay,
    });
    [0.12, 0.32, 0.5, 0.68, 0.88].forEach((u, k) => {
      const P = quadAt(p0, p1, p2, u);
      lights.push({
        x: f1(P.x),
        y: f1(P.y),
        color: BULBS[(gi + k) % BULBS.length],
        delay: delay + 0.9 + k * 0.12,
        tw: 2.2 + ((gi + k) % 3) * 0.5,
      });
    });
  });

  // Tepedeki elle çizilmiş (hafif kusurlu) yıldız
  const pts = [];
  for (let k = 0; k < 10; k++) {
    const r = (k % 2 === 0 ? 11 : 4.7) * (1 + (rnd() - 0.5) * 0.08);
    const ang = -Math.PI / 2 + (k * Math.PI) / 5;
    pts.push(`${f1(PINE_CX + Math.cos(ang) * r)} ${f1(44 + Math.sin(ang) * r)}`);
  }

  return { branches, twigs, snow, baubles, garlands, lights, starD: `M${pts.join(" L")} Z` };
};

const PINE = buildPine();

const PINE_KEYFRAMES = `
@keyframes pdraw{from{stroke-dashoffset:1;opacity:0}2%{opacity:1}to{stroke-dashoffset:0;opacity:1}}
@keyframes pfade{from{opacity:0}to{opacity:1}}
@keyframes ppop{0%{opacity:0;transform:scale(.2)}70%{opacity:1;transform:scale(1.3)}100%{opacity:1;transform:scale(1)}}
@keyframes ptwinkle{0%,100%{opacity:.5}50%{opacity:1}}
`;

const drawStyle = (on, delay, dur) =>
  on
    ? {
        strokeDasharray: 1,
        strokeDashoffset: 1,
        animation: `pdraw ${dur}s cubic-bezier(.4,0,.2,1) ${delay}s both`,
      }
    : undefined;

const fadeStyle = (on, delay, dur = 0.7) =>
  on ? { opacity: 0, animation: `pfade ${dur}s ease-out ${delay}s both` } : undefined;

const popBase = { transformBox: "fill-box", transformOrigin: "center" };

// Alttan yukarı, tek tek fırça darbeleriyle "çizilen" çam ağacı.
// animated=false → ağaç hazır (masaüstü kartı için).
const DrawnPine = ({ className = "h-72 w-64", animated = true, boost = false }) => {
  const uid = React.useId().replace(/:/g, "");
  const A = animated;

  return (
    <svg
      viewBox="0 0 300 420"
      className={`${className} overflow-visible select-none`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <radialGradient id={`${uid}-red`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f4a3ad" />
          <stop offset="45%" stopColor="#b3243b" />
          <stop offset="100%" stopColor="#5c0d1d" />
        </radialGradient>
        <radialGradient id={`${uid}-gold`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fbeeb5" />
          <stop offset="45%" stopColor="#d9a441" />
          <stop offset="100%" stopColor="#6b4514" />
        </radialGradient>
        <radialGradient id={`${uid}-ice`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#dff1ff" />
          <stop offset="45%" stopColor="#5b8fb5" />
          <stop offset="100%" stopColor="#1d3d57" />
        </radialGradient>
        <radialGradient id={`${uid}-halo`}>
          <stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <style>{PINE_KEYFRAMES}</style>

      {/* 1 • Zemin: kar yığını çizgileri */}
      <ellipse cx="150" cy="398" rx="96" ry="9" fill="rgba(0,0,0,0.35)" style={fadeStyle(A, 0.1, 1)} />
      <path d="M28 397 C70 388 110 392 150 390 C195 388 232 393 274 396" stroke="#b9cfd8" strokeWidth="2" pathLength={1} style={drawStyle(A, 0.1, 0.9)} />
      <path d="M70 404 C110 399 190 400 232 404" stroke="#8aa3ae" strokeWidth="1.4" pathLength={1} style={drawStyle(A, 0.35, 0.8)} />
      <path d="M116 392 C128 383 142 386 150 388 C160 385 172 384 186 392" stroke="#eef6f9" strokeWidth="1.8" pathLength={1} style={drawStyle(A, 0.55, 0.8)} />

      {/* 2 • Gövde: aşağıdan yukarı */}
      <path d="M150 396 L150 300" stroke="#5b3d2b" strokeWidth="9" pathLength={1} style={drawStyle(A, 0.9, 0.8)} />
      <path d="M147 394 L147.5 306" stroke="#8a6446" strokeWidth="1.6" pathLength={1} style={drawStyle(A, 1.1, 0.7)} />
      <path d="M152.5 394 L152 310" stroke="#3a2518" strokeWidth="1.4" pathLength={1} style={drawStyle(A, 1.15, 0.7)} />
      <path d="M150 300 L150 56" stroke="#4a3123" strokeWidth="3" pathLength={1} style={drawStyle(A, 1.3, 4.8)} />

      {/* 3 • Dallar: en alttan tepeye */}
      {PINE.branches.map((b, i) => (
        <g key={`br${i}`}>
          <path d={b.d} stroke="rgba(5,18,12,0.75)" strokeWidth={b.w + 1.6} transform="translate(0 2.4)" pathLength={1} style={drawStyle(A, b.delay, 0.5)} />
          <path d={b.d} stroke={b.color} strokeWidth={b.w} pathLength={1} style={drawStyle(A, b.delay, 0.5)} />
        </g>
      ))}

      {/* 4 • Sarkan iğne yaprakları */}
      {PINE.twigs.map((tw, i) => (
        <path key={`tw${i}`} d={tw.d} stroke={tw.color} strokeWidth={tw.w} pathLength={1} style={drawStyle(A, tw.delay, 0.3)} />
      ))}

      {/* 5 • Kar vurguları */}
      {PINE.snow.map((s, i) => (
        <path key={`sn${i}`} d={s.d} stroke="rgba(232,244,240,0.85)" strokeWidth={s.w} pathLength={1} style={drawStyle(A, s.delay, 0.45)} />
      ))}

      {/* 6 • Işık kablosu */}
      {PINE.garlands.map((g, i) => (
        <path key={`ga${i}`} d={g.d} stroke="rgba(240,205,120,0.55)" strokeWidth="1" pathLength={1} style={drawStyle(A, g.delay, 0.9)} />
      ))}

      {/* 7 • Süs topları */}
      {PINE.baubles.map((b, i) => (
        <g key={`ba${i}`} style={A ? { ...popBase, animation: `ppop .5s ease-out ${b.delay}s both` } : undefined}>
          <path d={`M${b.x} ${f1(b.y - 3.5)} L${b.x} ${b.y}`} stroke="#c9b27a" strokeWidth="0.8" />
          <circle cx={b.x} cy={f1(b.y + b.r)} r={b.r} fill={`url(#${uid}-${["red", "gold", "ice"][b.kind]})`} />
          <circle cx={f1(b.x - b.r * 0.3)} cy={f1(b.y + b.r * 0.7)} r={f1(b.r * 0.22)} fill="rgba(255,255,255,0.8)" />
        </g>
      ))}

      {/* 8 • Ampuller */}
      {PINE.lights.map((l, i) => (
        <g
          key={`li${i}`}
          style={{
            ...popBase,
            animation: A
              ? `ppop .5s ease-out ${l.delay}s both, ptwinkle ${boost ? 0.5 : l.tw}s ease-in-out ${l.delay + 0.6}s infinite`
              : `ptwinkle ${boost ? 0.5 : l.tw}s ease-in-out ${(i % 5) * 0.3}s infinite`,
          }}
        >
          <circle cx={l.x} cy={l.y} r={boost ? 6.5 : 5} fill={l.color} opacity="0.22" />
          <circle cx={l.x} cy={l.y} r={boost ? 2.8 : 2.1} fill={l.color} />
        </g>
      ))}

      {/* 9 • Yıldız: önce çizgi, sonra altın dolgu */}
      <circle cx="150" cy="44" r="24" fill={`url(#${uid}-halo)`} style={fadeStyle(A, 9.0, 1)} />
      <path d={PINE.starD} fill="#f3cf62" style={fadeStyle(A, 8.9, 0.6)} />
      <path d={PINE.starD} stroke="#f7dd86" strokeWidth="1.5" pathLength={1} style={drawStyle(A, 8.3, 0.7)} />
    </svg>
  );
};

// Ressamın ağacı alttan yukarı çizdiği sinematik giriş
const ChristmasIntroSplash = ({ onEnter }) => {
  const [ready, setReady] = useState(false);
  const reduced = React.useMemo(
    () =>
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), reduced ? 400 : 8800);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.95, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#05070b] px-6 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(30,64,56,0.22)_0%,rgba(5,7,11,1)_70%)]" />
      <SnowfallLayer count={20} zIndexClass="z-0" />

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        whileHover={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={onEnter}
        className="absolute right-5 top-5 z-20 cursor-pointer rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-[11px] tracking-wider text-white/75 backdrop-blur-sm"
      >
        Geç →
      </motion.button>

      <div className="relative z-10 flex flex-col items-center">
        <DrawnPine
          animated={!reduced}
          className="h-[20rem] w-[14.5rem] sm:h-[24rem] sm:w-[17rem]"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 10 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-1 text-center"
        >
          <span className="text-[11px] font-medium tracking-[0.3em] text-sky-300/75">
            YENİ YIL • 2027
          </span>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Mutlu Yıllar
          </h1>
          <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-white/60 sm:text-sm">
            2027, tam senin yılın olsun.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 10 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onEnter}
          disabled={!ready}
          className="group relative mt-6 inline-flex cursor-pointer items-center gap-3 rounded-2xl border border-sky-400/40 bg-sky-500/20 px-8 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_8px_32px_rgba(14,165,233,0.28)] backdrop-blur-md transition-all hover:border-sky-300/70 hover:bg-sky-500/30"
        >
          <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
          <span>Faruk ile Tanış</span>
          <span className="text-sky-300 transition-transform duration-200 group-hover:translate-x-1">→</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Dokununca dilek çıkaran masaüstü ağacı
const WISHES_2027 = [
  "2027 senin yılın olsun.",
  "Bu yıl ertelediğin her şeye cesaretle “evet” diyeceksin.",
  "Yeni yılda her şey tıkır tıkır çalışsın, hiç alarm vermesin.",
  "Sağlık, huzur ve bol kahkaha: 2027'nin üçlü paketi sana geliyor.",
  "Bu yıl hayal ettiğin kapılar, sen çalmadan açılacak.",
  "Küçük adımların 2027'de büyük bir hikâyeye dönüşecek.",
  "Yeni yıl, kalbinin en sevdiği şarkıyı çalsın.",
  "Bu yıl kendine de en az başkalarına gösterdiğin kadar nazik ol.",
  "2027'de aradığın cevaplar, beklemediğin bir anda yanına gelecek.",
  "Yolun açık, enerjin yüksek, şansın yanında olsun.",
  "Bu yıl yorulduğunda dinlen, ama asla vazgeçme.",
  "Güzel haberler, sıcak sohbetler ve sevdiklerinle dolu bir yıl dilerim.",
  "2027, kendine verdiği sözleri tutan sana ait.",
];

const DesktopChristmasWidget = ({ isDayMode }) => {
  const [wobbleKey, setWobbleKey] = useState(0);
  const [boost, setBoost] = useState(false);
  const [wishIdx, setWishIdx] = useState(null);
  const [sparks, setSparks] = useState([]);
  const boostTimer = useRef(null);

  useEffect(() => () => clearTimeout(boostTimer.current), []);

  const handleTreeTap = () => {
    playTreeBellSound();
    setWobbleKey((p) => p + 1);
    setBoost(true);
    clearTimeout(boostTimer.current);
    boostTimer.current = setTimeout(() => setBoost(false), 1800);

    setWishIdx((prev) => {
      let n = Math.floor(Math.random() * WISHES_2027.length);
      if (n === prev) n = (n + 1) % WISHES_2027.length;
      return n;
    });

    const stamp = Date.now();
    const burst = Array.from({ length: 12 }, (_, i) => {
      const ang = (Math.PI * 2 * i) / 12 + Math.random() * 0.5;
      const dist = 40 + Math.random() * 50;
      return {
        id: `${stamp}-${i}`,
        dx: Math.cos(ang) * dist,
        dy: Math.sin(ang) * dist - 20,
        size: 3 + Math.random() * 4,
      };
    });
    setSparks((s) => [...s, ...burst]);
    setTimeout(() => setSparks((s) => s.filter((p) => !burst.some((b) => b.id === p.id))), 1300);
  };

  return (
    <div
      onClick={handleTreeTap}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleTreeTap()}
      title="Ağaca dokun!"
      className={`group relative mx-auto w-full max-w-md cursor-pointer overflow-hidden rounded-3xl border px-5 py-4 shadow-2xl transition-colors ${
        isDayMode
          ? "border-white/30 bg-black/35 hover:bg-black/45"
          : "border-white/20 bg-black/50 hover:bg-black/60"
      }`}
    >
      <div className="pointer-events-none absolute -left-8 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-amber-400/15 blur-2xl" />
      <div className="pointer-events-none absolute bottom-2 right-4 h-28 w-28 rounded-full bg-emerald-500/10 blur-2xl" />

      <div className="relative z-10 flex items-center justify-between gap-3 sm:gap-5">
        <div className="relative shrink-0">
          <motion.div
            key={wobbleKey}
            animate={
              wobbleKey > 0
                ? { rotate: [0, -5, 4.5, -3.5, 2.5, -1.2, 0], scale: [1, 1.04, 1] }
                : { rotate: 0 }
            }
            transition={{ duration: 0.9, ease: "easeInOut" }}
            style={{ transformOrigin: "50% 92%" }}
          >
            <DrawnPine animated={false} boost={boost} className="h-40 w-28 sm:h-44 sm:w-32" />
          </motion.div>

          {sparks.map((p) => (
            <motion.span
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0.2 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="pointer-events-none absolute left-1/2 top-[40%] rounded-full bg-amber-200 shadow-[0_0_8px_rgba(253,230,138,0.9)]"
              style={{ width: p.size, height: p.size }}
            />
          ))}
        </div>

        <div className="flex-1 pr-1 text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/25 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-amber-200">
            YENİ YIL • 2027
          </span>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Mutlu Yıllar
          </h2>

          <div className="mt-1.5 min-h-[4.2rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={wishIdx === null ? "idle" : wishIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className={
                  wishIdx === null
                    ? "text-xs leading-relaxed text-white/75"
                    : "text-sm font-semibold italic leading-relaxed text-amber-100"
                }
              >
                {wishIdx === null
                  ? "Yeni yıl sana sağlık, huzur ve yüzünü güldürecek güzel sürprizler getirsin."
                  : `“${WISHES_2027[wishIdx]}”`}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="mt-1 text-[11px] font-medium text-amber-200/80 transition-colors group-hover:text-amber-200">
            {wishIdx === null ? "Ağaca dokun, bir dilek çıksın →" : "Bir dilek daha için dokun →"}
          </p>
        </div>
      </div>
    </div>
  );
};

// Retro Kasetçalar Bileşeni
const CassettePlayer = ({ musicPlaying, onToggleMusic, soundFx }) => {
  return (
    <div className="mb-6 rounded-3xl border border-amber-400/25 bg-gradient-to-br from-[#1d1924] via-[#151822] to-[#1f161b] p-5 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="relative w-full max-w-xs rounded-2xl border-2 border-white/20 bg-[#252836] p-3.5 shadow-inner">
          <div className="rounded-xl bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-600 p-0.5">
            <div className="rounded-[10px] bg-[#161822] px-3 py-2">
              <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-amber-300">
                <span>SIDE A • FARUK MIX</span>
                <span>90 MIN</span>
              </div>
              <div className="mt-0.5 truncate text-xs font-semibold text-white">
                Last Christmas & Gece Seçkisi
              </div>

              <div className="mt-2.5 flex items-center justify-center gap-6 rounded-lg bg-black/60 py-2 border border-white/10">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-amber-300/80 bg-white/5 ${
                    musicPlaying ? "animate-spin" : ""
                  }`}
                  style={{ animationDuration: "3.5s" }}
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                </div>

                <div className="h-4 w-12 rounded bg-amber-950/70 border border-white/10 flex items-center justify-center">
                  <div className="h-1.5 w-9 bg-amber-700/60 rounded-full" />
                </div>

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-amber-300/80 bg-white/5 ${
                    musicPlaying ? "animate-spin" : ""
                  }`}
                  style={{ animationDuration: "3.5s" }}
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 px-3 py-1 text-[11px] font-semibold text-rose-300">
            {musicPlaying ? "● Şu An Çalıyor" : "❚❚ Duraklatıldı"}
          </span>
          <h3 className="mt-2 text-lg font-bold text-white">Faruk'un Kasetçaları</h3>
          <p className="mt-1 text-xs leading-relaxed text-white/70">
            Siteye girdiğinde seni karşılayan yılbaşı atmosferi ve gece vardiyası şarkıları. Kaseti istediğin an durdurup başlatabilirsin.
          </p>

          <button
            onClick={() => {
              playClickSound(soundFx);
              onToggleMusic();
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg transition hover:opacity-90 cursor-pointer"
          >
            {musicPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{musicPlaying ? "Kaseti Durdur" : "Kaseti Çal"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Şans Kurabiyesi Bileşeni
const FortuneCookieApp = ({ soundFx }) => {
  const [cracked, setCracked] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(() =>
    Math.floor(Math.random() * FORTUNE_QUOTES.length)
  );

  const handleCrack = () => {
    playClickSound(soundFx);
    if (!cracked) {
      setCracked(true);
    } else {
      setCracked(false);
      setTimeout(() => {
        setQuoteIdx((prev) => {
          let next = Math.floor(Math.random() * FORTUNE_QUOTES.length);
          if (next === prev) next = (prev + 1) % FORTUNE_QUOTES.length;
          return next;
        });
        setCracked(true);
      }, 220);
    }
  };

  return (
    <div className="mx-auto max-w-lg text-center py-4">
      <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-b from-amber-500/10 to-[#161923] p-6 sm:p-8 shadow-xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold text-amber-300">
          <Sparkles className="h-3.5 w-3.5" /> Günün Pozitif Enerjisi
        </span>
        <h3 className="mt-3 text-2xl font-bold text-white">Şans Kurabiyeni Kır</h3>
        <p className="mt-1 text-xs sm:text-sm text-white/70">
          Kurabiyeye dokun, içinden bugüne özel güzel bir mesaj çıksın.
        </p>

        <div className="my-8 flex flex-col items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.06, rotate: [-1, 2, -1, 0] }}
            whileTap={{ scale: 0.92 }}
            onClick={handleCrack}
            className="relative flex h-32 w-32 items-center justify-center rounded-full border border-amber-400/30 bg-gradient-to-br from-amber-400/20 to-orange-600/20 shadow-[0_0_40px_rgba(251,191,36,0.2)] cursor-pointer"
          >
            <Cookie
              className={`h-16 w-16 text-amber-300 transition-transform duration-300 ${
                cracked ? "scale-90 rotate-12 opacity-80" : "scale-100"
              }`}
            />
          </motion.button>

          <AnimatePresence mode="wait">
            {cracked ? (
              <motion.div
                key={quoteIdx}
                initial={{ opacity: 0, y: 14, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="mt-6 w-full rounded-2xl border border-amber-300/35 bg-[#fffbeb] p-5 text-stone-900 shadow-xl"
              >
                <p className="text-sm sm:text-base font-semibold leading-relaxed italic">
                  "{FORTUNE_QUOTES[quoteIdx]}"
                </p>
              </motion.div>
            ) : (
              <p className="mt-4 text-xs text-amber-200/80 animate-pulse">
                ↑ Kurabiyeye dokun ↑
              </p>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={handleCrack}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-stone-950 shadow-lg transition hover:bg-amber-400 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          <span>{cracked ? "Yeni Kurabiye Kır" : "Kurabiyeyi Kır"}</span>
        </button>
      </div>
    </div>
  );
};

// Günün Oyunu: Parolla (5 Harfli Türkçe Kelime Tahmini)
const ParollaGame = ({ soundFx }) => {
  const [targetWord, setTargetWord] = useState(() => {
    const dayIndex = new Date().getDate() % FIVE_LETTER_WORDS.length;
    return FIVE_LETTER_WORDS[dayIndex];
  });
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [status, setStatus] = useState("playing");
  const [shakeMsg, setShakeMsg] = useState("");

  const resetNewWord = () => {
    playClickSound(soundFx);
    const randomWord =
      FIVE_LETTER_WORDS[Math.floor(Math.random() * FIVE_LETTER_WORDS.length)];
    setTargetWord(randomWord);
    setGuesses([]);
    setCurrentGuess("");
    setStatus("playing");
    setShakeMsg("");
  };

  const handleKey = (key) => {
    playClickSound(soundFx);
    if (status !== "playing") return;
    setShakeMsg("");

    if (key === "DEL") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (key === "ENTER") {
      if (currentGuess.length < 5) {
        setShakeMsg("5 harfli bir kelime yazmalısın!");
        return;
      }
      const nextGuesses = [...guesses, currentGuess];
      setGuesses(nextGuesses);
      setCurrentGuess("");

      if (currentGuess === targetWord) {
        setStatus("won");
      } else if (nextGuesses.length >= 6) {
        setStatus("lost");
      }
      return;
    }

    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  const getLetterColors = (guess) => {
    const result = Array(5).fill("absent");
    const targetArr = targetWord.split("");
    const guessArr = guess.split("");

    guessArr.forEach((char, i) => {
      if (char === targetArr[i]) {
        result[i] = "correct";
        targetArr[i] = null;
      }
    });

    guessArr.forEach((char, i) => {
      if (result[i] === "correct") return;
      const foundIdx = targetArr.indexOf(char);
      if (foundIdx !== -1) {
        result[i] = "present";
        targetArr[foundIdx] = null;
      }
    });

    return result;
  };

  const keyStatuses = {};
  guesses.forEach((guess) => {
    const colors = getLetterColors(guess);
    guess.split("").forEach((char, i) => {
      const current = keyStatuses[char];
      if (colors[i] === "correct") keyStatuses[char] = "correct";
      else if (colors[i] === "present" && current !== "correct")
        keyStatuses[char] = "present";
      else if (!current) keyStatuses[char] = "absent";
    });
  });

  return (
    <div className="mx-auto max-w-md flex flex-col items-center">
      <div className="mb-3 flex w-full items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Faruk Parolla</h3>
          <p className="text-xs text-white/65">5 harfli gizli kelimeyi 6 denemede bul</p>
        </div>
        <button
          onClick={resetNewWord}
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Yeni Kelime</span>
        </button>
      </div>

      {shakeMsg && (
        <div className="mb-2 rounded-lg bg-amber-500/20 border border-amber-400/40 px-3 py-1 text-xs text-amber-200">
          {shakeMsg}
        </div>
      )}

      <div className="grid grid-rows-6 gap-1.5 my-2">
        {Array.from({ length: 6 }).map((_, rowIdx) => {
          const isSubmitted = rowIdx < guesses.length;
          const isCurrent = rowIdx === guesses.length;
          const word = isSubmitted
            ? guesses[rowIdx]
            : isCurrent
            ? currentGuess.padEnd(5, " ")
            : "     ";
          const colors = isSubmitted ? getLetterColors(word) : [];

          return (
            <div key={rowIdx} className="grid grid-cols-5 gap-1.5">
              {word.split("").map((char, colIdx) => {
                let boxStyle = "border-white/20 bg-white/5 text-white";
                if (isSubmitted) {
                  if (colors[colIdx] === "correct")
                    boxStyle = "border-emerald-400 bg-emerald-600 text-white";
                  else if (colors[colIdx] === "present")
                    boxStyle = "border-amber-400 bg-amber-500 text-stone-950";
                  else boxStyle = "border-white/10 bg-white/10 text-white/50";
                } else if (char !== " ") {
                  boxStyle = "border-violet-400/60 bg-violet-500/15 text-white";
                }

                return (
                  <div
                    key={colIdx}
                    className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border text-lg font-extrabold transition-colors ${boxStyle}`}
                  >
                    {char !== " " ? char : ""}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {status !== "playing" && (
        <div
          className={`my-2 w-full rounded-2xl border p-3.5 text-center ${
            status === "won"
              ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
              : "border-rose-400/40 bg-rose-500/15 text-rose-200"
          }`}
        >
          <p className="text-sm font-bold">
            {status === "won"
              ? `Tebrikler! "${targetWord}" kelimesini buldun 🎉`
              : `Olsun! Doğru kelime: ${targetWord}`}
          </p>
          <button
            onClick={resetNewWord}
            className="mt-2 rounded-xl bg-white/15 px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/25 cursor-pointer"
          >
            Tekrar Oyna
          </button>
        </div>
      )}

      <div className="mt-3 w-full space-y-1.5">
        {KEYBOARD_ROWS.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1">
            {row.map((k) => {
              const st = keyStatuses[k];
              let btnColor = "bg-white/15 text-white hover:bg-white/25";
              if (st === "correct") btnColor = "bg-emerald-600 text-white";
              else if (st === "present") btnColor = "bg-amber-500 text-stone-950";
              else if (st === "absent") btnColor = "bg-white/5 text-white/35";

              const isWide = k === "ENTER" || k === "DEL";

              return (
                <button
                  key={k}
                  onClick={() => handleKey(k)}
                  className={`${
                    isWide ? "px-2.5 text-[11px]" : "flex-1 max-w-[34px] text-xs"
                  } h-10 rounded-lg font-bold transition active:scale-90 cursor-pointer flex items-center justify-center ${btnColor}`}
                >
                  {k === "DEL" ? <Delete className="h-4 w-4" /> : k}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// Sağa Kaydırılabilir Dizi / Film Kartları Bileşeni
const HorizontalMediaCarousel = ({ items, accentColor = "emerald" }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -340 : 340;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs text-white/55">
          Sağa kaydırarak veya okları kullanarak gezebilirsin →
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="rounded-xl border border-white/15 bg-white/10 p-2 text-white hover:bg-white/20 cursor-pointer"
            title="Sola Kaydır"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="rounded-xl border border-white/15 bg-white/10 p-2 text-white hover:bg-white/20 cursor-pointer"
            title="Sağa Kaydır"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "thin" }}
      >
        {items.map((item) => (
          <div
            key={item.title}
            className="snap-start shrink-0 w-[85vw] sm:w-[370px] flex flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-[#181a24] shadow-xl"
          >
            <div>
              <div className={`relative h-52 w-full bg-gradient-to-br ${item.gradient}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181a24] via-black/25 to-transparent" />
                <span
                  className={`absolute top-3 left-3 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold ${
                    accentColor === "emerald" ? "text-emerald-300" : "text-indigo-300"
                  }`}
                >
                  {item.tag}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>

                <blockquote
                  className={`mt-3 rounded-xl border-l-4 ${
                    accentColor === "emerald" ? "border-emerald-400" : "border-indigo-400"
                  } bg-black/35 p-3 text-xs sm:text-sm italic text-white/95`}
                >
                  <Quote className="inline h-3.5 w-3.5 mr-1.5 opacity-60" />
                  "{item.quote}"
                </blockquote>

                <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-white/80">
                  {item.whyMe}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [entered, setEntered] = useState(false);
  const [activeFolder, setActiveFolder] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [now, setNow] = useState(new Date());
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [soundFx] = useState(true);
  const [carpetOffset, setCarpetOffset] = useState({ x: 0, y: 0 });

  // Gece / Gündüz Otomatik Atmosfer Modu (07:00 - 19:00 arası gündüz)
  const [isDayMode, setIsDayMode] = useState(() => {
    const h = new Date().getHours();
    return h >= 7 && h < 19;
  });

  // Mesaj Bırak State'leri
  const [noteText, setNoteText] = useState("");
  const [noteStatus, setNoteStatus] = useState("idle");
  const [noteErrorMsg, setNoteErrorMsg] = useState("");

  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMove = (clientX, clientY) => {
      const nx = (clientX / window.innerWidth - 0.5) * 18;
      const ny = (clientY / window.innerHeight - 0.5) * 18;
      setCarpetOffset({ x: -nx, y: -ny });
    };

    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  // Açılış ekranından "Faruk ile Tanış" butonuna basınca müzik başlar
  const handleEnterSystem = () => {
    playClickSound(true);
    setEntered(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current
        .play()
        .then(() => setMusicPlaying(true))
        .catch(() => setMusicPlaying(false));
    }
  };

  const toggleMusic = () => {
    playClickSound(soundFx);
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {});
    }
  };

  const openFolder = (folder) => {
    playClickSound(soundFx);
    window.location.hash = folder.id;
    setActiveFolder(folder);
    setActiveTab(0);
  };

  const closeFolder = () => {
    playClickSound(soundFx);
    window.history.pushState("", document.title, window.location.pathname);
    setActiveFolder(null);
  };

  const handleSendNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    playClickSound(soundFx);
    setNoteStatus("sending");
    setNoteErrorMsg("");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          message: noteText,
          tarih: new Date().toLocaleString("tr-TR"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setNoteStatus("sent");
        setNoteText("");
      } else {
        setNoteStatus("error");
        setNoteErrorMsg(
          data?.errors?.[0]?.message ||
            "Formspree e-posta onayı tamamlanmamış olabilir. Gelen kutundaki onay mailini kontrol et."
        );
      }
    } catch {
      setNoteStatus("error");
      setNoteErrorMsg("Bağlantı hatası oluştu, internetini kontrol edip tekrar dene.");
    }
  };

  const formattedTime = now.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = now.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });

  const renderFolderContent = () => {
    if (!activeFolder) return null;

    // 1. KARİYER
    if (activeFolder.id === "kariyer") {
      if (activeTab === 0) {
        return (
          <div className="space-y-6">
            <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/10 via-white/5 to-emerald-500/10 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-medium text-amber-300">
                    <Cpu className="h-3.5 w-3.5" /> Otomasyon Teknikeri
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-white">
                    Endüstriyel Otomasyon & Akıllı Tarım Teknolojileri
                  </h3>
                  <p className="mt-1 text-sm text-white/60">
                    Vegevital Tarım A.Ş. • İstanbul Üniversitesi-Cerrahpaşa Mezunu
                  </p>
                </div>
                <a
                  href="https://www.linkedin.com/in/farukkocer/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#004182]"
                >
                  <span>LinkedIn Profilim</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <p className="mt-5 text-sm sm:text-base leading-relaxed text-white/85">
                İstanbul Üniversitesi-Cerrahpaşa <strong>Kontrol ve Otomasyon Teknolojisi</strong> mezunuyum.
                Şu anda <strong>Vegevital Tarım A.Ş.</strong> bünyesinde Otomasyon Teknikeri olarak akıllı sera
                sistemleri, iklimlendirme ve sulama otomasyonu, SCADA kontrol yazılımları, saha sensör izleme ve
                CO₂ iklim kontrol ünitelerinin yönetimi üzerine çalışıyorum.
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/75">
                Üniversite eğitimim ve <strong>Yılmaz Redüktör</strong> stajım sırasında edindiğim PLC programlama
                (TIA Portal), AC motor sürücüleri (VFD/İnvertör) ve güç elektroniği tecrübemi, tarım teknolojileri
                ile endüstriyel otomasyonun kesişim noktasında sahaya uyguluyorum.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Sprout className="h-6 w-6 text-emerald-400" />
                <h4 className="mt-2 font-semibold text-white">Akıllı Sera Sistemleri</h4>
                <p className="mt-1 text-xs text-white/65">
                  İklim kontrolü, CO₂ dozajlama, sulama otomasyonu ve gerçek zamanlı sensör takibi.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Cpu className="h-6 w-6 text-amber-400" />
                <h4 className="mt-2 font-semibold text-white">PLC & SCADA</h4>
                <p className="mt-1 text-xs text-white/65">
                  Siemens TIA Portal tabanlı kontrol mimarileri ve endüstriyel saha izleme ekranları.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Briefcase className="h-6 w-6 text-sky-400" />
                <h4 className="mt-2 font-semibold text-white">Sürücü & Güç Elektroniği</h4>
                <p className="mt-1 text-xs text-white/65">
                  AC motor sürücüleri (VFD), pano kablolama ve endüstriyel haberleşme protokolleri.
                </p>
              </div>
            </div>
          </div>
        );
      }

      if (activeTab === 1) {
        return (
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Mevcut Görev • 2026 - Günümüz
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs text-emerald-300">
                  Aktif
                </span>
              </div>
              <h4 className="mt-1 text-lg font-bold text-white">
                Otomasyon Teknikeri — Vegevital Tarım A.Ş.
              </h4>
              <p className="mt-2 text-sm text-white/75">
                Modern sera tesislerinde iklimlendirme, sulama otomasyonu, SCADA kontrol sistemleri, CO₂ üniteleri ve saha sensör ağlarının kesintisiz yönetimi.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Staj Deneyimi • Ağustos 2026
              </span>
              <h4 className="mt-1 text-lg font-bold text-white">
                Endüstriyel Otomasyon Stajyeri — Yılmaz Redüktör
              </h4>
              <p className="mt-2 text-sm text-white/75">
                AC motor sürücüleri (VFD/İnvertör), güç elektroniği testleri, Modbus RTU haberleşme ve PLC/HMI pano entegrasyonu üzerine saha uygulaması.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
                <GraduationCap className="h-4 w-4" /> Eğitim
              </div>
              <h4 className="mt-1 text-lg font-bold text-white">
                İstanbul Üniversitesi-Cerrahpaşa
              </h4>
              <p className="mt-1 text-sm text-white/75">
                Kontrol ve Otomasyon Teknolojisi Programı (Önlisans Mezunu)
              </p>
            </div>
          </div>
        );
      }

      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            "Siemens TIA Portal",
            "S7-1200 / S7-300 PLC",
            "SCADA & İklim Kontrol",
            "AC Motor Sürücüleri (VFD)",
            "Modbus RTU / Haberleşme",
            "Güç Elektroniği",
            "Saha Sensör Ağları",
            "AutoCAD Teknik Çizim",
            "Python & Gömülü Sistemler",
          ].map((skill) => (
            <div
              key={skill}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white/90"
            >
              {skill}
            </div>
          ))}
        </div>
      );
    }

    // 2. MÜZİKLERİM (KASETÇALAR + GRUPLAR)
    if (activeFolder.id === "muzikler") {
      return (
        <div>
          <CassettePlayer
            musicPlaying={musicPlaying}
            onToggleMusic={toggleMusic}
            soundFx={soundFx}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MUSIC_DATA.map((item) => (
              <div
                key={item.artist}
                className={`overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br ${item.color} flex flex-col justify-between`}
              >
                <div>
                  <div className="relative h-40 w-full bg-black/40">
                    <img
                      src={item.image}
                      alt={item.artist}
                      loading="lazy"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12131a] via-transparent to-transparent" />
                  </div>
                  <div className="p-5 pt-3">
                    <span className="text-[11px] uppercase tracking-wider text-white/60">
                      {item.genre}
                    </span>
                    <h4 className="mt-1 text-xl font-bold text-white">{item.artist}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-white/80">{item.vibe}</p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-white/10">
                  <span className="text-[11px] font-semibold text-white/50">Öne Çıkanlar:</span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.songs.map((song) => (
                      <span
                        key={song}
                        className="rounded-lg bg-black/35 px-2.5 py-1 text-xs text-white/90"
                      >
                        {song}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 3. DİZİLERİM
    if (activeFolder.id === "diziler") {
      return <HorizontalMediaCarousel items={SERIES_DATA} accentColor="emerald" />;
    }

    // 4. FİLMLERİM
    if (activeFolder.id === "filmler") {
      return (
        <div className="space-y-6">
          <HorizontalMediaCarousel items={MOVIES_DATA} accentColor="indigo" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-5">
            <div>
              <h4 className="text-base font-bold text-white">Daha Fazlası Letterboxd Hesabımda</h4>
              <p className="text-xs text-white/70 mt-0.5">
                İzlediğim tüm filmleri, puanlarımı ve listelerimi Letterboxd üzerinden takip edebilirsin.
              </p>
            </div>
            <a
              href="https://boxd.it/nouvT"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-400"
            >
              <span>Letterboxd Profilime Git</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      );
    }

    // 5. ŞANS KURABİYESİ
    if (activeFolder.id === "kurabiye") {
      return <FortuneCookieApp soundFx={soundFx} />;
    }

    // 6. GÜNÜN OYUNU (PAROLLA)
    if (activeFolder.id === "oyun") {
      return <ParollaGame soundFx={soundFx} />;
    }

    // 7. HAKKIMDA
    if (activeFolder.id === "hakkimda") {
      return (
        <div className="space-y-6">
          <div className="rounded-2xl border border-amber-400/25 bg-gradient-to-r from-red-900/30 via-black/40 to-amber-600/25 p-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-white">
                <MapPin className="h-3.5 w-3.5 text-amber-300" /> Aslen Ağrılı • İzmir'de Yaşıyor
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-white">21 Yaşında</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-red-600/30 border border-amber-400/40 px-3 py-1 text-amber-300">
                <Trophy className="h-3.5 w-3.5" /> Galatasaraylı
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold text-white">
              Merhaba, ben Muhammed Faruk Köçer.
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/80">
              Ağrı Dağı'nın gölgesinden çıkıp İstanbul'da otomasyon eğitimi almış, şimdi ise Ege'de teknolojinin tarımla buluştuğu modern seralarda sistemlerin kalbini yöneten 21 yaşında bir otomasyon teknikeriyim.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/75">
              Gündüzleri PLC panoları, sensör verileri ve SCADA ekranlarıyla uğraşırken; akşamları iyi bir filmin, derin sözlü alternatif rock parçalarının ya da Galatasaray maçlarının heyecanına kapılıyorum. Burası benim dijital çalışma masam ve kişisel arşivim.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="text-xs text-amber-300 font-semibold">Memleket</span>
              <h4 className="mt-1 font-bold text-white">Ağrı</h4>
              <p className="mt-1 text-xs text-white/65">
                Anadolu'nun zirvesi Ağrı Dağı'nın memleketinden gelen dayanıklılık ve samimiyet.
              </p>
            </div>
            <div className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-600/15 to-amber-500/15 p-4">
              <span className="text-xs text-amber-300 font-semibold">Tutku</span>
              <h4 className="mt-1 font-bold text-white">Galatasaray</h4>
              <p className="mt-1 text-xs text-white/65">
                Sarı-kırmızı renklere olan bağlılık; Avrupa geceleri ve bitmeyen heyecan.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="text-xs text-sky-300 font-semibold">Hedef</span>
              <h4 className="mt-1 font-bold text-white">Kendi Sistemlerini Kurmak</h4>
              <p className="mt-1 text-xs text-white/65">
                Endüstriyel otomasyon ve yazılımı birleştirerek özgün projeler üretmek.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // 8. BANA MESAJ BIRAK
    return (
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl border border-sky-400/25 bg-[#161923] p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white">Anonim Not Bırak</h3>
          <p className="mt-1.5 text-xs sm:text-sm text-white/70">
            İsim veya e-posta yazmak zorunda değilsin. Düşünceni, bir film/şarkı önerini ya da selamını doğrudan bana iletebilirsin.
          </p>

          {noteStatus === "sent" ? (
            <div className="mt-6 flex flex-col items-center rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
              <h4 className="mt-3 font-bold text-white">Mesajın Bana Ulaştı!</h4>
              <p className="mt-1 text-xs text-white/75">
                Notun doğrudan e-posta kutuma düştü. Teşekkürler!
              </p>
              <button
                onClick={() => setNoteStatus("idle")}
                className="mt-4 rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 cursor-pointer"
              >
                Yeni Mesaj Yaz
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendNote} className="mt-5 space-y-4">
              <textarea
                rows={5}
                required
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Buraya istediğin her şeyi yazabilirsin (tamamen anonim)..."
                className="w-full rounded-xl border border-white/15 bg-black/40 p-4 text-sm text-white placeholder-white/40 focus:border-sky-400 focus:outline-none"
              />

              {noteStatus === "error" && (
                <p className="text-xs text-rose-400">{noteErrorMsg}</p>
              )}

              <button
                type="submit"
                disabled={noteStatus === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-sky-400 disabled:opacity-50 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>{noteStatus === "sending" ? "Gönderiliyor..." : "Anonim Olarak Gönder"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden select-none text-white font-sans bg-[#14080d]">
      {/* Arka Plan Müzik Oynatıcısı (public/muzik.mp3) */}
      <audio ref={audioRef} src="/muzik.mp3" loop preload="auto" />

      {/* Sinematik Yılbaşı Açılış Ekranı */}
      <AnimatePresence>
        {!entered && <ChristmasIntroSplash onEnter={handleEnterSystem} />}
      </AnimatePresence>

      {/* Canlı Dalgalanan & Fare/Dokunuşa Duyarlı Arka Plan */}
      <div
        className="fixed inset-[-24px] bg-cover bg-center carpet-wave transition-transform duration-300 ease-out will-change-transform"
        style={{
          backgroundImage: `url('/bg.jpg'), radial-gradient(circle at 20% 20%, #4a121f 0%, #1a0b14 45%, #0c1324 100%)`,
          transform: `translate3d(${carpetOffset.x}px, ${carpetOffset.y}px, 0) scale(1.06)`,
        }}
      />

      {/* Gece / Gündüz Otomatik Atmosfer Katmanı */}
      <div
        className={`fixed inset-0 pointer-events-none transition-colors duration-700 ${
          isDayMode
            ? "bg-gradient-to-b from-amber-500/10 via-sky-900/20 to-black/35"
            : "bg-gradient-to-b from-[#040711]/65 via-black/50 to-black/70"
        }`}
      />

      {/* Masaüstü Arka Plan Kar Yağışı */}
      {entered && <SnowfallLayer count={26} zIndexClass="z-[5]" />}

      {/* Üst Sistem Durum Çubuğu */}
      <header
        className={`relative z-20 flex items-center justify-between px-4 sm:px-6 py-2.5 text-xs font-medium border-b transition-colors duration-500 ${
          isDayMode
            ? "bg-black/25 border-white/20 text-white backdrop-blur-md"
            : "bg-black/55 border-white/10 text-white/85 backdrop-blur-md"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/20 bg-white/10 shadow-inner">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="currentColor">
              <path d="M6 4h12v3H9.5v3.5H16v3H9.5V20H6V4z" />
            </svg>
          </div>
          <span className="tracking-tight font-semibold text-white">Faruk OS</span>
        </div>

        <div className="hidden sm:block text-white/80">{formattedDate}</div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Gece / Gündüz Modu Değiştirici */}
          <button
            onClick={() => {
              playClickSound(soundFx);
              setIsDayMode((prev) => !prev);
            }}
            title={isDayMode ? "Gece Moduna Geç" : "Gündüz Moduna Geç"}
            className="flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-amber-200 hover:bg-white/20 cursor-pointer"
          >
            {isDayMode ? <Sun className="h-3.5 w-3.5 text-amber-300" /> : <Moon className="h-3.5 w-3.5 text-sky-300" />}
            <span className="hidden md:inline">{isDayMode ? "Gündüz" : "Gece"}</span>
          </button>

          {/* Müzik Aç/Kapa Butonu */}
          <button
            onClick={toggleMusic}
            title={musicPlaying ? "Müziği Durdur" : "Müziği Çal"}
            className="flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-amber-200 hover:bg-white/20 cursor-pointer"
          >
            {musicPlaying ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{musicPlaying ? "Çalıyor" : "Sessiz"}</span>
          </button>

          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4" />
          <span className="font-semibold text-white">{formattedTime}</span>
        </div>
      </header>

      {/* Ana Masaüstü Alanı */}
      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-52px)] max-w-5xl flex-col justify-between px-4 py-5 sm:px-10">
        {/* Üstte İnteraktif Yılbaşı Çam Ağacı & 2027 Dilek Kartı */}
        <DesktopChristmasWidget isDayMode={isDayMode} />

        {/* Klasör Izgarası */}
        <div className="my-auto py-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {FOLDERS.map((folder) => {
              const Icon = folder.icon;
              return (
                <button
                  key={folder.id}
                  onClick={() => openFolder(folder)}
                  className={`group flex flex-col items-center rounded-3xl border p-4 shadow-lg transition-transform duration-150 hover:-translate-y-1 active:scale-95 cursor-pointer ${
                    isDayMode
                      ? "border-white/25 bg-black/35 hover:bg-black/50"
                      : "border-white/15 bg-black/50 hover:bg-black/65"
                  }`}
                >
                  <div
                    className={`flex h-13 w-13 sm:h-15 sm:w-15 items-center justify-center rounded-2xl bg-gradient-to-br ${folder.accent} border border-white/20`}
                  >
                    <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${folder.iconColor}`} />
                  </div>
                  <span className="mt-2.5 text-sm font-semibold tracking-wide text-white">
                    {folder.title}
                  </span>
                  <span className="mt-0.5 text-[11px] text-white/70 text-center leading-tight">
                    {folder.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Alt Hızlı Erişim Çubuğu */}
        <div className="mx-auto flex items-center gap-3 rounded-3xl border border-white/20 bg-black/55 px-4 py-2 shadow-2xl">
          {FOLDERS.filter((f) =>
            ["kurabiye", "oyun", "muzikler", "mesaj"].includes(f.id)
          ).map((folder) => {
            const Icon = folder.icon;
            return (
              <button
                key={`dock-${folder.id}`}
                onClick={() => openFolder(folder)}
                title={folder.title}
                className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${folder.accent} border border-white/20 transition-transform hover:-translate-y-1.5 hover:scale-110 active:scale-90 cursor-pointer`}
              >
                <Icon className={`h-5 w-5 ${folder.iconColor}`} />
              </button>
            );
          })}
        </div>
      </main>

      {/* Tam Ekran Açılan Klasör Penceresi */}
      <AnimatePresence>
        {activeFolder && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-30 flex items-center justify-center bg-black/75 p-0 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className="flex h-full w-full max-w-5xl flex-col overflow-hidden sm:rounded-3xl border border-white/20 bg-[#11131a] shadow-2xl"
            >
              {/* Üst Bar */}
              <div className="flex items-center justify-between border-b border-white/15 bg-white/5 px-5 py-3.5">
                <button
                  onClick={closeFolder}
                  className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-white/20 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Masaüstü</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <activeFolder.icon className={`h-5 w-5 ${activeFolder.iconColor}`} />
                  <h2 className="text-lg font-bold tracking-wide">{activeFolder.title}</h2>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={closeFolder}
                    className="h-3.5 w-3.5 rounded-full bg-rose-500 hover:bg-rose-400 cursor-pointer"
                    title="Kapat"
                  />
                  <span className="h-3.5 w-3.5 rounded-full bg-amber-400/70" />
                  <span className="h-3.5 w-3.5 rounded-full bg-emerald-400/70" />
                </div>
              </div>

              {/* Alt Sekmeler */}
              {activeFolder.tabs.length > 1 && (
                <div className="flex gap-2 overflow-x-auto border-b border-white/10 bg-black/30 px-5 py-2.5">
                  {activeFolder.tabs.map((tab, idx) => (
                    <button
                      key={tab}
                      onClick={() => {
                        playClickSound(soundFx);
                        setActiveTab(idx);
                      }}
                      className={`rounded-xl px-4 py-1.5 text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                        activeTab === idx
                          ? "bg-white/15 text-white border border-white/20"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              )}

              {/* Dinamik İçerik Alanı */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-8">{renderFolderContent()}</div>

              {/* Mobil Alt Çubuk */}
              <div className="sm:hidden flex justify-center py-3 bg-black/40 border-t border-white/10">
                <button
                  onClick={closeFolder}
                  className="h-1.5 w-32 rounded-full bg-white/40 active:bg-white"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}