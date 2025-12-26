import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: 대표님의 파이어베이스 키를 여기에 붙여넣으세요!
const firebaseConfig = {
  apiKey: "AIzaSyBW7PWXA3a0SsHBs9XvdscAwCrbhlpYoGI",
  authDomain: "next-step-app-f7295.firebaseapp.com",
  projectId: "next-step-app-f7295",
  storageBucket: "next-step-app-f7295.firebasestorage.app",
  messagingSenderId: "1045900060970",
  appId: "1:1045900060970:web:ee32a1f45663c92960d653"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
