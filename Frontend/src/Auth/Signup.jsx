import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  Building2,
  BadgeCheck,
  ShieldCheck,
  Calendar,
  TrendingUp,
} from "lucide-react";
import logo1 from "../assets/logo1.png";
import { Link } from "react-router-dom";

const DotGrid = ({ className, rows = 6, cols = 6 }) => (
  <div
    className={`grid gap-3 ${className}`}
    style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
  >
    {Array.from({ length: rows * cols }).map((_, i) => (
      <span key={i} className="h-1 w-1 rounded-full bg-cyan-400/30" />
    ))}
  </div>
);

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function MedicaCareRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    clinicName: "",
    clinicAddress: "",
    regNumber: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [errors, setErrors] = useState({});
  const [agreedShake, setAgreedShake] = useState(0);

  const update = (field) => (e) => {
    const value = field === "agreed" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.clinicName.trim()) newErrors.clinicName = "Clinic name is required";
    if (!form.regNumber.trim())
      newErrors.regNumber = "Medical registration number is required";
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (form.confirmPassword !== form.password || !form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!form.agreed) {
      newErrors.agreed = "You must accept the Terms & Conditions";
      setAgreedShake((s) => s + 1);
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Register attempt with:", form);
  };

  return (
    <div className="min-h-screen w-full bg-white font-sans antialiased [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
     <style>{`
        html, body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none;
        }
        @media (min-width: 1024px) and (min-height: 700px) {
          html, body {
            overflow: hidden;
          }
        }
      `}</style>
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden lg:flex-row-reverse">
        <div className="relative z-10 flex w-full flex-col items-stretch justify-center bg-gradient-to-br from-white to-cyan-50 px-6 py-16 sm:px-10 min-h-[55vh] lg:min-h-0 lg:py-10 lg:w-[42%] lg:px-16">          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-10 lg:mb-14"
          >
             <Link to="/">
              <img src={logo1} alt="MedicaCare" className="h-20 w-auto" />
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="max-w-lg text-5xl font-bold leading-[1.05] text-[#0a2530] lg:text-6xl"
          >
            Join and start{" "}
            <span className="text-cyan-400">growing.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-5 max-w-sm text-base text-slate-500"
          >
            Create your clinic account to manage appointments, patients and
            your schedule, all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 40 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="mt-6 h-1 rounded-full bg-teal-400"
          />

          <div className="mt-10 flex flex-col gap-6">
            {[
              {
                Icon: ShieldCheck,
                title: "Secure & Private",
                desc: "Your data is encrypted and protected 24/7",
              },
              {
                Icon: Calendar,
                title: "Smart Scheduling",
                desc: "Manage appointments and availability effortlessly",
              },
              {
                Icon: TrendingUp,
                title: "Insightful Dashboard",
                desc: "Track your clinic performance in real-time",
              },
            ].map(({ Icon, title, desc }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.35 + 0.5 * index,
                }}
                className="flex items-start gap-4"
              >
                <motion.div
                  initial={{ scale: 0, boxShadow: "0 0 0 0 rgba(45,212,191,0)" }}
                  animate={{
                    scale: 1,
                    boxShadow: [
                      "0 0 0 0 rgba(45,212,191,0.6)",
                      "0 0 18px 6px rgba(45,212,191,0.35)",
                      "0 0 0 0 rgba(45,212,191,0)",
                    ],
                  }}
                  transition={{
                    scale: {
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      delay: 0.4 + 0.5 * index,
                    },
                    boxShadow: {
                      duration: 0.9,
                      delay: 0.4 + 0.5 * index,
                      ease: "easeOut",
                    },
                  }}
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-teal-500 shadow-md shadow-slate-200/60"
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </motion.div>
                <div>
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.7 + 0.5 * index }}
                    className="text-sm font-bold text-[#0a2530]"
                  >
                    {title}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 + 0.5 * index }}
                    className="text-sm text-slate-400"
                  >
                    {desc}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative flex w-full flex-col justify-between overflow-hidden bg-gradient-to-bl from-[#0a2a35] to-[#0f3a42] px-6 pb-8 pt-10 sm:px-10 lg:w-[58%] lg:px-16 lg:py-10">
          <svg
            className="pointer-events-none absolute -right-1 top-0 hidden h-full w-24 lg:block"
            viewBox="0 0 100 800"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0 C 80 150, 80 300, 40 400 C 80 500, 80 650, 0 800 L 100 800 L 100 0 Z"
              fill="#ffffff"
            />
          </svg>

          <DotGrid
            className="pointer-events-none absolute left-8 top-24 opacity-40"
            rows={6}
            cols={4}
          />
          <DotGrid
            className="pointer-events-none absolute bottom-24 left-10 opacity-30"
            rows={6}
            cols={4}
          />

          <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-6 sm:px-6">            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-lg mx-auto rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center"
              >
                <motion.h2
                  variants={fieldVariants}
                  className="text-3xl font-bold text-white"
                >
                  Sign <span className="text-cyan-400">Up</span>
                </motion.h2>
                <form onSubmit={handleRegister} className="mt-5 w-full">
                  <motion.p
                    variants={fieldVariants}
                    className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-400"
                  >
                    Personal Information
                  </motion.p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <motion.div variants={fieldVariants}>
                      <div
                        className={`flex items-center gap-3 rounded-xl border bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-cyan-400 ${
                          errors.fullName ? "border-red-500" : "border-white/10"
                        }`}
                      >
                        <User className="h-4 w-4 flex-shrink-0 text-gray-400" />
                        <input
                          type="text"
                          value={form.fullName}
                          onChange={update("fullName")}
                          placeholder="Full Name"
                          className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                        />
                      </div>
                      <p className={`mt-1.5 h-4 text-xs text-red-400 ${errors.fullName ? "opacity-100" : "opacity-0"}`}>
                        {errors.fullName || " "}
                      </p>
                    </motion.div>

                    <motion.div variants={fieldVariants}>
                      <div
                        className={`flex items-center gap-3 rounded-xl border bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-cyan-400 ${
                          errors.phone ? "border-red-500" : "border-white/10"
                        }`}
                      >
                        <Phone className="h-4 w-4 flex-shrink-0 text-gray-400" />
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={update("phone")}
                          placeholder="Phone Number"
                          className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                        />
                      </div>
                      <p className={`mt-1.5 h-4 text-xs text-red-400 ${errors.phone ? "opacity-100" : "opacity-0"}`}>
                        {errors.phone || " "}
                      </p>
                    </motion.div>
                  </div>

                  <motion.div variants={fieldVariants} className="mt-3">
                    <div
                      className={`flex items-center gap-3 rounded-xl border bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-cyan-400 ${
                        errors.email ? "border-red-500" : "border-white/10"
                      }`}
                    >
                      <Mail className="h-4 w-4 flex-shrink-0 text-gray-400" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        placeholder="Email Address"
                        className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                      />
                    </div>
                    <p className={`mt-1.5 h-4 text-xs text-red-400 ${errors.email ? "opacity-100" : "opacity-0"}`}>
                      {errors.email || " "}
                    </p>
                  </motion.div>

                  <motion.p
                    variants={fieldVariants}
                    className="mb-3 mt-4 text-xs font-semibold uppercase tracking-wider text-cyan-400"
                  >
                    Clinic Information
                  </motion.p>

                  <motion.div variants={fieldVariants}>
                    <div
                      className={`flex items-center gap-3 rounded-xl border bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-cyan-400 ${
                        errors.clinicName ? "border-red-500" : "border-white/10"
                      }`}
                    >
                      <Building2 className="h-4 w-4 flex-shrink-0 text-gray-400" />
                      <input
                        type="text"
                        value={form.clinicName}
                        onChange={update("clinicName")}
                        placeholder="Clinic Name"
                        className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                      />
                    </div>
                    <p className={`mt-1.5 h-4 text-xs text-red-400 ${errors.clinicName ? "opacity-100" : "opacity-0"}`}>
                      {errors.clinicName || " "}
                    </p>
                  </motion.div>

                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <motion.div variants={fieldVariants}>
                      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-cyan-400">
                        <Building2 className="h-4 w-4 flex-shrink-0 text-gray-400" />
                        <input
                          type="text"
                          value={form.clinicAddress}
                          onChange={update("clinicAddress")}
                          placeholder="Clinic Address"
                          className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={fieldVariants}>
                      <div
                        className={`flex items-center gap-3 rounded-xl border bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-cyan-400 ${
                          errors.regNumber ? "border-red-500" : "border-white/10"
                        }`}
                      >
                        <BadgeCheck className="h-4 w-4 flex-shrink-0 text-gray-400" />
                        <input
                          type="text"
                          value={form.regNumber}
                          onChange={update("regNumber")}
                          placeholder="Medical Registration No."
                          className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                        />
                      </div>
                      <p className={`mt-1.5 h-4 text-xs text-red-400 ${errors.regNumber ? "opacity-100" : "opacity-0"}`}>
                        {errors.regNumber || " "}
                      </p>
                    </motion.div>
                  </div>

                  <motion.p
                    variants={fieldVariants}
                    className="mb-3 mt-4 text-xs font-semibold uppercase tracking-wider text-cyan-400"
                  >
                    Set Password
                  </motion.p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <motion.div variants={fieldVariants}>
                      <div
                        className={`flex items-center gap-3 rounded-xl border bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-cyan-400 ${
                          errors.password ? "border-red-500" : "border-white/10"
                        }`}
                      >
                        <Lock className="h-4 w-4 flex-shrink-0 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={form.password}
                          onChange={update("password")}
                          placeholder="Password"
                          className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="flex-shrink-0 text-gray-400 transition-colors duration-200 hover:text-gray-200"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <p className={`mt-1.5 h-4 text-xs text-red-400 ${errors.password ? "opacity-100" : "opacity-0"}`}>
                        {errors.password || " "}
                      </p>
                    </motion.div>

                    <motion.div variants={fieldVariants}>
                      <div
                        className={`flex items-center gap-3 rounded-xl border bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-cyan-400 ${
                          errors.confirmPassword ? "border-red-500" : "border-white/10"
                        }`}
                      >
                        <Lock className="h-4 w-4 flex-shrink-0 text-gray-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={form.confirmPassword}
                          onChange={update("confirmPassword")}
                          placeholder="Confirm Password"
                          className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((s) => !s)}
                          className="flex-shrink-0 text-gray-400 transition-colors duration-200 hover:text-gray-200"
                          aria-label={
                            showConfirmPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <p className={`mt-1.5 h-4 text-xs text-red-400 ${errors.confirmPassword ? "opacity-100" : "opacity-0"}`}>
                        {errors.confirmPassword || " "}
                      </p>
                    </motion.div>
                  </div>

                  <motion.div variants={fieldVariants} className="mt-3">
                    <motion.label
                      key={agreedShake}
                      initial={errors.agreed ? { x: 0 } : false}
                      animate={errors.agreed ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className={`flex cursor-pointer items-start gap-2 text-xs ${
                        errors.agreed ? "text-red-400" : "text-gray-400"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.agreed}
                        onChange={update("agreed")}
                        className="mt-0.5 h-3.5 w-3.5 cursor-pointer rounded border-white/20 bg-white/5 text-cyan-400 accent-cyan-400"
                      />
                      <span>
                        I agree to the{" "}
                        <a
                          href="#"
                          className={`hover:underline ${errors.agreed ? "text-red-400" : "text-cyan-400"}`}
                        >
                          Terms &amp; Conditions
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className={`hover:underline ${errors.agreed ? "text-red-400" : "text-cyan-400"}`}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </motion.label>
                  </motion.div>

                  <motion.div
                    variants={fieldVariants}
                    className="mt-4 flex w-full flex-col items-center justify-between gap-3 sm:flex-row"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-500 px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-shadow duration-200 hover:shadow-cyan-400/40"
                    >
                      Create Account
                      <motion.span
                        variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                        initial="rest"
                        animate="rest"
                        whileHover="hover"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </motion.span>
                    </motion.button>

                    <p className="text-sm text-gray-400">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="font-semibold text-cyan-400 transition-colors duration-200 hover:text-cyan-300"
                      >
                        Login
                      </Link>
                    </p>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}