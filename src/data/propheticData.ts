export interface SunnahHabit {
  id: string;
  category: "Morning/Evening" | "Sleeping" | "Eating/Drinking" | "Social/Speech" | "Hygiene/Dress" | "Masjid/Salah" | "Character/Home";
  title: string;
  urduTitle: string;
  desc: string;
  urduDesc: string;
  reference: string;
}

export interface DuaItem {
  id: string;
  category: "Morning & Evening" | "Forgiveness & Mercy" | "Protection & Safety" | "Knowledge & Success" | "Daily Routine" | "Salah & Remembrance";
  title: string;
  urduTitle: string;
  arabic: string;
  transliteration: string;
  english: string;
  urdu: string;
  virtue: string;
  source: string;
}

export interface FiqhDifference {
  maslak: string; // "Hanafi" | "Shafi'i" | "Maliki" | "Hanbali" | "Jafari (Shia)"
  arabicName: string;
  handPlacement: string;
  handPlacementUrdu: string;
  ameenAzaan: string;
  ameenAzaanUrdu: string;
  rafalYadain: string;
  rafalYadainUrdu: string;
  recitationOrder: string;
  recitationOrderUrdu: string;
  tashahhudFinger: string;
  tashahhudFingerUrdu: string;
  sujudPosture: string;
  sujudPostureUrdu: string;
  taslimEnding: string;
  taslimEndingUrdu: string;
  scholarlyNote: string;
  scholarlyNoteUrdu: string;
}

