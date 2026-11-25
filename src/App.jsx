import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

// Masaüstü arka planını değiştirmek için public/bg.jpg dosyasını değiştirmen yeterli.
const FORMSPREE_URL = "https://formspree.io/f/xnpdpzwg";

// Web Audio API ile sıfır gecikmeli hafif tıklama sesi
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
    accent: "from-amber-400/30 to-orange-500/20",
    iconColor: "text-amber-300",
    tabs: ["Genel Bakış", "Deneyim & Eğitim", "Teknik Yetkinlikler"],
  },
  {
    id: "projelerim",
    title: "Projelerim",
    subtitle: "Yakında Gelecekler",
    icon: Hourglass,
    accent: "from-cyan-400/30 to-blue-500/20",
    iconColor: "text-cyan-300",
    tabs: ["Gelişim Aşamasında"],
  },
  {
    id: "muzikler",
    title: "Müziklerim",
    subtitle: "Favori Sanatçılar",
    icon: Music,
    accent: "from-rose-400/30 to-red-500/20",
    iconColor: "text-rose-300",
    tabs: ["Favori Gruplar & Sanatçılar"],
  },
  {
    id: "diziler",
    title: "Dizilerim",
    subtitle: "İz Bırakanlar",
    icon: Tv,
    accent: "from-emerald-400/30 to-teal-500/20",
    iconColor: "text-emerald-300",
    tabs: ["Kült Diziler"],
  },
  {
    id: "filmler",
    title: "Filmlerim",
    subtitle: "Sinema Arşivi",
    icon: Film,
    accent: "from-indigo-400/30 to-blue-500/20",
    iconColor: "text-indigo-300",
    tabs: ["Film Seçkisi"],
  },
  {
    id: "hakkimda",
    title: "Hakkımda",
    subtitle: "Ağrı, İzmir & GS",
    icon: User,
    accent: "from-red-500/30 to-amber-400/20",
    iconColor: "text-amber-300",
    tabs: ["Ben Kimim?"],
  },
  {
    id: "mesaj",
    title: "Mesaj Bırak",
    subtitle: "Anonim Not Defteri",
    icon: MessageSquare,
    accent: "from-sky-400/30 to-cyan-500/20",
    iconColor: "text-sky-300",
    tabs: ["Bana Yaz"],
  },
  {
    id: "kelime",
    title: "Kelime Oyunu",
    subtitle: "6 Hak • 5 Harf",
    icon: Gamepad2,
    accent: "from-violet-400/30 to-fuchsia-500/20",
    iconColor: "text-violet-300",
    tabs: ["Günün Kelimesi"],
  },
];

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

// 2027 yeni yıl dilekleri ve şans kurabiyesi mesajları
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

// El çizimi hissi veren, dalları sırayla çizilen yılbaşı ağacı
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
      <defs>
        <filter id="paintSoft">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
        <radialGradient id="warmBulb">
          <stop stopColor="#fff9cf" />
          <stop offset=".45" stopColor="#ffd36b" />
          <stop offset="1" stopColor="#b66a22" />
        </radialGradient>
      </defs>
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

