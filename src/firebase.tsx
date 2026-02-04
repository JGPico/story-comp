// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import type { Auth } from "firebase/auth";
import type { FirebaseStorage } from "firebase/storage";
import { config, configError } from './config'

let auth: Auth | null = null
let storage: FirebaseStorage | null = null

if (!configError && config) {
  const app = initializeApp(config.firebase);
  auth = getAuth(app);
  storage = getStorage(app);
}

export default {
  auth,
  storage,
  error: configError,
};