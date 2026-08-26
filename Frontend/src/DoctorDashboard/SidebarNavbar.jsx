import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  CalendarDays,
  ClipboardList,
  Settings,
  Menu,
  X,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import logo1 from "../assets/logo1.png";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "appointments", label: "Appointments", icon: CalendarDays },
  { id: "schedule", label: "Schedule Management", icon: ClipboardList },
  { id: "profile", label: "Profile Settings", icon: Settings },
];

export default function SidebarNavbar({
  items = NAV_ITEMS,
  activeId: activeIdProp,
  onNavigate,
  userName = "Dr. Rajesh Malhotra",
  userRole = "Senior Cardiologist",
  userAvatar = "https://i.ibb.co/bRyPh259/Atharv.png",
  notificationCount = 0,
  onHelpClick,
}) {
  const [activeId, setActiveId] = useState(activeIdProp || items[0]?.id);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const NOTIFICATIONS = [
    { id: 1, title: "New appointment booked", desc: "Rahul Sharma booked a slot for 4:00 PM", time: "5m ago", unread: true },
    { id: 2, title: "Schedule updated", desc: "Your Thursday slots were modified", time: "1h ago", unread: true },
    { id: 3, title: "Appointment cancelled", desc: "Priya Verma cancelled her 2:00 PM visit", time: "3h ago", unread: false },
  ];

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    if (activeIdProp !== undefined && activeIdProp !== activeId) {
      setActiveId(activeIdProp);
    }
  }, [activeIdProp]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = (id) => {
    setActiveId(id);
    onNavigate?.(id);
    if (isMobile) setMobileOpen(false);
  };

  const iconOnly = collapsed || (!isDesktop && !isMobile);
  const sidebarWidth = iconOnly ? 84 : 264;

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-emerald-100 flex items-center justify-between px-4 z-40 shadow-sm">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="p-2 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors"
        >
          <Menu size={22} />
        </button>
        <Logo compact />
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setHelpOpen((o) => !o);
              onHelpClick?.();
            }}
            aria-label="Help"
            className="p-2 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            <HelpCircle size={18} />
          </button>
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="p-2 rounded-lg text-emerald-700 hover:bg-emerald-50 relative"
          >
            <Bell size={18} />
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {helpOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHelpOpen(false)}
              className="md:hidden fixed inset-0 bg-slate-900/30 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="md:hidden fixed top-14 left-3 right-3 bg-white rounded-2xl shadow-xl z-50 overflow-hidden border border-emerald-100"
            >
              <HelpMenu onClose={() => setHelpOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notifOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNotifOpen(false)}
              className="md:hidden fixed inset-0 bg-slate-900/30 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="md:hidden fixed top-14 left-3 right-3 bg-white rounded-2xl shadow-xl z-50 overflow-hidden border border-emerald-100"
            >
              <NotificationPanel notifications={NOTIFICATIONS} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-40"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="md:hidden fixed top-0 left-0 h-full w-[78%] max-w-[280px] bg-gradient-to-b from-teal-500 to-emerald-600 z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-emerald-100 bg-white">
              <Logo />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-1.5 rounded-lg text-slate-400 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <NavList items={items} activeId={activeId} onSelect={handleSelect} iconOnly={false} />
            <UserFooter userName={userName} userRole={userRole} userAvatar={userAvatar} iconOnly={false} isDark />
          </motion.aside>
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: sidebarWidth }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="hidden md:flex fixed top-0 left-0 h-full bg-gradient-to-b from-teal-500 to-emerald-600 flex-col z-30 shadow-[2px_0_12px_rgba(16,185,129,0.15)]"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-emerald-100 bg-white overflow-hidden">
          <Logo compact={iconOnly} />
        </div>

        <NavList items={items} activeId={activeId} onSelect={handleSelect} iconOnly={iconOnly} />
      </motion.aside>

      <motion.header
        animate={{ left: sidebarWidth }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="hidden md:flex fixed top-0 right-0 h-16 bg-white items-center justify-end gap-4 px-6 z-20"
        style={{
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.6) inset, 0 4px 10px rgba(15,23,42,0.06), 0 1px 3px rgba(15,23,42,0.08)",
        }}
      >
        <div className="relative">
          <button
            onClick={() => {
              setHelpOpen((o) => !o);
              onHelpClick?.();
            }}
            aria-label="Help"
            className="p-2 rounded-lg text-emerald-700 hover:bg-emerald-50 active:scale-95 transition-all"
            style={{ boxShadow: "0 1px 2px rgba(15,23,42,0.06)" }}
          >
            <HelpCircle size={19} />
          </button>
          <AnimatePresence>
            {helpOpen && (
              <>
                <div
                  onClick={() => setHelpOpen(false)}
                  className="fixed inset-0 z-40"
                />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 w-60 max-w-[85vw] bg-white rounded-2xl shadow-xl border border-emerald-100 z-50 overflow-hidden"
                  style={{ left: "0px" }}
                >
                  <HelpMenu onClose={() => setHelpOpen(false)} />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        <div className="relative">
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="p-2 rounded-lg text-emerald-700 hover:bg-emerald-50 relative active:scale-95 transition-all"
            style={{ boxShadow: "0 1px 2px rgba(15,23,42,0.06)" }}
          >
            <Bell size={19} />
            {notificationCount > 0 && (
              <span
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500"
                style={{ boxShadow: "0 0 0 2px #ffffff" }}
              />
            )}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <>
                <div
                  onClick={() => setNotifOpen(false)}
                  className="fixed inset-0 z-40"
                />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-64 max-w-[70vw] bg-white rounded-2xl shadow-xl border border-emerald-100 z-50 overflow-hidden"
                >
                  <NotificationPanel notifications={NOTIFICATIONS} />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        <div className="w-px h-8 bg-emerald-100" />
        <div className="relative">
          <button
            onClick={() => setProfileOpen((o) => !o)}
            className="flex items-center gap-2.5 rounded-xl px-1.5 py-1 hover:bg-emerald-50 active:scale-[0.98] transition-all"
          >
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-100"
                style={{ boxShadow: "0 2px 5px rgba(15,23,42,0.12)" }}
              />
            ) : (
              <div
                className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-white flex items-center justify-center text-sm font-semibold"
                style={{ boxShadow: "0 2px 5px rgba(15,23,42,0.15)" }}
              >
                {userName?.[0] ?? "U"}
              </div>
            )}
            <div className="text-right leading-tight">
              <p className="text-sm font-semibold text-slate-700">{userName}</p>
              <p className="text-xs text-emerald-600">{userRole}</p>
            </div>
          </button>

          <AnimatePresence>
            {profileOpen && (
              <>
                <div
                  onClick={() => setProfileOpen(false)}
                  className="fixed inset-0 z-40"
                />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-emerald-100 z-50 overflow-hidden"
                >
                  <ProfileMenu
                    userName={userName}
                    userRole={userRole}
                    onNavigate={handleSelect}
                    onClose={() => setProfileOpen(false)}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <div className="md:hidden h-14" />
    </>
  );
}

