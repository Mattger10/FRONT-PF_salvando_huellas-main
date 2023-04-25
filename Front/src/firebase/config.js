
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';



const firebaseConfig = {
  apiKey: "AIzaSyB_K-gUJnSUPbl7Q7hlZrkkagWNFpLVQw8",
  authDomain: "salvandohuellas.firebaseapp.com",
  projectId: "salvandohuellas",
  storageBucket: "salvandohuellas.appspot.com",
  messagingSenderId: "732917070624",
  appId: "1:732917070624:web:5fb76af4dc81ffc705b545",
  measurementId: "G-MQJ12X8H70"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
    const storageRef = ref(storage, v4())
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}