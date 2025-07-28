import { initializeApp } from "firebase/app";

import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  //   onAuthStateChanged,
  // signOut,
  //   sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAfOhGmJY6cUlqMVs7L5O8pii5NpjHubkA",
  authDomain: "booking-app-7e0e4.firebaseapp.com",
  projectId: "booking-app-7e0e4",
  storageBucket: "booking-app-7e0e4.firebasestorage.app",
  messagingSenderId: "1027947274548",
  appId: "1:1027947274548:web:2133ee68522ef308274561",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Register user
export const registerUser = async (
  email,
  password,
  displayName,
  phone,
  country
) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update user profile
    await updateProfile(userCredential.user, { displayName });

    // Add user to Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: userCredential.user.email,
      name: displayName,
      phone,
      country,
    });

    //success
    console.log(userCredential.user);
    toast.success("User registered successfully.", { position: "top-center" });

    return userCredential.user;
  } catch (error) {
    //error
    toast.error(error.message, { position: "top-center" });
    console.error("Error registering user:", error);
  }
};

// Sign in user
export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    toast.success("User registered successfully.", { position: "top-center" });
    console.log(userCredential.user);
    return userCredential.user;
  } catch (error) {
    toast.error(error.message, { position: "top-center" });
    console.error("Error registering user:", error);
  }
};

// get user data
export const fetchUserData = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      unsubscribe();
      if (!user) return reject(new Error("No authenticated user"));

      try {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          console.log(docSnap.data());
          resolve(docSnap.data());
        } else {
          reject(new Error("User document not found"));
        }
      } catch (err) {
        reject(err);
      }
    }, reject);
  });
};

//loader for react router in profile
export async function profileLoader() {
  const user = auth.currentUser;
  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Response("User data not found", { status: 404 });
  }

  return docSnap.data();
}

export async function logout() {
  try {
    await auth.signOut();
    console.log("Logged out successfully");
  } catch (error) {
    console.log("Error logging out:", error.message);
  }
}
