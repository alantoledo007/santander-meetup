import firebase from "firebase/app";
import { createDocObject } from "src/core/utils";

const collection = "meetups";

const checkIfUserIsRegistered = (normalizedMeetup) => {
  const user = firebase.auth().currentUser;
  const inscriptions = normalizedMeetup.inscriptions;
  if (Array.isArray(inscriptions)) {
    if (inscriptions.includes(user.uid)) {
      return true;
    }
  }
  return false;
};

export const getMeetups = (handler, onError) => {
  return firebase
    .firestore()
    .collection(collection)
    .onSnapshot((querySnapshot) => {
      const data = [];
      if (!querySnapshot) {
        handler(data);
        return;
      }
      querySnapshot.forEach((doc) => {
        const normalizedDoc = createDocObject(doc);
        normalizedDoc.registered = checkIfUserIsRegistered(normalizedDoc);
        data.push(normalizedDoc);
      });
      handler(data);
    }, onError);
};

export const getMeetup = (id, handler, onError) => {
  return firebase
    .firestore()
    .collection(collection)
    .doc(id)
    .onSnapshot((doc) => {
      let document = null;
      if (doc?.exists) {
        document = createDocObject(doc);
        document.registered = checkIfUserIsRegistered(document);
      }
      handler(document);
    }, onError);
};

export const meetupRegister = (id) => {
  const ref = firebase.firestore().collection(collection).doc(id);
  const uid = firebase.auth().currentUser.uid;
  return firebase.firestore().runTransaction((transaction) => {
    return transaction.get(ref).then((doc) => {
      if (doc?.exists) {
        let newInscriptions = doc.data().inscriptions;
        if (Array.isArray(newInscriptions)) {
          if (!newInscriptions.includes(uid)) {
            newInscriptions.push(uid);
          }
        } else {
          newInscriptions = [uid];
        }
        transaction.update(ref, { inscriptions: newInscriptions });
      }
    });
  });
};

export const meetupUnregister = (id) => {
  const ref = firebase.firestore().collection(collection).doc(id);
  const uid = firebase.auth().currentUser.uid;
  return firebase.firestore().runTransaction((transaction) => {
    return transaction.get(ref).then((doc) => {
      if (doc?.exists) {
        let newInscriptions = doc.data().inscriptions;
        if (Array.isArray(newInscriptions)) {
          newInscriptions = newInscriptions.filter((item) => item !== uid);
        }
        transaction.update(ref, { inscriptions: newInscriptions });
      }
    });
  });
};
