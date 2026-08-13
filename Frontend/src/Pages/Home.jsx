import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Activity,
  HeartPulse,
  ShieldPlus,
  ArrowRight,
  Award,
  BriefcaseMedical,
  Syringe,
  Headset,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Stethoscope,
  HeartHandshake,
  Clock,
  ShieldCheck,
  UserCheck,
  Star,
  Users,
  Smile,
} from "lucide-react";

import Hero from "../Components/Hero";

import {
  stats,
  services,
  features,
  patients,
} from "../Data/doctorData.js";


import cardiacScreeningImg from "../assets/Hero-section/Cardiac-Screening.png";
import heartFailureImg from "../assets/Hero-section/Heart-Failure-care.png";
import hypertensionImg from "../assets/Hero-section/Hypertension-care.png";

// ================= SUPPORTING COUNTER COMPONENT =================
const Counter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = target / steps;
      const stepTime = duration / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const Home = () => {
  
  const mappedServices = services.map((service, index) => {
    let localImg = service.image;
    const titleLower = service.title?.toLowerCase() || "";
    
    if (titleLower.includes("cardiac") || titleLower.includes("screening")) {
      localImg = cardiacScreeningImg;
    } else if (titleLower.includes("heart failure")) {
      localImg = heartFailureImg;
    } else if (titleLower.includes("hypertension")) {
      localImg = hypertensionImg;
    } else {
      const fallbacks = [cardiacScreeningImg, heartFailureImg, hypertensionImg];
      localImg = fallbacks[index % fallbacks.length];
    }

    return {
      ...service,
      image: localImg,
    };
  });

  const duplicatedPatients = [...patients, ...patients, ...patients];
  const duplicatedServices = [...mappedServices, ...mappedServices, ...mappedServices];

  const [patientsPaused, setPatientsPaused] = useState(false);
  const [servicesPaused, setServicesPaused] = useState(false);

  const [patientDragOffset, setPatientDragOffset] = useState(0);
  const [serviceDragOffset, setServiceDragOffset] = useState(0);

  // Manual Page/Index state for "Why Choose Our Practice" Side-by-Side Carousel
  const [featureIndex, setFeatureIndex] = useState(0);

  const maxIndex = features.length - 1;

  const handleNextFeature = () => {
    setFeatureIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrevFeature = () => {
    setFeatureIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // 5-Step Process Data
  const processSteps = [
    {
      number: "1",
      label: "STEP 1",
      title: "Create Your Account",
      description: "Sign up quickly and securely to get started.",
    },
    {
      number: "2",
      label: "STEP 2",
      title: "Choose Your Doctor",
      description: "Browse verified doctors and select the right specialist.",
    },
    {
      number: "3",
      label: "STEP 3",
      title: "Select Appointment",
      description: "Choose a convenient date and time for your consultation.",
    },
    {
      number: "4",
      label: "STEP 4",
      title: "Confirm Booking",
      description: "Review your details and confirm your appointment securely.",
    },
    {
      number: "5",
      label: "STEP 5",
      title: "Get Quality Care",
      description: "Meet your doctor and receive trusted healthcare.",
    },
  ];

  return (
    <div className="w-full bg-[#f3f6ff] dark:bg-[#030712] font-[Poppins,sans-serif] text-[#16263D] dark:text-gray-100 overflow-x-hidden text-[16px] transition-colors duration-300">
     

      {/* ================= HERO SECTION ================= */}
      <Hero />

      {/* ================= STATS SECTION ================= */}
      <div className="relative w-full bg-white dark:bg-[#0b0f19] border-t-2 border-[#006B63] border-b border-gray-100 dark:border-gray-800 px-6 md:px-10 py-8 font-[Poppins]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[3px] bg-[#006B63] rounded-full" />

        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 items-center text-center gap-y-6">
          {stats.map((stat, index) => {
            const rawNum = stat.number;
            const numericValue = parseInt(rawNum.replace(/[^0-9]/g, "")) || 0;
            const suffix = rawNum.replace(/[0-9]/g, "");

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center"
              >
                <h3 className="m-0 text-[32px] md:text-[40px] leading-none font-extrabold text-[#006B63] dark:text-[#2dd4bf]">
                  <Counter target={numericValue} suffix={suffix} />
                </h3>
                <p className="mt-2 text-[14px] md:text-[15px] font-medium text-[#59636A] dark:text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ================= WHY CHOOSE OUR PRACTICE ================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-[#e4efed] dark:bg-[#0f172a] py-[75px] font-[Poppins] overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-[45px] gap-6">
            <div className="max-w-[700px]">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#006B63]/15 dark:bg-[#2dd4bf]/15 px-3.5 py-1 text-[12px] font-semibold tracking-[1.5px] text-[#00524A] dark:text-[#2dd4bf]">
                OUR CORE PILLARS
              </div>
              <h2 className="m-0 mb-2 text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-tight text-[#16263D] dark:text-white">
                Why Choose Our Practice
              </h2>
              <p className="m-0 text-[15px] sm:text-[16px] leading-[1.7] text-[#59636A] dark:text-gray-300">
                Uncompromising standards of medical excellence and patient-centered hospitality, built on a step-by-step commitment to your care.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrevFeature}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#bcdad6] dark:border-gray-700 bg-white dark:bg-[#1e293b] text-[#006B63] dark:text-[#2dd4bf] transition-all duration-300 hover:border-[#006B63] hover:bg-[#006B63] hover:text-white cursor-pointer shadow-sm"
                aria-label="Previous Features"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNextFeature}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#bcdad6] dark:border-gray-700 bg-white dark:bg-[#1e293b] text-[#006B63] dark:text-[#2dd4bf] transition-all duration-300 hover:border-[#006B63] hover:bg-[#006B63] hover:text-white cursor-pointer shadow-sm"
                aria-label="Next Features"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="relative w-full overflow-hidden">
            <motion.div
              className="flex gap-[24px]"
              animate={{
                x: `calc(-${featureIndex * (100 / 3)}% - ${featureIndex * 16}px)`,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const stepNumber = `0${index + 1}`;
                return (
                  <div
                    key={index}
                    className="group relative flex flex-col justify-between rounded-[20px] border border-[#d0e4e1] dark:border-gray-800 bg-white dark:bg-[#111827] p-[32px] w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-h-[250px] shadow-[0_8px_30px_rgba(36,84,80,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-[8px] hover:border-[#006B63] dark:hover:border-[#2dd4bf] hover:shadow-[0_15px_35px_rgba(0,107,99,0.12)] overflow-hidden flex-shrink-0"
                  >
                    <span className="absolute right-4 top-2 text-[70px] font-extrabold text-[#edf4f3] dark:text-gray-800/40 transition-colors duration-300 group-hover:text-[#006B63]/10 dark:group-hover:text-[#2dd4bf]/10 select-none pointer-events-none">
                      {stepNumber}
                    </span>

                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-[52px] h-[52px] flex items-center justify-center rounded-[14px] bg-[#f0f7f6] dark:bg-[#1f2937] text-[#006B63] dark:text-[#2dd4bf] transition-colors duration-300 group-hover:bg-[#006B63] group-hover:text-white shadow-sm">
                          <Icon size={26} strokeWidth={2.2} />
                        </div>
                        <span className="text-[13px] font-bold tracking-wider text-[#006B63] dark:text-[#2dd4bf] bg-[#f0f7f6] dark:bg-[#1f2937] px-2.5 py-1 rounded-md">
                          STEP {stepNumber}
                        </span>
                      </div>

                      <h3 className="mb-2 text-[18px] sm:text-[19px] font-bold text-[#16263D] dark:text-white group-hover:text-[#006B63] dark:group-hover:text-[#2dd4bf] transition-colors duration-200">
                        {feature.title}
                      </h3>
                      <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[#59636A] dark:text-gray-400">
                        {feature.text}
                      </p>
                    </div>

                    <div className="mt-6 h-[3px] w-full bg-[#eaf2f1] dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-[#006B63] dark:bg-[#2dd4bf] transform -translate-x-full transition-transform duration-500 group-hover:translate-x-0" />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ================= MODERN 5-STEP PROCESS SECTION (EXACT DARK MATCH) ================= */}
      <section className="w-full bg-[#0b312d] pt-[55px] pb-[45px] px-[30px] font-[Poppins] relative transition-colors duration-300">
        <div className="max-w-[1200px] mx-auto text-center relative">
          
          <div className="font-[Poppins] text-[12px] font-bold text-[#2dd4bf] tracking-[1.5px] uppercase mb-[8px]">
            HOW IT WORKS
          </div>

          <h2 className="font-[Poppins] text-[32px] font-bold leading-[1.25] text-white max-w-[700px] mx-auto mb-0">
            Simple Steps to <span className="text-[#2dd4bf] font-bold">Get Started</span>
          </h2>

          <div className="w-[130px] h-[14px] mx-auto my-[12px] flex items-center justify-center">
            <svg viewBox="0 0 135 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M2 12C35 3 100 3 133 12" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <p className="font-[Poppins] text-[14px] font-normal leading-[1.6] text-gray-300 max-w-[620px] mx-auto mb-[40px]">
            Getting quality healthcare is simple. Follow these quick steps to connect with the right doctor and receive the care you need.
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-[16px] w-full relative">
            {processSteps.map((step, index) => (
              <React.Fragment key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  whileHover={{
                    translateY: -5,
                    boxShadow: "0 12px 28px rgba(45, 212, 191, 0.15)",
                    borderColor: "#2dd4bf",
                  }}
                  className="w-full sm:w-[180px] min-h-[108px] bg-[#113e39] rounded-[12px] border border-[#1b534d] shadow-[0_8px_20px_rgba(0,0,0,0.2)] p-[25px_14px_13px] relative text-center transition-all duration-300 flex-shrink-0"
                >
                  <div className="absolute top-[-11px] left-1/2 -translate-x-1/2 w-[22px] h-[22px] bg-[#2dd4bf] text-[#0b312d] rounded-full flex items-center justify-center text-[10px] font-bold font-[Poppins] shadow-[0_3px_10px_rgba(45,212,191,0.3)]">
                    {step.number}
                  </div>

                  <div className="font-[Poppins] text-[9px] font-bold text-[#2dd4bf] tracking-[0.6px] uppercase mb-[8px]">
                    {step.label}
                  </div>

                  <h4 className="font-[Poppins] text-[11px] font-semibold text-white leading-[1.4] mb-[6px]">
                    {step.title}
                  </h4>

                  <p className="font-[Poppins] text-[9px] font-normal text-gray-300 leading-[1.5] m-0">
                    {step.description}
                  </p>
                </motion.div>

                {index < processSteps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center text-[#2dd4bf] opacity-80">
                    <ChevronRight size={22} strokeWidth={2} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-[32px] h-[2px] w-full bg-[linear-gradient(90deg,transparent_0%,#1b534d_15%,#2dd4bf_50%,#1b534d_85%,transparent_100%)] rounded-[999px] relative overflow-hidden" />

        </div>
      </section>

      {/* ================= EXPERT CARDIOLOGY SERVICES ================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full bg-white dark:bg-[#0b0f19] py-[75px] font-[Poppins] overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-[45px] gap-6">
            <div>
              <h2 className="m-0 mb-2 text-[32px] sm:text-[38px] lg:text-[42px] font-bold leading-tight text-[#16263D] dark:text-white">
                Expert <span className="text-[#006B63] dark:text-[#2dd4bf]">Cardiology Services</span>
              </h2>
            </div>

            <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
              <p className="m-0 max-w-[450px] text-[14px] sm:text-[15px] leading-[1.6] text-[#59636A] dark:text-gray-400 text-right hidden lg:block">
                Providing comprehensive heart health solutions with the latest medical advancements and personalized treatment plans.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setServiceDragOffset((prev) => prev + 394)}
                  className="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-[#D5DDDF] dark:border-gray-700 bg-white dark:bg-[#1e293b] text-[#16263D] dark:text-gray-200 shadow-sm transition-all duration-300 hover:border-[#006B63] hover:bg-[#006B63] hover:text-[#FFFFFF] cursor-pointer"
                  aria-label="Previous Services"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={() => setServiceDragOffset((prev) => prev - 394)}
                  className="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-[#D5DDDF] dark:border-gray-700 bg-white dark:bg-[#1e293b] text-[#16263D] dark:text-gray-200 shadow-sm transition-all duration-300 hover:border-[#006B63] hover:bg-[#006B63] hover:text-[#FFFFFF] cursor-pointer"
                  aria-label="Next Services"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative w-full overflow-hidden py-4 max-w-[1200px] mx-auto px-8"
          onMouseEnter={() => setServicesPaused(true)}
          onMouseLeave={() => setServicesPaused(false)}
        >
          <motion.div
            className="flex gap-[30px] w-max cursor-grab active:cursor-grabbing"
            animate={servicesPaused ? { x: serviceDragOffset } : { x: [0, -1884 + serviceDragOffset] }}
            transition={
              servicesPaused
                ? { type: "spring", stiffness: 300, damping: 30 }
                : {
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 32,
                      ease: "linear",
                    },
                  }
            }
            drag="x"
            dragConstraints={{ left: -4000, right: 1000 }}
            onDragEnd={(e, info) => {
              setServiceDragOffset((prev) => prev + info.offset.x);
            }}
          >
            {duplicatedServices.map((service, index) => (
              <div
                key={index}
                className="group relative rounded-[24px] overflow-hidden w-[85vw] sm:w-[360px] md:w-[370px] h-[460px] flex flex-col justify-end shadow-[0_10px_30px_rgba(16,36,61,0.08)] transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_20px_40px_rgba(16,36,61,0.15)] flex-shrink-0"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b192c] via-[#0b192c]/60 to-transparent opacity-90" />
                <div className="relative z-10 p-[30px] flex flex-col justify-end h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-[4px] h-[22px] bg-[#FFC107] rounded-full" />
                    <h3 className="m-0 text-[22px] font-bold text-white tracking-wide">
                      {service.title}
                    </h3>
                  </div>
                  <p className="m-0 text-[14px] leading-[1.6] text-gray-200 line-clamp-3">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ================= CUSTOMERS REVIEW SECTION ================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-[#f3f6ff] dark:bg-[#030712] py-[75px] overflow-hidden font-[Poppins]"
      >
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-[45px] gap-6">
            <h2 className="m-0 text-[32px] sm:text-[38px] lg:text-[42px] font-bold tracking-tight text-[#10243D] dark:text-white">
              Customers Review
            </h2>

            <div className="flex items-center gap-2 bg-white dark:bg-[#111827] px-4 py-2 rounded-full shadow-[0_4px_15px_rgba(16,36,61,0.05)] border border-gray-100 dark:border-gray-800 self-start md:self-auto">
              <div className="flex text-[#FFC107]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FFC107" stroke="#FFC107" />
                ))}
              </div>
              <span className="text-[15px] font-bold text-[#10243D] dark:text-gray-200">4.9/5</span>
            </div>
          </div>
        </div>

        <div
          className="relative w-full overflow-hidden py-4 max-w-[1200px] mx-auto px-8"
          onMouseEnter={() => setPatientsPaused(true)}
          onMouseLeave={() => setPatientsPaused(false)}
        >
          <motion.div
            className="flex gap-[30px] w-max cursor-grab active:cursor-grabbing"
            animate={patientsPaused ? { x: patientDragOffset } : { x: [0, -1536 + patientDragOffset] }}
            transition={
              patientsPaused
                ? { type: "spring", stiffness: 300, damping: 30 }
                : {
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 28,
                      ease: "linear",
                    },
                  }
            }
            drag="x"
            dragConstraints={{ left: -4000, right: 1000 }}
            onDragEnd={(e, info) => {
              setPatientDragOffset((prev) => prev + info.offset.x);
            }}
          >
            {duplicatedPatients.map((patient, index) => (
              <div
                key={index}
                className="flex flex-col justify-between w-[85vw] sm:w-[360px] md:w-[370px] min-h-[260px] rounded-[20px] border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#111827] p-[32px] shadow-[0_10px_30px_rgba(16,36,61,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-[4px] hover:shadow-[0_15px_35px_rgba(16,36,61,0.10)] flex-shrink-0"
              >
                <div className="flex text-[#16263D] dark:text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < 4 ? "#16263D" : "#D1D5DB"}
                      stroke={i < 4 ? "#16263D" : "#D1D5DB"}
                      className="mr-1 dark:fill-amber-400 dark:stroke-amber-400"
                    />
                  ))}
                </div>

                <p className="my-0 flex-1 text-[15px] leading-[1.7] text-[#4B5559] dark:text-gray-300">
                  "{patient.review}"
                </p>

                <div className="w-full h-[1px] bg-gray-100 dark:bg-gray-800 my-5" />

                <div className="flex items-center">
                  <span className="text-[16px] font-bold text-[#16263D] dark:text-gray-200">
                    — {patient.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ================= APPOINTMENT CTA SECTION ================= */}
      <section className="bg-[#F7F9FF] dark:bg-[#030712] px-6 py-20 lg:py-24 font-[Poppins]">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto max-w-[1120px] overflow-hidden rounded-[22px] bg-gradient-to-br from-[#006B63] via-[#006B63] to-[#00524a] dark:from-[#0f766e] dark:via-[#115e59] dark:to-[#042f2e] px-8 sm:px-12 lg:px-16 py-12 lg:py-16 shadow-[0_18px_40px_rgba(0,107,99,0.2)] border border-white/10 dark:border-white/5"
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
                Ready to book your visit?
              </h2>
              <p className="text-[15px] sm:text-[17px] leading-[1.7] text-[#B4DFDC]">
                Take the first step toward better heart health today. Our scheduling assistant is available 24/7 to help you find a slot.
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
                className="group relative overflow-hidden flex w-full lg:w-auto min-w-[280px] items-center justify-center gap-3 rounded-[12px] bg-white dark:bg-[#111827] px-8 py-4 text-[16px] font-semibold text-[#006B63] dark:text-teal-300 shadow-[0_8px_25px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 dark:via-gray-800/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6F4F3] dark:bg-teal-950 text-[#006B63] dark:text-teal-300 transition-colors duration-300 group-hover:bg-[#006B63] group-hover:text-white">
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

      
    </div>
  );
};

export default Home;