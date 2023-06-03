
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, getDocs, getDoc, updateDoc, arrayUnion } from "firebase/firestore"
import { redirect } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const firebaseConfig = {
  apiKey: "AIzaSyCR5CAIJ7p3qgz_JJh_1AEtxRqbn-5-HrI",
  authDomain: "van-test-7205d.firebaseapp.com",
  projectId: "van-test-7205d",
  storageBucket: "van-test-7205d.appspot.com",
  messagingSenderId: "448844621834",
  appId: "1:448844621834:web:d9635c8b67e2202027d7f3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
// connectAuthEmulator(auth, "http://localhost:9099" )
// connectFirestoreEmulator(auth, "http://localhost:9000")

export const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
  const querySnapshot = await getDocs(vansCollectionRef)
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  // console.log(dataArr)
  return dataArr
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id)
  const vanSnapshot = await getDoc(docRef)
  // console.log(vanSnapshot.data())
  return {
    ...vanSnapshot.data(),
    id: vanSnapshot.id
  }
}

export async function rentVan({ user: email, van: { id, name, type, imageUrl, price, description } }) {
  console.log(imageUrl)
  const  userId = doc(db, 'users', email)
  if (email) {
    updateDoc(userId, {
      rentedVans: arrayUnion({
        id,
        name,
        type,
        imageUrl,
        price,
        description
      })
    }).then(
      toast.success('Succcessful'),
    ).catch((error) => {
      console.log(error)
      return error
    })
  } else {
    alert('Please log in to rent a van. #vanlife')
    redirect('/login')
  }
}
