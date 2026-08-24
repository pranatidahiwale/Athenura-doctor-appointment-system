import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  UserCheck,
  CalendarClock,
  CreditCard,
  ShieldAlert,
  Copyright,
  Scale,
  XCircle,
  RefreshCcw,
  Mail,
  Phone,
  ArrowUpRight,
  Plus,
} from "lucide-react";

/* ================= DATA ================= */

const LAST_UPDATED = "August 22, 2026";

const SECTIONS = [
  {
    id: "acceptance-of-terms",
    icon: FileText,
    title: "Acceptance of Terms",
    body: [
      "By accessing or using this website, booking an appointment, or receiving care from Dr. Malhotra's clinic, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website or services.",
      "We may update these terms from time to time, and continued use of the website after changes are posted constitutes acceptance of the revised terms.",
    ],
  },
  {
    id: "use-of-website",
    icon: UserCheck,
    title: "Use of Our Website",
    body: [
      "You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use of, this site by any third party.",
      "You must provide accurate, current, and complete information when creating an account, booking an appointment, or contacting us. You are responsible for maintaining the confidentiality of your account credentials.",
      "We reserve the right to suspend or terminate access for any user who violates these terms or misuses the website.",
    ],
  },
  {
    id: "appointments-scheduling",
    icon: CalendarClock,
    title: "Appointments & Scheduling",
    body: [
      "Booking an appointment through our website or scheduling assistant does not guarantee immediate confirmation; all bookings are subject to availability and final confirmation from our clinic staff.",
      "Please reschedule or cancel appointments at least 24 hours in advance where possible. Repeated no-shows or late cancellations may result in restrictions on future online booking.",
      "In case of a medical emergency, do not rely on our online scheduling system — contact emergency services immediately.",
    ],
  },
  {
    id: "billing-payments",
    icon: CreditCard,
    title: "Billing & Payments",
    body: [
      "Consultation fees, procedure costs, and any applicable charges will be communicated to you prior to your visit or procedure wherever possible.",
      "Payment is due at the time of service unless alternate arrangements have been made with our billing team or your insurance provider offers direct billing.",
      "We are not responsible for delays or denials caused by your insurance provider; verifying your coverage and benefits remains your responsibility.",
    ],
  },
  {
    id: "medical-disclaimer",
    icon: ShieldAlert,
    title: "Medical Disclaimer",
    body: [
      "Content on this website — including articles, FAQs, and general health information — is provided for informational purposes only and does not constitute medical advice. It is not a substitute for professional diagnosis or treatment.",
      "Always seek the advice of Dr. Malhotra or another qualified healthcare provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay seeking it because of something you read on this website.",
      "If you believe you are experiencing a medical emergency, call your local emergency number immediately.",
    ],
  },
  {
    id: "intellectual-property",
    icon: Copyright,
    title: "Intellectual Property",
    body: [
      "All content on this website — including text, graphics, logos, images, and software — is the property of Meridian Heart Institute or its licensors and is protected by applicable copyright and trademark laws.",
      "You may not reproduce, distribute, modify, or create derivative works from any content on this site without our prior written consent.",
    ],
  },
  {
    id: "limitation-of-liability",
    icon: Scale,
    title: "Limitation of Liability",
    body: [
      "To the fullest extent permitted by law, Meridian Heart Institute and its staff shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or our services.",
      "While we strive to keep website information accurate and up to date, we make no warranties about the completeness, reliability, or accuracy of this information.",
    ],
  },
  {
    id: "termination",
    icon: XCircle,
    title: "Termination of Access",
    body: [
      "We reserve the right to restrict, suspend, or terminate your access to our website or online services at our discretion, particularly in cases of misuse, fraudulent activity, or violation of these terms.",
    ],
  },
  {
    id: "changes-to-terms",
    icon: RefreshCcw,
    title: "Changes to These Terms",
    body: [
      "We may revise these Terms of Service from time to time to reflect changes in our practices, services, or legal requirements. The \"last updated\" date at the top of this page will always reflect the most recent revision.",
      "We encourage you to review this page periodically so you are aware of any updates.",
    ],
  },
];

/* ================= HERO ILLUSTRATION ================= */

