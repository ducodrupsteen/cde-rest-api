import express from 'express';
import config from '../config';
import initializeDatabaseConnection from '../config/db';
import tasks from '../services/tasks';
import log from '../log'

const router = express()

initializeDatabaseConnection()
  .then(function getDatabaseVariable(db) {

    const toPassToController = { db, config, log }
    
    const routes = [
      { route: '/tasks', routeController: tasks }
    ]
    

    routes.forEach(function addAllRoutes({ route, routeController }) {
      router.use(route, routeController(toPassToController))
    })

  })


export default router
