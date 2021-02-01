const express = require('express')
const app = express()

const equipes = require('./equipes.json')

//Middleware
app.use(express.json())

app.listen('5000', () => {
    console.log('rest api via expressjs')
})

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

app.delete('equipe/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const equipe = equipes.find( equipe => equipes.id === id)
    equipes.splice(equipes.indexOf(equipe), 1)
    res.status(200).json(equuipes)
})