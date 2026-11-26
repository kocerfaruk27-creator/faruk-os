import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import Matter from "matter-js";
import { Terminal as XTerm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { Howl } from "howler";
import Lenis from "lenis";
import gsap from "gsap";
import {
  Briefcase,
  Music,
  Film,
  Tv,
  User,
  MessageSquare,
  Hourglass,
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
  Wrench,
  Sparkles,
  Cookie,
  Gamepad2,
  Sun,
  Moon,
  Mail,
  Copy,
  Check,
  Search,
  Radio,
  Compass,
  Terminal,
  Heart,
  Shuffle,
  Command,
  Orbit,
  HelpCircle,
  RotateCcw,
} from "lucide-react";

const FORMSPREE_URL = "https://formspree.io/f/xnpdpzwg";

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
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {}
};

const FOLDERS = [
  {
    id: "kariyer",
    title: "Kariyer",
    subtitle: "Otomasyon & SCADA",
    icon: Briefcase,
    accent: "from-amber-400/20 to-orange-500/5",
    iconColor: "text-amber-300",
    tabs: ["Genel Bakış", "Deneyim & Eğitim", "Teknik Yetkinlikler"],
  },
  {
    id: "projelerim",
    title: "Projelerim",
    subtitle: "Yakında Gelecekler",
    icon: Hourglass,
    accent: "from-cyan-400/20 to-blue-500/5",
    iconColor: "text-cyan-300",
    tabs: ["Gelişim Aşamasında"],
  },
  {
    id: "muzikler",
    title: "Müziklerim",
    subtitle: "Favori Sanatçılar",
    icon: Music,
    accent: "from-rose-400/20 to-red-500/5",
    iconColor: "text-rose-300",
    tabs: ["Favori Gruplar & Sanatçılar"],
  },
  {
    id: "diziler",
    title: "Dizilerim",
    subtitle: "İz Bırakanlar",
    icon: Tv,
    accent: "from-emerald-400/20 to-teal-500/5",
    iconColor: "text-emerald-300",
    tabs: ["Kült Diziler"],
  },
  {
    id: "filmler",
    title: "Filmlerim",
    subtitle: "Sinema Akışı",
    icon: Film,
    accent: "from-indigo-400/20 to-blue-500/5",
    iconColor: "text-indigo-300",
    tabs: ["Film Akışı"],
  },
  {
    id: "hakkimda",
    title: "Hakkımda",
    subtitle: "Ağrı, İzmir & GS",
    icon: User,
    accent: "from-red-500/20 to-amber-400/5",
    iconColor: "text-amber-300",
    tabs: ["Ben Kimim?"],
  },
  {
    id: "mesaj",
    title: "Mesaj Bırak",
    subtitle: "Anonim Not Defteri",
    icon: MessageSquare,
    accent: "from-sky-400/20 to-cyan-500/5",
    iconColor: "text-sky-300",
    tabs: ["Bana Yaz"],
  },
  {
    id: "kelime",
    title: "Kelime Oyunu",
    subtitle: "6 Hak • 5 Harf",
    icon: Gamepad2,
    accent: "from-violet-400/20 to-fuchsia-500/5",
    iconColor: "text-violet-300",
    tabs: ["Günün Kelimesi"],
  },
  {
    id: "terminal",
    title: "Terminal",
    subtitle: "Faruk Shell v3.1",
    icon: Terminal,
    accent: "from-lime-400/20 to-emerald-500/5",
    iconColor: "text-lime-300",
    tabs: ["Komut Satırı"],
  },
];

const DESKTOP_ITEMS = [
  ...FOLDERS,
  {
    id: "yercekimi",
    title: "Yerçekimi",
    subtitle: "2D Fizik Modu",
    icon: Orbit,
    accent: "from-amber-300/25 to-rose-500/10",
    iconColor: "text-amber-200",
    isGravityAction: true,
    tabs: [],
  },
];

const FOLDER_THEMES = {
  kariyer: {
    bg: "linear-gradient(145deg, #0b1118 0%, #19150d 52%, #0c131c 100%)",
    border: "rgba(251, 191, 36, 0.38)",
    glow: "radial-gradient(circle at 84% 16%, rgba(245, 158, 11, 0.17), transparent 48%), radial-gradient(circle at 16% 84%, rgba(56, 189, 248, 0.11), transparent 45%)",
    headerBg: "rgba(10, 14, 20, 0.78)",
  },
  projelerim: {
    bg: "linear-gradient(145deg, #07131a 0%, #0b202b 52%, #08151e 100%)",
    border: "rgba(34, 211, 238, 0.38)",
    glow: "radial-gradient(circle at 82% 18%, rgba(34, 211, 238, 0.17), transparent 48%), radial-gradient(circle at 18% 82%, rgba(59, 130, 246, 0.12), transparent 45%)",
    headerBg: "rgba(7, 17, 24, 0.78)",
  },
  muzikler: {
    bg: "linear-gradient(145deg, #170910 0%, #260e1a 52%, #130912 100%)",
    border: "rgba(251, 113, 133, 0.38)",
    glow: "radial-gradient(circle at 85% 15%, rgba(244, 63, 94, 0.18), transparent 48%), radial-gradient(circle at 15% 85%, rgba(251, 191, 36, 0.10), transparent 45%)",
    headerBg: "rgba(20, 8, 15, 0.78)",
  },
  diziler: {
    bg: "linear-gradient(145deg, #071512 0%, #0d241d 52%, #081613 100%)",
    border: "rgba(52, 211, 153, 0.38)",
    glow: "radial-gradient(circle at 85% 15%, rgba(16, 185, 129, 0.17), transparent 48%), radial-gradient(circle at 15% 85%, rgba(20, 184, 166, 0.11), transparent 45%)",
    headerBg: "rgba(7, 19, 16, 0.78)",
  },
  filmler: {
    bg: "linear-gradient(145deg, #090c1b 0%, #141833 52%, #0a0d1c 100%)",
    border: "rgba(129, 140, 248, 0.38)",
    glow: "radial-gradient(circle at 85% 15%, rgba(99, 102, 241, 0.18), transparent 48%), radial-gradient(circle at 15% 85%, rgba(232, 121, 249, 0.10), transparent 45%)",
    headerBg: "rgba(9, 12, 26, 0.78)",
  },
  hakkimda: {
    bg: "linear-gradient(145deg, #190b0d 0%, #23170b 52%, #140c10 100%)",
    border: "rgba(251, 191, 36, 0.38)",
    glow: "radial-gradient(circle at 85% 15%, rgba(239, 68, 68, 0.17), transparent 48%), radial-gradient(circle at 15% 85%, rgba(245, 158, 11, 0.14), transparent 45%)",
    headerBg: "rgba(22, 10, 12, 0.78)",
  },
  mesaj: {
    bg: "linear-gradient(145deg, #08121d 0%, #0f2033 52%, #09131f 100%)",
    border: "rgba(56, 189, 248, 0.38)",
    glow: "radial-gradient(circle at 85% 15%, rgba(14, 165, 233, 0.17), transparent 48%), radial-gradient(circle at 15% 85%, rgba(99, 102, 241, 0.11), transparent 45%)",
    headerBg: "rgba(8, 17, 28, 0.78)",
  },
  kelime: {
    bg: "linear-gradient(145deg, #120a1f 0%, #201236 52%, #11091c 100%)",
    border: "rgba(192, 132, 252, 0.38)",
    glow: "radial-gradient(circle at 85% 15%, rgba(168, 85, 247, 0.18), transparent 48%), radial-gradient(circle at 15% 85%, rgba(236, 72, 153, 0.11), transparent 45%)",
    headerBg: "rgba(17, 9, 29, 0.78)",
  },
  terminal: {
    bg: "linear-gradient(145deg, #050a08 0%, #091611 52%, #040907 100%)",
    border: "rgba(74, 222, 128, 0.38)",
    glow: "radial-gradient(circle at 85% 15%, rgba(34, 197, 94, 0.16), transparent 48%), radial-gradient(circle at 15% 85%, rgba(16, 185, 129, 0.10), transparent 45%)",
    headerBg: "rgba(4, 10, 8, 0.85)",
  },
};

const FolderThemeBackdrop = ({ folderId }) => {
  const theme = FOLDER_THEMES[folderId] || FOLDER_THEMES.kariyer;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: theme.glow }} />

      {folderId === "kariyer" && (
        <svg className="h-full w-full opacity-[0.11]" viewBox="0 0 1000 700" fill="none">
          <g stroke="#fbbf24" strokeWidth="2">
            <circle cx="840" cy="140" r="58" strokeDasharray="10 8" />
            <circle cx="840" cy="140" r="32" />
            <circle cx="840" cy="140" r="10" />
            <path d="M840 65v17M840 198v17M765 140h17M898 140h17M787 87l12 12M881 181l12 12M893 87l-12 12M799 181l-12 12" />
            <path d="M60 120h140l40 40h110" />
            <circle cx="350" cy="160" r="6" fill="#fbbf24" />
            <path d="M80 560h180l35-35h130l30 30h140" />
            <circle cx="605" cy="555" r="6" fill="#fbbf24" />
            <path d="M680 520q25-45 50 0t50 0t50 0t50 0" stroke="#38bdf8" strokeWidth="2.5" />
          </g>
        </svg>
      )}

      {folderId === "projelerim" && (
        <svg className="h-full w-full opacity-[0.11]" viewBox="0 0 1000 700" fill="none">
          <defs>
            <pattern id="bp-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" stroke="#22d3ee" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="1000" height="700" fill="url(#bp-grid)" opacity="0.55" />
          <g stroke="#22d3ee" strokeWidth="2">
            <rect x="760" y="95" width="110" height="110" rx="16" />
            <rect x="785" y="120" width="60" height="60" rx="8" />
            <path d="M785 75v20M815 75v20M845 75v20M785 205v20M815 205v20M845 205v20M740 125h20M740 150h20M740 175h20M870 125h20M870 150h20M870 175h20" />
            <circle cx="150" cy="540" r="14" />
            <circle cx="260" cy="490" r="10" />
            <circle cx="240" cy="600" r="10" />
            <path d="M163 534l88-39M162 548l69 46" />
          </g>
        </svg>
      )}

      {folderId === "muzikler" && (
        <svg className="h-full w-full opacity-[0.12]" viewBox="0 0 1000 700" fill="none">
          <g stroke="#fb7185" strokeWidth="2">
            <circle cx="850" cy="150" r="115" />
            <circle cx="850" cy="150" r="92" strokeDasharray="18 10" />
            <circle cx="850" cy="150" r="68" />
            <circle cx="850" cy="150" r="44" strokeDasharray="12 8" />
            <circle cx="850" cy="150" r="18" fill="#fb7185" fillOpacity="0.35" />
            <path d="M130 570v-85l55-15v85" strokeWidth="3" />
            <circle cx="116" cy="572" r="14" fill="#fb7185" />
            <circle cx="171" cy="557" r="14" fill="#fb7185" />
            <path d="M260 590v-50M280 590v-90M300 590v-65M320 590v-110M340 590v-45M360 590v-75" strokeWidth="4" strokeLinecap="round" />
          </g>
        </svg>
      )}

      {folderId === "diziler" && (
        <svg className="h-full w-full opacity-[0.11]" viewBox="0 0 1000 700" fill="none">
          <g stroke="#34d399" strokeWidth="2.2">
            <rect x="750" y="105" width="150" height="105" rx="18" />
            <rect x="766" y="121" width="96" height="73" rx="10" />
            <circle cx="881" cy="140" r="7" />
            <circle cx="881" cy="166" r="7" />
            <path d="M795 75l30 30M855 75l-30 30" />
            <path d="M110 540c35-35 85-35 120 0M130 562c24-24 56-24 80 0M152 584c12-12 24-12 36 0" strokeLinecap="round" />
            <circle cx="170" cy="602" r="5" fill="#34d399" />
          </g>
        </svg>
      )}

      {folderId === "filmler" && (
        <svg className="h-full w-full opacity-[0.11]" viewBox="0 0 1000 700" fill="none">
          <g stroke="#818cf8" strokeWidth="2">
            <rect x="36" y="0" width="54" height="700" />
            {Array.from({ length: 14 }, (_, i) => (
              <rect key={i} x="48" y={18 + i * 50} width="30" height="22" rx="4" />
            ))}
            <circle cx="845" cy="145" r="88" />
            <circle cx="845" cy="145" r="16" />
            <circle cx="845" cy="100" r="15" />
            <circle cx="845" cy="190" r="15" />
            <circle cx="800" cy="145" r="15" />
            <circle cx="890" cy="145" r="15" />
          </g>
        </svg>
      )}

      {folderId === "hakkimda" && (
        <svg className="h-full w-full opacity-[0.12]" viewBox="0 0 1000 700" fill="none">
          <g stroke="#fbbf24" strokeWidth="2.2">
            <path d="M60 620L230 430l95 105 110-145 185 230" strokeLinejoin="round" />
            <path d="M202 462l28 16 26-14M404 432l31 18 32-16" stroke="#f87171" />
            <path d="M650 560q35-20 70 0t70 0t70 0t70 0" />
            <path d="M650 590q35-20 70 0t70 0t70 0t70 0" />
            <polygon points="840,85 849,108 874,108 854,122 862,145 840,131 818,145 826,122 806,108 831,108" />
          </g>
        </svg>
      )}

      {folderId === "mesaj" && (
        <svg className="h-full w-full opacity-[0.11]" viewBox="0 0 1000 700" fill="none">
          <g stroke="#38bdf8" strokeWidth="2">
            <path d="M890 95L750 155l52 22 88-82-62 94 42 20 20-114z" strokeLinejoin="round" />
            <path d="M620 230c45-20 85-15 125-38" strokeDasharray="7 7" />
            <rect x="90" y="490" width="160" height="110" rx="14" />
            <path d="M90 505l80 55 80-55" />
          </g>
        </svg>
      )}

      {folderId === "kelime" && (
        <svg className="h-full w-full opacity-[0.11]" viewBox="0 0 1000 700" fill="none">
          <g stroke="#c084fc" strokeWidth="2">
            <rect x="770" y="90" width="54" height="54" rx="10" />
            <rect x="834" y="90" width="54" height="54" rx="10" />
            <rect x="770" y="154" width="54" height="54" rx="10" />
            <rect x="834" y="154" width="54" height="54" rx="10" fill="#c084fc" fillOpacity="0.2" />
            <text x="789" y="125" fill="#c084fc" fontSize="24" fontWeight="bold">F</text>
            <text x="851" y="125" fill="#c084fc" fontSize="24" fontWeight="bold">K</text>
            <text x="788" y="189" fill="#c084fc" fontSize="24" fontWeight="bold">O</text>
            <text x="852" y="189" fill="#c084fc" fontSize="24" fontWeight="bold">S</text>
            <rect x="100" y="510" width="48" height="48" rx="8" />
            <rect x="156" y="510" width="48" height="48" rx="8" />
            <rect x="100" y="566" width="48" height="48" rx="8" />
          </g>
        </svg>
      )}
    </div>
  );
};

