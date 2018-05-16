import { Router as router } from 'express'
import Content from '../../models/admins'
import actions from './actions.js'

<<<<<<< HEAD
export default function adminController({ config, log, verify }){
  const admins = router()

  admins.post('/register', verify.verifyToken, actions.registerAdmin)
=======
const {
  registerAdmin,
  loginAdmin
} = actions

export default function adminController() {
  const admins = router()

  admins.post('/register', registerAdmin)
>>>>>>> c9107356005577bba30e7d5ce1e439a9b42a3258

  admins.post('/login', loginAdmin)

  return admins
}
