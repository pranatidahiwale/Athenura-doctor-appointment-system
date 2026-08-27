import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ctaImg from "../assets/services/cta.png";
import servicesData from "../Data/servicesData";
import card1Video from "../assets/services/card1.mp4";
import card2Video from "../assets/services/card2.mp4";
import card3Video from "../assets/services/card3.mp4";
import {
  Heart,
  Expand,
  ScanLine,
  ShieldCheck,
  Baby,
  Dumbbell,
  Users,
  Building2,
  HandHeart,
  Zap,
  ArrowRight,
  Brain,
  Bone,
  Eye,
  Smile,
  Pill,
  Syringe,
  Microscope,
  Ear,
  Calendar,
  PlayCircle,
  Cross,
  Clock,
} from "lucide-react";

const colors = {
  ink: "#0B2A24",
  deep: "#0E4B3F",
  mid: "#167A67",
  bright: "#2FBF9F",
  gold: "#C99A3A",
  paper: "#F6FAF8",
  line: "#E1EAE6",
};

const neoShadow = {
  rest: "8px 8px 20px rgba(163,177,171,0.45), -8px -8px 20px rgba(255,255,255,0.9), inset 0 0 0 rgba(0,0,0,0)",
  hover: "14px 14px 32px rgba(163,177,171,0.55), -10px -10px 28px rgba(255,255,255,0.95), inset 0 0 0 rgba(0,0,0,0)",
  inset: "inset 6px 6px 14px rgba(11,42,36,0.18), inset -6px -6px 14px rgba(255,255,255,0.06)",
  iconRest: "6px 6px 14px rgba(9,32,27,0.35), -3px -3px 10px rgba(60,140,120,0.35)",
  iconHover: "8px 8px 18px rgba(9,32,27,0.45), -4px -4px 12px rgba(60,140,120,0.45)",
};

function useGoogleFonts() {
  useEffect(() => {
    const id = "meridian-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

const fontDisplay = { fontFamily: "'Fraunces', serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.96, transition: { duration: 0.25, ease: "easeInOut" } },
};

const whyCardVariant = (idx) => ({
  hidden: {
    opacity: 0,
    y: 30,
    rotate: idx % 2 === 0 ? -8 : 8,
    scale: 0.8,
  },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 13, delay: idx * 0.12 },
  },
});

const whyIconVariant = (idx) => ({
  hidden: { opacity: 0, rotate: -180, scale: 0 },
  show: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 12, delay: idx * 0.12 + 0.15 },
  },
});

const specializations = [
  {
    icon: Users,
    title: "General Consultation",
    desc: "Comprehensive check-ups and everyday health guidance from our primary care physicians.",
  },
  {
    icon: Heart,
    title: "Cardiology",
    desc: "Heart health screening, ECGs, and long-term cardiac care from experienced specialists.",
  },
  {
    icon: ScanLine,
    title: "Diagnostic Imaging",
    desc: "MRI, CT, and ultrasound imaging with fast, accurate reporting for confident diagnoses.",
  },
  {
    icon: ShieldCheck,
    title: "Preventive Care",
    desc: "Screenings and vaccination programs designed to catch concerns before they grow.",
  },
  {
    icon: Baby,
    title: "Pediatrics",
    desc: "Gentle, attentive care for infants through teens, from checkups to growth tracking.",
  },
  {
    icon: Dumbbell,
    title: "Sports Medicine",
    desc: "Injury recovery and performance care for athletes at every level of activity.",
  },
  {
    icon: Brain,
    title: "Neurology",
    desc: "Diagnosis and treatment for conditions affecting the brain, spine, and nervous system.",
  },
  {
    icon: Bone,
    title: "Orthopedics",
    desc: "Care for bones, joints, and muscles, from fractures to long-term mobility issues.",
  },
  {
    icon: Eye,
    title: "Ophthalmology",
    desc: "Complete eye care, vision testing, and treatment for common and complex eye conditions.",
  },
  {
    icon: Smile,
    title: "Dental Care",
    desc: "Routine cleanings, fillings, and oral health checkups for the whole family.",
  },
  {
    icon: Pill,
    title: "Pharmacy",
    desc: "On-site prescription fulfillment and medication guidance from licensed pharmacists.",
  },
  {
    icon: Syringe,
    title: "Vaccination",
    desc: "Routine immunizations and travel vaccines for children and adults alike.",
  },
  {
    icon: Microscope,
    title: "Pathology & Lab Tests",
    desc: "Accurate lab diagnostics and blood work with quick turnaround on results.",
  },
  {
    icon: Ear,
    title: "ENT Care",
    desc: "Treatment for ear, nose, and throat conditions from allergies to hearing concerns.",
  },
];

