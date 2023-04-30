import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = process.env.FIREBASEKEY;

export const app = initializeApp(firebaseConfig);

const myStorage = getStorage(app);
export const authTest = getAuth(app);

export default myStorage;
