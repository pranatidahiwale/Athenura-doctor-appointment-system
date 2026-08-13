import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import ScheduleBgImg from '../assets/Sheadule-Section/Sheadule-Bg-Img.png';
import { 
  Calendar, 
  Clock, 
  Sun, 
  Moon, 
  CalendarX, 
  CheckCircle2, 
  AlertCircle,
  Info,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Stethoscope
} from 'lucide-react';

// Import the updated data structures
import { 
  weeklyScheduleData, 
  timeSlotsData, 
  clinicHolidaysData, 
  doctorScheduleInfo, 
  scheduleHeroData, 
  appointmentSummaryData, 
  clinicContactData 
} from '../Data/doctorData';

export default function SchedulePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  
  const bookingFormRef = useRef(null);

  // Automatically scroll to and highlight the appointment section on mount
  useEffect(() => {
    const fetchScheduleData = async () => {
      setLoading(true);
      setError(null);
      try {
        setLoading(false);
      } catch (err) {
        setError(err.message || 'An unexpected error occurred while loading schedule data.');
        setLoading(false);
      }
    };

    fetchScheduleData();

    // Automatically scroll to the slots/booking action container when page opens
    if (bookingFormRef.current) {
      bookingFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSlotSelect = (slotObj) => {
    if (slotObj.available) {
      setSelectedSlot(slotObj.time);
    }
  };

  // Handler for the CTA button click to navigate directly to the Appointment page
  const handleDirectBookingTrigger = () => {
    navigate('/appointment');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center animate-fade-in" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <div className="flex items-center gap-4 bg-white/90 backdrop-blur-xl px-8 py-5 rounded-3xl shadow-2xl border border-slate-200 text-[#009D95]">
          <Clock className="w-6 h-6 animate-spin" />
          <span className="font-semibold text-slate-700 text-sm tracking-wide">Loading schedule data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 animate-fade-in" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <div className="bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full text-center transition-all duration-300">
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-rose-500 shadow-inner">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 mb-2 tracking-tight">Unable to Load Schedule</h3>
          <p className="text-sm text-slate-600 mb-8 leading-relaxed font-normal">{error}</p>
          <button 
            onClick={() => setError(null)} 
            className="w-full py-3.5 bg-[#009D95] text-white rounded-2xl text-sm font-bold hover:bg-[#00857D] transition-all duration-300 shadow-lg shadow-[#009D95]/25 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer active:scale-95"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-[#009D95]/30 selection:text-[#009D95]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Sticky Navbar Container */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-xs border-b border-slate-200/80">
        <Navbar />
      </div>
      
      {/* Hero Section */}
      <section className="relative h-[52vh] min-h-[460px] w-full overflow-hidden flex items-center">
        <img 
          src={ScheduleBgImg} 
          alt="Healthcare background" 
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
        />
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full z-10">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2.5 py-1.5 px-4 rounded-full bg-white/90 backdrop-blur-xl text-slate-800 border border-slate-200 text-xs font-semibold uppercase tracking-wider mb-5 shadow-lg shadow-black/5">
              <Sparkles className="w-3.5 h-3.5 text-[#009D95] animate-pulse" />
              {scheduleHeroData.badge}
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#154845] tracking-tight mb-5 leading-[1.15] drop-shadow-sm">
              Professional Medical Care & Scheduling
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-xl font-normal mb-8">
              Book your consultations effortlessly and receive expert medical attention tailored to your health needs.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <span className="bg-white/90 border border-slate-200 text-slate-700 px-4 py-2 rounded-2xl text-xs font-medium backdrop-blur-xl shadow-md">
                ✓ Easy Scheduling
              </span>
              <span className="bg-white/90 border border-slate-200 text-slate-700 px-4 py-2 rounded-2xl text-xs font-medium backdrop-blur-xl shadow-md">
                ✓ Real-time Availability
              </span>
              <span className="bg-white/90 border border-slate-200 text-slate-700 px-4 py-2 rounded-2xl text-xs font-medium backdrop-blur-xl shadow-md">
                ✓ Trusted Care
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="py-14 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Doctor Info Banner */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 mb-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-all duration-300 hover:shadow-2xl hover:border-slate-300">
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-teal-50 text-[#009D95] flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-105 shadow-inner border border-teal-100">
              <Stethoscope className="w-9 h-9 sm:w-10 sm:h-10" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">{doctorScheduleInfo.doctorName}</h3>
                <span className="text-xs font-bold text-[#009D95] bg-teal-50 border border-teal-200 px-3.5 py-1 rounded-full shadow-xs">
                  {doctorScheduleInfo.qualification}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mb-1.5">{doctorScheduleInfo.specialization} • {doctorScheduleInfo.clinicName}</p>
              <p className="text-xs text-slate-500 font-medium">Duration: {doctorScheduleInfo.consultationDuration} | Mode: {doctorScheduleInfo.consultationMode}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-2xl text-emerald-700 text-xs font-bold shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-xs shadow-emerald-500" />
            {doctorScheduleInfo.clinicStatus}
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
              Schedule & Availability
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed font-normal">
              View clinical operating hours, check specific appointment time windows, and plan your consultation seamlessly.
            </p>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-bold text-[#009D95] bg-white border border-slate-200 px-4 py-3 rounded-2xl self-start md:self-auto shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            Verified Clinical Schedule
          </div>
        </div>

        {/* Weekly Consultation Schedule Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl mb-12 overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center justify-between px-6 sm:px-8 py-6 border-b border-slate-200 bg-white/90 backdrop-blur-md">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-teal-50 rounded-2xl text-[#009D95] shadow-sm border border-teal-100">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900">Weekly Consultation Schedule</h3>
            </div>
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Standard Operating Hours</span>
          </div>
          
          <div className="overflow-x-auto p-4 sm:p-6">
            <div className="bg-slate-50/60 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200">
                    <th className="py-4 px-6 sm:px-8 border-r border-slate-200 last:border-r-0">Day</th>
                    <th className="py-4 px-6 border-r border-slate-200 last:border-r-0">Opening Time</th>
                    <th className="py-4 px-6 border-r border-slate-200 last:border-r-0">Closing Time</th>
                    <th className="py-4 px-6 sm:px-8">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  {weeklyScheduleData.map((item, index) => {
                    const isAvailable = item.status === 'Available' || item.status === 'Extended Hours';
                    return (
                      <tr key={index} className="hover:bg-slate-100/60 transition-colors duration-150">
                        <td className="py-4 px-6 sm:px-8 font-bold text-slate-900 border-r border-slate-200 last:border-r-0">{item.day}</td>
                        <td className="py-4 px-6 text-slate-700 font-medium border-r border-slate-200 last:border-r-0">{item.opening}</td>
                        <td className="py-4 px-6 text-slate-700 font-medium border-r border-slate-200 last:border-r-0">{item.closing}</td>
                        <td className="py-4 px-6 sm:px-8">
                          <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs ${
                            isAvailable 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500 shadow-sm shadow-emerald-500' : 'bg-rose-500'}`} />
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Lower Grid: Available Slots & Clinic Holidays */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" ref={bookingFormRef} id="appointments">
          
          {/* Today's Available Slots (Span 8) */}
          <div className="lg:col-span-8 bg-white backdrop-blur-xl rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl">
            <div>
              <div className="flex items-center gap-3.5 mb-8 pb-5 border-b border-slate-200">
                <div className="p-3 bg-teal-50 rounded-2xl text-[#009D95] shadow-inner border border-teal-100">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 tracking-tight">Today's Available Slots</h3>
                  <p className="text-xs text-slate-500 font-medium">Select an open time slot to reserve your consultation</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Morning Sessions */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3.5">
                    <Sun className="w-4 h-4 text-amber-500" />
                    Morning Sessions
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {timeSlotsData.morning.map((slotObj, idx) => {
                      const isSelected = selectedSlot === slotObj.time;
                      return (
                        <button
                          key={idx}
                          disabled={!slotObj.available}
                          onClick={() => handleSlotSelect(slotObj)}
                          className={`px-4.5 py-3 rounded-2xl text-xs font-bold border transition-all duration-300 transform active:scale-95 ${
                            !slotObj.available
                              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-[#009D95] text-white border-[#009D95] shadow-lg shadow-[#009D95]/30 ring-2 ring-[#009D95]/20 scale-105 cursor-pointer'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-[#009D95]/50 hover:text-[#009D95] hover:-translate-y-0.5 cursor-pointer shadow-xs'
                          }`}
                        >
                          {slotObj.time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Afternoon Sessions */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3.5">
                    <Sun className="w-4 h-4 text-amber-600" />
                    Afternoon Sessions
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {timeSlotsData.afternoon.map((slotObj, idx) => {
                      const isSelected = selectedSlot === slotObj.time;
                      return (
                        <button
                          key={idx}
                          disabled={!slotObj.available}
                          onClick={() => handleSlotSelect(slotObj)}
                          className={`px-4.5 py-3 rounded-2xl text-xs font-bold border transition-all duration-300 transform active:scale-95 ${
                            !slotObj.available
                              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-[#009D95] text-white border-[#009D95] shadow-lg shadow-[#009D95]/30 ring-2 ring-[#009D95]/20 scale-105 cursor-pointer'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-[#009D95]/50 hover:text-[#009D95] hover:-translate-y-0.5 cursor-pointer shadow-xs'
                          }`}
                        >
                          {slotObj.time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Evening Sessions */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3.5">
                    <Moon className="w-4 h-4 text-indigo-500" />
                    Evening Sessions
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {timeSlotsData.evening.map((slotObj, idx) => {
                      const isSelected = selectedSlot === slotObj.time;
                      return (
                        <button
                          key={idx}
                          disabled={!slotObj.available}
                          onClick={() => handleSlotSelect(slotObj)}
                          className={`px-4.5 py-3 rounded-2xl text-xs font-bold border transition-all duration-300 transform active:scale-95 ${
                            !slotObj.available
                              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-[#009D95] text-white border-[#009D95] shadow-lg shadow-[#009D95]/30 ring-2 ring-[#009D95]/20 scale-105 cursor-pointer'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-[#009D95]/50 hover:text-[#009D95] hover:-translate-y-0.5 cursor-pointer shadow-xs'
                          }`}
                        >
                          {slotObj.time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-5 bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner">
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#009D95]" />
                <span>
                  {selectedSlot ? (
                    <>
                      {appointmentSummaryData.selectedTimeLabel}: <strong className="text-slate-900 font-bold">{selectedSlot}</strong>
                    </>
                  ) : (
                    appointmentSummaryData.defaultMessage
                  )}
                </span>
              </div>
              <button 
                onClick={handleDirectBookingTrigger}
                disabled={!selectedSlot} 
                className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl text-xs font-extrabold transition-all duration-300 shadow-md flex items-center justify-center gap-2.5 ${
                  selectedSlot 
                    ? 'bg-[#009D95] text-white hover:bg-[#00857D] shadow-[#009D95]/30 cursor-pointer hover:scale-105 active:scale-95' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                {appointmentSummaryData.buttonText}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Clinic Holidays (Span 4) */}
          <div className="lg:col-span-4 bg-white backdrop-blur-xl rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl">
            <div>
              <div className="flex items-center gap-3.5 mb-8 pb-5 border-b border-slate-200">
                <div className="p-3 bg-rose-50 rounded-2xl text-rose-500 shadow-inner border border-rose-100">
                  <CalendarX className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 tracking-tight">Clinic Holidays</h3>
                  <p className="text-xs text-slate-500 font-medium">Upcoming office closures</p>
                </div>
              </div>

              <div className="space-y-4">
                {clinicHolidaysData.map((holiday, idx) => (
                  <div 
                    key={idx}
                    className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#009D95]/40 hover:bg-slate-100/80 group shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-[#009D95] transition-colors">{holiday.name}</h4>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg flex-shrink-0 shadow-xs">
                        {holiday.date}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{holiday.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-200 text-xs text-slate-600 flex items-start gap-3 bg-slate-50 p-4.5 rounded-2xl border border-slate-200">
              <Info className="w-4 h-4 text-[#009D95] flex-shrink-0 mt-0.5" />
              <span className="leading-snug font-medium">{clinicContactData.supportText}</span>
            </div>
          </div>
        </div>

      </main>

      {/* Call to Action Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="relative bg-[#154845] rounded-3xl overflow-hidden py-16 sm:py-20 px-6 sm:px-12 text-center shadow-2xl">
          
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-black/10 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Ready to start your health journey?
            </h2>
            <p className="text-sm sm:text-base text-teal-100/80 font-normal max-w-xl mx-auto mb-10 leading-relaxed">
              Expert cardiac care is just one consultation away. Secure your appointment with Dr. Rajesh Malhotra today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={handleDirectBookingTrigger}
                className="px-8 py-4 bg-white text-slate-900 rounded-2xl text-sm font-extrabold hover:bg-slate-100 transition-all duration-300 shadow-xl shadow-black/10 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                Book Your Appointment
              </button>
              <a 
                href="#contact" 
                className="px-8 py-4 bg-transparent text-white border border-white/30 rounded-2xl text-sm font-extrabold hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              >
                Contact Clinic Support
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}