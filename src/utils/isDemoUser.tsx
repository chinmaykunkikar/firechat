import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useDemoUser() {
  const [isDemoUser, setDemoUser] = useState<boolean>(false);
  const fireUser = auth.currentUser;

  async function checkDemoUser() {
    if (fireUser) {
      await getDoc(doc(db, "users", fireUser.uid))
        .then((docSnap) => {
          if (docSnap.exists()) setDemoUser(docSnap.data().demoUser);
        })
        .catch((e) => console.log(e));
    }
  }
  useEffect(() => {
    checkDemoUser();
  }, [fireUser]);

  return isDemoUser;
}
