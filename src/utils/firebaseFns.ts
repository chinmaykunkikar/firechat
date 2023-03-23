import { db } from "@/firebase";
import {
  DB_COLLECTION_USERCHATS,
  DB_COLLECTION_USERS,
} from "@/utils/constants";
import { doc, setDoc } from "firebase/firestore";

export async function createUserDocs({
  uid,
  displayName,
  email,
}: createUserDocsProps) {
  await setDoc(doc(db, DB_COLLECTION_USERS, uid), {
    uid,
    displayName,
    email,
    firstLogin: true,
  });
  await setDoc(doc(db, DB_COLLECTION_USERCHATS, uid), {});
}
