import express from 'express';
// import config from '../config';
import initializeDatabaseConnection from '../config/db';
import tasks from '../services/tasks';
import content from '../services/content';
import log from '../log';

const config = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGODBURL,
  bodyLimit: '1000kb'
}

const router = express()

initializeDatabaseConnection()
  .then(function getDatabaseVariable(db) {

    const toPassToController = { db, config, log }

    const routes = [
      { route: '/tasks', routeController: tasks },
      { route: '/content', routeController: content }
    ]


    routes.forEach(function addAllRoutes({ route, routeController }) {
      router.use(route, routeController(toPassToController))
    })

  })


export default router
