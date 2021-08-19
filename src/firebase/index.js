import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from "src/firebase/config";

if (firebase.apps.length < 1) {
  firebase.initializeApp(config);
}
