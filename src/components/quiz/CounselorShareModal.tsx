'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Check, MessageCircle, Mail, Loader2, Download } from 'lucide-react';
import { BUSINESS } from '@/config/business';
import Honeypot from '@/components/ui/Honeypot';

interface CounselorShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  quizSlug: string;
  sessionId: string;
  score: number;
  maxScore: number;
  tierKey: string;
  tierTitle: string;
  dimensions?: Record<string, number>;
  dimensionLabels?: Record<string, string>;
  dominantStyle?: string;
  quizName: string;
}

export default function CounselorShareModal({
  isOpen,
  onClose,
  locale,
  quizSlug,
  sessionId,
  score,
  maxScore,
  tierKey,
  tierTitle,
  dimensions,
  dimensionLabels,
  dominantStyle,
  quizName,
}: CounselorShareModalProps) {
  const isRTL = locale === 'ar';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const hpRef = useRef<HTMLDivElement>(null);

  const resultsPageUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://mamahala.ca'}/${locale}/quiz/results/${sessionId}`;

  const buildWhatsAppMessage = () => {
    const lines = [
      isRTL ? `مرحبًا د. هالة،` : `Hi Dr. Hala,`,
      '',
      isRTL
        ? `أودُّ مشاركةَ نتائجِ تقييمي معكِ.`
        : `I'd like to share my assessment results with you.`,
      '',
      `${isRTL ? 'الاسم' : 'Name'}: ${name}`,
      `${isRTL ? 'التقييم' : 'Assessment'}: ${quizName}`,
      `${isRTL ? 'المستوى' : 'Result'}: ${tierTitle} (${score}/${maxScore})`,
      '',
      `${isRTL ? 'عرضُ النتائجِ الكاملة' : 'View full results'}:`,
      resultsPageUrl,
    ];

    return encodeURIComponent(lines.join('\n'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus('loading');

    try {
      const hpField = hpRef.current?.querySelector<HTMLInputElement>('input[name="_hp"]');
      const tField = hpRef.current?.querySelector<HTMLInputElement>('input[name="_t"]');
      await fetch('/api/quiz-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          quizSlug,
          quizName,
          sessionId,
          score,
          maxScore,
          tierKey,
          tierTitle,
          dimensions,
          dimensionLabels,
          dominantStyle,
          locale,
          _hp: hpField?.value || '',
          _t: Number(tField?.value) || 0,
        }),
      });

      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const whatsappUrl = `https://wa.me/16132222104?text=${buildWhatsAppMessage()}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#F3EFE8]">
              <h3 className="text-lg font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
                {isRTL ? 'شارِكْ مع مستشارِك' : 'Share with Your Counselor'}
              </h3>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#F3EFE8] flex items-center justify-center hover:bg-[#E8E0D4] transition-colors">
                <X className="w-4 h-4 text-[#4A4A5C]" />
              </button>
            </div>

            {status === 'success' ? (
              /* Success State */
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-[#25D366]" />
                </div>
                <h4 className="text-lg font-bold text-[#2D2A33] mb-2">
                  {isRTL ? 'تمّ بنجاح!' : 'All Set!'}
                </h4>
                <p className="text-sm text-[#6B6580] mb-1">
                  {isRTL
                    ? 'نتائجُك محفوظةٌ وتمَّ إرسالُ نسخةٍ إلى بريدِك الإلكتروني ود. هالة.'
                    : 'Your results are saved. An email with the full report has been sent to you and Dr. Hala.'}
                </p>
                <p className="text-xs text-[#8E8E9F] mb-6">
                  {isRTL
                    ? 'يمكنُكما تحميلُ نسخةِ PDF من الرابطِ في البريدِ الإلكتروني.'
                    : 'You can both download a PDF copy from the link in the email.'}
                </p>
                <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full font-semibold text-sm hover:bg-[#20bd5a] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {isRTL ? 'أرسِلْ عبر واتساب' : 'Send via WhatsApp'}
                  </a>
                  <a
                    href={resultsPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#7A3B5E] text-white rounded-full font-semibold text-sm hover:bg-[#5E2D48] transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    {isRTL ? 'عرضُ وتحميلُ PDF' : 'View & Download PDF'}
                  </a>
                </div>
                <button
                  onClick={onClose}
                  className="block mx-auto mt-4 text-sm text-[#8E8E9F] hover:text-[#4A4A5C] transition-colors"
                >
                  {isRTL ? 'إغلاق' : 'Close'}
                </button>
              </div>
            ) : (
              /* Form State */
              <form onSubmit={handleSubmit} className="p-5">
                <div ref={hpRef}><Honeypot /></div>
                <p className="text-sm text-[#6B6580] mb-5">
                  {isRTL
                    ? 'أدخِلْ اسمَك وبريدَك لحفظِ النتائجِ ومشاركتِها مع د. هالة.'
                    : 'Enter your name and email to save your results and share them with Dr. Hala.'}
                </p>

                <div className="space-y-3 mb-5">
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isRTL ? 'اسمُك' : 'Your name'}
                      required
                      className="w-full px-4 py-3 text-[16px] sm:text-sm rounded-xl border border-[#F3EFE8] bg-[#FAF7F2] text-[#2D2A33] placeholder-[#8E8E9F] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isRTL ? 'بريدُك الإلكتروني' : 'Your email'}
                      required
                      className="w-full px-4 py-3 text-[16px] sm:text-sm rounded-xl border border-[#F3EFE8] bg-[#FAF7F2] text-[#2D2A33] placeholder-[#8E8E9F] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-xs text-red-500 mb-3">
                    {isRTL ? 'حدث خطأ. حاوِلْ مرةً أخرى.' : 'Something went wrong. Please try again.'}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading' || !name.trim() || !email.trim()}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#7A3B5E] text-white rounded-xl font-semibold text-sm hover:bg-[#5E2D48] transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {status === 'loading'
                    ? (isRTL ? 'جارٍ الحفظ...' : 'Saving...')
                    : (isRTL ? 'حفظ ومشاركة' : 'Save & Share')}
                </button>

                <p className="text-[10px] text-[#8E8E9F] text-center mt-3">
                  {isRTL
                    ? 'بياناتُك آمنةٌ ولن تُستخدمَ إلّا لأغراضِ الاستشارة.'
                    : 'Your data is secure and only used for consultation purposes.'}
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
