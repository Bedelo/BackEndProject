
//const e = require('express')
//const { json } = require('express')
const express = require('express')
const app = express()

const equipes = require('./equipes.json')
const joueurs = require('./joueurs.json')

const PORT = 5000;
//Middleware
app.use(express.json())

app.listen(PORT, () => {
    console.log(`rest api via expressjs , Vous etes connecte au port: ${PORT}`)
})


// EQUIPES PATHS FROM .json
app.get('/equipes' , (req, res) => {
    //res.send('liste des equipes');
    res.status(200).json(equipes)
})

app.get('/equipe/:id' , (req, res) => {
    const id = parseInt(req.params.id)
    const equipe = equipes.find(equipe => equipe.id === id)
    res.status(200).json(equipe)
})

app.post('/equipes' , (req,res) =>{
    equipes.push(req.body)  
    res.status(200).json(equipes)
})

app.put('/equipes/:id' , (req, res) => {
    const id = parseInt(req.params.id)
    const equipe = equipes.find(equipe => equipe.id === id)
    equipe.name = req.body.name
    equipe.country = req.body.country
    req.status(200).json(equipes)
})

app.delete('/equipe/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const equipe = equipes.find( equipe => equipes.id === id)
    equipes.splice(equipes.indexOf(equipe), 1)
    res.status(200).json(equipes)
})

// JOUEURS PATHS FROM .json
app.get('/joueurs', (req, res) => {
    res.status(200).json(joueurs)
})

app.post('/joueur', (req, res) => {
    joueurs.push(req.body)
    res.status(200).json(joueurs)
})

app.put('/joueur/:id' , (req, res) => {
    const id = parseInt(req.params.id)
    const joueur = joueurs.find(joueur => joueur.id === id)
    joueur.nom = req.body.name
    joueur.idEquipe = req.body.idEquipe
    joueur.numero = req.body.numero
    joueur.poste = req.body.poste
    res.status(200).json(joueurs)
})

app.delete('/joueur/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const joueur = joueurs.find(joueur => joueur.id === id)
    joueurs.splice(joueurs.indexOf(joueur), 1)
    res.status(200).json(joueurs)
})

app.get('/joueur/:id', (req, res) => {
    console.log("79")
    const id = parseInt(req.params.id)
    const joueur = joueurs.find(joueur => joueur.id === id)
    res.status(200).json(joueur)
})

//JOUEURS d'une equipe via id Equipe
app.get('/joueursofequipe/:idEquipe' , (req, res) => {
    const idEquipe = parseInt(req.params.idEquipe)
    let joueursOfTeam = joueurs.filter(joueur => joueur.idEquipe === idEquipe)
    res.status(200).json(joueursOfTeam)
})

//Equipe d'un joueur via id
app.get('/joueur/:id/equipe/', (req, res) => {
    console.log("93")
    const id = parseInt(req.params.id)
    const joueur = joueurs.find( joueur => joueur.id === id)
    const idEquipe = joueur.idEquipe
    const equipe = equipes.find( equipe => equipe.id === idEquipe)
    res.status(200).json(equipe)
})

//correction
app.get('/getTeam/:idj/equipe', (req, res) =>{
    const idj = parseInt(req.params.idj);
    const player = joueurs.find(element => element.id === idj);
    const equipe = equipes.find(team => team.id === player.idEquipe);
    res.status(200).json(equipe);
});


//RECHERCHE JOueur avec le NOM
app.get('/nomjoueur/:nom', (req, res) => {
    //const nom = req.params.nom.toString()
    const joueur = joueurs.filter( joueur => joueur.nom == nom)
    res.status(200).json(joueur)
})