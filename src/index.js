import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from './config';
import routes from './routes';
import log from './log';
import middleware from './middlewares';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const port = process.env.PORT || config.port
const bodyLimit = process.env.BODYLIMIT || config.bodyLimit
const app = express();
const LocalStrategy = require('passport-local').Strategy;

app.server = http.createServer(app);

app.use(bodyParser.json({
  limit: process.env.BODYLIMIT
}));

app.use(middleware);

// routes
app.use('/v1', routes);

// server
app.server.listen(port);
log.info(`Data provided on http://localhost:${port}/v1`)

export default app
