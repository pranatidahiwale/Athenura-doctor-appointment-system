import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  User,
  MessageSquare,
  CalendarDays,
  ArrowRight,
  Stethoscope,
  Loader2,
} from "lucide-react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

/* ================= DATA ================= */

const CONTACT_CARDS = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 00000 00000",
    sub: "Mon–Sat, 9:00 AM – 7:00 PM",
    href: "tel:+910000000000",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "care@meridianheart.com",
    sub: "We reply within 24 hours",
    href: "mailto:care@meridianheart.com",
  },
  {
    icon: MapPin,
    label: "Visit the Clinic",
    value: "Meridian Heart Institute",
    sub: "Bandra West, Mumbai",
    href: "https://maps.google.com",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat",
    sub: "In-person & Video Consults",
    href: null,
  },
];

const SUBJECTS = [
  "General Inquiry",
  "Book an Appointment",
  "Billing & Insurance",
  "Medical Records Request",
  "Feedback",
];

/* ================= FORM FIELD ================= */

const Field = ({ label, children }) => (
  <label className="flex flex-col gap-2">
    <span className="text-[13px] font-semibold text-[#16263D]">{label}</span>
    {children}
  </label>
);

const inputClasses =
  "w-full rounded-[10px] border border-[#D5DDDF] bg-[#FBFCFD] px-4 py-3 text-[14.5px] text-[#16263D] placeholder:text-[#9AA6AB] outline-none transition-all duration-300 focus:border-[#006B63] focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,107,99,0.10)]";

/* ================= HERO ILLUSTRATION ================= */

const ContactHeroIllustration = () => (
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
        <linearGradient id="cHeroBlob" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E6F4F3" />
          <stop offset="100%" stopColor="#CFEBE8" />
        </linearGradient>
        <linearGradient id="cHeroCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F7FBFA" />
        </linearGradient>
        <linearGradient id="cHeroTeal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#006B63" />
          <stop offset="100%" stopColor="#00857A" />
        </linearGradient>
      </defs>

      {/* backdrop blob */}
      <path
        d="M210 40C280 35 355 75 370 145C385 215 355 285 295 325C235 365 155 375 100 335C45 295 25 220 40 155C55 90 140 45 210 40Z"
        fill="url(#cHeroBlob)"
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

      {/* central card: envelope / message */}
      <g>
        <rect x="90" y="130" width="240" height="160" rx="20" fill="url(#cHeroCard)" stroke="#E3E8EA" />
        {/* envelope shape */}
        <rect x="115" y="160" width="190" height="120" rx="12" fill="#E6F4F3" stroke="#8DE4DC" />
        <path
          d="M115 168L210 235L305 168"
          fill="none"
          stroke="#006B63"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* small unread dot */}
        <circle cx="292" cy="172" r="9" fill="#3B9CFF" />
      </g>

      {/* floating phone badge - top right */}
      <motion.g
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="272" y="50" width="72" height="72" rx="18" fill="url(#cHeroTeal)" />
        <path
          d="M292 74C292 71 294 69 297 69H303C305 69 307 70 308 72L311 79C312 81 311 83 310 84L306 87C308 93 313 98 319 100L322 96C323 95 325 94 327 95L334 98C336 99 337 101 337 103V109C337 112 335 114 332 114C317 114 292 89 292 74Z"
          fill="#FFFFFF"
        />
      </motion.g>

      {/* floating pin badge - bottom left */}
      <motion.g
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <rect x="45" y="255" width="76" height="76" rx="18" fill="#FFFFFF" stroke="#E3E8EA" />
        <path
          d="M83 273C72 273 64 281 64 292C64 306 83 322 83 322C83 322 102 306 102 292C102 281 94 273 83 273Z"
          fill="none"
          stroke="#006B63"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="83" cy="292" r="7" fill="#00857A" />
      </motion.g>

      {/* small floating dot accents */}
      <circle cx="335" cy="220" r="6" fill="#3B9CFF" opacity="0.7" />
      <circle cx="80" cy="120" r="5" fill="#8DE4DC" opacity="0.8" />
      <circle cx="255" cy="345" r="7" fill="#006B63" opacity="0.35" />
    </svg>
  </motion.div>
);