const TermsHeroIllustration = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.94, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    className="relative mx-auto w-full max-w-[440px]"
  >
    {/* backdrop blob */}
    <div
      className="pointer-events-none absolute -inset-6 rounded-[32px] opacity-70 blur-2xl"
      style={{ background: "linear-gradient(135deg, #CFEBE8, #E6F4F3)" }}
    />

    {/* photo card */}
    <div className="relative rounded-[24px] overflow-hidden border border-white shadow-[0_25px_60px_-20px_rgba(0,107,99,0.35)]">
      <img
        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80"
        alt="Reviewing and signing clinic agreement terms"
        className="w-full h-[420px] object-cover"
      />
      {/* teal wash for brand consistency */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(160deg, rgba(0,107,99,0.28) 0%, rgba(0,107,99,0.05) 45%, rgba(16,35,61,0.25) 100%)" }}
      />
    </div>

    {/* floating badge - top right */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-5 -right-4 sm:-right-8 flex items-center gap-2 rounded-2xl bg-[#006B63] text-white px-4 py-3 shadow-[0_14px_30px_-10px_rgba(0,107,99,0.5)]"
    >
      <FileText size={18} strokeWidth={2.4} />
      <span className="text-[13px] font-semibold">Clear &amp; fair terms</span>
    </motion.div>

    {/* floating badge - bottom left */}
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      className="absolute -bottom-5 -left-4 sm:-left-8 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-[0_14px_30px_-10px_rgba(16,36,61,0.25)] border border-[#E3E8EA]"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6F4F3] text-[#006B63]">
        <Scale size={16} strokeWidth={2.4} />
      </span>
      <div className="leading-tight">
        <p className="text-[12.5px] font-semibold text-[#16263D]">Transparent policies</p>
        <p className="text-[11px] text-[#7A868C]">No hidden conditions</p>
      </div>
    </motion.div>
  </motion.div>
);

/* ================= ACCORDION ITEM ================= */

const TermsAccordionItem = ({ section, isOpen, onToggle, index }) => {
  const Icon = section.icon;

  return (
    <motion.div
      id={section.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.04 }}
      className={`scroll-mt-28 rounded-[16px] border bg-white transition-all duration-300 ${
        isOpen
          ? "border-[#006B63] shadow-[0_14px_34px_rgba(0,107,99,0.10)]"
          : "border-[#E3E8EA] hover:border-[#B8D5D2]"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 sm:px-8 py-5 sm:py-6 text-left"
      >
        <span className="flex items-center gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] transition-colors duration-300 ${
              isOpen ? "bg-[#006B63] text-white" : "bg-[#E6F4F3] text-[#006B63]"
            }`}
          >
            <Icon size={19} strokeWidth={2.2} />
          </span>
          <span
            className={`text-[16px] sm:text-[18px] font-bold transition-colors duration-300 ${
              isOpen ? "text-[#006B63]" : "text-[#16263D]"
            }`}
          >
            {section.title}
          </span>
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
            <div className="flex flex-col gap-3 px-6 sm:px-8 pb-6 sm:pb-8">
              {section.body.map((para, idx) => (
                <p
                  key={idx}
                  className="text-[14.5px] sm:text-[15.5px] leading-[1.75] text-[#59636A]"
                >
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ================= PAGE ================= */

const TermsOfService = () => {
  const topRef = useRef(null);
  const [openId, setOpenId] = useState(SECTIONS[0].id);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-[#f3f6ff] font-[Poppins,sans-serif] text-[#16263D] overflow-x-hidden text-[16px]" ref={topRef}>
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
                <FileText size={14} strokeWidth={2.4} />
                Terms of Service
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="text-[32px] sm:text-[42px] lg:text-[46px] font-bold leading-[1.15] text-[#10233d]"
              >
                The fine print,
                <br className="hidden lg:block" /> made plain
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.16 }}
                className="mt-4 max-w-[520px] mx-auto lg:mx-0 text-[16px] sm:text-[17px] leading-[1.7] text-gray-700"
              >
                These terms outline what to expect when you use our
                website, book an appointment, or receive care at
                Dr. Malhotra's clinic — please read them carefully.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.22 }}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/70 border border-[#D5DDDF] px-4 py-1.5 text-[12.5px] font-medium text-[#59636A] backdrop-blur-sm"
              >
                Last updated: {LAST_UPDATED}
              </motion.p>
            </div>

            {/* ---- Illustration column ---- */}
            <TermsHeroIllustration />
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="w-full bg-[#F7F9FC] py-16 sm:py-20">
        <div className="max-w-[820px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            {/* Intro card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-[16px] border border-[#E3E8EA] bg-white p-6 sm:p-8"
            >
              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.75] text-[#59636A]">
                Welcome to Meridian Heart Institute ("we", "our", or "us").
                These Terms of Service govern your access to and use of
                our website, appointment booking system, and the clinical
                services provided by Dr. Malhotra and our care team. By
                using our website or services, you agree to these terms
                in full.
              </p>
            </motion.div>

            {SECTIONS.map((section, i) => (
              <TermsAccordionItem
                key={section.id}
                section={section}
                index={i}
                isOpen={openId === section.id}
                onToggle={() => handleToggle(section.id)}
              />
            ))}

            {/* Contact card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="rounded-[16px] bg-[#0E2A3F] p-7 sm:p-9 text-white"
            >
              <h2 className="text-[19px] sm:text-[21px] font-bold mb-2">
                Questions about these terms?
              </h2>
              <p className="max-w-[560px] text-[14px] sm:text-[14.5px] leading-[1.7] text-[#C4D1D6] mb-6">
                If anything here is unclear, or you'd like to understand
                how these terms apply to your situation, reach out to
                our team directly.
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                <a
                  href="mailto:legal@meridianheart.com"
                  className="flex items-center gap-2 text-[14px] font-medium text-[#8DE4DC] hover:text-white transition-colors"
                >
                  <Mail size={16} /> legal@meridianheart.com
                </a>
                <a
                  href="tel:+910000000000"
                  className="flex items-center gap-2 text-[14px] font-medium text-[#8DE4DC] hover:text-white transition-colors"
                >
                  <Phone size={16} /> +91 00000 00000
                </a>
                <a
                  href="/contact"
                  className="flex items-center gap-2 text-[14px] font-medium text-[#8DE4DC] hover:text-white transition-colors"
                >
                  Contact page <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
