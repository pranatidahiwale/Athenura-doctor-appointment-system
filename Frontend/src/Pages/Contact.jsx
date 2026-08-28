 import React, { useState } from "react";
import axios from "axios";
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

/* ================= HERO BACKGROUND ================= */

const ContactHeroBackground = () => (
  <div className="pointer-events-none absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1758691462848-31a39258dbd8?auto=format&fit=crop&w=1600&q=80"
      alt="Our care team is a phone call away"
      className="h-full w-full object-cover"
    />
    {/* teal-to-dark wash for text legibility + brand consistency */}
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(100deg, rgba(9,32,45,0.92) 0%, rgba(0,60,55,0.82) 38%, rgba(0,71,66,0.55) 65%, rgba(0,71,66,0.30) 100%)" }}
    />
  </div>
);

/* ================= PAGE ================= */

const Contact = () => {
  // Mapping state keys to match backend schema properties: fullName, phoneNumber, emailAddress, subject, message
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    subject: SUBJECTS[0],
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [errors, setErrors] = useState({});

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Please enter your name";
    if (!form.emailAddress.trim()) next.emailAddress = "Please enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(form.emailAddress))
      next.emailAddress = "Enter a valid email address";
    if (!form.message.trim()) next.message = "Please add a short message";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      // POST request to backend API endpoint
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, form);
      setStatus("success");
      setForm({ fullName: "", phoneNumber: "", emailAddress: "", subject: SUBJECTS[0], message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus("idle");
      alert("Failed to send message. Please make sure the backend server is running.");
    }
  };

  return (
    <div className="w-full bg-[#f3f6ff] font-[Poppins,sans-serif] text-[#16263D] overflow-x-hidden text-[16px]">
     

      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden">
        <ContactHeroBackground />

        <div className="relative z-10 max-w-[1180px] mx-auto px-6 lg:px-8 py-24 sm:py-28 lg:py-36">
          <div className="max-w-[640px] text-center mx-auto lg:mx-0 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[1.5px] text-white backdrop-blur-sm"
            >
              <MessageSquare size={14} strokeWidth={2.4} />
              Get In Touch
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="text-[32px] sm:text-[42px] lg:text-[46px] font-bold leading-[1.15] text-white"
            >
              We'd love to hear
              <br className="hidden lg:block" /> from you
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
              className="mt-4 max-w-[520px] mx-auto lg:mx-0 text-[16px] sm:text-[17px] leading-[1.7] text-[#DCE9E7]"
            >
              Questions about a visit, your treatment plan, or billing?
              Send us a message and our care team will get back to you
              within one business day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <a
                href="tel:+910000000000"
                className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-[#006B63] shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Phone size={16} strokeWidth={2.4} />
                +91 00000 00000
              </a>
              <a
                href="mailto:care@meridianheart.com"
                className="flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-[14px] font-semibold text-white backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Mail size={16} strokeWidth={2.4} />
                care@meridianheart.com
              </a>
            </motion.div>
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
                            value={form.fullName}
                            onChange={update("fullName")}
                            placeholder="Jane Doe"
                            className={`${inputClasses} pl-10`}
                          />
                        </div>
                        {errors.fullName && (
                          <span className="text-[12px] text-[#D9534F]">{errors.fullName}</span>
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
                            value={form.phoneNumber}
                            onChange={update("phoneNumber")}
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
                          value={form.emailAddress}
                          onChange={update("emailAddress")}
                          placeholder="jane@example.com"
                          className={`${inputClasses} pl-10`}
                        />
                      </div>
                      {errors.emailAddress && (
                        <span className="text-[12px] text-[#D9534F]">{errors.emailAddress}</span>
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
                  className="transforsm transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      
    </div>
  );
};

export default Contact;