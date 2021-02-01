
const e = require('express')
const express = require('express')
const app = express()

const equipes = require('./equipes.json')
const joueurs = require('./joueurs.json')

//Middleware
app.use(express.json())

app.listen('5000', () => {
    console.log('rest api via expressjs')
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

app.get('/joueur/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const joueur = joueurs.find(joueur => joueur.id === id)
    res.status(200).json(joueur)
})

//JOUEURS from equipe.json
app.get('/joueursOf/:idEquipe' , (req, res) => {
    const idEquipe = parseInt(req.params.idEquipe)
    let joueursOfTeam = [];
    joueurs.map((j)=>{
        if(j.idEquipe === idEquipe)
            joueursOfTeam.push(j)
    })
    res.status(200).json(joueursOfTeam)
})