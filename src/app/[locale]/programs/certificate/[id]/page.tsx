'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Calendar, BookOpen, Download, Loader2 } from 'lucide-react';

interface CertificateData {
  certId: string;
  studentName: string;
  programTitle: string;
  programTitleAr: string;
  certificateTitle: string;
  signedBy: string;
  completedAt: string;
  completedModules: number;
}

export default function CertificateVerificationPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const certId = params?.id as string;
  const isRTL = locale === 'ar';

  const [cert, setCert] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchCert() {
      try {
        const res = await fetch(`/api/academy/certificate?email=verify&program=${certId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.certificate) setCert(data.certificate);
          else setNotFound(true);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      }
      setLoading(false);
    }
    if (certId) fetchCert();
  }, [certId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#7A3B5E]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-20">
      <div className="container-main max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Verification badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B8A6E]/10 text-[#3B8A6E] text-sm font-semibold">
              <CheckCircle className="w-4 h-4" />
              {isRTL ? 'شهادة موثقة' : 'Verified Certificate'}
            </div>
          </div>

          {/* Certificate Card */}
          <div className="bg-white rounded-3xl border-2 border-[#C8A97D]/20 overflow-hidden shadow-lg">
            {/* Gold top border */}
            <div className="h-2 bg-gradient-to-r from-[#7A3B5E] via-[#C8A97D] to-[#C4878A]" />

            <div className="p-10 sm:p-14 text-center">
              {/* Logo area */}
              <p className="text-xs text-[#C8A97D] uppercase tracking-[0.4em] mb-2">Mama Hala Academy</p>
              <Award className="w-12 h-12 text-[#C8A97D] mx-auto mb-6" />

              <h1
                className="text-3xl sm:text-4xl text-[#2D2A33] mb-8"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? 'شهادة إتمام' : 'Certificate of Completion'}
              </h1>

              <p className="text-sm text-[#8E8E9F] mb-3">{isRTL ? 'هذا يشهد بأن' : 'This certifies that'}</p>

              {cert ? (
                <>
                  <h2
                    className="text-2xl sm:text-3xl text-[#7A3B5E] mb-4"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {cert.studentName}
                  </h2>

                  <p className="text-sm text-[#4A4A5C] mb-2">{isRTL ? 'أتم بنجاح برنامج' : 'has successfully completed'}</p>

                  <h3 className="text-xl font-bold text-[#2D2A33] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                    {isRTL ? cert.programTitleAr : cert.programTitle}
                  </h3>

                  <div className="flex items-center justify-center gap-6 text-sm text-[#8E8E9F] mb-8">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {new Date(cert.completedAt).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      {cert.completedModules} {isRTL ? 'وحدة' : 'modules'}
                    </span>
                  </div>

                  <div className="border-t border-[#F3EFE8] pt-6">
                    <p className="text-lg" style={{ fontFamily: 'var(--font-heading)' }}>{cert.signedBy}</p>
                    <p className="text-xs text-[#8E8E9F]">{isRTL ? 'مستشارة أسرية معتمدة' : 'Certified Family Counselor'}</p>
                    <p className="text-[10px] text-[#B0B0C0] mt-4">ID: {cert.certId}</p>
                  </div>
                </>
              ) : (
                <div className="py-8">
                  <p className="text-[#8E8E9F]">
                    {isRTL ? 'لم يتم العثور على الشهادة.' : 'Certificate not found or not yet generated.'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-[#8E8E9F] mt-6">
            Mama Hala Consulting — mamahala.ca
          </p>
        </motion.div>
      </div>
    </div>
  );
}
