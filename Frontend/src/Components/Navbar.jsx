import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Calendar, User } from "lucide-react";
import DoctorLogo from "../assets/DoctarLogo.jpg";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Doctor", path: "/aboutdoctor" },
    { name: "Services", path: "/services" },
    { name: "Schedule", path: "/schedule" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 left-0 w-full z-[1000] font-['Poppins',sans-serif] bg-transparent">
      <nav
        className={`w-full h-[72px] border-b transition-all duration-300 px-6 flex items-center justify-between ${
          scrolled
            ? "bg-[rgba(255,255,255,0.96)] shadow-md border-slate-200 backdrop-blur-[18px]"
            : "bg-[rgba(255,255,255,0.92)] border-slate-200/60 backdrop-blur-[18px]"
        }`}
      >
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-14 w-36 items-center justify-start overflow-hidden">
            <img 
              src={DoctorLogo} 
              alt="Athenura Logo" 
              className="h-full w-auto object-contain scale-150 origin-left"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 text-[15px] font-medium transition-all duration-200 ${
                  isActive
                    ? "text-[#008F87] font-semibold border-b-2 border-[#008F87]"
                    : "text-[#294946] hover:text-[#008F87]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side - Custom Login & Book Buttons (Pehle Jaise Rounded) */}
        <div className="hidden lg:flex items-center gap-[8px]">
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-[999px] bg-[#008F87] px-[20px] py-[10px] text-[14px] font-semibold text-white shadow-[0_5px_15px_rgba(0,143,135,0.18)] transition-all duration-200 hover:bg-[#007A73] hover:shadow-[0_8px_20px_rgba(0,143,135,0.25)] hover:-translate-y-[2px] active:scale-[0.97]"
          >
            <User size={16} />
            Login
          </Link>

          <Link
            to="/appointment"
            className="flex items-center gap-2 rounded-[999px] border border-[rgba(0,143,135,0.2)] bg-transparent px-[22px] py-[11px] text-[14px] font-semibold text-[#008F87] transition-all duration-200 hover:bg-[rgba(0,143,135,0.06)] active:scale-[0.97]"
          >
            <Calendar size={15} />
            Book
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(0,143,135,0.12)] bg-[#E6F4F3] text-[#008F87] transition hover:bg-[#d5eeee] lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="absolute left-0 right-0 top-[72px] border-b border-slate-200 bg-[#FFFFFF] p-6 shadow-lg lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-[rgba(0,143,135,0.08)] text-[#008F87] font-semibold"
                        : "text-[#294946] hover:bg-slate-50 hover:text-[#008F87]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="my-2 h-px bg-slate-100" />

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-[999px] bg-[#008F87] px-[20px] py-[10px] text-center text-sm font-semibold text-white shadow-[0_7px_18px_rgba(0,143,135,0.20)]"
                >
                  <User size={16} />
                  Login
                </Link>

                <Link
                  to="/appointment"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-[999px] border border-[rgba(0,143,135,0.2)] bg-transparent px-[22px] py-[11px] text-center text-sm font-semibold text-[#008F87]"
                >
                  <Calendar size={15} />
                  Book
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;