import React, { useState } from "react";

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
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white">
      <nav className="mx-auto flex min-h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">

        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-bold text-[#0F7772]"
        >
          Athenura
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center lg:flex">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-slate-700 transition hover:text-[#0F7772]"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#appointment"
            className="ml-8 rounded-lg bg-[#0F7772] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#09625E]"
          >
            Book Appointment
          </a>
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg border border-slate-200 px-3 py-2 lg:hidden"
        >
          ☰
        </button>

      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-100 bg-white p-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-slate-700"
              >
                {item.name}
              </a>
            ))}

            <a
              href="#appointment"
              className="rounded-lg bg-[#0F7772] px-5 py-3 text-center text-sm font-medium text-white"
            >
              Book Appointment
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;