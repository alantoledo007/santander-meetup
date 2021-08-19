import firebase from "firebase/app";

export const getMeetups = (handler, onError) => {
  return firebase
    .firestore()
    .collection("meetups")
    .onSnapshot((querySnapshot) => {
      const data = [];
      if (!querySnapshot) {
        handler(data);
        return;
      }

      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      handler(data);
    }, onError);
};
