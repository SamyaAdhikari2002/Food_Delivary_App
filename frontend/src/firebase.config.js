import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDfkSKf-xYpt14ZKOj_g_sdkJ-Ncw-h54c",
  authDomain: "shopping-backend-79635.firebaseapp.com",
  databaseURL: "https://shopping-backend-79635-default-rtdb.firebaseio.com",
  projectId: "shopping-backend-79635",
  storageBucket: "shopping-backend-79635.appspot.com",
  messagingSenderId: "821389436731",
  appId: "1:821389436731:web:f28d9bac61d71330d2f91e",
  measurementId: "G-T5X9W5KWB9",
};
const app = getApps() > 0 ? getApp() : initializeApp(firebaseConfig);
const firestorge = getFirestore(app);
const storage = getStorage(app);

export { firestorge, app, storage };
