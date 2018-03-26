import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from '../config'

const secret = 'yours3cr3t' 

const authenticate = expressJwt({ secret })

const generateAccessToken = (req, res, next) => {
  req.token = jwt.sign({
    id: req.user.id
  }, secret);

  next()
}

const respond = (req, res) => {
  res.status(200).json({
    user: req.user.username,
    token: req.token,
    id: req.user.id,
    success: true
  })
}

export { authenticate, generateAccessToken, respond }
