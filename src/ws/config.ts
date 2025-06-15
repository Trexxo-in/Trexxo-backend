import admin from "firebase-admin";
import { DBURL } from "./export";

var serviceAccount = require("../token/firebase_token.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:DBURL
});
const db = admin.database()



export default db