const MUSIC_DATA = [
  {
    artist: "Adamlar",
    image: "/images/adamlar.jpg",
    category: "Yerli",
    genre: "Türkçe Alternatif Rock",
    vibe: "Sözleri direkt, ritmi sert. Gece vardiyalarının ve uzun yolların vazgeçilmezi.",
    songs: ["Sarılırım Birine", "Koca Yaşlı Şişko Dünya", "Acının İlacı", "Zombi"],
  },
  {
    artist: "Gorillaz",
    image: "/images/gorillaz.jpg",
    category: "Yabancı",
    genre: "Alternatif / Elektronik / Trip-Hop",
    vibe: "Bas yürüyüşleri, karanlık atmosferi ve türler arası geçişleriyle bambaşka bir kafa.",
    songs: ["Feel Good Inc.", "Clint Eastwood", "On Melancholy Hill", "Rhinestone Eyes"],
  },
  {
    artist: "Tame Impala",
    image: "/images/tame-impala.jpg",
    category: "Yabancı",
    genre: "Psychedelic Pop / Rock",
    vibe: "Gece kulaklığı takıp yürürken zamanı yavaşlatan synth ve davul tonları.",
    songs: ["The Less I Know The Better", "Let It Happen", "Borderline", "New Person, Same Old Mistakes"],
  },
  {
    artist: "Mor ve Ötesi",
    image: "/images/mor-ve-otesi.jpg",
    category: "Yerli",
    genre: "Türkçe Rock",
    vibe: "Yıllar geçse de eskimeyen sözler, sağlam gitar riffleri ve sahne enerjisi.",
    songs: ["Cambaz", "Bir Derdim Var", "Oyunbozan", "Sevda Çiçeği"],
  },
  {
    artist: "Cem Karaca",
    image: "/images/cem-karaca.jpg",
    category: "Yerli",
    genre: "Anadolu Rock",
    vibe: "Sesiyle tüyleri diken diken eden, memleketin en güçlü rock efsanelerinden.",
    songs: ["Tamirci Çırağı", "Resimdeki Gözyaşları", "Namus Belası", "Ceviz Ağacı"],
  },
  {
    artist: "Barış Manço",
    image: "/images/baris-manco.jpg",
    category: "Yerli",
    genre: "Anadolu Rock / Psychedelic",
    vibe: "Her şarkısında ayrı bir hikâye, ayrı bir bilgelik ve sıcak bir samimiyet var.",
    songs: ["Gülpembe", "Dönence", "Dağlar Dağlar", "Halhal"],
  },
  {
    artist: "Erkin Koray",
    image: "/images/erkin-koray.jpg",
    category: "Yerli",
    genre: "Anadolu Rock / Saykodelik",
    vibe: "Elektro bağlaması ve tavizsiz tarzıyla bu topraklarda rock müziğin temel taşı.",
    songs: ["Fesuphanallah", "Öyle Bir Geçer Zaman Ki", "Çöpçüler", "Sevince"],
  },
  {
    artist: "Gazapizm",
    image: "/images/gazapizm.jpg",
    category: "Yerli",
    genre: "Türkçe Rap / Hip-Hop",
    vibe: "Sokağın gerçeğini filtresiz anlatan kalem ve kemik gibi altyapılar.",
    songs: ["Heyecanı Yok", "Unutulacak Dünler", "Ölüler Dirilerden Çalacak", "Memleketsiz"],
  },
  {
    artist: "Kayra",
    image: "/images/kayra.jpg",
    category: "Yerli",
    genre: "Hikâyeci Rap / Lo-Fi",
    vibe: "Eski kaset kokusu, yağmurlu akşamlar ve insanın içine işleyen gerçekçi hikâyeler.",
    songs: ["Mesela Yani", "Dobro Vecer", "Tutmayan Kuponlarım Var", "Muhterem Hayalet"],
  },
  {
    artist: "Ari Barokas",
    image: "/images/ari-barokas.jpg",
    category: "Yerli",
    genre: "Alternatif Rock",
    vibe: "Yalın, melankolik ve abartısız; gece geç saatlerde tek başına dinlemelik.",
    songs: ["Yaşıyorum Sil Baştan", "Eflatun", "Gavur", "Yalnızlık"],
  },
  {
    artist: "Son Feci Bisiklet",
    image: "/images/son-feci-bisiklet.jpg",
    category: "Yerli",
    genre: "Indie Rock / Alternatif",
    vibe: "Hem dingin hem huzursuz; kendine has vokaliyle hemen modunu yakalıyor.",
    songs: ["Bu Kız", "Bikinisinde Astronomi", "Uzaydan Geldiğine Göre Yorgun Olmalısın", "Pazar ve Ertesi"],
  },
  {
    artist: "Yaşlı Amca",
    image: "/images/yasli-amca.jpg",
    category: "Yerli",
    genre: "Indie Rock / Alternatif",
    vibe: "Sakin başlayan ama nakaratta içine çeken, samimi Ankara akşamları havası.",
    songs: ["Giderdi Hoşuma", "Ve Ben", "Yıldızlara Bak", "İstanbul Beyefendisi"],
  },
  {
    artist: "Dolu Kadehi Ters Tut",
    image: "/images/dktt.jpg",
    category: "Yerli",
    genre: "Alternatif Rock / Indie Pop",
    vibe: "Bazen enerjik bazen ağır melankolik; o günkü moduma göre mutlaka bir karşılığı var.",
    songs: ["Yapma N'olursun", "Madem", "Gitme", "Neyin Var?"],
  },
  {
    artist: "Turkodi Roma",
    image: "/images/turkodi.jpg",
    category: "Yerli",
    genre: "Alternatif / Indie",
    vibe: "Kafayı boşaltmak istediğim anlarda açtığım, kendine has dingin bir atmosfer.",
    songs: ["Seninle", "Gece Yarısı", "Uzaklarda"],
  },
  {
    artist: "Sattas",
    image: "/images/sattas.jpg",
    category: "Yerli",
    genre: "Reggae / Dub",
    vibe: "Stresi sıfırlayan baslar ve Ege güneşini hatırlatan rahatlatıcı ritimler.",
    songs: ["Ne Kaldı", "War Is Over", "Bir Ben Miyim", "Slowly"],
  },
  {
    artist: "Mansur Ark",
    image: "/images/mansur-ark.jpg",
    category: "Yerli",
    genre: "Türkçe Pop / Dance",
    vibe: "90'lar ve 2000'lerin enerjisini taşıyan, duyunca istemsizce mod yükselten klasikler.",
    songs: ["Maalesef", "Sana Demedim Mi", "Gazla Gitsin", "Yarim"],
  },
  {
    artist: "Göksel",
    image: "/images/goksel.jpg",
    category: "Yerli",
    genre: "Türkçe Pop / Retro",
    vibe: "Retro dokunuşlu düzenlemeler ve nostaljik Yeşilçam tadında güçlü bir ses.",
    songs: ["Depresyondayım", "Acıyor", "Sabır", "Benden Geçti Aşk"],
  },
  {
    artist: "Kalben",
    image: "/images/kalben.jpg",
    category: "Yerli",
    genre: "Indie / Akustik",
    vibe: "İçten, filtresiz ve doğrudan kalbe dokunan akustik tınılar.",
    songs: ["Sadece", "Saçlar", "Haydi Söyle", "Yara"],
  },
  {
    artist: "Kreş",
    image: "/images/kres.jpg",
    category: "Yerli",
    genre: "Alternatif Rock",
    vibe: "2000'ler Türkçe rock döneminin enerjik ve kendine özgü gruplarından.",
    songs: ["Yarım Kalan Şarap", "Zaman Yok", "Benimle Uçmak İster Misin"],
  },
  {
    artist: "Yaşar",
    image: "/images/yasar.jpg",
    category: "Yerli",
    genre: "Türkçe Pop / Akustik",
    vibe: "Akdeniz akşamları hissiyatı veren, sıcak ve zamansız şarkılar.",
    songs: ["Kumralım", "Divane", "Kör Bıçak", "Birtanem"],
  },
  {
    artist: "Yalın",
    image: "/images/yalin.jpg",
    category: "Yerli",
    genre: "Türkçe Pop",
    vibe: "Yıllardır çizgisini bozmayan, yalın ve akılda kalıcı melodiler.",
    songs: ["Zalim", "Küçücüğüm", "Ki Sen", "Cumhuriyet"],
  },
  {
    artist: "Can Bonomo",
    image: "/images/can-bonomo.jpg",
    category: "Yerli",
    genre: "Alternatif / Indie Pop",
    vibe: "Edebi göndermeleri, neşeli ritimleri ve özgün tarzıyla keyifli bir dinleti.",
    songs: ["Meczup", "Bana Bir Saz Verin", "Dem", "Tastamam"],
  },
  {
    artist: "Manifest",
    image: "/images/manifest.jpg",
    category: "Yerli",
    genre: "Pop / R&B",
    vibe: "Modern prodüksiyon, yüksek tempo ve akıcı vokaller.",
    songs: ["Zamansızdık", "Arıyo", "KTS"],
  },
  {
    artist: "Arctic Monkeys",
    image: "/images/arctic-monkeys.jpg",
    category: "Yabancı",
    genre: "Indie Rock / Garage Rock",
    vibe: "Gece araba sürerken veya kahve eşliğinde açılan keskin gitar tonları.",
    songs: ["Do I Wanna Know?", "505", "R U Mine?", "Fluorescent Adolescent"],
  },
  {
    artist: "Radiohead",
    image: "/images/radiohead.jpg",
    category: "Yabancı",
    genre: "Alternatif Rock / Art Rock",
    vibe: "Derin, katmanlı ve her dinleyişte yeni bir detay yakalatan başyapıtlar.",
    songs: ["Creep", "No Surprises", "Karma Police", "Exit Music (For A Film)"],
  },
  {
    artist: "Pink Floyd",
    image: "/images/pink-floyd.jpg",
    category: "Yabancı",
    genre: "Progressive Rock",
    vibe: "Gözleri kapatıp uzun gitar sololarında kaybolmak için tartışmasız zirve.",
    songs: ["Comfortably Numb", "Wish You Were Here", "Time", "Shine On You Crazy Diamond"],
  },
  {
    artist: "Daft Punk",
    image: "/images/daft-punk.jpg",
    category: "Yabancı",
    genre: "Elektronik / French House",
    vibe: "Odaklanırken ya da gece geç saatlerde ritim ararken açılan kusursuz elektronik sesler.",
    songs: ["Instant Crush", "Get Lucky", "Veridis Quo", "Around the World"],
  },
  {
    artist: "Kavinsky",
    image: "/images/kavinsky.jpg",
    category: "Yabancı",
    genre: "Synthwave / Outrun",
    vibe: "Drive filminin gece ışıklarını ve boş otoyol hissini doğrudan kulaklığa taşıyor.",
    songs: ["Nightcall", "Odd Look", "Pacific Coast Highway", "Roadgame"],
  },
  {
    artist: "The Strokes",
    image: "/images/the-strokes.jpg",
    category: "Yabancı",
    genre: "Indie Rock / Post-Punk Revival",
    vibe: "Rahat, çabasız ama enerjisi hep yerinde duran temiz rock şarkıları.",
    songs: ["The Adults Are Talking", "Reptilia", "Last Nite", "Someday"],
  },
];

const SERIES_DATA = [
  {
    title: "LOST",
    image: "/images/jack.jpg",
    tag: "Jack Shephard",
    quote: "Geri dönmek zorundayız, Kate!",
    note: "Gizem kurgusu, karakter derinliği ve kader-özgür irade çatışmasıyla televizyon tarihinin zirvelerinden.",
    gradient: "from-emerald-950/60 to-slate-900/60",
  },
  {
    title: "Game of Thrones",
    image: "/images/got.jpg",
    tag: "Jon Snow • Gece Nöbeti",
    quote: "İçindeki çocuğu öldür, Jon Snow. Kış neredeyse geldi. Çocuğu öldür ki adam doğsun.",
    note: "Güç dengeleri, sert politik gerçekçilik ve epik atmosferiyle benzersiz bir evren.",
    gradient: "from-slate-900/60 to-zinc-900/60",
  },
  {
    title: "Gibi",
    image: "/images/gibi.jpg",
    tag: "Yılmaz • İlkkan • Ersoy",
    quote: "Senin hiçbir şeyden haberin yok, bu kadar bilgisiz olup bu kadar fikrin olması inanılmaz.",
    note: "Gündelik hayatın absürtlüğünü sıfır zorlama ile mizaha dönüştüren modern klasik.",
    gradient: "from-amber-950/60 to-stone-900/60",
  },
  {
    title: "Shōgun",
    image: "/images/shogun.jpg",
    tag: "Lord Toranaga",
    quote: "Rüzgarı kontrol edemezsin ama yelkenini ona göre ayarlayabilirsin.",
    note: "Sabır, diplomasi ve feodal Japonya atmosferini kusursuz sinematografiyle birleştiren başyapıt.",
    gradient: "from-red-950/60 to-neutral-900/60",
  },
  {
    title: "Banshee",
    image: "/images/banshee.jpg",
    tag: "Lucas Hood",
    quote: "Geçmişin peşini bırakmaz, sadece ne kadar uzağa koşabileceğini test eder.",
    note: "Yüksek tansiyonlu aksiyon koreografileri ve tavizsiz karakterleriyle saf adrenalin.",
    gradient: "from-sky-950/60 to-slate-900/60",
  },
  {
    title: "The Penguin",
    image: "/images/penguin.jpg",
    tag: "Oz Cobb",
    quote: "Kimse sana hak ettiğini vermez, gidip kendin söküp alırsın.",
    note: "Gotham'ın yeraltı dünyasında geçen karanlık, sert ve oyunculuk dersi niteliğinde bir yükseliş hikayesi.",
    gradient: "from-purple-950/60 to-neutral-950/60",
  },
  {
    title: "True Detective",
    image: "/images/true-detective.jpg",
    tag: "Rust Cohle",
    quote: "Zaman düz bir çemberdir. Yaptığımız ve yapacağımız her şeyi tekrar tekrar yapacağız.",
    note: "Kasvetli güney gotiği atmosferi ve varoluşsal diyaloglarıyla polisiye türünün zirvesi.",
    gradient: "from-teal-950/60 to-stone-950/60",
  },
  {
    title: "Moon Knight",
    image: "/images/moonknight.jpg",
    tag: "Marc Spector / Steven Grant",
    quote: "Karanlıkla savaşmak için bazen kendi içindeki kaosu kabul etmen gerekir.",
    note: "Psikolojik gerilim ile mitolojik gizemi birleştiren karanlık anlatım.",
    gradient: "from-indigo-950/60 to-slate-950/60",
  },
];

const MOVIES_DATA = [
  {
    title: "The Lighthouse (2019)",
    image: "/images/lighthouse.jpg",
    tag: "Robert Eggers • Psikolojik Korku",
    quote: "Neden ağzından baklayı çıkardın, Tommy?",
    note: "35mm siyah-beyaz formatı, klostrofobik deniz feneri atmosferi ve mitolojik delilik sarmalıyla hipnotik bir sinema deneyimi.",
    gradient: "from-zinc-900/60 to-slate-950/60",
  },
  {
    title: "Drive (2011)",
    image: "/images/drive.jpg",
    tag: "Nicolas Winding Refn • Neo-Noir",
    quote: "Bu şehirde yüz bin tane sokak var. Güzergâhı bilmene gerek yok.",
    note: "Synthwave müzikleri, neon gece ışıkları ve sessizliğin içindeki ani şiddet patlamalarıyla modern bir neo-noir ikonu.",
    gradient: "from-fuchsia-950/60 to-slate-950/60",
  },
  {
    title: "The Fall (2006)",
    image: "/images/the-fall.jpg",
    tag: "Tarsem Singh • Görsel Şölen",
    quote: "Ruhumu kurtarmaya mı çalışıyorsun?",
    note: "Hiç CGI kullanılmadan dünyanın 20'den fazla ülkesinde çekilen, her karesi yağlı boya tablosu gibi duran görsel başyapıt.",
    gradient: "from-amber-950/60 to-red-950/60",
  },
  {
    title: "Bullet Train (2022)",
    image: "/images/bullet-train.jpg",
    tag: "David Leitch • Aksiyon / Kara Mizah",
    quote: "Hayatta tesadüf diye bir şey yoktur, her şey birbirine bağlıdır.",
    note: "Hızlı kurgusu, stilize dövüş sahneleri ve keskin diyaloglarıyla baştan sona temposu düşmeyen yüksek enerjili anlatım.",
    gradient: "from-rose-950/60 to-purple-950/60",
  },
  {
    title: "Project Hail Mary (2026)",
    image: "/images/project-hail-mary.jpg",
    tag: "Phil Lord & Christopher Miller • Bilim Kurgu",
    quote: "Dış hücre zarını nanometre ölçeğinde bir sondayla deldim!",
    note: "Güneş'in sönmesini engellemek için ışık yılları ötesine gönderilen bir astronotun bilim ve zekayla örülü uzay destanı.",
    gradient: "from-sky-950/60 to-indigo-950/60",
  },
  {
    title: "Hamnet (2025)",
    image: "/images/hamnet.jpg",
    tag: "Chloé Zhao • Tarihi Dram",
    quote: "Gerisi sessizlik.",
    note: "William Shakespeare'in oğlunun kaybı ve bu derin yasın ölümsüz Hamlet tragedyasına dönüşümünü şiirsel bir dille işleyen yapım.",
    gradient: "from-emerald-950/60 to-stone-950/60",
  },
  {
    title: "Gladiator (2000)",
    image: "/images/gladiator.jpg",
    tag: "Ridley Scott • Epik Tarih",
    quote: "Hayatta yaptıklarımız, sonsuzlukta yankılanır.",
    note: "Hans Zimmer'in unutulmaz müzikleri, Roma arenalarının ihtişamı ve onur mücadelesiyle sinema tarihinin en görkemli epiklerinden.",
    gradient: "from-amber-950/60 to-neutral-950/60",
  },
  {
    title: "I Swear (2025)",
    image: "/images/i-swear.jpg",
    tag: "Kirk Jones • Biyografik Dram",
    quote: "Kelimeler her zaman izin istemez.",
    note: "Tourette sendromu aktivisti John Davidson'ın gerçek yaşam öyküsünü mizah ve sarsıcı bir gerçekçilikle beyaz perdeye taşıyan yapım.",
    gradient: "from-teal-950/60 to-slate-950/60",
  },
  {
    title: "Baby Driver (2017)",
    image: "/images/baby-driver.jpg",
    tag: "Edgar Wright • Suç / Müzikal Ritim",
    quote: "Yavaş mıydı?",
    note: "Silah seslerinden araba viteslerine kadar her hareketin kulaklıktaki şarkıların ritmine milimetrik senkronlandığı kurgu harikası.",
    gradient: "from-red-950/60 to-zinc-950/60",
  },
  {
    title: "Jason Bourne (2002–2016)",
    image: "/images/jason-bourne.jpg",
    tag: "Paul Greengrass • Casusluk / Gerilim",
    quote: "Şuna bak. Sana neler feda ettirdiklerine bir bak.",
    note: "El kamerası tekniği, gerçekçi yakın dövüş koreografileri ve soğuk istihbarat oyunlarıyla modern aksiyon sinemasını değiştiren seri.",
    gradient: "from-slate-900/60 to-zinc-950/60",
  },
  {
    title: "Memento (2000)",
    image: "/images/memento.jpg",
    tag: "Christopher Nolan • Neo-Noir / Gizem",
    quote: "Kim olduğumuzu kendimize hatırlatmak için hepimizin aynalara ihtiyacı var.",
    note: "Sondan başa doğru akan ters kronolojik kurgusuyla izleyiciyi de kısa süreli hafıza kaybının içine hapseden dahi işi bulmaca.",
    gradient: "from-cyan-950/60 to-slate-950/60",
  },
  {
    title: "The Prestige (2006)",
    image: "/images/prestige.jpg",
    tag: "Christopher Nolan • Gizem / Gerilim",
    quote: "Dikkatli bakıyor musun?",
    note: "Takıntı, fedakarlık ve illüzyon sanatının karanlık bedeli üzerine kurulu; her izleyişte yeni ipuçları yakalatan kusursuz senaryo.",
    gradient: "from-indigo-950/60 to-zinc-950/60",
  },
  {
    title: "The Truman Show (1998)",
    image: "/images/truman-show.jpg",
    tag: "Peter Weir • Satirik Bilim Kurgu",
    quote: "Olur ya görüşemezsek; iyi günler, iyi akşamlar ve iyi geceler!",
    note: "Sahte bir mükemmelliğin içinden uyanıp gerçeğin kapısına yürümeyi anlatan, zamanının çok ötesinde bir medya ve özgürlük eleştirisi.",
    gradient: "from-sky-900/60 to-slate-950/60",
  },
  {
    title: "Pride & Prejudice (2005)",
    image: "/images/pride-prejudice.jpg",
    tag: "Joe Wright • Dönem Dramı",
    quote: "Beni bedenim ve ruhumla büyüledin.",
    note: "Dario Marianelli'nin piyano tınıları, sisli İngiliz kırları ve tek plan balo sahneleriyle zarafetin sinemadaki karşılığı.",
    gradient: "from-stone-900/60 to-emerald-950/60",
  },
  {
    title: "The Odyssey (2026)",
    image: "/images/the-odyssey.jpg",
    tag: "Christopher Nolan • Mitolojik Epik",
    quote: "Anlat bana Musa, o binbir türlü çare bilen adamı...",
    note: "Homeros'un ölümsüz destanını IMAX kameralar ve pratik efektlerle devasa bir sinema ölçeğine taşıyan mitolojik yolculuk.",
    gradient: "from-blue-950/60 to-slate-950/60",
  },
  {
    title: "Stalker (1979)",
    image: "/images/stalker.jpg",
    tag: "Andrei Tarkovsky • Sanat Sineması",
    quote: "İnsan doğduğunda zayıf ve esnektir; öldüğünde ise katı ve hissizdir.",
    note: "Yasak 'Bölge'ye yapılan metafizik yolculuk üzerinden inanç, arzu ve insan ruhunun derinliklerini sorgulayan şiirsel başyapıt.",
    gradient: "from-stone-950/60 to-amber-950/60",
  },
  {
    title: "Oldboy (2003)",
    image: "/images/oldboy.jpg",
    tag: "Park Chan-wook • Kore Sineması",
    quote: "Gül, dünya da seninle gülsün. Ağla, tek başına ağlarsın.",
    note: "Tek plan çekiçli koridor sahnesi, operatik intikam trajedisi ve sarsıcı finaliyle dünya sinemasının en çarpıcı örneklerinden.",
    gradient: "from-red-950/60 to-neutral-950/60",
  },
  {
    title: "Mulholland Drive (2001)",
    image: "/images/mulholland-drive.jpg",
    tag: "David Lynch • Sürreal Gizem",
    quote: "Sessizlik.",
    note: "Hollywood rüyası ile kabus arasındaki sınırı eriten, bilinçaltının mantığıyla işleyen hipnotik ve gizemli başyapıt.",
    gradient: "from-purple-950/60 to-black/60",
  },
  {
    title: "No Country for Old Men (2007)",
    image: "/images/no-country.jpg",
    tag: "Coen Kardeşler • Neo-Western",
    quote: "Yazı tura atışında şimdiye kadar kaybettiğin en büyük şey neydi?",
    note: "Neredeyse hiç film müziği kullanmadan saf gerilim yaratan, kader ve kaçınılmazlık üzerine soğukkanlı bir başyapıt.",
    gradient: "from-amber-950/60 to-zinc-950/60",
  },
  {
    title: "Whiplash (2014)",
    image: "/images/whiplash.jpg",
    tag: "Damien Chazelle • Müzik / Psikolojik Dram",
    quote: "İngilizcede 'aferin' kadar zararlı iki kelime daha yoktur.",
    note: "Mükemmeliyetçilik takıntısı ve sınırları zorlayan disiplin üzerine kurulu, son 10 dakikası nefes kestiren ritim şöleni.",
    gradient: "from-yellow-950/60 to-black/60",
  },
  {
    title: "In Bruges (2008)",
    image: "/images/inbruges.jpg",
    tag: "Martin McDonagh • Kara Komedi",
    quote: "Belki de cehennem budur; sonsuza dek Bruges'de kalmak.",
    note: "Orta Çağ masal şehri Bruges fonunda suç, vicdan ve keskin İrlanda mizahını ustalıkla harmanlayan kült yapım.",
    gradient: "from-indigo-950/60 to-amber-950/60",
  },
  {
    title: "Good Will Hunting (1997)",
    image: "/images/good-will-hunting.jpg",
    tag: "Gus Van Sant • Dram",
    quote: "Senin suçun değil evlat. Senin suçun değil.",
    note: "Deha, duygusal duvarlar ve insanın kendi potansiyeliyle yüzleşmesi üzerine yazılmış en samimi senaryolardan biri.",
    gradient: "from-amber-950/60 to-stone-900/60",
  },
  {
    title: "The Banshees of Inisherin (2022)",
    image: "/images/banshees.jpg",
    tag: "Martin McDonagh • Kara Mizah / Dram",
    quote: "İyi biri olmak, geriye kalan her şeyden daha önemlidir.",
    note: "Küçük bir İrlanda adasında aniden biten bir dostluk üzerinden yalnızlık, kalıcılık ve inatçılığı işleyen sarsıcı hikaye.",
    gradient: "from-emerald-950/60 to-slate-900/60",
  },
  {
    title: "Dune: Part Two (2024)",
    image: "/images/dune.jpg",
    tag: "Denis Villeneuve • Epik Bilim Kurgu",
    quote: "Korku akıl katilidir. Korkunun üzerimden ve içimden geçmesine izin vereceğim.",
    note: "Anıtsal ses tasarımı, çöl sinematografisi ve mesih mitinin karanlık yüzünü işleyen modern bilim kurgu klasiği.",
    gradient: "from-orange-950/60 to-stone-950/60",
  },
  {
    title: "The Matrix (1999)",
    image: "/images/matrix.jpg",
    tag: "Wachowski Kardeşler • Bilim Kurgu",
    quote: "Yolu bilmekle o yolda yürümek arasında fark vardır.",
    note: "Felsefi alt metni, cyberpunk estetiği ve görsel efekt devrimiyle sinema tarihini ikiye bölen başyapıt.",
    gradient: "from-green-950/60 to-black/60",
  },
];

