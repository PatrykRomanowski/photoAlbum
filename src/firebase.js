import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuus-sPfqmqdEbNbK6TCVAFnRbLuFsPhU",
  authDomain: "photoalbum-36ef9.firebaseapp.com",
  projectId: "photoalbum-36ef9",
  storageBucket: "photoalbum-36ef9.appspot.com",
  messagingSenderId: "851111725931",
  appId: "1:851111725931:web:34dc005b82bca194041a2e",
  measurementId: "G-Z7K3JHNCP1",
};

export const app = initializeApp(firebaseConfig);

const myStorage = getStorage(app);
export const authTest = getAuth(app);

export default myStorage;
