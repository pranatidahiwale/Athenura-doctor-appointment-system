import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  CalendarDays,
  ArrowRight,
  Stethoscope,
  ShieldCheck,
  CreditCard,
  HeartPulse,
  Phone,
  Mail,
  MessageCircleQuestion,
} from "lucide-react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

/* ================= DATA ================= */

const CATEGORIES = [
  { id: "all", label: "All Questions", icon: MessageCircleQuestion },
  { id: "appointments", label: "Appointments", icon: CalendarDays },
  { id: "treatments", label: "Treatments & Care", icon: HeartPulse },
  { id: "billing", label: "Billing & Insurance", icon: CreditCard },
  { id: "clinic", label: "Clinic & Safety", icon: ShieldCheck },
];

const FAQS = [
  {
    id: "f1",
    category: "appointments",
    question: "How do I book an appointment with Dr. Malhotra?",
    answer:
      "You can book directly through the \"Book Appointment\" button on our website, call our front desk at the clinic, or use the 24/7 scheduling assistant. In-person visits and video consults are both available, Monday through Saturday.",
  },
  {
    id: "f2",
    category: "appointments",
    question: "What should I bring to my first visit?",
    answer:
      "Please bring a valid photo ID, any previous medical records or test results, a list of current medications, and your insurance card if applicable. If you've had a recent ECG, echocardiogram, or blood work done elsewhere, bringing those reports helps us build a complete picture from day one.",
  },
  {
    id: "f3",
    category: "appointments",
    question: "Can I reschedule or cancel my appointment?",
    answer:
      "Yes. We ask that you reschedule or cancel at least 24 hours in advance so the slot can be offered to another patient. You can do this through the scheduling assistant or by calling the clinic directly — no cancellation fee applies within a fair-use policy.",
  },
  {
    id: "f4",
    category: "appointments",
    question: "Do you offer video consultations?",
    answer:
      "Yes, video consults are available for follow-ups, medication reviews, and select initial consultations where an in-person exam isn't required immediately. You'll receive a secure link before your scheduled time.",
  },
  {
    id: "f5",
    category: "treatments",
    question: "What conditions does Dr. Malhotra treat?",
    answer:
      "Dr. Malhotra specializes in interventional cardiology, heart failure care, preventive cardiology, and vascular imaging — covering conditions such as coronary artery disease, arrhythmias, hypertension, valve disorders, and long-term heart failure management.",
  },
  {
    id: "f6",
    category: "treatments",
    question: "How should I prepare for a stress test or angiography?",
    answer:
      "Preparation depends on the specific test. Generally, you'll be asked to avoid caffeine for 24 hours beforehand and to wear comfortable clothing. Our team will send you detailed, test-specific instructions once your procedure is scheduled, including any fasting requirements.",
  },
  {
    id: "f7",
    category: "treatments",
    question: "Will I need lifestyle changes alongside medication?",
    answer:
      "In most cases, yes. Dr. Malhotra takes a preventive-first approach, pairing medication with practical guidance on diet, activity, sleep, and stress management. You'll leave each visit with clear, personalized next steps rather than a generic checklist.",
  },
  {
    id: "f8",
    category: "billing",
    question: "Which insurance providers do you accept?",
    answer:
      "We work with most major insurance providers for both consultations and procedures. Share your insurance details when booking, and our billing team will confirm your coverage and any out-of-pocket costs before your visit.",
  },
  {
    id: "f9",
    category: "billing",
    question: "Is payment required at the time of the visit?",
    answer:
      "Consultation fees are typically collected at the time of visit unless your insurance offers direct billing. For procedures, we provide a detailed cost estimate in advance so there are no surprises.",
  },
  {
    id: "f10",
    category: "billing",
    question: "Can I get an itemized receipt for reimbursement?",
    answer:
      "Absolutely. Our front desk can issue an itemized invoice for any consultation, test, or procedure, which you can submit to your insurer or employer for reimbursement.",
  },
  {
    id: "f11",
    category: "clinic",
    question: "Where is the clinic located and what are the hours?",
    answer:
      "The clinic is located at Meridian Heart Institute, Bandra West, Mumbai. We're open Monday through Saturday for both in-person and video consultations. Exact hours are confirmed at the time of booking.",
  },
  {
    id: "f12",
    category: "clinic",
    question: "What safety protocols are in place at the clinic?",
    answer:
      "Our facility follows strict sterilization and infection-control protocols across all consultation and procedure rooms, with equipment maintained to current clinical standards. Staff are trained in emergency response, and all diagnostic equipment is regularly calibrated.",
  },
];

/* ================= HERO ILLUSTRATION ================= */