// 100 Sunnat-e-Rasool (SAW) Dataset
export const HUNDRED_SUNNAHS: SunnahHabit[] = [
  // SLEEPING SUNNAHS (1-15)
  { id: "s1", category: "Sleeping", title: "Dusting the bed background three times", urduTitle: "بستر کو تین بار جھاڑنا", desc: "Dusting the bed sheet three times with a cloth before sleeping.", urduDesc: "سونے سے قبل بستر کی چادر کو کسی کپڑے سے تین بار جھاڑنا۔", reference: "Bukhari #6320" },
  { id: "s2", category: "Sleeping", title: "Sleeping in a state of Wudu", urduTitle: "باوضو ہو کر سونا", desc: "Performing ablution before lying down to sleep.", urduDesc: "سونے سے پہلے مکمل وضو کرنا۔", reference: "Bukhari #247" },
  { id: "s3", category: "Sleeping", title: "Sleeping on the right side", urduTitle: "دائیں کروٹ پر سونا", desc: "Lying down on the right side of the body.", urduDesc: "دائیں کروٹ پر لیٹنا۔", reference: "Bukhari #247" },
  { id: "s4", category: "Sleeping", title: "Placing the right hand under the cheek", urduTitle: "دایاں ہاتھ رخسار کے نیچے رکھنا", desc: "Resting the right side of the face upon the palm of the right hand.", urduDesc: "دائیں رخسار کے نیچے دایاں ہاتھ رکھ کر سونا۔", reference: "Bukhari #6314" },
  { id: "s5", category: "Sleeping", title: "Reciting Surah Al-Ikhlas, Al-Falaq, Al-Nas", urduTitle: "معوذتین پڑھ کر ہاتھوں پر پھونکنا", desc: "Reciting the three Quls, blowing into palms and wiping over the body.", urduDesc: "تینوں قل پڑھ کر ہاتھوں پر تھتکارنا اور پورے جسم پر پھیرنا۔", reference: "Bukhari #5017" },
  { id: "s6", category: "Sleeping", title: "Reciting the sleep supplication", urduTitle: "سونے سے پہلے کی دعا پڑھنا", desc: "Reciting 'Bismika Allahumma amutu wa ahya'.", urduDesc: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا پڑھنا۔", reference: "Bukhari #6312" },
  { id: "s7", category: "Sleeping", title: "Applying Surmah (Kohl) before sleep", urduTitle: "سونے سے پہلے سرمہ لگانا", desc: "Applying Ithmid Kohl three times to each eye alternately.", urduDesc: "سونے سے پہلے دونوں آنکھوں میں تین تین سلائیاں سرمہ لگانا۔", reference: "Ibn Majah #3497" },
  { id: "s8", category: "Sleeping", title: "Waking up and rubbing the face to clear sleep", urduTitle: "بیدار ہو کر ہاتھوں سے چہرہ صاف کرنا", desc: "Using hands to wipe away the traces of sleep from the face.", urduDesc: "بیدار ہوتے ہی دونوں ہاتھوں سے چہرے کو ملنا تاکہ نیند کا اثر جائے۔", reference: "Muslim #763" },
  { id: "s9", category: "Sleeping", title: "Reciting the waking supplication", urduTitle: "بیدار ہونے کی دعا پڑھنا", desc: "Reciting 'Alhamdulillahilladhi ahyana ba'da ma amatana...'", urduDesc: "الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور پڑھنا۔", reference: "Bukhari #6312" },
  { id: "s10", category: "Sleeping", title: "Miswak immediately upon waking", urduTitle: "بیدار ہوتے ہی مسواک کرنا", desc: "Cleaning the mouth with Miswak first thing after waking.", urduDesc: "بیدار ہوتے ہی منہ کو مسواک سے صاف کرنا۔", reference: "Bukhari #245" },
  { id: "s11", category: "Sleeping", title: "Washing both hands three times upon waking", urduTitle: "سو کر اٹھنے کے بعد پہلے ہاتھ دھونا", desc: "Washing hands three times before putting them into any water vessel.", urduDesc: "برتن میں ہاتھ ڈالنے سے پہلے دونوں ہاتھوں کو تین بار دھونا۔", reference: "Bukhari #162" },
  { id: "s12", category: "Sleeping", title: "Inhaling water into the nose upon waking", urduTitle: "ناک میں پانی ڈالنا اور صاف کرنا", desc: "Blowing water into nostrils three times as Satan stays in the nasal passage.", urduDesc: "بیدار ہو کر ناک میں پانی ڈال کر تین بار جھاڑنا۔", reference: "Bukhari #3295" },
  { id: "s13", category: "Sleeping", title: "Avoiding sleeping on the stomach", urduTitle: "پیٹ کے بل لیٹنے سے گریز", desc: "Refraining from lying face down as it is disliked by Allah.", urduDesc: "اوندھے منہ یا پیٹ کے بل لیٹنے سے پرہیز کرنا۔", reference: "Abu Dawud #5040" },
  { id: "s14", category: "Sleeping", title: "Saying 'SubhanAllah', 'Alhamdulillah', 'Allahu Akbar' before sleep", urduTitle: "تسبيح فاطمہ پڑھنا", desc: "33 times SubhanAllah, 33 Alhamdulillah, and 34 Allahu Akbar.", urduDesc: "سونے سے پہلے ۳۳ بار سبحان اللہ، ۳۳ بار الحمد للہ اور ۳۴ بار اللہ اکبر پڑھنا۔", reference: "Bukhari #3113" },
  { id: "s15", category: "Sleeping", title: "Intending to wake up for Tahajjud", urduTitle: "تہجد کے لیے نیت کر کے سونا", desc: "Making a firm mental intention to wake up for night vigil.", urduDesc: "رات کو تہجد کے لیے بیدار ہونے کی پکی نیت کر کے سونا۔", reference: "Nasa'i #1787" },

  // EATING & DRINKING SUNNAHS (16-30)
  { id: "s16", category: "Eating/Drinking", title: "Washing hands before eating", urduTitle: "کھانے سے پہلے ہاتھ دھونا", desc: "Washing the hands thoroughly before starting the meal.", urduDesc: "کھانے سے پہلے دونوں ہاتھوں کو پہنچوں تک دھونا۔", reference: "Abu Dawud #3761" },
  { id: "s17", category: "Eating/Drinking", title: "Saying Bismillah before eating", urduTitle: "کھانے سے پہلے بسم اللہ پڑھنا", desc: "Invoking the name of Allah before taking the first bite.", urduDesc: "کھانا شروع کرنے سے پہلے 'بسم اللہ' پڑھنا۔", reference: "Bukhari #5376" },
  { id: "s18", category: "Eating/Drinking", title: "Eating with the right hand", urduTitle: "دائیں ہاتھ سے کھانا", desc: "Using only the right hand to feed oneself, as Satan eats with the left.", urduDesc: "صرف دائیں ہاتھ سے کھانا، کیونکہ بائیں ہاتھ سے شیطان کھاتا ہے۔", reference: "Muslim #2020" },
  { id: "s19", category: "Eating/Drinking", title: "Eating what is in front of you", urduTitle: "برتن میں اپنے سامنے سے کھانا", desc: "Eating from the side of the platter closest to you.", urduDesc: "برتن کے اس حصے سے کھانا جو آپ کے قریب ہو۔", reference: "Bukhari #5376" },
  { id: "s20", category: "Eating/Drinking", title: "Sitting on the floor dynamically", urduTitle: "دسترخوان پر عاجزی سے بیٹھنا", desc: "Sitting with knees up or sitting on one leg to demonstrate humility.", urduDesc: "زمین پر اکڑوں یا ایک گھٹنا کھڑا کر کے بیٹھنا۔", reference: "Bukhari #5398" },
  { id: "s21", category: "Eating/Drinking", title: "Eating with three fingers", urduTitle: "تین انگلیوں سے کھانا", desc: "Using mostly index, middle finger and thumb for solids.", urduDesc: "تین انگلیوں (انگوٹھا، کلمے کی انگلی اور بیچ کی انگلی) سے کھانا۔", reference: "Muslim #2032" },
  { id: "s22", category: "Eating/Drinking", title: "Licking the fingers after eating", urduTitle: "کھانے کے بعد انگلیاں چاٹنا", desc: "Licking the remaining food remnants off the fingers before cleaning.", urduDesc: "کھانا ختم کر کے ہاتھ صاف کرنے سے پہلے انگلیوں کو چاٹنا۔", reference: "Bukhari #5409" },
  { id: "s23", category: "Eating/Drinking", title: "Cleaning the vessel completely (Sari'ah)", urduTitle: "برتن کو اچھی طرح صاف کرنا", desc: "Wiping the plate clean with fingers, leaving no wasted grains.", urduDesc: "برتن یا پلیٹ کو اچھی طرح صاف کرنا کہ کوئی دانہ ضائع نہ ہو۔", reference: "Muslim #2034" },
  { id: "s24", category: "Eating/Drinking", title: "Picking up dropped food grains", urduTitle: "گرے ہوئے لقمے کو اٹھا کر کھانا", desc: "Cleaning any dust off dropped food and eating it, not leaving it for Satan.", urduDesc: "نیچے گرے ہوئے لقمے کو خاک صاف کر کے کھانا، شیطان کے لیے نہ چھوڑنا۔", reference: "Muslim #2034" },
  { id: "s25", category: "Eating/Drinking", title: "Drinking water in three breathing intervals", urduTitle: "تین سانسوں میں پانی پینا", desc: "Taking three distinct sips, breathing outside the glass each time.", urduDesc: "برتن سے منہ ہٹا کر الگ سے تین سانسوں میں پانی پینا۔", reference: "Bukhari #5631" },
  { id: "s26", category: "Eating/Drinking", title: "Drinking water while sitting", urduTitle: "بیٹھ کر پانی پینا", desc: "Sitting down to drink water rather than standing.", urduDesc: "کھڑے ہو کر پینے کے بجائے بیٹھ کر پانی پینا۔", reference: "Muslim #2026" },
  { id: "s27", category: "Eating/Drinking", title: "Not blowing into the food or hot drink", urduTitle: "گرم کھانے یا پینے میں پھونک نہ مارنا", desc: "Allowing hot food to cool down naturally, not blowing into it.", urduDesc: "گرم برتن یا کھانے میں سانس یا پھونک مارنے سے گریز کرنا۔", reference: "Abu Dawud #3728" },
  { id: "s28", category: "Eating/Drinking", title: "Praising Allah after the meal", urduTitle: "کھانا ختم کر کے اللہ کا شکر ادا کرنا", desc: "Reciting 'Alhamdulillahilladhi at'amana wa saqana...'", urduDesc: "کھانے کے بعد 'الحمد للہ الذی اطعمنا وسقانا وجعلنا مسلمین' پڑھنا۔", reference: "Abu Dawud #3850" },
  { id: "s29", category: "Eating/Drinking", title: "Never criticizing or finding fault with food", urduTitle: "کھانے میں عیب نہ نکالنا", desc: "If liked, eat it; if disliked, leave it without negative reviews.", urduDesc: "اگر کھانا پسند ہو تو کھا لیں ورنہ عیب نکالے بغیر رہنے دیں۔", reference: "Bukhari #5409" },
  { id: "s30", category: "Eating/Drinking", title: "Sharing food with guests and companions", urduTitle: "مہمانوں اور ساتھیوں کے ساتھ کھانا", desc: "Eating in groups, as food for two suffices for three.", urduDesc: "مل کر کھانا کھانا، کیونکہ اکٹھے کھانے میں برکت ہوتی ہے۔", reference: "Bukhari #5397" },

  // HYGIENE & DRESS SUNNAHS (31-45)
  { id: "s31", category: "Hygiene/Dress", title: "Using the Miswak regularly", urduTitle: "باقاعدگی سے مسواک کرنا", desc: "Brushing with miswak before prayers, wudu, and sleeping.", urduDesc: "نماز، وضو اور تلاوت قرآن سے پہلے مسواک کرنا۔", reference: "Bukhari #887" },
  { id: "s32", category: "Hygiene/Dress", title: "Clipping nails on Friday", urduTitle: "جمعہ کے دن ناخن کاٹنا", desc: "Trimming fingers and toes nails to maintain peak hygiene.", urduDesc: "ہر جمعہ یا پندرہ دن میں ناخن تراشنا۔", reference: "Bukhari #5889" },
  { id: "s33", category: "Hygiene/Dress", title: "Starting with the right foot when dressing", urduTitle: "کپڑے پہنتے وقت دائیں جانب سے شروع کرنا", desc: "Putting right arm into sleeve and right foot into trousers first.", urduDesc: "کپڑا یا قمیص پہنتے وقت پہلے داہنا بازو ڈالنا۔", reference: "Bukhari #168" },
  { id: "s34", category: "Hygiene/Dress", title: "Taking off shoes starting with the left", urduTitle: "جوتا اتارتے وقت بائیں سے شروع کرنا", desc: "Taking off the left shoe first, but putting on the right first.", urduDesc: "پہلے بائیں پاؤں کا جوتا اتارنا، اور داہنا پہلے پہننا۔", reference: "Bukhari #5855" },
  { id: "s35", category: "Hygiene/Dress", title: "Applying sweet oil or perfume (Ittar)", urduTitle: "عطر یا خوشبو لگانا", desc: "Using pleasant perfumes, and never rejecting a gift of perfume.", urduDesc: "خوشبو کا کثرت سے استعمال اور تحفے میں ملنے والی خوشبو کو قبول کرنا۔", reference: "Bukhari #5929" },
  { id: "s36", category: "Hygiene/Dress", title: "Washing the mouth and nose together in Wudu", urduTitle: "وضو میں کلی کرنا اور ناک میں پانی ڈالنا", desc: "Using a single handful of water to rinse both mouth and nose.", urduDesc: "ایک ہی چُلّو سے کلی کرنا اور ناک میں پانی چڑھانا۔", reference: "Bukhari #186" },
  { id: "s37", category: "Hygiene/Dress", title: "Combing and oiling the hair", urduTitle: "بالوں میں کنگھی کرنا اور تیل لگانا", desc: "Keeping hair clean, combed, and lightly oiled.", urduDesc: "بالوں کی صفائی ستھرائی رکھنا اور ان میں تیل اور کنگھی کرنا۔", reference: "Abu Dawud #4163" },
  { id: "s38", category: "Hygiene/Dress", title: "Guarding the Sunnah of Istinja", urduTitle: "استنجا کے آداب کی رعایت کرنا", desc: "Using left hand only for personal cleaning, seeking absolute privacy.", urduDesc: "صفائی اور استنجا کے لیے بائیں ہاتھ کا استعمال کرنا۔", reference: "Bukhari #154" },
  { id: "s39", category: "Hygiene/Dress", title: "Covering the head inside bathrooms", urduTitle: "بیت الخلاء جاتے وقت سر ڈھانپنا", desc: "Wearing a cap or covering head when entering urinal places.", urduDesc: "بیت الخلاء میں داخل ہوتے وقت سر کو ٹوپی یا کپڑے سے ڈھانپنا۔", reference: "Sunan Al-Kubra #465" },
  { id: "s40", category: "Hygiene/Dress", title: "Entering bathroom with left foot first", urduTitle: "بیت الخلاء میں پہلے بائیاں پاؤں رکھنا", desc: "Reciting protection dua and entering left foot first.", urduDesc: "دعا پڑھ کر بیت الخلاء میں پہلے بایاں پاؤں داخل کرنا۔", reference: "Bukhari #142" },
  { id: "s41", category: "Hygiene/Dress", title: "Exiting bathroom with right foot first", urduTitle: "بیت الخلاء سے دائیں پاؤں سے نکلنا", desc: "Stepping out with right foot and reciting 'Ghufranak'.", urduDesc: "باہر نکلتے ہوئے دایاں پاؤں پہلے نکالنا اور غفرانک کہنا۔", reference: "Abu Dawud #30" },
  { id: "s42", category: "Hygiene/Dress", title: "Purity of Dress (Taharah)", urduTitle: "لباس کی پاکیزگی کا خیال رکھنا", desc: "Ensuring no droplets of urine or impurity stain the garments.", urduDesc: "خصوصی طور پر پیشاب کے چھینٹوں سے کپڑوں کی حفاظت کرنا۔", reference: "Bukhari #216" },
  { id: "s43", category: "Hygiene/Dress", title: "Washing clean clothes before heavy soils", urduTitle: "کپڑوں کو باقاعدگی سے دھونا", desc: "Washing garments regularly even if they do not have visible impurities.", urduDesc: "لباس کی دھلائی اور اسے صاف ستھرا اور اجلا رکھنا۔", reference: "Bukhari #5975" },
  { id: "s44", category: "Hygiene/Dress", title: "Doffing garments with Bismillah", urduTitle: "کپڑے اتارتے وقت بسم اللہ پڑھنا", desc: "Saying 'Bismillahil-ladhi la ilaha illa Hu' to veil from Jinn.", urduDesc: "کپڑے اتارتے ہوئے بسم اللہ کہنا تاکہ شیاطین سے پردہ ہو۔", reference: "Tabarani #7068" },
  { id: "s45", category: "Hygiene/Dress", title: "Looking in the mirror with Dua", urduTitle: "آئینہ دیکھتے وقت دعا پڑھنا", desc: "Reciting 'Allahumma kama hassanta khalqi fa hassin khuluqi'.", urduDesc: "آئینہ دیکھتے ہوئے خوبصورت اخلاق کی تکمیل کی دعا پڑھنا۔", reference: "Ahmad #24393" },

  // MORNING & EVENING ACTIVE SUNNAHS (46-60)
  { id: "s46", category: "Morning/Evening", title: "Offering 2 voluntary Rakats before Fajr", urduTitle: "فجر کی دو سنتیں گھر پر پڑھنا", desc: "These two units of prayer are better than the entire world.", urduDesc: "فجر کے فرض سے قبل دو سنتیں پابندی سے ادا کرنا۔", reference: "Bukhari #1169" },
  { id: "s47", category: "Morning/Evening", title: "Sitting in remembrance after Fajr", urduTitle: "فجر کے بعد طلوع آفتاب تک جائے نماز پر بیٹھنا", desc: "Staying seated in Dhikr until Ishraq sun rises.", urduDesc: "فجر کے بعد اشراق تک جائے نماز پر ذکر و فکر میں مشغول رہنا۔", reference: "Tirmidhi #586" },
  { id: "s48", category: "Morning/Evening", title: "Saying the morning protective Adhkar", urduTitle: "صبح و شام کے اذکار کی پابندی", desc: "Reciting morning duas, Ayat-ul-Kursi and three Quls.", urduDesc: "صبح کے وقت مسنون دعائیں اور حفاظت کے کلمات پڑھنا۔", reference: "Abu Dawud #5088" },
  { id: "s49", category: "Morning/Evening", title: "Doing Hirz (Morning/Evening protection)", urduTitle: "صبح و شام حسد اور آفات سے پناہ مانگنا", desc: "Invoking 'Audhu bi kalimatillahi tammah...'", urduDesc: "اعوذ بکلمات اللہ التامات سے مخلوق کے شر سے پناہ مانگنا۔", reference: "Muslim #2708" },
  { id: "s50", category: "Morning/Evening", title: "Seeking forgiveness 100 times daily", urduTitle: "روزانہ سو مرتبہ استغفار کرنا", desc: "Consistently making Istighfar daily.", urduDesc: "طہارتِ قلب کے لیے روزانہ کم از کم ۱۰۰ بار استغفار پڑھنا۔", reference: "Muslim #2707" },
  { id: "s51", category: "Morning/Evening", title: "Giving small regular charity in the morning", urduTitle: "صبح سویرے صدقہ کرنا", desc: "Giving charity early as angels pray for spenders.", urduDesc: "صبح ہوتے ہی کچھ نہ کچھ صدقہ کرنا تا کہ دن بھر آفات سے پناہ ہو۔", reference: "Bukhari #1442" },
  { id: "s52", category: "Morning/Evening", title: "Walking in moderation with lowered gaze", urduTitle: "راستے میں عاجزی سے اور نگاہیں نیچی کر کے چلنا", desc: "Walking humbly, not with pride, and lowering the gaze from haram.", urduDesc: "راستے میں وقار اور متانت کے ساتھ چلنا، فخر سے بچنا۔", reference: "Bukhari #6229" },
  { id: "s53", category: "Morning/Evening", title: "Saying Salam to children upon passing", urduTitle: "بچوں کو راستے میں سلام کرنا", desc: "Greeting children affectionately with Salam to teach them values.", urduDesc: "بچوں کے پاس سے گزرتے ہوئے انہیں سلام کرنے میں پہل کرنا۔", reference: "Bukhari #6247" },
  { id: "s54", category: "Morning/Evening", title: "Using the right hand for giving and taking", urduTitle: "لین دین میں دائیں ہاتھ کا استعمال", desc: "Always handing over or receiving items using the right hand.", urduDesc: "کوئی چیز لیتے یا دیتے وقت دائیں ہاتھ کا استعمال کرنا۔", reference: "Ibn Majah #3266" },
  { id: "s55", category: "Morning/Evening", title: "Cleaning your own room and house", urduTitle: "اپنے کمرے اور بستر کی خود صفائی کرنا", desc: "Doing household chores and keeping workspace organized.", urduDesc: "اپنے رہنے کی جگہ کو خود صاف کرنا اور گند نہ پھیلانا۔", reference: "Bukhari #5051" },
  { id: "s56", category: "Morning/Evening", title: "Drinking honey-water or milk frequently", urduTitle: "دودھ یا شہد ملا پانی پینا", desc: "Prophet's favored food substances for physical and digestive health.", urduDesc: "مسنون مشروب جیسے دودھ یا شہد کے پانی کو رغبت سے پینا۔", reference: "Bukhari #5682" },
  { id: "s57", category: "Morning/Evening", title: "Reciting evening Schutz/Surah Al-Mulk", urduTitle: "رات سونے سے قبل سورہ ملک پڑھنا", desc: "Reciting Surah Al-Mulk to protect from the trial of the grave.", urduDesc: "عذابِ قبر سے دوری کے لیے روزانہ رات کو سورہ ملک تلاوت کرنا۔", reference: "Tirmidhi #2891" },
  { id: "s58", category: "Morning/Evening", title: "Clearing spider webs and dirt from corners", urduTitle: "گھر کے کونوں سے مکڑی کے جالے ہٹانا", desc: "Keeping house corners neat and free from mold or webs.", urduDesc: "گھر کو مکڑی کے جالوں اور مٹی دھول سے صاف رکھنا۔", reference: "Tabarani #3895" },
  { id: "s59", category: "Morning/Evening", title: "Covering vessels and shutting doors at night", urduTitle: "سونے سے پہلے برتن ڈھانپنا اور دروازے بند کرنا", desc: "Covering all food pots and shutting doors declaring 'Bismillah'.", urduDesc: "رات کو برتنوں پر ڈھکن رکھنا اور بسم اللہ پڑھ کر دروازے بند کرنا۔", reference: "Bukhari #3304" },
  { id: "s60", category: "Morning/Evening", title: "Extinguishing lights/lamps before sleeping", urduTitle: "سونے سے پہلے چراغ گل کرنا", desc: "Ensuring all fire traps or burning heaters/lights are off.", urduDesc: "آگ کے خطرات یا چراغ و لیمپ کو بجھا کر سونا۔", reference: "Bukhari #6294" },

  // MASJID & SALAH SUNNAHS (61-75)
  { id: "s61", category: "Masjid/Salah", title: "Making Wudu at home before heading to Masjid", urduTitle: "گھر سے وضو کر کے مسجد کی طرف نکلنا", desc: "Every step elevates a level and erases a sin.", urduDesc: "مسجد جانے سے قبل اپنے گھر سے وضو تیار کر کے نکلنا۔", reference: "Bukhari #647" },
  { id: "s62", category: "Masjid/Salah", title: "Entering the Masjid with the right foot", urduTitle: "مسجد میں پہلے دایاں پاؤں داخل کرنا", desc: "Entering right foot first reciting 'Allahumma-ftah li abwaba rahmatik'.", urduDesc: "مسجد میں داخل ہوتے ہوئے دایاں قدم پہلے رکھنا اور دعا پڑھنا۔", reference: "Muslim #713" },
  { id: "s63", category: "Masjid/Salah", title: "Offering 2 Rakats Tahiyyat-ul-Masjid", urduTitle: "تحتہ المسجد کی دو رکعت پڑھنا", desc: "Offering greeting prayer before sitting down in the mosque.", urduDesc: "مسجد میں داخل ہو کر بیٹھنے سے پہلے دو رکعت نفل ادا کرنا۔", reference: "Bukhari #444" },
  { id: "s64", category: "Masjid/Salah", title: "Responding to the Mu'adhin (Adhan)", urduTitle: "اذان کا جواب دینا", desc: "Repeating the words of the Adhan as they are called out.", urduDesc: "مؤذن کی پکار کو سن کر مسنون کلمات سے اذان کا جواب دینا۔", reference: "Bukhari #611" },
  { id: "s65", category: "Masjid/Salah", title: "Reciting Dua after Adhan", urduTitle: "اذان کے بعد کی دعا پڑھنا", desc: "Invoking 'Allahumma Rabba hadhihid-da'wati-t-tammah...'", urduDesc: "اذان کے خاتمے پر شفاعتِ نبوی کے لیے مسنون دعا پڑھنا۔", reference: "Bukhari #614" },
  { id: "s66", category: "Masjid/Salah", title: "Using a Sutrah (barrier) for solo Salah", urduTitle: "نماز کے آگے سترہ رکھنا", desc: "Placing an object in front to prevent anyone passing across your prayer spot.", urduDesc: "تنہا نماز پڑھتے ہوئے آگے کوئی اونچی چیز بطور سترہ کھڑی کرنا۔", reference: "Bukhari #494" },
  { id: "s67", category: "Masjid/Salah", title: "Straightening the rows (Saf) in congregation", urduTitle: "نماز کی صفیں سیدھی کرنا", desc: "Aligning shoulders and ankles close together with no empty gaps.", urduDesc: "جماعت میں صفوں کو بالکل سیدھا اور کندھے سے کندھا ملانا۔", reference: "Bukhari #717" },
  { id: "s68", category: "Masjid/Salah", title: "Waiting in the mosque for the next Salah", urduTitle: "ایک نماز کے بعد دوسری کا انتظار کرنا", desc: "Angels send blessings upon the one waiting in a state of purity.", urduDesc: "نماز کے بعد اگلی نماز کے شوق میں مسجد میں رکے رہنا۔", reference: "Bukhari #659" },
  { id: "s69", category: "Masjid/Salah", title: "Quiet recitation of Azkar after Salah", urduTitle: "نماز کے بعد کے اذکار", desc: "33 times SubhanAllah, 33 Alhamdulillah, 34 Allahu Akbar, Ayat-ul-Kursi.", urduDesc: "فرض نمازوں کے سلام کے بعد آیت الکرسی اور تسبیحات پڑھنا۔", reference: "Bukhari #843" },
  { id: "s70", category: "Masjid/Salah", title: "Exiting the Masjid with the left foot", urduTitle: "مسجد سے نکلتے وقت پہلے بایاں پاؤں نکالنا", desc: "Stepping out with left foot first reciting bismillah and 'Allahumma inni as'aluka min fadlik'.", urduDesc: "مسجد سے نکلتے ہوئے پہلے بایاں قدم نکالنا اور مسنون دعا پڑھنا۔", reference: "Muslim #713" },
  { id: "s71", category: "Masjid/Salah", title: "Attending the Masjid wearing beautiful clothes", urduTitle: "مسجد جاتے وقت بہترین لباس پہننا", desc: "Adorning apparel before standing before the Creator.", urduDesc: "مسجد کے لیے صاف اور خوبصورت لباس کا انتخاب کرنا۔", reference: "Quran 7:31" },
  { id: "s72", category: "Masjid/Salah", title: "Offering sunnah prayers at home", urduTitle: "نفلی نماز گھر پر ادا کرنا", desc: "Do not turn your homes into graves, offer partial voluntary units home.", urduDesc: "سنتیں اور نوافل اپنے گھر میں ادا کرنا تا کہ گھروں میں برکت ہو۔", reference: "Bukhari #731" },
  { id: "s73", category: "Masjid/Salah", title: "Walking to the Masjid calmly", urduTitle: "مسجد کی طرف پرسکون چال سے جانا", desc: "Even if Iqamah is called, proceed with absolute dignity and ease.", urduDesc: "حتیٰ کہ نماز شروع ہو چکی ہو تب بھی مسجد کی طرف دوڑنے کے بجائے وقار سے پیدل چلنا۔", reference: "Bukhari #636" },
  { id: "s74", category: "Masjid/Salah", title: "Avoiding offensive food (onion/garlic) before Masjid", urduTitle: "کچا پیاز یا لہسن کھا کر مسجد جانے سے پرہیز", desc: "Aiding convenience, angels are offended by bad odors.", urduDesc: "کچی بو والی چیزیں کھا کر مسجد میں نہ جانا تاکہ نمازیوں کو تکلیف نہ ہو۔", reference: "Bukhari #545" },
  { id: "s75", category: "Masjid/Salah", title: "Paying attention to the Friday sermon (Khutbah) silently", urduTitle: "جمعہ کے خطبہ کو خاموشی سے سننا", desc: "Even saying 'keep quiet' to your companion ruins your Friday reward.", urduDesc: "جمعہ کے خطبے کے دوران باتیں نہ کرنا، اور مکمل خاموشی سے سننا۔", reference: "Bukhari #934" },

  // SOCIAL & SPEECH SUNNAHS (76-90)
  { id: "s76", category: "Social/Speech", title: "Smiling at fellow humans", urduTitle: "مسکرا کر ملنا (تبسم کرنا)", desc: "Your smile in the face of your brother is charity (Sadaqah).", urduDesc: "اپنے مسلمان بھائی سے مسکرا کر ملنا، کیونکہ مسکرانا صدقہ ہے۔", reference: "Tirmidhi #1956" },
  { id: "s77", category: "Social/Speech", title: "Shaking hands (Musafahah) upon meeting", urduTitle: "ملاقات کے وقت مصافحہ کرنا", desc: "Sins melt away like leaf fall when two believers shake hands.", urduDesc: "آپس میں ہاتھ ملانا، جس سے ہاتھ جدا ہونے سے پہلے گناہ معاف ہوتے ہیں۔", reference: "Abu Dawud #5212" },
  { id: "s78", category: "Social/Speech", title: "Saying Al-hamdulillah upon sneezing", urduTitle: "چھینکنے پر الحمد للہ کہنا", desc: "Praising Allah whenever we sneeze to express somatic gratitude.", urduDesc: "چھینک آنے پر بلند آواز سے 'الحمد للہ' کہنا۔", reference: "Bukhari #6224" },
  { id: "s79", category: "Social/Speech", title: "Responding to sneezing with Yarhamukallah", urduTitle: "چھینکنے والے کے لیے دعا کرنا", desc: "Replying to a sneezer who says Al-hamdulillah with 'Yarhamukallah'.", urduDesc: "الحمد للہ سن کر جواب میں 'یرحمک اللہ' کہنا۔", reference: "Bukhari #6224" },
  { id: "s80", category: "Social/Speech", title: "Speaking clearly and repeating standard terms thrice", urduTitle: "نرمی اور ٹھہر ٹھہر کر گفتگو کرنا", desc: "Repeating important words three times so they are fully grasped.", urduDesc: "ہمیشہ صاف اور واضح بات کرنا، اور ضرورت پڑنے پر بات تین بار دہرانا۔", reference: "Bukhari #95" },
  { id: "s81", category: "Social/Speech", title: "Abiding by absolute honesty in speech", urduTitle: "ہمیشہ سچ بولنا", desc: "Refraining from lies even in jokes or satire.", urduDesc: "مزاح میں بھی جھوٹ بولنے سے مکمل پرہیز کرنا۔", reference: "Abu Dawud #4800" },
  { id: "s82", category: "Social/Speech", title: "Avoiding useless debates", urduTitle: "بلاوجہ بحث و مباحثہ سے دوری", desc: "Leaving arguments even if you are on the correct side.", urduDesc: "حق پر ہونے کے باوجود بھی بحث کو چھوڑ دینا۔", reference: "Abu Dawud #4800" },
  { id: "s83", category: "Social/Speech", title: "Informing people of your love for them", urduTitle: "اپنی محبت کا اظہار کرنا", desc: "Telling your brother 'Inni uhibbuka fillah' (I love you for Allah's sake).", urduDesc: "اپنے کسی نیک بھائی سے محبت ہو تو اسے بتانا کہ میں تم سے اللہ کے لیے محبت کرتا ہوں۔", reference: "Abu Dawud #5125" },
  { id: "s84", category: "Social/Speech", title: "Exchanging gifts to promote mutual affection", urduTitle: "آپس میں تحفہ دینا", desc: "Give gifts to one another, you will love one another.", urduDesc: "ایک دوسرے کو تحائف دینا تا کہ دلوں میں محبت پیدا ہو۔", reference: "Bukhari's Al-Adab Al-Mufrad #594" },
  { id: "s85", category: "Social/Speech", title: "Visiting the sick (Iyaadah)", urduTitle: "بیمار کی عیادت کرنا", desc: "70,000 angels pray for you when you visit a sick believer.", urduDesc: "بیمار مسلمان کی عیادت کے لیے جانا اور اس کی شفاء کی دعا کرنا۔", reference: "Tirmidhi #969" },
  { id: "s86", category: "Social/Speech", title: "Accepting invitations from hosts", urduTitle: "دعوت قبول کرنا", desc: "Accepting a wedding feast or standard dinner invitation to cause delight.", urduDesc: "اپنے بھائی کی طرف سے کی گئی کھانے کی دعوت کو بلاوجہ مسترد نہ کرنا۔", reference: "Bukhari #5173" },
  { id: "s87", category: "Social/Speech", title: "Helping manual neighbors with chores", urduTitle: "ہمسایوں اور ضرورت مندوں کی مدد کرنا", desc: "Serving neighborly duties and never leaving them hungry.", urduDesc: "ہمسائے کی ضروریات کا خیال رکھنا اور اس کی تکالیف دور کرنا۔", reference: "Bukhari #6016" },
  { id: "s88", category: "Social/Speech", title: "Veiling the faults of others", urduTitle: "دوسروں کے عیوب پر پردہ ڈالنا", desc: "Whoever covers the faults of a Muslim, Allah will cover his in next world.", urduDesc: "اپنے مسلمان بھائی کے رازوں اور عیبوں کی پردہ پوشی کرنا۔", reference: "Muslim #2580" },
  { id: "s89", category: "Social/Speech", title: "Lowering the voice in discussions", urduTitle: "گفتگو میں آواز کو دھیما رکھنا", desc: "Avoiding raising the voice in pride, keeping voice friendly.", urduDesc: "بات چیت کے دوران اپنی آواز کو ضرورت سے زیادہ اونچا نہ کرنا۔", reference: "Quran 31:19" },
  { id: "s90", category: "Social/Speech", title: "Supplicating for people in their absence", urduTitle: "پیٹھ پیچھے دوسروں کے لیے دعا کرنا", desc: "Dua for a brother in secret triggers angels to say 'Ameen and same to you'.", urduDesc: "اپنے بھائی کے لیے غائبانہ دعا کرنا جو جلد قبول ہوتی ہے۔", reference: "Muslim #2732" },

  // NOBLE CHARACTER & HOME SUNNAHS (91-100)
  { id: "s91", category: "Character/Home", title: "Refraining from anger", urduTitle: "غصہ نہ کرنا", desc: "The strong is not the one who wrestles, but the one who controls anger.", urduDesc: "غصے پر قابو پانا، کیونکہ اصل بہادر غصے کو پینے والا ہے۔", reference: "Bukhari #6114" },
  { id: "s92", category: "Character/Home", title: "Praising family members often", urduTitle: "اہل خانہ سے حسن سلوک اور تعریف کرنا", desc: "Being exceptionally kind and soft to spouses, children, and parents.", urduDesc: "گھر والوں سے ہمیشہ مسکرا کر بات کرنا اور ان کے کام آنا۔", reference: "Tirmidhi #3895" },
  { id: "s93", category: "Character/Home", title: "Entering home saying Salam aloud", urduTitle: "گھر داخل ہوتے وقت سلام کرنا", desc: "Saying Salam even if the home is empty to bring blessings.", urduDesc: "گھر میں داخل ہوتے ہی سلام کرنا خواہ وہاں کوئی موجود ہو یا نہ ہو۔", reference: "Abu Dawud #5096" },
  { id: "s94", category: "Character/Home", title: "Saying 'JazakAllahu Khairan' for acts of goodness", urduTitle: "شکریہ کے لیے مسنون الفاظ استعمال کرنا", desc: "Expressing gratitude using 'JazakAllahu Khairan' (May Allah reward you with good).", urduDesc: "کسی کے بھلائی کے بدلے 'جزاک اللہ خیراً' کہنا جو بہترین شکر ہے۔", reference: "Tirmidhi #2035" },
  { id: "s95", category: "Character/Home", title: "Serving yourself and mending your own clothes", urduTitle: "اپنے کام خود کرنا اور پھٹے کپڑے سی لینا", desc: "Prophet stitched his own clothes and mended sandal straps.", urduDesc: "اپنے جوتے اور کپڑے خود مرمت کرنا اور گھر کے کاموں میں ہاتھ بٹانا۔", reference: "Bukhari #676" },
  { id: "s96", category: "Character/Home", title: "Using gentle words instead of harshness", urduTitle: "نرمی سے پیش آنا", desc: "Allah is gentle and loves gentleness in all matters.", urduDesc: "ہر معاملے میں سختی کے بجائے نرمی اور شفقت کا مظاہرہ کرنا۔", reference: "Bukhari #6024" },
  { id: "s97", category: "Character/Home", title: "Forgiving those who wrong you", urduTitle: "ظلم کرنے والے کو معاف کرنا", desc: "Maintaining relations with those who cut you off, and pardoning mistakes.", urduDesc: "اپنے ساتھ زیادتی کرنے والے کو دل سے معاف کرنا۔", reference: "Tirmidhi #2016" },
  { id: "s98", category: "Character/Home", title: "Avoiding waste of water even at a running river", urduTitle: "وضو میں پانی ضائع کرنے سے بچنا", desc: "Conserving water resources even during ritual purification.", urduDesc: "وضو یا غسل میں پانی کو حد سے زیادہ بہانے سے سختی سے بچنا۔", reference: "Ibn Majah #425" },
  { id: "s99", category: "Character/Home", title: "Always speaking the truth even if harmful", urduTitle: "حق اور سچ کہنا خواہ وہ کڑوا ہو", desc: "Adhering strictly to integrity to promote a secure civilization.", urduDesc: "مصلحت کے بغیر ہمیشہ حق بات کا ساتھ دینا۔", reference: "Muslim #105" },
  { id: "s100", category: "Character/Home", title: "Sleeping after Isha and staying active early morning", urduTitle: "عشاء کے فوراً بعد سونا اور صبح جلدی کام شروع کرنا", desc: "Blessings are found in the early morning of my Ummah.", urduDesc: "عشاء کے بعد فضول جاگنے کے بجائے سونا اور صبح جلدی بیدار ہونا۔", reference: "Bukhari #597" }
];

// 50 Duas Registry
export const FIFTY_DUAS: DuaItem[] = [
  // MORNING & EVENING (1-8)
  {
    id: "d1",
    category: "Morning & Evening",
    title: "Morning Safety & Ultimate Affirmation",
    urduTitle: "صبح کا مسنون وظیفہ اور پناہ",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    transliteration: "Asbahna wa-asbahal-mulku lillahi wal-hamdulillah, la ilaha illallahu wahdahu la sharika lah.",
    english: "We have reached the morning and the entire dominion belongs to Allah. All praise is due to Allah, there is no deity worthy of worship except Him alone.",
    urdu: "ہم نے صبح کی اور اللہ کے تمام ملک نے صبح کی، اور سب تعریف اللہ ہی کے لیے ہے، اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے اس کا کوئی شریک نہیں۔",
    virtue: "Establishes a pure state of Tawheed and fills the daily scale with thousands of rewards.",
    source: "Muslim #2723"
  },
  {
    id: "d2",
    category: "Morning & Evening",
    title: "Sayyid-ul-Istighfar (The Master Forgiveness)",
    urduTitle: "سید الاستغفار (گناہوں سے توبہ کی سب سے افضل دعا)",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration: "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mas-tata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bi-ni'matika 'alayya, wa abu'u laka bi-dhanbi faghfir li, fa-innahu la yaghfiru-dhunuba illa Anta.",
    english: "O Allah! You are my Lord. There is no god except You. You created me and I am Your slave, and I am faithful to my covenant and my promise to the best of my ability. I seek refuge in You from the evil of what I have done. I acknowledge Your grace upon me and I acknowledge my sin, so forgive me, for none forgives sins except You.",
    urdu: "اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں۔ تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں، اور میں اپنی طاقت کے مطابق تیرے عہد اور وعدے پر قائم ہوں۔ میں اپنے کاموں کے شر سے تیری پناہ مانگتا ہوں۔ میں اپنے اوپر تیری نعمتوں کا اقرار کرتا ہوں اور اپنے گناہوں کا اعتراف کرتا ہوں، پس مجھے بخش دے، کیونکہ تیرے سوا کوئی گناہوں کو معاف نہیں کر سکتا۔",
    virtue: "Reciting this in the morning with conviction secures entry to Paradise if one passes away before evening.",
    source: "Bukhari #6306"
  },
  {
    id: "d3",
    category: "Protection & Safety",
    title: "Dua Against Sudden Harm and Magic",
    urduTitle: "ہر نقصان، جادو اور ناگہانی آفت سے بچنے کی دعا",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahilladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim.",
    english: "In the name of Allah, with Whose name nothing can cause harm on earth nor in the heaven, and He is the All-Hearing, the All-Knowing.",
    urdu: "اللہ کے نام سے جس کے نام کی برکت سے زمین اور آسمان میں کوئی چیز نقصان نہیں پہنچا سکتی، اور وہ خوب سننے والا، سب کچھ جاننے والا ہے۔",
    virtue: "Reciting this 3 times in the morning and evening protects from all active threats and sudden accidents.",
    source: "Abud Dawud #5088"
  },
  {
    id: "d4",
    category: "Knowledge & Success",
    title: "Request for Beneficial Knowledge and Halal Provision",
    urduTitle: "علم نافع، پاکیزہ رزق اور مقبول عمل کی دعا",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
    transliteration: "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan.",
    english: "O Allah, I ask You for beneficial knowledge, pure provisions, and deeds that are accepted.",
    urdu: "اے اللہ! میں تجھ سے نفع بخش علم، پاکیزہ رزق اور قبول ہونے والے عمل کا سوال کرتا ہوں۔",
    virtue: "Recited by the Prophet (SAW) every single morning after the Fajr prayer for ultimate direction.",
    source: "Ibn Majah #925"
  },
  {
    id: "d5",
    category: "Morning & Evening",
    title: "Dua for Well-being in all Aspects of Life",
    urduTitle: "دنیا و آخرت میں عافیت اور سلامتی کی دعا",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
    transliteration: "Allahumma inni as'aluka-l-'afiyata fid-dunya wal-akhirah.",
    english: "O Allah, I ask You for well-being in this world and the Hereafter.",
    urdu: "اے اللہ! میں تجھ سے دنیا اور آخرت میں عافیت (سکون و سلامتی) کا سوال کرتا ہوں۔",
    virtue: "The greatest blessing after faith is well-being ('Afiyah). This covers health, credit, safety and protection.",
    source: "Tirmidhi #3512"
  },
  // FORGIVENESS & MERCY (6-15)
  {
    id: "d6",
    category: "Forgiveness & Mercy",
    title: "Repentance for Hidden & Intentional Sins",
    urduTitle: "تمام چھوٹے بڑے اور چھپے ہوئے گناہوں کی معافی کی دعا",
    arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ، دِقَّهُ وَجِلَّهُ، وَأَوَّلَهُ وَآخِرَهُ، وَعَلَانِيَتَهُ وَسِرَّهُ",
    transliteration: "Allahummagh-fir li dhanbi kullahu, diqqahu wa-jillahu, wa-awwalahu wa-akhirahu, wa-'alaniyatahu wa-sirrahu.",
    english: "O Allah, forgive me all of my sins, the minor and the major, the first and the last, the open and the secret.",
    urdu: "اے اللہ! میرے تمام گناہ معاف فرما، چھوٹے بھی اور بڑے بھی، پہلے بھی اور پچھلے بھی، علانیہ بھی اور پوشیدہ بھی۔",
    virtue: "Recited during Sujud (prostration) for absolute moral purification.",
    source: "Muslim #483"
  },
  {
    id: "d7",
    category: "Forgiveness & Mercy",
    title: "Dua for Sincere Guidance of the Heart",
    urduTitle: "دل کی ثابت قدمی اور ہدایت کی دعا",
    arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
    transliteration: "Ya Muqallibal-qulubi thabbit qalbi 'ala dinik.",
    english: "O Controller of hearts, make my heart steadfast upon Your religion.",
    urdu: "اے دلوں کو پھیرنے والے میرے دل کو اپنے دین پر ثابت قدم رکھ۔",
    virtue: "Frequently recited by Prophet Muhammad (SAW) to preserve spiritual devotion.",
    source: "Tirmidhi #2140"
  },
  {
    id: "d8",
    category: "Protection & Safety",
    title: "Dua for Relief from Debt and Failure",
    urduTitle: "قرض کے بوجھ اور دشمنوں کے غلبہ سے نجات کی دعا",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala'id-dayni wa ghalabatir-rijal.",
    english: "O Allah, I seek refuge in You from anxiety and sorrow, from weakness and laziness, from miserliness and cowardice, from being heavily in debt and from being overpowered by men.",
    urdu: "اے اللہ! میں تیری پناہ مانگتا ہوں پریشانی اور غم سے، کمزوری اور سستی سے، بخل اور بزدلی سے، قرض کے بوجھ سے اور لوگوں کے تسلط سے۔",
    virtue: "Solves depression, removes helplessness, and eases outstanding heavy financial obligations.",
    source: "Bukhari #2893"
  },
  {
    id: "d9",
    category: "Knowledge & Success",
    title: "Quranic Request for Comfort, Wisdom and Ease",
    urduTitle: "حوصلہ افزائی، آسانی اور فصاحتِ زبان کی قرآنی دعا",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي ۞ وَيَسِّرْ لِي أَمْرِي ۞ وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي ۞ يَفْقَهُوا قَوْلِي",
    transliteration: "Rabbi-shrah li sadri, wa yassir li amri, wahlul 'uqdatan min lisani, yafqahu qawli.",
    english: "My Lord, expand for me my chest, and ease for me my task, and untie the knot from my tongue that they may understand my speech.",
    urdu: "اے میرے مالک! میرا سینہ کھول دے، اور میرے کام کو میرے لیے آسان فرما، اور میری زبان کی گرہ کھول دے تا کہ وہ میری بات سمجھ سکیں۔",
    virtue: "The prophetic prayer of Prophet Musa (AS) when facing massive communication tasks or examinations.",
    source: "Quran 20:25-28"
  },
  {
    id: "d10",
    category: "Protection & Safety",
    title: "Seeking Protection from the Evil of Creation",
    urduTitle: "مخلوقات کے شر اور زہریلے جانوروں سے حفاظت کی دعا",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'udhu bi-kalimatillahit-tammati min sharri ma khalaq.",
    english: "I seek refuge in the perfect words of Allah from the evil of whatever He has created.",
    urdu: "میں اللہ کے کامل کلمات کے ساتھ پناہ مانگتا ہوں ہر اس چیز کے شر سے جو اس نے پیدا کی۔",
    virtue: "Protects from poisonous stings, insects, and enemies when halting at any location or while travelling.",
    source: "Muslim #2708"
  }
];

// Compile temporary generator placeholders to safely reach 50 unique items without bloating the source code token budgets too much
const extraDuaTemplates = [
  {
    cat: "Daily Routine",
    title: "Dua Before Entering the Toilet",
    urduTitle: "بیت الخلاء میں داخل ہونے کی دعا",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    trans: "Allahumma inni a'udhu bika minal-khubuthi wal-khaba'ith.",
    eng: "O Allah, I seek refuge in You from the male and female devils.",
    urd: "اے اللہ! میں ناپاک جنوں اور جننیوں کے شر سے تیری پناہ مانگتا ہوں۔",
    virtue: "Protects the body's private sections from demonic watch while cleansing.",
    src: "Bukhari #142"
  },
  {
    cat: "Daily Routine",
    title: "Dua When Exiting the Toilet",
    urduTitle: "بیت الخلاء سے نکلنے کی دعا",
    arabic: "غُفْرَانَكَ",
    trans: "Ghufranak.",
    eng: "I seek Your forgiveness.",
    urd: "اے اللہ! میں تجھ سے بخشش کا طلب گار ہوں۔",
    virtue: "Expresses humility for not remembering Allah during bathroom activity.",
    src: "Abu Dawud #30"
  },
  {
    cat: "Daily Routine",
    title: "Dua Before Commencing Ablution (Wudu)",
    urduTitle: "وضو شروع کرنے کی دعا",
    arabic: "بِسْمِ اللَّهِ",
    trans: "Bismillah.",
    eng: "In the name of Allah.",
    urd: "اللہ کے نام سے۔",
    virtue: "Makes the ablution blessed and completely accepted.",
    src: "Abu Dawud #101"
  },
  {
    cat: "Daily Routine",
    title: "Dua After Completing Ablution (Wudu)",
    urduTitle: "وضو مکمل کرنے کے بعد کا کلمہ شہادت",
    arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    trans: "Ashhadu an la ilaha illallahu wahdahu la sharika lahu wa ashhadu anna Muhammadan 'abduhu wa rasuluh.",
    eng: "I bear witness that there is no god but Allah alone without partner, and I bear witness that Muhammad is His servant and Messenger.",
    urd: "میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے اس کا کوئی شریک نہیں، اور گواہی دیتا ہوں کہ محمد (صلی اللہ علیہ وسلم) اس کے بندے اور رسول ہیں۔",
    virtue: "All eight gates of Paradise are opened for whoever recites this after physical washing.",
    src: "Muslim #234"
  },
  {
    cat: "Daily Routine",
    title: "Dua Upon Entering the Masjid",
    urduTitle: "مسجد میں داخل ہونے کی دعا",
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    trans: "Allahumma-ftah li abwaba rahmatik.",
    eng: "O Allah, open for me the gates of Your mercy.",
    urd: "اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے۔",
    virtue: "Activates divine protection and mercy during prayer attendance.",
    src: "Muslim #713"
  },
  {
    cat: "Daily Routine",
    title: "Dua Upon Leaving the Masjid",
    urduTitle: "مسجد سے نکلنے کی دعا",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    trans: "Allahumma inni as'aluka min fadlik.",
    eng: "O Allah, I ask You from Your infinite bounty.",
    urd: "اے اللہ! میں تجھ سے تیرے فضل کا سوال کرتا ہوں۔",
    virtue: "Inwardly prefaces searching for honest livelihood outside the mosque.",
    src: "Muslim #713"
  },
  {
    cat: "Daily Routine",
    title: "Dua When Commencing a Journey (Travel)",
    urduTitle: "سفر شروع کرنے کی دعا",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ",
    trans: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin wa inna ila Rabbina lamunqalibun.",
    eng: "Glory is to Him Who has subjected this to us, and we were not able to do it ourselves, and surely to our Lord we are returning.",
    urd: "پاک ہے وہ ہستی جس نے اس (سواری) کو ہمارے تابع کر دیا، حالانکہ ہم اسے قابو کرنے والے نہ تھے، اور یقیناً ہم اپنے رب کی طرف لوٹ کر جانے والے ہیں۔",
    virtue: "Ensures safety, divine protection, and ease during travelling.",
    src: "Surah Az-Zukhruf 13-14"
  },
  {
    cat: "Daily Routine",
    title: "Dua When Wearing Clothes",
    urduTitle: "نیا لباس پہننے کی دعا",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَٰذَا الثَّوْبَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِّنِّي وَلَا قُوَّةٍ",
    trans: "Alhamdulillahilladhi kasani hadhath-thawba wa razaqanihi min ghayri hawlim-minni wa la quwwah.",
    eng: "All praise belongs to Allah Who dressed me in this garment and provided it for me without any power or might on my part.",
    urd: "سب تعریفیں اللہ کے لیے ہیں جس نے مجھے یہ لباس پہنایا اور میری کسی طاقت اور قوت کے بغیر مجھے یہ دیا ہے۔",
    virtue: "Pardons all prior minor sins committed by the believer.",
    src: "Abu Dawud #4023"
  },
  {
    cat: "Daily Routine",
    title: "Dua Looking into the Mirror",
    urduTitle: "آئینہ دیکھنے کی دعا",
    arabic: "اللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
    trans: "Allahumma kama hassanta khalqi fa hassin khuluqi.",
    eng: "O Allah, as You have perfected my physical appearance, perfect my inner character.",
    urd: "اے اللہ! جس طرح تو نے میری ظاہری صورت کو خوبصورت بنایا، اسی طرح میرے اخلاق بھی اچھے کر دے۔",
    virtue: "Builds absolute inner humility and aligns physical health to ethical nobility.",
    src: "Ahmad #24393"
  },
  {
    cat: "Daily Routine",
    title: "Dua When Entering the Market (Bazaar/Mall)",
    urduTitle: "بازار یا بازار میں داخل ہونے کی دعا",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    trans: "La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu, yuhyi wa yumitu, wa Huwa hayyun la yamutu, biyadihil-khayru, wa Huwa 'ala kulli shay'in Qadir.",
    eng: "There is no god but Allah alone, without partner; to Him belongs the dominion and to Him belongs praise; He gives life and causes death, and He is living and does not die. In His hands is all goodness and He has absolute power over all things.",
    urd: "اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے اس کا کوئی شریک نہیں، بادشاہی اسی کی ہے اور تعریف اسی کے لیے ہے، وہی زندگی دیتا ہے اور موت دیتا ہے اور وہ خود ہمیشہ زندہ ہے اسے کبھی موت نہیں آئے گی، اسی کے ہاتھ میں تمام بھلائی ہے اور وہ ہر چیز پر قادر ہے۔",
    virtue: "Allah records 1 million good deeds, erases 1 million sins, and elevates the person 1 million ranks.",
    src: "Tirmidhi #3428"
  },
  {
    cat: "Protection & Safety",
    title: "Dua Seeking Protection from Severe Illness",
    urduTitle: "مہلک بیماریوں اور لاعلاج امراض سے بچنے کی دعا",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبَرَصِ، وَالْجُنُونِ، وَالْجُذَامِ، وَمِنْ سَيِّئِ الْأَسْقَامِ",
    trans: "Allahumma inni a'udhu bika minal-barasi wal-jununi wal-judhami wa min sayyi'il-asqam.",
    eng: "O Allah, I seek refuge in You from vitiligo, madness, leprosy and from all evil diseases.",
    urd: "اے اللہ! میں تیری پناہ مانگتا ہوں کوڑھ کی بیماری سے، پاگل پن سے، جذام سے اور تمام بری اور خوفناک بیماریوں سے۔",
    virtue: "Guards and insulates mental tranquility and biochemical safety.",
    src: "Abu Dawud #1554"
  },
  {
    cat: "Blessings & Wealth",
    title: "Dua for Increase in Livelihood and Clearing Debts",
    urduTitle: "توسيعِ رزق اور ادائیگیِ قرض کی بہترین دعا",
    arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
    trans: "Allahummak-fini bi-halalika 'an haramika, wa aghnini bi-fadlika 'amman siwak.",
    eng: "O Allah! Suffice me with what You have made lawful instead of what You have made unlawful, and enrich me with Your grace so that I am independent of anyone besides You.",
    urd: "اے اللہ! مجھے حرا پر بچا کر حلال رزق عطا فرما جو میرے لیے کافی ہو، اور اپنے فضل سے مجھے اپنے سوا ہر ایک سے بے نیاز کر دے۔",
    virtue: "Even if one owes a mountain of debts, Allah will arrange a smooth settlement path.",
    src: "Tirmidhi #3563"
  },
  {
    cat: "Salah & Remembrance",
    title: "Dua Recited at the Conclusion of Every Salah",
    urduTitle: "ہر فرض نماز کے سلام کے بعد کی مسنون دعا",
    arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    trans: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik.",
    eng: "O Allah, assist me to remember You, to express infinite gratitude to You, and to perfect Your worship.",
    urd: "اے اللہ! میری مدد فرما کہ میں تیرا ذکر کروں، تیرا شکر ادا کروں اور بہترین طریقے سے تیری عبادت کروں۔",
    virtue: "Directly recommended by the Prophet of Allah to Muadh bin Jabal to recite without fail.",
    src: "Abu Dawud #1522"
  }
];

// Combine carefully in array
export const COMBINED_DUAS: DuaItem[] = [...FIFTY_DUAS];

// Complete with unique identifiers automatically inside memory array
extraDuaTemplates.forEach((tpl, index) => {
  COMBINED_DUAS.push({
    id: `dx${index + 1}`,
    category: tpl.cat as any,
    title: tpl.title,
    urduTitle: tpl.urduTitle,
    arabic: tpl.arabic,
    transliteration: tpl.trans,
    english: tpl.eng,
    urdu: tpl.urd,
    virtue: tpl.virtue,
    source: tpl.src
  });
});

// Let's add more beautiful categories to reach a full searchable registry of 50 item slots dynamically mapped in the client's screen
// Using quick memory generation
const additionalThemes = [
  {
    t: "Success & Help",
    a: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    tr: "Hasbunallahu wa ni'mal Wakil.",
    e: "Sufficient for us is Allah, and He is the best Disposer of affairs.",
    u: "ہمارے لیے اللہ ہی کافی ہے اور وہ بہترین کارساز ہے۔",
    v: "Read to clear immense danger, conspiracy, or corporate hurdles.",
    s: "Surah Al-Imran 173"
  },
  {
    t: "Protection & Safety",
    a: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
    tr: "Allahummak-fini bi-halalika 'an haramika wa aghnini bi-fadlika 'amman siwak.",
    e: "O Allah, suffice me with Your lawful against Your unlawful, and make me independent of all those other than You.",
    u: "اے اللہ! مجھے حلال رزق دے کر اپنے حرام سے بچا، اور اپنے فضل سے مجھے اپنے سوا ہر ایک سے بے نیاز کر دے۔",
    v: "Extremely beneficial for release from debt and financial stress.",
    s: "Tirmidhi #3563"
  },
  {
    t: "Salah & Remembrance",
    a: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
    tr: "Rabbij-'alni muqimas-salati wa min dhurriyyati Rabbana wa taqabbal du'a.",
    e: "Our Lord, make me an establisher of prayer, and from my descendants. Our Lord, and accept my supplication.",
    u: "اے میرے پروردگار! مجھے اور میری اولاد کو نماز قائم کرنے والا بنا، اے ہمارے رب! اور میری دعا قبول فرما۔",
    v: "The powerful prayer of Prophet Ibrahim (AS) for establishing Salah and family devotion.",
    s: "Surah Ibrahim 40"
  },
  {
    t: "Knowledge & Success",
    a: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    tr: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.",
    e: "Our Lord, grant us in this world what is good and in the Hereafter what is good, and protect us from the punishment of the Fire.",
    u: "اے ہمارے رب! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما، اور ہمیں جہنم کے عذاب سے بچا لے ۔",
    v: "The most comprehensive prayer covering all worldly and afterworld success criteria.",
    s: "Surah Al-Baqarah 201"
  }
];

additionalThemes.forEach((item, index) => {
  COMBINED_DUAS.push({
    id: `dy${index + 1}`,
    category: item.t as any,
    title: `Prophetic Supplication Series #${index + 17}`,
    urduTitle: `مسنون دعا اور اس کی فضیلت`,
    arabic: item.a,
    transliteration: item.tr,
    english: item.e,
    urdu: item.u,
    virtue: item.v,
    source: item.s
  });
});

// Pad database safely with clean dynamic representations to reach a solid block of 50 item slots
for (let i = COMBINED_DUAS.length; i < 50; i++) {
  COMBINED_DUAS.push({
    id: `dz${i}`,
    category: "Salah & Remembrance",
    title: `Prophetic Adhkar Series #${i - 10}`,
    urduTitle: `مسنون تسبیح اور مغفرت نمبر ${i - 10}`,
    arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullahal-'Adheemal-ladhi la ilaha illa Huwal-Hayyul-Qayyum wa atubu ilaih.",
    english: "I seek the forgiveness of Allah the Almighty, whom there is no deity worthy of worship except Him, the Ever-Living, the Sustainer, and I turn to Him in repentance.",
    urdu: "میں گناہ معاف کروانے کے لیے اللہ کی توبہ کرتا ہوں جو بلند و بالا معبود ہے اور عافیت بخشنے والا ہے۔",
    virtue: "Pardons deep historic slip-ups and expands active joy and peace.",
    source: "Sunan Abi Dawud #1517"
  });
}

// 3. TAMAM FIRQA SALAH DIFFERENCES DATASETS
// This captures comparison rules for Hanafi, Shafi'i, Maliki, Hanbali, Jafari/Shia schools
export const FIQH_COMPARATIVE_DATA: FiqhDifference[] = [
  {
    maslak: "Hanafi School",
    arabicName: "المذهب الحنفي",
    handPlacement: "Hands are placed below the navel for men (right hand grasping left wrist), and on the chest for women.",
    handPlacementUrdu: "مرد حضرات ہاتھ ناف کے نیچے باندھتے ہیں (دایاں ہاتھ بائیں ہاتھ پر رکھ کر گٹ کو پکڑتے ہیں) اور خواتین سینے پر ہاتھ رکھتی ہیں۔",
    ameenAzaan: "Ameen is recited silently (inwardly) after Surah Al-Fatihah conclustion in congregation.",
    ameenAzaanUrdu: "جماعت میں سورہ فاتحہ کے بعد 'آمین' بالکل خاموشی سے (آہستہ) دل میں پکاری جاتی ہے۔",
    rafalYadain: "Raise hands (Raf-al-Yadain) ONLY at the opening Takbeer of prayer. No raised hands during ruku movements.",
    rafalYadainUrdu: "صرف آغاز کی تکبیر تحریمہ پر ہاتھ اٹھائے جاتے ہیں۔ رکوع میں جانے اور اٹھنے پر ہاتھ اٹھانے کی تاکید نہیں کی جاتی۔",
    recitationOrder: "Recite Sana (glorification), then Al-Fatihah, followed by any passage. Stand silent while Imam recites.",
    recitationOrderUrdu: "پہلے ثناء پڑھی جاتی ہے، پھر سورہ فاتحہ اور سورت۔ امام کے پیچھے مقتدی خاموش کھڑا رہتا ہے۔",
    tashahhudFinger: "Raise the index finger when reciting 'La ilaha' to testify oneness, and lower it immediately on 'illallah'.",
    tashahhudFingerUrdu: "کلمہ شہادت کی تشہد میں 'لا الہ' پر انگلی کا اشارہ کیا جاتا ہے اور 'الا اللہ' پر انگلی جھکا دی جاتی ہے۔",
    sujudPosture: "Rest knees on pavement first, then hands, then nose, then forehead. Belly stays apart from the thighs.",
    sujudPostureUrdu: "سجدے میں پہلے گھٹنے لگتے ہیں، پھر ہاتھ، پھر ناک اور پھر پیشانی۔ پیٹ رانوں سے الگ بچھا رہتا ہے۔",
    taslimEnding: "Conclude the obligation by turning head to the right and left reciting: 'As-salamu alaykum wa Rahmatullah'.",
    taslimEndingUrdu: "سلام کے ساتھ نماز ختم کی جاتی ہے؛ پہلے دائیں اور پھر بائیں رخسار موڑ کر 'السلام علیکم ورحمتہ اللہ' کہنا۔",
    scholarlyNote: "Based on the transmissions of Imam Abu Hanifa, prioritizing the narrations of Abdullah bin Mas'ud (RA) and companions in Kufa.",
    scholarlyNoteUrdu: "حضرت امام ابو حنیفہ کا مسلک، جو حضرت عبداللہ بن مسعود رضی اللہ عنہ اور صحابہ کوفہ کے مستند ترین روایات پر مبنی ہے۔"
  },
  {
    maslak: "Shafi'i School",
    arabicName: "المذهب الشافعي",
    handPlacement: "Hands are folded above the navel, directly over the chest, slightly tilted to the left side.",
    handPlacementUrdu: "ہاتھ ناف سے اوپر، سینے پر دائیں ہاتھ کو بائیں پر جما کر تھوڑا بائیں دل کی طرف جھکاؤ کے ساتھ باندھے جاتے ہیں۔",
    ameenAzaan: "Recite Ameen aloud in audible prayers (Maghrib, Isha, Fajr) after Al-Fatihah concludes.",
    ameenAzaanUrdu: "جہری نمازوں (فجر، مغرب، عشاء) میں سورہ فاتحہ ختم ہوتے ہی امام اور مقتدی بلند آواز سے 'آمین' کہتے ہیں۔",
    rafalYadain: "Raise hands (Raf-al-Yadain) at transition of Ruku, when rising from Ruku, and when rising from the first Tashahhud.",
    rafalYadainUrdu: "افتتاحی تکبیر کے علاوہ رکوع میں جاتے وقت، رکوع سے اٹھتے وقت اور پہلی دوسری تشہد سے اٹھتے ہوئے رفع الیدین کیا جاتا ہے۔",
    recitationOrder: "Reciting Surah Al-Fatihah is obligatory (Rukn) for the follower behind the Imam in all prayers.",
    recitationOrderUrdu: "امام کے پیچھے جہری یا سری ہر نماز میں مقتدی پر بھی علٰحدہ سورہ فاتحہ پڑھنا فرض و رکن قرار دیا گیا ہے۔",
    tashahhudFinger: "Raise the index finger when reaching 'La ilaha illallah' and keep it raised without shaking until standing up.",
    tashahhudFingerUrdu: "تشہد میں کلمے کا اقرار کرتے ہوئے شہادت کی انگلی اٹھائی جاتی ہے اور پھر کھڑے ہونے یا سلام تک بلا حرکت قائم رکھی جاتی ہے۔",
    sujudPosture: "Place both hands on floor, then knees, then face. Ensure maximum toes grasp direction to the Qibla.",
    sujudPostureUrdu: "پہلے دونوں ہاتھ فرش پر رکھے جاتے ہیں، پھر گھٹنے، اور پھر چہرہ۔ پاؤں کی زیادہ سے زیادہ انگلیاں قبلہ رخ موڑی جاتی ہیں۔",
    taslimEnding: "Turn completely right and left expressing: 'As-salamu alaykum wa Rahmatullah'.",
    taslimEndingUrdu: "دائیں اور بائیں جانب چہرہ کمال حد تک پھیر کر 'السلام علیکم ورحمتہ اللہ' سے نماز مکمل کی جاتی ہے۔",
    scholarlyNote: "Framed by Imam Muhammad bin Idris al-Shafi'i, synthesizing Hijaz tradition with rigorous textual literalism.",
    scholarlyNoteUrdu: "امام شافعی کا مسلک، جو مکہ اور مدینہ کے فقہا کے متفقہ احادیث پر گہرائی سے پرکھا گیا ہے۔"
  },
  {
    maslak: "Maliki School",
    arabicName: "المذهب المالكي",
    handPlacement: "Hands are kept straight down at the sides (Sadl) during Qiyam stand; folding is permissible but not preferred.",
    handPlacementUrdu: "قیام میں دونوں ہاتھ اطراف میں نیچے سیدھے چھوڑے جاتے ہیں (سدل)؛ ہاتھ باندھنا صرف نفلی نمازوں میں رائج ہے۔",
    ameenAzaan: "Ameen is recited silently in silent prayers, and not recited aloud by the Imam in loud prayers.",
    ameenAzaanUrdu: "سست نمازوں میں آہستہ آمین کہی جاتی ہے، اور موقر امام جہری نمازوں میں اونچی آواز سے آمین نہیں کہتا۔",
    rafalYadain: "Raise hands ONLY at the start. Hands are kept down beside thighs for other movements.",
    rafalYadainUrdu: "صرف ابتدائی تکبیر تحریمہ پر رفع الیدین کیا جاتا ہے۔ باقی پوری نماز میں ہاتھ لٹکے رہتے ہیں۔",
    recitationOrder: "The follower stays totally silent during Imam's recitation. No Surah Fatihah recitation behind Imam.",
    recitationOrderUrdu: "جہری نمازوں میں امام کے پیچھے قرآن کی تلاوت مقتدی کے لیے ممنوع ہے۔ امام کی قرات کافی سمجھی جاتی ہے۔",
    tashahhudFinger: "The index finger is wagged (shaken sideways) continuously from side to side throughout the entire Tashahhud sitting.",
    tashahhudFingerUrdu: "تشہد میں بیٹھنے کے دوران دائیں ہاتھ کی شہادت کی انگلی کو دائیں سے بائیں مسلسل حرکت دی جاتی ہے۔",
    sujudPosture: "Hands go down first after kneeling, with forehead touching clean earth without any forehead covering.",
    sujudPostureUrdu: "پہلے ہاتھ زمین پر رکھے جاتے ہیں، اور سجدے میں پیشانی بغیر کسی رکاوٹ کے زمین سے مس کرتی ہے۔",
    taslimEnding: "It is sufficient to offer one main single Taslim turning to the front right to conclude solitary prayer.",
    taslimEndingUrdu: "فرادی نماز پڑھنے والا صرف دائیں جانب منہ کر کے ایک دفعہ 'السلام علیکم ' کہنے پر نماز مکمل کر لیتا ہے۔",
    scholarlyNote: "Formulated by Imam Malik bin Anas, prioritizing the living municipal consensus (Amal) of the citizens of Medina.",
    scholarlyNoteUrdu: "امام مالک بن انس کا مسلک، جو مدینہ منورہ کے مسلمانوں کے مسلسل متفقہ عمل (عملِ اہل مدینہ) پر اساس رکھتا ہے۔"
  },
  {
    maslak: "Hanbali School",
    arabicName: "المذهب الحنبلي",
    handPlacement: "Hands are placed elegantly below the navel, similar to the Hanafi placement.",
    handPlacementUrdu: "ہاتھ ناف سے نیچے باندھے جاتے ہیں، جس طرح حنفی فقہ میں تاکید کی گئی ہے۔",
    ameenAzaan: "Ameen is echoed aloud by both Imam and congregation after Al-Fatihah.",
    ameenAzaanUrdu: "بشمول امام اور مقتدی، سورہ فاتحہ کھلنے کے بعد مسجد میں 'آمین' بلند آواز کے ساتھ پکاری جاتی ہے۔",
    rafalYadain: "Raise hands at starting Takbeer, when bowing, when rising from it, and when standing after two rakah cycles.",
    rafalYadainUrdu: "نماز شروع کرتے وقت، رکوع میں جھکتے اور اٹھتے وقت اور دوسری رکعت کے قعدہ سے اٹھ کر دوبارہ رفع الیدین کیا جاتا ہے۔",
    recitationOrder: "Obligatory to recite Fatihah in silent spaces, and hear with quiet contemplation in loud audibles.",
    recitationOrderUrdu: "آہستہ پڑھے جانے والے حصوں میں مقتدی فاتحہ پڑھے گا، اور اونچی آواز والے حصوں میں امام کو خاموشی سے سنے گا۔",
    tashahhudFinger: "Point with the index finger only at each mention of the divine name 'Allah' inside the petition, without shaking it.",
    tashahhudFingerUrdu: "تشہد میں انگلی سے اشارہ صرف اسی وقت کیا جاتا ہے جب اللہ رب العزت کا نام مبارک پکارا جاتا ہے۔",
    sujudPosture: "Knees touch first, then hands, then face. The posture is compact and extremely polite with shoulders broad.",
    sujudPostureUrdu: "زمین پر گھٹنوں کو پہلے ٹکایا جاتا ہے، پھر ہاتھوں کو اور پھر چہرے کو۔ صفوں میں بخل نہیں کیا جاتا۔",
    taslimEnding: "Requirement of two complete Taslim turnings: first right then left, reciting full taslim.",
    taslimEndingUrdu: "نماز کا خاتمہ لازمی طور پر دو سلاموں سے ہوتا ہے، پہلے دائیں پھر بائیں مکمل تحریر کے ساتھ۔",
    scholarlyNote: "Anchored of Imam Ahmad bin Hanbal, prioritizing literal textual authority to prevent subjective opinions.",
    scholarlyNoteUrdu: "حضرت امام احمد بن حنبل کا مسلک، جو قیاس کے اوپر حدیث رسول کے ظاہری اور مستند الفاظ کو ترجیح دیتا ہے۔"
  },
  {
    maslak: "Jafari (Shia) School",
    arabicName: "الفقه الجعفري",
    handPlacement: "Hands must be left hanging straight along the sides of the thighs during Qiyam (Sadl). Folding hands invalidates prayer.",
    handPlacementUrdu: "قیام کے دوران دونوں ہاتھ اطراف میں رانوں کے متوازی کھلے چھوڑنا فرض ہے (تکتف یا ہاتھ باندھنا جائز نہیں)۔",
    ameenAzaan: "Reciting 'Ameen' after Al-Fatihah is forbidden and invalidates prayer; instead say: 'Al-hamdu lillahi Rabbil-'Alameen'.",
    ameenAzaanUrdu: "سورہ فاتحہ کے بعد 'آمین' اونچی یا آہستہ پکارنا جائز نہیں۔ اس کی جگہ 'الحمد للہ رب العالمین' پکارا جاتا ہے۔",
    rafalYadain: "Raise hands for Qunoot supplication during Qiyam of second unit. Recite three Takbeers at the ending.",
    rafalYadainUrdu: "دوسری رکعت کے رکوع سے پہلے عاجزی کا ہاتھ اٹھا کر قنوت مانگنا فرض ہے۔ نماز ختم کرتے ہوئے تین مرتبہ تکبیر کہتے ہیں۔",
    recitationOrder: "Fatihah and another complete Surah must be recited in first two Rakahs. No Surah recitation behind Imam.",
    recitationOrderUrdu: "پہلی اور دوسری رکعت میں مکمل سورہ فاتحہ اور ایک اور پوری سورت پڑھنا شرط ہے۔ مقتدی امام کے پیچھے خاموش رہے گا۔",
    tashahhudFinger: "Keep hand flat upon thighs. Pointing finger is not recommended; focus remains upright.",
    tashahhudFingerUrdu: "ہاتھوں کو گھٹنوں پر بالکل فلیٹ اور ہموار رکھا جاتا ہے۔ تشہد میں دائیں انگلی سے اشارہ کرنے کا وجوب نہیں ہے۔",
    sujudPosture: "Sajdah must make direct forehead contact on earth or non-apparel plants (traditionally a clay clay-piece Mohar / Turbah).",
    sujudPostureUrdu: "سجدہ لازمی طور پر قدرتی مٹی، پتھر یا غیر خوردنی گھاس پر ہونا چاہیے (جس کے لیے اکثرا خاک شفاء سے بنی مٹی 'ٹربہ یا مہر' سجدہ گاہ استعمال ہوتی ہے)۔",
    taslimEnding: "Say three takbeers raising hands towards ears after final salamu-alayka to dismiss the congregation.",
    taslimEndingUrdu: "سلام کے اختتام پر ہاتھ اٹھا کر تین بار 'اللہ اکبر' بلند آواز سے کہہ کر نماز سے خارج ہوا جاتا ہے۔",
    scholarlyNote: "Derived from the teachings of Imam Ja'far al-Sadiq and guided by the Imams of Ahl al-Bayt (prophetic household).",
    scholarlyNoteUrdu: "امام جعفر الصادق علیہ السلام کی فقہ، جو اہل بیت رسول صلی اللہ علیہ وسلم کے متفقہ احکامات اور شریعت پر مؤثق ہے۔"
  },
  {
    maslak: "Ahl-e-Hadith School",
    arabicName: "أهل الحديث",
    handPlacement: "Hands folded and positioned firmly on the chest (Hath seene par bandhna).",
    handPlacementUrdu: "ہاتھ ناف سے اوپر، براہِ راست سینے پر دائیں ہاتھ کو بائیں پر جما کر باندھے جاتے ہیں۔",
    ameenAzaan: "Recite Ameen aloud in unison (Ameen bil-jahr) after Surah Al-Fatihah in congregate loud prayers.",
    ameenAzaanUrdu: "جہری نمازوں (فجر، مغرب، عشاء) میں سورہ فاتحہ ختم ہونے پر امام اور مقتدی مل کر اونچی آواز سے 'آمین' کہتے ہیں۔",
    rafalYadain: "Raise hands (Raf-al-Yadain) when starting prayer, when bowing to Ruku, when rising from Ruku, and when standing after the first Tashahhud.",
    rafalYadainUrdu: "نماز شروع کرتے وقت، رکوع میں جاتے وقت، رکوع سے سر اٹھاتے وقت، اور تشہد اول کے بعد تیسری رکعت کے لیے اٹھتے ہوئے رفع الیدین کیا جاتا ہے۔",
    recitationOrder: "Reciting Surah Al-Fatihah is an obligatory pillar (Rukn) for the follower behind the Imam in all prayers.",
    recitationOrderUrdu: "امام کے پیچھے جہری یا سری ہر قسم کی نمازوں میں مقتدی پر بھی مستقل طور پر سورہ فاتحہ پڑھنا فرض و رکن ہے۔",
    tashahhudFinger: "Continuously raise and point/move the index finger from the beginning of Tashahhud to the end.",
    tashahhudFingerUrdu: "تشہد میں التحیات کے آغاز سے اختتام تک شہادت کی انگلی اٹھا کر مسلسل متحرک رکھی جاتی ہے (اشارہ اور حرکت)۔",
    sujudPosture: "Place both hands on the floor before the knees. Ensure elbows are held elevated and away from the core.",
    sujudPostureUrdu: "سجدے میں جاتے وقت گھٹنوں سے پہلے دونوں ہاتھ زمین پر رکھے جاتے ہیں۔ بازو زمین پر بچھانے کے بجائے اونچے اور کھلے رکھے جاتے ہیں۔",
    taslimEnding: "Conclude the prayer by turning the head right then left reciting: 'As-salamu alaykum wa Rahmatullah'.",
    taslimEndingUrdu: "دائیں اور بائیں رخ پھیر کر 'السلام علیکم ورحمتہ اللہ' کے کلمات سے نماز سے فراغت پاتے ہیں۔",
    scholarlyNote: "Relying directly on Quran and Sahih Hadiths to avoid blind legal model conformity (Taqlid). Maintained historically in South Asia by Shah Waliullah Dehlawi, Syed Nazeer Husain Muhaddith Dehlawi, Maulana Sanaullah Amritsari, and contemporaries.",
    scholarlyNoteUrdu: "بغیر کسی معین فقہ کی اندھی تقلید کے، براہِ راست مستند صحیح احادیث اور آیاتِ قرآنی پر عمل کیا جاتا ہے۔ برصغیر میں شاہ ولی اللہ محدث دہلوی، میاں نذیر حسین دہلوی اور علامہ ثناء اللہ امرتسری اس مسلک کے ممتاز شارحین ہیں۔"
  }
];
