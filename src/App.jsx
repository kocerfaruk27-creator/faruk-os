import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Music,
  Film,
  Tv,
  User,
  ArrowLeft,
  Sparkles,
  Wifi,
  Battery,
  ExternalLink,
  Disc3,
  Cpu,
  Sprout,
  GraduationCap,
  MapPin,
  Trophy,
  Clock,
} from "lucide-react";

const FOLDERS = [
  {
    id: "kariyer",
    title: "Kariyer",
    subtitle: "Otomasyon, SCADA & Projeler",
    icon: Briefcase,
    accent: "from-amber-500/30 to-orange-600/30",
    iconColor: "text-amber-300",
    tabs: ["Genel Bakış", "Deneyim & Eğitim", "Teknik Yetkinlikler"],
  },
  {
    id: "muzikler",
    title: "Müziklerim",
    subtitle: "Adamlar, Dolu Kadehi Ters Tut...",
    icon: Music,
    accent: "from-rose-500/30 to-red-700/30",
    iconColor: "text-rose-300",
    tabs: ["Favori Gruplarım"],
  },
  {
    id: "diziler",
    title: "Dizilerim",
    subtitle: "Lost & Unutulmaz Karakterler",
    icon: Tv,
    accent: "from-emerald-500/30 to-teal-700/30",
    iconColor: "text-emerald-300",
    tabs: ["Kült Diziler", "Favori Karakterler"],
  },
  {
    id: "filmler",
    title: "Filmlerim",
    subtitle: "In Bruges & Sinema Notlarım",
    icon: Film,
    accent: "from-indigo-500/30 to-blue-700/30",
    iconColor: "text-indigo-300",
    tabs: ["Favori Filmler"],
  },
  {
    id: "hakkimda",
    title: "Hakkımda",
    subtitle: "Ağrı'dan İzmir'e, 21 Yaş & GS",
    icon: User,
    accent: "from-red-600/30 to-amber-500/30",
    iconColor: "text-amber-300",
    tabs: ["Ben Kimim?"],
  },
];

const MUSIC_DATA = [
  {
    artist: "Adamlar",
    genre: "Türkçe Alternatif Rock",
    vibe: "Sözleri derin, ritmi sert, gece yolculuklarının vazgeçilmezi.",
    songs: ["Sarılırım Birine", "Koca Yaşlı Şişko Dünya", "Acının İlacı", "Zombi"],
    color: "from-amber-500/20 to-red-600/20",
  },
  {
    artist: "Turkodi Roma",
    genre: "Alternatif / Indie",
    vibe: "Kendine has atmosferi ve dingin melodileriyle kafa dinleme modu.",
    songs: ["Seninle", "Gece Yarısı", "Uzaklarda"],
    color: "from-purple-500/20 to-indigo-600/20",
  },
  {
    artist: "Dolu Kadehi Ters Tut",
    genre: "Alternatif Rock / Indie Pop",
    vibe: "Hem enerjik hem melankolik; her ruh haline uyan bir parçası var.",
    songs: ["Yapma N'olursun", "Madem", "Gitme", "Neyin Var?"],
    color: "from-rose-500/20 to-orange-600/20",
  },
];

const ExpandingBanner = ({ text }) => (
  <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] px-4 py-3 text-xs text-white/60">
    <Clock className="h-4 w-4 text-amber-300 shrink-0" />
    <span>{text}</span>
  </div>
);

