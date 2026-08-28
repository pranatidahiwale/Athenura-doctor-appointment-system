 import React, { useState } from "react";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import {
  Plus,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  ShieldCheck,
  Calendar,
  TrendingUp,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";

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

export default function MedicaCareLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email or phone number is required";
    } else if (
      email.includes("@") &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  
  try {
    // Replace "http://localhost:5000" with your live backend URL later if needed
    const response = await fetch("http://localhost:5000/api/doctors/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Pass your token or payload here (e.g., Firebase ID token or Google credential)
      body: JSON.stringify({ 
        token: /* your token variable here */ 
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log("Login successful:", data);
      // Handle successful login (e.g., save token, redirect user)
    } else {
      console.error("Login failed:", data.message);
    }
    
  } catch (error) {
    console.error("Network or server error:", error);
  }
};

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const response = await fetch("http://localhost:5000/api/doctors/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/doctor-dashboard");
      } else {
        alert(data.message || "Google login failed");
      }
    } catch (err) {
      // Gracefully handle popup cancellation or closure by the user
      if (err.code === "auth/cancelled-popup-request" || err.code === "auth/popup-closed-by-user") {
        console.log("Google popup was closed or cancelled by the user.");
        return;
      }
      
      console.error("Google login error:", err);
      alert("Google sign-in failed. Please try again.");
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
            className="mb-8 lg:mb-10"
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
            Better care starts{" "}
            <span className="text-cyan-400">here.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-5 max-w-sm text-base text-slate-500"
          >
            Access your dashboard to manage appointments, patients and your
            clinic with complete ease.
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
                initial={{ opacity: 0, x: -24, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.4 + 0.15 * index,
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

          <DotGrid
            className="pointer-events-none absolute right-8 top-24 opacity-40"
            rows={6}
            cols={4}
          />
          <DotGrid
            className="pointer-events-none absolute bottom-24 right-10 opacity-30"
            rows={6}
            cols={4}
          />

          <div className="relative z-10 flex flex-1 items-center justify-center py-10">
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
                className="flex flex-col items-center"
              >
                <motion.div
                  variants={fieldVariants}
                  className="relative mb-6 flex h-20 w-20 items-center justify-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40"
                  >
                    <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-400" />
                    <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-400" />
                  </motion.div>
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, #0f3a42 0%, #0a2530 80%)",
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
                      <Plus className="h-6 w-6" strokeWidth={3} />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.h2
                  variants={fieldVariants}
                  className="text-3xl font-bold text-white"
                >
                  Welcome <span className="text-cyan-400">Back!</span>
                </motion.h2>
                <motion.p
                  variants={fieldVariants}
                  className="mt-2 text-sm text-gray-400"
                >
                  Login to continue to your account
                </motion.p>

                <form onSubmit={handleLogin} className="w-full">
                  <motion.div
                    variants={fieldVariants}
                    className="mt-8 w-full"
                  >
                    <div
                      className={`flex items-center gap-3 rounded-xl border bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-cyan-400 ${
                        errors.email ? "border-red-500" : "border-white/10"
                      }`}
                    >
                      <Mail className="h-4 w-4 flex-shrink-0 text-gray-400" />
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        placeholder="Email or Phone Number"
                        className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                    )}
                  </motion.div>

                  <motion.div
                    variants={fieldVariants}
                    className="mt-4 w-full"
                  >
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
                        placeholder="Password"
                        className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="flex-shrink-0 text-gray-400 transition-colors duration-200 hover:text-gray-200"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>
                    )}
                  </motion.div>

                  <motion.div
                    variants={fieldVariants}
                    className="mt-3 flex w-full items-center justify-between"
                  >
                    <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-400">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-3.5 w-3.5 cursor-pointer rounded border-white/20 bg-white/5 text-cyan-400 accent-cyan-400"
                      />
                      Remember Me
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-cyan-400 transition-all duration-200 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </motion.div>

                  <motion.div variants={fieldVariants} className="mt-6 w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-500 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-shadow duration-200 hover:shadow-cyan-400/40"
                    >
                      Login to Account
                      <motion.span
                        variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                        initial="rest"
                        animate="rest"
                        whileHover="hover"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </motion.span>
                    </motion.button>
                  </motion.div>
                </form>

                <motion.div
                  variants={fieldVariants}
                  className="mt-7 flex w-full items-center gap-3"
                >
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs text-gray-500">
                    or continue with
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </motion.div>

                <motion.div
                  variants={fieldVariants}
                  className="mt-5 w-full"
                >
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleLogin}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 48 48">
                      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                    </svg>
                    Google
                  </motion.button>
                </motion.div>

                <motion.p
                  variants={fieldVariants}
                  className="mt-6 text-center text-sm text-gray-400"
                >
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-cyan-400 transition-colors duration-200 hover:text-cyan-300"
                  >
                    Create Account
                  </Link>
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
