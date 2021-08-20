import firebase from "firebase/app";
import { setIsAdmin } from "src/redux/slices/app.slice";
import store from "src/redux/store";
import { getUser } from "src/firebase/users";
import { USER_STATES } from "src/core/constants";

const mapUserFromFirebaseAuth = (user) => {
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
  };
};

export const onAuthStateChange = (handler) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuth(user) : null;
    return handler(normalizedUser);
  });
};

export const logout = () => firebase.auth().signOut();

export const loginWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      isAdminHandler(res.user.id);
    });
};

export const registerWithEmailAndPassword = (email, password, fullname) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (credentials) => {
      await credentials.user.updateProfile({ displayName: fullname });
      await credentials.user.sendEmailVerification();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const isAdminHandler = (user) => {
  if (user !== USER_STATES.NOT_KNOW && user !== USER_STATES.NOT_LOGGED) {
    getUser(user.uid).then((doc) => {
      let isAdmin = false;
      if (doc?.exists) {
        isAdmin = doc.data().isAdmin;
      }
      store.dispatch(setIsAdmin(isAdmin));
    });
  } else {
    store.dispatch(setIsAdmin(false));
  }
};
