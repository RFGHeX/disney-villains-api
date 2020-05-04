/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  afterEach, before, beforeEach, describe, it
} = require('mocha')
const { villainsList, singleVillain, postedVillain } = require('../mocks/villains')
const { getAllVillains, getVillainBySlug, addNewVillain } = require('../../controllers/villains')

chai.use(sinonChai)

describe('Controllers - Villains', () => {
  let response
  let sandbox
  let stubbedCreate
  let stubbedFindOne
  let stubbedFindAll
  let stubbedSend
  let stubbedSendStatus
  let stubbedStatus
  let stubbedStatusDotSend

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindAll = sandbox.stub(models.villains, 'findAll')
    stubbedFindOne = sandbox.stub(models.villains, 'findOne')
    stubbedCreate = sandbox.stub(models.villains, 'create')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusDotSend })
  })

  afterEach(() => {
    sandbox.reset()
  })


  describe('getAllVillains', () => {
    it('retrieves a list of villains from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(villainsList)

      await getAllVillains({}, response)

      chai.expect(stubbedFindAll).to.have.callCount(1)
      chai.expect(stubbedSend).to.have.been.calledWith(villainsList)
    })

    it('returns a 500 status when an error occurs retrieving the villains', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllVillains({}, response)

      chai.expect(stubbedFindAll).to.have.callCount(1)
      chai.expect(stubbedStatus).to.have.been.calledWith(500)
      chai.expect(stubbedStatusDotSend).to.have.been.calledWith('Cant make contact with villains, Perhaps another try?')
    })
  })


  describe('getVillainBySlug', () => {
    it('retrieves the villain associated with the provided slug from the database and calls response.send() with it', async () => {
      stubbedFindOne.returns(singleVillain)
      const request = { params: { slug: 'horned-king' } }


      await getVillainBySlug(request, response)

      chai.expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: 'horned-king' },
        attributes: ['name', 'movie', 'slug']
      })
      chai.expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })

    it('returns a 404 status when no villain is found', async () => {
      stubbedFindOne.returns(null)
      const request = { params: { slug: 'heroHasWon' } }

      await getVillainBySlug(request, response)

      chai.expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 status when an error occurs retrieving the villain by slug', async () => {
      stubbedFindOne.throws('ERROR!')
      const request = { params: { slug: 'villainDoesNotCompute' } }

      await getVillainBySlug(request, response)

      chai.expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: 'villainDoesNotCompute' },
        attributes: ['name', 'movie', 'slug']
      })
      chai.expect(stubbedStatus).to.have.been.calledWith(500)
      chai.expect(stubbedStatusDotSend).to.have.been.calledWith('Cant make contact with villains, Perhaps another try?')
    })
  })

  describe('addNewVillain', () => {
    it('accepts new villain details and saves them as a new villain in the database, returning the saved record with a 201 status', async () => {
      stubbedCreate.returns(singleVillain)
      const request = { body: postedVillain }

      await addNewVillain(request, response)

      chai.expect(stubbedCreate).to.have.been.calledWith(postedVillain)
      chai.expect(stubbedStatus).to.have.been.calledWith(201)
      chai.expect(stubbedStatusDotSend).to.have.been.calledWith(singleVillain)
    })

    it('returns a 400 status when not all required fields are provided (missing movie)', async () => {
      const { name, slug } = postedVillain
      const request = { body: { name, slug } }

      await addNewVillain(request, response)

      chai.expect(stubbedCreate).to.have.callCount(0)
      chai.expect(stubbedStatus).to.have.been.calledWith(400)
      chai.expect(stubbedStatusDotSend).to.have.been.calledWith('Please make sure all fields are filled')
    })

    it('returns a 500 status when an error occurs saving the new villain', async () => {
      stubbedCreate.throws('ERROR!')
      const request = { body: postedVillain }

      await addNewVillain(request, response)

      chai.expect(stubbedCreate).to.have.been.calledWith(postedVillain)
      chai.expect(stubbedStatus).to.have.been.calledWith(500)
      chai.expect(stubbedStatusDotSend).to.have.been.calledWith('Cant make contact with villains, Perhaps another try?')
    })
  })
})
