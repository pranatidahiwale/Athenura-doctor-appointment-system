import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PatientJourney from './models/PatientJourney.js';
import PatientReview from './models/PatientReview.js';

dotenv.config();

const patientJourneysDetailed = [
  {
    id: "cardiac-recovery-atharva",
    tag: "Cardiac Recovery",
    title: "A New Heartbeat for Atharva",
    patientName: "Atharva Kulkarni",
    age: 52,
    occupation: "Bank Manager",
    icon: "Heart",
    image:
      "https://i.ibb.co/5xRLFKQk/Chat-GPT-Image-Aug-12-2026-02-56-46-PM.png",
    desc:
      "Following a major cardiac event, Atharva worked with our multi-disciplinary team to rebuild his strength through customized nutrition and monitored exercise.",
    duration: "6 Months",
    outcome: "Full Mobility Restored",
    background:
      "Atharva suffered a mild myocardial infarction (heart attack) after years of a sedentary desk job, high work stress, and an irregular diet. He was admitted on an emergency basis and stabilized with angioplasty before beginning his recovery journey with our cardiac rehabilitation program.",
    challenge:
      "Post-discharge, Atharva experienced breathlessness with minimal exertion, persistent anxiety about a second cardiac event, and a 14 kg weight gain from years of inactivity. He also had borderline high cholesterol and needed to rebuild both physical strength and confidence.",
    treatmentPlan: [
      "Phase 1 (Weeks 1-4): Supervised low-intensity cardiac rehab sessions 3x/week with continuous ECG monitoring",
      "Phase 2 (Weeks 5-12): Structured walking and light resistance program, progressing under cardiologist supervision",
      "Phase 3 (Weeks 13-20): Introduction of interval training and strength conditioning with a physiotherapist",
      "Nutrition: Low-sodium, heart-healthy Mediterranean-style diet plan with a registered dietitian",
      "Medication management: Statins and beta-blockers with monthly lipid profile and BP reviews",
      "Psychological support: Bi-weekly counseling sessions to manage post-cardiac anxiety",
    ],
    milestones: [
      { week: "Week 2", achievement: "Completed first 10-minute supervised walk without chest discomfort" },
      { week: "Week 8", achievement: "Cholesterol (LDL) reduced from 168 mg/dL to 122 mg/dL" },
      { week: "Week 14", achievement: "Returned to part-time work with cardiologist clearance" },
      { week: "Week 20", achievement: "Completed 30-minute continuous brisk walk with stable heart rate" },
      { week: "Week 24", achievement: "Achieved full mobility and resumed weekend cycling" },
    ],
    result:
      "After 6 months, Atharva regained full physical mobility, lowered his resting heart rate from 92 to 71 bpm, and lost 9 kg. His echocardiogram showed strong ejection fraction recovery, and he no longer experiences breathlessness during daily activities.",
    careTeam: "Dr. Rohan Malhotra (Cardiology), Dr. Neha Iyer (Cardiac Rehab Physiotherapy), Ms. Pooja Deshmukh (Clinical Dietitian)",
    quote:
      "I walked in scared I'd never feel normal again. Six months later, I'm cycling with my son on weekends. This team gave me my life back, one careful step at a time.",
  },

  {
    id: "hypertension-management-esha",
    tag: "Hypertension Management",
    title: "Managing the Silent Threat",
    patientName: "Esha Rane",
    age: 45,
    occupation: "School Teacher",
    icon: "Activity",
    image:
      "https://i.ibb.co/1tdmKgss/Chat-GPT-Image-Aug-12-2026-03-01-49-PM.png",
    desc:
      "Esha struggled with high blood pressure for years. Through our integrated lifestyle medicine program, she achieved stable readings without increased medication.",
    duration: "12 Weeks",
    outcome: "Stabilized BP 120/80",
    background:
      "Esha had been managing stage-2 hypertension for nearly 6 years, with readings frequently spiking above 150/95 despite being on medication. Frequent headaches and fatigue were affecting both her work and family life, and her physician was considering escalating her prescription.",
    challenge:
      "Her hypertension was compounded by high dietary sodium intake, poor sleep quality (5 hours/night on average), minimal physical activity, and high occupational stress from long teaching hours. She was also mildly pre-diabetic, adding urgency to lifestyle intervention.",
    treatmentPlan: [
      "Home blood pressure monitoring twice daily with a connected BP cuff, logged in our patient portal",
      "DASH-style low-sodium diet plan (under 1,500 mg sodium/day) designed with a dietitian",
      "Structured sleep-hygiene coaching to increase sleep from 5 to 7+ hours nightly",
      "Guided 30-minute walking routine, 5 days/week, with a wearable activity tracker",
      "Stress-reduction program including breathing exercises and weekly mindfulness sessions",
      "Bi-weekly physician check-ins to fine-tune care without increasing medication dosage",
    ],
    milestones: [
      { week: "Week 2", achievement: "Sodium intake reduced by 40%, average BP dropped to 142/90" },
      { week: "Week 5", achievement: "Sleep duration improved to 6.5 hours/night on average" },
      { week: "Week 8", achievement: "BP consistently reading below 130/85 for two consecutive weeks" },
      { week: "Week 10", achievement: "Resting heart rate improved, headache frequency dropped by 80%" },
      { week: "Week 12", achievement: "Stable readings of 120/80 confirmed across 14 consecutive home readings" },
    ],
    result:
      "By week 12, Esha's blood pressure stabilized at a healthy 120/80 without any increase in her medication dosage. Her fasting glucose also improved, moving her out of the pre-diabetic range, and she reports significantly higher energy throughout her teaching day.",
    careTeam: "Dr. Sanjana Kapoor (Internal Medicine), Ms. Pooja Deshmukh (Clinical Dietitian), Mr. Vikram Sule (Wellness Coach)",
    quote:
      "For years I felt like hypertension was something I'd just have to live with. Now I understand my numbers, my triggers, and how to stay ahead of it — without extra pills.",
  },

  {
    id: "diabetes-management-rohan",
    tag: "Diabetes Management",
    title: "Reclaiming Everyday Energy",
    patientName: "Rohan Bhosale",
    age: 39,
    occupation: "Software Engineer",
    icon: "Droplet",
    image:
      "https://i.ibb.co/84XS99W9/Chat-GPT-Image-Aug-12-2026-03-05-01-PM.png",
    desc:
      "Rohan's fluctuating blood sugar levels left him fatigued daily. A tailored diet plan and continuous glucose monitoring helped him regain control and consistency.",
    duration: "16 Weeks",
    outcome: "HbA1c Reduced to 5.8%",
    background:
      "Rohan was diagnosed with Type 2 diabetes 3 years prior. Despite taking oral medication, his HbA1c had crept up to 8.4%, and he experienced frequent energy crashes, irritability, and brain fog — particularly during long work hours at his desk job.",
    challenge:
      "His diet was carbohydrate-heavy and irregular due to a demanding work schedule, with minimal awareness of how specific foods affected his glucose spikes. He also had disrupted sleep from late-night screen use and almost no structured physical activity.",
    treatmentPlan: [
      "Implementation of a Continuous Glucose Monitor (CGM) to track real-time food responses",
      "Low-glycemic, high-fiber meal plan emphasizing protein and healthy fats to stabilize blood sugar",
      "Introduction of 15-minute post-meal walks to blunt glucose spikes",
      "Sleep optimization program targeting 7+ hours of quality rest",
      "Gradual incorporation of strength training 2x/week to improve insulin sensitivity",
    ],
    milestones: [
      { week: "Week 3", achievement: "Identified and eliminated major dietary glucose spike triggers" },
      { week: "Week 6", achievement: "Fasting blood glucose stabilized below 110 mg/dL" },
      { week: "Week 10", achievement: "Consistent energy levels reported throughout the workday" },
      { week: "Week 16", achievement: "HbA1c test confirmed reduction from 8.4% to 5.8%" },
    ],
    result:
      "Rohan successfully lowered his HbA1c to 5.8%, placing him in a stable, well-managed range. His daily energy crashes vanished, improving both his work productivity and his mood at home. He continues to manage his condition effectively with his new lifestyle habits.",
    careTeam: "Dr. Ananya Sharma (Endocrinology), Ms. Pooja Deshmukh (Clinical Dietitian)",
    quote:
      "I used to hit a wall at 3 PM every day. Now, I have the energy to work, exercise, and actually enjoy my evenings. The continuous monitoring completely changed how I see food.",
  }
];