const FaqHeroIllustration = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    className="relative mx-auto w-full max-w-[420px]"
  >
    <svg
      viewBox="0 0 420 420"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <defs>
        <linearGradient id="faqBlob" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E6F4F3" />
          <stop offset="100%" stopColor="#CFEBE8" />
        </linearGradient>
        <linearGradient id="faqCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F7FBFA" />
        </linearGradient>
        <linearGradient id="faqTeal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#006B63" />
          <stop offset="100%" stopColor="#00857A" />
        </linearGradient>
      </defs>

      {/* backdrop blob */}
      <path
        d="M210 40C280 35 355 75 370 145C385 215 355 285 295 325C235 365 155 375 100 335C45 295 25 220 40 155C55 90 140 45 210 40Z"
        fill="url(#faqBlob)"
      />

      {/* floating dashed ring */}
      <circle
        cx="210"
        cy="200"
        r="150"
        fill="none"
        stroke="#8DE4DC"
        strokeWidth="1.5"
        strokeDasharray="4 8"
        opacity="0.6"
      />

      {/* central card: doctor avatar + heartbeat line */}
      <g>
        <rect x="95" y="120" width="230" height="180" rx="20" fill="url(#faqCard)" stroke="#E3E8EA" />
        {/* avatar circle */}
        <circle cx="150" cy="175" r="30" fill="#E6F4F3" />
        <circle cx="150" cy="165" r="12" fill="#00857A" />
        <path d="M126 200C126 184 137 174 150 174C163 174 174 184 174 200" fill="#00857A" />
        {/* name lines */}
        <rect x="195" y="160" width="95" height="10" rx="5" fill="#D9E4E2" />
        <rect x="195" y="178" width="65" height="8" rx="4" fill="#E6ECEB" />
        {/* heartbeat line */}
        <path
          d="M110 250H145L155 230L170 270L182 245L192 250H310"
          fill="none"
          stroke="#006B63"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* floating chat bubble with question mark - top right */}
      <motion.g
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="270" y="55" width="80" height="60" rx="16" fill="url(#faqTeal)" />
        <path d="M285 115L275 132L300 115Z" fill="#00857A" />
        <text
          x="310"
          y="94"
          textAnchor="middle"
          fontSize="30"
          fontWeight="700"
          fill="#FFFFFF"
          fontFamily="Poppins, sans-serif"
        >
          ?
        </text>
      </motion.g>

      {/* floating small badge - bottom left, calendar check */}
      <motion.g
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <rect x="45" y="255" width="76" height="76" rx="18" fill="#FFFFFF" stroke="#E3E8EA" />
        <rect x="63" y="278" width="40" height="32" rx="5" fill="none" stroke="#006B63" strokeWidth="2.5" />
        <line x1="63" y1="288" x2="103" y2="288" stroke="#006B63" strokeWidth="2.5" />
        <line x1="72" y1="272" x2="72" y2="282" stroke="#006B63" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="94" y1="272" x2="94" y2="282" stroke="#006B63" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M75 298L82 304L94 292" fill="none" stroke="#00857A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>

      {/* small floating dot accents */}
      <circle cx="335" cy="220" r="6" fill="#3B9CFF" opacity="0.7" />
      <circle cx="80" cy="120" r="5" fill="#8DE4DC" opacity="0.8" />
      <circle cx="255" cy="345" r="7" fill="#006B63" opacity="0.35" />
    </svg>
  </motion.div>
);

/* ================= ACCORDION ITEM ================= */

