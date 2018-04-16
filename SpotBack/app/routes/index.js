const users = require('./users')

module.exports = function(app, db) {
  users(app, db)

}
