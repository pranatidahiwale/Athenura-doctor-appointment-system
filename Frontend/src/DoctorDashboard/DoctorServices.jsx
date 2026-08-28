import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Image as ImageIcon,
  Star,
  Users,
  Clock,
  CalendarCheck,
  IndianRupee,
  Link2,
  Upload,
  Eye,
} from "lucide-react";

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');
`;

const STORAGE_KEY = "doctorServices";

const emptyForm = {
  title: "",
  image: "",
  shortDesc: "",
  overview: "",
  keyServices: [""],
  duration: "",
  availability: "",
  avgRating: "",
  doctorsAvailable: "",
  consultationFee: "",
};

function loadServices() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveServices(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("doctorServicesChange"));
}

export default function DoctorServices() {
  const [services, setServices] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [viewService, setViewService] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [imageMode, setImageMode] = useState("url");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const fileInputRef = React.useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        const MAX_DIM = 900;
        let { width, height } = img;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressed = canvas.toDataURL("image/jpeg", 0.75);
        setForm((f) => ({ ...f, image: compressed }));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setServices(loadServices());
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowFormModal(true);
  };

  const openEditModal = (service) => {
    setEditingId(service.id);
    setForm({
      title: service.title || "",
      image: service.image || "",
      shortDesc: service.shortDesc || "",
      overview: service.overview || "",
      keyServices: service.keyServices && service.keyServices.length ? service.keyServices : [""],
      duration: service.duration || "",
      availability: service.availability || "",
      avgRating: service.avgRating || "",
      doctorsAvailable: service.doctorsAvailable || "",
      consultationFee: service.consultationFee || "",
    });
    setShowFormModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!form.title.trim() || !form.image.trim()) return;
    setIsSubmitting(true);

    const payload = {
      title: form.title.trim(),
      image: form.image.trim(),
      shortDesc: form.shortDesc.trim(),
      overview: form.overview.trim(),
      keyServices: form.keyServices
        .map((k) => k.trim())
        .filter(Boolean),
      duration: form.duration.trim(),
      availability: form.availability.trim(),
      avgRating: form.avgRating.trim(),
      doctorsAvailable: form.doctorsAvailable.trim(),
      consultationFee: form.consultationFee.trim(),
    };

    let updated;
    if (editingId) {
      updated = services.map((s) =>
        s.id === editingId ? { ...s, ...payload } : s
      );
    } else {
      updated = [...services, { id: Date.now().toString(), ...payload }];
    }

    try {
      saveServices(updated);
      setServices(updated);
      setShowFormModal(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      console.error("Failed to save service:", err);
      alert(
        "Couldn't save this service. The image you uploaded is likely too large for local storage. Please use a smaller image or an image URL instead."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const addKeyServicePoint = () => {
    setForm((f) => ({ ...f, keyServices: [...f.keyServices, ""] }));
  };

  const updateKeyServicePoint = (idx, value) => {
    setForm((f) => {
      const updated = [...f.keyServices];
      updated[idx] = value;
      return { ...f, keyServices: updated };
    });
  };

  const removeKeyServicePoint = (idx) => {
    setForm((f) => {
      const updated = f.keyServices.filter((_, i) => i !== idx);
      return { ...f, keyServices: updated.length ? updated : [""] };
    });
  };

  const handleDelete = (id) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    saveServices(updated);
    setConfirmDeleteId(null);
    if (viewService?.id === id) setViewService(null);
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
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8"
        >
          <div>
            <p
              className="text-[11px] font-bold tracking-[0.18em] uppercase mb-1.5"
              style={{ color: "#2FBF87" }}
            >
              Cardiology · Public Website
            </p>
            <h1
              className="text-[32px] md:text-[36px] leading-tight font-semibold"
              style={{ fontFamily: "'Fraunces', serif", color: "#0E271F" }}
            >
              Services
            </h1>
            <p className="mt-1.5 text-[14.5px]" style={{ color: "#63796F" }}>
              Manage the services shown to patients on your website.
            </p>
          </div>

          <motion.button
            whileHover={{ y: -1, boxShadow: "0 10px 24px rgba(11,110,79,0.28)" }}
            whileTap={{ scale: 0.97 }}
            onClick={openAddModal}
            className="self-start inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13.5px] font-semibold text-white shrink-0"
            style={{ background: "#0B6E4F" }}
          >
            <Plus size={16} strokeWidth={2.4} />
            Add Service
          </motion.button>
        </motion.div>

        {services.length === 0 ? (
          <div
            className="rounded-2xl bg-white p-12 text-center"
            style={{ border: "1px dashed #DCEAE3" }}
          >
            <ImageIcon size={32} color="#8AA398" className="mx-auto mb-3" />
            <p className="text-[14px] font-medium" style={{ color: "#63796F" }}>
              No services added yet. Click "Add Service" to create your first one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence initial={false}>
              {services.map((s, idx) => (
                <motion.div
                  key={s.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.96 }}
                  whileHover={{
                    y: -8,
                    boxShadow:
                      "14px 14px 32px rgba(163,177,171,0.55), -10px -10px 28px rgba(255,255,255,0.95)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setViewService(s)}
                  className="group relative w-full aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer"
                  style={{
                    boxShadow: "8px 8px 20px rgba(163,177,171,0.45), -8px -8px 20px rgba(255,255,255,0.9)",
                    border: "1px solid rgba(255,255,255,0.6)",
                  }}
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(11,42,36,0) 40%, rgba(11,42,36,0.55) 75%, rgba(11,42,36,0.85) 100%)",
                    }}
                  />

                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="absolute top-4 left-5 w-12 h-12 shrink-0 aspect-square rounded-full flex items-center justify-center z-10"
                    style={{
                      background: "linear-gradient(145deg, #167A67, #0E4B3F)",
                      boxShadow: "6px 6px 14px rgba(9,32,27,0.35), -3px -3px 10px rgba(60,140,120,0.35)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    <ImageIcon size={20} color="#fff" strokeWidth={2} />
                  </motion.div>

                  <div
                    className="absolute top-3 right-3 z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(s);
                      }}
                      title="Edit"
                      className="h-8 w-8 rounded-full flex items-center justify-center bg-white/90"
                      style={{ color: "#0B6E4F" }}
                    >
                      <Pencil size={14} strokeWidth={2.2} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDeleteId(s.id);
                      }}
                      title="Delete"
                      className="h-8 w-8 rounded-full flex items-center justify-center bg-white/90"
                      style={{ color: "#C43D3D" }}
                    >
                      <Trash2 size={14} strokeWidth={2.2} />
                    </button>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-2 z-10">
                    <h3
                      style={{ fontFamily: "'Fraunces', serif" }}
                      className="text-lg font-semibold leading-tight mb-1.5 text-white"
                    >
                      {s.title}
                    </h3>

                    <div className="grid transition-all duration-500 ease-out grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                      <div className="overflow-hidden">
                        <p className="text-[13px] leading-relaxed mb-3" style={{ color: "#DCEAE5" }}>
                          {s.shortDesc || "No short description added."}
                        </p>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewService(s);
                          }}
                          className="self-start inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full text-sm font-semibold cursor-pointer"
                          style={{
                            background: "linear-gradient(145deg, #ffffff, #F6FAF8)",
                            color: "#0E4B3F",
                            boxShadow: "5px 5px 12px rgba(0,0,0,0.25)",
                          }}
                        >
                          {s.title.split(" ")[0]}
                          <span
                            className="w-7 h-7 rounded-full flex items-center justify-center"
                            style={{
                              background: "linear-gradient(145deg, #167A67, #0E4B3F)",
                              boxShadow: "3px 3px 8px rgba(9,32,27,0.35)",
                            }}
                          >
                            <Plus size={13} color="#fff" style={{ transform: "rotate(45deg)" }} />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      <AnimatePresence>
        {showFormModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(14,39,31,0.4)", backdropFilter: "blur(2px)" }}
            onClick={() => setShowFormModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <button
                onClick={() => setShowFormModal(false)}
                className="absolute top-4 right-4"
                style={{ color: "#8AA398" }}
              >
                <X size={18} />
              </button>
              <h3
                className="text-lg sm:text-xl font-semibold mb-4 pr-6"
                style={{ fontFamily: "'Fraunces', serif", color: "#0E271F" }}
              >
                {editingId ? "Edit Service" : "Add New Service"}
              </h3>

              <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                  <p className="text-[12px] font-medium mb-1.5" style={{ color: "#63796F" }}>Service Title *</p>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="e.g. General Consultation"
                    className="w-full rounded-lg px-3 py-2.5 text-[13.5px] outline-none"
                    style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                  />
                </div>

                <div>
                  <p className="text-[12px] font-medium mb-1.5" style={{ color: "#63796F" }}>Service Image *</p>

                  <div
                    className="inline-flex items-center gap-1 p-1 rounded-lg mb-2"
                    style={{ background: "#F4FAF7" }}
                  >
                    <button
                      type="button"
                      onClick={() => setImageMode("url")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors"
                      style={{
                        background: imageMode === "url" ? "#0B6E4F" : "transparent",
                        color: imageMode === "url" ? "#FFFFFF" : "#3F5B50",
                      }}
                    >
                      <Link2 size={13} /> URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageMode("upload")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors"
                      style={{
                        background: imageMode === "upload" ? "#0B6E4F" : "transparent",
                        color: imageMode === "upload" ? "#FFFFFF" : "#3F5B50",
                      }}
                    >
                      <Upload size={13} /> Upload
                    </button>
                  </div>

                  {imageMode === "url" ? (
                    <input
                      value={form.image}
                      onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                      placeholder="https://..."
                      className="w-full rounded-lg px-3 py-2.5 text-[13.5px] outline-none"
                      style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                    />
                  ) : (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full rounded-lg px-3 py-4 text-[13px] font-medium flex flex-col items-center justify-center gap-1.5"
                        style={{ border: "1.5px dashed #DCEAE3", color: "#63796F", background: "#FBFEFC" }}
                      >
                        <Upload size={18} color="#8AA398" />
                        Click to choose an image from your device
                      </button>
                    </>
                  )}

                  {form.image && (
                    <img
                      src={form.image}
                      alt="preview"
                      className="mt-2 h-24 w-full object-cover rounded-lg"
                      style={{ border: "1px solid #ECF3EF" }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                </div>

                <div>
                  <p className="text-[12px] font-medium mb-1.5" style={{ color: "#63796F" }}>Short Description (shown on card)</p>
                  <textarea
                    value={form.shortDesc}
                    onChange={(e) => setForm((f) => ({ ...f, shortDesc: e.target.value }))}
                    rows={2}
                    placeholder="One-line summary shown on the card"
                    className="w-full rounded-lg px-3 py-2.5 text-[13.5px] outline-none resize-none"
                    style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                  />
                </div>

                <div>
                  <p className="text-[12px] font-medium mb-1.5" style={{ color: "#63796F" }}>Overview (shown in detail modal)</p>
                  <textarea
                    value={form.overview}
                    onChange={(e) => setForm((f) => ({ ...f, overview: e.target.value }))}
                    rows={3}
                    placeholder="Detailed description shown when patient clicks the card"
                    className="w-full rounded-lg px-3 py-2.5 text-[13.5px] outline-none resize-none"
                    style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                  />
                </div>

                <div>
                  <p className="text-[12px] font-medium mb-1.5" style={{ color: "#63796F" }}>
                    Key Services (add one point at a time)
                  </p>
                  <div className="space-y-2">
                    {form.keyServices.map((point, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: "#0B6E4F" }}
                        />
                        <input
                          value={point}
                          onChange={(e) => updateKeyServicePoint(idx, e.target.value)}
                          placeholder={`Point ${idx + 1}, e.g. Routine Checkups`}
                          className="flex-1 rounded-lg px-3 py-2 text-[13.5px] outline-none"
                          style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                        />
                        {form.keyServices.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeKeyServicePoint(idx)}
                            className="h-8 w-8 rounded-full flex items-center justify-center shrink-0"
                            style={{ color: "#C43D3D" }}
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addKeyServicePoint}
                    className="mt-2 inline-flex items-center gap-1.5 text-[12.5px] font-semibold"
                    style={{ color: "#0B6E4F" }}
                  >
                    <Plus size={14} /> Add another point
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[12px] font-medium mb-1.5" style={{ color: "#63796F" }}>Duration</p>
                    <input
                      value={form.duration}
                      onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                      placeholder="e.g. 30 mins"
                      className="w-full rounded-lg px-3 py-2.5 text-[13.5px] outline-none"
                      style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                    />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium mb-1.5" style={{ color: "#63796F" }}>Availability</p>
                    <input
                      value={form.availability}
                      onChange={(e) => setForm((f) => ({ ...f, availability: e.target.value }))}
                      placeholder="e.g. Mon-Sat"
                      className="w-full rounded-lg px-3 py-2.5 text-[13.5px] outline-none"
                      style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                    />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium mb-1.5" style={{ color: "#63796F" }}>Avg Rating</p>
                    <input
                      value={form.avgRating}
                      onChange={(e) => setForm((f) => ({ ...f, avgRating: e.target.value }))}
                      placeholder="e.g. 4.8"
                      className="w-full rounded-lg px-3 py-2.5 text-[13.5px] outline-none"
                      style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                    />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium mb-1.5" style={{ color: "#63796F" }}>Doctors Available</p>
                    <input
                      value={form.doctorsAvailable}
                      onChange={(e) => setForm((f) => ({ ...f, doctorsAvailable: e.target.value }))}
                      placeholder="e.g. 3"
                      className="w-full rounded-lg px-3 py-2.5 text-[13.5px] outline-none"
                      style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-[12px] font-medium mb-1.5" style={{ color: "#63796F" }}>Consultation Fee</p>
                  <input
                    value={form.consultationFee}
                    onChange={(e) => setForm((f) => ({ ...f, consultationFee: e.target.value }))}
                    placeholder="e.g. ₹500"
                    className="w-full rounded-lg px-3 py-2.5 text-[13.5px] outline-none"
                    style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl px-4 py-2.5 text-[13.5px] font-semibold text-white mt-2 disabled:opacity-60"
                  style={{ background: "#0B6E4F" }}
                >
                  {isSubmitting ? "Saving..." : editingId ? "Save Changes" : "Add Service"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {viewService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(14,39,31,0.4)", backdropFilter: "blur(2px)" }}
            onClick={() => {
              setViewService(null);
              setShowFullImage(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => {
                  setViewService(null);
                  setShowFullImage(false);
                }}
                className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center"
                style={{ color: "#0E271F" }}
              >
                <X size={16} />
              </button>

              <div
                className="group/img relative h-44 w-full shrink-0 overflow-hidden cursor-pointer"
                onClick={() => setShowFullImage(true)}
              >
                <img src={viewService.image} alt={viewService.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover/img:bg-black/40 opacity-0 group-hover/img:opacity-100 transition-all duration-300">
                  <span
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-sm font-semibold"
                    style={{ color: "#0E4B3F" }}
                  >
                    <Eye size={16} />
                    View Full Image
                  </span>
                </div>
              </div>

              <div className="p-6 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "'Fraunces', serif", color: "#0E271F" }}
                >
                  {viewService.title}
                </h3>

                <div className="flex items-center flex-wrap gap-3 text-[12px] font-semibold mb-4" style={{ color: "#0B6E4F" }}>
                  {viewService.avgRating && (
                    <span className="inline-flex items-center gap-1">
                      <Star size={13} /> {viewService.avgRating}
                    </span>
                  )}
                  {viewService.doctorsAvailable && (
                    <span className="inline-flex items-center gap-1">
                      <Users size={13} /> {viewService.doctorsAvailable} doctors
                    </span>
                  )}
                  {viewService.consultationFee && (
                    <span className="inline-flex items-center gap-1">
                      <IndianRupee size={13} /> {viewService.consultationFee}
                    </span>
                  )}
                </div>

                <p className="text-[13.5px] leading-relaxed mb-5" style={{ color: "#3F5B50" }}>
                  {viewService.overview || "No overview added yet."}
                </p>

                {viewService.keyServices?.length > 0 && (
                  <>
                    <h4 className="text-[13px] font-semibold mb-2" style={{ color: "#0E271F" }}>
                      Key Services
                    </h4>
                    <ul className="mb-5 space-y-1.5">
                      {viewService.keyServices.map((k) => (
                        <li key={k} className="text-[13px] flex items-start gap-2" style={{ color: "#3F5B50" }}>
                          <span style={{ color: "#0B6E4F" }}>•</span>
                          {k}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <div className="grid grid-cols-2 gap-3 text-[12.5px] p-4 rounded-xl" style={{ background: "#F4FAF7" }}>
                  <div>
                    <span className="flex items-center gap-1.5 font-semibold" style={{ color: "#0E271F" }}>
                      <Clock size={13} /> Duration
                    </span>
                    <span style={{ color: "#63796F" }}>{viewService.duration || "—"}</span>
                  </div>
                  <div>
                    <span className="flex items-center gap-1.5 font-semibold" style={{ color: "#0E271F" }}>
                      <CalendarCheck size={13} /> Availability
                    </span>
                    <span style={{ color: "#63796F" }}>{viewService.availability || "—"}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => {
                      openEditModal(viewService);
                      setViewService(null);
                    }}
                    className="flex-1 rounded-xl px-4 py-2.5 text-[13.5px] font-semibold"
                    style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(viewService.id)}
                    className="flex-1 rounded-xl px-4 py-2.5 text-[13.5px] font-semibold text-white"
                    style={{ background: "#C43D3D" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {confirmDeleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ background: "rgba(14,39,31,0.4)", backdropFilter: "blur(2px)" }}
            onClick={() => setConfirmDeleteId(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
            >
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Fraunces', serif", color: "#0E271F" }}>
                Delete this service?
              </h3>
              <p className="text-[13.5px] mb-5" style={{ color: "#63796F" }}>
                This will remove it from your public website. This can't be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="flex-1 rounded-xl px-4 py-2.5 text-[13.5px] font-semibold"
                  style={{ border: "1px solid #DCEAE3", color: "#0E271F" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(confirmDeleteId)}
                  className="flex-1 rounded-xl px-4 py-2.5 text-[13.5px] font-semibold text-white"
                  style={{ background: "#C43D3D" }}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showFullImage && viewService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowFullImage(false)}
            className="fixed inset-0 z-[70] flex items-center justify-center p-6"
            style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              src={viewService.image}
              alt={viewService.title}
              className="max-w-full max-h-[90vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}