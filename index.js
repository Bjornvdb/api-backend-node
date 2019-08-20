// De environment variables ophalen van '.env'
// ! Voor het importeren van de db omdat deze hier gebruik van maakt !

require('dotenv').config()

// Importeren van 'Express', 'Helmet' en initialisatie van Express

const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const app = express()

// CORS problemen oplossen
// Frontend draait op poort '8080'

app.use(function (req, res, next) {
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Max-Age', 86400)
  next()
})

// Helmet voor 'security' en 'express.json()' voor de body te kunnen lezen
app.use(helmet())
app.use(compression())
app.use(express.json())

// Importeren van de verschillende routes

const user = require('./routes/user')

// Routes opzetten

app.use('/api', user)

// Poort gelijk stellen aan '.env' variable of 3001

const port = process.env.PORT || 3001

// Server opstarten

app.listen(port, () => console.log(`App running on port ${port}.`))