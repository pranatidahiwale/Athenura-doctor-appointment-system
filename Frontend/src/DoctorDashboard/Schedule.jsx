import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Sun,
  Moon,
  SlidersHorizontal,
  Clock,
  Save,
  Info,
  ChevronDown,
} from "lucide-react";

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');
`;

const DAYS = [
  { key: "Mon", enabled: true },
  { key: "Tue", enabled: true },
  { key: "Wed", enabled: true },
  { key: "Thu", enabled: true },
  { key: "Fri", enabled: true },
  { key: "Sat", enabled: true },
  { key: "Sun", enabled: true },
];

function DayToggle({ day, active, onToggle, disabled }) {
  return (
    <motion.button
      onClick={() => !disabled && onToggle(day)}
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 rounded-xl px-1 py-2.5 sm:py-3 aspect-square"
      style={{
        border: `1px solid ${active ? "#0B6E4F" : "#E3ECE7"}`,
        background: active ? "#F1FAF6" : "#FBFEFC",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <span
        className="text-[13px] font-semibold"
        style={{ color: disabled ? "#B7C6BE" : active ? "#0B6E4F" : "#3F5B50" }}
      >
        {day}
      </span>
      <span
        className="h-5 w-5 rounded-full flex items-center justify-center"
        style={{
          border: `2px solid ${
            disabled ? "#DCE7E1" : active ? "#0B6E4F" : "#C4D5CC"
          }`,
          background: active ? "#0B6E4F" : "transparent",
        }}
      >
        {active && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-2 w-2 rounded-full bg-white"
          />
        )}
      </span>
    </motion.button>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-11 h-6 rounded-full relative shrink-0 transition-colors"
      style={{ background: checked ? "#0B6E4F" : "#D8E3DD" }}
    >
      <motion.span
        className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm"
        animate={{ left: checked ? 22 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      />
    </button>
  );
}

function TimeField({ label, value, onChange, disabled }) {
  return (
    <div>
      <p className="text-[12px] font-medium mb-1.5" style={{ color: "#63796F" }}>
        {label}
      </p>
      <div
        className="flex items-center gap-2 rounded-xl px-3 py-2.5"
        style={{ border: "1px solid #DCEAE3", background: "#FBFEFC" }}
      >
        <Clock size={14} color="#8AA398" />
        <input
          type="text"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="text-[13.5px] font-medium outline-none bg-transparent w-full"
          style={{ color: "#0E271F" }}
        />
      </div>
    </div>
  );
}

function SelectField({ label, hint, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <p className="text-[13px] font-semibold mb-0.5" style={{ color: "#0E271F" }}>
        {label}
      </p>
      <p className="text-[12px] mb-2" style={{ color: "#8AA398" }}>
        {hint}
      </p>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between rounded-xl px-3.5 py-2.5 w-full"
        style={{ border: "1px solid #DCEAE3", background: "#FBFEFC" }}
      >
        <span className="text-[13.5px] font-medium" style={{ color: "#0E271F" }}>
          {value}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.15 }}>
          <ChevronDown size={15} color="#8AA398" />
        </motion.span>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.15 }}
          className="absolute left-0 right-0 mt-1.5 rounded-xl overflow-hidden z-20"
          style={{
            border: "1px solid #DCEAE3",
            background: "#FFFFFF",
            boxShadow: "0 10px 24px rgba(14,39,31,0.12)",
          }}
        >
          {options.map((opt) => {
            const active = opt === value;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="w-full text-left px-3.5 py-2.5 text-[13.5px] font-medium transition-colors"
                style={{
                  color: active ? "#0B6E4F" : "#3F5B50",
                  background: active ? "#E7F5EE" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = "#F4FAF7";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = "transparent";
                }}
              >
                {opt}
              </button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

function SectionCard({ icon: Icon, title, subtitle, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="rounded-2xl bg-white p-6"
      style={{ border: "1px solid #DCEAE3", boxShadow: "0 1px 2px rgba(14,39,31,0.04)" }}
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div
          className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "#E7F5EE" }}
        >
          <Icon size={16} strokeWidth={2.2} color="#0B6E4F" />
        </div>
        <div>
          <h3
            className="text-[15.5px] font-semibold"
            style={{ fontFamily: "'Fraunces', serif", color: "#0E271F" }}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="text-[12px]" style={{ color: "#8AA398" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children}
    </motion.div>
  );
}

export default function Schedule() {
  const [activeDays, setActiveDays] = useState(
    DAYS.filter((d) => d.enabled).map((d) => d.key)
  );
  const [morningOn, setMorningOn] = useState(true);
  const [eveningOn, setEveningOn] = useState(true);
  const [saved, setSaved] = useState(false);
  const [morningStart, setMorningStart] = useState("09:00 AM");
  const [morningEnd, setMorningEnd] = useState("01:00 PM");
  const [eveningStart, setEveningStart] = useState("04:00 PM");
  const [eveningEnd, setEveningEnd] = useState("08:00 PM");
  const [slotDuration, setSlotDuration] = useState("30 Minutes");
  const [bufferTime, setBufferTime] = useState("10 Minutes");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleDay = (day) => {
    setActiveDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div
      className="min-h-full w-full"
      style={{ background: "#F4FAF7", fontFamily: "'Inter', sans-serif" }}
    >
      <style>{FONT_IMPORT}</style>

      <div className="max-w-6xl mx-auto px-6 py-8 md:px-10 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
        >
          <div>
            <p
              className="text-[11px] font-bold tracking-[0.18em] uppercase mb-1.5"
              style={{ color: "#2FBF87" }}
            >
              Cardiology · Clinic Setup
            </p>
            <h1
              className="text-[32px] md:text-[36px] leading-tight font-semibold"
              style={{ fontFamily: "'Fraunces', serif", color: "#0E271F" }}
            >
              Schedule Management
            </h1>
            <p className="mt-1.5 text-[14.5px]" style={{ color: "#63796F" }}>
              Configure your clinic hours and appointment intervals for
              maximum efficiency.
            </p>
          </div>

          <motion.button
            whileHover={{ y: -1, boxShadow: "0 10px 24px rgba(11,110,79,0.28)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13.5px] font-semibold text-white shrink-0"
            style={{ background: "#0B6E4F" }}
          >
            <Save size={16} strokeWidth={2.2} />
            {saved ? "Saved!" : "Save Changes"}
          </motion.button>
        </motion.div>

        <SectionCard icon={CalendarDays} title="Working Days" delay={0.05}>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3">
            {DAYS.map((d) => (
              <DayToggle
                key={d.key}
                day={d.key}
                disabled={!d.enabled}
                active={activeDays.includes(d.key)}
                onToggle={toggleDay}
              />
            ))}
          </div>
        </SectionCard>

        <div className="grid lg:grid-cols-2 gap-5 mt-5">
          <SectionCard
            icon={Sun}
            title="Morning Session"
            subtitle="Pre-lunch consulting hours"
            delay={0.1}
          >
            <div className="flex justify-end -mt-14 mb-8">
              <Toggle checked={morningOn} onChange={setMorningOn} />
            </div>
            <div
              className="grid grid-cols-1 xs:grid-cols-2 gap-3 transition-opacity"
              style={{ opacity: morningOn ? 1 : 0.4 }}
            >
              <TimeField label="Start Time" value={morningStart} onChange={setMorningStart} disabled={!morningOn} />
              <TimeField label="End Time" value={morningEnd} onChange={setMorningEnd} disabled={!morningOn} />
            </div>
          </SectionCard>

          <SectionCard
            icon={Moon}
            title="Evening Session"
            subtitle="Post-lunch consulting hours"
            delay={0.15}
          >
            <div className="flex justify-end -mt-14 mb-8">
              <Toggle checked={eveningOn} onChange={setEveningOn} />
            </div>
            <div
              className="grid grid-cols-1 xs:grid-cols-2 gap-3 transition-opacity"
              style={{ opacity: eveningOn ? 1 : 0.4 }}
            >
              <TimeField label="Start Time" value={eveningStart} onChange={setEveningStart} disabled={!eveningOn} />
              <TimeField label="End Time" value={eveningEnd} onChange={setEveningEnd} disabled={!eveningOn} />
            </div>
          </SectionCard>
        </div>

        <div className="mt-5">
          <SectionCard
            icon={SlidersHorizontal}
            title="Consultation Settings"
            delay={0.2}
          >
            <div className="grid md:grid-cols-2 gap-5">
              <SelectField
                label="Slot Duration"
                hint="Standard time allocated for a single appointment."
                value={slotDuration}
                onChange={setSlotDuration}
                options={["15 Minutes", "20 Minutes", "30 Minutes", "45 Minutes", "60 Minutes"]}
              />
              <SelectField
                label="Buffer Time"
                hint="Mandatory gap between consecutive sessions."
                value={bufferTime}
                onChange={setBufferTime}
                options={["No Buffer", "5 Minutes", "10 Minutes", "15 Minutes", "20 Minutes"]}
              />
            </div>

            <div
              className="mt-6 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{ borderTop: "1px solid #ECF3EF" }}
            >
              <div
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[12.5px] font-medium"
                style={{ background: "#E7F5EE", color: "#0B6E4F" }}
              >
                <Info size={14} strokeWidth={2.2} />
                Changes will apply to future bookings only.
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setActiveDays(DAYS.filter((d) => d.enabled).map((d) => d.key));
                    setMorningOn(true);
                    setEveningOn(true);
                    setMorningStart("09:00 AM");
                    setMorningEnd("01:00 PM");
                    setEveningStart("04:00 PM");
                    setEveningEnd("08:00 PM");
                    setSlotDuration("30 Minutes");
                    setBufferTime("10 Minutes");
                  }}
                  className="text-[13.5px] font-semibold px-2"
                  style={{ color: "#63796F" }}
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ y: -1, boxShadow: "0 10px 24px rgba(11,110,79,0.28)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSave}
                  className="rounded-xl px-5 py-2.5 text-[13.5px] font-semibold text-white"
                  style={{ background: "#0B6E4F" }}
                >
                  {saved ? "Applied!" : "Apply Changes"}
                </motion.button>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}