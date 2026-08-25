import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
  ShieldCheck,
  Lock,
  FileText,
  Users,
  AlertTriangle,
  Mail,
  Phone,
  CheckCircle2,
  Building2,
  Eye,
  Server,
  ClipboardCheck,
  KeyRound,
  UserCheck,
  FileLock2,
  BellRing,
  Download,
  ArrowRight,
} from "lucide-react";

/* -------------------------------------------------------------------------
   Design tokens — shared with the rest of the clinic site (AboutDoctor.jsx)
------------------------------------------------------------------------- */
const TOKENS = {
  ink: "#0E2A3F",
  inkSoft: "#33475A",
  paper: "#FBF9F5",
  paperAlt: "#F2F6F5",
  teal: "#1F6F66",
  tealDark: "#154F49",
  cyan: "#6FB6C4",
  mint: "#DCEFEA",
  slate: "#63727A",
  line: "#E4E1D8",
  amber: "#B9862E",
};

const GlobalStyles = () => (
  <style>{`
    .hip-root {
      --ink: ${TOKENS.ink};
      --ink-soft: ${TOKENS.inkSoft};
      --paper: ${TOKENS.paper};
      --paper-alt: ${TOKENS.paperAlt};
      --teal: ${TOKENS.teal};
      --teal-dark: ${TOKENS.tealDark};
      --cyan: ${TOKENS.cyan};
      --slate: ${TOKENS.slate};
      --line: ${TOKENS.line};
      --amber: ${TOKENS.amber};
      background-color: var(--paper);
      color: var(--ink);
    }

    @keyframes hipFadeUp {
      from { opacity: 0; transform: translateY(22px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes hipFloat {
      0%, 100% { transform: translateY(0px); }
      50%      { transform: translateY(-14px); }
    }
    @keyframes hipPulseDot {
      0%   { box-shadow: 0 0 0 0 rgba(31,111,102,0.45); }
      70%  { box-shadow: 0 0 0 10px rgba(31,111,102,0); }
      100% { box-shadow: 0 0 0 0 rgba(31,111,102,0); }
    }
    @keyframes hipGradientShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes hipDrawLine {
      to { stroke-dashoffset: 0; }
    }
    @keyframes hipLockPulse {
      0%, 100% { transform: scale(1); }
      50%      { transform: scale(1.08); }
    }
    @keyframes hipCountBar {
      from { width: 0%; }
    }

    .hip-reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .hip-reveal.hip-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .hip-hero-bg {
      background: linear-gradient(120deg, #EAF3F2 0%, #FBF9F5 35%, #EFF6F5 65%, #E6F1EE 100%);
      background-size: 220% 220%;
      animation: hipGradientShift 18s ease-in-out infinite;
    }

    .hip-float { animation: hipFloat 6s ease-in-out infinite; }
    .hip-float-slow { animation: hipFloat 9s ease-in-out infinite; }
    .hip-pulse-dot { animation: hipPulseDot 2s infinite; }
    .hip-lock-pulse { animation: hipLockPulse 3.2s ease-in-out infinite; }

    .hip-fade-up-1 { animation: hipFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.05s both; }
    .hip-fade-up-2 { animation: hipFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.18s both; }
    .hip-fade-up-3 { animation: hipFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.30s both; }

    .hip-line-draw {
      stroke-dasharray: 900;
      stroke-dashoffset: 900;
      animation: hipDrawLine 1.8s ease forwards;
    }

    .hip-card-hover {
      transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease;
    }
    .hip-card-hover:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 40px -18px rgba(14,42,63,0.25);
      border-color: var(--cyan);
    }

    .hip-tilt-card {
      position: relative;
      transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
    }
    .hip-tilt-card:hover {
      transform: perspective(800px) rotateX(2deg) rotateY(-2deg) translateY(-4px);
      box-shadow: 0 24px 48px -20px rgba(14,42,63,0.3);
    }
    .hip-tilt-card::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(135deg, var(--teal), transparent 40%, var(--cyan));
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }
    .hip-tilt-card:hover::before { opacity: 1; }

    .hip-progress-fill {
      animation: hipCountBar 1.4s cubic-bezier(0.22,1,0.36,1) forwards;
    }

    .hip-btn-primary { transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease; }
    .hip-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 28px -10px rgba(21,79,73,0.55); }
    .hip-btn-primary:active { transform: translateY(0); }
    .hip-btn-ghost { transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease; }

    .hip-underline-grow { position: relative; }
    .hip-underline-grow::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -4px;
      height: 2px;
      width: 0%;
      background: var(--teal);
      transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
    }
    .hip-underline-grow:hover::after { width: 100%; }

    @media (prefers-reduced-motion: reduce) {
      .hip-root *, .hip-root *::before, .hip-root *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
        scroll-behavior: auto !important;
      }
      .hip-reveal { opacity: 1; transform: none; }
    }
  `}</style>
);

