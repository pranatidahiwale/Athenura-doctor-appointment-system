import React from "react";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0a0f1d] border-t border-slate-800 px-6 sm:px-10 lg:px-12 pt-14 pb-8 font-[Poppins,sans-serif]">
      
      {/* Main Footer */}
      <div className="mx-auto max-w-[1250px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.1fr_1.2fr] gap-10 lg:gap-14">

        {/* About */}
        <div>
          <p className="text-[14px] leading-[1.8] text-slate-400 font-normal">
            Leading the way in cardiovascular care
            <br />
            and patient-centric healthcare
            <br />
            management.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-5">
            <a
              href="#"
              className="w-9 h-9 rounded-full border border-slate-700 bg-slate-900/50 flex items-center justify-center text-slate-300 hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-all duration-200"
            >
              <FaFacebookF size={16} />
            </a>

            <a
              href="#"
              className="w-9 h-9 rounded-full border border-slate-700 bg-slate-900/50 flex items-center justify-center text-slate-300 hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-all duration-200"
            >
              <FaInstagram size={16} />
            </a>

            <a
              href="#"
              className="w-9 h-9 rounded-full border border-slate-700 bg-slate-900/50 flex items-center justify-center text-slate-300 hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-all duration-200"
            >
              <FaLinkedinIn size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[13px] font-semibold tracking-wider text-white mb-5 uppercase">
            Quick Links
          </h4>

          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              About Doctor
            </a>

            <a
              href="#"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              Services
            </a>

            <a
              href="#"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              Schedule
            </a>

            <a
              href="#"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-[13px] font-semibold tracking-wider text-white mb-5 uppercase">
            Services
          </h4>

          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              Cardiac Screening
            </a>

            <a
              href="#"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              ECG Testing
            </a>

            <a
              href="#"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              Heart Monitoring
            </a>

            <a
              href="#"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              Consultation
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-[13px] font-semibold tracking-wider text-white mb-5 uppercase">
            Contact Info
          </h4>

          <div className="flex flex-col gap-4">

            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin
                size={18}
                className="text-teal-400 shrink-0 mt-0.5"
              />

              <span className="text-[14px] leading-[1.6] text-slate-400">
                123 Medical Center Way, Pune,
                <br />
                Maharashtra
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <Phone
                size={16}
                className="text-teal-400 shrink-0"
              />

              <span className="text-[14px] text-slate-400">
                (555) 0123-4567
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail
                size={16}
                className="text-teal-400 shrink-0"
              />

              <span className="text-[14px] text-slate-400">
                care@xyzmail.com
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mx-auto max-w-[1250px] mt-10">

        {/* Divider */}
        <div className="h-px w-full bg-slate-800"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6">

          {/* Copyright */}
          <p className="text-[12px] text-slate-500">
            © 2026 Cardiovascular Care. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#"
              className="text-[12px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-[12px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              Terms of Service
            </a>

            <a
              href="#"
              className="text-[12px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              HIPAA Compliance
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;