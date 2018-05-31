import { Router as router } from 'express'
import Content from '../../models/admins'
import actions from './actions.js'

const {
  registerAdmin,
  loginAdmin
} = actions

export default function adminController() {
  const admins = router()

  admins.post('/register', registerAdmin)
  admins.post('/login', loginAdmin)

  return admins
}
