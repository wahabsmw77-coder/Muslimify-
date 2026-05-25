import React, { useState, useEffect } from "react";
import { Star, MessageSquareCode, Award, ShieldAlert, CheckCircle2, Heart, Sparkles, Send, Globe } from "lucide-react";

interface LiveReview {
  id: string;
  name: string;
  stars: number;
  comment: string;
  timestamp: string;
  location: string;
}

interface ReviewsAndMissionProps {
  languageCode: string;
}

// Global UI Translation mapping for total synergy
const TRANSLATIONS: Record<string, any> = {
  en: {
    missionTitle: "Our Divine Scholastic Mission",
    missionTxt: "Muslimify was founded with a profound dedication to absolute theological authenticity. By sourcing strictly verified, harakat-rich Quranic transcripts and canonical Sihah Sitta Hadith logs, we strive to remove human translation ambiguity and build a clean, ad-free digital sanctuary. Our translations are completely vetted and under constant administration to preserve pristine prophetic truth.",
    missionPoint1: "Verbatim Islamic Sourcing",
    missionPoint2: "Strict Academic Quality Checks",
    missionPoint3: "100% Free & Privately Audited",
    reviewsTitle: "Verified Scholar & Audience Review Board",
    reviewsSub: "Read real-time live testimonials from researchers, Alims, and students worldwide. Post yours below!",
    reviewsName: "Your Full Name",
    reviewsLocation: "City, Country or Institution",
    reviewsComment: "Your Testimonial / Scholarly Notes",
    reviewsSubmit: "Post Live Testimonial",
    reviewsSuccess: "JazakAllah Khair! Your review has been added to our live global feed.",
    reviewsPlaceholder: "Write your honest experience here, including translation remarks...",
  },
  ur: {
    missionTitle: "ہمارا علمی اور دینی مقصد",
    missionTxt: "مسلمی فائی کی بنیاد نظریاتی صداقت اور علمی دیانتداری کے گہرے عزم پر رکھی گئی ہے۔ لرزش سے پاک قرآنی نسخوں اور مستند صحاح ستہ احادیث کے ڈیٹا بیس کے ذریعے، ہم انسانی تراجم کی غلطیوں کو دور کر کے ایک انتہائی صاف اور اشتہارات سے پاک ڈیجیٹل پناہ گاہ فراہم کر رہے ہیں جس کی نگرانی ایڈمنسٹریٹر کرتا ہے۔",
    missionPoint1: "مستند اسلامی ذرائع",
    missionPoint2: "سخت علمی معیارات کی جانچ",
    missionPoint3: "100٪ مفت اور نجی جائزہ",
    reviewsTitle: "تصدیق شدہ علماء اور قارئین کا ریویو بورڈ",
    reviewsSub: "دنیا بھر کے محققین، علماء اور طلباء کے حقیقی وقت کے تاثرات پڑھیں۔ نیچے اپنا تبصرہ لکھیں!",
    reviewsName: "آپ کا پورا نام",
    reviewsLocation: "شہر، ملک یا ادارہ",
    reviewsComment: "آپ کا تاثراتی تبصرہ",
    reviewsSubmit: "لائیو تبصرہ جمع کریں",
    reviewsSuccess: "جزاک اللہ خیر! آپ کا تبصرہ کامیابی کے ساتھ شامل کر دیا گیا ہے۔",
    reviewsPlaceholder: "اپنے دیانتدارانہ تجربے کو یہاں درج کریں...",
  },
  ar: {
    missionTitle: "رسالتنا العلمية والدينية الشريفة",
    missionTxt: "تأسست منصة مسلميفاي بالتزام عميق بالدقة العقائدية والموثوقية العلمية. من خلال توفير نصوص قرآنية مشكولة بالكامل وسجلات الحديث النبوي الشريف من الصحاح الستة، نعمل جاهداً على إزالة أي لبس وتوفير بيئة رقمية نظيفة خالية تماماً من الإعلانات ترعاها إدارة واعية وموثوقة.",
    missionPoint1: "مصادر إسلامية موثقة",
    missionPoint2: "تدقيق علمي صارم",
    missionPoint3: "مجاني بالكامل وخاضع للرقابة",
    reviewsTitle: "لوحة مراجعات العلماء والجمهور المعتمدة",
    reviewsSub: "اقرأ شهادات حية ومباشرة من الباحثين والعلماء والطلاب حول العالم. أضف مراجعتك بالأسفل!",
    reviewsName: "الاسم الكامل",
    reviewsLocation: "المدينة، الدولة أو المؤسسة",
    reviewsComment: "ملاحظاتك وتقييمك العلمي",
    reviewsSubmit: "نشر التقييم المباشر",
    reviewsSuccess: "جزاكم الله خيراً! تم إرسال تقييمكم وعرضه مباشرة على اللوحة.",
    reviewsPlaceholder: "اكتب تجربتكم الصادقة والملاحظات هنا...",
  }
};

