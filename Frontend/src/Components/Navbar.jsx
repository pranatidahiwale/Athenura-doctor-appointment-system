import React, { useState } from "react";
import DoctarLogo from "../assets/DoctarLogo.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About Doctor", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Schedule", href: "#schedule" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100/80 bg-white/95 shadow-[0_2px_12px_rgba(15,23,42,0.04)] backdrop-blur-md">
      <nav className="mx-auto flex h-[95px] w-full max-w-[1440px] items-center justify-start px-5 sm:px-8 lg:px-10 xl:px-12">

        {/* ================= LOGO ================= */}
        <a
          href="#home"
          className="flex shrink-0 items-center transition-transform duration-200 hover:scale-[1.02]"
          aria-label="Athenura Home"
        >
          <img
            src={DoctarLogo}
            alt="Athenura Doctor Logo"
            className="h-[99px] w-auto object-contain"
          />
        </a>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <div className="ml-20 hidden items-center lg:flex">

          <ul className="flex items-center gap-12 xl:gap-16">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="group relative whitespace-nowrap text-[14px] font-medium tracking-[0.01em] text-slate-600 transition-colors duration-200 hover:text-[#0F7772]"
                >
                  {item.name}

                  {/* Hover underline */}
                  <span className="absolute -bottom-2 left-0 h-[2px] w-0 rounded-full bg-[#0F7772] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Appointment Button */}
          <a
            href="#appointment"
            className="ml-[120px] inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-[#0F7772] px-6 py-3 text-[14px] font-semibold tracking-[0.01em] text-white shadow-[0_6px_18px_rgba(15,119,114,0.18)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#09625E] hover:shadow-[0_8px_22px_rgba(15,119,114,0.25)] active:translate-y-0"
          >
            Book Appointment
          </a>
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:border-[#0F7772] hover:text-[#0F7772] hover:shadow-md lg:hidden"
        >
          {isMenuOpen ? (
            <span className="text-2xl leading-none">×</span>
          ) : (
            <span className="text-xl leading-none">☰</span>
          )}
        </button>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {isMenuOpen && (
        <div className="border-t border-slate-100 bg-white shadow-lg lg:hidden">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-5 sm:px-8">

            <div className="flex flex-col">

              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="border-b border-slate-100 py-3.5 text-[15px] font-medium text-slate-700 transition-colors duration-200 hover:pl-1 hover:text-[#0F7772]"
                >
                  {item.name}
                </a>
              ))}

              {/* Mobile Appointment */}
              <a
                href="#appointment"
                onClick={() => setIsMenuOpen(false)}
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#0F7772] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(15,119,114,0.18)] transition-all duration-200 hover:bg-[#09625E] hover:shadow-[0_8px_22px_rgba(15,119,114,0.25)]"
              >
                Book Appointment
              </a>

            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;