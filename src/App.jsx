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
  Disc3,
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
} from "lucide-react";

// Formspree'den aldığın form linkini buraya yapıştır:
const FORMSPREE_URL = "https://formspree.io/f/https://formspree.io/f/xnpdpzwg";

// Web Audio API ile sıfır gecikmeli mekanik tıklama sesi
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
    subtitle: "En Sevdiklerim",
    icon: Music,
    accent: "from-rose-500/30 to-red-700/30",
    iconColor: "text-rose-300",
    tabs: ["Favori Gruplarım"],
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

const HERO_SLIDES = [
  {
    image: "/images/agri.jpg",
    location: "Ağrı Dağı • Memleketin Zirvesi",
    note: "Köklerin sağlam olduğu yer",
  },
  {
    image: "/images/manzara2.jpg",
    location: "Ege • Yeni Rotalar",
    note: "Saha çalışmaları ve gece yolculukları",
  },
  {
    image: "/images/manzara3.jpg",
    location: "Faruk'un Dijital Masası",
    note: "Kendi sistemlerini kuran adam",
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

// Özel Çizim "F" Logolu Sinematik Açılış Ekranı
const IntroSplash = ({ onEnter }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060608] text-white px-6"
    >
      {/* Arka Plan Hafif Kızıl-Altın Işık */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.16)_0%,rgba(245,158,11,0.06)_35%,rgba(6,6,8,1)_75%)]" />

      {/* Özel Çizim Keskin "F" Logosu */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col items-center"
      >
        <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-amber-500/30 bg-gradient-to-br from-red-950/80 via-black to-amber-950/60 shadow-[0_0_60px_rgba(220,38,38,0.35)]">
          <svg
            viewBox="0 0 100 100"
            className="h-16 w-16 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]"
            fill="none"
          >
            <defs>
              <linearGradient id="farukLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="50%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#B91C1C" />
              </linearGradient>
            </defs>
            {/* Keskin Geometrik F Harfi */}
            <path
              d="M28 18H76L70 32H44V44H68L63 57H44V82H28V18Z"
              fill="url(#farukLogoGrad)"
            />
            <circle cx="72" cy="76" r="5" fill="#FBBF24" />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-7 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400/90">
            FARUK OS • v2.0
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Faruk Köçer
          </h1>
          <p className="mt-1.5 text-sm text-white/60">
            Kişisel Web Sitesi & Dijital Arşiv
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={onEnter}
          className="mt-9 group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-amber-400/40 bg-gradient-to-r from-red-700 via-red-600 to-amber-600 px-8 py-3.5 text-sm font-bold tracking-wider uppercase text-white shadow-[0_0_30px_rgba(220,38,38,0.45)] cursor-pointer"
        >
          <span>Sisteme Gir</span>
          <span className="text-amber-200 transition-transform group-hover:translate-x-1">→</span>
        </motion.button>
      </motion.div>
    </motion.div>
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
      {/* Sağ / Sol Kaydırma Okları */}
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

      {/* Yatay Kaydırma Alanı */}
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
              {/* Görsel Alanı */}
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

              {/* İçerik & Replik */}
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
  const [slideIdx, setSlideIdx] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [soundFx, setSoundFx] = useState(true);
  const [carpetOffset, setCarpetOffset] = useState({ x: 0, y: 0 });

  // Mesaj Bırak State'leri
  const [noteText, setNoteText] = useState("");
  const [noteStatus, setNoteStatus] = useState("idle"); // idle | sending | sent | error

  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Orta masaüstü slayt değişimi (6 saniyede bir)
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  // Fare hareketi ve telefon dokunuşuna göre halı esnemesi
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

  // Açılış ekranından sisteme giriş
  const handleEnterSystem = () => {
    playClickSound(true);
    setEntered(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.35;
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

  // Anonim Mesaj Gönderme
  const handleSendNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    playClickSound(soundFx);
    setNoteStatus("sending");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          mesaj: noteText,
          tarih: new Date().toLocaleString("tr-TR"),
        }),
      });
      if (res.ok) {
        setNoteStatus("sent");
        setNoteText("");
      } else {
        setNoteStatus("error");
      }
    } catch {
      setNoteStatus("error");
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

  const currentSlide = HERO_SLIDES[slideIdx];

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

    // 2. MÜZİKLERİM (Grup Görselleri + Arka Plan Müzik Kontrolü)
    if (activeFolder.id === "muzikler") {
      return (
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-rose-500/25 bg-rose-500/10 p-4">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-500/20 border border-rose-400/40 ${
                  musicPlaying ? "animate-spin" : ""
                }`}
                style={{ animationDuration: "8s" }}
              >
                <Disc3 className="h-6 w-6 text-rose-300" />
              </div>
              <div>
                <h3 className="font-bold text-white">Arka Plan Müziği & Favori Gruplarım</h3>
                <p className="text-xs text-white/70">
                  {musicPlaying ? "Şu an arka planda müzik çalıyor" : "Müzik duraklatıldı"}
                </p>
              </div>
            </div>

            <button
              onClick={toggleMusic}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500 cursor-pointer"
            >
              {musicPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              <span>{musicPlaying ? "Müziği Durdur" : "Müziği Başlat"}</span>
            </button>
          </div>

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

    // 3. DİZİLERİM (Sağa Kaydırılabilir Kişisel Dizi Kartları)
    if (activeFolder.id === "diziler") {
      return <HorizontalMediaCarousel items={SERIES_DATA} accentColor="emerald" />;
    }

    // 4. FİLMLERİM (Sağa Kaydırılabilir Kişisel Film Kartları + Letterboxd)
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

    // 5. HAKKIMDA
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

    // 6. BANA MESAJ BIRAK (Anonim Not Defteri)
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
                <p className="text-xs text-rose-400">
                  Gönderilirken bir sorun oluştu. Formspree bağlantısını kontrol edip tekrar dene.
                </p>
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
      {/* Arka Plan Müzik Oynatıcısı */}
      <audio ref={audioRef} src="/muzik.mp3" loop preload="none" />

      {/* Sinematik Açılış Ekranı */}
      <AnimatePresence>
        {!entered && <IntroSplash onEnter={handleEnterSystem} />}
      </AnimatePresence>

      {/* Canlı Dalgalanan & Fare/Dokunuşa Duyarlı İran Halısı */}
      <div
        className="fixed inset-[-24px] bg-cover bg-center carpet-wave transition-transform duration-300 ease-out will-change-transform"
        style={{
          backgroundImage: `url('/bg.jpg'), radial-gradient(circle at 20% 20%, #4a121f 0%, #1a0b14 45%, #0c1324 100%)`,
          transform: `translate3d(${carpetOffset.x}px, ${carpetOffset.y}px, 0) scale(1.06)`,
        }}
      />
      <div className="fixed inset-0 bg-black/45 pointer-events-none" />

      {/* Üst Durum Çubuğu */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-2.5 text-xs font-medium text-white/85 bg-black/45 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-red-600 to-amber-500 text-[11px] font-black text-white">
            F
          </span>
          <span className="tracking-wide font-semibold text-white">Faruk OS</span>
        </div>

        <div className="hidden sm:block text-white/70">{formattedDate}</div>

        <div className="flex items-center gap-3">
          {/* Müzik Aç/Kapa Butonu */}
          <button
            onClick={toggleMusic}
            title={musicPlaying ? "Müziği Durdur" : "Müziği Çal"}
            className="flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-amber-200 hover:bg-white/20 cursor-pointer"
          >
            {musicPlaying ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{musicPlaying ? "Müzik Açık" : "Müzik Kapalı"}</span>
          </button>

          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4" />
          <span className="font-semibold text-white">{formattedTime}</span>
        </div>
      </header>

      {/* Ana Masaüstü Alanı */}
      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-84px)] max-w-5xl flex-col justify-between px-4 py-6 sm:px-10">
        {/* Ortadaki Değişen Manzara & Ağrı Dağı Kartı (Saat sağ üstte olduğu için burada sadece görsel/atmosfer var) */}
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-black/50 p-5 text-center shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.image}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 0.72, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${currentSlide.image}'), linear-gradient(135deg, #1e293b 0%, #0f172a 100%)`,
              }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

          <div className="relative z-10 pt-16 pb-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3.5 py-1 text-xs font-medium text-amber-200">
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              <span>{currentSlide.location}</span>
            </div>
            <p className="mt-2 text-xs text-white/80 drop-shadow">{currentSlide.note}</p>

            {/* Slayt Noktaları */}
            <div className="mt-3 flex justify-center gap-1.5">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    playClickSound(soundFx);
                    setSlideIdx(i);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    slideIdx === i ? "w-5 bg-amber-400" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Klasör Izgarası */}
        <div className="my-auto py-6">
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-6 sm:gap-4">
            {FOLDERS.map((folder) => {
              const Icon = folder.icon;
              return (
                <button
                  key={folder.id}
                  onClick={() => openFolder(folder)}
                  className="group flex flex-col items-center rounded-3xl border border-white/15 bg-black/45 p-4 shadow-lg transition-transform duration-150 hover:-translate-y-1 hover:bg-black/60 hover:border-white/35 active:scale-95 cursor-pointer"
                >
                  <div
                    className={`flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${folder.accent} border border-white/20`}
                  >
                    <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${folder.iconColor}`} />
                  </div>
                  <span className="mt-2.5 text-sm font-semibold tracking-wide text-white">
                    {folder.title}
                  </span>
                  <span className="mt-0.5 text-[11px] text-white/65 text-center leading-tight">
                    {folder.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Alt Floating Dock */}
        <div className="mx-auto flex items-center gap-2.5 rounded-3xl border border-white/20 bg-black/55 px-3.5 py-2 shadow-2xl">
          {FOLDERS.map((folder) => {
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