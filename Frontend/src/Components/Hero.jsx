import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  CalendarCheck,
  Headphones,
  Star,
  ShieldCheck,
} from "lucide-react";

import DoctorHero from "../assets/Hero-section/Hero-Img.png";

const Hero = () => {
  return (
    <section className="relative min-h-[650px] sm:min-h-[700px] lg:min-h-[750px] overflow-hidden flex items-center font-['Poppins',sans-serif] -mt-[80px]">
      
      <img
        src={DoctorHero}
        alt="Doctor"
        className="absolute inset-0 h-full w-full object-cover object-[72%_center] sm:object-center"
      />

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-12 flex flex-col items-start relative max-w-full">

            {/* Badge */}
            <div className="mb-3 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/90 backdrop-blur-md px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-semibold text-[#008f83] shadow-sm border border-[#d8ebe7]">
              <ShieldCheck size={14} className="text-[#008f83] shrink-0" />
              <span>Trusted Healthcare Platform</span>
            </div>

            {/* Heading - Explicit desktop vs mobile break handling with anti-overlap spacing */}
            <h1 className="text-[25px] xs:text-[28px] sm:text-[44px] lg:text-[52px] font-bold tracking-[-1px] text-[#173f3a] leading-[1.35] sm:leading-[1.08] drop-shadow-sm font-['Poppins',sans-serif] w-full">
              <span className="block sm:hidden">
                Advanced Wellness & <br />
                <span className="text-[#008f83]">Digital Medical Care</span>
              </span>
              <span className="hidden sm:block">
                Advanced Wellness & <br />
                <span className="text-[#008f83]">
                  Digital Medical Care
                </span>
              </span>
            </h1>

            
            <div className="mt-6 sm:mt-8 flex flex-row gap-2 sm:gap-4 w-full sm:w-auto">
              <Link
                to="/appointment"
                className="group flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-[#008f83] px-2.5 xs:px-4 sm:px-7 py-3 sm:py-3.5 text-[11px] xs:text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#008f83]/20 transition-all hover:-translate-y-0.5 hover:bg-[#00766d] text-center"
              >
                <span className="truncate">Book Appointment</span>
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1 shrink-0"
                />
              </Link>

              <Link
                to="/services"
                className="group flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-[#b8ddd8] bg-white/90 backdrop-blur-md px-2.5 xs:px-4 sm:px-7 py-3 sm:py-3.5 text-[11px] xs:text-xs sm:text-sm font-semibold text-[#315a55] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white text-center"
              >
                <span className="truncate">View Services</span>
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1 text-[#008f83] shrink-0"
                />
              </Link>
            </div>

            {/* Small Modern Feature Cards */}
            <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-2xl">

              <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-[#d8ebe7]/80 bg-white/95 p-2.5 sm:p-3 shadow-md backdrop-blur-md transition-all hover:border-[#008f83]">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-[#e4f6f3] text-[#008f83]">
                  <CheckCircle2 size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[11px] sm:text-xs font-bold text-[#315a55] truncate">Verified</h3>
                  <p className="text-[9px] sm:text-[10px] text-[#7b918e] truncate">Professionals</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-[#d8ebe7]/80 bg-white/95 p-2.5 sm:p-3 shadow-md backdrop-blur-md transition-all hover:border-[#008f83]">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-[#e4f6f3] text-[#008f83]">
                  <CalendarCheck size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[11px] sm:text-xs font-bold text-[#315a55] truncate">Instant</h3>
                  <p className="text-[9px] sm:text-[10px] text-[#7b918e] truncate">Easy Booking</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-[#d8ebe7]/80 bg-white/95 p-2.5 sm:p-3 shadow-md backdrop-blur-md transition-all hover:border-[#008f83]">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-[#e4f6f3] text-[#008f83]">
                  <Headphones size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[11px] sm:text-xs font-bold text-[#315a55] truncate">24/7</h3>
                  <p className="text-[9px] sm:text-[10px] text-[#7b918e] truncate">Support</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-[#d8ebe7]/80 bg-white/95 p-2.5 sm:p-3 shadow-md backdrop-blur-md transition-all hover:border-[#008f83]">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-[#e4f6f3] text-[#008f83]">
                  <Star size={16} className="fill-[#008f83]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[11px] sm:text-xs font-bold text-[#315a55] truncate">4.9 / 5</h3>
                  <p className="text-[9px] sm:text-[10px] text-[#7b918e] truncate">Rating</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;