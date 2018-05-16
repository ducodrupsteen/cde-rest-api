import express from 'express';
import config from '../config';
import initializeDatabaseConnection from '../config/db';
import verify from '../middlewares/verify.js';
import tasks from '../services/tasks';
import content from '../services/content';
import admins from '../services/admins';
import ingredients from '../services/ingredients';
<<<<<<< HEAD
import categories from '../services/categories'
=======
import categories from '../services/categories';
>>>>>>> branchDuco

import log from '../log';

// const config = {
//   port: process.env.PORT,
//   mongoUrl: process.env.MONGODBURL,
//   bodyLimit: process.env.BODYLIMIT
// }

const router = express()

initializeDatabaseConnection()
  .then(function getDatabaseVariable(db) {

    const toPassToController = { db, config, log, verify }

    const routes = [
      { route: '/users', routeController: admins},
      { route: '/tasks', routeController: tasks },
      { route: '/content', routeController: content },
      { route: '/ingredients', routeController: ingredients },
      { route: '/categories', routeController: categories}
    ]


    routes.forEach(function addAllRoutes({ route, routeController }) {
      router.use(route, routeController(toPassToController))
    })

  })


export default router
