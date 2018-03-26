import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  subTitle: String,
  status: String,
});

export default mongoose.model('Task', taskSchema)
