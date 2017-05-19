import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Routes from './routes';
import auth from '../server/middlewares';

const secret = process.env.SECRET || 'thisisademosecret';
const app = express();
// const router = express.Router();
// Routes(router);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/api', router);


// app.get('*', (req, res) => {
//   res.send({ message: 'Welcome to the Trakbon Docs!' });
// });

export default app;