/* ---------------------------------------------------------------------------
   Daily Keiko — configuration

   Fill these two values in and the app gains sign-in and cross-device sync.
   Leave them empty and the app still works perfectly — it just stores
   everything on the one device, exactly like the offline version.

   Where the values come from:
     Supabase dashboard -> your project -> Project Settings -> API
       URL       -> SUPABASE_URL
       anon public key -> SUPABASE_ANON_KEY

   The anon key is designed to be public. It is safe in this file and safe in
   a public GitHub repo. What protects your data is Row Level Security, which
   supabase/schema.sql switches on — every row is locked to the user who
   created it. Never put the service_role key here; that one is a master key.
--------------------------------------------------------------------------- */

window.KEIKO_CONFIG = {
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: "",

  /* Set to true only after you have enabled the Google provider in
     Supabase -> Authentication -> Providers. Email and password works
     with no extra setup, so leave this false unless you want it. */
  ENABLE_GOOGLE: false
};
