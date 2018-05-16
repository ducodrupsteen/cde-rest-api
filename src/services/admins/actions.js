import Admin from '../../models/admins'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator/check';
import log from '../../log'

export default {

  registerAdmin(req, res) {
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email

    check('name').isEmpty().withMessage('Name is required')
    check('email').isEmpty().withMessage('Email is required')
    check('email').isEmail().withMessage('This is not a valid email')
    check('password','Password requires at least 7 characters').isLength({min: 7})

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      log.info('an error occurred');
        return res.json({
          errors: errors.mapped()
        });
      } else {

        const newAdmin = new Admin({
          name: name,
          email: email,
          password: password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              log.error(err);
            }
            newAdmin.password = hash;
            newAdmin.save()
          });
        });

        return res.json({
          succes: true,
          message: 'the user has been saved'
        })

      }
  },

  loginAdmin(req, res) {

    const email = req.body.email
    const password = req.body.password

    check('email').isEmpty().withMessage('Email is required')
    check('email').isEmail().withMessage('This is not a valid email')
    check('password').isEmpty().withMessage('Password is required')

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.mapped()
      });
    } else{
      Admin.findOne({email: email}, (err, user) => {
        if(err) {
          log.error(err);
        }
        if (!user) {
          res.json({
            succes: false,
            message: 'Username and password do not match!'
          })
        }else {
          bcrypt.compare(password, user.password, function checkUserValidation(error, isMatch) {
            if(err) {
              log.error(err);
            }
            if (isMatch) {
              jwt.sign({ user }, 'yourS3cr3t', function signUserJWTToken(err, token) {
                res.json({
                  user,
                  token
                })
              })
            } else {
              res.json({
                succes: false,
                message: 'Username and password do not match!'
              })
            }
        });
      }
      })
    }
  }
}
