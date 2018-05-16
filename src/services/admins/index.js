import { Router as router } from 'express'
import Content from '../../models/admins'
import actions from './actions.js'

export default function adminController({ config, log, verify }){
  const admins = router()

  admins.post('/register', verify.verifyToken, actions.registerAdmin)

const {
  registerAdmin,
  loginAdmin
}

export default function adminController() {
  const admins = router()

  admins.post('/register', registerAdmin)


  admins.post('/login', loginAdmin)

  return admins
}
