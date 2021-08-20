const prod = {
  apiKey: "AIzaSyB_Fy4FHm2zx28HDbBXnIFF-WhgAppjDgc",
  authDomain: "santander-meetup-86081.firebaseapp.com",
  projectId: "santander-meetup-86081",
  storageBucket: "santander-meetup-86081.appspot.com",
  messagingSenderId: "336438775367",
  appId: "1:336438775367:web:07b2753868880a95afeb62",
  measurementId: "G-1QZX9B547W",
};

const dev = {
  apiKey: "AIzaSyCPjf9A_V-c6wCZUrPFl9tJneWpCxTHGLU",
  authDomain: "santander-meetup-dev.firebaseapp.com",
  projectId: "santander-meetup-dev",
  storageBucket: "santander-meetup-dev.appspot.com",
  messagingSenderId: "970618414010",
  appId: "1:970618414010:web:b58efb7b368098f729f383",
  measurementId: "G-FGZRBJ6V23",
};

let config;
if (process.env.NODE_ENV === "production") config = prod;
else config = dev;

export default config;
