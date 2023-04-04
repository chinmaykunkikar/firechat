/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_USER1_EMAIL: string;
  readonly VITE_USER1_PASSWORD: string;
  readonly VITE_USER2_EMAIL: string;
  readonly VITE_USER2_PASSWORD: string;
  readonly VITE_USER3_EMAIL: string;
  readonly VITE_USER3_PASSWORD: string;
  readonly VITE_USER4_EMAIL: string;
  readonly VITE_USER4_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
