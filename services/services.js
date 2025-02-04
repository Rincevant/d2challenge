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
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    
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

  async isUserConnected(req, res, next) {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(req.session.user.token, process.env.JWT_SECRET || "blablasecret");
        //req.user = decoded;
        next();
    } catch (err) {
        res.redirect("/login");
    }
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
  }
  
}