/* ================= PAGE ================= */

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: SUBJECTS[0],
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [errors, setErrors] = useState({});

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!form.email.trim()) next.email = "Please enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid email address";
    if (!form.message.trim()) next.message = "Please add a short message";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    // Simulated submission — wire this up to your backend / email service.
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: SUBJECTS[0], message: "" });
    }, 1100);
  };

  return (
    <div className="w-full bg-[#f3f6ff] font-[Poppins,sans-serif] text-[#16263D] overflow-x-hidden text-[16px]">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative w-full border-t border-blue-100 overflow-hidden bg-gradient-to-br from-[#F7F9FC] via-[#EFF6F5] to-[#E6F1EE]">
        <div
          className="pointer-events-none absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #006B63, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-16 h-[300px] w-[300px] rounded-full opacity-20 blur-3xl"
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
                <MessageSquare size={14} strokeWidth={2.4} />
                Get In Touch
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="text-[32px] sm:text-[42px] lg:text-[46px] font-bold leading-[1.15] text-[#10233d]"
              >
                We'd love to hear
                <br className="hidden lg:block" /> from you
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.16 }}
                className="mt-4 max-w-[520px] mx-auto lg:mx-0 text-[16px] sm:text-[17px] leading-[1.7] text-gray-700"
              >
                Questions about a visit, your treatment plan, or billing?
                Send us a message and our care team will get back to you
                within one business day.
              </motion.p>
            </div>

            {/* ---- Illustration column ---- */}
            <ContactHeroIllustration />
          </div>
        </div>
      </section>

      {/* ================= CONTACT CARDS ================= */}
      <section className="relative z-10 -mt-10 sm:-mt-12 px-6">
        <div className="max-w-[1120px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONTACT_CARDS.map((card, i) => {
            const Icon = card.icon;
            const Wrapper = card.href ? motion.a : motion.div;
            return (
              <Wrapper
                key={card.label}
                {...(card.href
                  ? { href: card.href, target: card.href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer" }
                  : {})}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="flex flex-col gap-3 rounded-[16px] border border-[#E3E8EA] bg-white p-6 shadow-[0_10px_30px_rgba(16,36,61,0.06)] transition-all duration-300 hover:border-[#B8D5D2] hover:shadow-[0_18px_36px_rgba(16,36,61,0.10)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#E6F4F3] text-[#006B63]">
                  <Icon size={20} strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[1px] text-[#8A9AA0]">
                    {card.label}
                  </p>
                  <p className="mt-1 text-[15px] font-semibold text-[#16263D]">
                    {card.value}
                  </p>
                  <p className="mt-0.5 text-[13px] text-[#7A868C]">{card.sub}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* ================= FORM + MAP ================= */}
      <section className="w-full bg-[#F7F9FC] py-16 sm:py-24">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">
            {/* ---- Form ---- */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 rounded-[20px] border border-[#E3E8EA] bg-white p-7 sm:p-9 shadow-[0_10px_30px_rgba(16,36,61,0.06)]"
            >
              <h2 className="text-[24px] sm:text-[28px] font-bold text-[#16263D] mb-1.5">
                Send us a message
              </h2>
              <p className="text-[14px] text-[#59636A] mb-7">
                Fill out the form below and our team will respond shortly.
              </p>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center py-14 gap-3"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E6F4F3] text-[#006B63]">
                      <CheckCircle2 size={30} strokeWidth={2} />
                    </div>
                    <h3 className="text-[19px] font-semibold text-[#16263D]">
                      Message sent successfully
                    </h3>
                    <p className="max-w-[340px] text-[14px] leading-[1.6] text-[#59636A]">
                      Thank you for reaching out. Our care team will get back
                      to you within one business day.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-2 text-[14px] font-semibold text-[#006B63] hover:text-[#00524a] transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Full Name">
                        <div className="relative">
                          <User
                            size={16}
                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA6AB]"
                          />
                          <input
                            type="text"
                            value={form.name}
                            onChange={update("name")}
                            placeholder="Jane Doe"
                            className={`${inputClasses} pl-10`}
                          />
                        </div>
                        {errors.name && (
                          <span className="text-[12px] text-[#D9534F]">{errors.name}</span>
                        )}
                      </Field>

                      <Field label="Phone Number">
                        <div className="relative">
                          <Phone
                            size={16}
                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA6AB]"
                          />
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={update("phone")}
                            placeholder="+91 98765 43210"
                            className={`${inputClasses} pl-10`}
                          />
                        </div>
                      </Field>
                    </div>

                    <Field label="Email Address">
                      <div className="relative">
                        <Mail
                          size={16}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA6AB]"
                        />
                        <input
                          type="email"
                          value={form.email}
                          onChange={update("email")}
                          placeholder="jane@example.com"
                          className={`${inputClasses} pl-10`}
                        />
                      </div>
                      {errors.email && (
                        <span className="text-[12px] text-[#D9534F]">{errors.email}</span>
                      )}
                    </Field>

                    <Field label="Subject">
                      <select
                        value={form.subject}
                        onChange={update("subject")}
                        className={inputClasses}
                      >
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Message">
                      <textarea
                        value={form.message}
                        onChange={update("message")}
                        placeholder="Tell us a bit about what you need..."
                        rows={5}
                        className={`${inputClasses} resize-none`}
                      />
                      {errors.message && (
                        <span className="text-[12px] text-[#D9534F]">{errors.message}</span>
                      )}
                    </Field>

                    <motion.button
                      type="submit"
                      disabled={status === "submitting"}
                      whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
                      whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                      className="group relative mt-1 flex items-center justify-center gap-2.5 overflow-hidden rounded-[10px] bg-[#006B63] px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_8px_20px_rgba(0,107,99,0.25)] transition-all duration-300 hover:shadow-[0_12px_28px_rgba(0,107,99,0.35)] disabled:opacity-70"
                    >
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      {status === "submitting" ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} strokeWidth={2.3} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ---- Map / Side info ---- */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              <div className="relative flex-1 min-h-[220px] overflow-hidden rounded-[20px] border border-[#E3E8EA] shadow-[0_10px_30px_rgba(16,36,61,0.06)]">
                <iframe
                  title="Clinic location map"
                  src="https://maps.google.com/maps?q=Bandra%20West%2C%20Mumbai&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="h-full w-full min-h-[220px] grayscale-[15%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="rounded-[20px] border border-[#E3E8EA] bg-white p-7">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={17} className="text-[#006B63]" />
                  <h3 className="text-[16px] font-semibold text-[#16263D]">
                    Clinic Hours
                  </h3>
                </div>
                <ul className="flex flex-col gap-2.5 text-[14px]">
                  {[
                    ["Monday – Friday", "9:00 AM – 7:00 PM"],
                    ["Saturday", "9:00 AM – 2:00 PM"],
                    ["Sunday", "Closed"],
                  ].map(([day, hours]) => (
                    <li
                      key={day}
                      className="flex items-center justify-between border-b border-dashed border-[#E3E8EA] pb-2.5 last:border-0 last:pb-0"
                    >
                      <span className="text-[#59636A]">{day}</span>
                      <span className="font-medium text-[#16263D]">{hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[20px] bg-[#0E2A3F] p-7 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Stethoscope size={17} className="text-[#8DE4DC]" />
                  <h3 className="text-[16px] font-semibold">Urgent concern?</h3>
                </div>
                <p className="text-[13.5px] leading-[1.65] text-[#C4D1D6]">
                  If you're experiencing chest pain, shortness of breath, or
                  any cardiac emergency, please call emergency services
                  immediately rather than waiting for a reply here.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#F7F9FF] px-6 py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto max-w-[1120px] overflow-hidden rounded-[22px] bg-gradient-to-br from-[#006B63] via-[#006B63] to-[#00524a] px-8 sm:px-12 lg:px-16 py-12 lg:py-16 shadow-[0_18px_40px_rgba(0,107,99,0.2)] border border-white/10"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col max-w-[620px]"
            >
              <div className="mb-3 inline-flex self-start rounded-full bg-white/10 px-3.5 py-1 text-[12px] font-medium tracking-[1.5px] text-[#8DE4DC] backdrop-blur-sm border border-white/5">
                YOUR HEALTH MATTERS
              </div>
              <h2 className="mb-3 text-[34px] sm:text-[40px] lg:text-[46px] font-bold leading-[1.12] tracking-[-1px] text-white">
                Prefer to book directly?
              </h2>
              <p className="text-[15px] sm:text-[17px] leading-[1.7] text-[#B4DFDC]">
                Skip the form and schedule your visit right now. Our
                scheduling assistant is available 24/7 to help you find a
                slot that works.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full lg:w-auto flex justify-start lg:justify-end"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden flex w-full lg:w-auto min-w-[280px] items-center justify-center gap-3 rounded-[12px] bg-white px-8 py-4 text-[16px] font-semibold text-[#006B63] shadow-[0_8px_25px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6F4F3] text-[#006B63] transition-colors duration-300 group-hover:bg-[#006B63] group-hover:text-white">
                  <CalendarDays size={18} strokeWidth={2.2} />
                </div>
                <span>Book Appointment</span>
                <ArrowRight
                  size={18}
                  strokeWidth={2.5}
                  className="transform transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
