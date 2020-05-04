const models = require('../models')

const getAllVillains = async (request, response) => {
  try {
    const teams = await models.villains.findAll({ attributes: ['name', 'movie', 'slug'] })

    return response.send(teams)
  } catch (error) { return response.status(500).send('Cant make contact with villains, Perhaps another try?') }
}

const getVillainBySlug = async (request, response) => {
  try {
    const { slug } = request.params

    const findVillainSlug = await models.villains.findOne({
      where: { slug: slug },
      attributes: ['name', 'movie', 'slug']
    })

    return findVillainSlug
      ? response.send(findVillainSlug)
      : response.sendStatus(404)
  } catch (error) { return response.status(500).send('Cant make contact with villains, Perhaps another try?') }
}

const addNewVillain = async (request, response) => {
  try {
    const {
      name, movie, slug
    } = request.body

    if (!name || !movie || !slug) {
      return response.status(400).send('Please make sure all fields are filled')
    }

    const newVillain = await models.villains.create({
      name, movie, slug
    })


    return response.status(201).send(newVillain)
  } catch (error) { return response.status(500).send('Cant make contact with villains, Perhaps another try?') }
}

module.exports = { getAllVillains, getVillainBySlug, addNewVillain }
