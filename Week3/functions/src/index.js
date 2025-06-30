// const functions = require('firebase-functions');
// const apiHandler = require('./handlers/api');

// exports.api = functions.https.onRequest(apiHandler.callback());

const express = require('express');
const functions = require('firebase-functions');
const apiHandler = require('./handlers/api');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(apiHandler.callback());

exports.api = functions.https.onRequest(app);
