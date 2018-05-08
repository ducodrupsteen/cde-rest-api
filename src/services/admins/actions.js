import Admin from '../../models/admins'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const { check, validationResult } = require('express-validator/check');


export default{

  registerAdmin(req, res){

    var name = req.body.name
    var password = req.body.password
    var email = req.body.email

    check('name').isEmpty().withMessage('Name is required')
    check('email').isEmpty().withMessage('Email is required')
    check('email').isEmail().withMessage('This is not a valid email')
    check('password','Password requires at least 7 characters').isLength({min: 7})

    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        });
      } else {

        var newAdmin = new Admin({
          name: name,
          email: email,
          password: password
        })

        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {
            if (err) console.log(err);
            newAdmin.password = hash;
            newAdmin.save()
          });
        });

        return res.json({
          succes: true,
          message: 'the admin has been saved'
        })

      }
  },

  loginAdmin(req, res){

    var email = req.body.email
    var password = req.body.password

    check('email').isEmpty().withMessage('Email is required')
    check('email').isEmail().withMessage('This is not a valid email')
    check('password').isEmpty().withMessage('Password is required')

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.mapped()
      });
    } else{
      Admin.findOne({email: email}, function(err, user){
        if(err) console.log(err);
        if (!user) {
          res.json({
            succes: false,
            message: 'no user found'
          })
        }else {
          bcrypt.compare(password, user.password, function(error, isMatch) {
            if(err) console.log(err);
            if (isMatch) {
              jwt.sign({ user }, 'mys3cr3t', (err, token) => {
                res.json({
                  user,
                  token
                })
              })
            }else {
              res.json({
                succes: false,
                message: 'Wrong password'
              })
            }
        });
      }
      })
    }



  }

}
