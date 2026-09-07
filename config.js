/* ---------------------------------------------------------------------------
   Daily Keiko — configuration

   This file is already filled in with your Firebase project (keiko-app-da5c5).
   Nothing else here needs editing.

   The Firebase apiKey is NOT a secret — Google documents this explicitly. It
   only identifies your project to their servers. What protects your data is
   firestore.rules, which locks every document to the user who created it.
   Safe in a public repo.
--------------------------------------------------------------------------- */

window.KEIKO_CONFIG = {
  FIREBASE: {
    apiKey: "AIzaSyDuZub3ayHQ9EA-mXmPPeGiIa47hCUrlRM",
    authDomain: "keiko-app-da5c5.firebaseapp.com",
    projectId: "keiko-app-da5c5",
    storageBucket: "keiko-app-da5c5.firebasestorage.app",
    messagingSenderId: "545239509693",
    appId: "1:545239509693:web:3d0dfd019bd17c0f3ca5d4",
    measurementId: "G-FXC348S28N"
  },

  /* You set this to true. It only works if you have enabled Google in
     Firebase console -> Authentication -> Sign-in method -> Google.
     If you have not, the "Continue with Google" button will error —
     set this back to false and use email and password instead. */
  ENABLE_GOOGLE: true
};
