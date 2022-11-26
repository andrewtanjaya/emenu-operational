import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where} from "@firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MESAUREMENT_ID,
};

const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);

export const storage = getStorage(firebase);
export const usersRef = collection(firestore, "users");
export const restaurantsRef = collection(firestore, "restaurants");
export const menusRef = collection(firestore, "menus");

export function userQuery(firstName, roleType){
  if(roleType!==""){
    return query(collection(firestore, "users"), where("roleType", "==", roleType));
  }
  return query(collection(firestore, "users"), where("firstName", ">=", firstName), where("firstName", "<", firstName+'\uf8ff'));
}; 

