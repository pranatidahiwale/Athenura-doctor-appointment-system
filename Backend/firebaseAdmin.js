 // Backend/firebaseAdmin.js
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let adminAuth;

try {
  // Parse the single-line JSON string from Render's environment variable
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);

  initializeApp({
    credential: cert(serviceAccount),
  });

  adminAuth = getAuth();
  console.log("Firebase Admin initialized successfully.");
} catch (error) {
  console.error("⚠️ Firebase Admin SDK initialization failed:", error.message);
}

export default adminAuth;
