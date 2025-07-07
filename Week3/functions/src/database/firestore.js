const admin = require('firebase-admin');
const key = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({credential: admin.credential.cert(key)});
}

const db = admin.firestore();

module.exports = db;
