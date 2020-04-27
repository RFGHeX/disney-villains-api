const express = require('express')
const bodyParser = require('body-parser')
const { getAllVillains, getVillainBySlug, addNewVillain } = require('./controllers/villains')

const app = express()

app.get('/villains', getAllVillains)

app.get('/villains/:slug', getVillainBySlug)

app.post('/villains', bodyParser.json(), addNewVillain)

app.all('*', (request, response) => {
  return response.sendStatus(404)
})

app.listen(6969, () => {
  console.log('Searching for a happily ever after on 6969....') // eslint-disable-line no-console
})