const heroFeatures = [
  { icon: Users, title: "Expert Doctors", desc: "Experienced & trusted professionals" },
  { icon: ShieldCheck, title: "Safe & Secure", desc: "Your data is always protected" },
  { icon: Clock, title: "Quick Access", desc: "Easy scheduling & minimal wait time" },
  { icon: HandHeart, title: "Personalized Care", desc: "Treatment tailored to your needs" },
];

const whyChoose = [
  { icon: Users, title: "Expert Medical Team", desc: "Board-certified physicians across every core specialty." },
  { icon: Building2, title: "Modern Facilities", desc: "Equipped with the latest diagnostic and treatment technology." },
  { icon: HandHeart, title: "Personalized Care", desc: "Treatment plans built around your history, not a checklist." },
  { icon: Zap, title: "Quick Results", desc: "Lab and imaging results turned around fast, with clear next steps." },
];

export default function HealthcarePage() {
  useGoogleFonts();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllSpecializations, setShowAllSpecializations] = useState(false);
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [showFullImage, setShowFullImage] = useState(false);

  useEffect(() => {
    if (selectedSpec !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedSpec]);

  return (
    <div style={{ ...fontBody, backgroundColor: colors.paper, color: colors.ink }} className="min-h-screen w-full">
      <style>{`
        html, body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <section
        className="relative overflow-hidden -mt-[80px] pt-[80px] font-['Poppins',sans-serif]"
        style={{
          background: `linear-gradient(160deg, ${colors.paper} 0%, #E4F3EE 45%, #D9EFE7 100%)`,
        }}
      >
        <div
          className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: colors.bright }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: colors.gold }}
        />

        <div className="relative max-w-[110rem] mx-auto px-5 sm:px-8 md:px-8 pt-6 md:pt-10 pb-16 md:pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.08 }}
              className="text-5xl md:text-6xl font-bold leading-[1.05] mb-6 font-['Poppins',sans-serif]"
            >
              Healthcare
              <br />
              Built Around
              <br />
              <span className="relative inline-block" style={{ color: colors.mid }}>
                You
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="10"
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 C 60 2, 140 2, 198 8"
                    stroke={colors.mid}
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.16 }}
              className="text-[17px] leading-relaxed max-w-md mb-8"
              style={{ color: "#5B6B65" }}
            >
              A full spectrum of medical services with personalized attention and advanced
              care — because your health deserves the best.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.24 }}
              className="flex flex-wrap items-center gap-4 sm:gap-8 mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Link
                  to="/appointment"
                  className="group flex items-center gap-2 text-white font-semibold px-6 py-3.5 rounded-full"
                  style={{ background: `linear-gradient(145deg, ${colors.mid}, ${colors.deep})` }}
                >
                  Book Appointment
                  <span className="grid place-items-center w-6 h-6 rounded-full bg-white/20 group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight size={13} />
                  </span>
                </Link>
              </motion.div>

              <a href="#services" className="flex items-center gap-3 font-semibold" style={{ color: colors.deep }}>
                <span
                  className="grid place-items-center w-11 h-11 rounded-full bg-white"
                  style={{ boxShadow: neoShadow.rest, color: colors.mid }}
                >
                  <PlayCircle size={20} />
                </span>
                Explore Services
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.32 }}
              className="bg-white rounded-3xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-6"
              style={{ boxShadow: neoShadow.rest, border: "1px solid rgba(255,255,255,0.6)" }}
            >
              {heroFeatures.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-2">
                  <span
                    className="grid place-items-center w-10 h-10 rounded-full text-white"
                    style={{ background: `linear-gradient(145deg, ${colors.mid}, ${colors.deep})` }}
                  >
                    <Icon size={17} />
                  </span>
                  <p className="text-sm font-semibold" style={{ color: colors.ink }}>{title}</p>
                  <p className="text-xs leading-snug" style={{ color: "#5B6B65" }}>{desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative h-[520px] md:h-[600px] hidden lg:block">
            <div className="absolute left-0 top-6 grid grid-cols-6 gap-2 opacity-60">
              {Array.from({ length: 36 }).map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.bright }} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40, rotate: -14 }}
              animate={{ opacity: 1, x: 0, rotate: -10 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute left-4 top-0 w-[46%] h-[85%] rounded-[36px] text-white p-8 flex flex-col justify-between overflow-hidden"
              style={{ boxShadow: neoShadow.hover }}
            >
              <video
                src={card3Video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(160deg, ${colors.mid}99, ${colors.deep}99)` }}
              />
              <span className="relative grid place-items-center w-14 h-14 rounded-full border-2 border-white/60">
                <Cross size={24} />
              </span>
              <div className="relative">
                <p style={fontDisplay} className="text-2xl font-semibold leading-snug">
                  Modern
                  <br />
                  Technology
                  <br />
                  Better Outcomes
                </p>
                <span className="block w-10 h-1 rounded-full mt-3" style={{ backgroundColor: colors.bright }} />
              </div>
              <div className="relative grid grid-cols-4 gap-2 opacity-60 w-24">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/70" />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, rotate: -8 }}
              animate={{ opacity: 1, x: 0, rotate: -4 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="absolute left-[30%] top-6 w-[48%] h-[80%] rounded-[36px] overflow-hidden"
              style={{ boxShadow: neoShadow.hover }}
            >
              <video
                src={card2Video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(160deg, ${colors.mid}99, ${colors.deep}99)` }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, rotate: 6 }}
              animate={{ opacity: 1, x: 0, rotate: 2 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="absolute right-0 top-2 w-[46%] h-[92%] rounded-[36px] overflow-hidden"
              style={{ boxShadow: neoShadow.hover }}
            >
              <video
                src={card1Video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(160deg, ${colors.mid}99, ${colors.deep}99)` }}
              />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute left-[28%] bottom-[26%] grid place-items-center w-16 h-16 rounded-full text-white z-20"
              style={{ background: `linear-gradient(145deg, ${colors.mid}, ${colors.deep})`, boxShadow: neoShadow.iconHover }}
            >
              <Users size={24} />
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="absolute left-[24%] bottom-0 w-[52%] bg-white rounded-[28px] p-6 z-10"
              style={{ boxShadow: neoShadow.hover }}
            >
              <p style={{ ...fontDisplay, color: colors.ink }} className="text-xl font-semibold leading-snug">
                Your <span style={{ color: colors.mid }}>Health,</span>
                <br />
                Our Priority
              </p>
              <span className="block w-8 h-1 rounded-full mt-3" style={{ backgroundColor: colors.mid }} />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="services" className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] mb-5"
            style={{
              color: colors.mid,
              backgroundColor: "#E4F3EE",
              border: "1px solid rgba(22,122,103,0.15)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.mid }} />
            CLINICAL SERVICES
          </span>
          <h2 style={fontDisplay} className="text-3xl md:text-5xl font-semibold max-w-2xl leading-[1.15]">
            We provide every medical attention{" "}
            <span style={{ color: colors.mid }}>you will need</span>
          </h2>
          <p className="mt-4 max-w-lg text-[15px]" style={{ color: "#5B6B65" }}>
            From routine checkups to specialized care, our team is equipped to support every step of your health journey.
          </p>
          <span className="block w-16 h-1 rounded-full mt-6" style={{ backgroundColor: colors.bright }} />
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence initial={false} mode="popLayout">
          {(showAllSpecializations ? servicesData : servicesData.slice(0, 5)).map((item, idx) => {
            const Icon = item.icon;
            const isNewlyRevealed = idx >= 5;
            return (
              <motion.div
                key={item.title}
                layout
                initial="hidden"
                animate="show"
                exit="exit"
                variants={cardReveal}
                whileHover={{
                  y: -8,
                  boxShadow: neoShadow.hover,
                  transition: { type: "spring", stiffness: 260, damping: 20 },
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: isNewlyRevealed ? (idx - 5) * 0.06 : idx * 0.08,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCard(activeCard === idx ? null : idx)}
                className={`group relative w-full h-[380px] rounded-3xl overflow-hidden cursor-pointer ${activeCard === idx ? "is-active" : ""}`}
                style={{ boxShadow: neoShadow.rest, border: "1px solid rgba(255,255,255,0.6)" }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />

                <div
                  className="absolute inset-0 transition-all duration-500 ease-out"
                  style={{
                    background:
                      activeCard === idx
                        ? "linear-gradient(180deg, rgba(11,42,36,0) 40%, rgba(11,42,36,0.55) 75%, rgba(11,42,36,0.85) 100%)"
                        : "linear-gradient(180deg, rgba(11,42,36,0) 40%, rgba(11,42,36,0.55) 75%, rgba(11,42,36,0.85) 100%)",
                  }}
                />

                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className="absolute top-4 left-5 w-12 h-12 shrink-0 aspect-square rounded-full flex items-center justify-center z-10"
                  style={{
                    background: `linear-gradient(145deg, ${colors.mid}, ${colors.deep})`,
                    boxShadow: neoShadow.iconRest,
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <Icon size={20} color="#fff" strokeWidth={2} />
                </motion.div>

                <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-2 z-10">
                  <h3 style={fontDisplay} className="text-lg font-semibold leading-tight mb-1.5 text-white">
                    {item.title}
                  </h3>

                  <div
                    className={`grid transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 ${
                      activeCard === idx ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[13px] leading-relaxed mb-3" style={{ color: "#DCEAE5" }}>
                        {item.shortDesc}
                      </p>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSpec(idx);
                        }}
                        className="self-start inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full text-sm font-semibold cursor-pointer"
                        style={{
                          background: `linear-gradient(145deg, #ffffff, ${colors.paper})`,
                          color: colors.deep,
                          boxShadow: "5px 5px 12px rgba(0,0,0,0.25)",
                        }}
                      >
                        {item.title.split(" ")[0]}
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center"
                          style={{
                            background: `linear-gradient(145deg, ${colors.mid}, ${colors.deep})`,
                            boxShadow: "3px 3px 8px rgba(9,32,27,0.35)",
                          }}
                        >
                          <ArrowRight size={13} color="#fff" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </motion.div>

        {servicesData.length > 5 && (
          <div className="flex justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowAllSpecializations((prev) => !prev)}
              className="px-8 py-3.5 rounded-full text-sm font-semibold shadow-sm"
              style={{ backgroundColor: colors.deep, color: "#fff" }}
            >
              {showAllSpecializations ? "Show Less" : "View All Services"}
            </motion.button>
          </div>
        )}
      </section>

      <section className="py-24" style={{ backgroundColor: "#EEF6F3" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 style={fontDisplay} className="text-3xl md:text-4xl font-semibold mb-3">
              Why Choose our clinic?
            </h2>
            <p className="max-w-xl mx-auto text-[15px]" style={{ color: "#5B6B65" }}>
              We combine experienced physicians and modern facilities to give every patient
              confident, unhurried care.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {whyChoose.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={whyCardVariant(idx)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col items-center text-center"
                >
                  <motion.div
                    variants={whyIconVariant(idx)}
                    whileHover={{ rotate: 360, scale: 1.15, transition: { duration: 0.6, ease: "easeInOut" } }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{ backgroundColor: colors.deep }}
                  >
                    <Icon size={26} color="#fff" strokeWidth={1.8} />
                  </motion.div>
                  <h3 className="font-semibold text-[15px] mb-2">{item.title}</h3>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: "#5B6B65" }}>
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          id="appointment"
          className="group relative overflow-hidden rounded-3xl px-8 md:px-16 py-16 text-center"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-out group-hover:scale-110"
            style={{
              backgroundImage: `linear-gradient(120deg, ${colors.deep}66, ${colors.mid}66), url(${ctaImg})`,
            }}
          />
          <div
            className="absolute -bottom-20 -left-16 w-72 h-72 rounded-full blur-3xl opacity-25"
            style={{ backgroundColor: colors.gold }}
          />
          <h2 style={fontDisplay} className="relative text-3xl md:text-4xl font-semibold text-white mb-4">
            Ready to start your health journey?
          </h2>
          <p className="relative max-w-xl mx-auto text-[15px] mb-9" style={{ color: "#CFE3DC" }}>
            Expert clinical care and consultation lets you secure your appointment with our
            in-house doctors.
          </p>
          <div className="relative flex flex-col sm:flex-row justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                to="/appointment"
                className="px-7 py-3.5 rounded-full text-sm font-semibold block"
                style={{ backgroundColor: "#fff", color: colors.deep }}
              >
                Book Your Appointment
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                to="/contact"
                className="px-7 py-3.5 rounded-full text-sm font-semibold text-white block"
                style={{ border: "1.5px solid rgba(255,255,255,0.5)" }}
              >
                Contact Our Support
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedSpec !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedSpec(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 pt-24"
            style={{ backgroundColor: "rgba(11,42,36,0.45)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              key={selectedSpec}
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.94 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-white flex flex-col"
              style={{ boxShadow: neoShadow.hover, maxHeight: "75vh" }}
            >
              <button
                onClick={() => setSelectedSpec(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full grid place-items-center bg-white/90"
                style={{ boxShadow: neoShadow.rest, color: colors.deep }}
              >
                ✕
              </button>

              <div
                className="group/img relative w-full h-[200px] shrink-0 overflow-hidden cursor-pointer"
                onClick={() => setShowFullImage(true)}
              >
                <img
                  src={servicesData[selectedSpec].image}
                  alt={servicesData[selectedSpec].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover/img:bg-black/40 opacity-0 group-hover/img:opacity-100 transition-all duration-300">
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-sm font-semibold" style={{ color: colors.deep }}>
                    <Eye size={16} />
                    View Full Image
                  </span>
                </div>
              </div>

              <div className="p-7 flex flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <span
                  className="grid place-items-center w-12 h-12 shrink-0 aspect-square rounded-full text-white mb-4"
                  style={{ background: `linear-gradient(145deg, ${colors.mid}, ${colors.deep})`, boxShadow: neoShadow.iconRest }}
                >
                  {React.createElement(servicesData[selectedSpec].icon, { size: 20 })}
                </span>
                <h3 style={fontDisplay} className="text-2xl font-semibold mb-2">
                  {servicesData[selectedSpec].title}
                </h3>
                <div className="flex items-center gap-3 text-xs font-semibold mb-4" style={{ color: colors.mid }}>
                  <span>★ {servicesData[selectedSpec].avgRating}</span>
                  <span>•</span>
                  <span>{servicesData[selectedSpec].doctorsAvailable} doctors</span>
                  <span>•</span>
                  <span>{servicesData[selectedSpec].consultationFee}</span>
                </div>
                <p className="text-[15px] leading-relaxed mb-5" style={{ color: "#5B6B65" }}>
                  {servicesData[selectedSpec].overview}
                </p>

                <h4 className="text-sm font-semibold mb-2" style={{ color: colors.deep }}>
                  Key Services
                </h4>
                <ul className="mb-5 space-y-1.5">
                  {servicesData[selectedSpec].keyServices.map((k) => (
                    <li key={k} className="text-[13.5px] flex items-start gap-2" style={{ color: "#5B6B65" }}>
                      <span style={{ color: colors.mid }}>•</span>
                      {k}
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-2 gap-3 text-[13px] p-4 rounded-2xl" style={{ backgroundColor: colors.paper }}>
                  <div>
                    <span className="block font-semibold" style={{ color: colors.ink }}>Duration</span>
                    <span style={{ color: "#5B6B65" }}>{servicesData[selectedSpec].duration}</span>
                  </div>
                  <div>
                    <span className="block font-semibold" style={{ color: colors.ink }}>Availability</span>
                    <span style={{ color: "#5B6B65" }}>{servicesData[selectedSpec].availability}</span>
                  </div>
                </div>

                <p className="text-center text-[13px] font-medium italic mt-5 mb-3" style={{ color: colors.mid }}>
                  "Your health, our priority."
                </p>

                <Link to="/appointment" className="w-full">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-center text-white font-semibold py-3.5 rounded-full"
                    style={{ background: `linear-gradient(145deg, ${colors.mid}, ${colors.deep})`, boxShadow: neoShadow.rest }}
                  >
                    Book Your Appointment
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFullImage && selectedSpec !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowFullImage(false)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              src={servicesData[selectedSpec].image}
              alt={servicesData[selectedSpec].title}
              className="max-w-full max-h-[90vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}