import {
  Activity,
  HeartPulse,
  ShieldPlus,
  Stethoscope,
  HeartHandshake,
  Clock,
  Award,
  BriefcaseMedical,
  Syringe,
  Headset,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export const stats = [
  {
    number: "10K+",
    label: "Patients Treated",
  },
  {
    number: "15+",
    label: "Years Experience",
  },
  {
    number: "25K+",
    label: "Consultations",
  },
  {
    number: "99%",
    label: "Satisfaction Rate",
  },
];

export const services = [
  {
    icon: Activity,
    title: "Cardiac Screening",
    description:
      "Advanced diagnostics including ECG, Stress Tests, and high-resolution imaging to detect heart conditions early.",
  },
  {
    icon: HeartPulse,
    title: "Hypertension Care",
    description:
      "Holistic management of blood pressure through medical intervention, lifestyle coaching, and regular monitoring.",
  },
  {
    icon: ShieldPlus,
    title: "Heart Failure Care",
    description:
      "Specialized long-term management strategies designed to improve quality of life and heart function longevity.",
  },
  {
    icon: Stethoscope,
    title: "Preventive Cardiology",
    description:
      "Comprehensive risk assessments and personalized wellness programs to keep your cardiovascular system robust.",
  },
  {
    icon: HeartHandshake,
    title: "Post-Operative Recovery",
    description:
      "Guided rehabilitation programs ensuring a safe and swift transition back to a healthy daily lifestyle.",
  },
  {
    icon: Clock,
    title: "24/7 Emergency Support",
    description:
      "Immediate response protocols and rapid evaluation units for critical heart-related complications.",
  },
];

export const features = [
  {
    icon: Award,
    title: "Expertise",
    text: "Globally recognized cardiovascular expertise.",
  },
  {
    icon: BriefcaseMedical,
    title: "Qualified Care",
    text: "Team of highly certified medical professionals.",
  },
  {
    icon: Syringe,
    title: "Trusted Treatment",
    text: "Safe, evidence-based clinical protocols.",
  },
  {
    icon: Headset,
    title: "Patient Support",
    text: "24/7 assistance for all patient inquiries.",
  },
  {
    icon: ShieldCheck,
    title: "Advanced Safety",
    text: "Strict adherence to international hygiene and clinical safety standards.",
  },
  {
    icon: UserCheck,
    title: "Personalized Focus",
    text: "One-on-one custom wellness blueprints designed around individual profiles.",
  },
];

export const patients = [
  {
    name: "Sonal Tiwari",
    year: "2021",
    image: "https://i.pravatar.cc/100?img=47",
    review:
      "Dr. Malhotra is exceptional. He took the time to explain my condition in detail and developed a plan that actually worked for my lifestyle. I feel safer than ever.",
  },
  {
    name: "Manish Agrawal",
    year: "2019",
    image: "https://i.pravatar.cc/100?img=12",
    review:
      "The clinic management system is so smooth. Booking an appointment was effortless, and the follow-up care from Dr. Malhotra’s team was unparalleled.",
  },
  {
    name: "Esha Singh",
    year: "2022",
    image: "https://i.pravatar.cc/100?img=32",
    review:
      "Highly professional staff and a state-of-the-art facility. Dr. Malhotra literally saved my life by catching a minor issue before it became major.",
  },
  {
    name: "Rahul Verma",
    year: "2023",
    image: "https://i.pravatar.cc/100?img=15",
    review:
      "An incredible doctor with a calm demeanor. The entire process from consultation to recovery tracking was seamless and reassuring.",
  },
  {
    name: "Pooja Sharma",
    year: "2020",
    image: "https://i.pravatar.cc/100?img=25",
    review:
      "Finding a cardiologist who listens carefully is rare. Dr. Malhotra gave me his full attention and structured an effective routine.",
  },
];


// ==========================================
// ATHENURA DOCTOR APPOINTMENT MANAGEMENT SYSTEM
// Schedule.jsx - Dummy Data Configuration
// ==========================================

// src/Data/doctorData.js

export const weeklyScheduleData = [
  {
    day: "Monday",
    opening: "08:00 AM",
    closing: "06:00 PM",
    status: "Available"
  },
  {
    day: "Tuesday",
    opening: "08:00 AM",
    closing: "06:00 PM",
    status: "Available"
  },
  {
    day: "Wednesday",
    opening: "08:00 AM",
    closing: "06:00 PM",
    status: "Extended Hours"
  },
  {
    day: "Thursday",
    opening: "08:00 AM",
    closing: "06:00 PM",
    status: "Available"
  },
  {
    day: "Friday",
    opening: "08:00 AM",
    closing: "05:00 PM",
    status: "Available"
  },
  {
    day: "Saturday",
    opening: "-",
    closing: "-",
    status: "Closed"
  },
  {
    day: "Sunday",
    opening: "-",
    closing: "-",
    status: "Closed"
  }
];

export const timeSlotsData = {
  morning: [
    { time: "08:30 AM", available: true },
    { time: "09:15 AM", available: true },
    { time: "10:00 AM", available: false },
    { time: "10:45 AM", available: true },
    { time: "11:30 AM", available: true }
  ],
  afternoon: [
    { time: "01:00 PM", available: true },
    { time: "01:30 PM", available: false },
    { time: "02:00 PM", available: true },
    { time: "02:45 PM", available: true },
    { time: "03:30 PM", available: false },
    { time: "04:30 PM", available: true }
  ],
  evening: [
    { time: "05:15 PM", available: true },
    { time: "06:00 PM", available: false }
  ]
};

export const clinicHolidaysData = [
  {
    name: "Maharashtra Day",
    date: "May 01, 2026",
    status: "Holiday",
    description: "State public holiday. Clinic remains closed."
  },
  {
    name: "Dr. Mehta's Leave",
    date: "June 15, 2026",
    status: "Leave",
    description: "Dr. Rajesh Mehta is on personal leave."
  },
  {
    name: "Independence Day",
    date: "August 15, 2026",
    status: "Holiday",
    description: "National holiday. All consultations are suspended."
  },
  {
    name: "Ganesh Chaturthi",
    date: "September 14, 2026",
    status: "Holiday",
    description: "Festival holiday. Clinic remains closed."
  },
  {
    name: "Diwali Holiday",
    date: "November 08, 2026",
    status: "Holiday",
    description: "Diwali festival celebration holiday."
  }
];

export const doctorScheduleInfo = {
  doctorName: "Dr. Rajesh Mehta",
  qualification: "M.D.",
  specialization: "General Physician",
  clinicName: "Athenura Healthcare Clinic",
  consultationDuration: "30 Minutes",
  consultationMode: "In-Clinic & Online",
  clinicStatus: "Open Today"
};

export const scheduleHeroData = {
  badge: "Athenura Specialist Care",
  title: "Professional Medical Care & Scheduling",
  description: "Book your consultations effortlessly and receive expert medical attention tailored to your health needs.",
  features: [
    "Easy Scheduling",
    "Real-time Availability",
    "Trusted Care"
  ],
  status: "Active"
};

export const appointmentSummaryData = {
  defaultMessage: "Please select an available time slot.",
  selectedDateLabel: "Selected Date",
  selectedTimeLabel: "Selected Time",
  buttonText: "Book Your Appointment"
};

export const clinicContactData = {
  phone: "+91 (0712) 555-0192",
  email: "support@athenuraclinic.com",
  address: "Athenura Healthcare Tower, Civil Lines, Nagpur, Maharashtra",
  supportText: "Contact Athenura Clinic Support line for emergency queries."
};

export const mockDoctor = {
  id: "doctor-001",
  name: "Dr. Rajesh Malhotra",
  specialization: "Cardiology Specialist",
  experience: "15+ Years",
  qualification: "MBBS, MD - Cardiology, FACC",
  clinic: "Apollo Medical Center",
  clinicAddress: "104, Health Avenue, Near Central Park, New Delhi",
  rating: 4.9,
  reviews: 480,
  consultationHours: "Monday - Friday, 08:00 AM - 05:00 PM",
  contactNumber: "+91 (011) 2345-6789"
};

export const mockSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM"
];