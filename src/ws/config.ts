import admin from "firebase-admin";
import { DBURL, MAPBOX_API } from "./export";
import mbxClient from '@mapbox/mapbox-sdk'
import mbxDirections from '@mapbox/mapbox-sdk/services/directions'
var serviceAccount = require("../token/firebase_token.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:DBURL
});
export const db = admin.database()

export const baseClient=mbxClient({accessToken:MAPBOX_API})
export const directionsService=mbxDirections(baseClient)


