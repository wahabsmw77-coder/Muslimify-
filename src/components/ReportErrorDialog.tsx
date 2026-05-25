import React, { useState } from "react";
import { AlertTriangle, CheckCircle, Loader2, X } from "lucide-react";

interface ReportErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: string;
  defaultReference?: string;
}

export default function ReportErrorDialog({
  isOpen,
  onClose,
  defaultType = "Quran",
  defaultReference = ""
}: ReportErrorDialogProps) {
  const [itemType, setItemType] = useState(defaultType);
  const [reference, setReference] = useState(defaultReference);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim() || !description.trim()) {
      setErrorMsg("Please provide both the item reference and a description of the error.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessResponse(null);

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: window.location.href,
          itemType,
          reference,
          description
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit report. Please try again.");
      }

      setSuccessResponse(data);
      setDescription("");
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while connecting to the admin desk server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="report-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-islamic-green/10 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-islamic-green to-islamic-green-hover text-white">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-islamic-gold" />
            <h3 className="font-semibold text-lg">Report an Erratum / Misplacement</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {successResponse ? (
            <div className="text-center py-6 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 text-islamic-green rounded-full">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-800">Submission Accepted!</h4>
              <p className="text-slate-600 max-w-sm mx-auto">
                {successResponse.message}
              </p>
              <div className="p-3 bg-slate-50 rounded-xl max-w-xs mx-auto text-xs text-slate-500 font-mono">
                Report Code: <span className="font-bold text-slate-800">{successResponse.reportId}</span>
              </div>
              <button
                onClick={() => {
                  setSuccessResponse(null);
                  onClose();
                }}
                className="px-6 py-2 bg-islamic-green hover:bg-islamic-green-hover text-white font-medium rounded-xl transition-all shadow-md active:scale-95"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                All reports are securely routed to our moderation team. Direct contact details are fully concealed for absolute developer privacy.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Item Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Quran", "Hadith", "Book"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setItemType(type)}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                        itemType === type
                          ? "bg-islamic-green text-white border-islamic-green shadow-xs"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reference / Location</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="e.g. Surah 3: Ayat 14, Bukhari #52, or Book Name"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-islamic-green focus:border-transparent text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Findings / Detailed Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe any typo, translation layout shift, or recitation mismatch found..."
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-islamic-green focus:border-transparent text-sm resize-none"
                  required
                />
              </div>

              {errorMsg && (
                <div className="p-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl">
                  {errorMsg}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2 bg-islamic-green hover:bg-islamic-green-hover disabled:bg-slate-300 text-white font-semibold rounded-xl shadow-md transition-all active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
