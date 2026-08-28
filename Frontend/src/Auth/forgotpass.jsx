import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Calendar,
  TrendingUp,
  CheckCircle2,
  KeyRound,
} from "lucide-react";
 
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
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stepVariants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.35, ease: "easeOut" } },
};

function EmailStep({ email, setEmail, error, onSubmit }) {
  return (
    <motion.div key="email" variants={stepVariants} initial="hidden" animate="show" exit="exit" className="flex flex-col items-center text-center">      <motion.div
        variants={fieldVariants}
        className="mb-6 flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          background: "radial-gradient(circle, #0f3a42 0%, #0a2530 80%)",
          boxShadow:
            "0 0 0 2px rgba(34,211,238,0.4), 0 0 24px rgba(34,211,238,0.25)",
        }}
      >
        <motion.div
          animate={{ color: ["#ef4444", "#22c55e"] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <Mail className="h-6 w-6" strokeWidth={2} />
        </motion.div>
      </motion.div>

      <motion.h2 variants={fieldVariants} className="text-3xl font-bold text-white">
        Forgot <span className="text-cyan-400">Password?</span>
      </motion.h2>
      <motion.p variants={fieldVariants} className="mt-2 max-w-xs text-sm text-gray-400">
        No worries. Enter the email linked to your account and we'll send a
        password reset link.
      </motion.p>

      <form onSubmit={onSubmit} className="mt-8 w-full">
        <motion.div variants={fieldVariants} className="w-full">
          <div
            className={`flex items-center gap-3 rounded-xl border bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-cyan-400 ${
              error ? "border-red-500" : "border-white/10"
            }`}
          >
            <Mail className="h-4 w-4 flex-shrink-0 text-gray-400" />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              placeholder="Registered Email Address"
              className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
            />
          </div>
          {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
        </motion.div>

        <motion.div variants={fieldVariants} className="mt-6 w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-500 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-shadow duration-200 hover:shadow-cyan-400/40"
          >
            Send Reset Link
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </form>

      <motion.p variants={fieldVariants} className="mt-7 text-center text-sm text-gray-400">
        Remembered your password?{" "}
        <a href="login" className="font-semibold text-cyan-400 transition-colors duration-200 hover:text-cyan-300">
          Back to Login
        </a>
      </motion.p>
    </motion.div>
  );
}

function LinkSentStep({ email, onResend, onBack }) {
  return (
    <motion.div key="sent" variants={stepVariants} initial="hidden" animate="show" exit="exit" className="flex flex-col items-center text-center">      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
        style={{
          background: "radial-gradient(circle, #0f3a42 0%, #0a2530 80%)",
          boxShadow:
            "0 0 0 2px rgba(45,212,191,0.5), 0 0 24px rgba(45,212,191,0.3)",
        }}
      >
        <CheckCircle2 className="h-8 w-8 text-teal-300" strokeWidth={2} />
      </motion.div>

      <h2 className="text-3xl font-bold text-white">
        Check Your <span className="text-cyan-400">Inbox</span>
      </h2>
      <p className="mt-2 max-w-xs text-sm text-gray-400">
        We've sent a password reset link to
      </p>
      <p className="mt-1 text-sm font-semibold text-cyan-300">
        {email || "your email address"}
      </p>

      <div className="mt-8 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-xs text-gray-400">
        Didn't get the email? Check your spam folder, or resend the link
        below.
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onResend}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-500 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-shadow duration-200 hover:shadow-cyan-400/40"
      >
        Resend Link
      </motion.button>

      <button
        onClick={onBack}
        className="mt-5 flex items-center gap-1 text-sm text-gray-400 transition-colors duration-200 hover:text-cyan-300"
      >
        <ChevronLeft className="h-4 w-4" />
        Use a different email
      </button>
    </motion.div>
  );
}

function NewPasswordStep({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirm,
  setShowConfirm,
  errors,
  onSubmit,
}) {
  return (
    <motion.div key="reset" variants={stepVariants} initial="hidden" animate="show" exit="exit" className="flex flex-col items-center text-center">      <motion.div
        variants={fieldVariants}
        className="mb-6 flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          background: "radial-gradient(circle, #0f3a42 0%, #0a2530 80%)",
          boxShadow:
            "0 0 0 2px rgba(34,211,238,0.4), 0 0 24px rgba(34,211,238,0.25)",
        }}
      >
        <KeyRound className="h-6 w-6 text-cyan-300" strokeWidth={2} />
      </motion.div>

      <motion.h2 variants={fieldVariants} className="text-3xl font-bold text-white">
        Create <span className="text-cyan-400">New Password</span>
      </motion.h2>
      <motion.p variants={fieldVariants} className="mt-2 max-w-xs text-sm text-gray-400">
        Your new password must be different from previously used passwords.
      </motion.p>

      <form onSubmit={onSubmit} className="mt-8 w-full">
        <motion.div variants={fieldVariants} className="w-full">
          <div
            className={`flex items-center gap-3 rounded-xl border bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-cyan-400 ${
              errors.password ? "border-red-500" : "border-white/10"
            }`}
          >
            <Lock className="h-4 w-4 flex-shrink-0 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="flex-shrink-0 text-gray-400 transition-colors duration-200 hover:text-gray-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>}
        </motion.div>

        <motion.div variants={fieldVariants} className="mt-4 w-full">
          <div
            className={`flex items-center gap-3 rounded-xl border bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-cyan-400 ${
              errors.confirmPassword ? "border-red-500" : "border-white/10"
            }`}
          >
            <Lock className="h-4 w-4 flex-shrink-0 text-gray-400" />
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="flex-shrink-0 text-gray-400 transition-colors duration-200 hover:text-gray-200"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword}</p>
          )}
        </motion.div>

        <motion.div variants={fieldVariants} className="mt-6 w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-500 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-shadow duration-200 hover:shadow-cyan-400/40"
          >
            Reset Password
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
}