const patientReviews = [
  {
    name: "Sunita Deshmukh",
    date: "October 12, 2023",
    rating: 5,
    text: "Dr. Sharma's approach to my diabetes management was a breath of fresh air. Instead of just handing me a prescription, she took the time to understand my lifestyle. We worked out a diet plan that actually included foods I like, making it so much easier to stick to.",
  },
  {
    name: "Vikram Singh",
    date: "September 28, 2023",
    rating: 5,
    text: "The physiotherapy team here is unmatched. After my knee replacement, I was terrified of the pain during rehab. They pushed me exactly as much as I needed while always making sure I felt safe. I'm walking unassisted weeks ahead of schedule.",
  },
  {
    name: "Priya Menon",
    date: "November 05, 2023",
    rating: 4,
    text: "I appreciate the holistic approach they take. My recurring migraines were treated not just with painkillers, but with a combination of stress management techniques and minor dietary tweaks. It's been three months since my last severe episode.",
  },
  {
    name: "Rajesh Patil",
    date: "August 15, 2023",
    rating: 5,
    text: "Getting an appointment was seamless, and the wait time was barely five minutes. Dr. Kapoor was incredibly thorough during my annual check-up, explaining every test result in plain language rather than medical jargon.",
  },
  {
    name: "Anjali Rao",
    date: "December 02, 2023",
    rating: 5,
    text: "The pediatric care is phenomenal. My son is usually terrified of doctors, but the staff here made him feel completely at ease. They turned a scary vaccination visit into a calm, tear-free experience.",
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    await PatientJourney.deleteMany({});
    await PatientReview.deleteMany({});
    
    await PatientJourney.insertMany(patientJourneysDetailed);
    await PatientReview.insertMany(patientReviews);
    
    console.log("Database seeded successfully");
    process.exit(0);
  })
  .catch(err => {
    console.error("Error seeding database:", err);
    process.exit(1);
  });
