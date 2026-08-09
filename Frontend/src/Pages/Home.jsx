import React, { useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

import HeroBg from "../assets/Hero-section/Hero-background-Img.png";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
  stats,
  services,
  features,
  patients,
} from "../Data/doctorData.js";


const Home = () => {
  const duplicatedPatients = [...patients, ...patients, ...patients];
  const duplicatedServices = [...services, ...services, ...services];

  const [patientsPaused, setPatientsPaused] = useState(false);
  const [servicesPaused, setServicesPaused] = useState(false);

  const [patientDragOffset, setPatientDragOffset] = useState(0);
  const [serviceDragOffset, setServiceDragOffset] = useState(0);

  // Manual Page/Index state for "Why Choose Our Practice" Side-by-Side Carousel
  const [featureIndex, setFeatureIndex] = useState(0);

  // We show 3 cards at a time on desktop, 1 on mobile
  const maxIndex = features.length - 1;

  const handleNextFeature = () => {
    setFeatureIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrevFeature = () => {
    setFeatureIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div className="w-full bg-[#f3f6ff] font-[Poppins,sans-serif] text-[#16263D] overflow-x-hidden text-[16px]">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section 
        className="relative w-full border-t border-blue-100 font-[Poppins] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HeroBg})` }}
      >
        <div className="relative z-10 max-w-[1280px] mx-auto min-h-[460px] px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 min-h-[460px]">
            <div className="flex flex-col justify-center py-12 lg:py-0">
              <h1 className="text-[38px] sm:text-[44px] lg:text-[50px] font-bold leading-[1.15] text-[#10233d]">
                Dr. Rajesh Malhotra
              </h1>
              <h2 className="mt-2 text-[20px] sm:text-[22px] font-semibold text-[#006f6b]">
                Cardiology Specialist
              </h2>
              <p className="mt-4 max-w-[550px] text-[16px] sm:text-[17px] leading-[1.7] text-gray-700">
                Experience precision heart care tailored to your unique lifestyle. We combine advanced diagnostic technology with a compassionate, patient-first approach to heart health.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <button className="px-7 py-3.5 rounded-md bg-[#006f6b] text-white text-[14px] font-semibold shadow-sm hover:bg-[#005c59] transition-all duration-200">
                  Book Appointment
                </button>
                <button className="px-7 py-3.5 rounded-md border border-[#006f6b] text-[#006f6b] bg-transparent text-[14px] font-semibold hover:bg-[#006f6b] hover:text-white transition-all duration-200">
                  View Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <div className="w-full min-h-[85px] bg-white border-t-2 border-b-2 border-[#3B9CFF] grid grid-cols-2 md:grid-cols-4 items-center text-center px-6 md:px-10 py-6 gap-y-4 font-[Poppins]">
        {stats.map((stat, index) => (
          <div key={index}>
            <h3 className="m-0 text-[28px] md:text-[34px] leading-none font-bold text-[#006B68]">
              {stat.number}
            </h3>
            <p className="mt-2 text-[13px] md:text-[15px] font-medium text-gray-700">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ================= EXPERT CARDIOLOGY SERVICES ================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full bg-[#F7F9FC] py-[75px] font-[Poppins] overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-[45px] gap-6">
            <div>
              <h2 className="m-0 mb-2 text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-tight text-[#16263D]">
                Expert Cardiology Services
              </h2>
              <p className="m-0 max-w-[650px] text-[15px] sm:text-[16px] leading-[1.7] text-[#59636A]">
                Providing comprehensive heart health solutions with the latest medical advancements and personalized treatment plans.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setServiceDragOffset((prev) => prev + 394)}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#AAB8BB] bg-transparent text-[#006B63] transition-all duration-300 hover:border-[#006B63] hover:bg-[#006B63] hover:text-[#FFFFFF] cursor-pointer"
                aria-label="Previous Services"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setServiceDragOffset((prev) => prev - 394)}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#AAB8BB] bg-transparent text-[#006B63] transition-all duration-300 hover:border-[#006B63] hover:bg-[#006B63] hover:text-[#FFFFFF] cursor-pointer"
                aria-label="Next Services"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={() => setServicesPaused(true)}
          onMouseLeave={() => setServicesPaused(false)}
        >
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-[50px] bg-gradient-to-r from-[#F7F9FC] to-transparent opacity-80 hidden md:block" />
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-[50px] bg-gradient-to-l from-[#F7F9FC] to-transparent opacity-80 hidden md:block" />

          <motion.div
            className="flex gap-[24px] w-max cursor-grab active:cursor-grabbing"
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
            {duplicatedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-white border border-[#D5DDDF] rounded-[18px] p-[30px] w-[85vw] sm:w-[360px] md:w-[370px] min-h-[230px] flex flex-col justify-between shadow-[0_8px_30px_rgba(16,36,61,0.06)] transition-all duration-300 hover:-translate-y-[6px] hover:border-[#36D8C4] hover:shadow-[0_15px_35px_rgba(16,36,61,0.10)] flex-shrink-0"
                >
                  <div>
                    <div className="w-[45px] h-[45px] flex items-center justify-center bg-[#46E0CF] text-[#075E5B] rounded-[10px] mb-4">
                      <Icon size={24} strokeWidth={2} />
                    </div>
                    <h3 className="m-0 mb-3 text-[18px] sm:text-[19px] font-bold leading-tight text-[#16263D]">
                      {service.title}
                    </h3>
                    <p className="m-0 text-[14px] sm:text-[15px] leading-[1.7] text-[#4B5559]">
                      {service.description}
                    </p>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-[6px] mt-4 no-underline text-[#006B68] text-[13px] font-semibold transition-all duration-200 hover:gap-[10px] hover:text-[#004F4D]"
                  >
                    Learn More
                    <ArrowRight size={17} strokeWidth={2.5} />
                  </a>
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/*  WHY CHOOSE OUR PRACTICE   */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-[#eef3ff] py-[75px] font-[Poppins] overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-[45px] gap-6">
            <div className="max-w-[700px]">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#006f6b]/10 px-3.5 py-1 text-[12px] font-semibold tracking-[1.5px] text-[#006f6b]">
                OUR CORE PILLARS
              </div>
              <h2 className="m-0 mb-2 text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-tight text-[#172942]">
                Why Choose Our Practice
              </h2>
              <p className="m-0 text-[15px] sm:text-[16px] leading-[1.7] text-[#59636A]">
                Uncompromising standards of medical excellence and patient-centered hospitality, built on a step-by-step commitment to your care.
              </p>
            </div>

            {/* Manual Controls for Non-Moving Multi-card Carousel */}
            <div className="flex gap-3">
              <button
                onClick={handlePrevFeature}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#ccd3d8] bg-transparent text-[#006f6b] transition-all duration-300 hover:border-[#006f6b] hover:bg-[#006f6b] hover:text-[#FFFFFF] cursor-pointer"
                aria-label="Previous Features"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNextFeature}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#ccd3d8] bg-transparent text-[#006f6b] transition-all duration-300 hover:border-[#006f6b] hover:bg-[#006f6b] hover:text-[#FFFFFF] cursor-pointer"
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
                    className="group relative flex flex-col justify-between rounded-[20px] border border-[#d6e0ea] bg-white p-[32px] w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-h-[250px] shadow-[0_8px_30px_rgba(16,36,61,0.04)] transition-all duration-300 hover:-translate-y-[8px] hover:border-[#006f6b]/40 hover:shadow-[0_15px_35px_rgba(0,111,107,0.10)] overflow-hidden flex-shrink-0"
                  >
                    {/* Background Decorative Step Number */}
                    <span className="absolute right-4 top-2 text-[70px] font-extrabold text-slate-100 transition-colors duration-300 group-hover:text-[#006f6b]/5 select-none pointer-events-none">
                      {stepNumber}
                    </span>

                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-[52px] h-[52px] flex items-center justify-center rounded-[14px] bg-[#E6F4F3] text-[#006f6b] transition-colors duration-300 group-hover:bg-[#006f6b] group-hover:text-white shadow-sm">
                          <Icon size={26} strokeWidth={2.2} />
                        </div>
                        <span className="text-[13px] font-bold tracking-wider text-[#006f6b] bg-[#E6F4F3] px-2.5 py-1 rounded-md">
                          STEP {stepNumber}
                        </span>
                      </div>

                      <h3 className="mb-2 text-[18px] sm:text-[19px] font-bold text-[#172942] group-hover:text-[#006f6b] transition-colors duration-200">
                        {feature.title}
                      </h3>
                      <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[#535b5f]">
                        {feature.text}
                      </p>
                    </div>

                    {/* Bottom Accent Line Animation */}
                    <div className="mt-6 h-[3px] w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-[#006f6b] transform -translate-x-full transition-transform duration-500 group-hover:translate-x-0" />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ================= PATIENT STORIES SECTION ================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-br from-[#F7F9FF] to-[#EEF5F5] py-[75px] overflow-hidden font-[Poppins]"
      >
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-[45px] gap-6">
            <div>
              <h2 className="mb-2 text-[28px] sm:text-[32px] lg:text-[36px] font-bold tracking-[-0.5px] text-[#10243D]">
                Patient Stories
              </h2>
              <p className="max-w-[650px] text-[15px] sm:text-[16px] leading-[1.7] text-[#59636A]">
                Don't just take our word for it—listen to the patients whose lives have been transformed through our specialized care.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPatientDragOffset((prev) => prev + 384)}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#AAB8BB] bg-transparent text-[#006B63] transition-all duration-300 hover:border-[#006B63] hover:bg-[#006B63] hover:text-[#FFFFFF] cursor-pointer"
                aria-label="Previous Testimonials"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setPatientDragOffset((prev) => prev - 384)}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#AAB8BB] bg-transparent text-[#006B63] transition-all duration-300 hover:border-[#006B63] hover:bg-[#006B63] hover:text-[#FFFFFF] cursor-pointer"
                aria-label="Next Testimonials"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={() => setPatientsPaused(true)}
          onMouseLeave={() => setPatientsPaused(false)}
        >
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-[50px] bg-gradient-to-r from-[#F7F9FF] to-transparent opacity-80 hidden md:block" />
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-[50px] bg-gradient-to-l from-[#F7F9FF] to-transparent opacity-80 hidden md:block" />

          <motion.div
            className="flex gap-[24px] w-max cursor-grab active:cursor-grabbing"
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
                className="flex flex-col justify-between w-[85vw] sm:w-[340px] md:w-[360px] min-h-[280px] rounded-[18px] border border-[#D5DDDF] bg-white p-[30px] shadow-[0_8px_30px_rgba(16,36,61,0.06)] transition-all duration-300 hover:-translate-y-[6px] hover:border-[#B8D5D2] hover:shadow-[0_15px_35px_rgba(16,36,61,0.10)] flex-shrink-0"
              >
                <div className="text-[22px] tracking-[2px] text-[#FFB400]">
                  ★★★★★
                </div>
                <p className="my-[14px] flex-1 text-[15px] sm:text-[16px] italic leading-[1.75] text-[#4B5559]">
                  "{patient.review}"
                </p>
                <div className="flex items-center gap-[14px]">
                  <img
                    src={patient.image}
                    alt={patient.name}
                    className="h-[50px] w-[50px] rounded-full object-cover border-2 border-[#E3F1EF]"
                  />
                  <div>
                    <h4 className="m-0 text-[15px] sm:text-[16px] font-semibold text-[#162943]">
                      {patient.name}
                    </h4>
                    <span className="text-[13px] sm:text-[14px] font-normal text-[#687276]">
                      Patient since {patient.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ================= APPOINTMENT CTA SECTION ================= */}
      <section className="bg-[#F7F9FF] px-6 py-20 lg:py-24 font-[Poppins]">
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

export default Home;