import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Database,
  Share2,
  Cookie,
  UserCheck,
  Link2,
  Baby,
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
    id: "information-we-collect",
    icon: Database,
    title: "Information We Collect",
    body: [
      "When you book an appointment, create an account, or contact us, we may collect personal details such as your name, email address, phone number, date of birth, and address.",
      "For clinical purposes, we may also collect health-related information you choose to share — such as symptoms, medical history, current medications, and insurance details — solely to provide appropriate care and process your visit.",
      "We automatically collect limited technical information (device type, browser, IP address, and pages visited) to keep the website secure and improve how it performs.",
    ],
  },
  {
    id: "how-we-use-information",
    icon: UserCheck,
    title: "How We Use Your Information",
    body: [
      "Your information is used to schedule and manage appointments, deliver medical care, communicate with you about your visits, and process billing or insurance claims.",
      "We may also use non-identifying, aggregated data to understand how the website is used and to improve our services, content, and user experience.",
      "We do not use your health information for marketing purposes without your explicit consent.",
    ],
  },
  {
    id: "data-sharing",
    icon: Share2,
    title: "How We Share Information",
    body: [
      "We do not sell your personal or health information to third parties.",
      "Information may be shared with insurance providers, diagnostic labs, or specialists strictly for the purpose of coordinating your care, and only to the extent necessary.",
      "We may disclose information when required by law, to comply with a legal process, or to protect the rights, safety, or property of our patients and staff.",
    ],
  },
  {
    id: "data-security",
    icon: Lock,
    title: "Data Security",
    body: [
      "We use industry-standard safeguards — including encrypted connections, access controls, and secure servers — to protect your personal and medical information from unauthorized access, alteration, or disclosure.",
      "While we take reasonable steps to secure your data, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookies & Tracking",
    body: [
      "Our website uses cookies and similar technologies to remember your preferences, keep you signed in, and understand how visitors use our site.",
      "You can control or disable cookies through your browser settings. Disabling cookies may affect certain features, such as staying logged in or saved appointment preferences.",
    ],
  },
  {
    id: "your-rights",
    icon: ShieldCheck,
    title: "Your Rights & Choices",
    body: [
      "You have the right to access, correct, or request deletion of your personal information, subject to any legal or clinical record-keeping requirements.",
      "You may opt out of non-essential communications, such as newsletters or promotional messages, at any time using the unsubscribe link or by contacting us directly.",
      "To exercise any of these rights, reach out to us using the contact details at the end of this page.",
    ],
  },
  {
    id: "third-party-links",
    icon: Link2,
    title: "Third-Party Links",
    body: [
      "Our website may contain links to third-party sites, such as insurance portals or payment gateways. We are not responsible for the privacy practices or content of those external sites, and we encourage you to review their policies separately.",
    ],
  },
  {
    id: "childrens-privacy",
    icon: Baby,
    title: "Children's Privacy",
    body: [
      "Our services may be used to book appointments on behalf of minors by a parent or legal guardian. We do not knowingly collect personal information directly from children without appropriate parental or guardian consent.",
    ],
  },
  {
    id: "policy-changes",
    icon: RefreshCcw,
    title: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. The \"last updated\" date at the top of this page will always reflect the most recent revision.",
      "We encourage you to review this page periodically to stay informed about how we protect your information.",
    ],
  },
];

/* ================= HERO ILLUSTRATION ================= */

const PrivacyHeroIllustration = () => (
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
        src="https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=900&q=80"
        alt="Your data is kept locked down and secure"
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
      <Lock size={18} strokeWidth={2.4} />
      <span className="text-[13px] font-semibold">Encrypted &amp; secure</span>
    </motion.div>

    {/* floating badge - bottom left */}
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      className="absolute -bottom-5 -left-4 sm:-left-8 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-[0_14px_30px_-10px_rgba(16,36,61,0.25)] border border-[#E3E8EA]"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6F4F3] text-[#006B63]">
        <ShieldCheck size={16} strokeWidth={2.4} />
      </span>
      <div className="leading-tight">
        <p className="text-[12.5px] font-semibold text-[#16263D]">Your data stays private</p>
        <p className="text-[11px] text-[#7A868C]">We never sell your information</p>
      </div>
    </motion.div>
  </motion.div>
);

/* ================= ACCORDION ITEM ================= */

const PolicyAccordionItem = ({ section, isOpen, onToggle, index }) => {
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

const PrivacyPolicy = () => {
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
                <ShieldCheck size={14} strokeWidth={2.4} />
                Privacy Policy
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="text-[32px] sm:text-[42px] lg:text-[46px] font-bold leading-[1.15] text-[#10233d]"
              >
                Your privacy, protected
                <br className="hidden lg:block" /> at every step
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.16 }}
                className="mt-4 max-w-[520px] mx-auto lg:mx-0 text-[16px] sm:text-[17px] leading-[1.7] text-gray-700"
              >
                This page explains what information we collect, how we use it,
                and the choices you have when you visit Dr. Malhotra's clinic
                or use our website.
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
            <PrivacyHeroIllustration />
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
                  Meridian Heart Institute ("we", "our", or "us") is
                  committed to protecting the privacy of every patient and
                  visitor. This Privacy Policy describes how we collect,
                  use, and safeguard your information when you interact
                  with our website, book an appointment, or visit the
                  clinic in person. By using our services, you agree to
                  the practices described below.
                </p>
              </motion.div>

              {SECTIONS.map((section, i) => (
                <PolicyAccordionItem
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
                  Questions about this policy?
                </h2>
                <p className="max-w-[560px] text-[14px] sm:text-[14.5px] leading-[1.7] text-[#C4D1D6] mb-6">
                  If you have any questions about how we handle your
                  information, or would like to exercise your privacy
                  rights, reach out to our team directly.
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  <a
                    href="mailto:privacy@meridianheart.com"
                    className="flex items-center gap-2 text-[14px] font-medium text-[#8DE4DC] hover:text-white transition-colors"
                  >
                    <Mail size={16} /> privacy@meridianheart.com
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

export default PrivacyPolicy;
