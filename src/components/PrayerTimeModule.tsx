import React, { useState, useEffect, useRef } from "react";
import { 
  Clock, 
  MapPin, 
  Compass, 
  Settings, 
  Loader2, 
  RotateCw, 
  AlertCircle, 
  Sun,
  Moon,
  Sunset,
  Sunrise,
  Sparkles,
  ChevronRight
} from "lucide-react";

interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  source: "gps" | "default" | "custom";
}

// Preset holy and major cities for manual navigation/fallback
const PRESET_CITIES = [
  { name: "Makkah", country: "Saudi Arabia", lat: 21.4225, lng: 39.8262 },
  { name: "Medina", country: "Saudi Arabia", lat: 24.4672, lng: 39.6111 },
  { name: "Islamabad", country: "Pakistan", lat: 33.6844, lng: 73.0479 },
  { name: "Lahore", country: "Pakistan", lat: 31.5204, lng: 74.3587 },
  { name: "London", country: "United Kingdom", lat: 51.5074, lng: -0.1278 },
  { name: "New York", country: "United States", lat: 40.7128, lng: -74.0060 },
  { name: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357 },
  { name: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456 }
];

// Calculation Methods of Aladhan API
const CALC_METHODS = [
  { id: 1, name: "University of Islamic Sciences, Karachi" },
  { id: 2, name: "Islamic Society of North America (ISNA)" },
  { id: 3, name: "Muslim World League (MWL)" },
  { id: 4, name: "Umm Al-Qura University, Makkah" },
  { id: 5, name: "Egyptian General Authority of Survey" },
  { id: 7, name: "Institute of Geophysics, University of Tehran" },
  { id: 9, name: "Gulf Region" }
];

// Static default timings to show instantly in case of network issues (Makkah timings)
const DEFAULT_TIMINGS: Timings = {
  Fajr: "04:12",
  Sunrise: "05:38",
  Dhuhr: "12:22",
  Asr: "15:40",
  Maghrib: "19:05",
  Isha: "20:35"
};