export default function App() {
  const [activeFolder, setActiveFolder] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const found = FOLDERS.find((f) => f.id === hash);
      setActiveFolder(found || null);
      setActiveTab(0);
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const openFolder = (folder) => {
    window.location.hash = folder.id;
    setActiveFolder(folder);
    setActiveTab(0);
  };

  const closeFolder = () => {
    window.history.pushState("", document.title, window.location.pathname);
    setActiveFolder(null);
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

    // 1. KARİYER KLASÖRÜ
    if (activeFolder.id === "kariyer") {
      if (activeTab === 0) {
        return (
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/10 via-white/5 to-emerald-500/10 p-6">
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

    // 2. MÜZİKLERİM KLASÖRÜ
    if (activeFolder.id === "muzikler") {
      return (
        <div>
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-500/20 border border-rose-400/40"
            >
              <Disc3 className="h-6 w-6 text-rose-300" />
            </motion.div>
            <div>
              <h3 className="font-bold text-white">Favori Gruplarım & Başucu Şarkıları</h3>
              <p className="text-xs text-white/70">
                Yakında siteye doğrudan arka plan müzik çalar özelliği de eklenecek.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MUSIC_DATA.map((item) => (
              <div
                key={item.artist}
                className={`rounded-2xl border border-white/15 bg-gradient-to-br ${item.color} p-5 flex flex-col justify-between`}
              >
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-white/60">
                    {item.genre}
                  </span>
                  <h4 className="mt-1 text-xl font-bold text-white">{item.artist}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-white/75">{item.vibe}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10">
                  <span className="text-[11px] font-semibold text-white/50">Öne Çıkanlar:</span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.songs.map((song) => (
                      <span
                        key={song}
                        className="rounded-lg bg-black/30 px-2.5 py-1 text-xs text-white/90"
                      >
                        {song}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <ExpandingBanner text="Bu arşiv henüz başlangıç — zamanla yeni sanatçılar, albümler ve çalma listeleri eklenecek." />
        </div>
      );
    }

    // 3. DİZİLERİM KLASÖRÜ (LOST & JACK SHEPHARD)
    if (activeFolder.id === "diziler") {
      return (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5">
              <div className="relative h-56 w-full bg-gradient-to-br from-emerald-900 to-slate-900">
                <img
                  src="/images/jack.jpg"
                  alt="Lost - Jack Shephard"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12131a] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                  Zirvedeki Dizi
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-bold text-white">LOST (2004–2010)</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Gizemi, karakter derinliği ve ada atmosferiyle televizyon tarihinin en sarsıcı hikayesi. Sadece bir hayatta kalma dizisi değil; kader, inanç ve insan doğası üzerine dev bir bulmaca.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-white/5 p-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  Favori Karakter
                </span>
                <h3 className="mt-1 text-2xl font-bold text-white">Dr. Jack Shephard</h3>
                <p className="mt-1 text-xs text-white/60">Canlandıran: Matthew Fox</p>

                <blockquote className="mt-4 rounded-xl border-l-4 border-emerald-400 bg-black/25 p-4 text-sm italic text-white/90">
                  "Eğer birlikte yaşayamazsak, yalnız öleceğiz."
                </blockquote>

                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  Herkesi kurtarma takıntısı, kusurları, liderlik yükü ve bilim insanı mantığından inanca uzanan dönüşümüyle dizi tarihinin en gerçek karakterlerinden biri.
                </p>
              </div>
            </div>
          </div>

          <ExpandingBanner text="Dizi kütüphanesi genişlemeye devam ediyor — yakında yeni diziler ve unutulmaz karakterler eklenecek." />
        </div>
      );
    }

    // 4. FİLMLERİM KLASÖRÜ (IN BRUGES + LETTERBOXD)
    if (activeFolder.id === "filmler") {
      return (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5">
              <div className="relative h-64 w-full bg-gradient-to-br from-indigo-950 via-slate-900 to-amber-950">
                <img
                  src="/images/inbruges.jpg"
                  alt="In Bruges"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12131a] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-md">
                  Kült Favori
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">In Bruges (2008)</h3>
                  <span className="text-xs text-white/60">Yön: Martin McDonagh</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Masalsı ortaçağ sokaklarının ortasında sıkışmış iki tetikçi, kara mizah, vicdan azabı ve unutulmaz diyaloglar. Hem güldüren hem iç burkan kusursuz bir neo-noir başyapıt.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/10 to-white/5 p-6">
              <div>
                <h4 className="text-lg font-bold text-white">Sinema Evrenim & Letterboxd</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Kara mizah, zekice kurgulanmış senaryolar, neo-noir atmosferler ve karakter odaklı bağımsız filmler favorim. İzlediğim tüm filmleri, günlüklerimi ve listelerimi Letterboxd hesabımda topluyorum.
                </p>
              </div>

              <a
                href="https://boxd.it/nouvT"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-400"
              >
                <span>Letterboxd Profilime Git</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <ExpandingBanner text="Sinema arşivi büyüyor — devamı çok yakında bu klasörde yerini alacak." />
        </div>
      );
    }

    // 5. HAKKIMDA KLASÖRÜ
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
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden select-none text-white font-sans bg-[#1a0b12]">
      {/* İran Halısı Dokulu Arka Plan */}
      <div
        className="fixed inset-0 bg-cover bg-center scale-105 transition-transform duration-700"
        style={{
          backgroundImage: `url('/bg.jpg'), radial-gradient(circle at 20% 20%, #4a121f 0%, #1a0b14 45%, #0c1324 100%)`,
        }}
      />
      <div className="fixed inset-0 bg-black/45 backdrop-blur-[2px]" />

      {/* Üst Durum Çubuğu */}
      <header className="relative z-20 flex items-center justify-between px-5 py-2.5 text-xs font-medium text-white/80 bg-black/25 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="tracking-wide font-semibold text-white">FarukOS</span>
        </div>
        <div className="hidden sm:block text-white/70">{formattedDate}</div>
        <div className="flex items-center gap-3">
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4" />
          <span className="font-semibold text-white">{formattedTime}</span>
        </div>
      </header>

      {/* Ana Masaüstü Alanı */}
      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-5xl flex-col justify-between px-5 py-7 sm:px-10">
        {/* Ağrı Dağı Arka Planlı Saat & Tarih Widget'ı */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/25 p-6 text-center shadow-2xl backdrop-blur-xl"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-55"
            style={{
              backgroundImage: `url('/images/agri.jpg'), linear-gradient(135deg, #1e293b 0%, #0f172a 100%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/30" />

          <div className="relative z-10">
            <div className="text-5xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md">
              {formattedTime}
            </div>
            <div className="mt-1 text-sm font-medium text-white/85 drop-shadow">
              {formattedDate}
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3.5 py-1 text-xs text-amber-200 backdrop-blur-md">
              <MapPin className="h-3 w-3 text-amber-300" />
              <span>Ağrı Dağı • Faruk'un Dijital Masası</span>
            </div>
          </div>
        </motion.div>

        {/* Klasör Izgarası */}
        <div className="my-auto py-7">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 sm:gap-6">
            {FOLDERS.map((folder, index) => {
              const Icon = folder.icon;
              return (
                <motion.button
                  key={folder.id}
                  layoutId={`card-${folder.id}`}
                  onClick={() => openFolder(folder)}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 22,
                    delay: index * 0.05,
                  }}
                  whileHover={{ scale: 1.06, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex flex-col items-center rounded-3xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition-colors hover:bg-white/15 hover:border-white/35 cursor-pointer"
                >
                  <div
                    className={`flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${folder.accent} border border-white/20 shadow-inner`}
                  >
                    <Icon className={`h-8 w-8 sm:h-10 sm:w-10 ${folder.iconColor}`} />
                  </div>
                  <span className="mt-3 text-sm sm:text-base font-semibold tracking-wide text-white">
                    {folder.title}
                  </span>
                  <span className="mt-0.5 text-[11px] text-white/60 line-clamp-1">
                    {folder.subtitle}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Alt Floating Dock */}
        <div className="mx-auto flex items-center gap-3 rounded-3xl border border-white/20 bg-white/10 px-4 py-2.5 shadow-2xl backdrop-blur-2xl">
          {FOLDERS.map((folder) => {
            const Icon = folder.icon;
            return (
              <motion.button
                key={`dock-${folder.id}`}
                onClick={() => openFolder(folder)}
                whileHover={{ scale: 1.2, y: -6 }}
                whileTap={{ scale: 0.9 }}
                title={folder.title}
                className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${folder.accent} border border-white/20 cursor-pointer`}
              >
                <Icon className={`h-5 w-5 ${folder.iconColor}`} />
              </motion.button>
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
            className="fixed inset-0 z-30 flex items-center justify-center bg-black/65 p-0 sm:p-6 backdrop-blur-md"
          >
            <motion.div
              layoutId={`card-${activeFolder.id}`}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="flex h-full w-full max-w-5xl flex-col overflow-hidden sm:rounded-3xl border border-white/25 bg-[#12131a]/95 shadow-2xl backdrop-blur-2xl"
            >
              {/* Üst Bar */}
              <div className="flex items-center justify-between border-b border-white/15 bg-white/5 px-5 py-4">
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
                <div className="flex gap-2 overflow-x-auto border-b border-white/10 bg-black/20 px-5 py-3">
                  {activeFolder.tabs.map((tab, idx) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(idx)}
                      className={`relative rounded-xl px-4 py-1.5 text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                        activeTab === idx ? "text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {activeTab === idx && (
                        <motion.div
                          layoutId="activeTabPill"
                          className="absolute inset-0 rounded-xl bg-white/15 border border-white/20"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{tab}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Dinamik İçerik Alanı */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-8">
                <motion.div
                  key={`${activeFolder.id}-${activeTab}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {renderFolderContent()}
                </motion.div>
              </div>

              {/* Mobil Alt Çubuk */}
              <div className="sm:hidden flex justify-center py-3 bg-black/30 border-t border-white/10">
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