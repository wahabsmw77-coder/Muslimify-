import React, { useState, useEffect } from "react";
import { 
  Compass, MapPin, Sparkles, Navigation, RotateCw, 
  RefreshCw, Layers, Sliders, Info, ExternalLink, HelpCircle, CheckCircle2 
} from "lucide-react";

interface QiblaModuleProps {
  languageCode: string;
}

// Preset cities to simulate locations with precise coordinates
const PRESET_CITIES = [
  { name_en: "Makkah (Kaaba)", name_ur: "مکہ مکرمہ", name_ar: "مكة المكرمة", lat: 21.422487, lng: 39.826206 },
  { name_en: "Medina Munawwarah", name_ur: "مدینہ منورہ", name_ar: "المدينة المنورة", lat: 24.4672, lng: 39.6111 },
  { name_en: "Jerusalem (Al-Aqsa)", name_ur: "بيت المقدس", name_ar: "القدس الشريف", lat: 31.7761, lng: 35.2358 },
  { name_en: "Lahore (Pakistan)", name_ur: "لاہور", name_ar: "لاهور", lat: 31.5204, lng: 74.3587 },
  { name_en: "London (UK)", name_ur: "لندن", name_ar: "لندن", lat: 51.5074, lng: -0.1278 },
  { name_en: "Karachi (Pakistan)", name_ur: "کراچی", name_ar: "كراتشي", lat: 24.8607, lng: 67.0011 },
  { name_en: "New York (USA)", name_ur: "نیویارک", name_ar: "نيويورك", lat: 40.7128, lng: -74.0060 },
  { name_en: "Kuala Lumpur", name_ur: "کوالالمپور", name_ar: "كوالالمبور", lat: 3.1390, lng: 101.6869 }
];

