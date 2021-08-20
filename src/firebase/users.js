import firebase from "firebase/app";

export const getUser = (uid) => {
  return firebase.firestore().collection("users").doc(uid).get();
};
