import React from "react";
import { Link } from "react-router-dom";
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
    <footer className="w-full bg-black border-t border-slate-800 px-6 sm:px-10 lg:px-12 pt-14 pb-8 font-[Poppins,sans-serif]">
      
      
      <div className="mx-auto max-w-[1250px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

        
        <div>
          {/*Logo*/}
          <div className="flex items-center -mt-6 -ml-2 mb-2">
            <img 
              src="/Footer-logo.jpg" 
              alt="Athenura Logo" 
              className="w-28 h-28 object-contain rounded-md"
            />
          </div>

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
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-slate-700 bg-slate-900/50 flex items-center justify-center text-slate-300 hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-all duration-200"
            >
              <FaFacebookF size={16} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-slate-700 bg-slate-900/50 flex items-center justify-center text-slate-300 hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-all duration-200"
            >
              <FaInstagram size={16} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full border border-slate-700 bg-slate-900/50 flex items-center justify-center text-slate-300 hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-all duration-200"
            >
              <FaLinkedinIn size={16} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-[13px] font-semibold tracking-wider text-white mb-5 uppercase">
            Quick Links
          </h4>

          <div className="flex flex-col gap-3">
            <Link
              to="/aboutdoctor"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              About Doctor
            </Link>

            <Link
              to="/services"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              Services
            </Link>

            <Link
              to="/schedule"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              Schedule
            </Link>

            <Link
              to="/testimonials"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              Testimonials
            </Link>

            <Link
              to="/faq"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              FAQ
            </Link>

            <Link
              to="/contact"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Column 3: Services */}
        <div>
          <h4 className="text-[13px] font-semibold tracking-wider text-white mb-5 uppercase">
            Services
          </h4>

          <div className="flex flex-col gap-3">
            <Link
              to="/services"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              Cardiac Screening
            </Link>

            <Link
              to="/services"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              ECG Testing
            </Link>

            <Link
              to="/services"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              Heart Monitoring
            </Link>

            <Link
              to="/services"
              className="text-[14px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              Consultation
            </Link>
          </div>
        </div>

        {/* Column 4: Contact Info */}
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
            © 2026 ATHENURA. All rights reserved.
          </p>

          {/* Developed By - Center */}
    <p className="text-[12px] text-slate-500 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
      Developed and Designed by{" "}
      <a
        href="https://www.athenura.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-teal-400 hover:text-teal-300 transition-colors font-medium"
      >
        Athenura
      </a>
    </p>


          {/* Legal Links */}
          <div className="flex flex-wrap items-center gap-6">
            <Link
              to="/privacy-policy"
              className="text-[12px] text-slate-400 hover:text-teal-400 transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-of-service"
               className="text-[12px] text-slate-400 hover:text-teal-400 transition-colors"
              >
              Terms of Service
                </Link>

            <Link
             to="/hipaa-compliance"
           className="text-[12px] text-slate-400 hover:text-teal-400 transition-colors"
              >
            HIPAA Compliance
           </Link>

           
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;