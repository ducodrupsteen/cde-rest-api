import mongoose from 'mongoose'
const Schema = mongoose.Schema

const adminSchema = new Schema({
  name: String,
  email: String,
  password: String
})

export default mongoose.model('Admin', adminSchema)
