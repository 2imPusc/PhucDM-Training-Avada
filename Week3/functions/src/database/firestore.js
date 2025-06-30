const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp();
// admin.initializeApp({ credential: admin.credential.cert(require('./serviceAccountKey.json')) });
}

const db = admin.firestore();

module.exports = db;
