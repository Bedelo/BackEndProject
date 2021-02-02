const express = require('express')
const app = express()

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'monapi';
let db
MongoClient.connect(url, function (err, client) {
    console.log("Connexion réussie avec Mongo");
    db = client.db(dbName);
})
