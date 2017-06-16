import jwt from 'jsonwebtoken';
import models from '../models/';

const Role = models.Role;

const secret = process.env.SECRET || 'thisisademosecret';

const authentication = {
  /**
   * Verify user token
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next next function to execute
   * @returns {Response} response object
   */
  verifyToken(req, res, next) { // eslint-disable-line
    const token = req.headers.authorization
      || req.headers['x-access-token']
      || req.body.token;

    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(403).send({ message: 'Authentication failed' });
        }
        req.decoded = decoded;
        return next();
      });
    } else {
      return res.status(403).send({
        message: 'Please sign in to access this page'
      });
    }
  },

  /**
   * Verify if user is Admin
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {func} next next function to execute
   * @returns {Response} response object
   */
  adminAccess(req, res, next) {
    Role.findById(req.decoded.roleId)
      .then((foundRole) => {
        if (foundRole.roleName.toLowerCase() === 'admin') {
          next();
        } else {
          return res.status(403)
            .send({ message: 'User is unauthorized for this request.' });
        }
      })
      .catch((error) => {
        res.status(400).send({
          err: error,
          message: 'Error authenticating'
        });
      });
  },
};

export default authentication;