const IntroSplash = ({ onEnter }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#111a19] px-5 text-white"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.1 }}
  >
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 50% 42%, rgba(52,83,67,.34), transparent 48%), linear-gradient(180deg,#101b20 0%,#1a2928 58%,#101719 100%)",
      }}
    />
    <div
      className="absolute inset-0 opacity-[.13]"
      style={{
        backgroundImage: "radial-gradient(ellipse at 20% 20%,#d8e4dc 0.7px,transparent 1px)",
        backgroundSize: "83px 71px",
      }}
    />
    {Array.from({ length: 18 }, (_, i) => (
      <motion.i
        key={i}
        className="absolute h-1 w-1 rounded-full bg-white/60"
        style={{ left: `${(i * 43) % 100}%`, top: `${(i * 29) % 95}%` }}
        animate={{ y: [-4, 22], opacity: [0, 0.45, 0] }}
        transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.31 }}
      />
    ))}
    <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center sm:flex-row sm:justify-center sm:gap-12 sm:text-left">
      <div className="relative">
        <div className="absolute inset-10 rounded-full bg-emerald-900/25 blur-3xl" />
        <TreeArtwork />
      </div>
      <motion.div
        className="max-w-md"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5.1, duration: 1.5, ease: "easeOut" }}
      >
        <p className="mb-4 text-[10px] font-medium tracking-[.34em] text-amber-100/70">
          YENİ BİR YILIN EŞİĞİNDE · 2027
        </p>
        <h1 className="text-4xl font-medium tracking-tight text-[#f2eee4] sm:text-5xl">
          Faruk Köçer
        </h1>
        <p className="mt-4 text-sm leading-7 text-stone-200/70 sm:text-base">
          Biraz ışık, biraz umut… Yeni yılın güzel geçsin.
        </p>
        <motion.button
          onClick={onEnter}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 inline-flex items-center gap-3 rounded-xl border border-amber-100/35 bg-[#d2b36b]/15 px-8 py-3.5 text-xs font-semibold tracking-[.2em] text-amber-50 backdrop-blur-md transition hover:bg-[#d2b36b]/25 cursor-pointer"
        >
          SİSTEME GİR <span className="text-base">→</span>
        </motion.button>
      </motion.div>
    </div>
  </motion.div>
);

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
  };

  return (
    <div
      className={`ios-glass relative mx-auto w-full max-w-2xl overflow-hidden rounded-[2rem] px-4 py-3.5 sm:px-7 ${
        isDay ? "ios-glass-day" : "ios-glass-night"
      }`}
    >
      <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="relative flex items-center gap-3 sm:gap-7">
        <button
          onClick={nextWish}
          title="Ağaca dokun ve yeni yıl dileği al"
          className="group relative shrink-0 rounded-2xl transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <TreeArtwork compact />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/30 bg-black/40 px-2.5 py-1 text-[9px] font-semibold text-amber-100 backdrop-blur-md">
            DİLEK TUT ✨
          </span>
        </button>

        <div className="min-w-0 flex-1 py-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-widest text-amber-200 backdrop-blur-md">
              2027 YENİ YIL
            </span>
            <span className="text-[10px] text-white/65">• Bir dilek seç</span>
          </div>

          <h2 className="mt-2 text-lg font-semibold text-white drop-shadow-sm sm:text-xl">
            Yeni yıl ağacı
          </h2>

          <AnimatePresence mode="wait">
            <motion.p
              key={wishIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="mt-1.5 min-h-[42px] text-xs leading-6 text-white/90 drop-shadow-sm sm:text-sm"
            >
              {NEW_YEAR_WISHES[wishIndex]}
            </motion.p>
          </AnimatePresence>

          <button
            onClick={nextWish}
            className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-3.5 py-2 text-[11px] font-semibold text-white backdrop-blur-md transition hover:bg-white/22 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            Başka bir dilek dile
          </button>
        </div>
      </div>

      <div className="relative mt-3 flex flex-col gap-2 border-t border-white/15 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-white/85">
          <Cookie className="h-5 w-5 text-amber-300" />
          <span>Bir de şans kurabiyeni kır…</span>
        </div>
        <button
          onClick={openFortune}
          className="rounded-full border border-amber-200/30 bg-amber-300/15 px-4 py-2 text-[11px] font-bold text-amber-100 backdrop-blur-md transition hover:bg-amber-300/25 cursor-pointer"
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
            className="relative mt-3 overflow-hidden rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md"
          >
            <div className="flex items-start gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
              <p className="text-xs leading-6 text-amber-50 sm:text-sm">
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
    <div className="ios-card mx-auto w-full max-w-xl rounded-3xl p-4 text-white sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold tracking-[.25em] text-violet-300">
            FARUK OS • MİNİ OYUN
          </span>
          <h3 className="mt-1 text-2xl font-bold">5 Harf</h3>
          <p className="mt-1 text-xs text-white/70">Kelimeyi bulmak için 6 hakkın var.</p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/10 px-3 py-2 text-center backdrop-blur-md">
          <div className="text-xl font-bold tabular-nums">{Math.max(0, 6 - guesses.length)}</div>
          <div className="text-[9px] uppercase tracking-wider text-white/60">Kalan hak</div>
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
                  className={`flex aspect-square items-center justify-center rounded-lg border text-xl font-black backdrop-blur-md sm:rounded-xl sm:text-2xl ${
                    status === "correct"
                      ? "border-emerald-300/60 bg-emerald-500/75"
                      : status === "present"
                      ? "border-amber-300/60 bg-amber-500/75"
                      : status === "absent"
                      ? "border-white/15 bg-black/45 text-white/60"
                      : "border-white/20 bg-white/8"
                  } ${filled && !locked ? "border-violet-300/70 bg-violet-400/20" : ""}`}
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
        className="my-4 min-h-10 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-center text-xs leading-6 text-white/90 backdrop-blur-md"
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
                className={`h-10 min-w-0 flex-1 rounded-md border border-white/15 text-xs font-bold backdrop-blur-md cursor-pointer sm:h-11 ${
                  keyStatus[ch] === "correct"
                    ? "bg-emerald-500/80 text-white"
                    : keyStatus[ch] === "present"
                    ? "bg-amber-500/80 text-white"
                    : keyStatus[ch] === "absent"
                    ? "bg-black/45 text-white/40"
                    : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                {ch}
              </button>
            ))}
            {i === 2 && (
              <>
                <button
                  onClick={removeLetter}
                  className="rounded-md border border-white/15 bg-white/20 px-2 text-[10px] font-bold backdrop-blur-md cursor-pointer"
                >
                  ⌫
                </button>
                <button
                  onClick={submit}
                  className="rounded-md border border-violet-300/40 bg-violet-500/75 px-2 text-[10px] font-bold backdrop-blur-md cursor-pointer"
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
          className="mt-5 w-full rounded-xl border border-violet-300/40 bg-violet-500/75 px-4 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-violet-500/90 cursor-pointer"
        >
          Yeni Kelime Oyna ↻
        </button>
      )}
      <p className="mt-4 text-center text-[10px] text-white/55">
        Yeşil: doğru harf ve yer • Sarı: kelimede var • Gri: kelimede yok
      </p>
    </div>
  );
};

// Masaüstü Arka Planında Hafif Kar Yağışı Efekti
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
        <span className="text-xs text-white/75">
          Sağa kaydırarak veya okları kullanarak gezebilirsin → ({items.length} Yapım)
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="rounded-xl border border-white/25 bg-white/12 p-2 text-white backdrop-blur-md transition hover:bg-white/25 cursor-pointer"
            title="Sola Kaydır"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="rounded-xl border border-white/25 bg-white/12 p-2 text-white backdrop-blur-md transition hover:bg-white/25 cursor-pointer"
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
            className="ios-card snap-start shrink-0 w-[85vw] sm:w-[370px] flex flex-col justify-between overflow-hidden rounded-2xl text-white"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <span
                  className={`absolute top-3 left-3 rounded-full border border-white/25 bg-black/45 px-3 py-1 text-xs font-semibold backdrop-blur-md ${
                    accentColor === "emerald" ? "text-emerald-300" : "text-indigo-300"
                  }`}
                >
                  {item.tag}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-white drop-shadow-sm">{item.title}</h3>

                <blockquote
                  className={`mt-3 rounded-xl border-l-4 ${
                    accentColor === "emerald" ? "border-emerald-400" : "border-indigo-400"
                  } border border-white/15 bg-white/8 p-3 text-xs sm:text-sm italic text-white/95 backdrop-blur-md`}
                >
                  <Quote className="inline h-3.5 w-3.5 mr-1.5 opacity-65" />
                  "{item.quote}"
                </blockquote>

                <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-white/85">
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

  const [musicFilter, setMusicFilter] = useState("Tümü");
  const [musicSearch, setMusicSearch] = useState("");
  const [copiedMail, setCopiedMail] = useState(false);

  const [noteText, setNoteText] = useState("");
  const [noteStatus, setNoteStatus] = useState("idle");
  const [noteErrorMsg, setNoteErrorMsg] = useState("");

  const audioRef = useRef(null);

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
    const onEscape = (event) => {
      if (event.key === "Escape") {
        if (islandOpen) setIslandOpen(false);
        else if (activeFolder) closeFolder();
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [activeFolder, islandOpen]);

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
      audioRef.current
        .play()
        .then(() => setMusicPlaying(true))
        .catch(() => {});
    }
  };

  const openFolder = (folder) => {
    playClickSound(soundFx);
    window.location.hash = folder.id;
    setActiveFolder(folder);
    setActiveTab(0);
    setIslandOpen(false);
  };

  const closeFolder = () => {
    playClickSound(soundFx);
    window.history.pushState("", document.title, window.location.pathname);
    setActiveFolder(null);
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

  const renderFolderContent = () => {
    if (!activeFolder) return null;

    // 1. KARİYER
    if (activeFolder.id === "kariyer") {
      if (activeTab === 0) {
        return (
          <div className="space-y-6">
            <div className="ios-card rounded-2xl p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-400/15 px-3 py-1 text-xs font-medium text-amber-200 backdrop-blur-md">
                    <Cpu className="h-3.5 w-3.5" /> Otomasyon Teknikeri
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-white">
                    Endüstriyel Otomasyon & Akıllı Tarım Teknolojileri
                  </h3>
                  <p className="mt-1 text-sm text-white/70">
                    Vegevital Tarım A.Ş. • İstanbul Üniversitesi-Cerrahpaşa Mezunu
                  </p>
                </div>
                <a
                  href="https://www.linkedin.com/in/farukkocer/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-[#0A66C2]/85 px-4 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-[#0A66C2]"
                >
                  <span>LinkedIn Profilim</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <p className="mt-5 text-sm sm:text-base leading-relaxed text-white/90">
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
              <div className="ios-card rounded-2xl p-4 text-white">
                <Sprout className="h-6 w-6 text-emerald-300" />
                <h4 className="mt-2 font-semibold">Akıllı Sera Sistemleri</h4>
                <p className="mt-1 text-xs text-white/75">
                  İklim kontrolü, CO₂ dozajlama, sulama otomasyonu ve gerçek zamanlı sensör takibi.
                </p>
              </div>
              <div className="ios-card rounded-2xl p-4 text-white">
                <Cpu className="h-6 w-6 text-amber-300" />
                <h4 className="mt-2 font-semibold">PLC & SCADA</h4>
                <p className="mt-1 text-xs text-white/75">
                  Siemens TIA Portal tabanlı kontrol mimarileri ve endüstriyel saha izleme ekranları.
                </p>
              </div>
              <div className="ios-card rounded-2xl p-4 text-white">
                <Briefcase className="h-6 w-6 text-sky-300" />
                <h4 className="mt-2 font-semibold">Sürücü & Güç Elektroniği</h4>
                <p className="mt-1 text-xs text-white/75">
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
            <div className="ios-card rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  Mevcut Görev • 2026 - Günümüz
                </span>
                <span className="rounded-full border border-emerald-300/30 bg-emerald-400/20 px-2.5 py-0.5 text-xs text-emerald-200 backdrop-blur-md">
                  Aktif
                </span>
              </div>
              <h4 className="mt-1 text-lg font-bold">Otomasyon Teknikeri — Vegevital Tarım A.Ş.</h4>
              <p className="mt-2 text-sm text-white/80">
                Modern sera tesislerinde iklimlendirme, sulama otomasyonu, SCADA kontrol sistemleri, CO₂ üniteleri ve saha sensör ağlarının kesintisiz yönetimi.
              </p>
            </div>

            <div className="ios-card rounded-2xl p-5 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Staj Deneyimi • Ağustos 2026
              </span>
              <h4 className="mt-1 text-lg font-bold">
                Endüstriyel Otomasyon Stajyeri — Yılmaz Redüktör
              </h4>
              <p className="mt-2 text-sm text-white/80">
                AC motor sürücüleri (VFD/İnvertör), güç elektroniği testleri, Modbus RTU haberleşme ve PLC/HMI pano entegrasyonu üzerine saha uygulaması.
              </p>
            </div>

            <div className="ios-card rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-300">
                <GraduationCap className="h-4 w-4" /> Eğitim
              </div>
              <h4 className="mt-1 text-lg font-bold">İstanbul Üniversitesi-Cerrahpaşa</h4>
              <p className="mt-1 text-sm text-white/80">
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
            <div key={skill} className="ios-card rounded-xl px-4 py-3 text-sm font-medium text-white">
              {skill}
            </div>
          ))}
        </div>
      );
    }

    // 2. PROJELERİM
    if (activeFolder.id === "projelerim") {
      return (
        <div className="space-y-6">
          <div className="ios-card flex flex-col items-center justify-center rounded-2xl p-8 text-center text-white">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/35 bg-cyan-400/15 backdrop-blur-md">
              <Hourglass className="h-8 w-8 animate-pulse text-cyan-300" />
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-cyan-300/30 bg-cyan-400/15 px-3.5 py-1 text-xs font-semibold text-cyan-200 backdrop-blur-md">
              <Wrench className="h-3.5 w-3.5" /> Gelişim Aşamasında
            </span>
            <h3 className="mt-3 text-2xl font-bold">Yeni Projeler Çok Yakında Burada</h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/80">
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
              <div key={proj.title} className="ios-card flex flex-col justify-between rounded-2xl p-5 text-white">
                <div>
                  <span className="inline-block rounded-md border border-cyan-300/25 bg-cyan-400/15 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-200">
                    {proj.status}
                  </span>
                  <h4 className="mt-2.5 font-bold">{proj.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/75">{proj.desc}</p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[11px] text-white/60">
                  <Hourglass className="h-3.5 w-3.5 text-cyan-300" />
                  <span>Yakında eklenecek</span>
                </div>
              </div>
            ))}
          </div>

          <div className="ios-card flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-400/15 text-cyan-200">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold">Proje & İş Birliği İletişimi</h4>
                <p className="text-xs mt-0.5 text-white/75">
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
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/25 bg-white/12 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/22 cursor-pointer"
              >
                {copiedMail ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedMail ? "Kopyalandı" : "Adresi Kopyala"}</span>
              </button>
              <a
                href="mailto:kocerfaruk27@gmail.com"
                className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-300/40 bg-cyan-500/75 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-cyan-500"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Mail Gönder</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    // KELİME OYUNU
    if (activeFolder.id === "kelime") return <WordGuessGame />;

    // 3. MÜZİKLERİM (iOS Şeffaf Cam Kartlar)
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
          <div className="ios-card mb-5 flex flex-col gap-4 rounded-2xl p-4 text-white sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="relative flex h-24 w-28 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-inner backdrop-blur-md">
                <div className="absolute bottom-2 h-2 w-20 rounded-full bg-black/30" />
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
                <p className="mt-1 text-xs text-white/80">
                  {musicPlaying
                    ? "Plak dönüyor, müzik çalıyor…"
                    : "Plak durdu. İstediğinde yeniden başlat."}
                </p>
                <p className="mt-1 text-[10px] text-white/60">
                  Toplam {MUSIC_DATA.length} sanatçı & grup
                </p>
              </div>
            </div>

            <button
              onClick={toggleMusic}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-300/35 bg-rose-500/70 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-rose-500 cursor-pointer"
            >
              {musicPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              <span>{musicPlaying ? "Müziği Durdur" : "Müziği Başlat"}</span>
            </button>
          </div>

          {/* Filtre & Arama Çubuğu */}
          <div className="mb-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {["Tümü", "Yerli", "Yabancı"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playClickSound(soundFx);
                    setMusicFilter(cat);
                  }}
                  className={`rounded-xl px-3.5 py-2 text-xs font-semibold backdrop-blur-md transition cursor-pointer ${
                    musicFilter === cat
                      ? "border border-white/45 bg-white/25 text-white shadow-sm"
                      : "border border-white/15 bg-white/8 text-white/75 hover:bg-white/15"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/60" />
              <input
                type="text"
                value={musicSearch}
                onChange={(e) => setMusicSearch(e.target.value)}
                placeholder="Sanatçı veya şarkı ara..."
                className="w-full rounded-xl border border-white/20 bg-white/10 py-2 pl-9 pr-3 text-xs text-white placeholder-white/50 backdrop-blur-md focus:border-white/45 focus:outline-none"
              />
            </div>
          </div>

          {/* Şeffaf Cam Grup & Sanatçı Kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMusic.map((item) => (
              <div
                key={item.artist}
                className="ios-card group flex flex-col justify-between overflow-hidden rounded-3xl text-white transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-40 w-full overflow-hidden bg-white/5">
                    <img
                      src={item.image}
                      alt={item.artist}
                      loading="lazy"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 rounded-full border border-white/30 bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5 pt-3.5">
                    <span className="text-[11px] uppercase tracking-wider text-white/65">
                      {item.genre}
                    </span>
                    <h4 className="mt-1 text-xl font-bold text-white drop-shadow-sm">
                      {item.artist}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-white/85">{item.vibe}</p>
                  </div>
                </div>

                <div className="border-t border-white/15 px-5 pb-5 pt-3">
                  <span className="text-[11px] font-semibold text-white/65">Öne Çıkanlar:</span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.songs.map((song) => (
                      <span
                        key={song}
                        className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white/95 backdrop-blur-md"
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

    // 4. DİZİLERİM
    if (activeFolder.id === "diziler") {
      return <HorizontalMediaCarousel items={SERIES_DATA} accentColor="emerald" />;
    }

    // 5. FİLMLERİM
    if (activeFolder.id === "filmler") {
      return (
        <div className="space-y-6">
          <HorizontalMediaCarousel items={MOVIES_DATA} accentColor="indigo" />

          <div className="ios-card flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl p-5 text-white">
            <div>
              <h4 className="text-base font-bold">Daha Fazlası Letterboxd Hesabımda</h4>
              <p className="text-xs mt-0.5 text-white/75">
                İzlediğim tüm filmleri, puanlarımı ve listelerimi Letterboxd üzerinden takip edebilirsin.
              </p>
            </div>
            <a
              href="https://boxd.it/nouvT"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-indigo-300/35 bg-indigo-500/75 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-indigo-500"
            >
              <span>Letterboxd Profilime Git</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      );
    }

    // 6. HAKKIMDA
    if (activeFolder.id === "hakkimda") {
      return (
        <div className="space-y-6">
          <div className="ios-card rounded-2xl p-6 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/12 px-3 py-1 text-white backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5 text-amber-300" />
                Aslen Ağrılı • İzmir'de Yaşıyor
              </span>
              <span className="rounded-full border border-white/20 bg-white/12 px-3 py-1 text-white backdrop-blur-md">
                21 Yaşında
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/35 bg-red-500/25 px-3 py-1 text-amber-200 backdrop-blur-md">
                <Trophy className="h-3.5 w-3.5" /> Galatasaraylı
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold">Merhaba, ben Muhammed Faruk Köçer.</h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/90">
              21 yaşındayım, aslen Ağrılıyım. İstanbul Üniversitesi-Cerrahpaşa Kontrol ve Otomasyon Teknolojisi bölümünden mezun olduktan sonra iş sebebiyle İzmir'e yerleştim. Şu an modern sera tesislerinde otomasyon teknikeri olarak çalışıyorum.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/80">
              İşim gereği gün içinde PLC, SCADA ve saha kontrol sistemleriyle ilgileniyorum. Boş zamanlarımda ise müzik dinlemeyi, iyi filmler ve diziler izlemeyi, spor yapmayı ve Galatasaray maçlarını takip etmeyi seviyorum. Bu siteyi de hem öğrendiklerimi biriktirmek hem de sevdiğim şeyleri tek bir yerde toplamak için kurdum.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="ios-card rounded-2xl p-4 text-white">
              <span className="text-xs font-semibold text-amber-300">Memleket & Şehir</span>
              <h4 className="mt-1 font-bold">Ağrı & İzmir</h4>
              <p className="mt-1 text-xs text-white/75">
                Memleketim Ağrı, üniversite yıllarım İstanbul'da geçti; şimdi ise hayatıma İzmir'de devam ediyorum.
              </p>
            </div>
            <div className="ios-card rounded-2xl p-4 text-white">
              <span className="text-xs font-semibold text-amber-300">Takım</span>
              <h4 className="mt-1 font-bold">Galatasaray</h4>
              <p className="mt-1 text-xs text-white/75">
                Çocukluktan gelen sarı-kırmızı tutkusu; maç günleri benim için ayrı bir keyif.
              </p>
            </div>
            <div className="ios-card rounded-2xl p-4 text-white">
              <span className="text-xs font-semibold text-sky-300">Hedef</span>
              <h4 className="mt-1 font-bold">Kendi Sistemlerimi Kurmak</h4>
              <p className="mt-1 text-xs text-white/75">
                Otomasyon ve yazılım tarafında sahada tecrübe kazanıp ileride kendi projelerimi hayata geçirmek.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // 7. BANA MESAJ BIRAK
    return (
      <div className="mx-auto max-w-xl">
        <div className="ios-card rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold">Anonim Not Bırak</h3>
          <p className="mt-1.5 text-xs sm:text-sm text-white/80">
            İsim veya e-posta yazmak zorunda değilsin. Düşünceni, bir film/şarkı önerini ya da selamını doğrudan bana iletebilirsin.
          </p>

          {noteStatus === "sent" ? (
            <div className="mt-6 flex flex-col items-center rounded-2xl border border-emerald-300/35 bg-emerald-500/20 p-6 text-center backdrop-blur-md">
              <CheckCircle2 className="h-10 w-10 text-emerald-300" />
              <h4 className="mt-3 font-bold">Mesajın Bana Ulaştı!</h4>
              <p className="mt-1 text-xs text-white/85">
                Notun doğrudan e-posta kutuma düştü. Teşekkürler!
              </p>
              <button
                onClick={() => setNoteStatus("idle")}
                className="mt-4 rounded-xl border border-white/25 bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/25 cursor-pointer"
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
                className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-sm text-white placeholder-white/50 backdrop-blur-md focus:border-white/45 focus:outline-none"
              />

              {noteStatus === "error" && <p className="text-xs text-rose-300">{noteErrorMsg}</p>}

              <button
                type="submit"
                disabled={noteStatus === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-sky-300/35 bg-sky-500/75 px-5 py-3 text-sm font-bold text-white shadow-lg backdrop-blur-md transition hover:bg-sky-500 disabled:opacity-50 cursor-pointer"
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
    <div className="faruk-os relative min-h-[100svh] w-full overflow-x-hidden select-none font-sans text-white">
      <style>{`
        .faruk-os { isolation: isolate; }
        .faruk-wallpaper {
          position: fixed; inset: 0; z-index: -3;
          background-image: url('/bg.jpg');
          background-size: cover; background-position: center 54%;
          background-repeat: no-repeat;
          transform: scale(1.015);
          will-change: transform;
        }
        .faruk-grain {
          position: fixed; inset: 0; z-index: -1; pointer-events: none;
          opacity: .045;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.28'/%3E%3C/svg%3E");
        }

        /* iOS / visionOS Liquid Glass Stilleri (Bembeyaz değil, kristal şeffaf cam) */
        .ios-glass {
          -webkit-backdrop-filter: blur(26px) saturate(185%);
          backdrop-filter: blur(26px) saturate(185%);
        }
        .ios-glass-night {
          background: linear-gradient(135deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.08) 100%);
          border: 1px solid rgba(255,255,255,0.22);
          border-top-color: rgba(255,255,255,0.44);
          border-left-color: rgba(255,255,255,0.32);
          box-shadow: 0 18px 44px rgba(0,0,0,0.24), inset 0 1px 1px rgba(255,255,255,0.28);
        }
        .ios-glass-day {
          background: linear-gradient(135deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.18) 100%);
          border: 1px solid rgba(255,255,255,0.38);
          border-top-color: rgba(255,255,255,0.68);
          border-left-color: rgba(255,255,255,0.52);
          box-shadow: 0 16px 38px rgba(0,0,0,0.14), inset 0 1px 1px rgba(255,255,255,0.48);
        }

        .ios-folder {
          -webkit-backdrop-filter: blur(22px) saturate(185%);
          backdrop-filter: blur(22px) saturate(185%);
        }
        .ios-folder-night {
          background: linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.03) 55%, rgba(255,255,255,0.08) 100%);
          border: 1px solid rgba(255,255,255,0.20);
          border-top-color: rgba(255,255,255,0.44);
          border-left-color: rgba(255,255,255,0.32);
          box-shadow: 0 14px 32px rgba(0,0,0,0.22), inset 0 1px 1px rgba(255,255,255,0.28);
        }
        .ios-folder-night:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.06) 55%, rgba(255,255,255,0.13) 100%);
          border-color: rgba(255,255,255,0.40);
          box-shadow: 0 20px 42px rgba(0,0,0,0.28), inset 0 1px 1px rgba(255,255,255,0.40);
        }
        .ios-folder-day {
          background: linear-gradient(135deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.10) 55%, rgba(255,255,255,0.19) 100%);
          border: 1px solid rgba(255,255,255,0.38);
          border-top-color: rgba(255,255,255,0.68);
          border-left-color: rgba(255,255,255,0.52);
          box-shadow: 0 12px 28px rgba(0,0,0,0.14), inset 0 1px 1px rgba(255,255,255,0.50);
        }
        .ios-folder-day:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.14) 55%, rgba(255,255,255,0.25) 100%);
          border-color: rgba(255,255,255,0.62);
          box-shadow: 0 18px 36px rgba(0,0,0,0.18), inset 0 1px 1px rgba(255,255,255,0.65);
        }

        .ios-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.09) 100%);
          border: 1px solid rgba(255,255,255,0.22);
          border-top-color: rgba(255,255,255,0.45);
          border-left-color: rgba(255,255,255,0.32);
          -webkit-backdrop-filter: blur(24px) saturate(185%);
          backdrop-filter: blur(24px) saturate(185%);
          box-shadow: 0 14px 34px rgba(0,0,0,0.22), inset 0 1px 1px rgba(255,255,255,0.26);
        }
        .ios-card:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.12) 100%);
          border-color: rgba(255,255,255,0.36);
        }

        .ios-dock {
          background: linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 100%);
          border: 1px solid rgba(255,255,255,0.26);
          border-top-color: rgba(255,255,255,0.48);
          -webkit-backdrop-filter: blur(28px) saturate(190%);
          backdrop-filter: blur(28px) saturate(190%);
          box-shadow: 0 18px 46px rgba(0,0,0,0.28), inset 0 1px 1px rgba(255,255,255,0.34);
        }

        .ios-window {
          -webkit-backdrop-filter: blur(34px) saturate(190%);
          backdrop-filter: blur(34px) saturate(190%);
          border: 1px solid rgba(255,255,255,0.26);
          border-top-color: rgba(255,255,255,0.48);
          box-shadow: 0 32px 80px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.28);
        }
        .ios-window-night {
          background: linear-gradient(145deg, rgba(16,24,32,0.52) 0%, rgba(10,16,22,0.62) 100%);
        }
        .ios-window-day {
          background: linear-gradient(145deg, rgba(28,44,58,0.34) 0%, rgba(18,30,42,0.42) 100%);
        }

        button { -webkit-tap-highlight-color: transparent; }
        @media (max-width: 640px) {
          .faruk-wallpaper { background-position: 58% center; transform: none; }
          .ios-folder, .ios-glass, .ios-card { -webkit-backdrop-filter: blur(18px) saturate(175%); backdrop-filter: blur(18px) saturate(175%); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
        }
      `}</style>
      <audio ref={audioRef} src="/muzik.mp3" loop preload="none" />

      {/* Yavaşça çizilen yılbaşı ağacı girişi */}
      <AnimatePresence>{!entered && <IntroSplash onEnter={handleEnterSystem} />}</AnimatePresence>

      {/* Duvar kağıdı: public/bg.jpg */}
      <div className="faruk-wallpaper" aria-hidden="true" />
      <div
        className={`fixed inset-0 z-[-2] pointer-events-none transition-all duration-1000 ${
          isDay
            ? "bg-gradient-to-b from-black/15 via-transparent to-black/25"
            : "bg-gradient-to-b from-[#060e15]/30 via-[#050f0e]/22 to-black/48"
        }`}
        aria-hidden="true"
      />
      <div className="faruk-grain" aria-hidden="true" />

      {/* Masaüstü Kar Yağışı Efekti */}
      {entered && <SnowfallCanvas boostSnow={boostSnow} />}

      {/* Üst Cam Durum Çubuğu & Dinamik Ada */}
      <header className="ios-glass relative z-20 flex items-center justify-between gap-2 border-b border-white/20 bg-white/8 px-3 py-2 text-xs font-medium text-white sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md border border-sky-300/40 bg-sky-400/25 text-[11px] font-black text-sky-200 backdrop-blur-md">
            F
          </span>
          <span className="tracking-wide font-semibold">Faruk OS</span>
        </div>

        {/* Merkez Dinamik Cam Ada */}
        <div className="relative">
          <button
            onClick={() => {
              playClickSound(soundFx);
              setIslandOpen((v) => !v);
            }}
            className="flex items-center gap-2.5 rounded-full border border-white/30 bg-black/35 px-3.5 py-1 text-[11px] font-medium text-white shadow-lg backdrop-blur-2xl transition hover:border-white/50 hover:bg-black/45 cursor-pointer"
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
            <span className="hidden md:inline text-white/85">{formattedDate}</span>
            <span className="md:hidden text-white/90">{formattedTime}</span>
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
                className="ios-card absolute left-1/2 top-10 z-40 w-72 -translate-x-1/2 rounded-3xl p-4 text-white shadow-2xl sm:w-80"
              >
                <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-sky-300" />
                    <span className="text-xs font-bold tracking-wide">Hızlı Kontrol Merkezi</span>
                  </div>
                  <span className="text-[10px] text-white/60">İzmir • Aktif</span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      playClickSound(soundFx);
                      setBoostSnow((v) => !v);
                    }}
                    className={`flex items-center gap-2 rounded-2xl border p-2.5 text-left text-xs transition cursor-pointer ${
                      boostSnow
                        ? "border-sky-300/50 bg-sky-400/25 text-white"
                        : "border-white/15 bg-white/8 text-white/80 hover:bg-white/15"
                    }`}
                  >
                    <Sparkles className="h-4 w-4 shrink-0 text-sky-300" />
                    <div>
                      <div className="font-semibold">Tipi Modu</div>
                      <div className="text-[10px] text-white/60">{boostSnow ? "Açık" : "Normal"}</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      playClickSound(soundFx);
                      setZenMode((v) => !v);
                    }}
                    className={`flex items-center gap-2 rounded-2xl border p-2.5 text-left text-xs transition cursor-pointer ${
                      zenMode
                        ? "border-emerald-300/50 bg-emerald-400/25 text-white"
                        : "border-white/15 bg-white/8 text-white/80 hover:bg-white/15"
                    }`}
                  >
                    <Compass className="h-4 w-4 shrink-0 text-emerald-300" />
                    <div>
                      <div className="font-semibold">Manzara</div>
                      <div className="text-[10px] text-white/60">{zenMode ? "Sade" : "Tam"}</div>
                    </div>
                  </button>
                </div>

                <div className="mt-2.5 flex items-center justify-between rounded-2xl border border-white/15 bg-white/8 px-3 py-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Radio className="h-3.5 w-3.5 text-rose-300" />
                    <span>Arka Plan Müziği</span>
                  </div>
                  <button
                    onClick={toggleMusic}
                    className="rounded-lg border border-white/25 bg-white/15 px-2.5 py-1 text-[11px] font-semibold hover:bg-white/25 cursor-pointer"
                  >
                    {musicPlaying ? "Durdur" : "Çal"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              playClickSound(soundFx);
              setThemeMode((v) => (v === "day" ? "night" : "day"));
            }}
            title={isDay ? "Koyu Cam Modu" : "Açık Cam Modu"}
            className="flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-amber-200 backdrop-blur-md transition hover:bg-white/20 cursor-pointer"
          >
            {isDay ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            <span className="hidden md:inline">{isDay ? "Açık Cam" : "Koyu Cam"}</span>
          </button>

          <button
            onClick={toggleMusic}
            title={musicPlaying ? "Müziği Durdur" : "Müziği Çal"}
            className="flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-amber-200 backdrop-blur-md transition hover:bg-white/20 cursor-pointer"
          >
            {musicPlaying ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{musicPlaying ? "Müzik Açık" : "Müzik Kapalı"}</span>
          </button>

          <Wifi className="hidden sm:block w-3.5 h-3.5" />
          <Battery className="hidden sm:block w-4 h-4" />
          <span className="hidden md:inline font-semibold text-white">{formattedTime}</span>
        </div>
      </header>

      {/* Ana Masaüstü Alanı */}
      <main className="relative z-10 mx-auto flex min-h-[calc(100svh-48px)] max-w-7xl flex-col justify-between px-3 py-4 sm:min-h-[calc(100dvh-76px)] sm:px-6 sm:py-6 lg:px-10">
        {/* 2027 Yılbaşı Ağacı ve Şans Kurabiyesi */}
        {!zenMode && <NewYearFeature isDay={isDay} soundFx={soundFx} />}

        {/* Şeffaf iOS Cam Klasör Izgarası */}
        {!zenMode && (
          <div className="my-auto py-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 2xl:grid-cols-8">
              {FOLDERS.map((folder) => {
                const Icon = folder.icon;
                return (
                  <button
                    key={folder.id}
                    onClick={() => openFolder(folder)}
                    className={`ios-folder group flex min-w-0 touch-manipulation flex-col items-center rounded-2xl p-3 transition-all duration-300 hover:-translate-y-1 active:scale-[.97] cursor-pointer sm:rounded-3xl sm:p-4 ${
                      isDay ? "ios-folder-day" : "ios-folder-night"
                    }`}
                  >
                    <div
                      className={`flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${folder.accent} border border-white/30 shadow-inner backdrop-blur-md`}
                    >
                      <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${folder.iconColor} drop-shadow`} />
                    </div>
                    <span className="mt-2.5 text-center text-xs font-semibold tracking-wide text-white drop-shadow-sm sm:text-sm">
                      {folder.title}
                    </span>
                    <span className="mt-0.5 text-center text-[10px] leading-tight text-white/75 sm:text-[11px]">
                      {folder.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Alt Şeffaf Cam Floating Dock */}
        <div className="ios-dock mx-auto mt-auto flex max-w-full items-center gap-2 overflow-x-auto rounded-3xl px-3 py-2 sm:gap-2.5">
          {FOLDERS.map((folder) => {
            const Icon = folder.icon;
            return (
              <button
                key={`dock-${folder.id}`}
                onClick={() => openFolder(folder)}
                title={folder.title}
                className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${folder.accent} border border-white/30 backdrop-blur-md transition-transform hover:-translate-y-1.5 hover:scale-110 active:scale-90 cursor-pointer`}
              >
                <Icon className={`h-5 w-5 ${folder.iconColor}`} />
              </button>
            );
          })}
        </div>
      </main>

      {/* Tam Ekran Şeffaf Cam Klasör Penceresi */}
      <AnimatePresence>
        {activeFolder && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 p-0 backdrop-blur-sm sm:p-4 md:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.18 }}
              className={`ios-window flex h-[100dvh] w-full max-w-5xl flex-col overflow-hidden text-white sm:h-[min(92dvh,900px)] sm:rounded-3xl ${
                isDay ? "ios-window-day" : "ios-window-night"
              }`}
            >
              {/* Üst Pencere Çubuğu */}
              <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/15 bg-white/8 px-3 py-3 sm:px-5 sm:py-3.5">
                <button
                  onClick={closeFolder}
                  className="flex items-center gap-2 rounded-xl border border-white/25 bg-white/12 px-3.5 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/22 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Masaüstü</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <activeFolder.icon className={`h-5 w-5 ${activeFolder.iconColor}`} />
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
                  <span className="h-3.5 w-3.5 rounded-full bg-amber-400/80" />
                  <span className="h-3.5 w-3.5 rounded-full bg-emerald-400/80" />
                </div>
              </div>

              {/* Alt Sekmeler */}
              {activeFolder.tabs.length > 1 && (
                <div className="flex gap-2 overflow-x-auto border-b border-white/15 bg-white/5 px-5 py-2.5">
                  {activeFolder.tabs.map((tab, idx) => (
                    <button
                      key={tab}
                      onClick={() => {
                        playClickSound(soundFx);
                        setActiveTab(idx);
                      }}
                      className={`rounded-xl px-4 py-1.5 text-sm font-medium whitespace-nowrap backdrop-blur-md transition cursor-pointer ${
                        activeTab === idx
                          ? "border border-white/35 bg-white/20 text-white"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              )}

              {/* Dinamik İçerik Alanı */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-6 md:p-8">
                {renderFolderContent()}
              </div>

              {/* Mobil Alt Çubuk */}
              <div className="sm:hidden flex justify-center border-t border-white/15 bg-white/5 py-3">
                <button
                  onClick={closeFolder}
                  className="h-1.5 w-32 rounded-full bg-white/45 active:bg-white"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}