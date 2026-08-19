 import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  BadgeCheck,
  Camera,
  Stethoscope,
  MapPin,
  ChevronDown,
  Info,
  ShieldCheck,
} from "lucide-react";

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');
`;

function Field({ label, value, onChange, type = "text", highlight, hint, placeholder }) {
  return (
    <div>
      <p className="text-[12px] font-medium mb-1.5" style={{ color: "#63796F" }}>
        {label}
      </p>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium outline-none transition-colors"
        style={{
          border: `1px solid ${highlight ? "#B7D9CB" : "#DCEAE3"}`,
          background: highlight ? "#EFF8F3" : "#FBFEFC",
          color: "#0E271F",
        }}
      />
      {hint && (
        <p
          className="mt-2 flex items-center gap-1.5 text-[11.5px]"
          style={{ color: "#0B6E4F" }}
        >
          <Info size={12} strokeWidth={2.2} />
          {hint}
        </p>
      )}
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <p className="text-[12px] font-medium mb-1.5" style={{ color: "#63796F" }}>
        {label}
      </p>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between rounded-xl px-3.5 py-2.5 w-full"
        style={{ border: "1px solid #DCEAE3", background: "#FBFEFC" }}
      >
        <span className="text-[13.5px] font-medium" style={{ color: value ? "#0E271F" : "#8AA398" }}>
          {value || "Select specialization"}
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

function SectionCard({ icon: Icon, title, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="rounded-2xl bg-white p-6"
      style={{ border: "1px solid #DCEAE3", boxShadow: "0 1px 2px rgba(14,39,31,0.04)" }}
    >
      <div className="flex items-center gap-2 mb-5 pb-4" style={{ borderBottom: "1px solid #ECF3EF" }}>
        <Icon size={16} strokeWidth={2.3} color="#0B6E4F" />
        <h3
          className="text-[15px] font-semibold"
          style={{ fontFamily: "'Fraunces', serif", color: "#0E271F" }}
        >
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );
}

export default function ProfileSettings() {
  const [specialization, setSpecialization] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [years, setYears] = useState("");
  const [medicalRegistrationNo, setMedicalRegistrationNo] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [fee, setFee] = useState("");
  const [title, setTitle] = useState(
    () => localStorage.getItem("doctorTitle") || ""
  );
  const [photo, setPhoto] = useState(
    "https://i.ibb.co/bRyPh259/Atharv.png"
  );
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = React.useRef(null);

  // Fetch profile and authentication data from backend on load
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/doctors/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        // Pre-fill fields coming from signup/login info
        setFullName(data.fullName || "");
        setEmail(data.email || "");
        setPhoneNumber(data.phoneNumber || "");

        // Other fields remain blank or use whatever is stored in the database
        setSpecialization(data.specialization || "");
        setYears(data.years || "");
        setMedicalRegistrationNo(data.medicalRegistrationNo || "");
        setClinicAddress(data.clinicAddress || "");
        setFee(data.fee || "");
        setTitle(data.title || "");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const updatedData = {
        fullName,
        email,
        phoneNumber,
        specialization,
        years,
        medicalRegistrationNo,
        clinicAddress,
        fee,
        title,
      };

      const response = await fetch("http://localhost:5000/api/doctors/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        localStorage.setItem("doctorTitle", title);
        window.dispatchEvent(new Event("doctorTitleChange"));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Server error while saving.");
    }
  };

  const handleCancel = () => {
    fetchProfile();
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-[#63796F]">
        Loading profile settings...
      </div>
    );
  }

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
          className="mb-8"
        >
          <h1
            className="text-[32px] md:text-[36px] leading-tight font-semibold"
            style={{ fontFamily: "'Fraunces', serif", color: "#0E271F" }}
          >
            Profile Settings
          </h1>
          <p className="mt-1.5 text-[14.5px]" style={{ color: "#63796F" }}>
            Manage your professional presence and practice details.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="rounded-2xl bg-white p-5 sm:p-6 mb-5 flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-4 sm:gap-5"
          style={{ border: "1px solid #DCEAE3", boxShadow: "0 1px 2px rgba(14,39,31,0.04)" }}
        >
          <div className="relative shrink-0">
            <img
              src={photo}
              alt={fullName}
              className="h-20 w-20 rounded-full object-cover"
              style={{ border: "3px solid #E7F5EE" }}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              className="hidden"
            />
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full flex items-center justify-center text-white"
              style={{ background: "#0B6E4F", border: "2px solid #FFFFFF" }}
              title="Change photo"
            >
              <Camera size={13} strokeWidth={2.3} />
            </motion.button>
          </div>

          <div>
            <h2
              className="text-[19px] font-semibold"
              style={{ fontFamily: "'Fraunces', serif", color: "#0E271F" }}
            >
              Dr. {fullName || "Doctor"}
            </h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Cardiologist"
              className="text-[13.5px] mb-2.5 w-full sm:w-auto bg-transparent outline-none border-b border-dashed text-center sm:text-left"
              style={{ color: "#63796F", borderColor: "#DCEAE3" }}
            />
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold whitespace-nowrap"
                style={{ background: "#E6F7EF", color: "#12805A" }}
              >
                <ShieldCheck size={12} strokeWidth={2.4} />
                Verified Professional
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold whitespace-nowrap"
                style={{ background: "#F4FAF7", color: "#63796F", border: "1px solid #DCEAE3" }}
              >
                <BadgeCheck size={12} strokeWidth={2.4} />
                {years || "0"}+ Years Exp
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          <SectionCard icon={User} title="Personal Information" delay={0.1}>
            <div className="space-y-4">
              <Field
                label="Full Name"
                value={fullName}
                onChange={setFullName}
                placeholder="Enter full name"
              />
              <Field
                label="Professional Email"
                value={email}
                onChange={setEmail}
                type="email"
                placeholder="Enter email address"
              />
              <Field
                label="Phone Number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                placeholder="Enter phone number"
              />
            </div>
          </SectionCard>

          <SectionCard icon={Stethoscope} title="Professional Details" delay={0.15}>
            <div className="space-y-4">
              <SelectField
                label="Specialization"
                value={specialization}
                onChange={setSpecialization}
                options={["Cardiology", "General Medicine", "Neurology", "Orthopedics", "Pediatrics", "Dermatology"]}
              />
              <Field
                label="Years of Experience"
                value={years}
                onChange={setYears}
                placeholder="e.g. 5"
              />
              <Field
                label="Medical License No."
                value={medicalRegistrationNo}
                onChange={setMedicalRegistrationNo}
                placeholder="Enter license number"
                highlight
              />
            </div>
          </SectionCard>
        </div>

        <div className="mt-5">
          <SectionCard icon={MapPin} title="Clinic & Practice" delay={0.2}>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <p className="text-[12px] font-medium mb-1.5" style={{ color: "#63796F" }}>
                  Clinic Address
                </p>
                <textarea
                  value={clinicAddress}
                  onChange={(e) => setClinicAddress(e.target.value)}
                  placeholder="Enter complete clinic address"
                  rows={3}
                  className="w-full rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium outline-none resize-none"
                  style={{ border: "1px solid #DCEAE3", background: "#FBFEFC", color: "#0E271F" }}
                />
              </div>

              <div>
                <p className="text-[12px] font-medium mb-1.5" style={{ color: "#63796F" }}>
                  Consultation Fee (₹)
                </p>
                <div
                  className="flex items-center gap-1.5 rounded-xl px-3.5 py-2.5"
                  style={{ border: "1px solid #DCEAE3", background: "#FBFEFC" }}
                >
                  <span className="text-[13.5px] font-semibold" style={{ color: "#63796F" }}>
                    ₹
                  </span>
                  <input
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    placeholder="500"
                    className="w-full text-[13.5px] font-medium outline-none bg-transparent"
                    style={{ color: "#0E271F" }}
                  />
                </div>
                <p
                  className="mt-2 flex items-center gap-1.5 text-[11.5px]"
                  style={{ color: "#0B6E4F" }}
                >
                  <Info size={12} strokeWidth={2.2} />
                  Fees are shown to patients during the booking flow.
                </p>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={handleCancel}
            className="rounded-xl px-5 py-2.5 text-[13.5px] font-semibold"
            style={{ color: "#3F5B50", border: "1px solid #DCEAE3", background: "#FFFFFF" }}
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
            {saved ? "Saved!" : "Save Changes"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}