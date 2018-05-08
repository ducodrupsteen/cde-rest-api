import mongoose from 'mongoose'
const Schema = mongoose.Schema

const adminSchema = new Schema({
  name: 'string',
  email: 'string',
  password: 'string'
})

export default mongoose.model('Admin', adminSchema)
