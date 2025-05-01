require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

//config JSON response
app.use(express.json())

//Models
const User = require('./models/User')

//credencials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS


//Open route - Public Route
app.get('/', (req, res)=> {
    res.status(200).json({msg: 'Bem vindo'})
})

//Register User
app.post('/auth/register', async (req, res) => {
  // Verifique se o body existe
  if (!req.body) {
    return res.status(400).json({ msg: 'O corpo da requisição é obrigatório!' })
  }

  const { name, email, password, confirmpassword } = req.body

  // Validações
  if (!name) {
    return res.status(422).json({ msg: 'O nome é obrigatório!' })
  }
  if (!email) {
    return res.status(422).json({ msg: 'O email é obrigatório!' })
  }
  if (!password) {
    return res.status(422).json({ msg: 'A senha é obrigatório!' })
  }
  if(password !== confirmpassword){
    return res.status(422).json({ msg: 'Senhas diferentes!' })
  }

  // Adicione o restante da lógica de registro mais pra frente
  res.status(201).json({ msg: 'Usuário registrado com sucesso!' })
})

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.iqw8sxz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
    app.listen(3000)
    console.log('Coneccao ativa!')
}).catch((err) => console.log(err))

