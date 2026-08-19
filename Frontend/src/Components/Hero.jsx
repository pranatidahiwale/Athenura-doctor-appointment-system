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
    <section className="relative min-h-[750px] overflow-hidden flex items-center font-['Poppins',sans-serif] -mt-[80px]">
      {/* Full Background Image covering the entire hero section */}
      <img
        src={DoctorHero}
        alt="Doctor"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-12 flex flex-col items-start relative">

            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-[#008f83] shadow-sm border border-[#d8ebe7]">
              <ShieldCheck size={14} className="text-[#008f83]" />
              <span>Trusted Healthcare Platform</span>
            </div>

            {/* Heading - Polished with specific font sizes & line height */}
            <h1 className="text-[34px] sm:text-[44px] lg:text-[52px] font-bold tracking-[-1px] text-[#173f3a] leading-[1.08] drop-shadow-sm font-['Poppins',sans-serif]">
              Advanced Wellness & <br />
              <span className="text-[#008f83]">
                Digital Medical Care
              </span>
            </h1>

            

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
              to="/appointment"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#008f83] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#008f83]/20 transition-all hover:-translate-y-0.5 hover:bg-[#00766d]"
              >
              <span>Book Appointment</span>
              <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
              />
              </Link>

              <Link
            to="/services"
             className="group inline-flex items-center gap-2 rounded-xl border border-[#b8ddd8] bg-white/90 backdrop-blur-md px-7 py-3.5 text-sm font-semibold text-[#315a55] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white"
               >
             <span>View Services</span>
              <ArrowRight
             size={16}
              className="transition-transform group-hover:translate-x-1 text-[#008f83]"
             />
             </Link>
            </div>

            {/* Small Modern Feature Cards */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">

              <div className="flex items-center gap-3 rounded-xl border border-[#d8ebe7]/80 bg-white/95 p-3 shadow-md backdrop-blur-md transition-all hover:border-[#008f83]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e4f6f3] text-[#008f83]">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#315a55]">Verified</h3>
                  <p className="text-[10px] text-[#7b918e]">Professionals</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-[#d8ebe7]/80 bg-white/95 p-3 shadow-md backdrop-blur-md transition-all hover:border-[#008f83]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e4f6f3] text-[#008f83]">
                  <CalendarCheck size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#315a55]">Instant</h3>
                  <p className="text-[10px] text-[#7b918e]">Easy Booking</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-[#d8ebe7]/80 bg-white/95 p-3 shadow-md backdrop-blur-md transition-all hover:border-[#008f83]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e4f6f3] text-[#008f83]">
                  <Headphones size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#315a55]">24/7</h3>
                  <p className="text-[10px] text-[#7b918e]">Support</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-[#d8ebe7]/80 bg-white/95 p-3 shadow-md backdrop-blur-md transition-all hover:border-[#008f83]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e4f6f3] text-[#008f83]">
                  <Star size={16} className="fill-[#008f83]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#315a55]">4.9 / 5</h3>
                  <p className="text-[10px] text-[#7b918e]">Rating</p>
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