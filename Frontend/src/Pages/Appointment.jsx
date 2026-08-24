import React, { useState, useEffect } from 'react';
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
  Star,
  Award,
  Building,
  Layers,
  Home,
  CheckCircle
} from 'lucide-react';

const Appointment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');
  
  // New state for Approved Appointment Details feature
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [fetchingAppointment, setFetchingAppointment] = useState(false);
  
  // Dynamic Doctor State
  const [doctorData, setDoctorData] = useState({
    name: 'Loading...',
    specialization: '',
    experience: '',
    qualification: '',
    medicalLicenseNo: '',
    rating: '5.0',
    reviews: 0,
    clinicAddress: '',
    consultationHours: '',
    contactNumber: ''
  });

  const [doctorSchedule, setDoctorSchedule] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [dateError, setDateError] = useState("");

  // Get today's date in YYYY-MM-DD format for default selection
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    age: '',
    gender: '',
    preferredDate: getTodayDateString(),
    preferredTime: '',
    reasonForVisit: '',
    additionalNotes: ''
  });

  // Fetch Logged-in Doctor Profile & Schedule from Backend
  useEffect(() => {
    fetch('http://localhost:5000/api/doctors/profile', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        const doc = data.doctor || data;
        if (doc) {
          setDoctorData(prev => ({
            ...prev,
            name: doc.name || doc.fullName || 'Dr. Ridhi',
            specialization: doc.specialization || '',
            experience: doc.experience ? `${doc.experience} Years Exp` : '0+ Years Exp',
            qualification: doc.qualification || 'MBBS',
            medicalLicenseNo: doc.medicalRegistrationNo || doc.medicalLicenseNo || doc.licenseNo || '444',
            rating: doc.rating || '4.9',
            reviews: doc.reviewsCount || 480,
            clinicAddress: doc.clinicAddress || doc.address || 'Clinic Location',
            contactNumber: doc.phoneNumber || doc.contactNumber || doc.phone || '7890765457'
          }));
        }
      })
      .catch(err => console.error("Error fetching doctor profile:", err));

    fetch('http://localhost:5000/api/doctors/public-schedule')
      .then(res => res.json())
      .then(data => {
        if (data.schedule) {
          setDoctorSchedule(data.schedule);
          
          if (data.schedule.activeDays) {
            const daysStr = data.schedule.activeDays.join(', ');
            let timeStr = '';
            if (data.schedule.morningSession?.enabled) {
              timeStr = `${data.schedule.morningSession.startTime} - ${data.schedule.morningSession.endTime}`;
            } else if (data.schedule.afternoonSession?.enabled) {
              timeStr = `${data.schedule.afternoonSession.startTime} - ${data.schedule.afternoonSession.endTime}`;
            }
            setDoctorData(prev => ({
              ...prev,
              consultationHours: timeStr ? `${daysStr}, ${timeStr}` : daysStr
            }));
          }
        }
      })
      .catch(err => console.error("Error fetching schedule:", err));
  }, []);

  const generateSlotsForDate = (dateString, schedule) => {
    if (!dateString || !schedule) return [];
    
    const dateObj = new Date(dateString);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = dayNames[dateObj.getDay()];
    
    if (schedule.activeDays && !schedule.activeDays.includes(dayOfWeek)) {
      setDateError(`Doctor is not available on ${dayOfWeek}s.`);
      return [];
    }
    
    setDateError("");
    
    if (schedule.customSlots && schedule.customSlots[dayOfWeek]) {
      return schedule.customSlots[dayOfWeek];
    }
    
    if (schedule.slots && Array.isArray(schedule.slots)) {
      return schedule.slots;
    }

    const slots = [];
    const slotDur = parseInt(schedule.slotDuration) || 30;
    const buffer = parseInt(schedule.bufferTime) || 0;
    
    const timeToMinutes = (timeStr) => {
      if (!timeStr) return 0;
      const [time, period] = timeStr.split(' ');
      if (!time || !period) return 0;
      let [hours, minutes] = time.split(':').map(Number);
      if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
      if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };
    
    const minutesToTime = (mins) => {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      const period = h >= 12 ? 'PM' : 'AM';
      const formattedH = h % 12 === 0 ? 12 : h % 12;
      const formattedM = m.toString().padStart(2, '0');
      return `${formattedH.toString().padStart(2, '0')}:${formattedM} ${period}`;
    };

    const addSessionSlots = (session) => {
      if (!session || !session.enabled) return;
      const startMins = timeToMinutes(session.startTime);
      const endMins = timeToMinutes(session.endTime);
      
      let currentMins = startMins;
      while (currentMins + slotDur <= endMins) {
        slots.push(minutesToTime(currentMins));
        currentMins += (slotDur + buffer);
      }
    };

    if (schedule.morningSession) addSessionSlots(schedule.morningSession);
    if (schedule.afternoonSession) addSessionSlots(schedule.afternoonSession);
    if (schedule.eveningSession) addSessionSlots(schedule.eveningSession);
    
    if (slots.length === 0) {
       setDateError("No slots available for the selected day based on session timings.");
    }
    
    return slots;
  };

  useEffect(() => {
    if (formData.preferredDate && doctorSchedule) {
      const generatedSlots = generateSlotsForDate(formData.preferredDate, doctorSchedule);
      setAvailableSlots(generatedSlots);
      if (!generatedSlots.includes(formData.preferredTime)) {
        setFormData(prev => ({ ...prev, preferredTime: '' }));
      }
    } else {
      setAvailableSlots([]);
      setDateError("");
    }
  }, [formData.preferredDate, doctorSchedule]);

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

  const handleSubmitAppointment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const textResponse = await response.text(); 
      let result;
      
      try {
        result = JSON.parse(textResponse);
      } catch (parseErr) {
        console.error("Non-JSON response received from server:", textResponse);
        throw new Error("Server returned an invalid response format (not JSON). Check backend terminal.");
      }

      if (!response.ok) {
        throw new Error(result.message || result.error || 'Failed to book appointment');
      }

      const appointmentObj = result.data || result.appointment || result;
      const refId = appointmentObj?._id || appointmentObj?.id || 'SUCCESS-' + Math.floor(Math.random() * 100000);
      setReferenceId(refId);
      setAppointmentDetails(appointmentObj);
      setCurrentStep(3);
    } catch (err) {
      console.error("Booking error:", err);
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch/refresh updated appointment status from backend
  const fetchAppointmentStatus = async (id) => {
    if (!id) return;
    setFetchingAppointment(true);
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${id}`);
      if (response.ok) {
        const result = await response.json();
        const appt = result.data || result.appointment || result;
        if (appt) {
          setAppointmentDetails(appt);
        }
      }
    } catch (err) {
      console.error("Error fetching appointment status:", err);
    } finally {
      setFetchingAppointment(false);
    }
  };

  // Poll or check appointment details if reference ID exists and status is not yet approved
  useEffect(() => {
    if (referenceId && appointmentDetails?.status !== 'Approved') {
      const interval = setInterval(() => {
        fetchAppointmentStatus(referenceId);
      }, 10000); // Check every 10 seconds for updates
      return () => clearInterval(interval);
    }
  }, [referenceId, appointmentDetails?.status]);

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
            <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${currentStep === 1 ? 'bg-teal-50 border border-teal-200 shadow-sm' : 'bg-slate-50 opacity-70'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${currentStep === 1 ? 'bg-[#0D9488] text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}>1</div>
              <div>
                <p className="text-[12px] uppercase tracking-wider font-semibold text-slate-500">Step 1</p>
                <h4 className="text-[15px] font-bold text-slate-900">Patient Details</h4>
              </div>
            </div>

            <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${currentStep === 2 ? 'bg-teal-50 border border-teal-200 shadow-sm' : 'bg-slate-50 opacity-70'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${currentStep === 2 ? 'bg-[#0D9488] text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}>2</div>
              <div>
                <p className="text-[12px] uppercase tracking-wider font-semibold text-slate-500">Step 2</p>
                <h4 className="text-[15px] font-bold text-slate-900">Review & Confirm</h4>
              </div>
            </div>

            <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${currentStep === 3 ? 'bg-teal-50 border border-teal-200 shadow-sm' : 'bg-slate-50 opacity-70'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${currentStep === 3 ? 'bg-[#0D9488] text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}>3</div>
              <div>
                <p className="text-[12px] uppercase tracking-wider font-semibold text-slate-500">Step 3</p>
                <h4 className="text-[15px] font-bold text-slate-900">Confirmation & Status</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-200/80">
            
            {/* STEP 1 */}
            {currentStep === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-6">
                <div>
                  <h2 className="text-[22px] font-extrabold text-[#0F172A] mb-1">Patient Information & Appointment Details</h2>
                  <p className="text-[14px] text-slate-500">Please fill out your personal information and choose an optimal slot.</p>
                </div>

                <hr className="border-slate-100 my-4" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

                {/* Time Slot Selection Component */}
                <div className="pt-4">
                  <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                    Available Time Slot <span className="text-red-500">*</span>
                  </label>
                  
                  {!formData.preferredDate ? (
                    <p className="text-[12px] text-slate-500 mb-3 bg-slate-50 p-3 rounded-lg border border-slate-200">Please select an Appointment Date first to view available slots.</p>
                  ) : dateError ? (
                    <p className="text-[12px] text-red-500 mb-3 bg-red-50 p-3 rounded-lg border border-red-200">{dateError}</p>
                  ) : availableSlots.length === 0 ? (
                    <p className="text-[12px] text-slate-500 mb-3 bg-slate-50 p-3 rounded-lg border border-slate-200">Loading or no time slots available for this date.</p>
                  ) : (
                    <>
                      <p className="text-[12px] text-slate-500 mb-3">Select one of the available consultation intervals configured by the doctor.</p>
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
                    </>
                  )}
                </div>

                <div className="pt-2">
                  <label className="block text-[13px] font-semibold text-slate-700 mb-2">Service / Reason for Visit <span className="text-red-500">*</span></label>
                  <input 
                    type="text"
                    name="reasonForVisit"
                    value={formData.reasonForVisit}
                    onChange={handleChange}
                    placeholder="Enter service or reason for your visit"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:bg-white transition-all text-sm"
                  />
                </div>

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

                <div className="pt-4 flex justify-end">
                  <button 
                    type="button"
                    onClick={() => {
                      const missing = [];
                      if (!formData.fullName) missing.push("Full Name");
                      if (!formData.phoneNumber) missing.push("Phone Number");
                      if (!formData.emailAddress) missing.push("Email Address");
                      if (!formData.age) missing.push("Age");
                      if (!formData.gender) missing.push("Gender");
                      if (!formData.preferredDate) missing.push("Appointment Date");
                      if (!formData.preferredTime) missing.push("Time Slot");
                      if (!formData.reasonForVisit) missing.push("Reason for Visit");
                      
                      if (missing.length > 0) {
                        alert('Please fill out the following required fields:\n- ' + missing.join('\n- '));
                        return;
                      }
                      setCurrentStep(2);
                    }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 transition-all duration-200 text-sm cursor-pointer"
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
                  <p className="text-[14px] text-slate-500">Please verify your details before confirming submission.</p>
                </div>

                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {errorMessage}
                  </div>
                )}

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-500 block text-xs">Full Name</span>
                      <strong className="text-slate-800 text-base">{formData.fullName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">Phone Number</span>
                      <strong className="text-slate-800 text-base">{formData.phoneNumber}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-500 block text-xs">Email Address</span>
                      <strong className="text-slate-800">{formData.emailAddress}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">Age & Gender</span>
                      <strong className="text-slate-800">{formData.age} yrs, {formData.gender}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                    <div>
                      <span className="text-slate-500 block text-xs">Appointment Date</span>
                      <strong className="text-teal-700">{formData.preferredDate || 'Not selected'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">Time Slot</span>
                      <strong className="text-teal-700">{formData.preferredTime || 'Not selected'}</strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-xs">Reason for Visit</span>
                    <strong className="text-slate-800">{formData.reasonForVisit}</strong>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all text-sm cursor-pointer"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>

                  <button 
                    type="button"
                    disabled={loading}
                    onClick={handleSubmitAppointment}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 transition-all text-sm cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Confirm & Submit'}
                    <CheckCircle2 size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SUBMITTED / PENDING / APPROVED CARD */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center py-6 bg-slate-50 rounded-2xl border border-slate-200/80 p-6">
                  <div className="w-16 h-16 bg-teal-100 text-[#0D9488] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <CheckCircle2 size={32} />
                  </div>
                  <h2 className="text-[22px] font-extrabold text-[#0F172A] mb-1">Appointment Submitted Successfully!</h2>
                  <p className="text-[14px] text-slate-500 max-w-md mx-auto mb-4">
                    Your appointment request has been sent and is currently <span className="font-semibold text-amber-600">Pending</span> review by the admin or doctor.
                  </p>
                  <div className="inline-block bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-600 mb-4">
                    Reference ID: <strong className="text-slate-900">{referenceId}</strong>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => fetchAppointmentStatus(referenceId)}
                      className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-all"
                    >
                      {fetchingAppointment ? 'Checking Status...' : 'Check Status Now'}
                    </button>
                  </div>
                </div>

                {/* NEW: APPROVED APPOINTMENT DETAILS CARD */}
                {appointmentDetails && appointmentDetails.status === 'Approved' && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-teal-200 space-y-6 mt-6 animate-fade-in">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
                      <div>
                        <span className="text-xs uppercase tracking-wider font-bold text-teal-600">Confirmed Booking</span>
                        <h3 className="text-2xl font-extrabold text-slate-900">Approved Appointment Details</h3>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold shadow-sm">
                        <CheckCircle size={14} className="text-emerald-600" />
                        Approved
                      </div>
                    </div>

                    {/* Sections Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      
                      {/* Patient Details */}
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
                          <User size={16} className="text-teal-600" />
                          Patient Details
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div><span className="text-slate-500">Patient Name:</span> <strong className="text-slate-800">{appointmentDetails.fullName || formData.fullName}</strong></div>
                          <div><span className="text-slate-500">Age / Gender:</span> <strong className="text-slate-800">{appointmentDetails.age || formData.age} yrs, {appointmentDetails.gender || formData.gender}</strong></div>
                          <div><span className="text-slate-500">Phone Number:</span> <strong className="text-slate-800">{appointmentDetails.phoneNumber || formData.phoneNumber}</strong></div>
                          <div><span className="text-slate-500">Email:</span> <strong className="text-slate-800">{appointmentDetails.emailAddress || formData.emailAddress}</strong></div>
                        </div>
                      </div>

                      {/* Doctor Details */}
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
                          <Stethoscope size={16} className="text-teal-600" />
                          Doctor Details
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div><span className="text-slate-500">Doctor Name:</span> <strong className="text-slate-800">{doctorData.name}</strong></div>
                          <div><span className="text-slate-500">Specialization:</span> <strong className="text-slate-800">{doctorData.specialization || 'General Practitioner'}</strong></div>
                          {appointmentDetails.department && (
                            <div><span className="text-slate-500">Department:</span> <strong className="text-slate-800">{appointmentDetails.department}</strong></div>
                          )}
                        </div>
                      </div>

                      {/* Appointment Details */}
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
                          <Calendar size={16} className="text-teal-600" />
                          Appointment Details
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div><span className="text-slate-500">Appointment ID:</span> <strong className="text-slate-800">{appointmentDetails._id || referenceId}</strong></div>
                          <div><span className="text-slate-500">Appointment Date:</span> <strong className="text-teal-700">{appointmentDetails.preferredDate || formData.preferredDate}</strong></div>
                          <div><span className="text-slate-500">Appointment Time:</span> <strong className="text-teal-700">{appointmentDetails.preferredTime || formData.preferredTime}</strong></div>
                          <div><span className="text-slate-500">Status:</span> <strong className="text-emerald-600">Approved</strong></div>
                        </div>
                      </div>

                      {/* Hospital / Room Details (Conditional Rendering) */}
                      {(appointmentDetails.hospitalName || appointmentDetails.hospitalAddress || appointmentDetails.buildingName || appointmentDetails.floorNumber || appointmentDetails.wardNumber || appointmentDetails.roomNumber || appointmentDetails.bedNumber) && (
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
                          <h4 className="font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
                            <Building size={16} className="text-teal-600" />
                            Hospital / Room Details
                          </h4>
                          <div className="space-y-2 text-xs">
                            {appointmentDetails.hospitalName && (
                              <div><span className="text-slate-500">Hospital Name:</span> <strong className="text-slate-800">{appointmentDetails.hospitalName}</strong></div>
                            )}
                            {appointmentDetails.hospitalAddress && (
                              <div><span className="text-slate-500">Hospital Address:</span> <strong className="text-slate-800">{appointmentDetails.hospitalAddress}</strong></div>
                            )}
                            {appointmentDetails.buildingName && (
                              <div><span className="text-slate-500">Building Name:</span> <strong className="text-slate-800">{appointmentDetails.buildingName}</strong></div>
                            )}
                            {appointmentDetails.floorNumber && (
                              <div><span className="text-slate-500">Floor Number:</span> <strong className="text-slate-800">{appointmentDetails.floorNumber}</strong></div>
                            )}
                            {appointmentDetails.wardNumber && (
                              <div><span className="text-slate-500">Ward Number:</span> <strong className="text-slate-800">{appointmentDetails.wardNumber}</strong></div>
                            )}
                            {appointmentDetails.roomNumber && (
                              <div><span className="text-slate-500">Room Number:</span> <strong className="text-slate-800">{appointmentDetails.roomNumber}</strong></div>
                            )}
                            {appointmentDetails.bedNumber && (
                              <div><span className="text-slate-500">Bed Number:</span> <strong className="text-slate-800">{appointmentDetails.bedNumber}</strong></div>
                            )}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* Sidebar Doctor Profile Info */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-200/80 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0D9488] to-teal-400 text-white flex items-center justify-center font-bold text-xl shadow-md">
                <Stethoscope size={32} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#0F172A]">{doctorData.name}</h3>
                <p className="text-xs font-semibold text-teal-700">{doctorData.specialization}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-slate-700">{doctorData.rating}</span>
                  <span className="text-[11px] text-slate-400">({doctorData.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Award size={15} className="text-[#0D9488] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block">Qualifications</span>
                  <strong className="text-slate-800">{doctorData.qualification} ({doctorData.experience})</strong>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck size={15} className="text-[#0D9488] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block">Medical License No.</span>
                  <strong className="text-slate-800">{doctorData.medicalLicenseNo}</strong>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#0D9488] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block">Clinic Address</span>
                  <strong className="text-slate-800">{doctorData.clinicAddress}</strong>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock size={15} className="text-[#0D9488] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block">Consultation Hours</span>
                  <strong className="text-slate-800">{doctorData.consultationHours || 'Mon - Sat: 9:00 AM - 5:00 PM'}</strong>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <PhoneCall size={15} className="text-[#0D9488] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block">Helpline / Support</span>
                  <strong className="text-slate-800">{doctorData.contactNumber}</strong>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Appointment;