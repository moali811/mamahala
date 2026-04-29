'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, ChevronDown } from 'lucide-react';
import Honeypot from '@/components/ui/Honeypot';

/* ================================================================
   ChatForm — Conversational AI-Feel Form Component

   A reusable chat-style form that feels like talking to a warm,
   intelligent receptionist. Uses scripted conversation flows with
   contextual awareness. Upgradeable to real AI via API.
   ================================================================ */

// ── Types ──

export type ChatFieldType = 'cards' | 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'checkbox' | 'date';

export interface ChatOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
  redirect?: string; // If set, redirects instead of continuing
}

export interface ChatStep {
  id: string;
  /** The "AI" message shown as a chat bubble */
  message: string;
  /** Field type to collect */
  type: ChatFieldType;
  /** For 'cards' and 'select' */
  options?: ChatOption[];
  /** Field name in form data */
  field: string;
  /** Placeholder for text inputs */
  placeholder?: string;
  /** Is this field required? */
  required?: boolean;
  /** For textarea: rows */
  rows?: number;
  /** Auto-advance after selection (cards, select) */
  autoAdvance?: boolean;
  /** Consent text (for checkbox type) */
  consentText?: React.ReactNode;
  /** Contextual follow-up message after user answers */
  followUp?: (value: string, allData: Record<string, string | boolean>) => string | null;
  /** Should this step be shown? Based on previous answers */
  condition?: (data: Record<string, string | boolean>) => boolean;
  /** Validation function */
  validate?: (value: string) => string | null;
}

export interface ChatFormProps {
  /** The conversation steps */
  steps: ChatStep[];
  /** Greeting message shown before first step */
  greeting: string;
  /** Success message after submission */
  successTitle: string;
  successMessage: string;
  /** API endpoint to submit to — if empty string, skip API call and just show success */
  endpoint: string;
  /** Extra data to include in submission */
  extraData?: Record<string, string>;
  /** Locale */
  locale: string;
  isRTL: boolean;
  /** Send button label */
  sendLabel?: string;
  sendingLabel?: string;
  /** Callback when form completes (called with formData) */
  onComplete?: (data: Record<string, string | boolean>) => void;
  /** Theme accent color (default: #7A3B5E) */
  themeColor?: string;
  /** Theme hover color (default: #5E2D48) */
  themeHoverColor?: string;
}

// ── Component ──