export default function QiblaModule({ languageCode }: QiblaModuleProps) {
  // Current location simulation states
  const [selectedCityIndex, setSelectedCityIndex] = useState<number>(3); // Default Lahore
  const [customLat, setCustomLat] = useState<number>(31.5204);
  const [customLng, setCustomLng] = useState<number>(74.3587);
  const [useCustomGeo, setUseCustomGeo] = useState<boolean>(false);
  const [geoError, setGeoError] = useState<string>("");

  // 3D Tilt and Rotation simulation states
  const [deviceHeading, setDeviceHeading] = useState<number>(45); // Initial simulated device offset (True North is 0°)
  const [tiltX, setTiltX] = useState<number>(35); // 3D Perspective Tilt around X-axis (degree)
  const [tiltY, setTiltY] = useState<number>(0);  // 3D Perspective Tilt around Y-axis (degree)
  const [brassTheme, setBrassTheme] = useState<"vintage-gold" | "royal-emerald" | "ancient-bronze">("vintage-gold");
  const [activeGuidePage, setActiveGuidePage] = useState<number>(1);

  // Map view tracking states
  const [showMapView, setShowMapView] = useState<boolean>(false);
  const [leafletLoaded, setLeafletLoaded] = useState<boolean>(false);

  // Load Leaflet resources dynamically on demand 
  useEffect(() => {
    if (!showMapView) return;
    if ((window as any).L) {
      setLeafletLoaded(true);
      return;
    }

    // Load Leaflet CSS stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    // Load Leaflet Javascript bundle
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => {
      setLeafletLoaded(true);
    };
    document.body.appendChild(script);
  }, [showMapView]);

  // Hardware Compass Sensor status
  const [sensorStatus, setSensorStatus] = useState<"idle" | "requesting" | "active" | "denied" | "unsupported">("idle");
  const [sensorErrorMsg, setSensorErrorMsg] = useState<string>("");
  const [hasReceivedSensorData, setHasReceivedSensorData] = useState<boolean>(false);

  // Initialize and Update live Leaflet dynamic map instance
  useEffect(() => {
    if (!showMapView || !leafletLoaded) return;

    const L = (window as any).L;
    if (!L) return;

    const userCoords: [number, number] = [customLat, customLng];
    const kaabaCoords: [number, number] = [21.422487, 39.826206];

    // Ensure map target element renders correctly before running setup
    const container = document.getElementById("qibla-leaflet-map");
    if (!container) return;

    // Create Leaflet Map Instance
    const map = L.map("qibla-leaflet-map", {
      center: userCoords,
      zoom: 3,
      zoomControl: true,
      maxBoundsViscosity: 1.0
    });

    // Mount OSM Tiles securely with beautiful high resolution
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Create stylized HTML-based icons to avoid bundler asset matching bugs 
    const userIcon = L.divIcon({
      className: "custom-leaflet-user-marker",
      html: `
        <div class="relative flex items-center justify-center">
          <span class="absolute inline-flex h-6 w-6 rounded-full bg-emerald-400 opacity-60 animate-ping"></span>
          <div class="relative w-7 h-7 bg-emerald-600 rounded-full border-2 border-white flex items-center justify-center shadow-lg text-white font-bold text-xs">
            📍
          </div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const kaabaIcon = L.divIcon({
      className: "custom-leaflet-kaaba-marker",
      html: `
        <div class="w-10 h-10 bg-slate-950 border border-yellow-400 rounded-lg flex items-center justify-center shadow-lg text-lg select-none">
          🕋
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    // Add User position marker
    const userMarkerName = languageCode === "ur" ? "آپ کا مقام" : "Your Location";
    const userMarker = L.marker(userCoords, { icon: userIcon }).addTo(map)
      .bindPopup(`<div class="font-sans leading-tight text-xs p-1"><b>${userMarkerName}</b><br/>Lat: ${customLat.toFixed(4)}<br/>Lng: ${customLng.toFixed(4)}</div>`);

    // Add Holy Kaaba marker
    const kaabaMarkerName = languageCode === "ur" ? "خانہ کعبہ (مکہ مکرمہ)" : "The Holy Kaaba (Makkah)";
    const kaabaMarker = L.marker(kaabaCoords, { icon: kaabaIcon }).addTo(map)
      .bindPopup(`<div class="font-sans leading-tight text-xs p-1"><b>${kaabaMarkerName}</b><br/>Bearing: ${qiblaAngle}° N to E<br/>Distance: ${kaabaDistance.toLocaleString()} km</div>`);

    // Draw geodesic / directional route connection
    const routeLine = L.polyline([userCoords, kaabaCoords], {
      color: "#10B981", // Emerald Green
      weight: 3.5,
      opacity: 0.85,
      dashArray: "8, 8",
      lineCap: "round",
      lineJoin: "round"
    }).addTo(map);

    // Zoom and pan fitting to perfectly contain both markers with padded breathing space
    const bounds = L.latLngBounds([userCoords, kaabaCoords]);
    map.fitBounds(bounds, { padding: [40, 40] });

    // Open user popup by default as a warm visual onboarding guidance
    userMarker.openPopup();

    return () => {
      map.remove();
    };
  }, [showMapView, leafletLoaded, customLat, customLng, languageCode]);

  useEffect(() => {
    if (sensorStatus !== "active") return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading = 0;
      // 1. iOS Safari compass heading relative to magnetic north
      if ((e as any).webkitCompassHeading !== undefined) {
        heading = (e as any).webkitCompassHeading;
      } 
      // 2. Android Chrome absolute orientation positioning
      else if (e.alpha !== null) {
        heading = (360 - e.alpha) % 360;
      } else {
        return;
      }

      setDeviceHeading(Math.round(heading));
      setHasReceivedSensorData(true);

      // 3D physical tilt mechanics based on phone gravity
      if (e.beta !== null && e.gamma !== null) {
        const targetTiltX = Math.max(15, Math.min(65, 35 + (e.beta / 2.5)));
        const targetTiltY = Math.max(-30, Math.min(30, e.gamma / 2));
        setTiltX(Math.round(targetTiltX));
        setTiltY(Math.round(targetTiltY));
      }
    };

    const win = window as any;
    const hasAbsolute = "ondeviceorientationabsolute" in win;

    if (hasAbsolute) {
      win.addEventListener("deviceorientationabsolute", handleOrientation, true);
    } else {
      win.addEventListener("deviceorientation", handleOrientation, true);
    }

    return () => {
      if (hasAbsolute) {
        win.removeEventListener("deviceorientationabsolute", handleOrientation, true);
      } else {
        win.removeEventListener("deviceorientation", handleOrientation, true);
      }
    };
  }, [sensorStatus]);

  const requestCompassPermission = async () => {
    setSensorErrorMsg("");
    setSensorStatus("requesting");

    if (!window.DeviceOrientationEvent) {
      setSensorStatus("unsupported");
      setSensorErrorMsg("The Device Orientation API is not supported on this browser or hardware profile.");
      return;
    }

    try {
      const iosPermissionFunc = (DeviceOrientationEvent as any).requestPermission;
      if (typeof iosPermissionFunc === "function") {
        const response = await iosPermissionFunc();
        if (response === "granted") {
          setSensorStatus("active");
        } else {
          setSensorStatus("denied");
          setSensorErrorMsg("Permissions designated for motion/heading tracking were denied by current user settings.");
        }
      } else {
        setSensorStatus("active");
      }
    } catch (err: any) {
      console.error("Orientation error", err);
      setSensorStatus("active");
    }
  };

  // Localization resources
  const textResources: Record<string, any> = {
    en: {
      title: "Interactive Mechanical Qibla Desk",
      subtitle: "Align yourself to Makkah with our 3D spatial micro-rendered dynamic compass.",
      badge: "Tactile 3D Mechanics",
      hdrTrueNorth: "Compass Deviation (North)",
      hdrTargetBearing: "Qibla Bearing (True North)",
      hdrDistance: "Distance to Masjid al-Haram",
      btnDetectGeo: "Access Current Browser GPS",
      geoSuccess: "GPS coordinates active!",
      presets: "Geographical Focal Centers & Presets",
      customCoords: "Manual Global Coordinates Settings",
      latLabel: "Latitude (°N)",
      lngLabel: "Longitude (°E)",
      alignmentSuccess: "۞ PERFECT QIBLA ALIGNMENT!",
      alignmentInstructions: "Calibrate your position by dragging the Dial Slider. Align the emerald compass arrow with 0° (True Top Pointer) to face Qibla.",
      rotateHeading: "Simulate device heading rotation dial",
      perspectiveTilt: "Mechanical 3D Perspective Pitch Angle",
      rollTilt: "Gyroscopic 3D Roll Angle",
      specularSettings: "Brass Cast Dial Material Presets",
      themeGold: "Imperial Gilded Brass",
      themeEmerald: "Emerald Court Inlay",
      themeBronze: "Mesopotamian Antique Bronze",
      howToHeading: "Mathematical Foundations & Verification",
      learnMore: "The Qibla is computed using the spherical Haversine trigonometric method, calculating the shortest great-circle geodesic curve from your coordinates directly to the center of the Holy Kaaba in Makkah (21.4224° N, 39.8262° E)."
    },
    ur: {
      title: "متحرک تین جہتی (3D) قبلہ کمپاس بورڈ",
      subtitle: "اس جدید 3D کمپاس کے ذریعے خانہ کعبہ کی درست ترین سمت کا مشاہدہ کریں۔",
      badge: "جدید 3D تکنیک",
      hdrTrueNorth: "کمپاس کا زاویہ (شمال سے)",
      hdrTargetBearing: "قبلہ کا اینگل (شمال سے درجہ)",
      hdrDistance: "مسجد الحرام (مکہ) سے کل فاصلہ",
      btnDetectGeo: "برائوزر کا لائیو GPS آن کریں",
      geoSuccess: "لائیو GPS کامیابی سے موصول ہوا!",
      presets: "مقدس اور بڑے شہروں کے فوری لنکس",
      customCoords: "لوکیشن کی مینوئل سیٹنگ (طول و عرض)",
      latLabel: "عرض بلد (Latitude)",
      lngLabel: "طول بلد (Longitude)",
      alignmentSuccess: "۞ قبلہ سیدھ میں ہے (ماشاء اللہ)!",
      alignmentInstructions: "کمپاس کو ایڈجسٹ کرنے کے لیے نیچے دیے گئے سلائیڈر کو گھمائیں۔ جب سبز نشان بالکل اوپر (0°) آ جائے، تو آپ قبلہ رخ ہوں گے۔",
      rotateHeading: "ڈیوائس کی سمت کا زاویہ تبدیل کریں",
      perspectiveTilt: "کمپاس کے دیکھنے کا جھکاؤ (3D Angle)",
      rollTilt: "کمپاس کا گولائی میں جھکاؤ (Roll)",
      specularSettings: "کمپاس کا مٹیریل تھیم منتخب کریں",
      themeGold: "شاہی سنہری پیتل (Brass)",
      themeEmerald: "زمردی اسلامک کوٹ",
      themeBronze: "قدیمی تانبا (Bronze)",
      howToHeading: "قبلہ فائنڈر کے اصول اور سائنس",
      learnMore: "قبلہ کے رخ کا حساب گلوبل جیوڈیسک گریٹ سرکل فارمولے کے ذریعے لگایا جاتا ہے۔ یہ فارمولا آپ کی لائیو لوکیشن اور خانہ کعبہ کے حقیقی جغرافیائی کوآرڈینیٹس (21.4224° N, 39.8262° E) کے درمیان کروی مثلثی زاویہ ماپتا ہے۔"
    },
    ar: {
      title: "بوصلة القبلة ثلاثية الأبعاد الفاخرة",
      subtitle: "حدد اتجاه الكعبة المشرفة بدقة متناهية باستخدام أداة المحاكاة ثلاثية الأبعاد والتحكم الفضائي التام.",
      badge: "التحكم الميكانيكي 3D",
      hdrTrueNorth: "انحراف الجهاز (عن الشمال)",
      hdrTargetBearing: "زاوية انحراف القبلة (من الشمال)",
      hdrDistance: "المسافة الكلية إلى الكعبة",
      btnDetectGeo: "تفعيل لقطة الـ GPS الحية",
      geoSuccess: "تم الحصول على إحداثيات GPS بنجاح!",
      presets: "المراكز الجغرافية والمدن الإسلامية المثبتة",
      customCoords: "تعديل الإحداثيات يدوياً",
      latLabel: "خط العرض",
      lngLabel: "خط الطول",
      alignmentSuccess: "۞ تم محاذاة القبلة بالكامل!",
      alignmentInstructions: "قم بتدوير مقبض الجهاز بالأسفل للمعايرة الجغرافية. عندما يستقر المؤشر الأخضر اللامع للأعلى تماماً (0°)، فأنت باتجاه الكعبة المشرفة.",
      rotateHeading: "محاكاة دوران زاوية الجهاز الجغرافي",
      perspectiveTilt: "زاوية ميلان المنظور ثلاثي الأبعاد",
      rollTilt: "زاوية الدوران الجانبي للبوصلة",
      specularSettings: "اختر نوع وتصميم البوصلة الفني",
      themeGold: "النحاس المذهب الإمبراطوري",
      themeEmerald: "بطانة الزمرد والذهب",
      themeBronze: "البرونز البابلي العتيق",
      howToHeading: "الأسس الحسابية لحساب القبلة المعتمدة",
      learnMore: "يتم حساب زاوية القبلة الكونية بدقة متناهية بالاعتماد على حساب المثلثات الكروية، وصيغة مسافة الدائرة العظمى، لربط موقعك الجغرافي مباشرة بإحداثيات الكعبة المشرفة في مكة المكرمة (21.4224° شمالاً، 39.8262° شرقاً)."
    }
  };

  const currentLangText = textResources[languageCode] || textResources["en"];

  // Fetch precise device coordinates if user requests live browser orientation
  const handleDetectCoordinates = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation services are not supported by your internet browser node.");
      return;
    }
    setGeoError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCustomLat(parseFloat(pos.coords.latitude.toFixed(6)));
        setCustomLng(parseFloat(pos.coords.longitude.toFixed(6)));
        setUseCustomGeo(true);
      },
      (err) => {
        console.warn("GPS access failed", err);
        setGeoError("Could not determine live geo coords. Please select a regional preset city below.");
      }
    );
  };

  // Switch between preset cities
  const selectPreset = (idx: number) => {
    setSelectedCityIndex(idx);
    setUseCustomGeo(false);
    setCustomLat(PRESET_CITIES[idx].lat);
    setCustomLng(PRESET_CITIES[idx].lng);
  };

  // Spherical Trigonometry Formula to compute precise Qibla bearing from True North
  const calculateQiblaAngle = (lat: number, lng: number): number => {
    const K_LAT = 21.422487; // Kaaba Latitude
    const K_LNG = 39.826206; // Kaaba Longitude
    
    // Convert coordinates to radians
    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180;
    const kLatRad = (K_LAT * Math.PI) / 180;
    const kLngRad = (K_LNG * Math.PI) / 180;
    
    // Difference in longitude
    const dLng = kLngRad - lngRad;
    
    // Formula: y = sin(dLng)
    // x = cos(lat) * tan(kLat) - sin(lat) * cos(dLng)
    const y = Math.sin(dLng);
    const x = Math.cos(latRad) * Math.tan(kLatRad) - Math.sin(latRad) * Math.cos(dLng);
    
    const angleRad = Math.atan2(y, x);
    const angleDeg = (angleRad * 180) / Math.PI;
    
    // Standardize to 0 - 360 clockwise compass degrees
    return Math.round((angleDeg + 360) % 360);
  };

  // Great-Circle Haversine Formula to compute exact distance to Kaaba
  const calculateKaabaDistance = (lat: number, lng: number): number => {
    const K_LAT = 21.422487;
    const K_LNG = 39.826206;
    const R = 6371; // Earth Mean Radius in km
    
    const dLat = ((K_LAT - lat) * Math.PI) / 180;
    const dLng = ((K_LNG - lng) * Math.PI) / 180;
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat * Math.PI) / 180) * Math.cos((K_LAT * Math.PI) / 180) * 
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
      
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const qiblaAngle = calculateQiblaAngle(customLat, customLng);
  const kaabaDistance = calculateKaabaDistance(customLat, customLng);

  // Define dynamic angle of the Needle (offset relative to device position)
  // relative Needle Angle = targetQiblaAngle - currentDeviceHeading
  const needleRotation = (qiblaAngle - deviceHeading + 360) % 360;

  // Check if aligned within 4 degrees tolerance (absolute match is 0 or 360)
  const isAligned = Math.abs(needleRotation) <= 4 || Math.abs(needleRotation - 360) <= 4;

  // Theme layout dictionary for pristine luxury 3D texture effect
  const themeStyles = {
    "vintage-gold": {
      dialBg: "from-amber-950 via-[#1C160C] to-slate-950",
      bezelBorder: "border-amber-500",
      accentGlass: "shadow-[inset_0_4px_30px_rgba(212,175,55,0.2),_0_20px_50px_rgba(0,0,0,0.85)]",
      starTint: "text-amber-500/20",
      cardBg: "bg-amber-50/20 border-amber-500/10"
    },
    "royal-emerald": {
      dialBg: "from-[#051F10] via-[#04140B] to-slate-950",
      bezelBorder: "border-emerald-500",
      accentGlass: "shadow-[inset_0_4px_30px_rgba(16,185,129,0.25),_0_20px_50px_rgba(0,0,0,0.85)]",
      starTint: "text-emerald-500/20",
      cardBg: "bg-emerald-50/10 border-emerald-500/10"
    },
    "ancient-bronze": {
      dialBg: "from-[#1F1915] via-[#100D0B] to-zinc-950",
      bezelBorder: "border-orange-600",
      accentGlass: "shadow-[inset_0_4px_30px_rgba(234,88,12,0.15),_0_20px_50px_rgba(0,0,0,0.85)]",
      starTint: "text-orange-500/10",
      cardBg: "bg-orange-50/10 border-orange-500/10"
    }
  };

  const activeTheme = themeStyles[brassTheme];

  return (
    <div id="qibla-pro-3d-desk" className="space-y-8 animate-fade-in">
      
      {/* 1. Header Hero Panel */}
      <div className="text-center space-y-2.5 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-gradient-to-r from-yellow-500/10 via-islamic-gold/20 to-yellow-500/10 border border-islamic-gold/40 rounded-full text-xs font-black text-islamic-gold tracking-wide uppercase shadow-sm animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{currentLangText.badge}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
          {currentLangText.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">
          {currentLangText.subtitle}
        </p>
      </div>

      {/* 2. Interactive Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: 3D Micro-Rendered mechanical compass / Live Map (Takes 6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-6 w-full">
          
          {/* Compass / Map Toggle Selector */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl w-full max-w-[430px] border border-slate-200/40 dark:border-slate-800/50 shadow-xs">
            <button
              onClick={() => setShowMapView(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                !showMapView 
                  ? "bg-white dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 shadow-xs ring-1 ring-black/5" 
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{languageCode === "ur" ? "تھری ڈی قطب نما" : "3D mechanical compass"}</span>
            </button>
            <button
              onClick={() => setShowMapView(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                showMapView 
                  ? "bg-white dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 shadow-xs ring-1 ring-black/5" 
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{languageCode === "ur" ? "لائیو نقشہ" : "Interactive Map"}</span>
            </button>
          </div>

          {!showMapView ? (
            <>
              {/* Main 3D Stage Container */}
              <div className="w-full max-w-[430px] aspect-square bg-[#0E1511]/5 rounded-[40px] border-2 border-dashed border-slate-300/60 p-6 flex flex-col items-center justify-center relative shadow-inner overflow-hidden select-none">
                
                {/* Ambient Background Aura reacting to Qibla alignment states */}
                {isAligned ? (
                  <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,_#10B981_0px,_transparent_65%) opacity-40 animate-pulse-slow"></div>
                ) : (
                  <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,_#B45309_0px,_transparent_65%) opacity-10 pointer-events-none"></div>
                )}

                {/* Depth Shadow underneath the central compass dial casing */}
                <div 
                  className="absolute w-[240px] h-10 bg-black/60 rounded-full blur-2xl transition-transform duration-300 pointer-events-none"
                  style={{ transform: `translateY(140px) scale(${1.2 - tiltX/100})` }}
                ></div>

                {/* THE TACTILE 3D CAST BRASS ROTATED CASING */}
                <div 
                  className={`relative w-[280px] h-[280px] rounded-full bg-gradient-to-b ${activeTheme.dialBg} border-[8px] border-double ${activeTheme.bezelBorder} ${activeTheme.accentGlass} transition-all duration-300 ease-out`}
                  style={{ 
                    transform: `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                    backfaceVisibility: "hidden"
                  }}
                >
                  
                  {/* Outer Metallic Bezel Specular Highlight Ring */}
                  <div className="absolute inset-[-4px] rounded-full border border-white/10 pointer-events-none"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>

                  {/* Islamic Star Print backdrop within compass (Rub el Hizb element) */}
                  <div className={`absolute inset-6 rounded-full border border-dashed ${activeTheme.starTint} flex items-center justify-center pointer-events-none`}>
                    <div className={`absolute w-full h-full border border-double ${activeTheme.starTint} rotate-45`}></div>
                    <span className="text-4xl filter saturate-50 opacity-15 font-amiri text-islamic-gold">
                      {isAligned ? "🕌" : "۞"}
                    </span>
                  </div>

                  {/* OUTER ROTATING CARDINAL DIAL (Tied to Simulated User device Heading) */}
                  {/* This represents how real world compass card stays stable with True North, rotating as the user holds and rotates physical phone */}
                  <div 
                    className="absolute inset-3 rounded-full border-2 border-islamic-gold/15 transition-transform duration-500 ease-out flex items-center justify-center select-none"
                    style={{ transform: `rotate(${-deviceHeading}deg)` }}
                  >
                    {/* Cardinal direction letter indicators */}
                    <div className="absolute -top-1 px-1 bg-slate-900 border border-red-800 text-xxs font-black text-rose-500 font-mono rounded">N</div>
                    <div className="absolute -right-1.5 text-[10px] font-bold text-slate-300 font-mono">E</div>
                    <div className="absolute -bottom-1 text-[10px] font-bold text-slate-400 font-mono">S</div>
                    <div className="absolute -left-1.5 text-[10px] font-bold text-slate-400 font-mono">W</div>

                    {/* Highly precise mechanical compass subdivisions / ticks around outer perimeter */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                      <div className="w-[1.5px] h-full border-t-[6px] border-b-[6px] border-slate-300"></div>
                      <div className="w-full h-[1.5px] border-l-[6px] border-r-[6px] border-slate-300"></div>
                      <div className="w-[1px] h-full border-t-[4px] border-b-[4px] border-slate-400 rotate-15"></div>
                      <div className="w-[1px] h-full border-t-[4px] border-b-[4px] border-slate-400 rotate-30"></div>
                      <div className="w-[1px] h-full border-t-[4px] border-b-[4px] border-slate-400 rotate-45"></div>
                      <div className="w-[1px] h-full border-t-[4px] border-b-[4px] border-slate-400 rotate-60"></div>
                      <div className="w-[1px] h-full border-t-[4px] border-b-[4px] border-slate-400 rotate-75"></div>
                      <div className="w-[1px] h-full border-t-[4px] border-b-[4px] border-slate-400 rotate-105"></div>
                      <div className="w-[1px] h-full border-t-[4px] border-b-[4px] border-slate-400 rotate-120"></div>
                      <div className="w-[1px] h-full border-t-[4px] border-b-[4px] border-slate-400 rotate-135"></div>
                      <div className="w-[1px] h-full border-t-[4px] border-b-[4px] border-slate-400 rotate-150"></div>
                      <div className="w-[1px] h-full border-t-[4px] border-b-[4px] border-slate-400 rotate-165"></div>
                    </div>

                    {/* Subdued numbers at cardinal degrees */}
                    <span className="absolute top-5 text-[8px] font-mono text-rose-300 font-bold opacity-30">0°</span>
                    <span className="absolute right-5 text-[8px] font-mono text-slate-300 font-bold opacity-30">90°</span>
                    <span className="absolute bottom-5 text-[8px] font-mono text-slate-300 font-bold opacity-30">180°</span>
                    <span className="absolute left-5 text-[8px] font-mono text-slate-300 font-bold opacity-30">270°</span>
                  </div>

                  {/* DYNAMIC SPATIAL KAABA NEEDLE POINTER */}
                  {/* This points strictly to the target Qibla bearing Angle! */}
                  <div 
                    className="absolute inset-0 pointer-events-none transition-transform duration-500 ease-out flex items-center justify-center z-20"
                    style={{ transform: `rotate(${needleRotation}deg)` }}
                  >
                    {/* 3D Looking Gilded Emerald Needle Segment */}
                    <div className="relative w-[3px] h-[160px] bg-gradient-to-b from-[#10B981] via-islamic-gold to-transparent rounded-full shadow-lg">
                      
                      {/* Glowing Arrowhead dome pointing to Kaaba (Makkah) */}
                      <div className="absolute -top-[14px] -left-[11px] w-6 h-6 flex items-center justify-center">
                        <div className={`w-0 h-0 border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-b-[22px] ${isAligned ? "border-b-emerald-400 drop-shadow-[0_0_12px_#10B981]" : "border-b-emerald-600"} transition-all duration-300`}></div>
                      </div>

                      {/* Tiny Vector Outline of Holy Kaaba printed right onto target end of needle */}
                      <div className="absolute top-[8px] -left-1.5 w-4 h-4 rounded bg-slate-950 border border-islamic-gold/40 flex items-center justify-center shadow-xs">
                        <span className="text-[7px] text-yellow-300 font-bold leading-none select-none">🕋</span>
                      </div>

                      {/* Brass center axis core bolt */}
                      <div className="absolute top-1/2 -left-[5.5px] -translate-y-1/2 w-[14px] h-[14px] rounded-full bg-gradient-to-br from-yellow-100 via-islamic-gold to-amber-800 border-2 border-slate-950 shadow-md"></div>
                    </div>
                  </div>

                  {/* Static Reference Pointer Pin at true top of core housing */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-amber-500 rounded-b-full shadow z-30 border border-slate-950/40"></div>
                  
                  {/* Concentric vintage metallic dial markings */}
                  <div className="absolute inset-12 rounded-full border border-islamic-gold/10 pointer-events-none"></div>
                  <div className="absolute inset-20 rounded-full border border-islamic-gold/5 pointer-events-none"></div>

                </div>

                {/* Specular sheen reflection overlay simulation (glares beautifully over glass) */}
                <div className="absolute inset-12 bg-gradient-to-tr from-white/0 via-white/4 to-white/0 opacity-60 rounded-full pointer-events-none"></div>

              </div>

              {/* Alignment status alert banner in matching design */}
              {isAligned ? (
                <div className="px-6 py-2.5 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white border-2 border-emerald-400 text-xs sm:text-sm font-extrabold rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.35)] tracking-wider animate-bounce flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-islamic-gold fill-islamic-gold/20 animate-spin-slow" />
                  <span>{currentLangText.alignmentSuccess}</span>
                </div>
              ) : (
                <div className="px-5 py-2.5 bg-slate-900 text-slate-300 border border-slate-800 text-xs font-bold rounded-full text-center max-w-sm leading-relaxed shadow-md">
                  <p className="font-mono text-[10px] text-amber-500 font-bold mb-0.5">NEEDLE ROTATION ACTIVE</p>
                  <span>Angle: {needleRotation}° — Align green arrow with top pointer pin (0°)</span>
                </div>
              )}
            </>
          ) : (
            /* Live Map View Container */
            <div className="w-full max-w-[430px] aspect-square bg-slate-50 dark:bg-slate-900/30 rounded-[40px] border-2 border-dashed border-slate-300/60 p-4 flex flex-col items-center justify-center relative shadow-inner overflow-hidden">
              {!leafletLoaded ? (
                <div className="flex flex-col items-center justify-center space-y-3 p-6 text-center">
                  <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
                  <p className="text-xs text-slate-500 font-semibold font-mono animate-pulse">
                    {languageCode === "ur" ? "پوزیشن سیٹلائٹ حاصل کیا جا رہا ہے..." : "CAPTURING SAT SENSORS..."}
                  </p>
                </div>
              ) : (
                <div className="w-full h-full relative rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800">
                  <div id="qibla-leaflet-map" className="w-[100%] h-[100%] opacity-100 min-h-[300px]" style={{ minHeight: "100%", width: "100%", height: "100%" }}></div>
                  
                  {/* Floating directions overlay */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 dark:bg-slate-950/95 p-3 rounded-2xl border border-slate-100 dark:border-slate-900 shadow-md backdrop-blur-xs flex items-center justify-between z-[1000] pointer-events-auto">
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Calculated Qibla Angle</p>
                      <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                        {Math.round(qiblaAngle)}° {languageCode === "ur" ? "شمال سے مشرق" : "N to E"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Kaaba Distance</p>
                      <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                        {Math.round(kaabaDistance).toLocaleString()} km
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Settings, inputs, and real-time geographic readings (Takes 6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Telemetry Hub values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Live Distance to Makkah */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
              <span className="block text-[9px] text-slate-400 font-extrabold uppercase tracking-widest font-mono">
                {currentLangText.hdrDistance}
              </span>
              <div className="flex items-baseline gap-1.5 pt-0.5">
                <span className="text-3xl font-black text-slate-800 font-mono tracking-tight">
                  {kaabaDistance.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-emerald-800">km</span>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold leading-normal">
                Absolute shortest geodesic path directly to Sacred Sanctuary Kaaba.
              </p>
            </div>

            {/* Precise target Qibla bearing */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
              <span className="block text-[9px] text-slate-400 font-extrabold uppercase tracking-widest font-mono">
                {currentLangText.hdrTargetBearing}
              </span>
              <div className="flex items-baseline gap-1.5 pt-0.5">
                <span className="text-3xl font-black text-orange-600 font-mono tracking-tight">
                  {qiblaAngle}°
                </span>
                <span className="text-xs font-bold text-slate-500">degrees</span>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold leading-normal">
                Degrees clockwise from True Geographic North orientation.
              </p>
            </div>

          </div>

          {/* Interactive Gyro Calibration Sliders */}
          <div className="bg-white dark:bg-[#0c2317] p-6 rounded-3xl border border-slate-200/80 dark:border-white/5 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5">
              <h4 className="text-sm font-black text-slate-900 dark:text-amber-400 tracking-tight flex items-center gap-2">
                <Sliders className="w-4 h-4 text-islamic-green" />
                <span>Device Orientations & Hardware Sensors</span>
              </h4>
              {sensorStatus === "active" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Sensors Live
                </span>
              )}
            </div>

            {/* LIVE SENSOR CONTROLLER INTERFACE */}
            <div className="bg-gradient-to-br from-slate-50 to-[#FAF6EE] dark:from-[#081b11] dark:to-[#04120a] p-4.5 rounded-2xl border border-slate-200/50 dark:border-white/5 space-y-3.5">
              {sensorStatus === "active" ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400">
                    <Compass className="w-4.5 h-4.5 animate-spin-slow text-islamic-gold" />
                    <span>Real-time Hardware Magnetometer Bind OK</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-300 leading-relaxed font-medium">
                    Your physical phone's magnetometer and accelerometer are controlling the 3D brass compass. Rotate or tilt your phone in hand to align with True Qibla.
                  </p>
                  <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-950/40 p-2.5 rounded-xl border border-slate-200/50 dark:border-white/5 text-center font-mono text-[9px]">
                    <div>
                      <span className="block text-slate-400 font-extrabold uppercase">α (Heading)</span>
                      <span className="font-bold text-slate-800 dark:text-white text-xs">{deviceHeading}°</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 font-extrabold uppercase">β (Tilt X)</span>
                      <span className="font-bold text-slate-800 dark:text-white text-xs">{tiltX}°</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 font-extrabold uppercase">γ (Roll Y)</span>
                      <span className="font-bold text-slate-800 dark:text-white text-xs">{tiltY}°</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSensorStatus("idle")}
                    className="w-full py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-900/30 text-rose-700 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/40 text-xs font-bold rounded-xl transition-all select-none cursor-pointer"
                  >
                    Disconnect Live Compass
                  </button>
                </div>
              ) : sensorStatus === "requesting" ? (
                <div className="text-center py-4 space-y-2">
                  <RefreshCw className="w-6 h-6 text-islamic-gold animate-spin mx-auto" />
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Requesting device hardware permission...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/20 text-islamic-gold shrink-0">
                      <Compass className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">Enable Hardware Gyroscope & Compass</h5>
                      <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-normal mt-0.5 font-medium">
                        Tracks your physical phone orientation and gravity dynamically to navigate towards Makkah.
                      </p>
                    </div>
                  </div>
                  
                  {sensorErrorMsg && (
                    <div className="bg-red-50 dark:bg-red-950/20 p-2.5 rounded-xl border border-red-200/40 dark:border-red-950/50 text-[10.5px] text-red-700 dark:text-red-400 font-bold leading-normal">
                      ⚠️ {sensorErrorMsg}
                    </div>
                  )}

                  <button
                    onClick={requestCompassPermission}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-yellow-500 via-islamic-gold to-yellow-600 hover:from-yellow-600 hover:to-semibold text-slate-900 shadow-md hover:shadow-lg text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer select-none border border-amber-300/25"
                  >
                    <Navigation className="w-3.5 h-3.5 fill-slate-900" />
                    Initialize Hardware Sensors Link
                  </button>
                </div>
              )}
            </div>

            {/* Simulated Device Orientation Heading slider */}
            <div className={`space-y-1.5 transition-opacity ${(sensorStatus === "active" && hasReceivedSensorData) ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-350">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <RotateCw className="w-3.5 h-3.5 text-slate-450 shrink-0 select-none animate-spin-slow" />
                  {currentLangText.rotateHeading} {(sensorStatus === "active" && hasReceivedSensorData) && "(Auto Live)"}
                </span>
                <span className="font-mono bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded text-[11px]">
                  {deviceHeading}°
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={deviceHeading}
                disabled={sensorStatus === "active" && hasReceivedSensorData}
                onChange={(e) => setDeviceHeading(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-800"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                <span>0° N</span>
                <span>90° E</span>
                <span>180° S</span>
                <span>270° W</span>
                <span>360° N</span>
              </div>
            </div>

            {/* Adjustable 3D Perspective angle controllers */}
            <div className={`grid grid-cols-2 gap-4 pt-1 transition-opacity ${(sensorStatus === "active" && hasReceivedSensorData) ? "opacity-40" : "opacity-100"}`}>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {currentLangText.perspectiveTilt} ({tiltX}°)
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="65" 
                  value={tiltX}
                  onChange={(e) => setTiltX(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {currentLangText.rollTilt} ({tiltY}°)
                </label>
                <input 
                  type="range" 
                  min="-30" 
                  max="30" 
                  value={tiltY}
                  onChange={(e) => setTiltY(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>

            {/* Specular Theme Selection buttons */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest font-mono">
                {currentLangText.specularSettings}
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setBrassTheme("vintage-gold")}
                  className={`py-2 px-1 text-[10px] font-bold border rounded-xl transition-all ${
                    brassTheme === "vintage-gold"
                      ? "bg-amber-500/10 text-amber-800 border-amber-400 shadow-xs"
                      : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {currentLangText.themeGold}
                </button>
                <button
                  onClick={() => setBrassTheme("royal-emerald")}
                  className={`py-2 px-1 text-[10px] font-bold border rounded-xl transition-all ${
                    brassTheme === "royal-emerald"
                      ? "bg-emerald-500/10 text-emerald-800 border-emerald-400 shadow-xs"
                      : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {currentLangText.themeEmerald}
                </button>
                <button
                  onClick={() => setBrassTheme("ancient-bronze")}
                  className={`py-2 px-1 text-[10px] font-bold border rounded-xl transition-all ${
                    brassTheme === "ancient-bronze"
                      ? "bg-orange-600/10 text-orange-900 border-orange-400 shadow-xs"
                      : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {currentLangText.themeBronze}
                </button>
              </div>
            </div>

          </div>

          {/* Quick focal regional centers */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest font-mono">
                {currentLangText.presets}
              </h4>
              <button 
                onClick={handleDetectCoordinates}
                className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-lg text-[10px] font-black tracking-wide uppercase transition-colors"
              >
                <Navigation className="w-3 h-3 text-islamic-gold" />
                <span>Geolocate browser</span>
              </button>
            </div>

            {geoError && (
              <p className="text-[11px] font-bold text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                ⚠️ {geoError}
              </p>
            )}

            {useCustomGeo && (
              <p className="text-[11px] font-extrabold text-[#115E59] bg-[#E0F2F1] p-2.5 rounded-lg border border-[#B2DFDB] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#009688]" />
                <span>{currentLangText.geoSuccess} ({customLat}° N, {customLng}° E)</span>
              </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_CITIES.map((city, idx) => (
                <button
                  key={idx}
                  onClick={() => selectPreset(idx)}
                  className={`p-2.5 text-left border rounded-xl transition-all duration-200 ${
                    !useCustomGeo && selectedCityIndex === idx
                      ? "bg-emerald-800 text-white border-emerald-800 shadow-md transform -translate-y-[1px]"
                      : "bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span className="block text-[11px] font-black truncate leading-tight">
                    {languageCode === "ur" ? city.name_ur : languageCode === "ar" ? city.name_ar : city.name_en}
                  </span>
                  <span className="block text-[9px] font-mono text-slate-400 mt-0.5 max-w-[90px] truncate leading-none font-medium">
                    {city.lat.toFixed(2)}°N, {city.lng.toFixed(2)}°E
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Coordinates input expansion */}
            <div className="pt-2">
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest font-mono mb-2">
                {currentLangText.customCoords}
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-500 font-semibold mb-1">{currentLangText.latLabel}</label>
                  <input 
                    type="number" 
                    step="0.0001"
                    value={customLat}
                    onChange={(e) => {
                      setUseCustomGeo(true);
                      setCustomLat(parseFloat(e.target.value) || 0);
                    }}
                    className="w-full p-2 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-800 rounded-lg text-xs font-bold font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-semibold mb-1">{currentLangText.lngLabel}</label>
                  <input 
                    type="number" 
                    step="0.0001"
                    value={customLng}
                    onChange={(e) => {
                      setUseCustomGeo(true);
                      setCustomLng(parseFloat(e.target.value) || 0);
                    }}
                    className="w-full p-2 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-800 rounded-lg text-xs font-bold font-mono"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Spherical math instructions card */}
          <div className="bg-amber-50/20 border border-amber-500/10 p-5 rounded-3xl space-y-2 text-amber-950 font-semibold leading-relaxed text-xs">
            <h5 className="font-bold flex items-center gap-1.5 text-amber-900">
              <Info className="w-4 h-4 text-islamic-gold" />
              <span>{currentLangText.howToHeading}</span>
            </h5>
            <p className="text-slate-600 font-medium">
              {currentLangText.alignmentInstructions}
            </p>
            <p className="text-slate-500 mt-2 font-medium">
              💡 {currentLangText.learnMore}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