/* -------------------------------------------------------------------------
   Shared helpers
------------------------------------------------------------------------- */
function useReveal(threshold = 0.18) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Safety net: if the browser doesn't support IntersectionObserver,
    // or something on the page (a wrapping container, an error elsewhere,
    // a slow hydration) stops it from ever firing, don't leave the
    // content invisible forever — force it to show after a short delay.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const fallback = setTimeout(() => setVisible(true), 1500);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          clearTimeout(fallback);
          observer.unobserve(node);
        }
      },
      { threshold }
    );
    observer.observe(node);

    // In case the element is already on screen when it mounts (e.g. the
    // page loads already scrolled down), check immediately instead of
    // waiting for a scroll event that may never come.
    const rect = node.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) {
      setVisible(true);
      clearTimeout(fallback);
    }

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [threshold]);

  return [ref, visible];
}

const Reveal = ({ children, className = "", as: Tag = "div", delay = 0, style = {} }) => {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`hip-reveal ${visible ? "hip-visible" : ""} ${className}`}
      style={{ ...style, transitionDelay: visible ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
};

const Eyebrow = ({ children }) => (
  <span
    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold mb-4"
    style={{ color: TOKENS.teal }}
  >
    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: TOKENS.teal }} />
    {children}
  </span>
);

/* -------------------------------------------------------------------------
   Content data
------------------------------------------------------------------------- */
const safeguards = [
  {
    icon: ClipboardCheck,
    title: "Administrative Safeguards",
    description:
      "Every team member completes HIPAA training before touching patient data, and again every year after that.",
    points: [
      "Annual staff training & certification",
      "Documented privacy & security policies",
      "Designated Privacy and Security Officers",
      "Routine risk assessments",
    ],
  },
  {
    icon: Building2,
    title: "Physical Safeguards",
    description:
      "Patient records are protected the same way whether they're in a filing cabinet or a data center.",
    points: [
      "Badge-controlled facility access",
      "Locked records rooms & workstations",
      "Screen-lock policy on every device",
      "Secure disposal of paper records",
    ],
  },
  {
    icon: Server,
    title: "Technical Safeguards",
    description:
      "Every system that touches your health information is encrypted, logged, and access-restricted.",
    points: [
      "AES-256 encryption at rest & in transit",
      "Role-based access controls",
      "Automatic session timeouts",
      "Full audit trail on every record",
    ],
  },
];

const rights = [
  {
    icon: Eye,
    title: "Access your records",
    description: "Request a copy of your medical record at any time, in the format you prefer.",
  },
  {
    icon: FileText,
    title: "Request corrections",
    description: "Ask us to amend information you believe is incomplete or inaccurate.",
  },
  {
    icon: UserCheck,
    title: "Control who sees it",
    description: "Decide who can access your information, and revoke that access whenever you choose.",
  },
  {
    icon: ClipboardCheck,
    title: "Get an accounting",
    description: "Request a list of the disclosures we've made about your health information.",
  },
  {
    icon: BellRing,
    title: "Be notified of a breach",
    description: "If your unsecured information is ever compromised, you'll hear from us within 60 days.",
  },
  {
    icon: FileLock2,
    title: "File a complaint",
    description: "Raise a concern with us or the HHS Office for Civil Rights — without fear of retaliation.",
  },
];

const complianceStats = [
  { label: "Data encrypted at rest & in transit", value: 100 },
  { label: "Staff HIPAA-trained annually", value: 100 },
  { label: "Systems under continuous access logging", value: 100 },
];

