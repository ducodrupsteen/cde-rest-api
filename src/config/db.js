import mongoose from 'mongoose';
import config from './index';

export default function initializeDatabaseConnectino() {
  mongoose.Promise = global.Promise

  return new Promise((resolve) => {
    const db = mongoose.connect(config.mongoUrl, {
      useMongoClient: true
    })
    return resolve(db)
  })
}
