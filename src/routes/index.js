import express from 'express';
// import config from '../config';
import initializeDatabaseConnection from '../config/db';
import content from '../services/content';
import admins from '../services/admins';
import ingredients from '../services/ingredients';
import categories from '../services/categories';
import recipes from '../services/recipes';
import particepents from '../services/particepents'

import log from '../log';

const config = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGODBURL,
  bodyLimit: process.env.BODYLIMIT
}

const router = express()

initializeDatabaseConnection()
  .then(function getDatabaseVariable(db) {

    const toPassToController = { db, config, log }

    const routes = [
      { route: '/users', routeController: admins},
      { route: '/content', routeController: content },
      { route: '/campaign/ingredients', routeController: ingredients },
      { route: '/campaign/categories', routeController: categories},
      { route: '/campaign/recipes', routeController: recipes},
      { route: '/campaign/particepents', routeController: particepents }
    ]


    routes.forEach(function addAllRoutes({ route, routeController }) {
      router.use(route, routeController(toPassToController))
    })

  })


export default router
