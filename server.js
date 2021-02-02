const express = require('express');
const app = express();
app.use(express.json());

app.listen(
    5000,
    ()=>{console.log("Serveur Express a l ecoute sur le port 5000");}
);

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'monapi';
let db;
MongoClient.connect(url, function (err, client) {
    console.log("Connexion réussie avec Mongo");
    db = client.db(dbName);
})

//retourne toute les equipe
app.get('/equipes', (req,res) => {
      db.collection('equipe').find({}).toArray(function(err, docs) {
          if (err) {
              console.log(err)
              throw err
          }
          res.status(200).json(docs)
      }) 
})


//retourne lequipe avec un id specifique
app.get('/equipe/:id', async (req,res) => {
      const id = parseInt(req.params.id)
      try {
        const docs = await db.collection('equipe').find({id}).toArray()
          res.status(200).json(docs)
      } catch (err) {
          console.log(err)
          throw err
      }
}) 

//ajouter une equipe dans body
app.post('/equipes', async (req,res) => {
      try {
          const equipeData = req.body
          const equipe = await db.collection('equipe').insertOne(equipeData)
          res.status(200).json(equipe)
      } catch (err) {
          console.log(err)
          throw err
      }
})


//mettre a jour lequipe avec id
app.put('/equipe/:id', async (req,res) => {
      try {
          const id = parseInt(req.params.id)
          const replacementEquipe = req.body
          const equipe = await db.collection('equipe').replaceOne({id},replacementEquipe)
          res.status(200).json(equipe)
      } catch (err) {
          console.log(err)
          throw err
      }
})

//Supprimer lequipe avec ID
app.delete('/equipes/:id', async (req,res) => {
      try {
          const id = parseInt(req.params.id)
          const equipe = await db.collection('equipe').deleteOne({id})
          res.status(200).json(equipe)
      } catch (err) {
          console.log(err)
          throw err
      } 
})