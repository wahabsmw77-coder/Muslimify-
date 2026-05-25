import React, { useState, useEffect } from "react";
import { 
  Coins, 
  Sprout, 
  Calculator, 
  RotateCcw, 
  Bookmark, 
  HelpCircle, 
  CheckCircle2, 
  X, 
  FileText, 
  Sparkles, 
  Scale, 
  ArrowRight,
  Info
} from "lucide-react";

interface Props {
  languageCode: string;
}

export default function ZakatUshrCalculator({ languageCode }: Props) {
  // Tabs: "zakat" or "ushr"
  const [calcTab, setCalcTab] = useState<"zakat" | "ushr">("zakat");
  
  // Is Urdu preferred?
  const isUrdu = languageCode === "ur";

  // System Preference: Currency symbol
  const [currency, setCurrency] = useState<string>("PKR");

  // ==========================================
  // ZAKAT CALCULATOR STATES
  // ==========================================
  const [goldWeight, setGoldWeight] = useState<number>(0);
  const [goldUnit, setGoldUnit] = useState<"grams" | "tolas">("grams");
  const [goldPrice, setGoldPrice] = useState<number>(20000); // price per unit (gram/tola)
  const [includeGold, setIncludeGold] = useState<boolean>(false);

  const [silverWeight, setSilverWeight] = useState<number>(0);
  const [silverUnit, setSilverUnit] = useState<"grams" | "tolas">("grams");
  const [silverPrice, setSilverPrice] = useState<number>(300); // price per unit
  const [includeSilver, setIncludeSilver] = useState<boolean>(false);

  const [cashInHand, setCashInHand] = useState<number>(0);
  const [cashInBank, setCashInBank] = useState<number>(0);
  const [businessAssets, setBusinessAssets] = useState<number>(0);
  const [receivables, setReceivables] = useState<number>(0);
  const [liabilities, setLiabilities] = useState<number>(0);

  // Nisab choice: "silver" or "gold"
  const [nisabStandard, setNisabStandard] = useState<"silver" | "gold">("silver");

  // ==========================================
  // USHR STATE (AGRICULTURAL PRODUCER)
  // ==========================================
  const [cropName, setCropName] = useState<string>("");
  const [cropQuantity, setCropQuantity] = useState<number>(0); // in kg
  const [cropUnit, setCropUnit] = useState<"kg" | "maunds">("kg");
  const [cropPrice, setCropPrice] = useState<number>(100); // price per kg or maund
  const [irrigationType, setIrrigationType] = useState<"natural" | "artificial">("natural");
  
  // Some schools allow deduction of cultivation costs (seed, fertilizer, labor)
  const [allowCropDeductions, setAllowCropDeductions] = useState<boolean>(false);
  const [cropDeductions, setCropDeductions] = useState<number>(0);

  // Load from localstorage if exists
  useEffect(() => {
    const savedCurrency = localStorage.getItem("islamify_calc_currency");
    if (savedCurrency) setCurrency(savedCurrency);

    const savedGoldPrice = localStorage.getItem("islamify_calc_gold_price");
    if (savedGoldPrice) setGoldPrice(Number(savedGoldPrice));

    const savedSilverPrice = localStorage.getItem("islamify_calc_silver_price");
    if (savedSilverPrice) setSilverPrice(Number(savedSilverPrice));
  }, []);

  // Save base unit prices to local storage
  const handleGoldPriceChange = (val: number) => {
    setGoldPrice(val);
    localStorage.setItem("islamify_calc_gold_price", val.toString());
  };

  const handleSilverPriceChange = (val: number) => {
    setSilverPrice(val);
    localStorage.setItem("islamify_calc_silver_price", val.toString());
  };

  const handleCurrencyChange = (val: string) => {
    setCurrency(val);
    localStorage.setItem("islamify_calc_currency", val);
  };

  // Restores standard calculator inputs to empty state
  const resetZakat = () => {
    setGoldWeight(0);
    setSilverWeight(0);
    setCashInHand(0);
    setCashInBank(0);
    setBusinessAssets(0);
    setReceivables(0);
    setLiabilities(0);
    setIncludeGold(false);
    setIncludeSilver(false);
  };

  const resetUshr = () => {
    setCropName("");
    setCropQuantity(0);
    setCropPrice(0);
    setCropDeductions(0);
    setAllowCropDeductions(false);
  };

  // Convert tolas to grams if needed
  // 1 Tola = 11.6638 grams
  const getGoldInGrams = () => {
    if (goldUnit === "tolas") {
      return goldWeight * 11.6638;
    }
    return goldWeight;
  };

  const getSilverInGrams = () => {
    if (silverUnit === "tolas") {
      return silverWeight * 11.6638;
    }
    return silverWeight;
  };

  // Gold value logic: If included, evaluate weight * unitPrice (if price is entered per gram or per tola)
  const getGoldTotalValue = () => {
    if (!includeGold) return 0;
    return goldWeight * goldPrice;
  };

  const getSilverTotalValue = () => {
    if (!includeSilver) return 0;
    return silverWeight * silverPrice;
  };

  // Total Zakat Assets
  const totalZakatAssets = getGoldTotalValue() + getSilverTotalValue() + cashInHand + cashInBank + businessAssets + receivables;
  
  // Net Taxable Wealth (Total assets minus outstanding near-term liabilities)
  const netTaxableWealth = Math.max(0, totalZakatAssets - liabilities);

  // NISAB THRESHOLDS:
  // Gold Nisab: 7.5 Tolas = 87.48 Grams.
  // Silver Nisab: 52.5 Tolas = 612.36 Grams.
  // We can calculate Nisab Value on current unit price.
  const getGoldNisabValue = () => {
    // If unit is tolas, Gold Nisab threshold is 7.5 Tolas. Else 87.48 Grams.
    if (goldUnit === "tolas") {
      return 7.5 * goldPrice;
    } else {
      return 87.48 * goldPrice;
    }
  };

  const getSilverNisabValue = () => {
    if (silverUnit === "tolas") {
      return 52.5 * silverPrice;
    } else {
      return 612.36 * silverPrice;
    }
  };

  const currentNisabThreshold = nisabStandard === "gold" ? getGoldNisabValue() : getSilverNisabValue();

  // Does the user's Net Wealth reach the chosen Nisab limit?
  const isEligibleForZakat = netTaxableWealth >= currentNisabThreshold;

  // Zakat payable is 2.5% on all net wealth (if eligible)
  const zakatPayable = isEligibleForZakat ? netTaxableWealth * 0.025 : 0;

  // ==========================================
  // USHR CALCULATION LOGIC
  // ==========================================
  // Nisab of Ushr: 5 Wasq = approximately 653 kg or ~17.5 Maunds.
  // 1 Maund (Man) is exactly 40 kg.
  const getHarvestInKg = () => {
    if (cropUnit === "maunds") {
      return cropQuantity * 40;
    }
    return cropQuantity;
  };

  const harvestQuantityKg = getHarvestInKg();
  const ushrNisabThresholdKg = 653; // ~5 Wasq
  const hasReachedUshrNisab = harvestQuantityKg >= ushrNisabThresholdKg;

  const grossHarvestValue = cropQuantity * cropPrice;
  const netDeductedCropValue = Math.max(0, grossHarvestValue - (allowCropDeductions ? cropDeductions : 0));

  // Natural irrigation = 10% (Ushr)
  // Artificial irrigation = 5% (Half-Ushr)
  const ushrRatePercentage = irrigationType === "natural" ? 10 : 5;
  const ushrPayableValue = hasReachedUshrNisab ? (netDeductedCropValue * (ushrRatePercentage / 100)) : 0;
  const ushrPayableWeight = hasReachedUshrNisab ? (cropQuantity * (ushrRatePercentage / 100)) : 0;

  return (
    <div id="zakat-usher-module" className="bg-slate-50 border border-slate-200/60 rounded-3xl p-4 sm:p-7 shadow-lg space-y-6">
      
      {/* ---------------------------------------------------- */}
      {/* 1. Header with custom icon and bilingual statement */}
      {/* ---------------------------------------------------- */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-200/80 pb-6 gap-4">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="p-3 bg-gradient-to-br from-emerald-800 to-teal-900 rounded-2xl shadow-md border-b-2 border-islamic-gold">
            <Coins className="w-8 h-8 text-islamic-gold" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
                Zakat & Ushr Treasury
              </h1>
              <span className="bg-emerald-150 text-emerald-800 border border-emerald-300 text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-bold">
                Islamic Pillars V2.0
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl font-medium">
              A pristine, high-fidelity calculation panel to compute your yearly purification dues (Zakat) and agricultural harvests tribute (Ushr) accurately.
            </p>
          </div>
        </div>

        {/* Global Settings (Currency Symbol & Presets) */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-inner flex flex-wrap items-center gap-3.5">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
              Default Currency
            </span>
            <select
              value={currency}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              className="bg-transparent text-slate-800 font-bold text-xs focus:outline-none focus:ring-0 cursor-pointer text-center pt-0.5"
            >
              <option value="PKR">Pakistani Rupee (Rs)</option>
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="GBP">British Pound (£)</option>
              <option value="EUR">Euro (€)</option>
              <option value="SAR">Saudi Riyal (SR)</option>
              <option value="AED">UAE Dirham (DH)</option>
              <option value="BDT">Bangladeshi Taka (৳)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. Bilingual explanation bar or information alert  */}
      {/* ---------------------------------------------------- */}
      <div className="bg-emerald-50 border border-emerald-200/50 p-4 rounded-2xl space-y-2 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-r from-transparent to-emerald-100/30 font-amiri text-5xl flex items-center justify-center text-emerald-600/10 pointer-events-none select-none">
          زكاة
        </div>
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-emerald-950 space-y-1">
            <p className="font-semibold text-emerald-900">
              {isUrdu 
                ? "زکوٰۃ اسلام کا چوتھا بنیادی رکن ہے جو ہر صاحبِ نصاب مسلمان پر فرض ہے (سالانہ 2.5 فیصد)۔ عشر زرعی پیداوار کا خراج ہے جو ہر فصل پر دیا جاتا ہے (بغیر لاگت والی بوائی پر 10 فیصد اور مصنوعی آبپاشی پر 5 فیصد)۔"
                : "Zakat is the 4th pillar of Islam due annually (2.5%) on qualified surplus wealth. Ushr is the Islamic tribute due instantly on agricultural produce at harvest time (10% for natural rainfall, 5% for artificial/well irrigation)."}
            </p>
            <p className="text-emerald-800/90 text-[11px] leading-relaxed">
              {isUrdu
                ? "اس کڑے مانیٹر کے ذریعے آپ اپنے سونا، چاندی، نقد، اور زرعی کھاتوں کی صحیح ترین زکوٰۃ معلوم کر سکتے ہیں۔"
                : "This calculation sheet conforms directly with classical consensus protocols. Keep your files, debt registers, and harvest slips in hand for the absolute calculation."}
            </p>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. Primary Tab Selector (Zakat vs Ushr) */}
      {/* ---------------------------------------------------- */}
      <div className="flex bg-slate-200/75 p-1.5 rounded-2xl max-w-md mx-auto relative shadow-sm">
        <button
          onClick={() => setCalcTab("zakat")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
            calcTab === "zakat"
              ? "bg-gradient-to-b from-white to-slate-50 text-slate-900 shadow-md transform -translate-y-[0.5px] border-b border-amber-500/30"
              : "text-slate-600 hover:text-slate-950"
          }`}
        >
          <Coins className={`w-4 h-4 ${calcTab === "zakat" ? "text-amber-500 fill-amber-500/10" : ""}`} />
          <span>{isUrdu ? "زکوٰۃ کیلکولکٹر" : "Zakat Cash/Asset"}</span>
        </button>
        <button
          onClick={() => setCalcTab("ushr")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
            calcTab === "ushr"
              ? "bg-gradient-to-b from-white to-slate-50 text-slate-900 shadow-md transform -translate-y-[0.5px] border-b border-emerald-500/30"
              : "text-slate-600 hover:text-slate-950"
          }`}
        >
          <Sprout className={`w-4 h-4 ${calcTab === "ushr" ? "text-emerald-600" : ""}`} />
          <span>{isUrdu ? "عشر کیلکولیٹر" : "Ushr (Usher) Harvest"}</span>
        </button>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 4. ACTUAL CALCULATOR TAB SHEETS */}
      {/* ---------------------------------------------------- */}
      {calcTab === "zakat" ? (
        <div id="zakat-sheet" className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          
          {/* Zakat Form Fields Panel */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-display">
                <Calculator className="w-4 h-4 text-emerald-700" />
                <span>Wealth Entry Form</span>
              </h3>
              <button
                onClick={resetZakat}
                className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-800 font-bold transition-colors"
                title="Wipe current inputs"
              >
                <RotateCcw className="w-3.5 h-3.5 animate-spin-hover" />
                <span>Reset Block</span>
              </button>
            </div>

            {/* NISAB PRICE INPUTS */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Gold Price ({currency} per {goldUnit === "tolas" ? "Tola" : "Gram"})
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="number"
                    value={goldPrice || ""}
                    onChange={(e) => handleGoldPriceChange(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="flex-1 text-xs font-mono font-bold bg-white border border-slate-200 rounded-lg p-2 focus:border-amber-500 focus:outline-none"
                    placeholder="Enter gold rate"
                  />
                  <select
                    value={goldUnit}
                    onChange={(e) => setGoldUnit(e.target.value as "grams" | "tolas")}
                    className="text-[10px] uppercase font-bold text-slate-600 border border-slate-200 rounded-lg px-2 bg-white"
                  >
                    <option value="grams">g</option>
                    <option value="tolas">Tola</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Silver Price ({currency} per {silverUnit === "tolas" ? "Tola" : "Gram"})
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="number"
                    value={silverPrice || ""}
                    onChange={(e) => handleSilverPriceChange(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="flex-1 text-xs font-mono font-bold bg-white border border-slate-200 rounded-lg p-2 focus:border-amber-500 focus:outline-none"
                    placeholder="Enter silver rate"
                  />
                  <select
                    value={silverUnit}
                    onChange={(e) => setSilverUnit(e.target.value as "grams" | "tolas")}
                    className="text-[10px] uppercase font-bold text-slate-600 border border-slate-200 rounded-lg px-2 bg-white"
                  >
                    <option value="grams">g</option>
                    <option value="tolas">Tola</option>
                  </select>
                </div>
              </div>
            </div>

            {/* GOLD FIELD OR WEIGHT */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="checkbox-gold"
                    checked={includeGold}
                    onChange={(e) => setIncludeGold(e.target.checked)}
                    className="w-4 h-4 cursor-pointer text-amber-500"
                  />
                  <label htmlFor="checkbox-gold" className="text-xs sm:text-sm font-bold text-slate-800 cursor-pointer select-none">
                    Do you own Gold Jewelry / Bullion?
                  </label>
                </div>
                {includeGold && (
                  <span className="text-xs text-amber-600 font-mono font-bold">
                    Est: {getGoldTotalValue().toLocaleString()} {currency}
                  </span>
                )}
              </div>
              
              {includeGold && (
                <div className="bg-amber-50/40 p-3.5 border border-dashed border-amber-300/65 rounded-xl flex items-center gap-3 animate-fade-in relative">
                  <div className="flex-1">
                    <span className="block text-[9px] uppercase tracking-wider text-amber-800 font-bold mb-1">
                      Gold Weight Owned ({goldUnit})
                    </span>
                    <input
                      type="number"
                      value={goldWeight || ""}
                      onChange={(e) => setGoldWeight(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full text-xs font-mono font-bold bg-white border border-amber-200 rounded-lg p-2 focus:border-amber-500 focus:outline-none"
                      placeholder={`Enter weight in ${goldUnit}`}
                    />
                  </div>
                  <div className="bg-amber-100/70 p-2 rounded-xl text-[10px] text-amber-900 border border-amber-200 max-w-[160px] leading-tight">
                    Minimum Zakat Nisab for gold is <strong>{goldUnit === "tolas" ? "7.5 Tolas" : "87.48 Grams"}</strong>.
                  </div>
                </div>
              )}
            </div>

            {/* SILVER FIELD OR WEIGHT */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="checkbox-silver"
                    checked={includeSilver}
                    onChange={(e) => setIncludeSilver(e.target.checked)}
                    className="w-4 h-4 cursor-pointer text-slate-600"
                  />
                  <label htmlFor="checkbox-silver" className="text-xs sm:text-sm font-bold text-slate-800 cursor-pointer select-none">
                    Do you own Silver Jewelry / Utensils?
                  </label>
                </div>
                {includeSilver && (
                  <span className="text-xs text-slate-600 font-mono font-bold">
                    Est: {getSilverTotalValue().toLocaleString()} {currency}
                  </span>
                )}
              </div>
              
              {includeSilver && (
                <div className="bg-slate-100/50 p-3.5 border border-dashed border-slate-300/70 rounded-xl flex items-center gap-3 animate-fade-in">
                  <div className="flex-1">
                    <span className="block text-[9px] uppercase tracking-wider text-slate-800 font-bold mb-1">
                      Silver Weight Owned ({silverUnit})
                    </span>
                    <input
                      type="number"
                      value={silverWeight || ""}
                      onChange={(e) => setSilverWeight(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full text-xs font-mono font-bold bg-white border border-slate-200 rounded-lg p-2 focus:border-slate-500 focus:outline-none"
                      placeholder={`Enter weight in ${silverUnit}`}
                    />
                  </div>
                  <div className="bg-slate-200/50 p-2 rounded-xl text-[10px] text-slate-900 border border-slate-300 max-w-[160px] leading-tight">
                    Silver Nisab is <strong>{silverUnit === "tolas" ? "52.5 Tolas" : "612.36 Grams"}</strong>.
                  </div>
                </div>
              )}
            </div>

            {/* CASH IN HAND */}
            <div className="space-y-3.5 pt-1.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Cash in Hand / Wallet
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">{currency}</span>
                    <input
                      type="number"
                      value={cashInHand || ""}
                      onChange={(e) => setCashInHand(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full text-xs font-mono font-bold bg-white border border-slate-200 rounded-lg pl-12 pr-4 py-2.5 focus:border-emerald-600 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Cash in Bank Accounts
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">{currency}</span>
                    <input
                      type="number"
                      value={cashInBank || ""}
                      onChange={(e) => setCashInBank(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full text-xs font-mono font-bold bg-white border border-slate-200 rounded-lg pl-12 pr-4 py-2.5 focus:border-emerald-600 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* STOCKS / BUSINESS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1" title="Value of items for resale / Business warehouse balance">
                    Business Goods / Stock Values ⓘ
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">{currency}</span>
                    <input
                      type="number"
                      value={businessAssets || ""}
                      onChange={(e) => setBusinessAssets(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full text-xs font-mono font-bold bg-white border border-slate-200 rounded-lg pl-12 pr-4 py-2.5 focus:border-emerald-600 focus:outline-none"
                      placeholder="Resale inventory & stock market"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1" title="Money lent to individuals that is returnable pretty soon">
                    Loans Recievable / Funds Owed ⓘ
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">{currency}</span>
                    <input
                      type="number"
                      value={receivables || ""}
                      onChange={(e) => setReceivables(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full text-xs font-mono font-bold bg-white border border-slate-200 rounded-lg pl-12 pr-4 py-2.5 focus:border-emerald-600 focus:outline-none"
                      placeholder="Funds owed to you"
                    />
                  </div>
                </div>
              </div>

              {/* DEBTS / PAYABLES */}
              <div className="border-t border-slate-100 pt-3">
                <label className="block text-xs font-bold text-red-800 mb-1" title="Subtract short-term business expenses, immediate taxes due, or personal loans">
                  Subtract Near-Term Liabilities / Debts ⓘ
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-red-400 text-xs font-bold">{currency}</span>
                  <input
                    type="number"
                    value={liabilities || ""}
                    onChange={(e) => setLiabilities(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full text-xs font-mono font-bold bg-white border border-red-200 rounded-lg pl-12 pr-4 py-2.5 focus:border-red-500 focus:outline-none text-red-950"
                    placeholder="Wages due, rent, bills, debt return envelopes"
                  />
                </div>
                <span className="block text-[10px] text-slate-400 mt-1">
                  * Only subtract immediate, genuine outstanding liabilities that you must settle instantly. Future-year mortgages are not deducted.
                </span>
              </div>
            </div>
          </div>

          {/* Zakat Result Summary Pane */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-md space-y-5">
              
              <div className="text-center pb-2 border-b border-slate-100">
                <span className="text-[10px] text-emerald-800 tracking-widest font-bold uppercase block">
                   purification tally
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 font-display">
                  Zakat Payable Summary
                </h3>
              </div>

              {/* NISAB SELECTOR BOX IN SUMMARY */}
              <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-300/30">
                <span className="block text-[9px] font-bold uppercase tracking-wider text-emerald-800 mb-1 text-center">
                  Establish Nisab Threshold By
                </span>
                <div className="flex bg-emerald-900/10 p-1 rounded-lg">
                  <button
                    onClick={() => setNisabStandard("silver")}
                    className={`flex-1 py-1.5 text-[10px] sm:text-xs font-bold rounded-md transition-all ${
                      nisabStandard === "silver"
                        ? "bg-emerald-800 text-white shadow-sm"
                        : "text-emerald-900 hover:bg-emerald-800/5"
                    }`}
                  >
                    Silver Nisab (Classic)
                  </button>
                  <button
                    onClick={() => setNisabStandard("gold")}
                    className={`flex-1 py-1.5 text-[10px] sm:text-xs font-bold rounded-md transition-all ${
                      nisabStandard === "gold"
                        ? "bg-emerald-800 text-white shadow-sm"
                        : "text-emerald-900 hover:bg-emerald-800/5"
                    }`}
                  >
                    Gold Nisab
                  </button>
                </div>
                <div className="flex justify-between items-center text-[10px] text-emerald-950 font-bold mt-2 px-1">
                  <span>Threshold Limit:</span>
                  <span className="font-mono text-emerald-900 font-extrabold">
                    {currentNisabThreshold.toLocaleString()} {currency}
                  </span>
                </div>
                <span className="block text-[9px] text-slate-400/90 text-center mt-1 scale-95 leading-tight">
                  {nisabStandard === "silver" 
                    ? `Based on 52.5 Tolas (612.36g) of Silver @ ${silverPrice}/${silverUnit === "tolas" ? "Tola" : "g"}`
                    : `Based on 7.5 Tolas (87.48g) of Gold @ ${goldPrice}/${goldUnit === "tolas" ? "Tola" : "g"}`}
                </span>
              </div>

              {/* LEDGER DETAILS */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-600 bg-slate-50 p-2 rounded-xl">
                  <span>Gross Assets:</span>
                  <span className="font-mono font-bold text-slate-900">
                    +{totalZakatAssets.toLocaleString()} {currency}
                  </span>
                </div>
                <div className="flex justify-between items-center text-red-700 bg-red-50/40 p-2 rounded-xl border border-red-100/30">
                  <span>Subtracted Liabilities:</span>
                  <span className="font-mono font-bold">
                    -{liabilities.toLocaleString()} {currency}
                  </span>
                </div>
                <div className="h-0.5 bg-slate-100"></div>
                <div className="flex justify-between items-center text-slate-800 bg-slate-50 p-2 rounded-xl font-bold">
                  <span>Net Taxable Wealth:</span>
                  <span className="font-mono text-slate-900">
                    {netTaxableWealth.toLocaleString()} {currency}
                  </span>
                </div>
              </div>

              {/* THE VERDICT BOX */}
              <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-colors duration-300 ${
                isEligibleForZakat
                  ? "bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border-amber-500/30 text-slate-950"
                  : "bg-slate-50 border-slate-200 text-slate-500"
              }`}>
                {isEligibleForZakat ? (
                  <>
                    <div className="bg-amber-500 text-slate-900 p-2 rounded-full border border-yellow-200 shadow-md">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800 block">
                        Nisab Reached (Eligible)
                      </span>
                      <p className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900">
                        {zakatPayable.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-sm font-sans">{currency}</span>
                      </p>
                      <span className="block text-[10px] text-slate-500 font-bold">
                        Calculated at 2.5% of net assets
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-slate-200 text-slate-500 p-2 rounded-full">
                      <X className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                        Below Nisab Limit
                      </span>
                      <p className="text-xl font-bold text-slate-600">
                        0.00 {currency}
                      </p>
                      <p className="text-[10px] text-slate-400 max-w-xs leading-relaxed px-1 font-medium">
                        Your taxable wealth does not meet the necessary threshold of <strong>{currentNisabThreshold.toLocaleString()} {currency}</strong>. Obligatory Zakat is not due.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* BILINGUAL VERSE / FOOTNOTE */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/40 text-left text-[11px] text-slate-500 italic relative overflow-hidden leading-relaxed">
                <span className="absolute -right-3 -bottom-3 text-4xl text-slate-200/30 font-serif select-none">“</span>
                {isUrdu ? (
                  <p className="text-right font-sans">
                    «نماز قائم کرو اور زکوٰۃ ادا کرو اور جو کچھ بھلائی تم اپنے لیے آگے بھیجو گے اسے اللہ کے پاس پا لوگے»۔ <span className="not-italic text-[10px] font-bold block mt-0.5 text-slate-400 text-right">— سورۃ البقرہ، آیت 110</span>
                  </p>
                ) : (
                  <p>
                    &ldquo;And establish prayer and give Zakat, and whatever good you put forward for yourselves - you will find it with Allah.&rdquo; <span className="not-italic text-[9px] font-bold block mt-0.5 text-slate-400">— Surah Al-Baqarah, Ayat 110</span>
                  </p>
                )}
              </div>

            </div>

            {/* Recipients check sheet to provide clean helper features */}
            <div className="bg-emerald-950 text-emerald-100 p-4 rounded-2xl border-b-4 border-islamic-gold shadow-md">
              <span className="text-[9px] uppercase tracking-wider text-islamic-gold font-bold block mb-1 font-mono">
                Eight Legitimate Zakat Channels (Masarif-e-Zakat)
              </span>
              <p className="text-[10px] text-slate-300 leading-relaxed font-sans mb-1.5">
                Surah At-Tawbah (Ayat 60) marks exactly who Zakat can be given to: The poor, the needy, those employed to collect it, bringing hearts together, freeing captives, those in debt, in the cause of Allah, and the stranded traveler.
              </p>
              <span className="text-[9.5px] text-amber-300 font-semibold italic">
                * Note: Zakat cannot be given to immediate family (parents, spouse, children) or used for public infrastructure likes Masjids.
              </span>
            </div>
          </div>

        </div>
      ) : (
        /* Ushr/Usher Section */
        <div id="ushr-sheet" className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          
          {/* Ushr input form */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-display">
                <Sprout className="w-4 h-4 text-emerald-700" />
                <span>Agricultural Harvest Registry</span>
              </h3>
              <button
                onClick={resetUshr}
                className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-800 font-bold transition-colors"
                title="Wipe current inputs"
              >
                <RotateCcw className="w-3.5 h-3.5 animate-spin-hover" />
                <span>Reset Block</span>
              </button>
            </div>

            {/* Crop Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Crop / Produce Name
                </label>
                <input
                  type="text"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="w-full text-xs font-bold bg-white border border-slate-200 rounded-lg p-2.5 focus:border-emerald-600 focus:outline-none"
                  placeholder="e.g. Wheat, Rice, Cotton, Dates"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Market Price (per {cropUnit === "maunds" ? "Maund" : "kg"})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">{currency}</span>
                  <input
                    type="number"
                    value={cropPrice || ""}
                    onChange={(e) => setCropPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full text-xs font-mono font-bold bg-white border border-slate-200 rounded-lg pl-12 pr-4 p-2.5 focus:border-emerald-600 focus:outline-none"
                    placeholder="Rate per unit"
                  />
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Total Harvest Weight Quantity
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="number"
                    value={cropQuantity || ""}
                    onChange={(e) => setCropQuantity(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="flex-1 text-xs font-mono font-bold bg-white border border-slate-200 rounded-lg p-2.5 focus:border-emerald-600 focus:outline-none"
                    placeholder="Total weight quantity"
                  />
                  <select
                    value={cropUnit}
                    onChange={(e) => setCropUnit(e.target.value as "kg" | "maunds")}
                    className="text-xs uppercase font-bold text-slate-600 border border-slate-200 rounded-lg px-2 bg-white cursor-pointer"
                  >
                    <option value="kg">kg</option>
                    <option value="maunds">Maund (Man)</option>
                  </select>
                </div>
                <span className="block text-[10px] text-slate-400 mt-1">
                  * 1 Maund (Man) is exactly equal to 40 kilograms.
                </span>
              </div>

              {/* IRRIGATION METHOD SELECTOR */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Irrigation / Water Source Method
                </label>
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setIrrigationType("natural")}
                    className={`flex-1 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all ${
                      irrigationType === "natural"
                        ? "bg-emerald-800 text-white shadow"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Natural/Rain (10%)
                  </button>
                  <button
                    onClick={() => setIrrigationType("artificial")}
                    className={`flex-1 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all ${
                      irrigationType === "artificial"
                        ? "bg-emerald-800 text-white shadow"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    TubeWell/Pump (5%)
                  </button>
                </div>
                <span className="block text-[10px] text-slate-400 mt-1 leading-tight">
                  {irrigationType === "natural" 
                    ? "Produces naturally irrigated (unforced) from heavy rainfall, local rivers, or streams."
                    : "Water forced/delivered manually through tube-wells, canal leasing, pump fuel, or paid utilities."}
                </span>
              </div>
            </div>

            {/* EXPENSE DEDUCTION TOGGLER */}
            <div className="border-t border-slate-100 pt-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="deduct-cultivation"
                    checked={allowCropDeductions}
                    onChange={(e) => setAllowCropDeductions(e.target.checked)}
                    className="w-4 h-4 cursor-pointer text-emerald-800"
                  />
                  <label htmlFor="deduct-cultivation" className="text-xs sm:text-sm font-bold text-slate-800 cursor-pointer select-none">
                    Deduct Cultivation Costs? (Fiqhi Option)
                  </label>
                </div>
                {allowCropDeductions && (
                  <span className="text-xs text-red-600 font-mono font-bold">
                    -{cropDeductions.toLocaleString()} {currency}
                  </span>
                )}
              </div>

              {allowCropDeductions && (
                <div className="bg-slate-50 p-4 border border-dashed border-slate-200 rounded-xl space-y-3 animate-fade-in">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Cultivation Costs Total ({currency})
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-slate-400 text-xs font-bold">{currency}</span>
                      <input
                        type="number"
                        value={cropDeductions || ""}
                        onChange={(e) => setCropDeductions(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full text-xs font-mono font-bold bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 focus:border-emerald-600 focus:outline-none"
                        placeholder="Seed, fertilizers, machinery rental, diesel"
                      />
                    </div>
                  </div>
                  <span className="block text-[10.5px] text-slate-500 leading-normal font-sans">
                    💡 **Fiqh Note:** Some contemporary scholars and the Hanafi jurists present variations regarding deducting wages, seeds, and fertilizer expenses before assessing Ushr. Enter what you are legally advised.
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* Ushr output result panel */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-md space-y-5">
              
              <div className="text-center pb-2 border-b border-slate-100">
                <span className="text-[10px] text-emerald-800 tracking-widest font-bold uppercase block">
                  agricultural purification
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 font-display">
                  Ushr Payable Tally
                </h3>
              </div>

              {/* NISAB DETAILS FOR CROPS */}
              <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-200 space-y-2">
                <span className="text-[10px] font-mono tracking-wider font-extrabold text-emerald-800 uppercase block text-center">
                  Ushr Nisab Threshold Limit
                </span>
                <div className="flex justify-between items-center text-[10.5px] text-slate-700">
                  <span>Classical Metric (5 Wasq):</span>
                  <span className="font-bold">~ 653 Kilograms</span>
                </div>
                <div className="flex justify-between items-center text-[10.5px] text-slate-700">
                  <span>Equivalents in Maunds:</span>
                  <span className="font-bold">~ 16.325 Maunds</span>
                </div>
                <div className="h-[1px] bg-emerald-200/50"></div>
                
                <div className="flex justify-between items-center text-xs font-bold">
                  <span>Your Crop Quantity:</span>
                  <span className={`font-mono ${harvestQuantityKg >= ushrNisabThresholdKg ? "text-emerald-700 font-extrabold" : "text-amber-600"}`}>
                    {harvestQuantityKg.toLocaleString()} kg ({cropQuantity} {cropUnit})
                  </span>
                </div>
              </div>

              {/* CALCULATION RESULTS GRID */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-600 bg-slate-50 p-2 rounded-xl">
                  <span>Gross Crop Value:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {grossHarvestValue.toLocaleString()} {currency}
                  </span>
                </div>
                {allowCropDeductions && (
                  <div className="flex justify-between items-center text-red-700 bg-red-50/40 p-2 rounded-xl">
                    <span>Cultivation Expense:</span>
                    <span className="font-mono font-bold">
                      -{cropDeductions.toLocaleString()} {currency}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-slate-700 bg-slate-50 p-2 rounded-xl">
                  <span>Taxable Base Value:</span>
                  <span className="font-mono font-bold">
                    {netDeductedCropValue.toLocaleString()} {currency}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-700 bg-slate-50 p-2 rounded-xl">
                  <span>Obligatory Rate applied:</span>
                  <span className="font-bold text-emerald-800">
                    {ushrRatePercentage}% ({irrigationType === "natural" ? "Natural Rain" : "Artificial Irrigation"})
                  </span>
                </div>
              </div>

              {/* OBLIGATORY STATUS VERDICT */}
              <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-colors duration-300 ${
                hasReachedUshrNisab
                  ? "bg-gradient-to-br from-emerald-500/15 to-teal-500/5 border-emerald-500/30 text-slate-950"
                  : "bg-amber-500/5 border-amber-200 text-slate-600"
              }`}>
                {hasReachedUshrNisab ? (
                  <>
                    <div className="bg-emerald-800 text-white p-2.5 rounded-full shadow-md border border-emerald-600 animate-pulse-slow">
                      <Sprout className="w-5 h-5 text-islamic-gold" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 block">
                        Ushr Obligatory Due
                      </span>
                      <p className="text-xl sm:text-2xl font-mono font-extrabold text-slate-950">
                        {ushrPayableValue.toLocaleString(undefined, { maximumFractionDigits: 1 })} <span className="text-xs font-sans">{currency}</span>
                      </p>
                      <span className="block text-[10px] text-slate-500 font-bold">
                        OR equivalent in crop weight code: <strong className="font-mono text-emerald-900">{ushrPayableWeight} {cropUnit}</strong>
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-amber-100 text-amber-700 p-2 rounded-full">
                      <Info className="w-5 h-5 animate-bounce-slow" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800 block">
                        Produce Below Nisab Limit
                      </span>
                      <p className="text-lg font-bold text-slate-700">
                        0.00 {currency}
                      </p>
                      <p className="text-[10px] text-slate-400 max-w-xs leading-normal font-medium">
                        Your harvest weight quantity (<strong>{harvestQuantityKg} kg</strong>) is below the Obligatory Nisab threshold of <strong>{ushrNisabThresholdKg} kg (5 Wasq)</strong>. Paying tribute is voluntary, not mandatory.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* PROPHECY REFERENCE */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/40 text-left text-[11px] text-slate-500 italic relative overflow-hidden leading-relaxed">
                <span className="absolute -right-3 -bottom-3 text-4xl text-slate-200/30 font-serif select-none">“</span>
                {isUrdu ? (
                  <p className="text-right font-sans">
                    «اور اللہ کی راہ میں خرچ کرو، جو کچھ ہم نے تمہیں زمین سے نکال کر دیا ہے (اور کٹائی والے دن اس کا حق ادا کرو)»۔ <span className="not-italic text-[10px] font-bold block mt-0.5 text-slate-400 text-right">— سورۃ الانعام، آیت 141</span>
                  </p>
                ) : (
                  <p>
                    &ldquo;And give the due thereof on the day of its harvest, and waste not by extravagance.&rdquo; <span className="not-italic text-[9px] font-bold block mt-0.5 text-slate-400">— Surah Al-An'am, Ayat 141</span>
                  </p>
                )}
              </div>

            </div>

            {/* Note about timing */}
            <div className="bg-gradient-to-r from-teal-950 to-emerald-950 text-emerald-100 p-4 rounded-2xl border-b-4 border-islamic-gold shadow-md">
              <span className="text-[9px] uppercase tracking-wider text-islamic-gold font-bold block mb-1 font-mono">
                Speed of Due Settlement
              </span>
              <p className="text-[10.5px] text-slate-300 leading-normal font-sans">
                Unlike normal assets which require holding for a full lunar calendar year, <strong>Ushr is calculated and paid instantly on the exact day of harvest</strong> for each respective crop cycle. If you grow crops multiple times a year, calculate and pay Ushr on each crop separately.
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
