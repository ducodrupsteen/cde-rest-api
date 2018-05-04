import mongoose from 'mongoose';
// import config from './index';

export default function initializeDatabaseConnectino(callback) {
  mongoose.Promise = global.Promise

  return new Promise((resolve, reject) => {
    const db = mongoose.connect(process.env.DEV_MONGODB, {
      useMongoClient: true
    })
    return resolve(db)
  })
}
