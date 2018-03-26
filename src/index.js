import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import config from './config';
import routes from './routes';
import log from './log'
import middleware from './middlewares'

const app = express();
const LocalStrategy = require('passport-local').Strategy;

app.server = http.createServer(app);

app.use(bodyParser.json({
  limit: config.bodyLimit
}));

app.use(middleware);

// routes
app.use('/v1', routes);

// server
app.server.listen(config.port);
log.info(`Data provided on http://localhost:${config.port}/v1`)

export default app
