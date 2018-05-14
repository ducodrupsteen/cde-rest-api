import mongoose from 'mongoose';
// import config from './index';

const mongoUrl = process.env.MONGOURL

export default function initializeDatabaseConnectino(callback) {
  mongoose.Promise = global.Promise

  return new Promise((resolve, reject) => {
    const db = mongoose.connect(mongoUrl, {
      useMongoClient: true
    })
    return resolve(db)
  })
}
