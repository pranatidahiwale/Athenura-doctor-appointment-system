import React, { useState } from 'react';
import { 
  CheckCircle2, 
  PhoneCall, 
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  FileText,
  ShieldCheck,
  Stethoscope,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MapPin,
  Star
} from 'lucide-react';
import { mockDoctor, timeSlotsData } from '../Data/doctorData.js';

const Appointment = () => {
  
  const [currentStep, setCurrentStep] = useState(1);
  
  // Use mock doctor data imported from doctardata.js
  const doctorData = {
    name: mockDoctor.name,
    specialization: mockDoctor.specialization,
    clinic: mockDoctor.clinic,
    experience: mockDoctor.experience,
    qualification: mockDoctor.qualification,
    rating: mockDoctor.rating,
    reviews: mockDoctor.reviews,
    clinicAddress: mockDoctor.clinicAddress,
    consultationHours: mockDoctor.consultationHours,
    contactNumber: mockDoctor.contactNumber
  };

  
  const availableSlots = [
    ...timeSlotsData.morning.map(s => s.time),
    ...timeSlotsData.afternoon.map(s => s.time),
    ...timeSlotsData.evening.map(s => s.time)
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    age: '',
    gender: '',
    preferredDate: '',
    preferredTime: '',
    reasonForVisit: '',
    additionalNotes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSlotSelect = (slot) => {
    setFormData((prev) => ({
      ...prev,
      preferredTime: slot
    }));
  };

  // Non-functional placeholders for UI preview
  const handleDummySubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="font-['Poppins'] bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] text-[#0F172A] min-h-screen pb-20 box-border selection:bg-[#0D9488] selection:text-white">
      
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-6">
        
        {/* Hero Section */}
        <header className="relative my-8 lg:my-12 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F766E] p-8 sm:p-12 md:p-16 text-white shadow-2xl shadow-slate-900/20 border border-slate-700/50">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-[800px]">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-[12px] font-semibold mb-6 tracking-wide backdrop-blur-md shadow-inner">
              <Sparkles size={14} className="text-teal-400 animate-pulse" />
              Advanced Healthcare & Wellness Portal
            </div>

            <h1 className="text-[34px] sm:text-[44px] md:text-[52px] font-extrabold tracking-tight mb-4 leading-[1.15]">
              <span className="bg-gradient-to-r from-white via-slate-100 to-teal-200 bg-clip-text text-transparent">
                Book Your Consultation
              </span>
            </h1>

            <p className="text-slate-300 text-[15px] sm:text-[17px] font-normal leading-relaxed max-w-[650px]">
              Schedule your appointment seamlessly with our specialist. Secure, confidential, and prioritized care tailored to your health requirements.
            </p>
          </div>
        </header>

        {/* Stepper Header */}
        <div className="mb-10 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 bg-teal-50 border border-teal-200 shadow-sm">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all bg-[#0D9488] text-white shadow-md">
                1
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-wider font-semibold text-slate-500">Step 1</p>
                <h4 className="text-[15px] font-bold text-slate-900">Patient Details</h4>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 bg-slate-50 opacity-70">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all bg-slate-200 text-slate-600">
                2
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-wider font-semibold text-slate-500">Step 2</p>
                <h4 className="text-[15px] font-bold text-slate-900">Review & Confirm</h4>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 bg-slate-50 opacity-70">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all bg-slate-200 text-slate-600">
                3
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-wider font-semibold text-slate-500">Step 3</p>
                <h4 className="text-[15px] font-bold text-slate-900">Pending Confirmation</h4>
              </div>
            </div>

          </div>
        </div>

        {/* Main Content: Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Flow Steps */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-200/80">
            
            {/* STEP 1: PATIENT FORM */}
            {currentStep === 1 && (
              <form onSubmit={handleDummySubmit} className="space-y-6">
                <div>
                  <h2 className="text-[22px] font-extrabold text-[#0F172A] mb-1">Patient Information & Appointment Details</h2>
                  <p className="text-[14px] text-slate-500">Please fill out your personal information and choose an optimal slot.</p>
                </div>

                <hr className="border-slate-100 my-4" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:bg-white transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                      <input 
                        type="tel" 
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:bg-white transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                      <input 
                        type="email" 
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:bg-white transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-2">Age <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                      <input 
                        type="number" 
                        name="age"
                        min="0"
                        max="120"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter your age"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:bg-white transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-2">Gender <span className="text-red-500">*</span></label>
                    <select 
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:bg-white transition-all text-sm"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Appointment Date */}
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-2">Appointment Date <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                      <input 
                        type="date" 
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:bg-white transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Time Slot Selection Component (Mapped from doctardata.js) */}
                <div className="pt-4">
                  <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                    Available Time Slot <span className="text-red-500">*</span>
                  </label>
                  <p className="text-[12px] text-slate-500 mb-3">Select one of the available consultation intervals for your session.</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {availableSlots.map((slot, index) => {
                      const isSelected = formData.preferredTime === slot;
                      return (
                        <button
                          type="button"
                          key={index}
                          onClick={() => handleSlotSelect(slot)}
                          className={`py-3 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 border ${
                            isSelected 
                              ? 'bg-[#0D9488] text-white border-[#0D9488] shadow-md scale-[1.02]' 
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-400 hover:bg-teal-50/50'
                          }`}
                        >
                          <Clock size={14} />
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Service / Reason for Visit */}
                <div className="pt-2">
                  <label className="block text-[13px] font-semibold text-slate-700 mb-2">Service / Reason for Visit <span className="text-red-500">*</span></label>
                  <input 
                    type="text"
                    name="reasonForVisit"
                    value={formData.reasonForVisit}
                    onChange={handleChange}
                    required
                    placeholder="Enter service or reason for your visit"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:bg-white transition-all text-sm"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-2">Additional Notes (Optional)</label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                    <textarea 
                      name="additionalNotes"
                      rows="3"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      placeholder="Describe any specific symptoms or extra details..."
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:bg-white transition-all text-sm resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex justify-end">
                  <button 
                    type="button"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 transition-all duration-200 text-sm opacity-90 cursor-default"
                  >
                    Proceed to Review
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: REVIEW & CONFIRM (UI Placeholder Present for Future Integration) */}
            {false && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-[22px] font-extrabold text-[#0F172A] mb-1">Review Your Appointment</h2>
                  <p className="text-[14px] text-slate-500">Verify all entered information carefully before submitting your booking request.</p>
                </div>

                <hr className="border-slate-100 my-4" />

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-3 flex items-center gap-1.5">
                      <User size={14} /> Patient Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                      <div>
                        <span className="text-slate-400 text-xs block">Full Name</span>
                        <strong className="text-slate-800">-</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-xs block">Phone Number</span>
                        <strong className="text-slate-800">-</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button 
                    type="button"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl text-sm"
                  >
                    <ArrowLeft size={16} />
                    Back to Edit
                  </button>

                  <button 
                    type="button"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0D9488] text-white font-semibold rounded-xl text-sm"
                  >
                    Confirm Appointment Request
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: REQUEST SUBMITTED / CONFIRMATION (UI Placeholder Present for Future Integration) */}
            {false && (
              <div className="space-y-6 text-center py-6">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner mb-4">
                  <CheckCircle2 size={42} />
                </div>

                <h2 className="text-[26px] font-extrabold text-[#0F172A]">Appointment Request Submitted</h2>
                <p className="text-[15px] text-slate-600 max-w-[500px] mx-auto">
                  Your appointment request has been submitted successfully and is now waiting for doctor confirmation.
                </p>

                <div className="inline-block bg-teal-50 border border-teal-200 px-6 py-3 rounded-2xl my-4">
                  <span className="text-xs text-teal-700 block font-medium">Reference Tracking ID</span>
                  <strong className="text-sm text-teal-900 tracking-wide font-medium">APT-2026-0000</strong>
                </div>

                <div className="pt-6">
                  <button 
                    type="button"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0D9488] text-white font-semibold rounded-xl text-sm"
                  >
                    Book Another Appointment
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Doctor Profile & Clinic Information Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Doctor Info Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-200/80">
              <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-[#0F766E] flex items-center justify-center text-white font-bold text-xl shadow-md">
                  DR
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-slate-900">{doctorData.name}</h3>
                  <p className="text-[13px] text-teal-700 font-medium">{doctorData.specialization}</p>
                </div>
              </div>

              <div className="pt-5 space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <Stethoscope size={18} className="text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block">Qualification</span>
                    <strong className="text-slate-800">{doctorData.qualification}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block">Clinic Address</span>
                    <strong className="text-slate-800">{doctorData.clinicAddress}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block">Consultation Hours</span>
                    <strong className="text-slate-800">{doctorData.consultationHours}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneCall size={18} className="text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block">Contact Number</span>
                    <strong className="text-slate-800">{doctorData.contactNumber}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  <span>{doctorData.rating}</span>
                  <span className="text-slate-400 font-normal text-xs">({doctorData.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck size={14} /> Verified
                </div>
              </div>
            </div>

            {/* Support / Help Card */}
            <div className="bg-gradient-to-br from-teal-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl">
              <h4 className="text-base font-bold mb-2">Need Immediate Assistance?</h4>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                If you are experiencing a severe medical emergency, please call emergency services immediately or visit the nearest hospital emergency room.
              </p>
              <div className="inline-flex items-center gap-2 text-teal-300 text-xs font-semibold">
                <Phone size={14} /> 24/7 Helpline: 1-800-HEALTH
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Appointment;