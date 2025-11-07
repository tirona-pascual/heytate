import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCmJVvya30Ez3OLHzPEBV4XFzDiq2eW7gY",
  authDomain: "hey-tate.firebaseapp.com",
  projectId: "hey-tate",
  storageBucket: "hey-tate.firebasestorage.app",
  messagingSenderId: "286854289367",
  appId: "1:286854289367:web:103c43dc82f812e7da1d92",
  measurementId: "G-JHNRMBJ9FB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Read JSON file
const filePath = path.join(process.cwd(), "motivationTemplate.json");
const rawData = fs.readFileSync(filePath, "utf-8");
const topics = JSON.parse(rawData);

async function uploadFullTopics() {
  for (const topic of topics) {
    const docRef = doc(db, "Initial Approach", topic.id);
    try {
      await setDoc(docRef, topic, { merge: true }); // merges or creates all fields
      console.log(`✅ Uploaded topic: ${topic.id}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${topic.id}:`, err.message);
    }
  }
  console.log("🔥 All topics uploaded successfully!");
}

uploadFullTopics().catch(console.error);