export default function ChatForm({
  steps,
  greeting,
  successTitle,
  successMessage,
  endpoint,
  extraData = {},
  locale,
  isRTL,
  sendLabel = 'Send',
  sendingLabel = 'Sending...',
  onComplete,
  themeColor = '#7A3B5E',
  themeHoverColor = '#5E2D48',
}: ChatFormProps) {
  const [currentStep, setCurrentStep] = useState(-1); // -1 = greeting
  const [formData, setFormData] = useState<Record<string, string | boolean>>({});
  const [chatHistory, setChatHistory] = useState<ChatBubble[]>([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const hpRef = useRef<HTMLDivElement>(null);

  type ChatBubble = { from: 'bot' | 'user'; text: string; isWidget?: boolean };

  // Get active steps (filtered by conditions)
  const activeSteps = steps.filter((s) => !s.condition || s.condition(formData));
  const activeStep = currentStep >= 0 && currentStep < activeSteps.length ? activeSteps[currentStep] : null;
  const isLastStep = currentStep === activeSteps.length - 1;
  const progress = activeSteps.length > 0 ? Math.min((currentStep + 1) / activeSteps.length, 1) : 0;

  // Scroll to bottom — ONLY scrolls inside the chat container, never the page
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      const el = chatContainerRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, 150);
  }, []);

  // Add bot message with typing delay
  const addBotMessage = useCallback((text: string, thenFn?: () => void) => {
    setTyping(true);
    scrollToBottom();
    const delay = Math.min(400 + text.length * 8, 1200);
    setTimeout(() => {
      setChatHistory((prev) => [...prev, { from: 'bot', text }]);
      setTyping(false);
      if (thenFn) thenFn();
      scrollToBottom();
    }, delay);
  }, [scrollToBottom]);

  // Add user message
  const addUserMessage = (text: string) => {
    setChatHistory((prev) => [...prev, { from: 'user', text }]);
    scrollToBottom();
  };

  // Start conversation
  useEffect(() => {
    if (currentStep === -1) {
      if (greeting) {
        addBotMessage(greeting, () => setCurrentStep(0));
      } else {
        setCurrentStep(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show next step's message when step changes
  useEffect(() => {
    if (currentStep >= 0 && currentStep < activeSteps.length) {
      const step = activeSteps[currentStep];
      addBotMessage(step.message, () => {
        setTimeout(() => inputRef.current?.focus(), 200);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  // Advance to next step
  const advance = useCallback((value: string | boolean, displayText?: string) => {
    const step = activeSteps[currentStep];
    if (!step) return;

    // Save data
    const newData = { ...formData, [step.field]: value };
    setFormData(newData);

    // Show user's answer as bubble
    if (displayText) addUserMessage(displayText);

    // Check for follow-up message
    const followUp = step.followUp?.(String(value), newData);

    // Recalculate active steps with the NEW data (conditions may have changed)
    const newActiveSteps = steps.filter((s) => !s.condition || s.condition(newData));
    const currentStepInNew = newActiveSteps.indexOf(step);
    const hasMoreSteps = currentStepInNew < newActiveSteps.length - 1;

    if (hasMoreSteps) {
      if (followUp) {
        addBotMessage(followUp, () => {
          setCurrentStep(currentStepInNew + 1);
          setInputValue('');
          setValidationError(null);
        });
      } else {
        setCurrentStep(currentStepInNew + 1);
        setInputValue('');
        setValidationError(null);
      }
    } else {
      // Last step — submit
      if (followUp) {
        addBotMessage(followUp, () => submitForm(newData));
      } else {
        submitForm(newData);
      }
    }
  }, [activeSteps, currentStep, formData, steps, addBotMessage]);

  // Handle card/option selection
  const handleCardSelect = (opt: ChatOption) => {
    if (opt.redirect) {
      window.location.href = opt.redirect;
      return;
    }
    advance(opt.value, opt.label);
  };

  // Handle text input submit
  const handleTextSubmit = () => {
    if (!activeStep) return;
    const val = inputValue.trim();

    if (activeStep.required && !val) {
      setValidationError(isRTL ? 'هذا الحقل مطلوب' : 'This field is required');
      return;
    }

    if (activeStep.validate) {
      const err = activeStep.validate(val);
      if (err) { setValidationError(err); return; }
    }

    if (activeStep.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setValidationError(isRTL ? 'بريد إلكترونيّ غير صالح' : 'Please enter a valid email');
      return;
    }

    advance(val, val);
  };

  // Handle checkbox
  const handleCheckbox = (checked: boolean) => {
    advance(checked, checked ? '✓' : '✗');
  };

  // Submit form
  const submitForm = async (data: Record<string, string | boolean>) => {
    // If no endpoint, just show success (used for guided flows like booking assistant)
    if (!endpoint) {
      setSent(true);
      addBotMessage(successMessage);
      onComplete?.(data);
      return;
    }

    setSending(true); setError(false);
    addBotMessage(isRTL ? 'جارِ الإرسال...' : 'Sending your message...');

    try {
      const hpField = hpRef.current?.querySelector<HTMLInputElement>('input[name="_hp"]');
      const tField = hpRef.current?.querySelector<HTMLInputElement>('input[name="_t"]');
      const res = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...extraData, locale, _hp: hpField?.value || '', _t: Number(tField?.value) || 0 }),
      });
      if (res.ok) {
        setSent(true);
        addBotMessage(successMessage);
        onComplete?.(data);
      } else {
        setError(true);
        addBotMessage(isRTL ? 'حدث خطأ. يُرجى المحاولة مرّةً أخرى.' : 'Something went wrong. Please try again.');
      }
    } catch {
      setError(true);
      addBotMessage(isRTL ? 'حدث خطأ في الاتّصال.' : 'Connection error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  // ── Render ──
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[var(--shadow-card)] overflow-hidden flex flex-col" style={{ minHeight: '420px', maxHeight: '600px' }}>
      <div ref={hpRef}><Honeypot /></div>
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#F3EFE8] bg-gradient-to-r from-[#FAF7F2] to-white flex-shrink-0">
        <div className="relative">
          <Image src="/images/logo-512.png" alt="Mama Hala" width={256} height={256} className="w-10 h-10 rounded-full object-cover" />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25D366] border-2 border-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
            {isRTL ? 'ماما هالة' : 'Mama Hala'}
          </p>
          <p className="text-[10px] text-[#25D366] font-medium">
            {isRTL ? 'متّصلة الآن' : 'Online now'}
          </p>
        </div>
        {/* Progress */}
        <div className="w-20 h-1.5 rounded-full bg-[#F3EFE8] overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ backgroundColor: themeColor }} initial={false}
            animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.4 }} />
        </div>
      </div>

      {/* Chat area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 sm:py-5 space-y-3 sm:space-y-4">
        <AnimatePresence initial={false}>
          {chatHistory.map((bubble, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className={`flex ${bubble.from === 'user' ? (isRTL ? 'justify-start' : 'justify-end') : (isRTL ? 'justify-end' : 'justify-start')}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  bubble.from === 'bot'
                    ? 'bg-[#FAF7F2] text-[#2D2A33] rounded-bl-md'
                    : 'text-white rounded-br-md'
                }`}
                style={bubble.from === 'user' ? { backgroundColor: themeColor } : undefined}
              >
                {bubble.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
              <div className="bg-[#FAF7F2] px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C8A97D] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#C8A97D] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#C8A97D] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive widget area (cards, select, checkbox) */}
        <AnimatePresence>
          {activeStep && !typing && !sent && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              {/* Cards */}
              {activeStep.type === 'cards' && activeStep.options && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {activeStep.options.map((opt) => (
                    <motion.button key={opt.value} type="button" onClick={() => handleCardSelect(opt)}
                      className="flex items-center gap-2.5 p-3.5 rounded-xl border-2 border-[#F3EFE8] bg-white hover:border-[#C8A97D]/40 hover:shadow-sm transition-all text-start"
                      whileTap={{ scale: 0.97 }}>
                      {opt.icon && <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${opt.color || '#7A3B5E'}12` }}>{opt.icon}</div>}
                      <span className="text-xs font-semibold text-[#2D2A33] leading-tight">{opt.label}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Select */}
              {activeStep.type === 'select' && activeStep.options && (
                <div className="mt-2 relative">
                  <select
                    value={inputValue}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val) {
                        const opt = activeStep.options?.find((o) => o.value === val);
                        setInputValue('');
                        advance(val, opt?.label || val);
                      }
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-[#F3EFE8] bg-white text-[16px] sm:text-sm text-[#2D2A33] outline-none appearance-none"
                    onFocus={(e) => e.target.style.borderColor = themeColor}
                    onBlur={(e) => e.target.style.borderColor = '#F3EFE8'}
                  >
                    <option value="">{activeStep.placeholder || (isRTL ? 'اختَرْ...' : 'Select...')}</option>
                    {activeStep.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-[#8E8E9F] pointer-events-none" />
                </div>
              )}

              {/* Checkbox (consent) */}
              {activeStep.type === 'checkbox' && (
                <div className="mt-2 bg-[#FAF7F2] rounded-xl p-4 border border-[#F3EFE8]">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" onChange={(e) => handleCheckbox(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-[#D4ADA8] accent-[#7A3B5E] flex-shrink-0" />
                    <span className="text-[11px] text-[#6B6580] leading-relaxed">{activeStep.consentText}</span>
                  </label>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success animation */}
        {sent && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-6 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-7 h-7 text-[#25D366]" />
            </motion.div>
            <p className="text-base font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>{successTitle}</p>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input area — shown for text/email/tel/textarea/date types */}
      {activeStep && !typing && !sent && ['text', 'email', 'tel', 'textarea', 'date'].includes(activeStep.type) && (
        <div className="border-t border-[#F3EFE8] px-4 py-3 flex-shrink-0">
          {validationError && (
            <p className="text-[11px] text-red-500 mb-1.5 px-1" role="alert">{validationError}</p>
          )}
          <div className="flex items-end gap-2">
            {activeStep.type === 'textarea' ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value); setValidationError(null); }}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleTextSubmit(); } }}
                placeholder={activeStep.placeholder || ''}
                rows={activeStep.rows || 3}
                aria-invalid={validationError ? true : undefined}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#F3EFE8] bg-[#FAF7F2] text-[16px] sm:text-sm text-[#2D2A33] placeholder-[#8E8E9F] outline-none resize-none"
                onFocus={(e) => e.target.style.borderColor = themeColor}
                onBlur={(e) => e.target.style.borderColor = '#F3EFE8'}
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type={activeStep.type === 'date' ? 'date' : activeStep.type}
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value); setValidationError(null); }}
                onKeyDown={(e) => { if (e.key === 'Enter') handleTextSubmit(); }}
                placeholder={activeStep.placeholder || ''}
                aria-invalid={validationError ? true : undefined}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#F3EFE8] bg-[#FAF7F2] text-[16px] sm:text-sm text-[#2D2A33] placeholder-[#8E8E9F] outline-none"
                style={{ borderColor: undefined }}
                onFocus={(e) => e.target.style.borderColor = themeColor}
                onBlur={(e) => e.target.style.borderColor = '#F3EFE8'}
              />
            )}
            <button
              onClick={handleTextSubmit}
              disabled={sending}
              className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl text-white flex items-center justify-center transition-colors disabled:opacity-50 flex-shrink-0"
              style={{ backgroundColor: themeColor }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = themeHoverColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = themeColor)}
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
          {!activeStep.required && (
            <button
              onClick={() => advance('', isRTL ? 'تخطّي' : 'Skip')}
              className="text-[10px] text-[#8E8E9F] hover:text-[#7A3B5E] mt-1.5 px-1 transition-colors"
            >
              {isRTL ? 'تخطّي هذا السؤال' : 'Skip this question'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
