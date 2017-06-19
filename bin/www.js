import express from 'express';
import webpack from 'webpack';
import path from 'path';
import morgan from 'morgan';
import mJson from 'morgan-json';
import winston from 'winston';
import config from '../webpack.config.dev';
import Routes from '../server/routes';

const bodyParser = require('body-parser');
const format = mJson(':method :url :status :res[content-length] bytes :response-time ms');
/* eslint-disable no-console */

const port = 4050;
const app = express();
const compiler = webpack(config);
const router = express.Router();
Routes(router);

app.use(morgan(format));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));


app.use('/api', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    winston.error(err);
  } else {
    winston.info(`Trakbon starts on port ${port}`)
  }
});

export default app;
