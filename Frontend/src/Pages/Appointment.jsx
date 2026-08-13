import React, { useState } from 'react';
import { clinicContactData, mockSlots, mockDoctor } from "../Data/doctorData";
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
  Check,
  Sparkles,
  MapPin,
  Star
} from 'lucide-react';

const Appointment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  
  
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

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!formData.preferredTime) {
      alert("Please select an available time slot before proceeding.");
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToConfirmation = () => {
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDetails = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setFormData({
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
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              {currentStep === 3 ? (
                <span className="bg-gradient-to-r from-white via-slate-100 to-teal-200 bg-clip-text text-transparent">
                  Appointment Request Submitted
                </span>
              ) : (
                <span className="bg-gradient-to-r from-white via-slate-100 to-teal-200 bg-clip-text text-transparent">
                  Book Your Consultation
                </span>
              )}
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
            <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${currentStep === 1 ? 'bg-teal-50 border border-teal-200 shadow-sm' : 'bg-slate-50 opacity-70'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${currentStep > 1 ? 'bg-emerald-600 text-white' : currentStep === 1 ? 'bg-[#0D9488] text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}>
                {currentStep > 1 ? <Check size={18} /> : '1'}
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-wider font-semibold text-slate-500">Step 1</p>
                <h4 className="text-[15px] font-bold text-slate-900">Patient Details</h4>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${currentStep === 2 ? 'bg-teal-50 border border-teal-200 shadow-sm' : 'bg-slate-50 opacity-70'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${currentStep > 2 ? 'bg-emerald-600 text-white' : currentStep === 2 ? 'bg-[#0D9488] text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}>
                {currentStep > 2 ? <Check size={18} /> : '2'}
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-wider font-semibold text-slate-500">Step 2</p>
                <h4 className="text-[15px] font-bold text-slate-900">Review & Confirm</h4>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${currentStep === 3 ? 'bg-teal-50 border border-teal-200 shadow-sm' : 'bg-slate-50 opacity-70'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${currentStep === 3 ? 'bg-[#0D9488] text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}>
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
              <form onSubmit={handleStep1Submit} className="space-y-6">
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
                        required
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
                        required
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
                        required
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
                        required
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
                      required
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
                        required
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:bg-white transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Time Slot Selection Component */}
                <div className="pt-4">
                  <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                    Available Time Slot <span className="text-red-500">*</span>
                  </label>
                  <p className="text-[12px] text-slate-500 mb-3">Select one of the available consultation intervals for your session.</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {mockSlots.map((slot, index) => {
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
                  {!formData.preferredTime && (
                    <p className="text-[11px] text-amber-600 mt-2 font-medium">Please pick a slot above to continue.</p>
                  )}
                </div>

                {/* Service / Reason for Visit */}
                <div className="pt-2">
                  <label className="block text-[13px] font-semibold text-slate-700 mb-2">Service / Reason for Visit <span className="text-red-500">*</span></label>
                  <select 
                    name="reasonForVisit"
                    required
                    value={formData.reasonForVisit}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:bg-white transition-all text-sm"
                  >
                    <option value="">Select Service / Reason</option>
                    <option value="General Consultation">General Consultation</option>
                    <option value="Follow-up Assessment">Follow-up Assessment</option>
                    <option value="Cardiology Consultation">Cardiology Consultation</option>
                    <option value="Health Checkup">Health Checkup</option>
                  </select>
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
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 transition-all duration-200 text-sm"
                  >
                    Proceed to Review
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: REVIEW & CONFIRM */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-[22px] font-extrabold text-[#0F172A] mb-1">Review Your Appointment</h2>
                  <p className="text-[14px] text-slate-500">Verify all entered information carefully before submitting your booking request.</p>
                </div>

                <hr className="border-slate-100 my-4" />

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-6">
                  
                  {/* Patient Info Section */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-3 flex items-center gap-1.5">
                      <User size={14} /> Patient Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                      <div>
                        <span className="text-slate-400 text-xs block">Full Name</span>
                        <strong className="text-slate-800">{formData.fullName}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-xs block">Phone Number</span>
                        <strong className="text-slate-800">{formData.phoneNumber}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-xs block">Email Address</span>
                        <strong className="text-slate-800">{formData.emailAddress}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-xs block">Age & Gender</span>
                        <strong className="text-slate-800">{formData.age} Years, {formData.gender}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details Section */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-3 flex items-center gap-1.5">
                      <Calendar size={14} /> Date, Time & Reason
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                      <div>
                        <span className="text-slate-400 text-xs block">Appointment Date</span>
                        <strong className="text-slate-800">{formData.preferredDate}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-xs block">Selected Slot</span>
                        <strong className="text-teal-700">{formData.preferredTime}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-xs block">Service / Reason</span>
                        <strong className="text-slate-800">{formData.reasonForVisit}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  {formData.additionalNotes && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-3 flex items-center gap-1.5">
                        <FileText size={14} /> Additional Notes
                      </h4>
                      <p className="text-sm bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-slate-700 italic">
                        "{formData.additionalNotes}"
                      </p>
                    </div>
                  )}

                  {/* Doctor Selected summary */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-3 flex items-center gap-1.5">
                      <Stethoscope size={14} /> Assigned Doctor & Clinic
                    </h4>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800">{mockDoctor.name}</p>
                        <p className="text-xs text-slate-500">{mockDoctor.specialization} • {mockDoctor.clinic}</p>
                      </div>
                      <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full border border-teal-200">
                        {mockDoctor.experience}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4">
                  <button 
                    type="button"
                    onClick={handleBackToDetails}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all duration-200 text-sm"
                  >
                    <ArrowLeft size={16} />
                    Back to Edit
                  </button>

                  <button 
                    type="button"
                    onClick={handleProceedToConfirmation}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 transition-all duration-200 text-sm"
                  >
                    Confirm Appointment Request
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: REQUEST SUBMITTED / CONFIRMATION */}
            {currentStep === 3 && (
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
                  <strong className="text-sm text-teal-900 tracking-wide font-medium"></strong>
                </div>

                {/* Details Breakdown */}
                <div className="max-w-[500px] mx-auto bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left space-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-200 pb-2.5">
                    <span className="text-slate-500">Doctor Name</span>
                    <strong className="text-slate-800">{mockDoctor.name}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2.5">
                    <span className="text-slate-500">Appointment Date</span>
                    <strong className="text-slate-800">{formData.preferredDate}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2.5">
                    <span className="text-slate-500">Selected Time Slot</span>
                    <strong className="text-teal-700">{formData.preferredTime}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2.5">
                    <span className="text-slate-500">Service</span>
                    <strong className="text-slate-800">{formData.reasonForVisit}</strong>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-slate-500">Request Status</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-300">
                      Pending Doctor Confirmation
                    </span>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 transition-all duration-200 text-sm"
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
                  <h3 className="text-[18px] font-bold text-slate-900">{mockDoctor.name}</h3>
                  <p className="text-[13px] text-teal-700 font-medium">{mockDoctor.specialization}</p>
                  <div className="flex items-center gap-1 mt-1 text-amber-500 text-xs font-semibold">
                    <Star size={14} fill="currentColor" />
                    <span>{mockDoctor.rating}</span>
                    <span className="text-slate-400 font-normal">({mockDoctor.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="py-5 space-y-4 text-sm border-b border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Experience</span>
                  <strong className="text-slate-800">{mockDoctor.experience}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Qualification</span>
                  <strong className="text-slate-800 text-right">{mockDoctor.qualification}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Clinic Name</span>
                  <strong className="text-slate-800">{mockDoctor.clinic}</strong>
                </div>
              </div>

              <div className="pt-5 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <MapPin size={16} className="text-teal-600 shrink-0 mt-0.5" />
                  <span>{mockDoctor.clinicAddress}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600">
                  <Clock size={16} className="text-teal-600 shrink-0" />
                  <span>{mockDoctor.consultationHours}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600">
                  <PhoneCall size={16} className="text-teal-600 shrink-0" />
                  <span>{mockDoctor.contactNumber}</span>
                </div>
              </div>
            </div>

            {/* Clinic / Trust Information Card */}
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white rounded-3xl p-6 shadow-xl shadow-slate-900/10 border border-slate-700/50 space-y-4">
              <h4 className="text-[15px] font-bold tracking-tight text-teal-300 flex items-center gap-2">
                <ShieldCheck size={18} /> Why Choose Our Platform?
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-teal-400" /> Trusted Medical Care & Specialists
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-teal-400" /> Qualified & Verified Practitioners
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-teal-400" /> Secure & Confidential Patient Data
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-teal-400" /> Patient-focused compassionate healthcare
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Appointment;