const NEW_YEAR_WISHES = [
  "2027; emeklerinin karşılığını aldığın, sağlık ve huzurla dolu bir yıl olsun.",
  "Yeni yıl sana güzel insanlar, temiz başlangıçlar ve unutulmaz anılar getirsin.",
  "Hayal ettiğin kapılar birer birer açılsın; şans bu yıl senden yana olsun.",
  "Kendine inandığın, cesaretini kaybetmediğin ve gurur duyduğun bir yıl olsun.",
  "2027'de evine bereket, kalbine huzur, yoluna ışık dolsun.",
  "Ertelediğin güzelliklere başladığın, küçük adımlarla büyük yollar aldığın bir yıl olsun.",
  "Gülüşünün eksilmediği, sevdiklerinle sağlıkla bir arada olduğun bir yıl dilerim.",
  "Bu yıl beklenmedik güzellikler, tatlı tesadüfler ve bolca iyi haber seninle olsun.",
  "Zor günler geride, güzel ihtimaller önünde olsun. Mutlu yıllar!",
  "2027 sana hem dinlenecek zaman hem de gerçekleşecek hayaller getirsin.",
  "Attığın her adım seni olmak istediğin insana biraz daha yaklaştırsın.",
  "Yeni yıl; cesaret, sağlık, sevgi ve içten bir kahkaha ile gelsin.",
];

const FORTUNE_MESSAGES = [
  "Beklediğin haber, tam da umudunu kestiğin anda gelebilir.",
  "Küçük bir cesaret, büyük bir değişimin ilk adımı olacak.",
  "Bu yıl emeğinin göründüğünü ve değer gördüğünü hissedeceksin.",
  "Yeni bir kapı açılıyor; içeri girmekten korkma.",
  "Güzel bir tesadüf, sıradan bir gününü unutulmaz yapacak.",
  "Sabırla büyüttüğün bir hayal filiz vermeye hazırlanıyor.",
  "Kendine ayırdığın zaman, bu yılın en güzel yatırımı olacak.",
  "Bir dostunun sözü sana ihtiyacın olan gücü verecek.",
  "Yolun açık, şansın bol, zihnin sakin olsun.",
  "Bu yıl yeni bir beceri öğrenecek ve kendinle gurur duyacaksın.",
  "Karşına çıkan fırsat, hazır olduğunu fark etmeni sağlayacak.",
  "Güzel şeyler bazen yavaş gelir; sen yolundan dönme.",
  "Bir kahve, güzel bir sohbet ve içten bir kahkaha seni bekliyor.",
  "Maddi anlamda daha güvende hissedeceğin adımlar atacaksın.",
  "Uzun zamandır istediğin bir yere gitmek bu yıl gerçek olabilir.",
  "Kendini başkalarıyla değil, dünkü halinle kıyasla; ilerliyorsun.",
  "2027'de kalbini yoran şeyler azalsın, heyecan veren şeyler çoğalsın.",
  "Doğru zamanda doğru yerde olacağın güzel bir karşılaşma var.",
  "Bir konuda vereceğin karar sana beklediğinden fazla özgürlük getirecek.",
  "Bu yıl daha çok gezecek, daha çok görecek, daha çok biriktireceksin.",
  "İçin rahat olsun; her şeyi aynı anda çözmek zorunda değilsin.",
  "Güzel bir başlangıç için mükemmel zamanı bekleme. Şimdi değerli.",
  "Sevdiklerinle paylaştığın sofraların ve anıların bol olsun.",
  "Bir zamanlar uzak gelen hedef, bu yıl planlarının içine girecek.",
  "Kendine verdiğin sözleri tutacağın güçlü bir yıl seni bekliyor.",
  "Şans, hazırlıkla buluştuğunda güzel hikayeler yazar.",
  "Bu yıl daha az endişe, daha çok merak ve daha çok huzur diliyorum.",
  "Yorulduğunda dur; vazgeçmek zorunda değilsin.",
  "Güzel bir mesaj veya telefon, yüzünde kocaman bir tebessüm bırakacak.",
  "2027 sana sağlık, bereket, sevgi ve kendin olabildiğin bir hayat getirsin.",
];

const TreeArtwork = ({ compact = false }) => {
  const branches = [
    "M251 62 C239 77 226 91 205 105 C220 104 235 100 247 94 C230 116 207 132 178 147 C199 145 221 138 239 128 C222 151 194 170 160 187",
    "M249 83 C264 96 278 106 301 116 C283 118 269 114 255 108 C274 131 298 145 324 160 C302 158 280 151 261 142 C282 166 310 181 340 198",
    "M245 124 C226 139 207 156 181 174 C203 170 221 164 239 155 C216 181 188 199 151 218 C181 216 214 206 240 193",
    "M255 142 C276 153 294 168 319 181 C299 180 280 175 261 166 C285 190 314 207 351 224 C321 222 287 212 260 198",
    "M246 181 C221 198 194 217 160 238 C188 236 219 226 242 213 C213 242 177 263 130 283 C166 282 211 269 244 250",
    "M254 204 C278 220 303 236 337 248 C310 250 282 241 258 229 C284 255 316 274 365 291 C326 290 286 276 257 257",
    "M247 245 C224 260 198 280 168 300 C196 299 223 289 245 276 C224 298 202 315 177 329",
    "M253 265 C275 278 299 295 330 310 C300 308 277 299 256 286 C275 306 294 321 317 334",
    "M238 102 C221 109 207 118 190 132 M262 116 C282 122 299 134 314 147",
    "M230 158 C210 167 195 180 178 195 M270 178 C292 188 309 201 326 216",
  ];
  const needles = [
    "M226 103l-24 -9 M217 112l-28 -2 M208 126l-26 3 M193 144l-27 6 M178 162l-26 8",
    "M274 103l24 -9 M283 112l28 -2 M292 126l26 3 M307 144l26 6 M322 162l26 8",
    "M211 174l-31 -7 M198 190l-34 3 M180 208l-36 12 M164 228l-39 15",
    "M289 174l31 -7 M302 190l34 3 M320 208l36 12 M336 228l39 15",
    "M205 247l-43 7 M190 267l-48 17 M295 247l43 7 M310 267l48 17",
  ];
  const ornaments = [
    [226, 133],
    [278, 145],
    [192, 184],
    [309, 193],
    [244, 205],
    [171, 240],
    [330, 247],
    [250, 265],
    [210, 284],
    [292, 286],
  ];
  return (
    <motion.svg
      viewBox="0 0 500 390"
      className={compact ? "w-32 sm:w-40" : "w-72 sm:w-[27rem]"}
      role="img"
      aria-label="Elle çizilmiş, ışıklarla süslü çam ağacı"
    >
      <ellipse cx="250" cy="354" rx="130" ry="12" fill="#dce9e2" opacity=".12" />
      <motion.path
        d="M250 322 C247 337 248 346 250 354"
        fill="none"
        stroke="#76513a"
        strokeWidth="19"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      />
      <motion.path
        d="M250 48 C236 65 232 79 250 91 C268 79 264 65 250 48Z"
        fill="none"
        stroke="#d8b66a"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{ duration: 1, delay: 3.4 }}
      />
      <motion.path
        d="M250 42 C247 53 237 57 226 58 C238 63 245 70 250 82 C255 70 262 63 274 58 C263 57 253 53 250 42Z"
        fill="#e8c778"
        opacity=".9"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.8, duration: 1 }}
        style={{ transformOrigin: "250px 62px" }}
      />
      {branches.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={["#174b35", "#246344", "#2d704a", "#174b35"][i % 4]}
          strokeWidth={i < 2 ? 12 : i < 8 ? 10 : 4.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.96 }}
          transition={{ duration: 1.05, ease: "easeInOut", delay: 0.35 + i * 0.37 }}
        />
      ))}
      {needles.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={i % 2 ? "#477b50" : "#6c9660"}
          strokeWidth="3.8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.75 }}
          transition={{ duration: 0.8, delay: 1.25 + i * 0.48 }}
        />
      ))}
      <motion.path
        d="M250 89 C228 126 220 171 250 211 C280 171 272 126 250 89"
        fill="none"
        stroke="#9ab17a"
        strokeWidth="2"
        opacity=".38"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 2.1 }}
      />
      {ornaments.map(([x, y], i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4.05 + i * 0.13, duration: 0.45, type: "spring", stiffness: 120 }}
        >
          <circle
            cx={x}
            cy={y}
            r="8"
            fill={["#a53d35", "#d2a94d", "#668aa0", "#a76b85"][i % 4]}
            stroke="#ead9ae"
            strokeWidth="1.4"
          />
          <ellipse cx={x - 2.5} cy={y - 3} rx="2.2" ry="3.2" fill="#fff4d4" opacity=".65" />
        </motion.g>
      ))}
      <motion.path
        d="M250 88 C221 127 286 146 218 183 C177 207 292 235 204 274"
        fill="none"
        stroke="#d6b45e"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity=".85"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, delay: 3.5 }}
      />
      {Array.from({ length: 9 }, (_, i) => (
        <motion.circle
          key={i}
          cx={206 + ((i * 31) % 88)}
          cy={120 + ((i * 23) % 157)}
          r="3.2"
          fill="#ffe6a0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.25, 0.95, 0.35] }}
          transition={{ delay: 4.6 + i * 0.18, duration: 2.2, repeat: Infinity }}
        />
      ))}
    </motion.svg>
  );
};

