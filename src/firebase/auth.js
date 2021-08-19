import firebase from "firebase/app";

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
  return firebase.auth().signInWithEmailAndPassword(email, password);
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
