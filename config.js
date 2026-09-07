/* ---------------------------------------------------------------------------
   Daily Keiko — configuration

   Fill this in and the app gains sign-in and cross-device sync.
   Leave it empty and the app still works perfectly — it just keeps everything
   on the one device, exactly like the offline version.

   Where the values come from:
     Firebase console -> your project -> Project settings -> General
     -> Your apps -> Web app -> SDK setup and configuration -> Config

   It looks like this. Copy the values across:

     const firebaseConfig = {
       apiKey: "AIzaSy...",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project",
       storageBucket: "your-project.appspot.com",
       messagingSenderId: "123456789",
       appId: "1:1234:web:abcd"
     };

   The Firebase apiKey is NOT a secret. Google says so explicitly — it only
   identifies your project to their servers. What protects your data is the
   security rules in firestore.rules, which lock every document to the user
   who created it. Ship this file publicly without worry.
--------------------------------------------------------------------------- */

window.KEIKO_CONFIG = {

  const firebaseConfig = {
    apiKey: "AIzaSyDuZub3ayHQ9EA-mXmPPeGiIa47hCUrlRM",
    authDomain: "keiko-app-da5c5.firebaseapp.com",
    projectId: "keiko-app-da5c5",
    storageBucket: "keiko-app-da5c5.firebasestorage.app",
    messagingSenderId: "545239509693",
    appId: "1:545239509693:web:3d0dfd019bd17c0f3ca5d4",
    measurementId: "G-FXC348S28N"
  };
  ENABLE_GOOGLE: true
};