// İnteraktif Hikayeli Giriş Sahnesi: Süslü Çam Ağacı, Kardan Adam, Buzda Kayıp Düşen Karakter & "Faruk Mutlu Yıllar Diler" Tabelası
const IntroSplash = ({ onEnter }) => {
  const [sceneKey, setSceneKey] = useState(0);
  const [phase, setPhase] = useState("walk"); // walk -> notice -> pull -> slip -> banner -> ready

  useEffect(() => {
    setPhase("walk");
    const timers = [
      setTimeout(() => setPhase("notice"), 1650),
      setTimeout(() => setPhase("pull"), 2250),
      setTimeout(() => setPhase("slip"), 2900),
      setTimeout(() => setPhase("banner"), 3350),
      setTimeout(() => setPhase("ready"), 4300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [sceneKey]);

  const replayScene = () => {
    setSceneKey((k) => k + 1);
  };

  // Karakter pozisyon & duruş hesaplamaları
  const getCharacterPose = () => {
    switch (phase) {
      case "walk":
        return { x: 255, y: 0, rotate: 0, scaleX: 1, scaleY: 1 };
      case "notice":
        return { x: 262, y: 0, rotate: 4, scaleX: 1, scaleY: 1 };
      case "pull":
        return { x: 280, y: 6, rotate: 10, scaleX: 1.03, scaleY: 0.96 };
      case "slip":
      case "banner":
      case "ready":
        return { x: 235, y: 34, rotate: -78, scaleX: 1.04, scaleY: 0.94 };
      default:
        return { x: 255, y: 0, rotate: 0, scaleX: 1, scaleY: 1 };
    }
  };

  const charPose = getCharacterPose();
  const ropePulled = phase === "pull" || phase === "slip" || phase === "banner" || phase === "ready";
  const bannerVisible = phase === "banner" || phase === "ready";
  const hasFallen = phase === "slip" || phase === "banner" || phase === "ready";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden bg-[#0a1419] px-3 py-4 text-white sm:justify-center sm:px-6 sm:py-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
    >
      {/* Derin Kış Gecesi Arka Planı */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 65% 38%, rgba(34, 92, 68, 0.34), transparent 52%), radial-gradient(ellipse at 25% 25%, rgba(56, 189, 248, 0.14), transparent 45%), linear-gradient(180deg, #081016 0%, #102124 58%, #0b161b 100%)",
        }}
      />

      {/* Hafif & Kasmayan Kar Taneleri */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/75"
            style={{
              width: i % 3 === 0 ? 4 : 2.5,
              height: i % 3 === 0 ? 4 : 2.5,
              left: `${(i * 37) % 100}%`,
              top: "-4%",
            }}
            animate={{
              y: ["0vh", "105vh"],
              x: [0, i % 2 === 0 ? 18 : -18, 0],
              opacity: [0, 0.8, 0.2],
            }}
            transition={{
              duration: 5.5 + (i % 4) * 1.1,
              repeat: Infinity,
              ease: "linear",
              delay: (i * 0.27) % 4,
            }}
          />
        ))}
      </div>

      {/* Üst Kontrol Şeridi (Mobil ve Masaüstü Dostu) */}
      <div className="relative z-20 flex w-full max-w-4xl items-center justify-between pt-1 sm:mb-2">
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold tracking-[0.22em] text-amber-200/85">
          FARUK OS • 2027
        </span>

        <div className="flex items-center gap-2">
          {phase === "ready" && (
            <button
              onClick={replayScene}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/90 transition hover:bg-white/20 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5 text-amber-300" />
              <span>Tekrar İzle</span>
            </button>
          )}
          <button
            onClick={onEnter}
            className="rounded-full border border-white/20 bg-black/35 px-3.5 py-1.5 text-[11px] font-semibold text-white/85 transition hover:border-white/45 hover:text-white cursor-pointer"
          >
            Geç →
          </button>
        </div>
      </div>

      {/* Ana Hikaye Sahnesi (Tek SVG Canvas — Mobilde ve Masaüstünde Asla Kaymaz) */}
      <div key={sceneKey} className="relative z-10 my-auto flex w-full max-w-4xl items-center justify-center">
        <svg
          viewBox="0 0 820 435"
          className="h-auto max-h-[63svh] w-full overflow-visible drop-shadow-[0_22px_50px_rgba(0,0,0,0.65)] sm:max-h-[68svh]"
          role="img"
          aria-label="Süslü çam ağacı, kardan adam, ipi çekip kayarak düşen komik karakter ve Faruk Mutlu Yıllar Diler tabelası"
        >
          <defs>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#fde68a" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="snowHill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2f1f8" />
              <stop offset="45%" stopColor="#bfd9e6" />
              <stop offset="100%" stopColor="#8fb2c4" />
            </linearGradient>
            <linearGradient id="icePatch" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="bannerBoard" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1b3b2e" />
              <stop offset="50%" stopColor="#122920" />
              <stop offset="100%" stopColor="#0c1d17" />
            </linearGradient>
            <filter id="warmGlow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dolunay & Yıldızlar */}
          <circle cx="115" cy="78" r="56" fill="url(#moonGlow)" />
          <circle cx="115" cy="78" r="24" fill="#fef9c3" opacity="0.92" />
          {[
            [210, 48],
            [340, 36],
            [520, 44],
            [745, 58],
            [68, 155],
            [775, 138],
          ].map(([sx, sy], idx) => (
            <motion.circle
              key={idx}
              cx={sx}
              cy={sy}
              r={idx % 2 === 0 ? 2.2 : 1.6}
              fill="#fef08a"
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 2 + idx * 0.4, repeat: Infinity }}
            />
          ))}

          {/* Uzak Karlı Tepe Silüeti */}
          <path
            d="M0 335 Q 200 285 420 322 T 820 305 L 820 435 L 0 435 Z"
            fill="#142930"
            opacity="0.75"
          />

          {/* Ön Kar Zemini */}
          <path
            d="M-10 352 Q 230 328 470 348 T 830 342 L 830 440 L -10 440 Z"
            fill="url(#snowHill)"
          />

          {/* Kaygan Buz Tabakası (Karakterin kayacağı nokta) */}
          <g transform="translate(275, 344)">
            <ellipse cx="42" cy="8" rx="46" ry="7.5" fill="url(#icePatch)" stroke="#bae6fd" strokeWidth="1.2" />
            <path d="M22 7 L36 5 M48 9 L64 7" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
            {hasFallen && (
              <motion.g
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0], scale: [0.6, 1.25, 1.4] }}
                transition={{ duration: 0.7 }}
              >
                <text x="32" y="-4" fill="#e0f2fe" fontSize="14" fontWeight="bold">✨</text>
              </motion.g>
            )}
          </g>

          {/* ARKA PLAN DEKORU: Sevimli Atkılı Kardan Adam */}
          <motion.g
            transform="translate(475, 224)"
            animate={
              hasFallen
                ? { rotate: [0, -6, 4, 0], y: [0, -5, 0] }
                : { rotate: [-1.5, 1.5, -1.5] }
            }
            transition={{
              duration: hasFallen ? 0.55 : 3.2,
              repeat: hasFallen ? 0 : Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "45px 115px" }}
          >
            {/* Gölge */}
            <ellipse cx="45" cy="122" rx="38" ry="7" fill="#648b9e" opacity="0.45" />
            {/* Alt Gövde */}
            <circle cx="45" cy="92" r="31" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            {/* Orta Gövde */}
            <circle cx="45" cy="52" r="23" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            {/* Kafa */}
            <circle cx="45" cy="19" r="16.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />

            {/* Kömür Düğmeler */}
            <circle cx="45" cy="46" r="2.6" fill="#1e293b" />
            <circle cx="45" cy="57" r="2.6" fill="#1e293b" />
            <circle cx="45" cy="82" r="2.8" fill="#1e293b" />

            {/* Dal Kollar */}
            <path d="M23 48 L-4 32 M4 37 L-3 25" stroke="#78350f" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M67 48 L93 30 M85 36 L94 24" stroke="#78350f" strokeWidth="3.2" strokeLinecap="round" />

            {/* Kırmızı-Sarı Çizgili Atkı */}
            <path d="M29 33 Q45 40 61 33" stroke="#dc2626" strokeWidth="7" strokeLinecap="round" />
            <path d="M29 33 Q45 40 61 33" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="5 5" strokeLinecap="round" />
            <path d="M53 35 L58 61 L49 62 Z" fill="#dc2626" />

            {/* Gözler (Düşünce şaşırıp sola bakar!) */}
            <circle cx={hasFallen ? 37 : 39} cy="15" r={hasFallen ? 2.9 : 2.2} fill="#0f172a" />
            <circle cx={hasFallen ? 48 : 50} cy="15" r={hasFallen ? 2.9 : 2.2} fill="#0f172a" />
            {/* Havuç Burun */}
            <polygon points="44,18 29,21 44,23" fill="#f97316" />
            {/* Şaşkın veya Gülümseyen Ağız */}
            {hasFallen ? (
              <circle cx="44" cy="27" r="3" fill="#1e293b" />
            ) : (
              <path d="M38 25 Q44 30 50 25" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
            )}

            {/* Kardan Adam Şapkası */}
            <rect x="28" y="1" width="34" height="4.5" rx="2" fill="#1e293b" />
            <rect x="33" y="-14" width="24" height="16" rx="3" fill="#1e293b" />
            <rect x="33" y="-3" width="24" height="3.5" fill="#dc2626" />
          </motion.g>

          {/* SAĞ TARAF: Süslü ve Işıklı Büyük Çam Ağacı */}
          <g transform="translate(555, 58)">
            {/* Zemin Gölgesi */}
            <ellipse cx="115" cy="296" rx="92" ry="12" fill="#5b8296" opacity="0.45" />
            {/* Gövde */}
            <rect x="100" y="256" width="30" height="40" rx="5" fill="#6b4423" />

            {/* Katmanlı Çam Dalları */}
            <path d="M115 115 L22 262 Q115 278 208 262 Z" fill="#134e35" stroke="#0d3b27" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M115 72 L36 202 Q115 216 194 202 Z" fill="#186041" stroke="#114730" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M115 32 L52 142 Q115 154 178 142 Z" fill="#1f7550" stroke="#15573b" strokeWidth="2.5" strokeLinejoin="round" />

            {/* Dalların Üzerindeki Kar Örtüleri */}
            <path d="M52 142 Q82 149 115 144 Q148 149 178 142" fill="none" stroke="#f1f5f9" strokeWidth="4.5" strokeLinecap="round" opacity="0.9" />
            <path d="M36 202 Q75 210 115 204 Q155 210 194 202" fill="none" stroke="#f1f5f9" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
            <path d="M22 262 Q68 271 115 264 Q162 271 208 262" fill="none" stroke="#f1f5f9" strokeWidth="5.5" strokeLinecap="round" opacity="0.9" />

            {/* Altın Simli Kurdele */}
            <path
              d="M84 96 Q122 114 152 104 M64 156 Q118 180 172 162 M44 218 Q115 246 192 224"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="6 4"
              opacity="0.9"
            />

            {/* Renkli Yılbaşı Topları */}
            {[
              { x: 96, y: 112, c: "#ef4444" },
              { x: 136, y: 122, c: "#fbbf24" },
              { x: 76, y: 168, c: "#38bdf8" },
              { x: 118, y: 176, c: "#ef4444" },
              { x: 154, y: 166, c: "#f59e0b" },
              { x: 58, y: 230, c: "#fbbf24" },
              { x: 98, y: 238, c: "#ec4899" },
              { x: 138, y: 235, c: "#38bdf8" },
              { x: 174, y: 226, c: "#ef4444" },
            ].map((orb, i) => (
              <g key={i}>
                <circle cx={orb.x} cy={orb.y} r="7.5" fill={orb.c} stroke="#fef3c7" strokeWidth="1.2" />
                <circle cx={orb.x - 2.3} cy={orb.y - 2.5} r="2" fill="#ffffff" opacity="0.75" />
              </g>
            ))}

            {/* Yanıp Sönen Peri Işıkları */}
            {[
              [115, 76],
              [92, 134],
              [142, 138],
              [70, 194],
              [116, 198],
              [162, 190],
              [48, 250],
              [92, 255],
              [142, 252],
              [184, 246],
            ].map(([lx, ly], i) => (
              <motion.circle
                key={i}
                cx={lx}
                cy={ly}
                r="3.8"
                fill={i % 2 === 0 ? "#fef08a" : "#fde047"}
                filter="url(#warmGlow)"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.25, 0.85] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.17 }}
              />
            ))}

            {/* Tepe Yıldızı */}
            <motion.polygon
              points="115,4 121,19 137,20 125,30 129,45 115,36 101,45 105,30 93,20 109,19"
              fill="#fde047"
              stroke="#f59e0b"
              strokeWidth="1.5"
              filter="url(#warmGlow)"
              animate={{ scale: [0.95, 1.08, 0.95], rotate: [-3, 3, -3] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "115px 25px" }}
            />
          </g>

          {/* AĞACIN YANINDAN SARKAN ÇEKME İPİ */}
          <motion.g
            animate={{ y: ropePulled ? 34 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
          >
            {/* İp Gövdesi */}
            <line
              x1="342"
              y1="-25"
              x2="342"
              y2="232"
              stroke="#f59e0b"
              strokeWidth="4"
              strokeDasharray="6 3"
            />
            <line x1="342" y1="-25" x2="342" y2="232" stroke="#fef3c7" strokeWidth="1.5" opacity="0.7" />
            {/* Kırmızı Püsküllü Tutamaç */}
            <circle cx="342" cy="236" r="7" fill="#dc2626" stroke="#fbbf24" strokeWidth="2" />
            <path d="M337 242 L334 256 M342 243 L342 258 M347 242 L350 256" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />

            {/* İp Çekilince Çıkan Hareket Çizgileri */}
            {phase === "pull" && (
              <motion.g
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <path d="M322 225 L312 218 M362 225 L372 218 M320 242 L310 244" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
              </motion.g>
            )}
          </motion.g>

          {/* KOMİK KARAKTER (Yürür -> İpi Fark Eder -> Çeker -> Buzda Kayıp Düşer!) */}
          <motion.g
            initial={{ x: -85, y: 0, rotate: 0 }}
            animate={charPose}
            transition={
              phase === "walk"
                ? { duration: 1.6, ease: "easeOut" }
                : phase === "slip"
                ? { type: "spring", stiffness: 240, damping: 15 }
                : { duration: 0.45, ease: "easeOut" }
            }
            style={{ transformOrigin: "45px 95px" }}
          >
            {/* Yürüme Sırasında Hafif Sekme */}
            <motion.g
              animate={
                phase === "walk"
                  ? { y: [0, -7, 0, -7, 0, -6, 0] }
                  : { y: 0 }
              }
              transition={{ duration: 1.6, ease: "easeInOut" }}
            >
              {/* Zemin Gölgesi */}
              <ellipse cx="45" cy="112" rx="28" ry="6" fill="#5b8296" opacity="0.45" />

              {/* Sol & Sağ Bacaklar + Botlar */}
              <motion.g
                animate={
                  phase === "walk"
                    ? { rotate: [-22, 22, -22, 22, 0] }
                    : hasFallen
                    ? { rotate: -25 }
                    : { rotate: 0 }
                }
                transition={{ duration: phase === "walk" ? 1.6 : 0.3 }}
                style={{ transformOrigin: "38px 82px" }}
              >
                <rect x="33" y="80" width="10" height="24" rx="5" fill="#1e293b" />
                <rect x="30" y="100" width="17" height="9" rx="4.5" fill="#78350f" />
              </motion.g>

              <motion.g
                animate={
                  phase === "walk"
                    ? { rotate: [22, -22, 22, -22, 0] }
                    : hasFallen
                    ? { rotate: 32 }
                    : { rotate: 0 }
                }
                transition={{ duration: phase === "walk" ? 1.6 : 0.3 }}
                style={{ transformOrigin: "52px 82px" }}
              >
                <rect x="47" y="80" width="10" height="24" rx="5" fill="#334155" />
                <rect x="46" y="100" width="17" height="9" rx="4.5" fill="#92400e" />
              </motion.g>

              {/* Kışlık Mont (Sarı-Lacivert / Kırmızı Detaylı) */}
              <rect x="27" y="45" width="36" height="40" rx="14" fill="#e11d48" stroke="#be123c" strokeWidth="2" />
              {/* Mont Fermuarı */}
              <line x1="47" y1="47" x2="47" y2="83" stroke="#fecdd3" strokeWidth="2" />

              {/* Uçuşan Atkı */}
              <motion.path
                d="M28 48 Q12 52 6 62"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="6"
                strokeLinecap="round"
                animate={
                  phase === "walk" || hasFallen
                    ? { d: ["M28 48 Q12 52 6 62", "M28 48 Q10 42 4 48", "M28 48 Q12 52 6 62"] }
                    : {}
                }
                transition={{ duration: 0.6, repeat: Infinity }}
              />

              {/* Kollar (İp çekerken yukarı uzanır, düşünce havaya kalkar!) */}
              <motion.g
                animate={
                  phase === "pull"
                    ? { rotate: -125, x: 8, y: -6 }
                    : hasFallen
                    ? { rotate: -145, y: -4 }
                    : phase === "walk"
                    ? { rotate: [18, -18, 18, -18, 0] }
                    : { rotate: -25 }
                }
                transition={{ duration: 0.35 }}
                style={{ transformOrigin: "54px 54px" }}
              >
                <rect x="50" y="50" width="10" height="24" rx="5" fill="#be123c" />
                <circle cx="55" cy="75" r="5.5" fill="#fbbf24" />
              </motion.g>

              {/* Kafa */}
              <circle cx="46" cy="28" r="17" fill="#fed7aa" stroke="#fdba74" strokeWidth="1.5" />
              {/* Kırmızı Yanak */}
              <circle cx="53" cy="32" r="3.2" fill="#fb7185" opacity="0.65" />

              {/* Yüz İfadesi: Normal -> Şaşkın -> Düşmüş Komik Gözler */}
              {hasFallen ? (
                <g>
                  {/* X_X veya Şaşkın Gözler */}
                  <path d="M47 23 L52 28 M52 23 L47 28" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="57" cy="25" r="2.6" fill="#1e293b" />
                  {/* Açık Şaşkın Ağız */}
                  <ellipse cx="53" cy="35" rx="4" ry="3" fill="#9f1239" />
                </g>
              ) : (
                <g>
                  <circle cx="51" cy="25" r="2.3" fill="#0f172a" />
                  <circle cx="58" cy="25" r="2.3" fill="#0f172a" />
                  <path
                    d={phase === "pull" ? "M50 34 Q54 31 58 34" : "M49 33 Q54 37 59 33"}
                    fill="none"
                    stroke="#0f172a"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {/* Ponponlu Kış Beresi */}
              <path d="M29 22 Q46 6 63 22 Z" fill="#0284c7" />
              <rect x="28" y="19" width="36" height="6" rx="3" fill="#fbbf24" />
              <circle cx="46" cy="8" r="5.5" fill="#f8fafc" />
            </motion.g>
          </motion.g>

          {/* KARAKTER TEPKİ BALONCUKLARI (?, !, Düşme Kar Bulutu & Baş Dönme Yıldızları) */}
          {phase === "notice" && (
            <motion.g
              initial={{ opacity: 0, y: 8, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transform="translate(302, 185)"
            >
              <circle cx="16" cy="16" r="15" fill="#ffffff" stroke="#fbbf24" strokeWidth="2.5" />
              <text x="11" y="22" fill="#0f172a" fontSize="18" fontWeight="900">?</text>
            </motion.g>
          )}

          {hasFallen && (
            <g>
              {/* Düşme Kar Tozu Efekti */}
              <motion.g
                initial={{ opacity: 0.95, scale: 0.4 }}
                animate={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.85, ease: "easeOut" }}
                transform="translate(265, 336)"
              >
                <circle cx="-18" cy="4" r="12" fill="#ffffff" />
                <circle cx="12" cy="6" r="15" fill="#e0f2fe" />
                <circle cx="42" cy="2" r="11" fill="#ffffff" />
              </motion.g>

              {/* Başının Üstünde Dönen Komik Yıldızlar */}
              <motion.g
                transform="translate(242, 268)"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <text x="-16" y="0" fill="#fde047" fontSize="14">★</text>
                <text x="10" y="-6" fill="#38bdf8" fontSize="12">✦</text>
                <text x="2" y="12" fill="#fbbf24" fontSize="13">★</text>
              </motion.g>
            </g>
          )}

          {/* ÜSTTEN İNEN YILBAŞI TABELASI: "Faruk Mutlu Yıllar Diler" */}
          <motion.g
            initial={{ y: -210, rotate: -4 }}
            animate={
              bannerVisible
                ? { y: 18, rotate: [0, 2.2, -1.5, 0.7, 0] }
                : { y: -210, rotate: -4 }
            }
            transition={{
              y: { type: "spring", stiffness: 150, damping: 13 },
              rotate: { duration: 1.4, ease: "easeOut" },
            }}
            style={{ transformOrigin: "245px 0px" }}
          >
            {/* Tabelayı Tutan İki Halat */}
            <line x1="115" y1="-60" x2="115" y2="34" stroke="#d97706" strokeWidth="4" />
            <line x1="375" y1="-60" x2="375" y2="34" stroke="#d97706" strokeWidth="4" />

            {/* Ahşap / Zümrüt Çerçeveli Yılbaşı Tabelası */}
            <rect
              x="42"
              y="28"
              width="406"
              height="118"
              rx="22"
              fill="url(#bannerBoard)"
              stroke="#fbbf24"
              strokeWidth="4"
            />
            <rect
              x="51"
              y="37"
              width="388"
              height="100"
              rx="15"
              fill="none"
              stroke="#fde68a"
              strokeWidth="1.2"
              strokeDasharray="6 4"
              opacity="0.65"
            />

            {/* Tabela Çerçevesindeki Mini Ampuller */}
            {[64, 124, 184, 245, 306, 366, 426].map((bx, idx) => (
              <motion.circle
                key={`top-b-${idx}`}
                cx={bx}
                cy="33"
                r="4"
                fill={idx % 2 === 0 ? "#ef4444" : "#fde047"}
                filter="url(#warmGlow)"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: idx * 0.15 }}
              />
            ))}

            {/* Üst Küçük Etiket */}
            <text
              x="245"
              y="64"
              textAnchor="middle"
              fill="#fde68a"
              fontSize="12"
              fontWeight="700"
              letterSpacing="4"
            >
              ✨ HOŞ GELDİN 2027 ✨
            </text>

            {/* Ana Tabela Yazısı */}
            <text
              x="245"
              y="99"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="27"
              fontWeight="900"
              letterSpacing="0.5"
            >
              Faruk Mutlu Yıllar Diler
            </text>

            {/* Alt Süs Çizgisi */}
            <text
              x="245"
              y="124"
              textAnchor="middle"
              fill="#86efac"
              fontSize="12"
              fontWeight="600"
            >
              🎄 Sağlık, huzur ve güzel başlangıçlarla dolu bir yıl olsun 🎄
            </text>
          </motion.g>
        </svg>
      </div>

      {/* Alt Giriş Butonu Alanı (Animasyon Tamamlanınca Belirir) */}
      <div className="relative z-20 flex min-h-[76px] flex-col items-center justify-center pb-2">
        <AnimatePresence>
          {phase === "ready" && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="flex flex-col items-center gap-2"
            >
              <motion.button
                onClick={onEnter}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 rounded-2xl border border-amber-200/70 bg-gradient-to-r from-amber-400/25 via-emerald-500/25 to-amber-400/25 px-8 py-3.5 text-xs font-extrabold tracking-[0.22em] text-amber-50 shadow-[0_12px_35px_rgba(251,191,36,0.28)] transition hover:border-amber-200 hover:bg-amber-400/35 cursor-pointer sm:px-10 sm:py-4 sm:text-sm"
              >
                <span>SİSTEME GİR</span>
                <span className="text-base">→</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const NewYearFeature = ({ isDay, soundFx }) => {
  const [wishIndex, setWishIndex] = useState(0);
  const [fortuneIndex, setFortuneIndex] = useState(-1);
  const [lastFortune, setLastFortune] = useState(-1);

  const nextWish = () => {
    playClickSound(soundFx);
    setWishIndex((v) => (v + 1) % NEW_YEAR_WISHES.length);
  };

  const openFortune = () => {
    playClickSound(soundFx);
    let next = Math.floor(Math.random() * FORTUNE_MESSAGES.length);
    if (FORTUNE_MESSAGES.length > 1 && next === lastFortune) {
      next = (next + 1) % FORTUNE_MESSAGES.length;
    }
    setLastFortune(next);
    setFortuneIndex(next);

    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.55 },
      colors: ["#fbbf24", "#38bdf8", "#f43f5e", "#34d399"],
    });
  };

  return (
    <div
      id="tour-tree-card"
      className={`real-glass relative mx-auto w-full max-w-2xl overflow-hidden rounded-[2rem] px-4 py-3.5 sm:px-7 ${
        isDay ? "real-glass-day" : "real-glass-night"
      }`}
    >
      <div className="relative flex items-center gap-3 sm:gap-7">
        <button
          onClick={nextWish}
          title="Ağaca dokun ve yeni yıl dileği al"
          className="group relative shrink-0 rounded-2xl transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <TreeArtwork compact />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/45 bg-black/35 px-2.5 py-1 text-[9px] font-semibold text-amber-100">
            DİLEK TUT ✨
          </span>
        </button>

        <div className="min-w-0 flex-1 py-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/40 bg-black/25 px-3 py-1 text-[10px] font-semibold tracking-widest text-amber-200">
              2027 YENİ YIL
            </span>
            <span className="glass-text text-[10px] text-white/95">• Bir dilek seç</span>
          </div>

          <h2 className="glass-text mt-2 text-lg font-bold text-white sm:text-xl">
            Yeni yıl ağacı
          </h2>

          <AnimatePresence mode="wait">
            <motion.p
              key={wishIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="glass-text mt-1.5 min-h-[42px] text-xs font-medium leading-6 text-white sm:text-sm"
            >
              {NEW_YEAR_WISHES[wishIndex]}
            </motion.p>
          </AnimatePresence>

          <button
            onClick={nextWish}
            className="glass-text mt-2 inline-flex items-center gap-2 rounded-full border border-white/45 bg-black/20 px-3.5 py-2 text-[11px] font-semibold text-white transition hover:bg-black/35 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            Başka bir dilek dile
          </button>
        </div>
      </div>

      <div className="relative mt-3 flex flex-col gap-2 border-t border-white/25 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="glass-text flex items-center gap-2 text-xs font-medium text-white">
          <Cookie className="h-5 w-5 text-amber-300" />
          <span>Bir de şans kurabiyeni kır…</span>
        </div>
        <button
          onClick={openFortune}
          className="glass-text rounded-full border border-amber-200/50 bg-amber-400/20 px-4 py-2 text-[11px] font-bold text-amber-100 transition hover:bg-amber-400/35 cursor-pointer"
        >
          🥠 Şansımı Öğren
        </button>
      </div>

      <AnimatePresence>
        {fortuneIndex >= 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: 6 }}
            className="relative mt-3 overflow-hidden rounded-xl border border-white/35 bg-black/25 px-4 py-3"
          >
            <div className="flex items-start gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
              <p className="glass-text text-xs leading-6 text-amber-50 sm:text-sm">
                {FORTUNE_MESSAGES[fortuneIndex]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WORD_BANK = [
  "DENIZ", "KITAP", "DUNYA", "SEHIR", "YOLCU", "BULUT", "BAHAR", "KUMRU", "KEDER", "NEFES",
  "ORMAN", "KAHVE", "SABAH", "GULUS", "GUNES", "YAZAR", "MASAL", "KALBI", "AKSAM", "SEVGI",
  "DURAK", "DOKUZ", "BILGI", "SAYGI", "ISLIK", "YEMEK", "KUZEY", "GOLGE", "KIRAZ", "YAGIZ",
];
const WORD_ANSWERS = [
  "DENIZ", "KITAP", "DUNYA", "SEHIR", "YOLCU", "BULUT", "BAHAR", "KUMRU", "KEDER", "NEFES",
  "ORMAN", "KAHVE", "SABAH", "GULUS", "GUNES", "MASAL", "SEVGI", "DURAK", "BILGI", "KUZEY",
];

const WordGuessGame = () => {
  const [answer, setAnswer] = useState(
    () => WORD_ANSWERS[Math.floor(Math.random() * WORD_ANSWERS.length)]
  );
  const [guesses, setGuesses] = useState([]);
  const [current, setCurrent] = useState("");
  const [notice, setNotice] = useState("Günün 5 harfli kelimesini 6 denemede bul.");
  const [finished, setFinished] = useState(false);
  const [round, setRound] = useState(0);

  const keyStatus = {};
  guesses.forEach((g) =>
    [...g].forEach((ch, i) => {
      const status = ch === answer[i] ? "correct" : answer.includes(ch) ? "present" : "absent";
      const priority = { absent: 1, present: 2, correct: 3 };
      if (!keyStatus[ch] || priority[status] > priority[keyStatus[ch]]) keyStatus[ch] = status;
    })
  );

  const submit = () => {
    if (finished) return;
    if (current.length !== 5) {
      setNotice("Lütfen 5 harfli bir kelime gir.");
      return;
    }
    if (!WORD_BANK.includes(current) && !WORD_ANSWERS.includes(current)) {
      setNotice("Bu kelime oyun sözlüğünde yok. Başka bir kelime dene.");
      return;
    }
    const next = [...guesses, current];
    setGuesses(next);
    setCurrent("");
    if (current === answer) {
      setFinished(true);
      setNotice(`Tebrikler! ${next.length} denemede buldun. 🎉`);
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.6 },
      });
    } else if (next.length === 6) {
      setFinished(true);
      setNotice(`Bu turun kelimesi ${answer} idi. Bir tur daha?`);
    } else {
      setNotice(
        current
          .split("")
          .map((c, i) => (c === answer[i] ? "🟩" : answer.includes(c) ? "🟨" : "⬛"))
          .join(" ")
      );
    }
  };

  const addLetter = (ch) => {
    if (!finished && current.length < 5) setCurrent((v) => v + ch);
  };
  const removeLetter = () => setCurrent((v) => v.slice(0, -1));

  useEffect(() => {
    const normalizeTurkish = (raw) => {
      const map = { ç: "C", Ç: "C", ğ: "G", Ğ: "G", ı: "I", İ: "I", ö: "O", Ö: "O", ş: "S", Ş: "S", ü: "U", Ü: "U" };
      if (map[raw]) return map[raw];
      if (/^[a-zA-Z]$/.test(raw)) return raw.toUpperCase();
      return null;
    };

    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Enter") submit();
      else if (e.key === "Backspace") removeLetter();
      else {
        const mapped = normalizeTurkish(e.key);
        if (mapped) addLetter(mapped);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const reset = () => {
    setAnswer(WORD_ANSWERS[Math.floor(Math.random() * WORD_ANSWERS.length)]);
    setGuesses([]);
    setCurrent("");
    setFinished(false);
    setNotice("Yeni kelime hazır. Bol şans!");
    setRound((v) => v + 1);
  };

  const rows = Array.from({ length: 6 }, (_, r) =>
    r < guesses.length ? guesses[r] : r === guesses.length ? current : ""
  );
  const statusFor = (word, i) =>
    word[i] === answer[i] ? "correct" : answer.includes(word[i]) ? "present" : "absent";
  const keyboard = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  return (
    <div className="real-card glass-text mx-auto w-full max-w-xl rounded-3xl p-4 text-white sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold tracking-[.25em] text-violet-300">
            FARUK OS • MİNİ OYUN
          </span>
          <h3 className="mt-1 text-2xl font-bold">5 Harf</h3>
          <p className="mt-1 text-xs text-white/90">Kelimeyi bulmak için 6 hakkın var.</p>
        </div>
        <div className="rounded-2xl border border-white/35 bg-black/35 px-3 py-2 text-center">
          <div className="text-xl font-bold tabular-nums">{Math.max(0, 6 - guesses.length)}</div>
          <div className="text-[9px] uppercase tracking-wider text-white/80">Kalan hak</div>
        </div>
      </div>

      <div
        className="mx-auto grid w-full max-w-[310px] grid-cols-5 gap-1.5 sm:gap-2"
        aria-label="Kelime tahmin tahtası"
      >
        {rows.map((word, r) => (
          <React.Fragment key={`${round}-${r}`}>
            {Array.from({ length: 5 }, (_, i) => {
              const filled = !!word[i];
              const locked = r < guesses.length;
              const status = locked ? statusFor(word, i) : "empty";
              return (
                <div
                  key={i}
                  className={`flex aspect-square items-center justify-center rounded-lg border text-xl font-black sm:rounded-xl sm:text-2xl ${
                    status === "correct"
                      ? "border-emerald-300/80 bg-emerald-500/85"
                      : status === "present"
                      ? "border-amber-300/80 bg-amber-500/85"
                      : status === "absent"
                      ? "border-white/30 bg-black/50 text-white/75"
                      : "border-white/35 bg-white/5"
                  } ${filled && !locked ? "border-violet-300/90 bg-violet-500/30" : ""}`}
                >
                  {word[i] || ""}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <p
        aria-live="polite"
        className="my-4 min-h-10 rounded-xl border border-white/30 bg-black/35 px-3 py-2 text-center text-xs leading-6 text-white"
      >
        {notice}
      </p>

      <div className="mx-auto w-full max-w-[390px] space-y-1.5">
        {keyboard.map((row, i) => (
          <div key={row} className="flex justify-center gap-1">
            {[...row].map((ch) => (
              <button
                key={ch}
                onClick={() => addLetter(ch)}
                className={`h-10 min-w-0 flex-1 rounded-md border border-white/30 text-xs font-bold cursor-pointer sm:h-11 ${
                  keyStatus[ch] === "correct"
                    ? "bg-emerald-500/85 text-white"
                    : keyStatus[ch] === "present"
                    ? "bg-amber-500/85 text-white"
                    : keyStatus[ch] === "absent"
                    ? "bg-black/50 text-white/50"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {ch}
              </button>
            ))}
            {i === 2 && (
              <>
                <button
                  onClick={removeLetter}
                  className="rounded-md border border-white/30 bg-white/10 px-2 text-[10px] font-bold cursor-pointer"
                >
                  ⌫
                </button>
                <button
                  onClick={submit}
                  className="rounded-md border border-violet-300/60 bg-violet-500/85 px-2 text-[10px] font-bold cursor-pointer"
                >
                  GİR
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {finished && (
        <button
          onClick={reset}
          className="mt-5 w-full rounded-xl border border-violet-300/60 bg-violet-500/85 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-500 cursor-pointer"
        >
          Yeni Kelime Oyna ↻
        </button>
      )}
      <p className="mt-4 text-center text-[10px] text-white/85">
        Yeşil: doğru harf ve yer • Sarı: kelimede var • Gri: kelimede yok
      </p>
    </div>
  );
};

// Xterm.js Gerçek Terminal Bileşeni
const FarukTerminal = ({ onOpenFolderById, onActivateGravity }) => {
  const containerRef = useRef(null);
  const termRef = useRef(null);
  const onOpenRef = useRef(onOpenFolderById);
  const onGravityRef = useRef(onActivateGravity);
  const [matrixSkin, setMatrixSkin] = useState(false);

  useEffect(() => {
    onOpenRef.current = onOpenFolderById;
    onGravityRef.current = onActivateGravity;
  }, [onOpenFolderById, onActivateGravity]);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.options.theme = {
        background: "#050a08",
        foreground: matrixSkin ? "#4ade80" : "#e2e8f0",
        cursor: matrixSkin ? "#4ade80" : "#38bdf8",
        selectionBackground: "rgba(56, 189, 248, 0.3)",
      };
    }
  }, [matrixSkin]);

  useEffect(() => {
    if (!containerRef.current) return;

    const term = new XTerm({
      cursorBlink: true,
      fontSize: 13,
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      theme: {
        background: "#050a08",
        foreground: "#e2e8f0",
        cursor: "#38bdf8",
        selectionBackground: "rgba(56, 189, 248, 0.3)",
      },
    });
    termRef.current = term;

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(containerRef.current);
    fitAddon.fit();

    const handleResize = () => {
      try {
        fitAddon.fit();
      } catch {}
    };
    window.addEventListener("resize", handleResize);

    const prompt = () => term.write("\r\n\x1b[1;36mfaruk@os\x1b[0m:\x1b[1;33m~\x1b[0m$ ");

    term.writeln("\x1b[1;32mFaruk OS Terminal v3.1\x1b[0m — Gerçek Komut Satırı");
    term.writeln("Kullanılabilir komutları görmek için \x1b[1;33mhelp\x1b[0m yazıp Enter'a bas.");
    prompt();

    let buffer = "";

    const runCommand = (rawCmd) => {
      const cmd = rawCmd.trim().toLowerCase();
      if (!cmd) return;

      if (cmd === "help") {
        term.writeln("\r\n\x1b[1;36mKomutlar:\x1b[0m");
        term.writeln("  \x1b[33mwhoami\x1b[0m     -> Faruk Köçer özet profili");
        term.writeln("  \x1b[33mkariyer\x1b[0m    -> Kariyer penceresini açar");
        term.writeln("  \x1b[33mfilmler\x1b[0m    -> Sinema akışını açar");
        term.writeln("  \x1b[33mmuzik\x1b[0m      -> Müzik arşivini açar");
        term.writeln("  \x1b[33mgravity\x1b[0m    -> Masaüstünde 2D yerçekimini başlatır!");
        term.writeln("  \x1b[33mmatrix\x1b[0m     -> Matrix fosfor temasını açar/kapatır");
        term.writeln("  \x1b[33mclear\x1b[0m      -> Ekranı temizler");
      } else if (cmd === "whoami") {
        term.writeln("\r\n\x1b[1;32mMuhammed Faruk Köçer\x1b[0m");
        term.writeln("• Otomasyon Teknikeri @ Vegevital Tarım A.Ş. (İzmir)");
        term.writeln("• İÜC Kontrol ve Otomasyon Teknolojisi Mezunu");
        term.writeln("• Uzmanlık: PLC (TIA Portal), SCADA, VFD Sürücüler, Akıllı Sera");
      } else if (cmd === "kariyer") {
        term.writeln("\r\nKariyer penceresi açılıyor...");
        setTimeout(() => onOpenRef.current?.("kariyer"), 350);
      } else if (cmd === "filmler") {
        term.writeln("\r\nSinema arşivi açılıyor...");
        setTimeout(() => onOpenRef.current?.("filmler"), 350);
      } else if (cmd === "muzik" || cmd === "muzikler") {
        term.writeln("\r\nMüzik koleksiyonu açılıyor...");
        setTimeout(() => onOpenRef.current?.("muzikler"), 350);
      } else if (cmd === "gravity" || cmd === "yercekimi") {
        term.writeln("\r\n\x1b[1;35m2D Yerçekimi motoru devreye alınıyor...\x1b[0m");
        setTimeout(() => onGravityRef.current?.(), 400);
      } else if (cmd === "matrix") {
        setMatrixSkin((v) => !v);
        term.writeln("\r\n\x1b[1;32mMatrix modu değiştirildi.\x1b[0m");
      } else if (cmd === "clear") {
        term.clear();
      } else {
        term.writeln(`\r\n\x1b[31mKomut bulunamadı:\x1b[0m ${cmd} (Yardım için 'help' yaz)`);
      }
    };

    const disposable = term.onData((data) => {
      for (let i = 0; i < data.length; i++) {
        const ch = data[i];
        const code = ch.charCodeAt(0);

        if (ch === "\r") {
          runCommand(buffer);
          buffer = "";
          prompt();
        } else if (ch === "\u007F" || ch === "\b") {
          if (buffer.length > 0) {
            buffer = buffer.slice(0, -1);
            term.write("\b \b");
          }
        } else if (ch === "\u0003") {
          buffer = "";
          term.write("^C");
          prompt();
        } else if (code >= 32 && code !== 127) {
          buffer += ch;
          term.write(ch);
        }
      }
    });

    setTimeout(() => {
      try {
        fitAddon.fit();
        term.focus();
      } catch {}
    }, 50);

    return () => {
      disposable.dispose();
      window.removeEventListener("resize", handleResize);
      term.dispose();
      termRef.current = null;
    };
  }, []);

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-lime-200/90">
        <span>İpucu: Buraya tıklayıp klavyeden komut yazabilirsin.</span>
        <div className="flex gap-1.5">
          {["help", "whoami", "gravity", "matrix"].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => termRef.current?.focus()}
              className="rounded-md border border-lime-400/35 bg-lime-400/10 px-2 py-0.5 font-mono text-[11px] cursor-pointer"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div
        ref={containerRef}
        onClick={() => termRef.current?.focus()}
        className="min-h-[340px] flex-1 overflow-hidden rounded-2xl border border-lime-400/35 bg-[#050a08] p-3 shadow-2xl"
      />
    </div>
  );
};

// Matter.js 2D Yerçekimi / Fizik Motoru Katmanı (Mobil Dokunmatik & Fare Uyumlu)
const PhysicsDesktopOverlay = ({ items, initialRects, onExit, onOpenFolder }) => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || initialRects.length === 0) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const engine = Matter.Engine.create();
    engine.gravity.y = 0.78;

    const wallThickness = 120;
    const walls = [
      Matter.Bodies.rectangle(width / 2, height + wallThickness / 2 - 12, width * 2, wallThickness, {
        isStatic: true,
        restitution: 0.62,
      }),
      Matter.Bodies.rectangle(width / 2, -wallThickness / 2 + 42, width * 2, wallThickness, {
        isStatic: true,
      }),
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true,
        restitution: 0.62,
      }),
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true,
        restitution: 0.62,
      }),
    ];

    const bodies = initialRects.map((rect) =>
      Matter.Bodies.rectangle(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        rect.width,
        rect.height,
        {
          restitution: 0.68,
          friction: 0.12,
          frictionAir: 0.008,
          chamfer: { radius: 22 },
        }
      )
    );

    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.22,
        render: { visible: false },
      },
    });

    Matter.Composite.add(engine.world, [...walls, ...bodies, mouseConstraint]);

    let animId;
    const update = () => {
      Matter.Engine.update(engine, 1000 / 60);
      bodies.forEach((body, idx) => {
        const el = cardRefs.current[idx];
        const rect = initialRects[idx];
        if (el && rect) {
          const x = body.position.x - rect.width / 2;
          const y = body.position.y - rect.height / 2;
          el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`;
        }
      });
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, [initialRects]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-25 touch-none overflow-hidden select-none">
      <div className="fixed top-14 left-1/2 z-30 flex w-[92vw] max-w-md -translate-x-1/2 items-center justify-between gap-2 rounded-full border border-amber-300/60 bg-black/80 px-4 py-2 text-xs text-white shadow-2xl">
        <div className="flex items-center gap-2 min-w-0">
          <Orbit className="h-4 w-4 shrink-0 animate-spin text-amber-300" />
          <span className="truncate">2D Yerçekimi — Kartları tutup fırlat!</span>
        </div>
        <button
          onClick={onExit}
          className="shrink-0 rounded-full bg-amber-400 px-3.5 py-1 text-[11px] font-bold text-black transition hover:bg-amber-300 cursor-pointer"
        >
          Toparla
        </button>
      </div>

      {items.map((item, idx) => {
        const Icon = item.icon;
        const rect = initialRects[idx] || { width: 120, height: 120 };
        return (
          <div
            key={`phys-${item.id}`}
            ref={(el) => (cardRefs.current[idx] = el)}
            onDoubleClick={() => {
              if (!item.isGravityAction) onOpenFolder(item);
            }}
            style={{
              width: rect.width,
              height: rect.height,
              left: 0,
              top: 0,
            }}
            className="real-folder real-folder-night glass-text absolute flex cursor-grab flex-col items-center justify-center rounded-3xl p-3 active:cursor-grabbing"
          >
            <div
              className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} border border-white/45`}
            >
              <Icon className={`h-6 w-6 ${item.iconColor}`} />
            </div>
            <span className="mt-2 text-center text-xs font-bold text-white">{item.title}</span>
          </div>
        );
      })}
    </div>
  );
};

const SnowfallCanvas = ({ boostSnow }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const baseCount = width < 640 ? 45 : 75;
    const count = boostSnow ? baseCount * 2 : baseCount;
    const flakes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.2 + Math.random() * 2.4,
      speedY: (0.6 + Math.random() * 1.4) * (boostSnow ? 1.55 : 1),
      drift: Math.random() * Math.PI * 2,
      alpha: 0.35 + Math.random() * 0.55,
    }));

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.y += f.speedY;
        f.drift += 0.015;
        f.x += Math.sin(f.drift) * (boostSnow ? 0.9 : 0.45);

        if (f.y > height) {
          f.y = -5;
          f.x = Math.random() * width;
        }
        if (f.x > width) f.x = 0;
        if (f.x < 0) f.x = width;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${f.alpha})`;
        ctx.fill();
      }
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [boostSnow]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[5] pointer-events-none block" />;
};

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
        <span className="glass-text text-xs text-white/95">
          Sağa kaydırarak veya okları kullanarak gezebilirsin → ({items.length} Yapım)
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="rounded-xl border border-white/40 bg-white/10 p-2 text-white transition hover:bg-white/20 cursor-pointer"
            title="Sola Kaydır"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="rounded-xl border border-white/40 bg-white/10 p-2 text-white transition hover:bg-white/20 cursor-pointer"
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
            className="real-card glass-text snap-start shrink-0 w-[85vw] sm:w-[370px] flex flex-col justify-between overflow-hidden rounded-2xl text-white"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <span
                  className={`absolute top-3 left-3 rounded-full border border-white/35 bg-black/55 px-3 py-1 text-xs font-semibold ${
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
                  } border border-white/25 bg-black/30 p-3 text-xs sm:text-sm italic text-white`}
                >
                  <Quote className="inline h-3.5 w-3.5 mr-1.5 opacity-75" />
                  "{item.quote}"
                </blockquote>

                <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-white/95">
                  {item.note}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InstagramMovieFeed = ({ items, soundFx }) => {
  const [likedMovies, setLikedMovies] = useState(() => {
    try {
      const saved = window.localStorage.getItem("farukos-liked-movies");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [heartBurst, setHeartBurst] = useState(null);
  const [copiedQuote, setCopiedQuote] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Tümü");

  useEffect(() => {
    try {
      window.localStorage.setItem("farukos-liked-movies", JSON.stringify(likedMovies));
    } catch {}
  }, [likedMovies]);

  const toggleLike = (title, forceLike = false) => {
    playClickSound(soundFx);
    setLikedMovies((prev) => ({
      ...prev,
      [title]: forceLike ? true : !prev[title],
    }));
    if (forceLike) {
      setHeartBurst(title);
      setTimeout(() => setHeartBurst(null), 650);
    }
  };

  const handleCopyQuote = (title, quote) => {
    playClickSound(soundFx);
    navigator.clipboard?.writeText(`"${quote}" — ${title}`);
    setCopiedQuote(title);
    setTimeout(() => setCopiedQuote(null), 1800);
  };

  const filterOptions = ["Tümü", "Favorilerim", "Nolan", "Bilim Kurgu", "Gizem / Gerilim"];

  const filteredItems = items.filter((item) => {
    if (activeFilter === "Tümü") return true;
    if (activeFilter === "Favorilerim") return !!likedMovies[item.title];
    if (activeFilter === "Nolan") return item.tag.includes("Christopher Nolan");
    if (activeFilter === "Bilim Kurgu") return item.tag.includes("Bilim Kurgu");
    if (activeFilter === "Gizem / Gerilim")
      return item.tag.includes("Gizem") || item.tag.includes("Gerilim") || item.tag.includes("Korku");
    return true;
  });

  return (
    <div className="mx-auto max-w-xl space-y-5 pb-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {filterOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClickSound(soundFx);
                setActiveFilter(cat);
              }}
              className={`glass-text rounded-full px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                activeFilter === cat
                  ? "border border-indigo-300/70 bg-indigo-500/35 text-white shadow"
                  : "border border-white/25 bg-white/10 text-white/90 hover:bg-white/20"
              }`}
            >
              {cat}
              {cat === "Favorilerim" && Object.values(likedMovies).filter(Boolean).length > 0 && (
                <span className="ml-1.5 rounded-full bg-rose-500/85 px-1.5 py-0.2 text-[10px]">
                  {Object.values(likedMovies).filter(Boolean).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <a
          href="https://boxd.it/nouvT"
          target="_blank"
          rel="noreferrer"
          className="glass-text inline-flex items-center gap-1.5 rounded-full border border-indigo-300/50 bg-indigo-500/35 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-500/60"
        >
          <span>Letterboxd</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {filteredItems.length === 0 ? (
        <div className="real-card glass-text rounded-3xl p-8 text-center text-sm text-white">
          Henüz favorilediğin film yok. Kartlara çift tıklayarak veya kalbe basarak ekleyebilirsin.
        </div>
      ) : (
        filteredItems.map((item, idx) => {
          const isLiked = !!likedMovies[item.title];
          return (
            <article
              key={item.title}
              className="real-card glass-text overflow-hidden rounded-3xl text-white transition-all duration-300"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/20">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-indigo-300/55 bg-indigo-500/30 text-xs font-bold text-indigo-100">
                    {idx + 1}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-white">{item.title}</h3>
                    <p className="truncate text-[11px] text-white/85">{item.tag}</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/90">
                  Arşiv #{idx + 1}
                </span>
              </div>

              <div
                onDoubleClick={() => toggleLike(item.title, true)}
                className={`relative aspect-[16/10] w-full cursor-pointer select-none overflow-hidden bg-gradient-to-br ${item.gradient}`}
                title="Beğenmek için çift tıkla"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <AnimatePresence>
                  {heartBurst === item.title && (
                    <motion.div
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      exit={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.45 }}
                      className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    >
                      <Heart className="h-20 w-20 fill-rose-500 text-rose-400 drop-shadow-2xl" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between px-4 pt-3 pb-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleLike(item.title)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold transition hover:bg-white/20 cursor-pointer"
                  >
                    <Heart
                      className={`h-4 w-4 transition ${
                        isLiked ? "fill-rose-500 text-rose-500 scale-110" : "text-white"
                      }`}
                    />
                    <span>{isLiked ? "Beğenildi" : "Beğen"}</span>
                  </button>

                  <button
                    onClick={() => handleCopyQuote(item.title, item.quote)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20 cursor-pointer"
                  >
                    {copiedQuote === item.title ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-300" />
                        <span className="text-emerald-200">Replik Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Repliği Kopyala</span>
                      </>
                    )}
                  </button>
                </div>

                <span className="text-[10px] text-white/80">Çift tıkla ❤️</span>
              </div>

              <div className="px-4 pb-4 pt-2 space-y-2.5">
                <blockquote className="rounded-xl border-l-4 border-indigo-400 border border-white/20 bg-black/30 px-3 py-2 text-xs sm:text-sm italic text-white">
                  <Quote className="inline h-3.5 w-3.5 mr-1.5 opacity-75" />
                  "{item.quote}"
                </blockquote>

                <p className="text-xs sm:text-sm leading-relaxed text-white">
                  <span className="font-bold text-white mr-1.5">farukkocer</span>
                  {item.note}
                </p>
              </div>
            </article>
          );
        })
      )}
    </div>
  );
};

export default function App() {
  const [entered, setEntered] = useState(false);
  const [activeFolder, setActiveFolder] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [now, setNow] = useState(new Date());
  const [themeMode, setThemeMode] = useState("night");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [soundFx] = useState(true);

  const [islandOpen, setIslandOpen] = useState(false);
  const [boostSnow, setBoostSnow] = useState(false);
  const [zenMode, setZenMode] = useState(false);

  const [gravityMode, setGravityMode] = useState(false);
  const [initialPhysicsRects, setInitialPhysicsRects] = useState([]);
  const folderCardRefs = useRef([]);

  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState("");
  const [randomPick, setRandomPick] = useState(null);

  const [musicFilter, setMusicFilter] = useState("Tümü");
  const [musicSearch, setMusicSearch] = useState("");
  const [copiedMail, setCopiedMail] = useState(false);

  const [noteText, setNoteText] = useState("");
  const [noteStatus, setNoteStatus] = useState("idle");
  const [noteErrorMsg, setNoteErrorMsg] = useState("");

  const howlRef = useRef(null);
  const soundIdRef = useRef(null);
  const fadeTimerRef = useRef(null);
  const modalScrollRef = useRef(null);
  const modalContentRef = useRef(null);

  useEffect(() => {
    const sound = new Howl({
      src: ["/muzik.mp3"],
      loop: true,
      volume: 0.35,
      html5: true,
    });
    howlRef.current = sound;
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      sound.unload();
    };
  }, []);

  useEffect(() => {
    if (entered && !zenMode && !gravityMode) {
      gsap.fromTo(
        ".desktop-folder-card",
        { y: 22, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: "back.out(1.4)",
          clearProps: "transform",
        }
      );
    }
  }, [entered, zenMode, gravityMode]);

  useEffect(() => {
    if (!activeFolder || activeFolder.id === "terminal") return;
    if (!modalScrollRef.current || !modalContentRef.current) return;

    const lenis = new Lenis({
      wrapper: modalScrollRef.current,
      content: modalContentRef.current,
      duration: 1.05,
      smoothWheel: true,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [activeFolder, activeTab]);

  useEffect(() => {
    document.title = "Faruk OS — Kişisel Dijital Masaüstü";
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem("farukos-theme-v2");
      if (savedTheme === "day" || savedTheme === "night") {
        setThemeMode(savedTheme);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("farukos-theme-v2", themeMode);
    } catch {}
  }, [themeMode]);

  useEffect(() => {
    const onGlobalKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        playClickSound(soundFx);
        setSpotlightOpen((v) => !v);
        setSpotlightQuery("");
        return;
      }

      if (event.key === "Escape") {
        if (spotlightOpen) setSpotlightOpen(false);
        else if (islandOpen) setIslandOpen(false);
        else if (activeFolder) closeFolder();
        else if (gravityMode) setGravityMode(false);
        return;
      }

      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || activeFolder?.id === "terminal") return;

      if (!activeFolder && !spotlightOpen && entered && /^[1-9]$/.test(event.key)) {
        const idx = Number(event.key) - 1;
        if (FOLDERS[idx]) openFolder(FOLDERS[idx]);
      }
    };
    window.addEventListener("keydown", onGlobalKey);
    return () => window.removeEventListener("keydown", onGlobalKey);
  }, [activeFolder, islandOpen, spotlightOpen, entered, soundFx, gravityMode]);

  const startMusicSmoothly = () => {
    const sound = howlRef.current;
    if (!sound) return;
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }

    if (soundIdRef.current !== null && sound.playing(soundIdRef.current)) {
      const cur = sound.volume(soundIdRef.current);
      sound.fade(cur, 0.35, 450, soundIdRef.current);
      setMusicPlaying(true);
      return;
    }

    const id = sound.play();
    soundIdRef.current = id;
    sound.volume(0.12, id);
    if (sound.playing(id)) {
      sound.fade(0.12, 0.35, 850, id);
    } else {
      sound.once(
        "play",
        () => {
          sound.fade(0.12, 0.35, 850, id);
        },
        id
      );
    }
    setMusicPlaying(true);
  };

  const stopMusicSmoothly = () => {
    const sound = howlRef.current;
    if (!sound) return;
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }

    const id = soundIdRef.current;
    if (id !== null && sound.playing(id)) {
      const cur = sound.volume(id);
      sound.fade(cur, 0, 320, id);
      fadeTimerRef.current = setTimeout(() => {
        sound.pause(id);
      }, 340);
    } else {
      sound.pause();
    }
    setMusicPlaying(false);
  };

  const handleEnterSystem = () => {
    playClickSound(true);
    setEntered(true);
    startMusicSmoothly();
  };

  const toggleMusic = () => {
    playClickSound(soundFx);
    if (musicPlaying) {
      stopMusicSmoothly();
    } else {
      startMusicSmoothly();
    }
  };

  const activateGravity = () => {
    playClickSound(soundFx);
    setIslandOpen(false);
    setSpotlightOpen(false);
    setActiveFolder(null);
    setZenMode(false);

    requestAnimationFrame(() => {
      const rects = DESKTOP_ITEMS.map((_, i) => {
        const el = folderCardRefs.current[i];
        if (el) {
          const r = el.getBoundingClientRect();
          return { left: r.left, top: r.top, width: r.width || 125, height: r.height || 125 };
        }
        return {
          left: 60 + (i % 5) * 140,
          top: 250 + Math.floor(i / 5) * 140,
          width: 125,
          height: 125,
        };
      });
      setInitialPhysicsRects(rects);
      setGravityMode(true);
    });
  };

  const startSystemTour = () => {
    playClickSound(soundFx);
    setIslandOpen(false);
    setZenMode(false);
    setGravityMode(false);

    setTimeout(() => {
      const tour = driver({
        showProgress: true,
        nextBtnText: "İleri →",
        prevBtnText: "← Geri",
        doneBtnText: "Keşfet ✨",
        steps: [
          {
            element: "#tour-island",
            popover: {
              title: "Dinamik Kontrol Merkezi",
              description:
                "Buradan tipi modunu, 2D yerçekimi fiziğini, rastgele film/müzik önerisini ve arka plan müziğini yönetebilirsin.",
            },
          },
          {
            element: "#tour-spotlight",
            popover: {
              title: "Spotlight Hızlı Arama (Ctrl + K)",
              description:
                "Klavyeden Ctrl+K yaparak tüm filmler, sanatçılar ve klasörler arasında anında arama yapabilirsin.",
            },
          },
          {
            element: "#tour-tree-card",
            popover: {
              title: "2027 Dilek Ağacı & Şans Kurabiyesi",
              description:
                "Ağaca tıklayarak yeni yıl dileği seçebilir veya şans kurabiyeni kırıp konfeti eşliğinde mesajını okuyabilirsin.",
            },
          },
          {
            element: "#tour-folders",
            popover: {
              title: "Uygulamalar, Terminal & 2D Yerçekimi",
              description:
                "Kariyerim, sinema akışım, müzik arşivim, kelime oyunu, Terminal ve masaüstündeki Yerçekimi (2D Fizik) butonu burada!",
            },
          },
        ],
      });
      tour.drive();
    }, 150);
  };

  const handleDesktopItemClick = (item) => {
    if (!item) return;
    if (item.isGravityAction) {
      activateGravity();
      return;
    }
    openFolder(item);
  };

  const openFolder = (folder) => {
    if (!folder || folder.isGravityAction) return;
    playClickSound(soundFx);
    window.location.hash = folder.id;
    setActiveFolder(folder);
    setActiveTab(0);
    setIslandOpen(false);
    setSpotlightOpen(false);
  };

  const closeFolder = () => {
    playClickSound(soundFx);
    window.history.pushState("", document.title, window.location.pathname);
    setActiveFolder(null);
  };

  const pickRandomSuggestion = () => {
    playClickSound(soundFx);
    const isMovie = Math.random() > 0.45;
    if (isMovie) {
      const m = MOVIES_DATA[Math.floor(Math.random() * MOVIES_DATA.length)];
      setRandomPick({ type: "Film Önerisi", title: m.title, detail: m.tag, folderId: "filmler" });
    } else {
      const a = MUSIC_DATA[Math.floor(Math.random() * MUSIC_DATA.length)];
      setRandomPick({
        type: "Sanatçı Önerisi",
        title: a.artist,
        detail: `${a.genre} • ${a.songs[0]}`,
        folderId: "muzikler",
      });
    }
  };

  const handleCopyMail = () => {
    playClickSound(soundFx);
    navigator.clipboard?.writeText("kocerfaruk27@gmail.com");
    setCopiedMail(true);
    setTimeout(() => setCopiedMail(false), 2200);
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

  const isDay = themeMode === "day";

  const formattedTime = now.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = now.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });

  const getSpotlightResults = () => {
    const q = spotlightQuery.trim().toLocaleLowerCase("tr-TR");
    if (!q) {
      return DESKTOP_ITEMS.map((item) => ({
        label: item.title,
        sub: item.subtitle,
        badge: item.isGravityAction ? "2D Fizik" : "Klasör",
        onSelect: () => handleDesktopItemClick(item),
      }));
    }

    const results = [];

    if ("yercekimi".includes(q) || "gravity".includes(q) || "fizik".includes(q) || "2d".includes(q)) {
      results.push({
        label: "Yerçekimi Modunu Başlat (2D)",
        sub: "Matter.js 2D fizik motoru ile masaüstü kartlarını düşür",
        badge: "2D Fizik",
        onSelect: activateGravity,
      });
    }

    FOLDERS.forEach((f) => {
      if (
        f.title.toLocaleLowerCase("tr-TR").includes(q) ||
        f.subtitle.toLocaleLowerCase("tr-TR").includes(q)
      ) {
        results.push({
          label: f.title,
          sub: f.subtitle,
          badge: "Klasör",
          onSelect: () => openFolder(f),
        });
      }
    });

    MOVIES_DATA.forEach((m) => {
      if (
        m.title.toLocaleLowerCase("tr-TR").includes(q) ||
        m.tag.toLocaleLowerCase("tr-TR").includes(q)
      ) {
        results.push({
          label: m.title,
          sub: m.tag,
          badge: "Film",
          onSelect: () => openFolder(FOLDERS.find((f) => f.id === "filmler")),
        });
      }
    });

    SERIES_DATA.forEach((s) => {
      if (
        s.title.toLocaleLowerCase("tr-TR").includes(q) ||
        s.tag.toLocaleLowerCase("tr-TR").includes(q)
      ) {
        results.push({
          label: s.title,
          sub: s.tag,
          badge: "Dizi",
          onSelect: () => openFolder(FOLDERS.find((f) => f.id === "diziler")),
        });
      }
    });

    MUSIC_DATA.forEach((a) => {
      if (
        a.artist.toLocaleLowerCase("tr-TR").includes(q) ||
        a.songs.some((song) => song.toLocaleLowerCase("tr-TR").includes(q))
      ) {
        results.push({
          label: a.artist,
          sub: `${a.genre} • ${a.songs.slice(0, 2).join(", ")}`,
          badge: "Müzik",
          onSelect: () => {
            setMusicSearch(a.artist);
            openFolder(FOLDERS.find((f) => f.id === "muzikler"));
          },
        });
      }
    });

    return results.slice(0, 8);
  };

  const renderFolderContent = () => {
    if (!activeFolder) return null;

    if (activeFolder.id === "terminal") {
      return (
        <FarukTerminal
          onOpenFolderById={(id) => openFolder(FOLDERS.find((f) => f.id === id))}
          onActivateGravity={activateGravity}
        />
      );
    }

    if (activeFolder.id === "kariyer") {
      if (activeTab === 0) {
        return (
          <div className="space-y-6">
            <div className="real-card glass-text rounded-2xl p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/50 bg-amber-400/20 px-3 py-1 text-xs font-medium text-amber-200">
                    <Cpu className="h-3.5 w-3.5" /> Otomasyon Teknikeri
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-white">
                    Endüstriyel Otomasyon & Akıllı Tarım Teknolojileri
                  </h3>
                  <p className="mt-1 text-sm text-white/90">
                    Vegevital Tarım A.Ş. • İstanbul Üniversitesi-Cerrahpaşa Mezunu
                  </p>
                </div>
                <a
                  href="https://www.linkedin.com/in/farukkocer/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-[#0A66C2]/85 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0A66C2]"
                >
                  <span>LinkedIn Profilim</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <p className="mt-5 text-sm sm:text-base leading-relaxed text-white">
                İstanbul Üniversitesi-Cerrahpaşa <strong>Kontrol ve Otomasyon Teknolojisi</strong> mezunuyum.
                Şu anda <strong>Vegevital Tarım A.Ş.</strong> bünyesinde Otomasyon Teknikeri olarak akıllı sera
                sistemleri, iklimlendirme ve sulama otomasyonu, SCADA kontrol yazılımları, saha sensör izleme ve
                CO₂ iklim kontrol ünitelerinin yönetimi üzerine çalışıyorum.
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/95">
                Üniversite eğitimim ve <strong>Yılmaz Redüktör</strong> stajım sırasında edindiğim PLC programlama
                (TIA Portal), AC motor sürücüleri (VFD/İnvertör) ve güç elektroniği tecrübemi, tarım teknolojileri
                ile endüstriyel otomasyonun kesişim noktasında sahaya uyguluyorum.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="real-card glass-text rounded-2xl p-4 text-white">
                <Sprout className="h-6 w-6 text-emerald-300" />
                <h4 className="mt-2 font-semibold">Akıllı Sera Sistemleri</h4>
                <p className="mt-1 text-xs text-white/90">
                  İklim kontrolü, CO₂ dozajlama, sulama otomasyonu ve gerçek zamanlı sensör takibi.
                </p>
              </div>
              <div className="real-card glass-text rounded-2xl p-4 text-white">
                <Cpu className="h-6 w-6 text-amber-300" />
                <h4 className="mt-2 font-semibold">PLC & SCADA</h4>
                <p className="mt-1 text-xs text-white/90">
                  Siemens TIA Portal tabanlı kontrol mimarileri ve endüstriyel saha izleme ekranları.
                </p>
              </div>
              <div className="real-card glass-text rounded-2xl p-4 text-white">
                <Briefcase className="h-6 w-6 text-sky-300" />
                <h4 className="mt-2 font-semibold">Sürücü & Güç Elektroniği</h4>
                <p className="mt-1 text-xs text-white/90">
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
            <div className="real-card glass-text rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  Mevcut Görev • 2026 - Günümüz
                </span>
                <span className="rounded-full border border-emerald-300/45 bg-emerald-400/20 px-2.5 py-0.5 text-xs text-emerald-200">
                  Aktif
                </span>
              </div>
              <h4 className="mt-1 text-lg font-bold">Otomasyon Teknikeri — Vegevital Tarım A.Ş.</h4>
              <p className="mt-2 text-sm text-white/95">
                Modern sera tesislerinde iklimlendirme, sulama otomasyonu, SCADA kontrol sistemleri, CO₂ üniteleri ve saha sensör ağlarının kesintisiz yönetimi.
              </p>
            </div>

            <div className="real-card glass-text rounded-2xl p-5 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Staj Deneyimi • Ağustos 2026
              </span>
              <h4 className="mt-1 text-lg font-bold">
                Endüstriyel Otomasyon Stajyeri — Yılmaz Redüktör
              </h4>
              <p className="mt-2 text-sm text-white/95">
                AC motor sürücüleri (VFD/İnvertör), güç elektroniği testleri, Modbus RTU haberleşme ve PLC/HMI pano entegrasyonu üzerine saha uygulaması.
              </p>
            </div>

            <div className="real-card glass-text rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-300">
                <GraduationCap className="h-4 w-4" /> Eğitim
              </div>
              <h4 className="mt-1 text-lg font-bold">İstanbul Üniversitesi-Cerrahpaşa</h4>
              <p className="mt-1 text-sm text-white/95">
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
            <div key={skill} className="real-card glass-text rounded-xl px-4 py-3 text-sm font-medium text-white">
              {skill}
            </div>
          ))}
        </div>
      );
    }

    if (activeFolder.id === "projelerim") {
      return (
        <div className="space-y-6">
          <div className="real-card glass-text flex flex-col items-center justify-center rounded-2xl p-8 text-center text-white">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/50 bg-cyan-400/20">
              <Hourglass className="h-8 w-8 animate-pulse text-cyan-300" />
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-cyan-300/45 bg-cyan-400/20 px-3.5 py-1 text-xs font-semibold text-cyan-200">
              <Wrench className="h-3.5 w-3.5" /> Gelişim Aşamasında
            </span>
            <h3 className="mt-3 text-2xl font-bold">Yeni Projeler Çok Yakında Burada</h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/95">
              Endüstriyel otomasyon, PLC/SCADA kontrol panoları, akıllı sera sulama ve gübreleme sistemleri ile gömülü yazılım projelerimi burada yayınlamak üzere hazırlıyorum.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Sera Sulama & EC/pH Kontrol Ünitesi",
                desc: "PLC tabanlı otomatik dozajlama ve vana kontrol mimarisi.",
                status: "Tasarım & Test",
              },
              {
                title: "Gömülü Sistem & IoT Prototipleri",
                desc: "ESP32 ve sensör ağları ile uzaktan izleme modülleri.",
                status: "Geliştiriliyor",
              },
              {
                title: "Faruk OS Yeni Modüller",
                desc: "Kişisel çalışma masası için yeni interaktif araçlar.",
                status: "Yakında",
              },
            ].map((proj) => (
              <div key={proj.title} className="real-card glass-text flex flex-col justify-between rounded-2xl p-5 text-white">
                <div>
                  <span className="inline-block rounded-md border border-cyan-300/40 bg-cyan-400/20 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-200">
                    {proj.status}
                  </span>
                  <h4 className="mt-2.5 font-bold">{proj.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/90">{proj.desc}</p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[11px] text-white/80">
                  <Hourglass className="h-3.5 w-3.5 text-cyan-300" />
                  <span>Yakında eklenecek</span>
                </div>
              </div>
            ))}
          </div>

          <div className="real-card glass-text flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/45 bg-cyan-400/20 text-cyan-200">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold">Proje & İş Birliği İletişimi</h4>
                <p className="text-xs mt-0.5 text-white/90">
                  Projeler hakkında konuşmak veya ulaşmak için e-posta gönderebilirsin:{" "}
                  <a
                    href="mailto:kocerfaruk27@gmail.com"
                    className="font-semibold text-cyan-300 underline underline-offset-2"
                  >
                    kocerfaruk27@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyMail}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/35 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/20 cursor-pointer"
              >
                {copiedMail ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedMail ? "Kopyalandı" : "Adresi Kopyala"}</span>
              </button>
              <a
                href="mailto:kocerfaruk27@gmail.com"
                className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-300/55 bg-cyan-500/80 px-4 py-2 text-xs font-semibold text-white transition hover:bg-cyan-500"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Mail Gönder</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    if (activeFolder.id === "kelime") return <WordGuessGame />;

    if (activeFolder.id === "muzikler") {
      const filteredMusic = MUSIC_DATA.filter((item) => {
        const matchesCat = musicFilter === "Tümü" || item.category === musicFilter;
        const q = musicSearch.trim().toLocaleLowerCase("tr-TR");
        const matchesQuery =
          !q ||
          item.artist.toLocaleLowerCase("tr-TR").includes(q) ||
          item.genre.toLocaleLowerCase("tr-TR").includes(q) ||
          item.songs.some((s) => s.toLocaleLowerCase("tr-TR").includes(q));
        return matchesCat && matchesQuery;
      });

      return (
        <div>
          <div className="real-card glass-text mb-5 flex flex-col gap-4 rounded-2xl p-4 text-white sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="relative flex h-24 w-28 shrink-0 items-center justify-center rounded-xl border border-white/35 bg-black/40 shadow-inner">
                <div className="absolute bottom-2 h-2 w-20 rounded-full bg-black/40" />
                <div
                  className="relative h-[70px] w-[70px] rounded-full border-[5px] border-[#17151b] bg-[repeating-radial-gradient(circle,#39333d_0px,#39333d_2px,#17151b_3px,#17151b_4px)] shadow-xl"
                  style={{ animation: musicPlaying ? "spin 4s linear infinite" : "none" }}
                >
                  <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-200/50 bg-rose-500">
                    <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
                  </div>
                </div>
                <div className="absolute right-2 top-2 h-12 w-2 origin-top rotate-[25deg] rounded-full bg-gradient-to-b from-slate-200 to-slate-500 shadow" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold">Pikap • Arka Plan Müziği</h3>
                <p className="mt-1 text-xs text-white/90">
                  {musicPlaying
                    ? "Plak dönüyor, müzik çalıyor…"
                    : "Plak durdu. İstediğinde yeniden başlat."}
                </p>
                <p className="mt-1 text-[10px] text-white/80">
                  Toplam {MUSIC_DATA.length} sanatçı & grup
                </p>
              </div>
            </div>

            <button
              onClick={toggleMusic}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-300/55 bg-rose-500/75 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-rose-500 cursor-pointer"
            >
              {musicPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              <span>{musicPlaying ? "Müziği Durdur" : "Müziği Başlat"}</span>
            </button>
          </div>

          <div className="mb-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {["Tümü", "Yerli", "Yabancı"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playClickSound(soundFx);
                    setMusicFilter(cat);
                  }}
                  className={`glass-text rounded-xl px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                    musicFilter === cat
                      ? "border border-rose-300/65 bg-rose-500/35 text-white shadow-sm"
                      : "border border-white/25 bg-white/10 text-white/90 hover:bg-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/80" />
              <input
                type="text"
                value={musicSearch}
                onChange={(e) => setMusicSearch(e.target.value)}
                placeholder="Sanatçı veya şarkı ara..."
                className="w-full rounded-xl border border-white/30 bg-black/35 py-2 pl-9 pr-3 text-xs text-white placeholder-white/70 focus:border-rose-300/65 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMusic.map((item) => (
              <div
                key={item.artist}
                className="real-card glass-text group flex flex-col justify-between overflow-hidden rounded-3xl text-white transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-40 w-full overflow-hidden bg-black/35">
                    <img
                      src={item.image}
                      alt={item.artist}
                      loading="lazy"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 rounded-full border border-white/35 bg-black/55 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5 pt-3.5">
                    <span className="text-[11px] uppercase tracking-wider text-rose-200/90">
                      {item.genre}
                    </span>
                    <h4 className="mt-1 text-xl font-bold text-white">{item.artist}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-white/95">{item.vibe}</p>
                  </div>
                </div>

                <div className="border-t border-white/20 px-5 pb-5 pt-3">
                  <span className="text-[11px] font-semibold text-white/85">Öne Çıkanlar:</span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.songs.map((song) => (
                      <span
                        key={song}
                        className="rounded-lg border border-white/25 bg-white/10 px-2.5 py-1 text-xs text-white"
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

    if (activeFolder.id === "diziler") {
      return <HorizontalMediaCarousel items={SERIES_DATA} accentColor="emerald" />;
    }

    if (activeFolder.id === "filmler") {
      return <InstagramMovieFeed items={MOVIES_DATA} soundFx={soundFx} />;
    }

    if (activeFolder.id === "hakkimda") {
      return (
        <div className="space-y-6">
          <div className="real-card glass-text rounded-2xl p-6 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-white">
                <MapPin className="h-3.5 w-3.5 text-amber-300" />
                Aslen Ağrılı • İzmir'de Yaşıyor
              </span>
              <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-white">
                21 Yaşında
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/45 bg-red-500/30 px-3 py-1 text-amber-200">
                <Trophy className="h-3.5 w-3.5" /> Galatasaraylı
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold">Merhaba, ben Muhammed Faruk Köçer.</h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-white">
              21 yaşındayım, aslen Ağrılıyım. İstanbul Üniversitesi-Cerrahpaşa Kontrol ve Otomasyon Teknolojisi bölümünden mezun olduktan sonra iş sebebiyle İzmir'e yerleştim. Şu an modern sera tesislerinde otomasyon teknikeri olarak çalışıyorum.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/95">
              İşim gereği gün içinde PLC, SCADA ve saha kontrol sistemleriyle ilgileniyorum. Boş zamanlarımda ise müzik dinlemeyi, iyi filmler ve diziler izlemeyi, spor yapmayı ve Galatasaray maçlarını takip etmeyi seviyorum. Bu siteyi de hem öğrendiklerimi biriktirmek hem de sevdiğim şeyleri tek bir yerde toplamak için kurdum.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="real-card glass-text rounded-2xl p-4 text-white">
              <span className="text-xs font-semibold text-amber-300">Memleket & Şehir</span>
              <h4 className="mt-1 font-bold">Ağrı & İzmir</h4>
              <p className="mt-1 text-xs text-white/90">
                Memleketim Ağrı, üniversite yıllarım İstanbul'da geçti; şimdi ise hayatıma İzmir'de devam ediyorum.
              </p>
            </div>
            <div className="real-card glass-text rounded-2xl p-4 text-white">
              <span className="text-xs font-semibold text-amber-300">Takım</span>
              <h4 className="mt-1 font-bold">Galatasaray</h4>
              <p className="mt-1 text-xs text-white/90">
                Çocukluktan gelen sarı-kırmızı tutkusu; maç günleri benim için ayrı bir keyif.
              </p>
            </div>
            <div className="real-card glass-text rounded-2xl p-4 text-white">
              <span className="text-xs font-semibold text-sky-300">Hedef</span>
              <h4 className="mt-1 font-bold">Kendi Sistemlerimi Kurmak</h4>
              <p className="mt-1 text-xs text-white/90">
                Otomasyon ve yazılım tarafında sahada tecrübe kazanıp ileride kendi projelerimi hayata geçirmek.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-xl">
        <div className="real-card glass-text rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold">Anonim Not Bırak</h3>
          <p className="mt-1.5 text-xs sm:text-sm text-white/95">
            İsim veya e-posta yazmak zorunda değilsin. Düşünceni, bir film/şarkı önerini ya da selamını doğrudan bana iletebilirsin.
          </p>

          {noteStatus === "sent" ? (
            <div className="mt-6 flex flex-col items-center rounded-2xl border border-emerald-300/45 bg-emerald-500/25 p-6 text-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-300" />
              <h4 className="mt-3 font-bold">Mesajın Bana Ulaştı!</h4>
              <p className="mt-1 text-xs text-white">
                Notun doğrudan e-posta kutuma düştü. Teşekkürler!
              </p>
              <button
                onClick={() => setNoteStatus("idle")}
                className="mt-4 rounded-xl border border-white/35 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 cursor-pointer"
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
                className="w-full rounded-xl border border-white/30 bg-black/35 p-4 text-sm text-white placeholder-white/70 focus:border-sky-300/65 focus:outline-none"
              />

              {noteStatus === "error" && <p className="text-xs text-rose-300">{noteErrorMsg}</p>}

              <button
                type="submit"
                disabled={noteStatus === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-sky-300/50 bg-sky-500/80 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-sky-500 disabled:opacity-50 cursor-pointer"
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

  const activeTheme = activeFolder ? FOLDER_THEMES[activeFolder.id] || FOLDER_THEMES.kariyer : null;

  return (
    <div className="faruk-os relative min-h-[100svh] w-full overflow-x-hidden select-none font-sans text-white">
      <style>{`
        .faruk-os {
          isolation: isolate;
        }

        .faruk-wallpaper {
          position: fixed; inset: 0; z-index: -3;
          background-image: url('/bg.jpg');
          background-size: cover; background-position: center 54%;
          background-repeat: no-repeat;
          transform: scale(1.015);
          will-change: transform;
        }

        .glass-text {
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9), 0 0 14px rgba(0, 0, 0, 0.45);
        }

        .real-glass {
          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;
        }
        .real-glass-night {
          background: linear-gradient(130deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 26%, rgba(8,14,22,0.12) 60%, rgba(255,255,255,0.04) 100%);
          border: 1px solid rgba(255,255,255,0.28);
          border-top-color: rgba(255,255,255,0.68);
          border-left-color: rgba(255,255,255,0.50);
          box-shadow: 0 18px 42px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.52), inset 1px 0 0 rgba(255,255,255,0.24);
        }
        .real-glass-day {
          background: linear-gradient(130deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 26%, rgba(255,255,255,0.01) 60%, rgba(255,255,255,0.06) 100%);
          border: 1px solid rgba(255,255,255,0.42);
          border-top-color: rgba(255,255,255,0.82);
          border-left-color: rgba(255,255,255,0.62);
          box-shadow: 0 14px 36px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.68), inset 1px 0 0 rgba(255,255,255,0.34);
        }

        .real-folder {
          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;
        }
        .real-folder-night {
          background: linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 32%, rgba(6,12,20,0.10) 70%, rgba(255,255,255,0.05) 100%);
          border: 1px solid rgba(255,255,255,0.26);
          border-top-color: rgba(255,255,255,0.66);
          border-left-color: rgba(255,255,255,0.48);
          box-shadow: 0 12px 28px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.48);
        }
        .real-folder-night:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 35%, rgba(6,12,20,0.06) 70%, rgba(255,255,255,0.09) 100%);
          border-color: rgba(255,255,255,0.62);
          box-shadow: 0 18px 36px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.72);
        }
        .real-folder-day {
          background: linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.03) 32%, rgba(255,255,255,0.01) 70%, rgba(255,255,255,0.08) 100%);
          border: 1px solid rgba(255,255,255,0.42);
          border-top-color: rgba(255,255,255,0.80);
          border-left-color: rgba(255,255,255,0.60);
          box-shadow: 0 12px 26px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.64);
        }
        .real-folder-day:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0.03) 70%, rgba(255,255,255,0.12) 100%);
          border-color: rgba(255,255,255,0.78);
        }

        .real-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.025) 100%);
          border: 1px solid rgba(255,255,255,0.16);
          border-top-color: rgba(255,255,255,0.30);
          box-shadow: 0 14px 34px rgba(0,0,0,0.34);
        }
        .real-card:hover {
          border-color: rgba(255,255,255,0.32);
          background: linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%);
        }

        .real-dock {
          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;
          background: linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.03) 45%, rgba(8,14,22,0.14) 100%);
          border: 1px solid rgba(255,255,255,0.34);
          border-top-color: rgba(255,255,255,0.72);
          box-shadow: 0 16px 38px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.56);
        }

        .real-window {
          box-shadow: 0 32px 90px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.28);
        }
        .real-window-night {
          background: linear-gradient(145deg, #0c121b 0%, #111926 100%);
          border: 1px solid rgba(255,255,255,0.28);
        }

        .driver-popover {
          background: #0d1520 !important;
          color: #f8fafc !important;
          border: 1px solid rgba(56, 189, 248, 0.45) !important;
          border-radius: 18px !important;
          box-shadow: 0 24px 60px rgba(0,0,0,0.75) !important;
        }
        .driver-popover-title {
          color: #38bdf8 !important;
          font-weight: 700 !important;
        }
        .driver-popover-description {
          color: #e2e8f0 !important;
        }
        .driver-popover-footer button {
          background: #1e293b !important;
          color: #fff !important;
          border: 1px solid rgba(255,255,255,0.2) !important;
          text-shadow: none !important;
          border-radius: 8px !important;
        }

        button { -webkit-tap-highlight-color: transparent; }
        @media (max-width: 640px) {
          .faruk-wallpaper { background-position: 58% center; transform: none; }
        }
      `}</style>

      <AnimatePresence>{!entered && <IntroSplash onEnter={handleEnterSystem} />}</AnimatePresence>

      <div className="faruk-wallpaper" aria-hidden="true" />
      <div
        className={`fixed inset-0 z-[-2] pointer-events-none transition-all duration-1000 ${
          isDay
            ? "bg-gradient-to-b from-black/5 via-transparent to-black/15"
            : "bg-gradient-to-b from-[#060e15]/15 via-transparent to-black/28"
        }`}
        aria-hidden="true"
      />

      {entered && <SnowfallCanvas boostSnow={boostSnow} />}

      {/* Matter.js 2D Yerçekimi Modu Aktifse */}
      {gravityMode && (
        <PhysicsDesktopOverlay
          items={DESKTOP_ITEMS}
          initialRects={initialPhysicsRects}
          onExit={() => setGravityMode(false)}
          onOpenFolder={(f) => {
            setGravityMode(false);
            openFolder(f);
          }}
        />
      )}

      {/* Üst Cam Durum Çubuğu & Dinamik Ada */}
      <header className="real-glass real-glass-night glass-text relative z-20 flex items-center justify-between gap-2 border-x-0 border-t-0 border-b border-white/30 px-3 py-2 text-xs font-medium text-white sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md border border-sky-300/60 bg-sky-400/20 text-[11px] font-black text-sky-200">
            F
          </span>
          <span className="tracking-wide font-semibold">Faruk OS</span>
        </div>

        {/* Merkez Dinamik Cam Ada */}
        <div id="tour-island" className="relative">
          <button
            onClick={() => {
              playClickSound(soundFx);
              setIslandOpen((v) => !v);
            }}
            className="flex items-center gap-2.5 rounded-full border border-white/45 bg-black/25 px-3.5 py-1 text-[11px] font-medium text-white shadow-lg transition hover:border-white/75 hover:bg-black/40 cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                  musicPlaying ? "bg-emerald-400" : "bg-sky-400"
                }`}
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  musicPlaying ? "bg-emerald-400" : "bg-sky-400"
                }`}
              />
            </span>
            <span className="hidden md:inline text-white">{formattedDate}</span>
            <span className="md:hidden text-white">{formattedTime}</span>
            {musicPlaying && (
              <span className="flex items-end gap-0.5 h-3" aria-hidden="true">
                <span className="w-0.5 h-2 bg-rose-400 animate-pulse" />
                <span className="w-0.5 h-3 bg-amber-300 animate-bounce" />
                <span className="w-0.5 h-1.5 bg-emerald-300 animate-pulse" />
              </span>
            )}
          </button>

          <AnimatePresence>
            {islandOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.94 }}
                transition={{ duration: 0.18 }}
                className="real-window real-window-night glass-text absolute left-1/2 top-10 z-40 w-72 -translate-x-1/2 rounded-3xl p-4 text-white shadow-2xl sm:w-80"
              >
                <div className="flex items-center justify-between border-b border-white/25 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-sky-300" />
                    <span className="text-xs font-bold tracking-wide">Hızlı Kontrol Merkezi</span>
                  </div>
                  <span className="text-[10px] text-white/85">İzmir • Aktif</span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      playClickSound(soundFx);
                      setBoostSnow((v) => !v);
                    }}
                    className={`flex items-center gap-2 rounded-2xl border p-2.5 text-left text-xs transition cursor-pointer ${
                      boostSnow
                        ? "border-sky-300/70 bg-sky-400/25 text-white"
                        : "border-white/25 bg-black/20 text-white hover:bg-black/35"
                    }`}
                  >
                    <Sparkles className="h-4 w-4 shrink-0 text-sky-300" />
                    <div>
                      <div className="font-semibold">Tipi Modu</div>
                      <div className="text-[10px] text-white/80">{boostSnow ? "Açık" : "Normal"}</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      playClickSound(soundFx);
                      setZenMode((v) => !v);
                    }}
                    className={`flex items-center gap-2 rounded-2xl border p-2.5 text-left text-xs transition cursor-pointer ${
                      zenMode
                        ? "border-emerald-300/70 bg-emerald-400/25 text-white"
                        : "border-white/25 bg-black/20 text-white hover:bg-black/35"
                    }`}
                  >
                    <Compass className="h-4 w-4 shrink-0 text-emerald-300" />
                    <div>
                      <div className="font-semibold">Manzara</div>
                      <div className="text-[10px] text-white/80">{zenMode ? "Sade" : "Tam"}</div>
                    </div>
                  </button>

                  <button
                    onClick={activateGravity}
                    className="flex items-center gap-2 rounded-2xl border border-amber-300/40 bg-amber-400/15 p-2.5 text-left text-xs text-white transition hover:bg-amber-400/25 cursor-pointer"
                  >
                    <Orbit className="h-4 w-4 shrink-0 text-amber-300" />
                    <div>
                      <div className="font-semibold">Yerçekimi</div>
                      <div className="text-[10px] text-amber-200">2D Fizik</div>
                    </div>
                  </button>

                  <button
                    onClick={startSystemTour}
                    className="flex items-center gap-2 rounded-2xl border border-violet-300/40 bg-violet-400/15 p-2.5 text-left text-xs text-white transition hover:bg-violet-400/25 cursor-pointer"
                  >
                    <HelpCircle className="h-4 w-4 shrink-0 text-violet-300" />
                    <div>
                      <div className="font-semibold">Sistem Turu</div>
                      <div className="text-[10px] text-violet-200">Rehberi Aç</div>
                    </div>
                  </button>
                </div>

                <button
                  onClick={pickRandomSuggestion}
                  className="mt-2 flex w-full items-center justify-between rounded-2xl border border-amber-300/45 bg-amber-400/15 p-2.5 text-left text-xs text-white transition hover:bg-amber-400/25 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Shuffle className="h-4 w-4 shrink-0 text-amber-300" />
                    <span className="font-semibold">Arşivden Rastgele Öner</span>
                  </div>
                  <span className="text-[10px] text-amber-200">Film / Müzik</span>
                </button>

                {randomPick && (
                  <div
                    onClick={() => openFolder(FOLDERS.find((f) => f.id === randomPick.folderId))}
                    className="mt-2 cursor-pointer rounded-2xl border border-amber-300/50 bg-black/30 p-2.5 transition hover:bg-black/45"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-200">
                      🎲 {randomPick.type} (Açmak için tıkla)
                    </div>
                    <div className="mt-0.5 text-xs font-bold text-white">{randomPick.title}</div>
                    <div className="text-[11px] text-white/85">{randomPick.detail}</div>
                  </div>
                )}

                <div className="mt-2.5 flex items-center justify-between rounded-2xl border border-white/25 bg-black/25 px-3 py-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Radio className="h-3.5 w-3.5 text-rose-300" />
                    <span>Arka Plan Müziği</span>
                  </div>
                  <button
                    onClick={toggleMusic}
                    className="rounded-lg border border-white/35 bg-white/15 px-2.5 py-1 text-[11px] font-semibold hover:bg-white/25 cursor-pointer"
                  >
                    {musicPlaying ? "Durdur" : "Çal"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <button
            id="tour-spotlight"
            onClick={() => {
              playClickSound(soundFx);
              setSpotlightOpen(true);
              setSpotlightQuery("");
            }}
            title="Hızlı Arama (Ctrl + K)"
            className="flex items-center gap-1.5 rounded-lg border border-white/35 bg-black/20 px-2.5 py-1 text-[11px] text-white transition hover:bg-black/35 cursor-pointer"
          >
            <Search className="h-3.5 w-3.5 text-sky-300" />
            <span className="hidden lg:inline">Ara</span>
            <kbd className="hidden xl:inline-flex items-center gap-0.5 rounded border border-white/30 bg-black/25 px-1 text-[9px] text-white/90">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </button>

          <button
            onClick={() => {
              playClickSound(soundFx);
              setThemeMode((v) => (v === "day" ? "night" : "day"));
            }}
            title={isDay ? "Koyu Cam Tonu" : "Açık Cam Tonu"}
            className="flex items-center gap-1 rounded-lg border border-white/35 bg-black/20 px-2.5 py-1 text-[11px] text-amber-200 transition hover:bg-black/35 cursor-pointer"
          >
            {isDay ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            <span className="hidden md:inline">{isDay ? "Gündüz Cam" : "Gece Cam"}</span>
          </button>

          <button
            onClick={toggleMusic}
            title={musicPlaying ? "Müziği Durdur" : "Müziği Çal"}
            className="flex items-center gap-1 rounded-lg border border-white/35 bg-black/20 px-2.5 py-1 text-[11px] text-amber-200 transition hover:bg-black/35 cursor-pointer"
          >
            {musicPlaying ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{musicPlaying ? "Müzik Açık" : "Müzik Kapalı"}</span>
          </button>

          <Wifi className="hidden sm:block w-3.5 h-3.5" />
          <Battery className="hidden sm:block w-4 h-4" />
          <span className="hidden md:inline font-semibold text-white">{formattedTime}</span>
        </div>
      </header>

      {/* Spotlight Hızlı Arama Modalı (Ctrl+K) */}
      <AnimatePresence>
        {spotlightOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSpotlightOpen(false)}
            className="fixed inset-0 z-40 flex items-start justify-center bg-black/45 px-4 pt-20"
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="real-window real-window-night glass-text w-full max-w-lg overflow-hidden rounded-3xl text-white"
            >
              <div className="flex items-center gap-3 border-b border-white/25 px-4 py-3.5">
                <Search className="h-5 w-5 text-sky-300" />
                <input
                  autoFocus
                  type="text"
                  value={spotlightQuery}
                  onChange={(e) => setSpotlightQuery(e.target.value)}
                  placeholder="Film, dizi, sanatçı, terminal veya 'yercekimi' ara..."
                  className="w-full bg-transparent text-sm text-white placeholder-white/70 focus:outline-none"
                />
                <button
                  onClick={() => setSpotlightOpen(false)}
                  className="rounded-lg border border-white/35 bg-white/10 px-2 py-0.5 text-[10px] text-white cursor-pointer"
                >
                  ESC
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto p-2">
                {getSpotlightResults().map((res, i) => (
                  <button
                    key={`${res.badge}-${res.label}-${i}`}
                    onClick={res.onSelect}
                    className="flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 text-left transition hover:bg-white/10 cursor-pointer"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="truncate text-sm font-semibold text-white">{res.label}</div>
                      <div className="truncate text-xs text-white/85">{res.sub}</div>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-sky-200">
                      {res.badge}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ana Masaüstü Alanı */}
      <main
        className={`relative z-10 mx-auto flex min-h-[calc(100svh-48px)] max-w-7xl flex-col justify-between px-3 py-4 transition-opacity duration-200 sm:min-h-[calc(100dvh-76px)] sm:px-6 sm:py-6 lg:px-10 ${
          activeFolder ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        {!zenMode && <NewYearFeature isDay={isDay} soundFx={soundFx} />}

        {/* Gerçek Saydam Cam Klasör & 2D Yerçekimi Izgarası (Mobilde 2x5, Masaüstünde 5x2 Dengeli Düzen) */}
        {!zenMode && (
          <div id="tour-folders" className="my-auto py-5 sm:py-6">
            <div
              className={`grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5 transition-opacity ${
                gravityMode ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {DESKTOP_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    ref={(el) => (folderCardRefs.current[idx] = el)}
                    onClick={() => handleDesktopItemClick(item)}
                    className={`desktop-folder-card real-folder glass-text group flex min-w-0 touch-manipulation flex-col items-center rounded-2xl p-3 transition-all duration-300 hover:-translate-y-1 active:scale-[.97] cursor-pointer sm:rounded-3xl sm:p-4 ${
                      isDay ? "real-folder-day" : "real-folder-night"
                    } ${item.isGravityAction ? "ring-1 ring-amber-300/35" : ""}`}
                  >
                    <div
                      className={`flex h-13 w-13 sm:h-15 sm:w-15 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} border border-white/45 shadow-inner`}
                    >
                      <Icon
                        className={`h-6 w-6 sm:h-7 sm:w-7 ${item.iconColor} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                          item.isGravityAction ? "group-hover:animate-spin" : ""
                        }`}
                      />
                    </div>
                    <span className="mt-2.5 text-center text-xs font-bold tracking-wide text-white sm:text-sm">
                      {item.title}
                    </span>
                    <span className="mt-0.5 text-center text-[10px] leading-tight text-white/95 sm:text-[11px]">
                      {item.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Alt Saydam Cam Floating Dock */}
        <div className="real-dock mx-auto mt-auto flex max-w-full items-center gap-2 overflow-x-auto rounded-3xl px-3 py-2 sm:gap-2.5">
          {DESKTOP_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={`dock-${item.id}`}
                onClick={() => handleDesktopItemClick(item)}
                title={item.title}
                className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} border border-white/45 transition-transform hover:-translate-y-1.5 hover:scale-110 active:scale-90 cursor-pointer`}
              >
                <Icon className={`h-5 w-5 ${item.iconColor} drop-shadow-[0_2px_3px_rgba(0,0,0,0.75)]`} />
              </button>
            );
          })}
        </div>
      </main>

      {/* Klasör Penceresi */}
      <AnimatePresence>
        {activeFolder && activeTheme && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={closeFolder}
            className="fixed inset-0 z-30 flex items-center justify-center bg-black/55 p-0 sm:p-4 md:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: activeTheme.bg,
                borderColor: activeTheme.border,
              }}
              className="real-window relative flex h-[100dvh] w-full max-w-5xl flex-col overflow-hidden border text-white sm:h-[min(92dvh,900px)] sm:rounded-3xl"
            >
              <FolderThemeBackdrop folderId={activeFolder.id} />

              <div
                style={{ backgroundColor: activeTheme.headerBg }}
                className="glass-text relative z-10 flex shrink-0 items-center justify-between gap-2 border-b border-white/20 px-3 py-3 sm:px-5 sm:py-3.5"
              >
                <button
                  onClick={closeFolder}
                  className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-white/20 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Masaüstü</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <activeFolder.icon className={`h-5 w-5 ${activeFolder.iconColor} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`} />
                  <h2 className="text-sm font-bold tracking-wide sm:text-lg">
                    {activeFolder.title}
                  </h2>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={closeFolder}
                    className="h-3.5 w-3.5 rounded-full bg-rose-500 hover:bg-rose-400 cursor-pointer"
                    title="Kapat"
                  />
                  <span className="h-3.5 w-3.5 rounded-full bg-amber-400/85" />
                  <span className="h-3.5 w-3.5 rounded-full bg-emerald-400/85" />
                </div>
              </div>

              {activeFolder.tabs.length > 1 && (
                <div className="glass-text relative z-10 flex gap-2 overflow-x-auto border-b border-white/15 bg-black/25 px-5 py-2.5">
                  {activeFolder.tabs.map((tab, idx) => (
                    <button
                      key={tab}
                      onClick={() => {
                        playClickSound(soundFx);
                        setActiveTab(idx);
                      }}
                      className={`rounded-xl px-4 py-1.5 text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                        activeTab === idx
                          ? "border border-white/40 bg-white/15 text-white"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              )}

              <div
                ref={modalScrollRef}
                className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-6 md:p-8"
              >
                <div ref={modalContentRef} className="h-full">
                  {renderFolderContent()}
                </div>
              </div>

              <div
                style={{ backgroundColor: activeTheme.headerBg }}
                className="relative z-10 sm:hidden flex justify-center border-t border-white/15 py-3"
              >
                <button
                  onClick={closeFolder}
                  className="h-1.5 w-32 rounded-full bg-white/60 active:bg-white"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}