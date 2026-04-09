'use client';

/* ================================================================
   ToolkitDownloadBanner — floating bottom banner offering a PDF
   download of the current toolkit. Dismissible via sessionStorage.
   ================================================================ */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { t } from '@/lib/academy-helpers';

interface Props {
  toolkitSlug: string;
  locale: string;
  isRTL: boolean;
}

const STORAGE_KEY = 'toolkit-download-banner-dismissed';

export default function ToolkitDownloadBanner({
  toolkitSlug,
  locale,
  isRTL,
}: Props) {
  const [visible, setVisible] = useState(false);

  /* Check sessionStorage on mount */
  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(`${STORAGE_KEY}-${toolkitSlug}`);
      if (!dismissed) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, [toolkitSlug]);

  function dismiss() {
    setVisible(false);
    try {
      sessionStorage.setItem(`${STORAGE_KEY}-${toolkitSlug}`, '1');
    } catch {
      /* noop */
    }
  }

  const pdfHref = isRTL
    ? `/toolkits/pdf/ar/${toolkitSlug}.pdf`
    : `/toolkits/pdf/${toolkitSlug}.pdf`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          dir={isRTL ? 'rtl' : 'ltr'}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-0 inset-x-0 z-50"
        >
          <div className="mx-auto max-w-4xl px-4 pb-4">
            <div className="flex items-center justify-between gap-4 rounded-xl bg-white/90 backdrop-blur-md border border-[#F3EFE8] shadow-lg px-5 py-3.5">
              {/* Text */}
              <p className="text-sm text-[#4A4A5C]">
                <span className="mr-2 rtl:ml-2 rtl:mr-0" aria-hidden="true">
                  📄
                </span>
                {t(
                  'Prefer paper? Download the PDF version',
                  '\u062a\u0641\u0636\u0644 \u0627\u0644\u0648\u0631\u0642\u061f \u062d\u0645\u0651\u0644 \u0646\u0633\u062e\u0629 PDF',
                  isRTL,
                )}
              </p>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Download button */}
                <a
                  href={pdfHref}
                  download
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
                  style={{ backgroundColor: '#7A3B5E' }}
                >
                  {t('Download', '\u062a\u062d\u0645\u064a\u0644', isRTL)}
                </a>

                {/* Dismiss button */}
                <button
                  type="button"
                  onClick={dismiss}
                  className="rounded-lg p-2 text-[#4A4A5C]/60 hover:text-[#4A4A5C] hover:bg-[#F3EFE8] transition-colors"
                  aria-label={t('Dismiss', '\u0625\u063a\u0644\u0627\u0642', isRTL)}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
