import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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



/* ================= DATA ================= */

const CATEGORIES = [
  { id: "all", label: "All Questions", icon: MessageCircleQuestion, text: "#16263D", bg: "#EEF1F4", border: "#D8DEE3" },
  { id: "appointments", label: "Appointments", icon: CalendarDays, text: "#2952CC", bg: "#EAF1FE", border: "#BFD3FB" },
  { id: "treatments", label: "Treatments & Care", icon: HeartPulse, text: "#B3195A", bg: "#FDEDF4", border: "#F6C2DB" },
  { id: "billing", label: "Billing & Insurance", icon: CreditCard, text: "#9A6B00", bg: "#FFF4DC", border: "#F3DA95" },
  { id: "clinic", label: "Clinic & Safety", icon: ShieldCheck, text: "#006B63", bg: "#E6F4F3", border: "#BEDDDA" },
];

const getCategoryMeta = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];

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

/* ================= HERO BACKGROUND ================= */

const FaqHeroBackground = () => (
  <div className="pointer-events-none absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1689848693914-7ba25d9f3334?auto=format&fit=crop&w=1600&q=80"
      alt="Support desk ready to answer patient questions"
      className="h-full w-full object-cover object-[72%_32%]"
    />
    {/* teal-to-dark wash for text legibility + brand consistency */}
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(100deg, rgba(9,32,45,0.92) 0%, rgba(0,60,55,0.84) 40%, rgba(0,71,66,0.58) 68%, rgba(0,71,66,0.32) 100%)" }}
    />
  </div>
);

/* ================= ACCORDION ITEM ================= */

const FaqItem = ({ item, isOpen, onToggle, index, meta }) => {
  const Icon = meta.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.04 }}
      className={`rounded-[16px] border-y border-r bg-white transition-all duration-300 ${
        isOpen ? "shadow-[0_10px_30px_rgba(16,36,61,0.08)]" : "hover:border-[#B8D5D2]"
      }`}
      style={{
        borderColor: isOpen ? meta.text : "#E3E8EA",
        borderLeftWidth: 4,
        borderLeftColor: meta.text,
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 px-5 sm:px-7 py-5 text-left"
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]"
          style={{ background: meta.bg, color: meta.text }}
        >
          <Icon size={16} strokeWidth={2.3} />
        </span>

        <span
          className="flex-1 text-[15px] sm:text-[16.5px] font-semibold leading-snug transition-colors duration-300"
          style={{ color: isOpen ? meta.text : "#16263D" }}
        >
          {item.question}
        </span>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen ? "rotate-45 text-white" : ""
          }`}
          style={{
            background: isOpen ? meta.text : "transparent",
            borderColor: isOpen ? meta.text : "#D5DDDF",
            color: isOpen ? "#fff" : meta.text,
          }}
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
            <p className="pl-[68px] pr-5 sm:pr-7 pb-6 text-[14.5px] sm:text-[15.5px] leading-[1.75] text-[#59636A]">
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
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("appointments");
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
     

      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] flex items-center">
        <FaqHeroBackground />

        <div className="relative z-10 max-w-[1180px] mx-auto px-6 lg:px-8 py-14 sm:py-16 lg:py-20 w-full">
          <div className="max-w-[640px] text-center mx-auto lg:mx-0 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[1.5px] text-white backdrop-blur-sm"
            >
              <MessageCircleQuestion size={14} strokeWidth={2.4} />
              Frequently Asked Questions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="text-[32px] sm:text-[42px] lg:text-[46px] font-bold leading-[1.15] text-white"
            >
              Answers before you even
              <br className="hidden lg:block" /> have to ask
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
              className="mt-4 max-w-[520px] mx-auto lg:mx-0 text-[16px] sm:text-[17px] leading-[1.7] text-[#DCE9E7]"
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
        </div>
      </section>

      {/* ================= CATEGORY SIDEBAR + LIST ================= */}
      <section className="w-full bg-[#F7F9FC] py-16 sm:py-20">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 items-start">
            {/* ---- Category sidebar ---- */}
            <aside className="lg:sticky lg:top-28">
              <p className="mb-3 hidden text-[12px] font-semibold uppercase tracking-[1.5px] text-[#8A9AA0] lg:block">
                Categories
              </p>
              <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                {CATEGORIES.filter((cat) => cat.id !== "all").map((cat) => {
                  const Icon = cat.icon;
                  const active = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex shrink-0 items-center gap-3 rounded-[14px] border px-4 py-3.5 text-[13.5px] sm:text-[14px] font-semibold transition-all duration-300 lg:w-full ${
                        active
                          ? "shadow-[0_10px_24px_rgba(16,36,61,0.08)]"
                          : "bg-white hover:border-[#B8D5D2]"
                      }`}
                      style={{
                        borderColor: active ? cat.text : "#E3E8EA",
                        background: active ? cat.bg : "#fff",
                        color: active ? cat.text : "#4B5559",
                      }}
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px]"
                        style={{ background: active ? "#fff" : cat.bg, color: cat.text }}
                      >
                        <Icon size={15} strokeWidth={2.2} />
                      </span>
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* ---- FAQ list ---- */}
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
                        meta={getCategoryMeta(item.category)}
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
            type="button"
            onClick={() => navigate("/appointment")}
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

      
    </div>
  );
};

export default FAQ;