/* -------------------------------------------------------------------------
   Sections
------------------------------------------------------------------------- */
const HIPAAHero = () => (
  <section className="relative hip-hero-bg overflow-hidden" aria-label="HIPAA compliance introduction">
    <div className="absolute top-16 left-6 sm:left-16 opacity-15 hip-float-slow" aria-hidden="true">
      <Lock size={56} color={TOKENS.teal} />
    </div>
    <div className="absolute bottom-20 right-8 sm:right-24 opacity-10 hip-float" aria-hidden="true">
      <ShieldCheck size={80} color={TOKENS.ink} />
    </div>

    <div className="relative max-w-4xl mx-auto px-6 sm:px-10 pt-20 pb-20 sm:pt-28 sm:pb-28 text-center">
      <div className="hip-fade-up-1 flex justify-center mb-6">
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
          style={{ backgroundColor: "rgba(31,111,102,0.1)", color: TOKENS.tealDark }}
        >
          <ShieldCheck size={14} /> HIPAA Compliant Practice
        </span>
      </div>

      <div className="hip-fade-up-2 flex justify-center mb-7">
        <div
          className="hip-lock-pulse h-16 w-16 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: TOKENS.tealDark }}
        >
          <Lock size={28} color="white" />
        </div>
      </div>

      <h1 className="hip-fade-up-2 font-serif text-4xl sm:text-5xl leading-[1.08] mb-5" style={{ color: TOKENS.ink }}>
        Your Health Information,
        <br />
        Held in Confidence
      </h1>

      <p className="hip-fade-up-3 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: TOKENS.slate }}>
        Meridian Heart Institute follows the Health Insurance Portability and Accountability Act (HIPAA)
        in full — every record, every system, every conversation. Here's exactly how we protect what you share with us.
      </p>

      <div className="hip-fade-up-3 flex flex-wrap justify-center gap-3 mt-9">
        <a
          href="#safeguards"
          className="hip-btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
          style={{ backgroundColor: TOKENS.tealDark }}
        >
          See our safeguards <ArrowRight size={16} />
        </a>
        <a
          href="#contact-officer"
          className="hip-btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border"
          style={{ borderColor: TOKENS.line, color: TOKENS.ink }}
        >
          Contact our Privacy Officer
        </a>
      </div>
    </div>
  </section>
);

const CommitmentSection = () => (
  <section className="py-20 sm:py-24" style={{ backgroundColor: TOKENS.paper }}>
    <div className="max-w-5xl mx-auto px-6 sm:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <Eyebrow>Our Commitment</Eyebrow>
          <h2 className="font-serif text-3xl sm:text-4xl mb-5" style={{ color: TOKENS.ink }}>
            Privacy isn't a policy binder. It's how we operate.
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: TOKENS.slate }}>
            Under HIPAA, your Protected Health Information (PHI) — everything from your diagnosis to your
            billing details — is legally safeguarded. We treat that as a floor, not a ceiling.
          </p>
          <p className="text-base leading-relaxed" style={{ color: TOKENS.slate }}>
            That means encrypted systems, trained staff, restricted access, and a clear process for every
            request you make about your own records.
          </p>
        </Reveal>

        <Reveal delay={120} className="space-y-5">
          {complianceStats.map((stat, i) => (
            <StatBar key={stat.label} stat={stat} index={i} />
          ))}
        </Reveal>
      </div>
    </div>
  </section>
);

const StatBar = ({ stat, index }) => {
  const [ref, visible] = useReveal(0.4);
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-1.5 text-sm">
        <span style={{ color: TOKENS.inkSoft }}>{stat.label}</span>
        <span className="font-semibold" style={{ color: TOKENS.tealDark }}>
          {stat.value}%
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: TOKENS.line }}>
        {visible && (
          <div
            className="hip-progress-fill h-full rounded-full"
            style={{
              width: `${stat.value}%`,
              backgroundColor: TOKENS.teal,
              animationDelay: `${index * 120}ms`,
            }}
          />
        )}
      </div>
    </div>
  );
};