const FaqItem = ({ item, isOpen, onToggle, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.04 }}
      className={`rounded-[16px] border bg-white transition-all duration-300 ${
        isOpen
          ? "border-[#006B63] shadow-[0_10px_30px_rgba(0,107,99,0.10)]"
          : "border-[#E3E8EA] hover:border-[#B8D5D2]"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 sm:px-7 py-5 text-left"
      >
        <span
          className={`text-[15px] sm:text-[16.5px] font-semibold leading-snug transition-colors duration-300 ${
            isOpen ? "text-[#006B63]" : "text-[#16263D]"
          }`}
        >
          {item.question}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? "rotate-45 border-[#006B63] bg-[#006B63] text-white"
              : "border-[#D5DDDF] text-[#006B63]"
          }`}
        >
          <Plus size={16} strokeWidth={2.4} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 sm:px-7 pb-6 text-[14.5px] sm:text-[15.5px] leading-[1.75] text-[#59636A]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ================= PAGE ================= */

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState("f1");

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesQuery =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-[#f3f6ff] font-[Poppins,sans-serif] text-[#16263D] overflow-x-hidden text-[16px]">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative w-full border-t border-blue-100 overflow-hidden bg-gradient-to-br from-[#F7F9FC] via-[#EFF6F5] to-[#E6F1EE]">
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-[360px] w-[360px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #006B63, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-16 h-[300px] w-[300px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #3B9CFF, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-[1180px] mx-auto px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">
            {/* ---- Text column ---- */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B8D5D2] bg-white/70 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[1.5px] text-[#006B63] backdrop-blur-sm"
              >
                <MessageCircleQuestion size={14} strokeWidth={2.4} />
                Frequently Asked Questions
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="text-[32px] sm:text-[42px] lg:text-[46px] font-bold leading-[1.15] text-[#10233d]"
              >
                Answers before you even
                <br className="hidden lg:block" /> have to ask
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.16 }}
                className="mt-4 max-w-[520px] mx-auto lg:mx-0 text-[16px] sm:text-[17px] leading-[1.7] text-gray-700"
              >
                Everything you need to know about visiting Dr. Malhotra — from
                booking your first appointment to what to expect during
                treatment and billing.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.24 }}
                className="mt-8 max-w-[520px] mx-auto lg:mx-0"
              >
                <div className="relative">
                  <Search
                    size={18}
                    className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#8A9AA0]"
                  />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search a question — e.g. insurance, video consult…"
                    className="w-full rounded-full border border-[#D5DDDF] bg-white py-4 pl-12 pr-5 text-[14.5px] text-[#16263D] placeholder:text-[#9AA6AB] shadow-[0_10px_30px_rgba(16,36,61,0.06)] outline-none transition-all duration-300 focus:border-[#006B63] focus:shadow-[0_10px_30px_rgba(0,107,99,0.15)]"
                  />
                </div>
              </motion.div>
            </div>

            {/* ---- Illustration column ---- */}
            <FaqHeroIllustration />
          </div>
        </div>
      </section>

      {/* ================= CATEGORY FILTERS + LIST ================= */}
      <section className="w-full bg-[#F7F9FC] py-16 sm:py-20">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8">
          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 rounded-full border px-4 sm:px-5 py-2.5 text-[13px] sm:text-[14px] font-medium transition-all duration-300 ${
                    active
                      ? "border-[#006B63] bg-[#006B63] text-white shadow-[0_8px_20px_rgba(0,107,99,0.25)]"
                      : "border-[#D5DDDF] bg-white text-[#4B5559] hover:border-[#B8D5D2] hover:text-[#006B63]"
                  }`}
                >
                  <Icon size={15} strokeWidth={2.2} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* FAQ list */}
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {filteredFaqs.length > 0 ? (
                <motion.div
                  key={activeCategory + query}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-4"
                >
                  {filteredFaqs.map((item, i) => (
                    <FaqItem
                      key={item.id}
                      item={item}
                      index={i}
                      isOpen={openId === item.id}
                      onToggle={() => handleToggle(item.id)}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-[16px] border border-dashed border-[#D5DDDF] bg-white px-6 py-14 text-center"
                >
                  <Stethoscope size={28} className="mx-auto mb-3 text-[#B8D5D2]" />
                  <p className="text-[15px] font-medium text-[#16263D]">
                    No matching questions found
                  </p>
                  <p className="mt-1 text-[13.5px] text-[#7A868C]">
                    Try a different search term, or reach out directly using
                    the contact options below.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= STILL HAVE QUESTIONS ================= */}
      <section className="bg-[#F7F9FF] px-6 py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[1000px] rounded-[20px] border border-[#E3E8EA] bg-white px-8 sm:px-10 py-10 sm:py-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-[22px] sm:text-[26px] font-bold text-[#16263D] mb-2">
                Still have a question?
              </h3>
              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#59636A]">
                Our care team is happy to help with anything that isn't
                covered here — from insurance specifics to what a
                consultation will actually involve.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                <a
                  href="tel:+910000000000"
                  className="flex items-center gap-2 text-[14px] font-medium text-[#006B63] hover:text-[#00524a] transition-colors"
                >
                  <Phone size={16} /> +91 00000 00000
                </a>
                <a
                  href="mailto:care@meridianheart.com"
                  className="flex items-center gap-2 text-[14px] font-medium text-[#006B63] hover:text-[#00524a] transition-colors"
                >
                  <Mail size={16} /> care@meridianheart.com
                </a>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden flex w-full items-center justify-center gap-3 rounded-[12px] bg-[#006B63] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_8px_25px_rgba(0,107,99,0.25)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,107,99,0.35)]"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <CalendarDays size={18} strokeWidth={2.2} />
              <span>Book Appointment</span>
              <ArrowRight
                size={18}
                strokeWidth={2.5}
                className="transform transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
