import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Quote,
  ChevronRight,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  CalendarDays,
  Heart,
  PenLine,
  Activity,
  Droplet,
  CheckCircle2,
  Scale,
  Wind,
  Bone,
  Brain,
  Filter,
  X,
  User,
  Briefcase,
  Stethoscope,
  Eye,
  ArrowRight,
  Users,
  ShieldCheck,
} from "lucide-react";

import reviewVideo from "../assets/testimonial/review.mp4";
import testinlsVideo from "../assets/testimonial/testinls.mp4";

const iconMap = { Heart, Activity, Droplet, Scale, Wind, Bone, Brain, Filter };

const heroStats = [
  { icon: Star, title: "4.9 / 5", desc: "Average patient rating" },
  { icon: Users, title: "500+", desc: "Patients treated & counting" },
  { icon: ShieldCheck, title: "100%", desc: "Verified real reviews" },
  { icon: Heart, title: "50+", desc: "Documented success stories" },
];

const featuredExperiences = [
  {
    quote:
      "The level of personalized care I received at Dr. Malhotra's clinic was beyond my expectations. They didn't just treat my symptoms; they listened to my concerns and crafted a plan that worked for my lifestyle.",
    name: "Sakshi Vishwanath",
    role: "Chronic Pain Management Patient",
    highlight: true,
  },
  {
    quote:
      "After my surgery, the recovery support was incredible. The team was there for every question, ensuring my transition back to health was smooth and supported. I've never felt so cared for in a clinical setting.",
    name: "Ramesh Gaikwad",
    role: "Post-Operative Recovery Patient",
    highlight: false,
  },
];

const avatarColors = ["bg-teal-600", "bg-purple-500", "bg-yellow-500", "bg-rose-400", "bg-teal-400", "bg-gray-600", "bg-indigo-500", "bg-orange-500", "bg-pink-500"];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5 text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "opacity-100" : "opacity-25"}>★</span>
      ))}
    </div>
  );
}

