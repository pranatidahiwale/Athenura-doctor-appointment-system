import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  CalendarClock,
  Check,
  RotateCcw,
  X,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  ArrowUpRight,
} from "lucide-react";

const ModalContext = React.createContext(() => {});

function useShowModal() {
  return React.useContext(ModalContext);
}

function DetailModal({ modal, onClose }) {
  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
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
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>
            <h3
              className="text-xl font-semibold text-slate-800 mb-3 pr-6"
              style={{ fontFamily: HEADING_FONT }}
            >
              {modal.title}
            </h3>
            <div className="space-y-1.5 text-sm text-slate-600">
              {modal.lines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const HEADING_FONT = "'Fraunces', Georgia, 'Times New Roman', serif";
const BODY_FONT =
  "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif";

const STATS = [
  {
    id: "total",
    label: "Total Appointments",
    value: "124",
    icon: CalendarClock,
    tone: "teal",
    footer: (
      <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium whitespace-nowrap">
        <TrendingUp size={13} className="shrink-0" /> +12% v.s last month
      </span>
    ),
  },
  {
    id: "pending",
    label: "Pending Requests",
    value: "12",
    icon: AlertTriangle,
    tone: "rose",
    tag: "Action Required",
    footer: <span className="text-xs text-slate-400 whitespace-nowrap">New unreviewed cases</span>,
  },
  {
    id: "approved",
    label: "Approved",
    value: "86",
    icon: CheckCircle2,
    tone: "emerald",
    footer: <span className="text-xs text-slate-400 whitespace-nowrap">Confirmed this week</span>,
  },
  {
    id: "today",
    label: "Today's Total",
    value: "14",
    icon: CalendarClock,
    tone: "slate",
    footer: <span className="text-xs text-slate-400 whitespace-nowrap">Across all locations</span>,
  },
];

const REQUESTS = [
  {
    id: 1,
    name: "Laxman Rajvansh",
    date: "Oct 24, 09:30 AM",
    reason: "Routine Follow-up",
    status: "pending",
  },
  {
    id: 2,
    name: "Yash Ingle",
    date: "Oct 24, 11:00 AM",
    reason: "Chest Pain - Acute",
    status: "urgent",
  },
  {
    id: 3,
    name: "Nisha Wagh",
    date: "Oct 25, 08:00 AM",
    reason: "Post-surgery Review",
    status: "pending",
  },
];

const SCHEDULE = [
  {
    id: 1,
    time: "08:30 - 09:15",
    title: "Morning Rounds",
    subtitle: "General Ward B-Block",
    status: null,
  },
  {
    id: 2,
    time: "09:30 - 10:00",
    title: "Manish Chavan",
    subtitle: "Cardiology Consultation",
    status: "In Progress",
  },
  {
    id: 3,
    time: "10:15 - 10:45",
    title: "Sonakshi Jaiswal",
    subtitle: "Blood Test Results",
    status: "Scheduled",
  },
  {
    id: 4,
    time: "11:00 - 11:30",
    title: "Disha Mangesh",
    subtitle: "Follow-up Exam",
    status: "Scheduled",
  },
];

const UPCOMING = [
  {
    id: 1,
    name: "Santosh Agrawal",
    reason: "Hypertension Monitoring",
    date: "Jun 16",
    tag: "3rd Session",
  },
  {
    id: 2,
    name: "Jayesh Patel",
    reason: "Echo Cardiogram Results",
    date: "Jun 17",
    tag: "Final Review",
  },
  {
    id: 3,
    name: "Mina Kumar",
    reason: "General Health Check",
    date: "Jun 18",
    tag: "Annual",
  },
];

const TONE_STYLES = {
  teal: { bg: "icon-box-3d", icon: "text-white", ring: "ring-emerald-100" },
  emerald: { bg: "icon-box-3d", icon: "text-white", ring: "ring-emerald-100" },
  rose: { bg: "icon-box-3d", icon: "text-white", ring: "ring-emerald-100" },
  slate: { bg: "icon-box-3d", icon: "text-white", ring: "ring-emerald-100" },
};

export default function Dashboard() {
  const [modal, setModal] = useState(null);

  return (
    <ModalContext.Provider value={setModal}>
      <div
        className="min-h-screen bg-[#F6FAF9]"
        style={{ fontFamily: BODY_FONT }}
      >
        <style>{`
          .icon-box-3d {
            background: linear-gradient(135deg, #0f5132, #14532d, #065f46, #0f5132);
            background-size: 300% 300%;
            animation: iconGradientShift 4s ease infinite;
            box-shadow:
              inset 0 1px 1px rgba(255,255,255,0.25),
              inset 0 -3px 6px rgba(0,0,0,0.35),
              0 4px 10px rgba(6,95,70,0.4);
          }
          @keyframes iconGradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>
        <main className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-[1400px] mx-auto">
          <StatsRow />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <RequestsPanel />
            </div>
            <div>
              <SchedulePanel />
            </div>
          </div>

          <UpcomingPanel />
        </main>

        <DetailModal modal={modal} onClose={() => setModal(null)} />
      </div>
    </ModalContext.Provider>
  );
}

function StatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat, i) => {
        const Icon = stat.icon;
        const tone = TONE_STYLES[stat.tone];
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" }}
            className="relative bg-white rounded-2xl border-2 border-emerald-300 p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.08)] transition-shadow"
          >
            <div className="mb-4">
              <div className={`w-10 h-10 rounded-xl ${tone.bg} ring-4 ${tone.ring} flex items-center justify-center shrink-0`}>
                <Icon size={18} className={tone.icon} />
              </div>
              {stat.tag && (
                <span className="inline-block mt-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide text-rose-600 bg-rose-50 px-1.5 sm:px-2 py-1 rounded-full whitespace-nowrap">
                  {stat.tag}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-400 mb-1 whitespace-nowrap">{stat.label}</p>
            <p
              className="text-3xl font-semibold text-slate-800 mb-1.5"
              style={{ fontFamily: HEADING_FONT }}
            >
              {stat.value}
            </p>
            {stat.footer}
          </motion.div>
        );
      })}
    </div>
  );
}

const STATUS_BADGE = {
  pending: "bg-amber-50 text-amber-600",
  urgent: "bg-rose-50 text-rose-600",
  approved: "bg-emerald-50 text-emerald-600",
};

function RequestsPanel() {
  const [requests, setRequests] = useState(REQUESTS);
  const [showAll, setShowAll] = useState(false);

  const visibleRequests = showAll ? requests : requests.slice(0, 3);

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r))
    );
  };

  const handleDecline = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleReschedule = (id) => {
    const current = requests.find((r) => r.id === id);
    const newDate = window.prompt(
      "Enter new date & time (e.g. Oct 28, 10:00 AM)",
      current?.date ?? ""
    );
    if (newDate && newDate.trim()) {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, date: newDate.trim(), status: "pending" } : r
        )
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="bg-white rounded-2xl border border-emerald-50 shadow-[0_1px_2px_rgba(15,23,42,0.04)] overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 pt-5 pb-4">
        <h2
          className="text-lg font-semibold text-slate-800"
          style={{ fontFamily: HEADING_FONT }}
        >
          Recent Appointment Requests
        </h2>
        <button
          onClick={() => setShowAll((s) => !s)}
          className="text-sm font-medium text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
        >
          {showAll ? "Show Less" : "View All"} <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="overflow-x-auto relative">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left text-emerald-700/80 text-xs uppercase tracking-wide border-y border-emerald-50 bg-emerald-50/40">
              <th className="font-semibold px-6 py-3">Patient Name</th>
              <th className="font-semibold px-4 py-3">Date &amp; Time</th>
              <th className="font-semibold px-4 py-3">Reason</th>
              <th className="font-semibold px-4 py-3">Status</th>
              <th className="font-semibold px-4 py-3 text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {visibleRequests.length === 0 ? (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                    No appointment requests
                  </td>
                </motion.tr>
              ) : (
                visibleRequests.map((r, i) => (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    className="border-b border-slate-50 last:border-0 hover:bg-emerald-50/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={r.name} />
                        <span className="font-medium text-slate-700 whitespace-nowrap">
                          {r.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-500 whitespace-nowrap">{r.date}</td>
                    <td className="px-4 py-4 text-slate-500 whitespace-nowrap">{r.reason}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_BADGE[r.status]}`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1.5 pr-2">
                        <ActionButton
                          icon={Check}
                          tone="emerald"
                          label="Approve"
                          disabled={r.status === "approved"}
                          onClick={() => handleApprove(r.id)}
                        />
                        <ActionButton
                          icon={RotateCcw}
                          tone="slate"
                          label="Reschedule"
                          onClick={() => handleReschedule(r.id)}
                        />
                        <ActionButton
                          icon={X}
                          tone="rose"
                          label="Decline"
                          onClick={() => handleDecline(r.id)}
                        />
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      <div className="sm:hidden text-center py-1.5 text-[11px] text-emerald-500 bg-emerald-50/40">
        ← Swipe to see more →
      </div>
    </motion.div>
  );
}

function ActionButton({ icon: Icon, tone, label, onClick, disabled }) {
  const tones = {
    emerald: "text-emerald-600 hover:bg-emerald-50",
    slate: "text-slate-400 hover:bg-slate-100",
    rose: "text-rose-500 hover:bg-rose-50",
  };
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${tones[tone]} ${
        disabled ? "opacity-30 cursor-not-allowed hover:bg-transparent" : ""
      }`}
    >
      <Icon size={15} />
    </button>
  );
}

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 text-white text-xs font-semibold flex items-center justify-center shrink-0">
      {initials}
    </div>
  );
}

function SchedulePanel() {
  const showModal = useShowModal();
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="bg-white rounded-2xl border border-emerald-50 shadow-[0_1px_2px_rgba(15,23,42,0.04)] p-6 h-full"
    >
      <div className="flex items-center justify-between mb-5">
        <h2
          className="text-lg font-semibold text-slate-800"
          style={{ fontFamily: HEADING_FONT }}
        >
          Today's Schedule
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Jun 15, 2026</span>
          <ScheduleOptionsMenu />
        </div>
      </div>

      <ol className="relative pl-5">
        <span className="absolute left-[7px] top-1 bottom-1 w-px bg-emerald-100" />
        {SCHEDULE.map((item, i) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.25 + i * 0.06 }}
            onClick={() =>
              showModal({
                title: item.title,
                lines: [
                  item.subtitle,
                  item.time,
                  item.status ? `Status: ${item.status}` : "Status: Upcoming",
                ],
              })
            }
            className="relative pb-6 last:pb-0 cursor-pointer hover:bg-emerald-50/40 rounded-lg -ml-1 pl-1 pr-1 transition-colors"
          >
            <span
              className={`absolute -left-5 top-1 w-2.5 h-2.5 rounded-full ring-4 ring-white ${
                item.status === "In Progress" ? "bg-emerald-500" : "bg-teal-300"
              }`}
            />
            <p className="text-xs text-slate-400 mb-0.5">{item.time}</p>
            <p className="text-sm font-semibold text-slate-700">{item.title}</p>
            <div className="flex items-center justify-between mt-0.5">
              <p className="text-xs text-slate-400">{item.subtitle}</p>
              {item.status && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                    item.status === "In Progress"
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {item.status}
                </span>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
}

function UpcomingPanel() {
  const scrollRef = React.useRef(null);
  const showModal = useShowModal();

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.3 }}
      className="bg-white rounded-2xl border border-emerald-50 shadow-[0_1px_2px_rgba(15,23,42,0.04)] p-6"
    >
      <div className="flex flex-row items-center justify-between mb-5 gap-2">
        <h2
          className="text-base sm:text-lg font-semibold text-slate-800 whitespace-nowrap"
          style={{ fontFamily: HEADING_FONT }}
        >
          Upcoming Appointments
        </h2>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => scroll(-1)}
            className="w-8 h-8 rounded-full border border-emerald-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-300 flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-8 h-8 rounded-full border border-emerald-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-300 flex items-center justify-center transition-colors"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-1 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
        style={{ scrollbarWidth: "none" }}
      >
        {UPCOMING.map((u, i) => (
          <motion.div
            key={u.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 + i * 0.06 }}
            whileHover={{ y: -3 }}
            onClick={() =>
              showModal({
                title: u.name,
                lines: [u.reason, u.date, u.tag],
              })
            }
            className="min-w-[85%] xs:min-w-[260px] sm:min-w-[240px] flex-1 border border-emerald-50 rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-emerald-200 hover:shadow-[0_6px_18px_rgba(16,185,129,0.08)] transition-all"
          >
            <Avatar name={u.name} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-700 truncate">{u.name}</p>
              <p className="text-xs text-slate-400 truncate">{u.reason}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[11px] text-slate-400">{u.date}</span>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  {u.tag}
                </span>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-300 shrink-0" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ScheduleOptionsMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { label: "Print Schedule", action: () => window.print() },
    { label: "Export as CSV", action: () => alert("Exporting schedule...") },
    { label: "Refresh", action: () => window.location.reload() },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-slate-300 hover:text-emerald-600"
      >
        <MoreVertical size={16} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-emerald-50 shadow-lg overflow-hidden z-10"
          >
            {options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  opt.action();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-emerald-50/60 transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}