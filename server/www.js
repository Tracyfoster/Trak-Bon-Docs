import express from 'express';
import webpack from 'webpack';
import path from 'path';
import morgan from 'morgan';
import mJson from 'morgan-json';
import winston from 'winston';
import webpackMiddleWare from 'webpack-dev-middleware';
import Routes from '../server/routes';

const app = express();
const bodyParser = require('body-parser');
const format = mJson(':method :url :status :res[content-length] bytes :response-time ms');
const port = process.env.PORT || 4050;
const router = express.Router();
const isDeveloping = process.env.NODE_ENV || 'development';

Routes(router);

app.use(morgan(format));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', router);

if (isDeveloping === 'development') {
  const config = require('../webpack.config.dev');
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
  app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
} else {
  app.use(require('express').static('dist/client'));
  app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}

app.listen(port, (err) => {
  if (err) {
    winston.error(err);
  } else {
    winston.info(`Trakbon starts on port ${port}`);
  }
});

export default app;