export default function PrayerTimeModule({ languageCode }: { languageCode: string }) {
  // Geolocation & Settings state
  const [location, setLocation] = useState<LocationData>({
    latitude: 21.4225,
    longitude: 39.8262,
    city: "Makkah",
    country: "Saudi Arabia",
    source: "default"
  });

  const [timings, setTimings] = useState<Timings>(DEFAULT_TIMINGS);
  const [currentDateString, setCurrentDateString] = useState<string>("");
  const [hijriDateString, setHijriDateString] = useState<string>("");
  const [calcMethod, setCalcMethod] = useState<number>(1); // Default to Karachi (highly scholarly standard)
  const [loading, setLoading] = useState<boolean>(false);
  const [geoState, setGeoState] = useState<"checking" | "allowed" | "denied" | "unsupported">("checking");
  const [errorText, setErrorText] = useState<string>("");

  // Countdown States
  const [nextPrayerName, setNextPrayerName] = useState<string>("");
  const [nextPrayerTime, setNextPrayerTime] = useState<string>("");
  const [countdownString, setCountdownString] = useState<string>("00:00:00");
  const [countdownPercent, setCountdownPercent] = useState<number>(0);
  const [activePrayer, setActivePrayer] = useState<string>("");

  // Qibla Compass Heading & Simulation
  const [userHeading, setUserHeading] = useState<number>(0);

  // Helper formula to compute precise Qibla bearing relative to true north
  const getQiblaAngle = (lat: number, lng: number): number => {
    const K_LAT = 21.422487;
    const K_LNG = 39.826206;
    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180;
    const kLatRad = (K_LAT * Math.PI) / 180;
    const kLngRad = (K_LNG * Math.PI) / 180;
    
    const y = Math.sin(kLngRad - lngRad);
    const x = Math.cos(latRad) * Math.tan(kLatRad) - Math.sin(latRad) * Math.cos(kLngRad - lngRad);
    
    const angle = (Math.atan2(y, x) * 180) / Math.PI;
    return Math.round((angle + 360) % 360);
  };

  // Helper formula to compute precise distance to Al-Masjid an-Haram using Haversine
  const getKaabaDistance = (lat: number, lng: number): number => {
    const K_LAT = 21.422487;
    const K_LNG = 39.826206;
    const R = 6371; // km
    const dLat = ((K_LAT - lat) * Math.PI) / 180;
    const dLng = ((K_LNG - lng) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos((lat * Math.PI) / 180) * Math.cos((K_LAT * Math.PI) / 180) * 
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c); // km
  };

  const calculatedQiblaAngle = getQiblaAngle(location.latitude, location.longitude);
  const calculatedKaabaDistance = getKaabaDistance(location.latitude, location.longitude);



  // Initialize and check geolocation permissions
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoState("unsupported");
      fetchPrayerTimings(location.latitude, location.longitude, calcMethod);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoState("allowed");
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLocation({
          latitude: lat,
          longitude: lng,
          city: "Detected Location",
          country: "GPS Coordinates",
          source: "gps"
        });
        fetchPrayerTimings(lat, lng, calcMethod);
      },
      (error) => {
        console.warn("Geolocation access denied or timed out:", error);
        setGeoState("denied");
        // Fallback to Makkah of default location
        fetchPrayerTimings(location.latitude, location.longitude, calcMethod);
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 }
    );
  }, []);

  // Sync timings fetch on coordinate or method alterations
  const fetchPrayerTimings = async (lat: number, lng: number, methodId: number) => {
    setLoading(true);
    setErrorText("");
    try {
      // Use standard SSL proxy coordinate fetch from Aladhan API
      const timestamp = Math.floor(Date.now() / 1000);
      const url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lng}&method=${methodId}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error("Timing request received bad response from API");
      
      const responseData = await res.json();
      if (responseData && responseData.code === 200 && responseData.data) {
        const data = responseData.data;
        setTimings({
          Fajr: data.timings.Fajr,
          Sunrise: data.timings.Sunrise,
          Dhuhr: data.timings.Dhuhr,
          Asr: data.timings.Asr,
          Maghrib: data.timings.Maghrib,
          Isha: data.timings.Isha
        });
        
        // Save calendar strings
        if (data.date) {
          setCurrentDateString(data.date.readable || "");
          if (data.date.hijri) {
            const h = data.date.hijri;
            setHijriDateString(`${h.day} ${h.month.en} ${h.year} AH (${h.designation.expanded})`);
          }
        }

        // Reverse-geocode City/Country if coordinate is GPS
        if (lat !== 21.4225 || lng !== 39.8262) {
          try {
            const geoUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
            const geoRes = await fetch(geoUrl, { headers: { 'Accept-Language': 'en' } });
            if (geoRes.ok) {
              const geoData = await geoRes.json();
              const address = geoData.address || {};
              const cityLabel = address.city || address.town || address.village || address.suburb || "Local Region";
              const countryLabel = address.country || "Detected Area";
              setLocation(prev => ({
                ...prev,
                city: cityLabel,
                country: countryLabel
              }));
            }
          } catch (geoErr) {
            console.warn("Reverse proxy lookup bypassed:", geoErr);
          }
        }
      } else {
        throw new Error("Invalid schema inside returned payload");
      }
    } catch (err: any) {
      console.error("Adhan API failed. Utilizing offline theological approximations: ", err);
      setErrorText("Connecting to network timings failed. Showing offline astronomical approximations.");
      // Render approximated timings offline
      setTimings(DEFAULT_TIMINGS);
      setCurrentDateString(new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
      setHijriDateString("N/A AH (Offline Approximated Mode)");
    } finally {
      setLoading(false);
    }
  };

  // Preset location handler triggered by Buttons
  const selectPresetCity = (preset: typeof PRESET_CITIES[0]) => {
    setLocation({
      latitude: preset.lat,
      longitude: preset.lng,
      city: preset.name,
      country: preset.country,
      source: "custom"
    });
    fetchPrayerTimings(preset.lat, preset.lng, calcMethod);
  };

  // Re-detect GPS trigger
  const triggerRedetectGPS = () => {
    setLoading(true);
    setGeoState("checking");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoState("allowed");
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLocation({
          latitude: lat,
          longitude: lng,
          city: "Locating city...",
          country: "GPS Active",
          source: "gps"
        });
        fetchPrayerTimings(lat, lng, calcMethod);
      },
      (error) => {
        setGeoState("denied");
        setLoading(false);
        setErrorText("GPS authorization was not granted. Please allow location in your browser.");
      }
    );
  };

  // Manual configuration of calculation method
  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(e.target.value);
    setCalcMethod(val);
    fetchPrayerTimings(location.latitude, location.longitude, val);
  };



  // Math engines to parse prayer clock strings (like "13:20"), compute current/next, and provide live countdown
  useEffect(() => {
    const timer = setInterval(() => {
      calculateCountdown();
    }, 1000);

    // Run first immediately
    calculateCountdown();

    return () => clearInterval(timer);
  }, [timings]);

  const calculateCountdown = () => {
    const now = new Date();
    
    // Parse time helper
    const getPrayerTimeToday = (timeStr: string) => {
      const [hours, minutes] = timeStr.trim().split(":").map(Number);
      const prTime = new Date();
      prTime.setHours(hours, minutes, 0, 0);
      return prTime;
    };

    // Calculate prayer periods
    const pFajr = getPrayerTimeToday(timings.Fajr);
    const pSunrise = getPrayerTimeToday(timings.Sunrise);
    const pDhuhr = getPrayerTimeToday(timings.Dhuhr);
    const pAsr = getPrayerTimeToday(timings.Asr);
    const pMaghrib = getPrayerTimeToday(timings.Maghrib);
    const pIsha = getPrayerTimeToday(timings.Isha);

    // Pair into a clean lookup array
    const list = [
      { name: "Fajr", time: pFajr, str: timings.Fajr },
      { name: "Sunrise", time: pSunrise, str: timings.Sunrise },
      { name: "Dhuhr", time: pDhuhr, str: timings.Dhuhr },
      { name: "Asr", time: pAsr, str: timings.Asr },
      { name: "Maghrib", time: pMaghrib, str: timings.Maghrib },
      { name: "Isha", time: pIsha, str: timings.Isha }
    ];

    // Determine currently active Salah phase
    let currentPhase = "Isha"; 
    if (now >= pFajr && now < pSunrise) currentPhase = "Fajr";
    else if (now >= pSunrise && now < pDhuhr) currentPhase = "Sunrise";
    else if (now >= pDhuhr && now < pAsr) currentPhase = "Dhuhr";
    else if (now >= pAsr && now < pMaghrib) currentPhase = "Asr";
    else if (now >= pMaghrib && now < pIsha) currentPhase = "Maghrib";
    setActivePrayer(currentPhase);

    // Identify Next Prayer
    let target = list[0]; // Fajr by default
    let isNextDay = false;

    for (let i = 0; i < list.length; i++) {
      if (now < list[i].time) {
        target = list[i];
        break;
      }
      if (i === list.length - 1) {
        // Late night. Next is tomorrow's Fajr.
        isNextDay = true;
        target = { ...list[0] };
        target.time = new Date(target.time.getTime() + 24 * 60 * 60 * 1000);
      }
    }

    setNextPrayerName(target.name);
    setNextPrayerTime(target.str);

    // Difference calculations
    const diffMs = target.time.getTime() - now.getTime();
    if (diffMs <= 0) {
      setCountdownString("00:00:00");
      setCountdownPercent(100);
      return;
    }

    const totalSeconds = Math.floor(diffMs / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    const pad = (v: number) => String(v).padStart(2, "0");
    setCountdownString(`${pad(h)}:${pad(m)}:${pad(s)}`);

    // Determine the total duration of the current gap to show dynamic visual percentage fill
    // We approximate standard 4-hour slot length for progress visual representation
    const defaultGapSeconds = 4 * 60 * 60; 
    const elapsedSecs = defaultGapSeconds - totalSeconds;
    const progress = Math.max(0, Math.min(100, (elapsedSecs / defaultGapSeconds) * 100));
    setCountdownPercent(progress);
  };

  // Helper translations dict for localized accessibility
  const DICT: Record<string, any> = {
    en: {
      locationBadge: "Salah Coordinates Active",
      nextPrayerLabel: "NEXT PRAYER COUNTDOWN",
      gpsPerms: "GPS Geolocation:",
      statusLocating: "Locating browser...",
      statusAllowed: "Active Location GPS",
      statusDenied: "GPS Blocked — Manual Override",
      statusUnsupported: "GPS Offline",
      btnRedetect: "Re-detect GPS Coordinates",
      titleMethod: "Jurisprudential Calculation Method",
      hijriDate: "Hijri Scholarly Calendar",
      presetHeader: "Quick-Jump Preset Holy & Regional Centers",
      activeText: "CURRENTLY ACTIVE",
      compTitle: "Tactile 3D Qibla Direction Core",
      compSub: "Align yourself to face Makkah using this simulated 3D brass micro-compass.",
      compTargetAngle: "Qibla Bearing (True North)",
      compDist: "Distance to Al-Masjid an-Haram",
      compInstructions: "Rotate Dial Slider below to calibrate your phone or home direction. When the green Kaaba Pointer lines up precisely with North (0°), you are perfectly facing the Qibla!",
      compStatusAligned: "۞ QIBLA ALIGNED!",
      compStatusUnassigned: "Align Pointer to Top (0°)",
      compRotate: "Simulate Device Heading angle",
    },
    ur: {
      locationBadge: "نماز کے اوقات - لوکیشن فعال",
      nextPrayerLabel: "اگلی نماز کا وقت",
      gpsPerms: "جی پی ایس لوکیشن:",
      statusLocating: "لوکیشن کی تلاش جار‌ی ہے۔۔۔",
      statusAllowed: "فعال جی پی ایس لوکیشن",
      statusDenied: "جی پی ایس بلاک ہے - مینوئل منتخب کریں",
      statusUnsupported: "جی پی ایس کی سہولت موجود نہیں",
      btnRedetect: "لوکیشن دوبارہ تلاش کریں",
      titleMethod: "طریقہ کار برائے حساب اوقات",
      hijriDate: "ہجری اسلامی کیلنڈر",
      presetHeader: "مقدس اور بڑے شہروں کے فوری لنکس",
      activeText: "موجودہ وقت",
      compTitle: "تخلیقی 3D قبلہ کمپاس بورڈ",
      compSub: "اس تین جہتی (3D) کمپاس آلے کے ذریعے خانہ کعبہ کی درست سمت معلوم کریں۔",
      compTargetAngle: "قبلہ کا اینگل (شمال سے درجہ)",
      compDist: "مسجد الحرام (مکہ) سے کل فاصلہ",
      compInstructions: "اپنے آلے یا گھر کی سمت ایڈجسٹ کرنے کے لیے نیچے دیے گئے سلائیڈر کو گھمائیں۔ جب خانہ کعبہ کا نشان بالکل اوپر (0°) آ جائے، تو آپ قبلہ رخ ہوں گے!",
      compStatusAligned: "۞ قبلہ سیدھ میں ہے!",
      compStatusUnassigned: "نشان کو اوپر (0°) پر لائیں",
      compRotate: "ڈیوائس کا زاویہ گھمائیں",
    },
    ar: {
      locationBadge: "مواقيت الصلاة مفعلة",
      nextPrayerLabel: "الوقت المتبقي لِلصلاة التالية",
      gpsPerms: "تحديد الموقع:",
      statusLocating: "جاري البحث عن الموقع الميداني...",
      statusAllowed: "تحديد الموقع التلقائي نشط",
      statusDenied: "الموقع محظور - يرجى الاختيار يدوياً",
      statusUnsupported: "الموقع غير متوفر",
      btnRedetect: "إعادة تحديد الموقع الجغرافي",
      titleMethod: "طريقة حساب مواقيت الصلاة",
      hijriDate: "التقويم الهجري الشريف",
      presetHeader: "الانتقال السريع للمدن الإسلامية والعالمية الكبرى",
      activeText: "الصلاة الحالية",
      compTitle: "بوصلة القبلة الرائعة ثلاثية الأبعاد",
      compSub: "حدد اتجاه الكعبة المشرفة بدقة متناهية باستخدام أداة المحاكاة ثلاثية الأبعاد.",
      compTargetAngle: "زاوية انحراف القبلة (عن الشمال)",
      compDist: "المسافة الكلية إلى المسجد الحرام",
      compInstructions: "قم بتدوير المؤشر بالأسفل لمعاِيرة الاتجاه. عندما يتماشى مؤشر الكعبة الأخضر تماماً مع اتجاه الشمال (0°)، فأنت تواجه القبلة مباشرة!",
      compStatusAligned: "۞ القبلة باتجاهك تماماً!",
      compStatusUnassigned: "قم بمحاذاة المؤشر إلى الأعلى (0°)",
      compRotate: "محاكاة دوران الجهاز الجغرافي",
    }
  };

  const localized = DICT[languageCode] || DICT["en"];

  // Mapping of icons corresponding to individual prayer times for spectacular visual design
  const getPrayerIcon = (name: string, isActive: boolean) => {
    const activeColor = isActive ? "text-islamic-gold" : "text-emerald-700";
    switch(name) {
      case "Fajr":
        return <Sunrise className={`w-5 h-5 ${activeColor}`} />;
      case "Sunrise":
        return <Sun className={`w-5 h-5 text-amber-500`} />;
      case "Dhuhr":
        return <Sun className={`w-5 h-5 ${activeColor}`} />;
      case "Asr":
        return <Sun className={`w-5 h-5 text-amber-700`} />;
      case "Maghrib":
        return <Sunset className={`w-5 h-5 ${activeColor}`} />;
      case "Isha":
        return <Moon className={`w-5 h-5 ${activeColor}`} />;
      default:
        return <Clock className={`w-5 h-5 ${activeColor}`} />;
    }
  };

  return (
    <div id="prayer-times-section" className="bg-white rounded-3xl border border-islamic-green/10 shadow-xl p-6 sm:p-8 space-y-8 relative overflow-hidden transition-all hover:border-islamic-green/20">
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_top_right,_var(--color-islamic-gold)_0px,_transparent_70%)] opacity-10 pointer-events-none"></div>

      {/* 2. HEADER CONTAINER WITH LOCATOR STATUS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-islamic-green font-bold text-xs rounded-full border border-emerald-100 uppercase tracking-wider select-none">
            <Compass className="w-3.5 h-3.5 text-islamic-gold animate-spin-slow" />
            <span>{localized.locationBadge}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            {location.city}, <span className="text-islamic-green">{location.country}</span>
          </h3>

          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-slate-500">
            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded-lg">LAT: {location.latitude.toFixed(4)}°N</span>
            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded-lg font-bold">LNG: {location.longitude.toFixed(4)}°E</span>
            <span className="text-slate-300">|</span>
            {hijriDateString && (
              <span className="text-emerald-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-islamic-gold fill-islamic-gold/10" />
                {hijriDateString}
              </span>
            )}
          </div>
        </div>

        {/* GPS Control center actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-right">
            <span className="block text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">{localized.gpsPerms}</span>
            <span className={`text-xs font-bold ${geoState === "allowed" ? "text-emerald-600" : geoState === "checking" ? "text-slate-500" : "text-amber-600"}`}>
              {geoState === "allowed" ? localized.statusAllowed : geoState === "checking" ? localized.statusLocating : localized.statusDenied}
            </span>
          </div>

          <button
            onClick={triggerRedetectGPS}
            disabled={loading}
            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 active:scale-95 transition-all rounded-xl border border-slate-200 cursor-pointer flex items-center justify-center gap-1.5"
            title={localized.btnRedetect}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 text-emerald-700 animate-spin" />
            ) : (
              <RotateCw className="w-4 h-4 text-emerald-700" />
            )}
            <span className="text-xs font-bold text-slate-700">{localized.btnRedetect}</span>
          </button>
        </div>
      </div>

      {/* API Failure Notice */}
      {errorText && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-2.5 text-xs text-amber-800 font-semibold leading-relaxed">
          <AlertCircle className="w-4.5 h-4.5 text-amber-600 shrink-0" />
          <span>{errorText}</span>
        </div>
      )}

      {/* 2. MAIN SPLIT GRID: COUNTDOWN & PRAYER TIMINGS DISPLAY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COUNTDOWN BOARD (Takes 1 span) */}
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 relative overflow-hidden shadow-xl border border-emerald-800/20 flex flex-col justify-between">
          
          {/* Subtle starry background texture */}
          <div className="absolute inset-0 bg-radial-gradient-slate opacity-45 pointer-events-none"></div>

          <div className="space-y-6 relative z-10">
            <div>
              <span className="text-[10px] bg-white/10 text-islamic-gold px-2.5 py-1 rounded-full font-extrabold uppercase tracking-widest border border-white/5 inline-block">
                {localized.nextPrayerLabel}
              </span>
            </div>

            <div className="space-y-1">
              <span className="block text-sm text-slate-300 font-bold tracking-wide">Next Obligation:</span>
              <h4 className="text-3xl font-extrabold text-white font-display uppercase tracking-tight flex items-center gap-2">
                {nextPrayerName}
                <span className="text-islamic-gold text-lg">({nextPrayerTime})</span>
              </h4>
            </div>

            {/* Huge Clock Segment with high tracking */}
            <div className="py-2">
              <span className="block text-4xl sm:text-5xl font-extrabold tracking-widest text-white font-mono drop-shadow-[0_2px_10px_rgba(212,175,55,0.25)]">
                {countdownString}
              </span>
              <p className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-wide">Hours : Minutes : Seconds remaining</p>
            </div>

            {/* Customized visual progress bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] text-slate-300 font-bold uppercase tracking-wider">
                <span>Previous Prayer</span>
                <span>{countdownPercent.toFixed(0)}% Elapsed</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-islamic-gold to-yellow-300 transition-all duration-1000"
                  style={{ width: `${countdownPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

        </div>

        {/* TIMINGS LIST CARDS (Takes 2 span) */}
        <div className="lg:col-span-2 flex flex-col justify-between gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {Object.keys(timings).map((pName) => {
              const isPrayerActive = activePrayer === pName;
              return (
                <div
                  key={pName}
                  className={`relative p-5 rounded-2xl border transition-all duration-200 ${
                    isPrayerActive
                      ? "bg-gradient-to-b from-emerald-50 to-emerald-100 scale-[1.02] border-emerald-400 ring-2 ring-emerald-400/20 shadow-md"
                      : "bg-slate-50 border-slate-100 hover:bg-slate-100/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wide text-slate-500 font-mono">
                      {pName}
                    </span>
                    {getPrayerIcon(pName, isPrayerActive)}
                  </div>

                  <div className="mt-3.5 space-y-1">
                    <span className="block text-2xl font-black text-slate-900 font-mono tracking-tight">
                      {timings[pName]}
                    </span>
                    
                    {isPrayerActive && (
                      <span className="inline-flex items-center gap-1 text-[8px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wide">
                        <span className="w-1 h-1 rounded-full bg-white animate-ping"></span>
                        {localized.activeText}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Method selections */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="space-y-0.5">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                {localized.titleMethod}
              </label>
              <span className="text-[11px] text-slate-500 font-semibold">Aligning to regional conventions</span>
            </div>

            <select
              value={calcMethod}
              onChange={handleMethodChange}
              className="bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl py-2 px-3 focus:outline-none focus:ring-1 focus:ring-islamic-green focus:border-transparent select-none shrink-0"
            >
              {CALC_METHODS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* ========================================================== */}
      {/* 3D TACTILE QIBLA COMPASS & KAABA FINDER COMPONENT */}
      {/* ========================================================== */}
      <div id="qibla-3d-compass-core" className="bg-gradient-to-br from-[#FAF8F5] to-[#F1EDE4] border border-islamic-gold/20 rounded-3xl p-6 sm:p-8 shadow-[0_12px_35px_rgba(27,94,32,0.06)] space-y-6 relative overflow-hidden">
        
        {/* Glowing aura for when compass alignment matches */}
        {(Math.abs(userHeading - calculatedQiblaAngle) <= 4 || Math.abs(userHeading - calculatedQiblaAngle) >= 356) && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-islamic-gold)_0px,_transparent_70%)] opacity-10 pointer-events-none animate-pulse-slow"></div>
        )}

        <div className="flex flex-col md:flex-row items-start justify-between gap-6 border-b border-slate-200/60 pb-5">
          <div className="space-y-1">
            <h4 className="text-xl font-extrabold text-slate-900 font-display tracking-tight flex items-center gap-2">
              <Compass className="w-5.5 h-5.5 text-islamic-gold animate-spin-slow" />
              <span>{localized.compTitle}</span>
              <span className="text-[9px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-800 border border-emerald-200 rounded px-1.5 py-0.5">
                3D-Orthogonal
              </span>
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              {localized.compSub}
            </p>
          </div>
          
          <div className="text-right shrink-0">
            <span className="block text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">
              Kaaba GPS Destination
            </span>
            <span className="text-xs font-mono font-bold text-slate-700">
              21.4225° N, 39.8262° E
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Angle Dial Side (Takes 5 columns) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-5">
            
            {/* 3D Looking Perspective Compass Stage */}
            <div className="relative p-6 bg-slate-900/5 rounded-3xl border border-dashed border-slate-300/60 flex items-center justify-center w-full max-w-[320px] aspect-square shadow-inner">
              
              {/* Stand background plate shadows */}
              <div className="absolute w-52 h-52 bg-slate-950/20 rounded-full blur-xl transform translate-y-6"></div>

              {/* 3D Perspective tilting frame */}
              <div 
                className="relative w-52 h-52 bg-gradient-to-b from-[#1C281F] to-[#0A100C] rounded-full border-[6px] border-double border-islamic-gold shadow-[0_20px_45px_rgba(0,0,0,0.55)] flex items-center justify-center select-none transition-all duration-300"
                style={{ 
                  transform: 'perspective(700px) rotateX(32deg) rotateY(0deg)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 4px 12px rgba(255,255,255,0.1)'
                }}
              >
                {/* Decorative golden geometric outer star (Rub el Hizb detail printed inside) */}
                <div className="absolute inset-4 rounded-full border border-islamic-gold/15 rotate-45 pointer-events-none"></div>
                <div className="absolute inset-4 rounded-full border border-islamic-gold/15 -rotate-45 pointer-events-none"></div>

                {/* Rotating Compass Dial Ring */}
                <div 
                  className="absolute inset-2 rounded-full border border-islamic-gold/30 transition-transform duration-500 ease-out flex items-center justify-center"
                  style={{ transform: `rotate(${-userHeading}deg)` }}
                >
                  {/* Cardinal letters (North, South, East, West) inside dial */}
                  <span className="absolute top-1 text-xs font-mono font-black text-rose-500">N</span>
                  <span className="absolute right-1 text-[10px] font-mono font-bold text-slate-400">E</span>
                  <span className="absolute bottom-1 text-[10px] font-mono font-bold text-slate-400">S</span>
                  <span className="absolute left-1 text-[10px] font-mono font-bold text-slate-400">W</span>

                  {/* Tick degree marks around dial */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                    <div className="w-[1px] h-full border-t-[4px] border-b-[4px] border-slate-300"></div>
                    <div className="w-full h-[1px] border-l-[4px] border-r-[4px] border-slate-300"></div>
                    <div className="w-[1px] h-full border-t-[3px] border-b-[3px] border-slate-400 rotate-30"></div>
                    <div className="w-[1px] h-full border-t-[3px] border-b-[3px] border-slate-400 rotate-60"></div>
                    <div className="w-[1px] h-full border-t-[3px] border-b-[3px] border-slate-400 rotate-120"></div>
                    <div className="w-[1px] h-full border-t-[3px] border-b-[3px] border-slate-400 rotate-150"></div>
                  </div>
                </div>

                {/* RELATIVE KAABA POINTER (Arrow needle) */}
                {/* It rotates dynamically to computedQiblaAngle - userHeading degrees! */}
                <div 
                  className="absolute w-full h-full pointer-events-none transition-transform duration-500 ease-out flex items-center justify-center z-20"
                  style={{ transform: `rotate(${calculatedQiblaAngle - userHeading}deg)` }}
                >
                  {/* Glowing line representing the needle */}
                  <div className="w-[2.5px] h-[92px] bg-gradient-to-b from-[#10B981] via-[#D4AF37] to-transparent rounded-full relative">
                    {/* The pointer head (Green Kaaba Arrow / Dome head pointing North relative) */}
                    <div className="absolute -top-[10px] -left-[10px] w-6 h-6 flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] border-b-emerald-400 drop-shadow-[0_0_8px_#10B981]"></div>
                    </div>

                    {/* Miniature center pivot brass bolt */}
                    <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-yellow-200 to-islamic-gold rounded-full border border-yellow-600 shadow-md"></div>
                  </div>
                </div>

                {/* Subdued True North Fixed Marker at top of compass housing */}
                <div className="absolute top-[2px] w-1.5 h-3 bg-red-600 rounded-b-full shadow z-30"></div>
              </div>
            </div>

            {/* Display alignment verbal state */}
            {(Math.abs(userHeading - calculatedQiblaAngle) <= 4 || Math.abs(userHeading - calculatedQiblaAngle) >= 356) ? (
              <div className="px-5 py-1.5 bg-emerald-600 text-white border-2 border-emerald-400 text-xs sm:text-sm font-black rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] tracking-wider animate-bounce flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-islamic-gold fill-islamic-gold/20" />
                <span>{localized.compStatusAligned}</span>
              </div>
            ) : (
              <div className="px-5 py-1.5 bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold rounded-full select-none">
                <span>{localized.compStatusUnassigned}</span>
              </div>
            )}
            
          </div>

          {/* Configuration and details panel on right (Takes 7 columns) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Quick telemetry bento items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                <span className="block text-[9px] text-slate-400 font-extrabold uppercase tracking-widest mb-1">
                  {localized.compTargetAngle}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 font-mono">
                    {calculatedQiblaAngle}°
                  </span>
                  <span className="text-xs text-slate-500 font-bold">from North Clockwise</span>
                </div>
                <span className="block text-[10px] text-slate-400 mt-1 font-semibold leading-relaxed">
                  Kaaba direction computed from current GPS coordinates.
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                <span className="block text-[9px] text-slate-400 font-extrabold uppercase tracking-widest mb-1">
                  {localized.compDist}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                    {calculatedKaabaDistance.toLocaleString()}
                  </span>
                  <span className="text-xs text-emerald-800 font-bold">km</span>
                </div>
                <span className="block text-[10px] text-slate-400 mt-1 font-semibold leading-relaxed">
                  Great-circle geodesic distance straight to Makkah.
                </span>
              </div>
            </div>

            {/* Slider to simulate rotating device heading */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3.5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  {localized.compRotate}
                </span>
                <span className="font-mono bg-slate-100 text-slate-800 px-2 py-0.5 rounded-lg text-xs">
                  {userHeading}°
                </span>
              </div>

              <input 
                type="range" 
                min="0" 
                max="360" 
                value={userHeading}
                onChange={(e) => setUserHeading(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
              />

              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                <span>0° N</span>
                <span>90° E</span>
                <span>180° S</span>
                <span>270° W</span>
                <span>360° N</span>
              </div>
            </div>

            {/* Explanatory visual cues */}
            <div className="bg-amber-50/50 border border-amber-200/50 p-4 rounded-2xl text-[11px] sm:text-xs text-amber-950 leading-relaxed font-semibold">
              <p>💡 **Calibration Instructions:**</p>
              <p className="text-slate-600 mt-1 font-medium">{localized.compInstructions}</p>
            </div>

          </div>

        </div>

      </div>

      {/* 3. PRESET CITIES JUMP BOARD */}
      <div className="border-t border-slate-100 pt-5 space-y-3.5">
        <div>
          <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            {localized.presetHeader}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {PRESET_CITIES.map((city) => (
            <button
              key={city.name}
              onClick={() => selectPresetCity(city)}
              className="px-3.5 py-2 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 hover:border-emerald-300 font-bold text-xs rounded-xl border border-slate-200 transition-all cursor-pointer active:scale-95 flex items-center gap-1 shrink-0"
            >
              <MapPin className="w-3.5 h-3.5 text-islamic-gold" />
              <span>{city.name}</span>
              <ChevronRight className="w-2.5 h-2.5 opacity-40 ml-0.5" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
