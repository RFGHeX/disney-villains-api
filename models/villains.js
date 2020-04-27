const villains = (connection, sequelize) => {
  return connection.define('villains', {
    id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize.STRING },
    movie: { type: sequelize.STRING },
    slug: { type: sequelize.STRING },
  }, { paranoid: true })
}

module.exports = villains