export default function ReviewsAndMission({ languageCode }: ReviewsAndMissionProps) {
  // Grab localized strings or fallback to English
  const dict = TRANSLATIONS[languageCode] || TRANSLATIONS["en"];

  // Live reviews states
  const [reviews, setReviews] = useState<LiveReview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formName, setFormName] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formStars, setFormStars] = useState(5);
  const [formComment, setFormComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch reviews on mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (res.ok && data.reviews) {
        setReviews(data.reviews);
      }
    } catch (e) {
      console.warn("Could not fetch server reviews. Falling back to default list.", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) {
      setErrorMsg("Please enter both your name and review remarks.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          location: formLocation || "Global Reader",
          stars: formStars,
          comment: formComment
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit testimonial.");

      setSuccessMsg(dict.reviewsSuccess || "JazakAllah Khair! Review added successfully.");
      setFormName("");
      setFormLocation("");
      setFormComment("");
      setFormStars(5);
      
      // Reload reviews list
      fetchReviews();
    } catch (err: any) {
      setErrorMsg(err.message || "Could not save review on live server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="reviews-and-mission-section" className="space-y-12 mt-12 pt-6">
      
      {/* Decorative separator line */}
      <div className="flex items-center gap-3 justify-center">
        <div className="h-[1px] bg-slate-200 flex-1"></div>
        <span className="text-islamic-gold text-lg select-none">✦ ✦ ✦</span>
        <div className="h-[1px] bg-slate-200 flex-1"></div>
      </div>

      {/* 1. OUR MISSION SECTION */}
      <div className="bg-white rounded-3xl border border-islamic-green/10 shadow-lg p-6 sm:p-8 md:p-10 relative overflow-hidden transition-all hover:border-islamic-green/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--color-islamic-gold)_0px,_transparent_70%)] opacity-20 pointer-events-none"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Mission Text Col (Takes 2 span) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-200 text-xs text-amber-800 font-extrabold select-none">
              <Award className="w-4 h-4 text-islamic-gold fill-islamic-gold/10" />
              <span>THEOLOGICAL INTEGRITY</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              {dict.missionTitle}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed max-w-3xl whitespace-pre-line font-medium">
              {dict.missionTxt}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-islamic-green">
                  <Heart className="w-4 h-4 fill-islamic-green/10" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">{dict.missionPoint1}</span>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-islamic-green">
                  <Star className="w-4 h-4 fill-islamic-green/10" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">{dict.missionPoint2}</span>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-islamic-green">
                  <CheckCircle2 className="w-4 h-4 fill-islamic-green/10" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">{dict.missionPoint3}</span>
              </div>
            </div>
          </div>

          {/* Graphical mission block */}
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950 p-6 rounded-2xl text-white border border-emerald-800/30 text-center space-y-4 self-stretch flex flex-col justify-center">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
              <Globe className="w-6 h-6 text-islamic-gold" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-sm text-islamic-gold font-display">Global Translation Core</h4>
              <p className="text-[11px] text-slate-300 leading-normal max-w-xs mx-auto">
                No matter your language code selection, all datasets synchronize dynamically for synchronized comparative research.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. LIVE REVIEWS & FEEDBACK WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* REVIEWS GRID VIEW (Takes 2 span) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-islamic-green font-bold">
              <MessageSquareCode className="w-5 h-5 text-islamic-gold" />
              <h3 className="text-lg font-extrabold font-display uppercase tracking-wider">
                {dict.reviewsTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-semibold pl-1.5">
              {dict.reviewsSub}
            </p>
          </div>

          {/* Loader */}
          {isLoading ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-slate-200">
              <span className="w-6 h-6 border-2 border-islamic-green border-t-transparent rounded-full animate-spin inline-block"></span>
              <p className="text-xs text-slate-400 font-medium mt-2 font-mono">Connecting to live audience reviews board...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
              {reviews.map((rev) => (
                <div 
                  key={rev.id} 
                  className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3 hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-800">{rev.name}</h4>
                      <p className="text-[9px] text-islamic-green font-bold font-mono">{rev.location}</p>
                    </div>
                    
                    {/* Stars */}
                    <div className="flex gap-0.5 text-islamic-gold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < rev.stars ? "fill-islamic-gold text-islamic-gold" : "text-slate-200"}`} 
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-medium whitespace-pre-line">
                    "{rev.comment}"
                  </p>

                  <div className="text-right">
                    <span className="text-[8px] text-slate-400 font-mono">
                      {new Date(rev.timestamp).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* REVIEW SUBMISSION FORM WORKSPACE (1 span) */}
        <div className="bg-gradient-to-br from-emerald-950/10 via-white to-amber-50/10 p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xl self-start space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-islamic-gold fill-islamic-gold/10 animate-bounce" />
            <span className="text-[11px] uppercase tracking-widest font-extrabold text-slate-500 font-mono">Submit Feedback</span>
          </div>

          <h4 className="text-sm font-extrabold text-slate-800">
            Speak to Abdul Wahab & the Audience
          </h4>

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-[11px] font-bold flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-[11px] font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleReviewSubmit} className="space-y-3.5">
            {/* Input Name */}
            <div>
              <label className="block text-[9px] uppercase tracking-wide font-extrabold text-slate-400 mb-1">{dict.reviewsName}</label>
              <input 
                type="text" 
                placeholder="e.g. Abdullah Hashim"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-islamic-green rounded-xl text-xs py-2.5 px-3 font-semibold text-slate-700"
                required
              />
            </div>

            {/* Input Location */}
            <div>
              <label className="block text-[9px] uppercase tracking-wide font-extrabold text-slate-400 mb-1">{dict.reviewsLocation}</label>
              <input 
                type="text" 
                placeholder="e.g. Medina, KSA"
                value={formLocation}
                onChange={(e) => setFormLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-islamic-green rounded-xl text-xs py-2.5 px-3 font-semibold text-slate-700"
              />
            </div>

            {/* Stars selection */}
            <div>
              <label className="block text-[9px] uppercase tracking-wide font-extrabold text-slate-400 mb-1">Stars Rating</label>
              <div className="flex gap-1.5 items-center bg-slate-50/50 p-2 rounded-xl border border-slate-100 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormStars(star)}
                    className="p-1 focus:outline-none transform hover:scale-110 active:scale-95 transition-all text-islamic-gold cursor-pointer"
                    title={`${star} Stars`}
                  >
                    <Star 
                      className={`w-6 h-6 ${star <= formStars ? "fill-islamic-gold text-islamic-gold" : "text-slate-200"}`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Input Comment */}
            <div>
              <label className="block text-[9px] uppercase tracking-wide font-extrabold text-slate-400 mb-1">{dict.reviewsComment}</label>
              <textarea 
                rows={4}
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                placeholder={dict.reviewsPlaceholder}
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-islamic-green rounded-xl text-xs py-2.5 px-3 font-medium text-slate-700 leading-relaxed resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-islamic-green hover:bg-islamic-green-hover text-white text-xs font-bold uppercase tracking-wider py-3 px-3.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 select-none cursor-pointer"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-white" />
                  <span>{dict.reviewsSubmit}</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