const SafeguardCard = ({ item, index }) => {
  const [ref, visible] = useReveal(0.15);
  const Icon = item.icon;
  return (
    <div
      ref={ref}
      className={`hip-reveal ${visible ? "hip-visible" : ""} hip-tilt-card rounded-2xl border bg-white p-7 h-full`}
      style={{ borderColor: TOKENS.line, transitionDelay: `${index * 90}ms` }}
    >
      <div
        className="h-12 w-12 rounded-xl flex items-center justify-center mb-5"
        style={{ backgroundColor: "rgba(111,182,196,0.16)" }}
      >
        <Icon size={22} color={TOKENS.tealDark} />
      </div>
      <h3 className="font-serif text-xl mb-2" style={{ color: TOKENS.ink }}>
        {item.title}
      </h3>
      <p className="text-sm leading-relaxed mb-5" style={{ color: TOKENS.slate }}>
        {item.description}
      </p>
      <ul className="space-y-2.5">
        {item.points.map((point) => (
          <li key={point} className="flex items-start gap-2 text-sm" style={{ color: TOKENS.inkSoft }}>
            <CheckCircle2 size={16} color={TOKENS.teal} className="mt-0.5 shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SafeguardsSection = () => (
  <section id="safeguards" className="py-20 sm:py-28" style={{ backgroundColor: TOKENS.paperAlt }}>
    <div className="max-w-6xl mx-auto px-6 sm:px-10">
      <Reveal className="text-center max-w-xl mx-auto mb-14">
        <Eyebrow>The Three Pillars</Eyebrow>
        <h2 className="font-serif text-3xl sm:text-4xl mb-3" style={{ color: TOKENS.ink }}>
          How We Safeguard Your Information
        </h2>
        <p className="text-base leading-relaxed" style={{ color: TOKENS.slate }}>
          HIPAA's Security Rule requires three categories of protection. We've built ours to exceed the minimum.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {safeguards.map((item, index) => (
          <SafeguardCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </div>
  </section>
);

const RightCard = ({ item, index }) => {
  const [ref, visible] = useReveal(0.2);
  const Icon = item.icon;
  return (
    <div
      ref={ref}
      className={`hip-reveal ${visible ? "hip-visible" : ""} hip-card-hover flex items-start gap-4 rounded-2xl border bg-white p-6`}
      style={{ borderColor: TOKENS.line, transitionDelay: `${index * 70}ms` }}
    >
      <div
        className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: "rgba(31,111,102,0.1)" }}
      >
        <Icon size={18} color={TOKENS.teal} />
      </div>
      <div>
        <h3 className="font-semibold text-base mb-1" style={{ color: TOKENS.ink }}>
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: TOKENS.slate }}>
          {item.description}
        </p>
      </div>
    </div>
  );
};

const PatientRightsSection = () => (
  <section className="py-20 sm:py-28" style={{ backgroundColor: TOKENS.paper }}>
    <div className="max-w-6xl mx-auto px-6 sm:px-10">
      <Reveal className="text-center max-w-xl mx-auto mb-14">
        <Eyebrow>Know Your Rights</Eyebrow>
        <h2 className="font-serif text-3xl sm:text-4xl mb-3" style={{ color: TOKENS.ink }}>
          What HIPAA Guarantees You
        </h2>
        <p className="text-base leading-relaxed" style={{ color: TOKENS.slate }}>
          These rights belong to you the moment you become our patient — no request forms required to know about them.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {rights.map((item, index) => (
          <RightCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </div>
  </section>
);

const BreachSection = () => (
  <section className="py-16" style={{ backgroundColor: TOKENS.paperAlt }}>
    <div className="max-w-4xl mx-auto px-6 sm:px-10">
      <Reveal
        className="rounded-2xl border p-8 sm:p-10 flex flex-col sm:flex-row gap-6 items-start"
        style={{ borderColor: TOKENS.line, backgroundColor: "white" }}
      >
        <div
          className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: "rgba(185,134,46,0.14)" }}
        >
          <AlertTriangle size={22} color={TOKENS.amber} />
        </div>
        <div>
          <h3 className="font-serif text-xl mb-2" style={{ color: TOKENS.ink }}>
            If something ever goes wrong
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: TOKENS.slate }}>
            In the unlikely event that your unsecured health information is compromised, our Breach
            Notification policy requires us to notify you in writing within 60 days of discovery, explain
            what happened and what data was involved, and outline the steps we've taken — and the steps
            you can take — in response. We also report qualifying breaches to the HHS Office for Civil Rights.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

const ComplianceContactSection = () => (
  <section id="contact-officer" className="py-20 sm:py-28" style={{ backgroundColor: TOKENS.paper }}>
    <div className="max-w-4xl mx-auto px-6 sm:px-10">
      <Reveal
        className="rounded-3xl p-9 sm:p-12 text-center"
        style={{ backgroundColor: TOKENS.tealDark }}
      >
        <div className="flex justify-center mb-5">
          <div className="h-14 w-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
            <Users size={24} color="white" />
          </div>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-white mb-3">Questions About Your Privacy?</h2>
        <p className="text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.82)" }}>
          Our designated Privacy Officer reviews every request personally — whether it's accessing your
          records, filing a complaint, or just understanding how your data is used.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-white">
          <span className="inline-flex items-center gap-2">
            <Mail size={16} /> privacy@meridianheart.example
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone size={16} /> (555) 019-2231
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#"
            className="hip-btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            style={{ backgroundColor: "white", color: TOKENS.tealDark }}
          >
            <Download size={16} /> Notice of Privacy Practices
          </a>
          <a
            href="#"
            className="hip-btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border border-white text-white"
          >
            File a Records Request
          </a>
        </div>
      </Reveal>

      <p className="text-center text-xs mt-6" style={{ color: TOKENS.slate }}>
        You may also file a complaint with the U.S. Department of Health &amp; Human Services, Office for
        Civil Rights, without retaliation from our practice.
      </p>
    </div>
  </section>
);

/* -------------------------------------------------------------------------
   Page
------------------------------------------------------------------------- */
export default function HIPAACompliancePage() {
  return (
<>
  <Navbar />

    <div className="hip-root min-h-screen" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <GlobalStyles />
      <style>{`.hip-root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; } .hip-root h1, .hip-root h2, .hip-root h3, .font-serif { font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif; }`}</style>
      <HIPAAHero />
      <CommitmentSection />
      <SafeguardsSection />
      <PatientRightsSection />
      <BreachSection />
            <ComplianceContactSection />
    </div>

    <Footer />
  </>
);
}
