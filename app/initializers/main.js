/* eslint-disable prettier/prettier */
///import Ember from 'ember';
import { registerDeprecationHandler } from '@ember/debug';
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getAuth, onAuthStateChanged } from "firebase/auth";

/*
const firebaseConfig = {
  projectId: 'school-14059',
  apiKey: 'AIzaSyD24xCaUXv4LgV8OcQif87Csc4HoYnr1l0',
  appId: '',
  propertyId: 319242767
};
*/

export function initialize() {

  /*
  const app = initializeApp(firebaseConfig);
  console.log('firebase app', app);

  const auth = getAuth();
  console.log('auth', auth);

  auth.login();
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(auth.app.options.appId);
    } else {
      // User is signed out
      // ...
    }
  });
  */

  //firebase.initializeApp(firebaseConfig);
  //const analytics = firebase.analytics();
  //console.log('initialized firebase', firebase);
  //const analytics = getAnalytics(app);


  registerDeprecationHandler((message, options, next) => {
    if (options && options.until && options.until !== '2.0.0') {
      return;
    } else {
      next(message, options);
    }
  });
}

export default { initialize };