import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  CheckCircle2,
  RefreshCcw,
  TrendingDown,
  Download,
  Plus,
  Check,
  CalendarClock,
  X,
  History,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');
.stat-icon-3d {
  background: linear-gradient(135deg, #0f5132, #14532d, #065f46, #0f5132);
  background-size: 300% 300%;
  animation: statIconShift 4s ease infinite;
  box-shadow:
    inset 0 1px 1px rgba(255,255,255,0.25),
    inset 0 -3px 6px rgba(0,0,0,0.35),
    0 4px 10px rgba(6,95,70,0.4);
}
@keyframes statIconShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
`;

const patients = [
  {
    id: "PT-8821",
    name: "Sakshi Joshi",
    date: "Oct 24, 2024",
    time: "10:30 AM",
    reason: "Post-surgery follow-up (Knee replacement)",
    status: "Pending",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "PT-1244",
    name: "Manish Chavan",
    date: "Oct 24, 2024",
    time: "02:15 PM",
    reason: "Annual physical examination",
    status: "Approved",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "PT-5562",
    name: "Easha Rajvansh",
    date: "Oct 25, 2024",
    time: "11:45 AM",
    reason: "Blood test results discussion",
    status: "Rejected",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "PT-3390",
    name: "Devansh Iyer",
    date: "Oct 26, 2024",
    time: "09:00 AM",
    reason: "ECG review & medication adjustment",
    status: "Rescheduled",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "PT-7710",
    name: "Priya Nair",
    date: "Oct 26, 2024",
    time: "04:30 PM",
    reason: "Routine cardiac screening",
    status: "Approved",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces",
  },
];

const statusStyles = {
  Pending: { bg: "#FFF4E0", fg: "#B4690E", dot: "#F0A93B" },
  Approved: { bg: "#E6F7EF", fg: "#12805A", dot: "#2FBF87" },
  Rejected: { bg: "#FDEAEA", fg: "#C43D3D", dot: "#E06565" },
  Rescheduled: { bg: "#E8F0FE", fg: "#2A5FBF", dot: "#5B8DEF" },
};

const filters = ["All", "Pending", "Approved", "Rejected", "Rescheduled"];

const stats = [
  {
    label: "Total Requests",
    value: "48",
    icon: ClipboardList,
    tone: "primary",
  },
  {
    label: "Approved Today",
    value: "24",
    icon: CheckCircle2,
    tone: "accent",
  },
  {
    label: "Rescheduled",
    value: "8",
    icon: RefreshCcw,
    tone: "muted",
  },
  {
    label: "Cancellation Rate",
    value: "4.2%",
    icon: TrendingDown,
    tone: "warn",
  },
];

function StatusPill({ status }) {
  const s = statusStyles[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase"
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: s.dot }}
      />
      {status}
    </span>
  );
}

function HeartbeatDivider() {
  return (
    <svg
      viewBox="0 0 1200 40"
      className="w-full h-8"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0 20 H300 L330 20 L345 6 L362 34 L378 20 L395 20 L415 20 H700 L730 20 L745 6 L762 34 L778 20 L795 20 H1200"
        fill="none"
        stroke="#2FBF87"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.55 }}
        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
      />
    </svg>
  );
}

export default function AppointmentManagement() {
  const [patientList, setPatientList] = useState(patients);
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [page, setPage] = useState(1);
  const [historyModal, setHistoryModal] = useState(null);
  const [rescheduleModal, setRescheduleModal] = useState(null);

  const handleApprove = (id) => {
    setPatientList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Approved" } : p))
    );
  };

  const handleCancel = (id) => {
    setPatientList((prev) => prev.filter((p) => p.id !== id));
  };

  const handleReschedule = (id) => {
    const current = patientList.find((p) => p.id === id);
    setRescheduleModal({ id, date: current?.date ?? "", time: current?.time ?? "" });
  };

  const confirmReschedule = () => {
    setPatientList((prev) =>
      prev.map((p) =>
        p.id === rescheduleModal.id
          ? { ...p, date: rescheduleModal.date, time: rescheduleModal.time, status: "Rescheduled" }
          : p
      )
    );
    setRescheduleModal(null);
  };

  const handleRebook = (id) => {
    setPatientList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Pending" } : p))
    );
  };

  const filtered = useMemo(() => {
    return patientList.filter((p) => {
      const matchesFilter =
        activeFilter === "All" ? true : p.status === activeFilter;
      const matchesQuery =
        query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.id.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [patientList, activeFilter, query]);

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
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-7"
        >
          <div className="min-w-0 flex-1">
            <p
              className="text-[11px] font-bold tracking-[0.18em] uppercase mb-1.5"
              style={{ color: "#2FBF87" }}
            >
              Cardiology · Front Desk
            </p>
            <h1
              className="text-[32px] md:text-[36px] leading-tight font-semibold"
              style={{
                fontFamily: "'Fraunces', serif",
                color: "#0E271F",
              }}
            >
              Appointment Management
            </h1>
            <p className="mt-1.5 text-[14.5px]" style={{ color: "#63796F" }}>
              You have{" "}
              <span className="font-semibold" style={{ color: "#0B6E4F" }}>
                12 pending
              </span>{" "}
              appointment requests for today.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const rows = [
                  ["Patient Name", "ID", "Date", "Time", "Reason", "Status"],
                  ...filtered.map((p) => [p.name, p.id, p.date, p.time, p.reason, p.status]),
                ];
                const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
                const blob = new Blob([csv], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "appointments.csv";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13.5px] font-semibold border"
              style={{
                borderColor: "#DCEAE3",
                color: "#0E271F",
                background: "#FFFFFF",
              }}
            >
              <Download size={16} strokeWidth={2.2} />
              Export List
            </motion.button>
            <motion.button
              whileHover={{ y: -1, boxShadow: "0 10px 24px rgba(11,110,79,0.28)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowScheduleModal(true)}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13.5px] font-semibold text-white"
              style={{ background: "#0B6E4F" }}
            >
              <Plus size={16} strokeWidth={2.4} />
              Schedule New
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-4 gap-4 mb-3">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                whileHover={{ y: -3 }}
                className="rounded-2xl p-3.5 sm:p-5 bg-white relative overflow-hidden"
                style={{
                  border: "2px solid #6EE7B7",
                  boxShadow: "0 1px 2px rgba(14,39,31,0.04)",
                }}
              >
                <div className="flex items-start justify-between gap-1.5">
                  <p
                    className="text-[9px] sm:text-[11px] font-bold tracking-[0.04em] sm:tracking-[0.12em] uppercase leading-snug"
                    style={{ color: "#63796F" }}
                  >
                    {s.label}
                  </p>
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg flex items-center justify-center shrink-0 stat-icon-3d">
                    <Icon size={14} className="sm:hidden" strokeWidth={2.2} color="#FFFFFF" />
                    <Icon size={16} className="hidden sm:block" strokeWidth={2.2} color="#FFFFFF" />
                  </div>
                </div>
                <p
                  className="mt-3 text-[28px] font-semibold"
                  style={{ fontFamily: "'Fraunces', serif", color: "#0E271F" }}
                >
                  {s.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mb-8 px-1">
          <HeartbeatDivider />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
          <div
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl w-fit"
            style={{ background: "#E7F5EE" }}
          >
            {filters.map((f) => {
              const active = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="relative px-4 py-2 text-[13px] font-semibold rounded-lg transition-colors"
                  style={{ color: active ? "#FFFFFF" : "#3F5B50" }}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "#0B6E4F" }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{f}</span>
                </button>
              );
            })}
          </div>

          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 bg-white"
            style={{ border: "1px solid #DCEAE3", minWidth: 220 }}
          >
            <Search size={15} color="#8AA398" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search patient or ID"
              className="text-[13.5px] outline-none bg-transparent w-full placeholder:text-[#9DB3A9]"
              style={{ color: "#0E271F" }}
            />
          </div>
        </div>

        <div
          className="rounded-2xl overflow-hidden bg-white"
          style={{ border: "1px solid #DCEAE3", boxShadow: "0 1px 2px rgba(14,39,31,0.04)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr style={{ background: "#F4FAF7" }}>
                  {["Patient Name", "Date", "Time", "Reason for Visit", "Status", "Actions"].map(
                    (h, i) => (
                      <th
                        key={h}
                        className={`text-left text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-3.5 ${
                          i === 5 ? "text-right" : ""
                        }`}
                        style={{ color: "#0B6E4F", borderBottom: "1px solid #DCEAE3" }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {filtered.map((p, idx) => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                      className="group"
                      style={{
                        borderBottom:
                          idx === filtered.length - 1 ? "none" : "1px solid #ECF3EF",
                      }}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.avatar}
                            alt={p.name}
                            className="h-9 w-9 rounded-full object-cover"
                            style={{ border: "2px solid #E7F5EE" }}
                          />
                          <div>
                            <p className="text-[13.5px] font-semibold" style={{ color: "#0E271F" }}>
                              {p.name}
                            </p>
                            <p className="text-[11.5px]" style={{ color: "#8AA398" }}>
                              ID: #{p.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[13px]" style={{ color: "#3F5B50" }}>
                        {p.date}
                      </td>
                      <td className="px-5 py-4 text-[13px]" style={{ color: "#3F5B50" }}>
                        {p.time}
                      </td>
                      <td className="px-5 py-4 text-[13px] max-w-[260px]" style={{ color: "#3F5B50" }}>
                        {p.reason}
                      </td>
                      <td className="px-5 py-4">
                        <StatusPill status={p.status} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100">
                          {p.status === "Rejected" ? (
                            <>
                              <ActionIcon
                                title="View history"
                                onClick={() => setHistoryModal(p)}
                              >
                                <History size={15} strokeWidth={2.1} />
                              </ActionIcon>
                              <ActionIcon title="Rebook" onClick={() => handleRebook(p.id)}>
                                <CalendarClock size={15} strokeWidth={2.1} />
                              </ActionIcon>
                            </>
                          ) : (
                            <>
                              <ActionIcon
                                title="Approve"
                                tone="accent"
                                onClick={() => handleApprove(p.id)}
                              >
                                <Check size={15} strokeWidth={2.4} />
                              </ActionIcon>
                              <ActionIcon
                                title="Reschedule"
                                onClick={() => handleReschedule(p.id)}
                              >
                                <CalendarClock size={15} strokeWidth={2.1} />
                              </ActionIcon>
                              <ActionIcon
                                title="Cancel"
                                tone="danger"
                                onClick={() => handleCancel(p.id)}
                              >
                                <X size={15} strokeWidth={2.4} />
                              </ActionIcon>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-14 text-center">
              <p className="text-[14px] font-medium" style={{ color: "#63796F" }}>
                No appointments match this filter yet.
              </p>
            </div>
          )}

          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4"
            style={{ borderTop: "1px solid #DCEAE3", background: "#FBFEFC" }}
          >
            <p className="text-[12.5px]" style={{ color: "#63796F" }}>
              Showing 1–10 of 48 requests
            </p>
            <div className="flex items-center gap-1.5">
              <PageArrow disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                <ChevronLeft size={15} />
              </PageArrow>
              {[1, 2, 3].map((n) => (
                <PageNumber key={n} active={n === page} onClick={() => setPage(n)}>
                  {n}
                </PageNumber>
              ))}
              <span className="px-1 text-[12.5px]" style={{ color: "#8AA398" }}>
                …
              </span>
              <PageNumber active={page === 5} onClick={() => setPage(5)}>
                5
              </PageNumber>
              <PageArrow disabled={page === 5} onClick={() => setPage((p) => Math.min(5, p + 1))}>
                <ChevronRight size={15} />
              </PageArrow>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showScheduleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(14,39,31,0.4)", backdropFilter: "blur(2px)" }}
            onClick={() => setShowScheduleModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowScheduleModal(false)}
                className="absolute top-4 right-4"
                style={{ color: "#8AA398" }}
              >
                <X size={18} />
              </button>
              <h3
                className="text-lg sm:text-xl font-semibold mb-4 pr-6"
                style={{ fontFamily: "'Fraunces', serif", color: "#0E271F" }}
              >
                Schedule New Appointment
              </h3>
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowScheduleModal(false);
                }}
              >
                <input
                  placeholder="Patient name"
                  className="w-full rounded-lg px-3 py-2.5 text-[13.5px] outline-none"
                  style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                />
                <div className="flex flex-col xs:flex-row gap-3">
                  <input
                    type="date"
                    className="w-full min-w-0 rounded-lg px-3 py-2.5 text-[13.5px] outline-none"
                    style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                  />
                  <input
                    type="time"
                    className="w-full min-w-0 rounded-lg px-3 py-2.5 text-[13.5px] outline-none"
                    style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                  />
                </div>
                <input
                  placeholder="Reason for visit"
                  className="w-full rounded-lg px-3 py-2.5 text-[13.5px] outline-none"
                  style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                />
                <button
                  type="submit"
                  className="w-full rounded-xl px-4 py-2.5 text-[13.5px] font-semibold text-white mt-2"
                  style={{ background: "#0B6E4F" }}
                >
                  Confirm Appointment
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {historyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(14,39,31,0.4)", backdropFilter: "blur(2px)" }}
            onClick={() => setHistoryModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
            >
              <button
                onClick={() => setHistoryModal(null)}
                className="absolute top-4 right-4"
                style={{ color: "#8AA398" }}
              >
                <X size={18} />
              </button>
              <h3
                className="text-xl font-semibold mb-3 pr-6"
                style={{ fontFamily: "'Fraunces', serif", color: "#0E271F" }}
              >
                {historyModal.name}
              </h3>
              <div className="space-y-1.5 text-[13.5px]" style={{ color: "#3F5B50" }}>
                <p>ID: #{historyModal.id}</p>
                <p>Rejected appointment — {historyModal.date}, {historyModal.time}</p>
                <p>Reason: {historyModal.reason}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {rescheduleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(14,39,31,0.4)", backdropFilter: "blur(2px)" }}
            onClick={() => setRescheduleModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
            >
              <button
                onClick={() => setRescheduleModal(null)}
                className="absolute top-4 right-4"
                style={{ color: "#8AA398" }}
              >
                <X size={18} />
              </button>
              <h3
                className="text-xl font-semibold mb-4 pr-6"
                style={{ fontFamily: "'Fraunces', serif", color: "#0E271F" }}
              >
                Reschedule Appointment
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={rescheduleModal.date}
                  onChange={(e) =>
                    setRescheduleModal((m) => ({ ...m, date: e.target.value }))
                  }
                  placeholder="Date"
                  className="w-full rounded-lg px-3 py-2.5 text-[13.5px] outline-none"
                  style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                />
                <input
                  type="text"
                  value={rescheduleModal.time}
                  onChange={(e) =>
                    setRescheduleModal((m) => ({ ...m, time: e.target.value }))
                  }
                  placeholder="Time"
                  className="w-full rounded-lg px-3 py-2.5 text-[13.5px] outline-none"
                  style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                />
                <button
                  onClick={confirmReschedule}
                  className="w-full rounded-xl px-4 py-2.5 text-[13.5px] font-semibold text-white mt-2"
                  style={{ background: "#0B6E4F" }}
                >
                  Confirm Reschedule
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionIcon({ children, title, tone = "default", onClick }) {
  const toneMap = {
    default: { fg: "#3F5B50", hoverBg: "#E7F5EE" },
    accent: { fg: "#0B6E4F", hoverBg: "#E6F7EF" },
    danger: { fg: "#C43D3D", hoverBg: "#FDEAEA" },
  };
  const t = toneMap[tone];
  return (
    <motion.button
      whileHover={{ scale: 1.08, backgroundColor: t.hoverBg }}
      whileTap={{ scale: 0.94 }}
      title={title}
      onClick={onClick}
      className="h-8 w-8 rounded-lg flex items-center justify-center"
      style={{ color: t.fg }}
    >
      {children}
    </motion.button>
  );
}

function PageNumber({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="h-8 w-8 rounded-lg text-[12.5px] font-semibold flex items-center justify-center transition-colors"
      style={{
        background: active ? "#0B6E4F" : "transparent",
        color: active ? "#FFFFFF" : "#3F5B50",
      }}
    >
      {children}
    </button>
  );
}

function PageArrow({ children, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="h-8 w-8 rounded-lg flex items-center justify-center"
      style={{
        color: disabled ? "#C4D5CC" : "#3F5B50",
        background: "transparent",
      }}
    >
      {children}
    </button>
  );
}