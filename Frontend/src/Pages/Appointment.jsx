import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  CheckCircle,
  XCircle,
  RefreshCw,
  Lock
} from 'lucide-react';

const Appointment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');
  
  // State for Approved Appointment Details feature
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
  const location = useLocation();

  // Effect to catch query parameters like ?slot=09:00%20AM
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const slotParam = params.get('slot');
    if (slotParam) {
      setFormData(prev => ({
        ...prev,
        preferredTime: slotParam
      }));
    }
  }, [location.search]);

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

      // If backend sends status 400 (e.g. duplicate active appointment or missing fields)
      if (!response.ok) {
        throw new Error(result.message || result.error || 'Failed to book appointment');
      }

      const appointmentObj = result.data || result.appointment || result;
      const refId = appointmentObj?._id || appointmentObj?.id || 'SUCCESS-' + Math.floor(Math.random() * 100000);
      setReferenceId(refId);
      setAppointmentDetails(appointmentObj);
      setCurrentStep(3); // Moves to status step only if successful
    } catch (err) {
      console.error("Booking error:", err);
      setErrorMessage(err.message); // Displays "You already have an active appointment." cleanly
      setCurrentStep(2); // Keeps user on review step so they can see the error message clearly
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
          const currentStatus = appt?.status?.toLowerCase();
          if (currentStatus === 'approved') {
            setCurrentStep(4);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching appointment status:", err);
    } finally {
      setFetchingAppointment(false);
    }
  };

  // Poll appointment details every 10 seconds until Approved or Rejected
  useEffect(() => {
    const status = appointmentDetails?.status?.toLowerCase();
    if (referenceId && status !== 'approved' && status !== 'rejected') {
      const interval = setInterval(() => {
        fetchAppointmentStatus(referenceId);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [referenceId, appointmentDetails?.status]);

  const currentStatusNormalized = appointmentDetails?.status?.toLowerCase() || 'pending';
  const isApproved = currentStatusNormalized === 'approved';

  // Validation check helper for navigating to Step 2
  const validateStep1Fields = () => {
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
      alert('Please fill out the following required fields before proceeding:\n- ' + missing.join('\n- '));
      return false;
    }
    return true;
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

        {/* Stepper Header (Clickable Steps) */}
        <div className="mb-10 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/85">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Step 1 */}
            <div 
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-3 p-3.5 rounded-xl transition-all cursor-pointer hover:shadow-md hover:border-teal-300 border ${currentStep === 1 ? 'bg-teal-50 border-teal-200 shadow-sm' : 'bg-slate-50 border-slate-200/80'}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${currentStep === 1 ? 'bg-[#0D9488] text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}>1</div>
              <div>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">Step 1</p>
                <h4 className="text-[14px] font-bold text-slate-900">Patient Details</h4>
              </div>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => {
                if (validateStep1Fields()) {
                  setCurrentStep(2);
                }
              }}
              className={`flex items-center gap-3 p-3.5 rounded-xl transition-all cursor-pointer hover:shadow-md hover:border-teal-300 border ${currentStep === 2 ? 'bg-teal-50 border-teal-200 shadow-sm' : 'bg-slate-50 border-slate-200/80'}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${currentStep === 2 ? 'bg-[#0D9488] text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}>2</div>
              <div>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">Step 2</p>
                <h4 className="text-[14px] font-bold text-slate-900">Review & Confirm</h4>
              </div>
            </div>

            {/* Step 3 */}
            <div 
              onClick={() => {
                if (!referenceId) {
                  alert("Please review and submit your appointment first.");
                  return;
                }
                setCurrentStep(3);
              }}
              className={`flex items-center gap-3 p-3.5 rounded-xl transition-all border ${
                referenceId ? 'cursor-pointer hover:shadow-md hover:border-teal-300' : 'opacity-60 cursor-not-allowed'
              } ${currentStep === 3 ? 'bg-teal-50 border-teal-200 shadow-sm' : 'bg-slate-50 border-slate-200/80'}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${currentStep === 3 ? 'bg-[#0D9488] text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}>3</div>
              <div>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">Step 3</p>
                <h4 className="text-[14px] font-bold text-slate-900">Application Status</h4>
              </div>
            </div>

            {/* Step 4 */}
            <div 
              onClick={() => {
                if (isApproved) {
                  setCurrentStep(4);
                }
              }}
              className={`flex items-center gap-3 p-3.5 rounded-xl transition-all border ${
                isApproved ? 'cursor-pointer hover:shadow-md hover:border-teal-300' : 'opacity-50 cursor-not-allowed'
              } ${currentStep === 4 ? 'bg-teal-50 border-teal-200 shadow-sm' : 'bg-slate-50 border-slate-200/80'}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${currentStep === 4 ? 'bg-[#0D9488] text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}>
                {isApproved ? '4' : <Lock size={14} />}
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">Step 4</p>
                <h4 className="text-[14px] font-bold text-slate-900 flex items-center gap-1">
                  Approved Details
                </h4>
              </div>
            </div>

          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-200/80">
            
            {/* STEP 1: PATIENT DETAILS */}
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
                 {/* Time Slot Selection Component */}
                <div className="pt-4">
                  <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                    Selected Time Slot <span className="text-red-500">*</span>
                  </label>
                  
                  {formData.preferredTime && new URLSearchParams(location.search).get('slot') ? (
                    /* If a slot was passed directly via URL, lock and display just that slot */
                    <div className="flex items-center gap-3">
                      <div className="py-3 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 bg-[#0D9488] text-white border-[#0D9488] shadow-md">
                        <Clock size={14} />
                        {formData.preferredTime}
                      </div>
                      <span className="text-xs text-slate-500 italic">Slot pre-selected from your schedule.</span>
                    </div>
                  ) : !formData.preferredDate ? (
                    <p className="text-[12px] text-slate-500 mb-3 bg-slate-50 p-3 rounded-lg border border-slate-200">Please select an Appointment Date first to view available slots.</p>
                  ) : dateError ? (
                    <p className="text-[12px] text-red-500 mb-3 bg-red-50 p-3 rounded-lg border border-red-200">{dateError}</p>
                  ) : availableSlots.length === 0 ? (
                    <p className="text-[12px] text-slate-500 mb-3 bg-slate-50 p-3 rounded-lg border border-red-200">Loading or no time slots available for this date.</p>
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
                      if (validateStep1Fields()) {
                        setCurrentStep(2);
                      }
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
                      <strong className="text-slate-800 text-base">{formData.emailAddress}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">Age & Gender</span>
                      <strong className="text-slate-800 text-base">{formData.age} yrs, {formData.gender}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-500 block text-xs">Appointment Date</span>
                      <strong className="text-slate-800 text-base">{formData.preferredDate}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">Time Slot</span>
                      <strong className="text-teal-700 text-base">{formData.preferredTime}</strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-xs">Reason for Visit</span>
                    <strong className="text-slate-800 text-base">{formData.reasonForVisit}</strong>
                  </div>

                  {formData.additionalNotes && (
                    <div>
                      <span className="text-slate-500 block text-xs">Additional Notes</span>
                      <p className="text-slate-700 mt-1">{formData.additionalNotes}</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all text-sm"
                  >
                    <ArrowLeft size={16} />
                    Go Back & Edit
                  </button>

                  <button 
                    type="button"
                    disabled={loading}
                    onClick={handleSubmitAppointment}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 transition-all text-sm disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? 'Submitting...' : 'Confirm & Submit'}
                    <CheckCircle2 size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: APPLICATION STATUS */}
            {currentStep === 3 && (
              <div className="space-y-6 text-center py-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0D9488] shadow-inner mb-4">
                  <ShieldCheck size={40} />
                </div>

                <div>
                  <h2 className="text-[24px] font-extrabold text-[#0F172A] mb-1">Application Submitted</h2>
                  <p className="text-[14px] text-slate-500">Your appointment request has been successfully recorded in the system.</p>
                </div>

                <div className="inline-block bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left max-w-[450px] w-full mx-auto space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-xs text-slate-500 font-medium">Reference / Appointment ID</span>
                    <strong className="text-xs text-slate-900 font-mono bg-white px-2.5 py-1 rounded border border-slate-200">{referenceId}</strong>
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs text-slate-500 font-medium">Current Status</span>
                    <div>
                      {currentStatusNormalized === 'approved' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle size={13} /> Approved
                        </span>
                      )}
                      {currentStatusNormalized === 'rejected' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                          <XCircle size={13} /> Rejected
                        </span>
                      )}
                      {currentStatusNormalized === 'under review' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                          <Clock size={13} /> Under Review
                        </span>
                      )}
                      {currentStatusNormalized === 'pending' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                          <Clock size={13} /> Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status-specific messages */}
                <div className="max-w-[450px] mx-auto p-4 rounded-xl text-sm border bg-slate-50 border-slate-200 text-slate-700">
                  {currentStatusNormalized === 'pending' && "Your appointment application has been submitted successfully and is waiting for doctor/admin approval."}
                  {currentStatusNormalized === 'under review' && "Your application is currently being reviewed by our clinical coordination team."}
                  {currentStatusNormalized === 'approved' && "Congratulations! Your appointment has been approved. Please check your confirmed appointment details."}
                  {currentStatusNormalized === 'rejected' && "Unfortunately, your appointment request was not approved. Please contact support or submit another request."}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    type="button"
                    disabled={fetchingAppointment}
                    onClick={() => fetchAppointmentStatus(referenceId)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all text-xs"
                  >
                    <RefreshCw size={14} className={fetchingAppointment ? "animate-spin" : ""} />
                    Refresh Status
                  </button>

                  {isApproved && (
                    <button 
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 transition-all text-xs"
                    >
                      View Approved Details
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4: APPROVED APPOINTMENT DETAILS */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
                    <CheckCircle size={14} /> Confirmed & Approved
                  </div>
                  <h2 className="text-[22px] font-extrabold text-[#0F172A]">Approved Appointment Details</h2>
                  <p className="text-[14px] text-slate-500">Here are your final verified clinical visit coordinates and doctor assignment.</p>
                </div>

                <hr className="border-slate-100 my-4" />

                {/* Dashboard-style cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  
                  {/* Patient Info Card */}
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                    <h3 className="flex items-center gap-2 font-bold text-slate-800 text-base pb-2 border-b border-slate-200">
                      <User size={18} className="text-[#0D9488]" /> Patient Information
                    </h3>
                    <div className="space-y-1.5">
                      <div><span className="text-slate-500 text-xs">Name:</span> <strong className="text-slate-800 ml-2">{appointmentDetails?.fullName || formData.fullName}</strong></div>
                      <div><span className="text-slate-500 text-xs">Age & Gender:</span> <strong className="text-slate-800 ml-2">{appointmentDetails?.age || formData.age} yrs, {appointmentDetails?.gender || formData.gender}</strong></div>
                      <div><span className="text-slate-500 text-xs">Phone:</span> <strong className="text-slate-800 ml-2">{appointmentDetails?.phoneNumber || formData.phoneNumber}</strong></div>
                      <div><span className="text-slate-500 text-xs">Email:</span> <strong className="text-slate-800 ml-2">{appointmentDetails?.emailAddress || formData.emailAddress}</strong></div>
                    </div>
                  </div>

                  {/* Doctor Info Card */}
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                    <h3 className="flex items-center gap-2 font-bold text-slate-800 text-base pb-2 border-b border-slate-200">
                      <Stethoscope size={18} className="text-[#0D9488]" /> Doctor Information
                    </h3>
                    <div className="space-y-1.5">
                      <div><span className="text-slate-500 text-xs">Doctor Name:</span> <strong className="text-slate-800 ml-2">{appointmentDetails?.doctorName || doctorData.name}</strong></div>
                      <div><span className="text-slate-500 text-xs">Specialization:</span> <strong className="text-slate-800 ml-2">{appointmentDetails?.specialization || doctorData.specialization || 'General Practitioner'}</strong></div>
                      <div><span className="text-slate-500 text-xs">Department:</span> <strong className="text-slate-800 ml-2">{appointmentDetails?.department || 'Outpatient Department'}</strong></div>
                      {doctorData.contactNumber && (
                        <div><span className="text-slate-500 text-xs">Contact Number:</span> <strong className="text-slate-800 ml-2">{doctorData.contactNumber}</strong></div>
                      )}
                    </div>
                  </div>

                  {/* Confirmed Appointment Card */}
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                    <h3 className="flex items-center gap-2 font-bold text-slate-800 text-base pb-2 border-b border-slate-200">
                      <Calendar size={18} className="text-[#0D9488]" /> Confirmed Schedule
                    </h3>
                    <div className="space-y-1.5">
                      <div><span className="text-slate-500 text-xs">Appointment ID:</span> <strong className="text-slate-800 font-mono ml-2 text-xs">{appointmentDetails?._id || referenceId}</strong></div>
                      <div><span className="text-slate-500 text-xs">Confirmed Date:</span> <strong className="text-slate-800 ml-2">{appointmentDetails?.preferredDate || formData.preferredDate}</strong></div>
                      <div><span className="text-slate-500 text-xs">Confirmed Time:</span> <strong className="text-teal-700 ml-2">{appointmentDetails?.preferredTime || formData.preferredTime}</strong></div>
                      <div><span className="text-slate-500 text-xs">Status:</span> <strong className="text-emerald-700 ml-2 uppercase font-bold">Approved</strong></div>
                    </div>
                  </div>

                  {/* Patient Problem Card */}
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                    <h3 className="flex items-center gap-2 font-bold text-slate-800 text-base pb-2 border-b border-slate-200">
                      <FileText size={18} className="text-[#0D9488]" /> Problem / Description
                    </h3>
                    <div className="space-y-1.5">
                      <div><span className="text-slate-500 text-xs">Reason for Visit:</span> <strong className="text-slate-800 ml-2">{appointmentDetails?.reasonForVisit || formData.reasonForVisit}</strong></div>
                      {appointmentDetails?.additionalNotes && (
                        <div><span className="text-slate-500 text-xs">Notes:</span> <p className="text-slate-700 text-xs mt-1">{appointmentDetails.additionalNotes}</p></div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Hospital & Location Information (Conditional Render) */}
                {(appointmentDetails?.hospitalName || appointmentDetails?.hospitalAddress || appointmentDetails?.buildingName || appointmentDetails?.floorNumber || appointmentDetails?.roomNumber) && (
                  <div className="bg-teal-50/60 rounded-2xl p-6 border border-teal-200 space-y-3 mt-4">
                    <h3 className="flex items-center gap-2 font-bold text-slate-800 text-base pb-2 border-b border-teal-200">
                      <Building size={18} className="text-[#0D9488]" /> Hospital / Visit Location Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      {appointmentDetails.hospitalName && (
                        <div><span>Hospital Name:</span> <strong className="text-slate-800 ml-2">{appointmentDetails.hospitalName}</strong></div>
                      )}
                      {appointmentDetails.hospitalAddress && (
                        <div><span>Hospital Address:</span> <strong className="text-slate-800 ml-2">{appointmentDetails.hospitalAddress}</strong></div>
                      )}
                      {appointmentDetails.buildingName && (
                        <div><span>Building Name:</span> <strong className="text-slate-800 ml-2">{appointmentDetails.buildingName}</strong></div>
                      )}
                      {appointmentDetails.floorNumber && (
                        <div><span>Floor Number:</span> <strong className="text-slate-800 ml-2">{appointmentDetails.floorNumber}</strong></div>
                      )}
                      {appointmentDetails.wardNumber && (
                        <div><span>Ward Number:</span> <strong className="text-slate-800 ml-2">{appointmentDetails.wardNumber}</strong></div>
                      )}
                      {appointmentDetails.roomNumber && (
                        <div><span>Room Number:</span> <strong className="text-slate-800 ml-2">{appointmentDetails.roomNumber}</strong></div>
                      )}
                      {appointmentDetails.bedNumber && (
                        <div><span>Bed Number:</span> <strong className="text-slate-800 ml-2">{appointmentDetails.bedNumber}</strong></div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* Sidebar Info Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-200/80">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0D9488] font-bold text-xl shadow-sm">
                  {doctorData.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0F172A]">{doctorData.name}</h3>
                  <p className="text-xs text-teal-600 font-semibold">{doctorData.specialization}</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Experience</span>
                  <span className="font-semibold text-slate-800">{doctorData.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Qualification</span>
                  <span className="font-semibold text-slate-800">{doctorData.qualification}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Consultation Timings</span>
                  <span className="font-semibold text-slate-800 text-right max-w-[160px]">{doctorData.consultationHours || 'Mon - Sat'}</span>
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