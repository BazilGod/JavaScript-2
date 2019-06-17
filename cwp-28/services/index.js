const errors = require('../helpers/errors.helper');
const Food = require('./food');
const Agent = require('./agent');
const Person = require('./person');
const Ingestion = require('./ingestion');
const Sequelize = require('sequelize');
const config = require('../db/config');
var db = require('../db/index')(Sequelize, config);


const foodService = new Food(db.Food, errors);
const agentService = new Agent(db.Agent, errors);
const personService = new Person(db.Person, errors);
const ingestionService = new Ingestion(db.Ingestion, errors);

module.exports = () => ({foodService, agentService, personService, ingestionService});