function SuccessStep() {
  return (
    <motion.div key="success" variants={stepVariants} initial="hidden" animate="show" exit="exit" className="flex flex-col items-center text-center">      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
        style={{
          background: "radial-gradient(circle, #0f3a42 0%, #0a2530 80%)",
          boxShadow:
            "0 0 0 2px rgba(45,212,191,0.5), 0 0 24px rgba(45,212,191,0.3)",
        }}
      >
        <CheckCircle2 className="h-8 w-8 text-teal-300" strokeWidth={2} />
      </motion.div>
      <h2 className="text-3xl font-bold text-white">
        Password <span className="text-cyan-400">Reset!</span>
      </h2>
      <p className="mt-2 max-w-xs text-sm text-gray-400">
        Your password has been reset successfully. You can now log in with
        your new password.
      </p>

      <motion.a
        href="login"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-500 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-shadow duration-200 hover:shadow-cyan-400/40"
      >
        Back to Login
        <ChevronRight className="h-4 w-4" />
      </motion.a>
    </motion.div>
  );
}

export default function MedicaCareForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({});

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address");
      return;
    }
    setEmailError("");
    console.log("Password reset link requested for:", email);
    setStep(2);
  };

  const handleResend = () => {
    console.log("Resending reset link to:", email);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setPasswordErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Password reset successful");
      setStep(4);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white font-sans antialiased">
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden lg:flex-row">
        <div className="relative z-10 flex w-full flex-col justify-center bg-gradient-to-br from-white to-cyan-50 px-6 py-10 sm:px-10 lg:w-[45%] lg:px-16 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-10 lg:mb-14"
          >
            <Link to="/">
              <img
            src="/logo1.png"
            alt="Athenura Logo"
            className="h-20 w-auto object-contain"
            />
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="max-w-lg text-5xl font-bold leading-[1.05] text-[#0a2530] lg:text-6xl"
          >
            Secure access, <span className="text-cyan-400">restored.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-5 max-w-sm text-base text-slate-500"
          >
            Recover your account in a few quick steps and get right back to
            managing your clinic.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 40 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="mt-6 h-1 rounded-full bg-teal-400"
          />

          <div className="mt-10 flex flex-col gap-6">
            {[
              { Icon: ShieldCheck, title: "Secure & Private", desc: "Your data is encrypted and protected 24/7" },
              { Icon: Calendar, title: "Smart Scheduling", desc: "Manage appointments and availability effortlessly" },
              { Icon: TrendingUp, title: "Insightful Dashboard", desc: "Track your clinic performance in real-time" },
            ].map(({ Icon, title, desc }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 + 0.5 * index }}
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

        <div className="relative flex w-full flex-1 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0a2a35] to-[#0f3a42] px-6 pb-8 pt-10 sm:px-10 lg:w-[55%] lg:px-16 lg:py-10 rounded-t-[48px] lg:rounded-none">
          <svg
            className="pointer-events-none absolute -left-1 top-0 hidden h-full w-24 lg:block"
            viewBox="0 0 100 800"
            preserveAspectRatio="none"
          >
            <path
              d="M100 0 C 20 150, 20 300, 60 400 C 20 500, 20 650, 100 800 L 0 800 L 0 0 Z"
              fill="#ffffff"
            />
          </svg>

          <DotGrid className="pointer-events-none absolute right-8 top-24 opacity-40" rows={6} cols={4} />
          <DotGrid className="pointer-events-none absolute bottom-24 right-10 opacity-30" rows={6} cols={4} />

          <div className="relative z-10 flex flex-1 items-center justify-center py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl sm:p-10"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center overflow-hidden pt-2"
              >
                <AnimatePresence mode="sync">
                  {step === 1 && (
                    <EmailStep
                      email={email}
                      setEmail={setEmail}
                      error={emailError}
                      onSubmit={handleEmailSubmit}
                    />
                  )}
                  {step === 2 && (
                    <LinkSentStep
                      email={email}
                      onResend={handleResend}
                      onBack={() => setStep(1)}
                    />
                  )}
                  {step === 3 && (
                    <NewPasswordStep
                      password={password}
                      setPassword={setPassword}
                      confirmPassword={confirmPassword}
                      setConfirmPassword={setConfirmPassword}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      showConfirm={showConfirm}
                      setShowConfirm={setShowConfirm}
                      errors={passwordErrors}
                      onSubmit={handlePasswordSubmit}
                    />
                  )}
                  {step === 4 && <SuccessStep />}
                </AnimatePresence>

                {step === 2 && (
                  <button
                    onClick={() => setStep(3)}
                    className="mt-4 text-xs text-gray-500 underline decoration-dotted transition-colors duration-200 hover:text-cyan-300"
                  >
                    (Demo) Simulate clicking the reset link
                  </button>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}