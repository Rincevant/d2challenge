const jwt = require('jsonwebtoken')
const Token = require('../database/token_repository')
const Users = require('../database/users_repository')

module.exports = {

  validateUser(user) {
    if (user.password != user.confirm) {
      return false
    }
    const validUserName = typeof user.username == 'string' && user.username.trim() != '' && user.username.trim().length >= 4 ;
    const validPass = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 3;
    return validPass && validUserName
  },

  async authentificateToken(req, res, next) {
    const user = req.session.user

    if (user == null) return res.sendStatus(403)

    const token = user.token
    
    if (token == null) return res.sendStatus(403)

    //Searching if token exist
    var result = await Token.findToken(token)

    if (result.length == 0) return res.sendStatus(403)

    jwt.verify(token, 'blablasecret', (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }
      req.user = user
      next()
    })
  },

  async userIsConnected(token) {
    if (token == null) return false;

    jwt.verify(token, 'blablasecret', (err, user) => {
      if (err) {
        return false;
      }
      return true;
    })
  },
  
  async authentificateAdmin(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]    
    if (token == null) return res.sendStatus(403)
    //Searching if token exist
    var result = await Token.findToken(token)
    if (result == null || result.length == 0) return res.sendStatus(403)
    jwt.verify(token, 'blablasecret', async (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }
      req.user = user
      isAdminUser = await Users.getAdminUser(user.username, user.email)      
      if ( isAdminUser.length == 0 ) return res.sendStatus(403)
      next()
    })
  },

  getDate() {
    var d = new Date();
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    return month+"/"+day+"/"+year
  }
  
}