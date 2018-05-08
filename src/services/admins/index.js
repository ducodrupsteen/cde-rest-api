import { Router as router } from 'express'
import Content from '../../models/admins'
import actions from './actions.js'

export default function adminController({ config, log }){
  const admins = router()

  admins.post('/register', actions.registerAdmin)

  admins.post('/login', actions.loginAdmin)

  return admins
}