function ReviewCard({ review, i }) {
  const initial = review.name.charAt(0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
    >
      <Stars count={review.rating} />
      <p className="text-gray-700 text-sm mt-3 mb-6">"{review.text}"</p>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} text-white flex items-center justify-center text-sm font-semibold`}>
          {initial}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{review.name}</p>
          <p className="text-xs text-gray-400">{review.date}</p>
        </div>
      </div>
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const cardReveal = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.96, transition: { duration: 0.25, ease: "easeInOut" } },
};

function FeaturedExperienceCard({ exp, rank }) {
  const isFirst = rank === 1;
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      custom={rank}
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className={`relative rounded-3xl p-6 md:p-8 overflow-hidden shadow-xl ${isFirst ? "text-white" : "bg-white text-slate-800 shadow-lg"
        }`}
      style={
        isFirst
          ? { background: "linear-gradient(135deg, #0f766e 0%, #115e59 55%, #134e4a 100%)" }
          : undefined
      }
    >
      {isFirst && (
        <svg
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
          viewBox="0 0 400 400"
          preserveAspectRatio="none"
        >
          <path d="M0 250 Q 100 200 200 260 T 400 230 V400 H0 Z" fill="white" />
        </svg>
      )}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isFirst
            ? "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.25) 50%, transparent 65%)"
            : "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%)",
        }}
        animate={{ x: ["-120%", "120%"] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
      />

      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={isFirst ? "https://i.ibb.co/G4mtZHxq/gold.png" : "https://i.ibb.co/Myp5Q2QS/silver.png"}
            alt={isFirst ? "Gold badge" : "Silver badge"}
            className="w-28 h-28 flex-shrink-0 object-contain"
          />

          <div
            className={`flex items-center gap-2 text-lg md:text-xl font-bold tracking-wide ${isFirst ? "text-amber-300" : "text-teal-700"
              }`}
          >
            <span className="text-xl leading-none opacity-70">❧</span>
            <motion.span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: isFirst
                  ? "linear-gradient(90deg, #fcd34d 0%, #fcd34d 40%, #fff8dc 50%, #fcd34d 60%, #fcd34d 100%)"
                  : "linear-gradient(90deg, #0f766e 0%, #0f766e 40%, #5eead4 50%, #0f766e 60%, #0f766e 100%)",
                backgroundSize: "250% 100%",
              }}
              animate={{ backgroundPosition: ["150% 0%", "-50% 0%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
            >
              {isFirst ? "Patient of the Month" : "Patient Spotlight"}
            </motion.span>
            <span className="text-xl leading-none opacity-70 scale-x-[-1] inline-block">❧</span>
          </div>
        </div>

        <Quote
          size={56}
          className={`-mt-2 fill-current ${isFirst ? "text-teal-400/60" : "text-teal-100"}`}
        />
      </div>

      <p
        className={`relative mt-5 text-lg leading-relaxed ${isFirst ? "text-teal-50" : "text-slate-600"
          }`}
      >
        {exp.quote}
      </p>

      <div
        className={`relative border-t mt-5 pt-4 flex items-center justify-between ${isFirst ? "border-teal-400/30" : "border-slate-100"
          }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-semibold ${isFirst ? "border-teal-200 text-teal-50" : "border-teal-600 text-teal-700"
              }`}
          >
            {exp.name.charAt(0)}
          </div>
          <div>
            <p className={`font-semibold ${isFirst ? "text-white" : "text-slate-800"}`}>
              {exp.name}
            </p>
            <p className={`text-sm ${isFirst ? "text-teal-200" : "text-slate-400"}`}>
              {exp.role}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={18}
              className={`fill-current ${isFirst ? "text-amber-400" : "text-teal-600"}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function JourneyCard({ journey, index, onClick }) {
  const Icon = iconMap[journey.icon] || Heart;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      layout
      initial="hidden"
      animate="show"
      exit="exit"
      variants={cardReveal}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index < 5 ? index * 0.1 : (index - 5) * 0.08 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="relative rounded-[28px] bg-white border border-gray-100 shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0"
          style={
            journey.image
              ? {
                backgroundImage: `url(${journey.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                clipPath: "polygon(0 0, 100% 0, 100% 34%, 58% 66%, 32% 46%, 0 62%)",
              }
              : {
                background: "linear-gradient(135deg, #0d9488 0%, #0f766e 55%, #115e59 100%)",
                clipPath: "polygon(0 0, 100% 0, 100% 34%, 58% 66%, 32% 46%, 0 62%)",
              }
          }
        />

        <svg
          className="absolute bottom-3 right-4 opacity-40"
          width="56"
          height="40"
          viewBox="0 0 56 40"
        >
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={c * 10 + 4} cy={r * 10 + 4} r="1.6" fill="#0f766e" />
            ))
          )}
        </svg>

        <svg
          className="absolute left-4 bottom-8 w-40 h-10 opacity-60"
          viewBox="0 0 160 40"
          fill="none"
        >
          <path
            d="M0 20 H40 L48 6 L56 34 L64 20 H160"
            stroke="#5eead4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {!journey.image && (
          <div className="absolute left-6 top-6 w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center">
            <Icon size={40} strokeWidth={1.5} className="text-white" />
          </div>
        )}

        <div className="absolute top-4 right-4 w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
          <span className="text-teal-700 font-bold text-sm">{num}</span>
        </div>
      </div>

      <div className="px-6 pb-6 -mt-6 relative">
        <div className="inline-flex items-center gap-2 bg-white rounded-full pl-2 pr-4 py-1.5 shadow-md border border-gray-100">
          <span className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center">
            <Icon size={12} className="text-teal-600" />
          </span>
          <span className="text-teal-700 text-[11px] font-bold tracking-widest uppercase">
            {journey.tag}
          </span>
        </div>

        <h3 className="font-bold text-xl text-gray-900 mt-4 mb-2 leading-snug">
          {journey.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">{journey.desc}</p>

        <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(145deg, #0f766e, #115e59)",
                boxShadow: "3px 3px 8px rgba(15,118,110,0.3), -2px -2px 6px rgba(255,255,255,0.7)",
              }}
            >
              <CalendarDays size={16} className="text-white" />
            </span>
            <div>
              <p className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase">
                Duration
              </p>
              <p className="font-bold text-gray-800 text-sm">{journey.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(145deg, #0f766e, #115e59)",
                boxShadow: "3px 3px 8px rgba(15,118,110,0.3), -2px -2px 6px rgba(255,255,255,0.7)",
              }}
            >
              <CheckCircle2 size={16} className="text-white" />
            </span>
            <div>
              <p className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase">
                Outcome
              </p>
              <p className="font-bold text-teal-700 text-sm">{journey.outcome}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [showAllJourneys, setShowAllJourneys] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [showFullImage, setShowFullImage] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [testimonialData, setTestimonialData] = useState({
    name: "",
    role: "",
    rating: 5,
    text: "",
  });
  const [testimonialSubmitted, setTestimonialSubmitted] = useState(false);
  const [patientJourneysDetailed, setPatientJourneysDetailed] = useState([]);
  const [patientReviews, setPatientReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [journeysRes, reviewsRes] = await Promise.all([
          fetch('http://localhost:5000/api/testimonials/journeys'),
          fetch('http://localhost:5000/api/testimonials/reviews')
        ]);
        if (journeysRes.ok && reviewsRes.ok) {
          const journeysData = await journeysRes.json();
          const reviewsData = await reviewsRes.json();
          setPatientJourneysDetailed(journeysData);
          setPatientReviews(reviewsData);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedJourney !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedJourney]);

  return (
    <div className="bg-gray-50">
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-[#eaf3f1] to-white pt-32 pb-20 lg:pt-40 lg:pb-28 -mt-[80px]">
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-teal-300/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-amber-300/10 blur-3xl pointer-events-none" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold leading-[1.05] text-slate-900 mb-6"
            >
              Stories That
              <br />
              Speak For
              <br />
              <span className="relative inline-block text-teal-600">
                Themselves
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="10"
                  viewBox="0 0 220 10"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M2 8 C 70 2, 150 2, 218 8"
                    stroke="#0d9488"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-500 text-lg leading-relaxed max-w-md mb-8"
            >
              Every review here comes from someone who trusted us with their health —
              and stayed long enough to tell us how it went. No scripts, no
              filters, just real outcomes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 sm:gap-8 mb-12"
            >
              <motion.a
                href="#experiences"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 text-white font-semibold px-6 py-3.5 rounded-full bg-gradient-to-br from-teal-600 to-teal-800 shadow-lg shadow-teal-900/20"
              >
                Read Verified Reviews
                <span className="grid place-items-center w-6 h-6 rounded-full bg-white/20 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight size={13} />
                </span>
              </motion.a>

              <a href="#share" className="flex items-center gap-3 font-semibold text-teal-800">
                <span className="grid place-items-center w-11 h-11 rounded-full bg-white text-teal-600 shadow-[6px_6px_16px_rgba(163,177,171,0.4),-6px_-6px_16px_rgba(255,255,255,0.9)]">
                  <PenLine size={18} />
                </span>
                Share Your Story
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-3xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 border border-white/60 shadow-[8px_8px_24px_rgba(163,177,171,0.35),-8px_-8px_24px_rgba(255,255,255,0.9)]"
            >
              {heroStats.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-2">
                  <span className="grid place-items-center w-10 h-10 rounded-full text-white bg-gradient-to-br from-teal-600 to-teal-800">
                    <Icon size={16} />
                  </span>
                  <p className="text-sm font-bold text-gray-900">{title}</p>
                  <p className="text-xs leading-snug text-gray-400">{desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative h-[520px] md:h-[560px] hidden lg:block">
            <div className="absolute left-0 top-6 grid grid-cols-6 gap-2 opacity-60">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40, rotate: -8 }}
              animate={{ opacity: 1, x: 0, rotate: -4 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute left-6 top-0 w-[72%] h-[78%] rounded-[36px] overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200"
                alt="Patient consultation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/70 via-teal-900/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <Quote size={28} className="text-teal-300 mb-2" />
                <p className="text-sm leading-relaxed">
                  "They didn't just treat my symptoms — they listened."
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="absolute -right-2 top-8 bg-white rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3 z-20"
            >
              <div className="flex flex-col items-center leading-none">
                <span className="text-2xl font-extrabold text-teal-700">4.9</span>
                <div className="flex gap-0.5 mt-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={10} className="fill-current" />
                  ))}
                </div>
              </div>
              <div className="text-xs text-gray-400 leading-tight max-w-[90px]">
                from 500+ verified patient reviews
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute left-0 bottom-16 bg-white rounded-2xl px-5 py-4 shadow-xl z-20"
            >
              <div className="flex items-center -space-x-2 mb-2">
                {["bg-teal-600", "bg-purple-500", "bg-yellow-500", "bg-rose-400"].map((c, i) => (
                  <span
                    key={i}
                    className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-semibold`}
                  >
                    {["S", "R", "P", "N"][i]}
                  </span>
                ))}
              </div>
              <p className="text-xs font-semibold text-gray-800">Joined this month</p>
              <p className="text-[11px] text-gray-400">32 new stories shared</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute right-6 bottom-0 w-[46%] bg-teal-800 text-white rounded-[28px] p-6 shadow-xl"
            >
              <ShieldCheck size={22} className="text-teal-300 mb-3" />
              <p className="text-base font-semibold leading-snug">
                Every review, checked and verified
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="experiences" className="w-full bg-[#eaf3f1] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex justify-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <div className="flex items-center gap-2 bg-white/70 border border-teal-100 rounded-full px-4 py-1.5 shadow-sm">
              <span className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center">
                <Star size={11} className="text-white fill-current" />
              </span>
              <span className="text-teal-700 text-xs font-bold tracking-widest uppercase">
                This Month's Spotlight
              </span>
            </div>
          </motion.div>

          <motion.h2
            className="text-center text-4xl md:text-5xl font-extrabold text-slate-800 mt-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
          >
            Top Patient <span className="text-teal-600">Experiences</span>
          </motion.h2>

          <motion.div
            className="flex justify-center mt-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1.4}
            variants={fadeUp}
          >
            <div className="h-1 w-16 bg-teal-600 rounded-full" />
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-4 mt-6 max-w-xl mx-auto text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
          >
            <span className="text-teal-300 text-2xl hidden sm:block">🌿</span>
            <p className="text-slate-500 text-base leading-relaxed">
              Every month, we highlight two incredible stories that inspire us to
              keep delivering exceptional care.
            </p>
            <span className="text-teal-300 text-2xl hidden sm:block scale-x-[-1]">🌿</span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {featuredExperiences.map((exp, i) => (
              <FeaturedExperienceCard key={i} exp={exp} rank={i + 1} />
            ))}
          </div>

          <motion.div
            className="flex justify-center mt-14"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={3.5}
            variants={fadeUp}
          >
            <div className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-sm">
              <CalendarDays size={18} className="text-teal-600" />
              <p className="text-slate-500 text-sm">
                New stories. Real people. Better care.{" "}
                <span className="text-teal-600 font-semibold">Every month.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="reviews" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center text-center gap-6 mb-10">
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-full px-3.5 py-1 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                <span className="text-teal-700 text-[11px] font-bold tracking-widest uppercase">
                  Real Outcomes
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Patient Journeys</h2>
              <div className="h-1 w-14 bg-teal-600 rounded-full mt-3 mb-3" />
              <p className="text-gray-500 max-w-md">
                In-depth looks at how integrated healthcare leads to lasting wellness outcomes.
              </p>
            </div>
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <AnimatePresence initial={false} mode="popLayout">
              {loading ? (
                <div className="col-span-full text-center text-teal-600 font-semibold py-10">Loading patient journeys...</div>
              ) : (
                (showAllJourneys ? patientJourneysDetailed : patientJourneysDetailed.slice(0, 5)).map((j, i) => (
                  <JourneyCard
                    key={j.id || i}
                    journey={j}
                    index={i}
                    onClick={() => setSelectedJourney(patientJourneysDetailed.indexOf(j))}
                  />
                ))
              )}
            </AnimatePresence>
          </motion.div>

          {patientJourneysDetailed.length > 5 && (
            <div className="flex justify-center mb-16">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowAllJourneys((prev) => !prev)}
                className="px-8 py-3.5 rounded-full text-sm font-semibold shadow-sm bg-teal-700 text-white hover:bg-teal-800 transition-colors"
              >
                {showAllJourneys ? "Show Less" : "View All Journeys"}
              </motion.button>
            </div>
          )}

          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-full px-3.5 py-1 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
              <span className="text-teal-700 text-[11px] font-bold tracking-widest uppercase">
                Verified Reviews
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Words from our <span className="text-teal-600">Patients</span>
            </h2>
            <div className="h-1 w-14 bg-teal-600 rounded-full mt-3 mb-3" />
            <p className="text-gray-500 max-w-md">
              Real feedback from real people, sharing what their experience with us was like.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading ? (
               <div className="col-span-full text-center text-teal-600 font-semibold py-10">Loading reviews...</div>
            ) : (
              patientReviews.slice(0, visibleReviews).map((r, i) => (
                <ReviewCard key={i} review={r} i={i} />
              ))
            )}
          </div>

          {visibleReviews < patientReviews.length && (
            <div className="flex justify-center mt-10">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setVisibleReviews((prev) => Math.min(prev + 5, patientReviews.length))}
                className="px-8 py-3.5 rounded-full text-sm font-semibold shadow-sm bg-teal-700 text-white hover:bg-teal-800 transition-colors"
              >
                Load More Reviews
              </motion.button>
            </div>
          )}
        </div>
      </section>

      <section id="share" className="relative w-full py-24 px-4 md:px-8 overflow-hidden bg-[#eaf5ef]">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(15,77,64,0.08) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
            whileHover={{ rotate: 0, scale: 1.01 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-sm"
          >
            <div
              className="absolute inset-0 rounded-sm overflow-hidden shadow-[0_20px_60px_-15px_rgba(15,77,64,0.35)] bg-[#fffdf8]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,253,248,0.88), rgba(255,253,248,0.88)), url(https://i.ibb.co/bgrSCBsS/Chat-GPT-Image-Aug-12-2026-05-18-56-PM.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="relative px-8 py-12 md:px-12 md:py-14">
              <div className="absolute -top-3 right-2 md:-top-5 md:-right-6 rotate-[7deg]">
                <div
                  className="relative w-20 h-24 md:w-24 md:h-28 bg-teal-50 overflow-hidden shadow-md p-2"
                  style={{ border: "2px dashed rgba(15,77,64,0.35)" }}
                >
                  <video
                    src={reviewVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-teal-50/60" />
                  <div className="relative flex flex-col items-center justify-center h-full gap-1.5">
                    <Heart className="w-6 h-6 text-teal-700" fill="currentColor" />
                    <span className="text-[8px] font-bold tracking-widest text-teal-700 uppercase text-center leading-tight">
                      Est. in Care
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-teal-700/70 text-xs md:text-sm font-semibold tracking-wide uppercase mb-8">
                To — Our Care Community
              </p>

              <h2 className="font-serif italic text-3xl md:text-5xl text-teal-950 leading-[1.05] mb-6">
                Share your story
              </h2>

              <p className="text-slate-600 text-base leading-relaxed max-w-md mb-10">
                Has our clinic played a role in your health journey? A few lines from
                you helps us improve, and gives the next patient a reason to hope.
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setTestimonialSubmitted(false);
                  setShowTestimonialForm(true);
                }}
                className="group inline-flex items-center gap-3 bg-teal-900 text-white rounded-full pl-2 pr-6 py-2 shadow-lg hover:bg-teal-950 transition-colors"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-teal-900">
                  <PenLine className="w-4 h-4" />
                </span>
                <span className="font-semibold text-sm md:text-base">
                  Write your testimonial
                </span>
              </motion.button>

              <p className="mt-10 font-serif italic text-slate-400 text-sm">
                — from patients, for patients
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 1.5 }}
            whileHover={{ rotate: 0, scale: 1.01 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative rounded-sm"
          >
            <div
              className="absolute inset-0 rounded-sm overflow-hidden shadow-[0_20px_60px_-15px_rgba(15,77,64,0.35)] bg-[#fffdf8]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,253,248,0.88), rgba(255,253,248,0.88)), url(https://i.ibb.co/bgrSCBsS/Chat-GPT-Image-Aug-12-2026-05-18-56-PM.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="relative px-8 py-12 md:px-12 md:py-14">
              <div className="absolute -top-3 right-2 md:-top-5 md:-right-6 rotate-[-7deg]">
                <div
                  className="relative w-20 h-24 md:w-24 md:h-28 bg-teal-50 overflow-hidden shadow-md p-2"
                  style={{ border: "2px dashed rgba(15,77,64,0.35)" }}
                >
                  <video
                    src={testinlsVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-teal-50/60" />
                  <div className="relative flex flex-col items-center justify-center h-full gap-1.5">
                    <Calendar className="w-6 h-6 text-teal-700" />
                    <span className="text-[8px] font-bold tracking-widest text-teal-700 uppercase text-center leading-tight">
                      Book Today
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-teal-700/70 text-xs md:text-sm font-semibold tracking-wide uppercase mb-8">
                To — You, Starting Today
              </p>

              <h2 className="font-serif italic text-3xl md:text-5xl text-teal-950 leading-[1.05] mb-6">
                Secure your health
              </h2>

              <p className="text-slate-600 text-base leading-relaxed max-w-md mb-10">
                Join thousands of satisfied patients. Experience healthcare that's
                tailored to your unique needs and delivered with excellence.
              </p>

              <Link to="/appointment">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center gap-3 bg-teal-900 text-white rounded-full pl-2 pr-6 py-2 shadow-lg hover:bg-teal-950 transition-colors"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-teal-900">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <span className="font-semibold text-sm md:text-base">
                    Book Appointment
                  </span>
                </motion.div>
              </Link>

              <p className="mt-10 font-serif italic text-slate-400 text-sm">
                — your care, our priority
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedJourney !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              setSelectedJourney(null);
              setShowFullImage(false);
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 pt-24"
            style={{ backgroundColor: "rgba(11,42,36,0.5)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              key={selectedJourney}
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-white flex flex-col"
              style={{ maxHeight: "72vh" }}
            >
              {(() => {
                const j = patientJourneysDetailed[selectedJourney];
                const Icon = iconMap[j.icon] || Heart;
                return (
                  <>
                    <button
                      onClick={() => setSelectedJourney(null)}
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full grid place-items-center bg-white/90 shadow-md text-teal-700 hover:bg-white"
                    >
                      <X size={18} />
                    </button>

                    <div
                      className="group/img relative w-full h-[160px] shrink-0 overflow-hidden cursor-pointer"
                      onClick={() => setShowFullImage(true)}
                    >
                      <img src={j.image} alt={j.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover/img:bg-black/40 opacity-0 group-hover/img:opacity-100 transition-all duration-300">
                        <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-sm font-semibold text-teal-700">
                          <Eye size={16} />
                          View Full Image
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-6 right-6">
                        <span className="inline-flex items-center gap-2 bg-white/90 rounded-full px-3 py-1 mb-2">
                          <Icon size={13} className="text-teal-700" />
                          <span className="text-teal-700 text-[11px] font-bold tracking-widest uppercase">
                            {j.tag}
                          </span>
                        </span>
                        <h3 className="text-white text-2xl font-bold leading-snug">{j.title}</h3>
                      </div>
                    </div>

                    <div className="p-7 flex flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-teal-700 mb-5">
                        <span className="flex items-center gap-1.5">
                          <User size={14} /> {j.patientName}, {j.age}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase size={14} /> {j.occupation}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={14} /> {j.duration}
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4 grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase">Duration</p>
                          <p className="font-bold text-gray-800 text-sm">{j.duration}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase">Outcome</p>
                          <p className="font-bold text-teal-700 text-sm">{j.outcome}</p>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-gray-900 mb-2">Background</h4>
                      <p className="text-[14px] leading-relaxed text-gray-500 mb-5">{j.background}</p>

                      <h4 className="text-sm font-bold text-gray-900 mb-2">Challenge</h4>
                      <p className="text-[14px] leading-relaxed text-gray-500 mb-5">{j.challenge}</p>

                      <h4 className="text-sm font-bold text-gray-900 mb-2">Treatment Plan</h4>
                      <ul className="mb-5 space-y-1.5">
                        {j.treatmentPlan.map((t, idx) => (
                          <li key={idx} className="text-[13.5px] flex items-start gap-2 text-gray-500">
                            <CheckCircle2 size={14} className="text-teal-600 mt-0.5 flex-shrink-0" />
                            {t}
                          </li>
                        ))}
                      </ul>

                      <h4 className="text-sm font-bold text-gray-900 mb-2">Milestones</h4>
                      <ul className="mb-5 space-y-2">
                        {j.milestones.map((m, idx) => (
                          <li key={idx} className="text-[13.5px] flex items-start gap-3 text-gray-500">
                            <span className="text-teal-700 font-bold whitespace-nowrap">{m.week}</span>
                            <span>{m.achievement}</span>
                          </li>
                        ))}
                      </ul>

                      <h4 className="text-sm font-bold text-gray-900 mb-2">Result</h4>
                      <p className="text-[14px] leading-relaxed text-gray-500 mb-5">{j.result}</p>

                      <div className="flex items-start gap-2 text-[13px] text-gray-500 mb-6">
                        <Stethoscope size={15} className="text-teal-700 mt-0.5 flex-shrink-0" />
                        <span><span className="font-semibold text-gray-800">Care Team:</span> {j.careTeam}</span>
                      </div>

                      <div className="bg-teal-50 rounded-2xl p-5 flex gap-3 mb-6">
                        <Quote size={22} className="text-teal-400 flex-shrink-0" />
                        <p className="text-[14px] italic text-slate-700 leading-relaxed">{j.quote}</p>
                      </div>

                      <Link to="/appointment" className="block">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full text-center text-white font-semibold py-3.5 rounded-full bg-teal-700 hover:bg-teal-800 transition-colors"
                        >
                          Book Your Appointment
                        </motion.div>
                      </Link>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFullImage && selectedJourney !== null && (
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
              src={patientJourneysDetailed[selectedJourney].image}
              alt={patientJourneysDetailed[selectedJourney].title}
              className="max-w-full max-h-[90vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTestimonialForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowTestimonialForm(false)}
            className="fixed inset-0 z-[300] flex items-center justify-center p-6"
            style={{ backgroundColor: "rgba(11,42,36,0.5)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-white flex flex-col"
              style={{ maxHeight: "75vh" }}
            >
              <button
                onClick={() => setShowTestimonialForm(false)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full grid place-items-center bg-gray-50 shadow-sm text-teal-700 hover:bg-gray-100"
              >
                <X size={18} />
              </button>

              <div className="p-6 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {testimonialSubmitted ? (
                  <div className="flex flex-col items-center text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-4">
                      <CheckCircle2 size={32} className="text-teal-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h3>
                    <p className="text-gray-500 text-sm mb-6">
                      Your testimonial has been received. We appreciate you sharing your story.
                    </p>
                    <button
                      onClick={() => setShowTestimonialForm(false)}
                      className="px-6 py-3 rounded-full text-sm font-semibold bg-teal-700 text-white hover:bg-teal-800 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-full px-3.5 py-1 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                      <span className="text-teal-700 text-[11px] font-bold tracking-widest uppercase">
                        Share Your Story
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Write your testimonial</h3>
                    <p className="text-gray-500 text-xs mb-4">
                      Tell us about your experience — it means a lot to us and to future patients.
                    </p>

                    <form
                     onSubmit={async (e) => {
                     e.preventDefault();

                        try {
                      const response = await fetch(
                      "http://localhost:5000/api/testimonials/reviews",
                      {
                        method: "POST",
                       headers: {
                      "Content-Type": "application/json",
                        },
                     body: JSON.stringify({
                    name: testimonialData.name,
                    role: testimonialData.role,
                    rating: testimonialData.rating,
                    text: testimonialData.text,
                    }),
                    }
                    );

              if (!response.ok) {
                throw new Error("Failed to submit testimonial");
                  }

              const newReview = await response.json();

    // New review immediately show in UI
    setPatientReviews((prev) => [newReview, ...prev]);

    setTestimonialSubmitted(true);

    // Reset form
    setTestimonialData({
      name: "",
      role: "",
      rating: 5,
      text: "",
    });

  } catch (error) {
    console.error("Error submitting testimonial:", error);
    alert("Failed to submit testimonial. Please try again.");
  }
}}
                      className="space-y-3"
                    >
                      <div>
                        <label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                          <User size={13} className="text-teal-600" /> Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={testimonialData.name}
                          onChange={(e) =>
                            setTestimonialData((prev) => ({ ...prev, name: e.target.value }))
                          }
                          placeholder="e.g. Priya Sharma"
                          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                          <Briefcase size={13} className="text-teal-600" /> Your Role / Treatment
                        </label>
                        <input
                          type="text"
                          required
                          value={testimonialData.role}
                          onChange={(e) =>
                            setTestimonialData((prev) => ({ ...prev, role: e.target.value }))
                          }
                          placeholder="e.g. Post-Operative Recovery Patient"
                          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                          <Star size={13} className="text-teal-600" /> Your Rating
                        </label>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <button
                              type="button"
                              key={i}
                              onClick={() =>
                                setTestimonialData((prev) => ({ ...prev, rating: i + 1 }))
                              }
                            >
                              <Star
                                size={26}
                                className={`transition-colors ${i < testimonialData.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-200"
                                  }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                          <Quote size={13} className="text-teal-600" /> Your Testimonial
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={testimonialData.text}
                          onChange={(e) =>
                            setTestimonialData((prev) => ({ ...prev, text: e.target.value }))
                          }
                          placeholder="Share how your experience with us went..."
                          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors resize-none"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full text-center text-white font-semibold py-3.5 rounded-full bg-teal-700 hover:bg-teal-800 transition-colors"
                      >
                        Submit Testimonial
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}