function Logo({ compact }) {
  return (
    <Link to="/" className="flex items-center min-w-0 cursor-pointer">
      <img
        src={logo1}
        alt="Athenura"
        className={compact ? "h-8 w-auto object-contain" : "h-10 w-auto object-contain"}
      />
    </Link>
  );
}

function NavList({ items, activeId, onSelect, iconOnly }) {
  return (
    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            title={iconOnly ? item.label : undefined}
            className={`group relative w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors
              ${active ? "bg-white text-emerald-700 shadow-sm" : "text-white/80 hover:bg-white/15 hover:text-white"}
              ${iconOnly ? "justify-center" : ""}
            `}
          >
            <Icon size={19} className="shrink-0" />
            {!iconOnly && <span className="truncate">{item.label}</span>}
            {iconOnly && (
              <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-50">
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

function UserFooter({ userName, userRole, userAvatar, iconOnly, isDark }) {
  return (
    <div className={`border-t p-3 ${isDark ? "border-white/20" : "border-emerald-100"}`}>
      <div className={`flex items-center gap-3 rounded-xl p-2 transition-colors ${isDark ? "hover:bg-white/15" : "hover:bg-emerald-50"} ${iconOnly ? "justify-center" : ""}`}>
        {userAvatar ? (
          <img src={userAvatar} alt={userName} className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-emerald-100" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-white flex items-center justify-center text-sm font-semibold shrink-0">
            {userName?.[0] ?? "U"}
          </div>
        )}
        {!iconOnly && (
          <div className="min-w-0">
            <p className={`text-sm font-semibold truncate ${isDark ? "text-white" : "text-slate-700"}`}>{userName}</p>
            <p className={`text-xs truncate ${isDark ? "text-emerald-100" : "text-emerald-600"}`}>{userRole}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationPanel({ notifications }) {
  return (
    <div className="max-h-96 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-50">
        <p className="text-sm font-semibold text-slate-700">Notifications</p>
        <span className="text-xs text-emerald-600 font-medium">
          {notifications.filter((n) => n.unread).length} new
        </span>
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-emerald-50">
        {notifications.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-8">No notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`px-4 py-3 hover:bg-emerald-50/60 transition-colors cursor-pointer ${n.unread ? "bg-emerald-50/40" : ""}`}
            >
              <div className="flex items-start gap-2">
                {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{n.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.desc}</p>
                  <p className="text-[11px] text-emerald-500 mt-1">{n.time}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ProfileMenu({ userName, userRole, onNavigate, onClose }) {
  return (
    <div className="py-2">
      <div className="px-4 py-2.5 border-b border-emerald-50">
        <p className="text-sm font-semibold text-slate-700 truncate">{userName}</p>
        <p className="text-xs text-emerald-600 truncate">{userRole}</p>
      </div>
      <button
        onClick={() => {
          onNavigate?.("profile");
          onClose?.();
        }}
        className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 transition-colors"
      >
        Profile Settings
      </button>
      <button
        onClick={() => {
          onClose?.();
        }}
        className="w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

function HelpMenu({ onClose }) {
  const HELP_ITEMS = [
    { label: "FAQs", href: "#" },
    { label: "Contact Support", href: "#" },
    { label: "Documentation", href: "#" },
  ];
  return (
    <div className="py-2">
      {HELP_ITEMS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 transition-colors"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}