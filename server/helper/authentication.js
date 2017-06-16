import jwt from 'jsonwebtoken';
import models from '../models/';

const Role = models.Role;

const secret = process.env.SECRET || 'thisisademosecret';

const authentication = {
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
        }
        return res.status(403)
          .send({ message: 'Admin access is required for this action' });
      })
      .catch((error) => {
        res.status(400).send({
          err: error,
          message: 'Error authenticating'
        });
      });
  },

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

    if (!token) {
      return res.status(401)
        .send({ message: 'Please sign in to access this page' });
    }
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        req.decoded = decoded;
        next();
      }
      res.status(401).send({ message: 'Authentication failed' });
    });
  },

  /**
   * Get the user's role name
   *
   * @param {Object} req request object
   * @returns {Response} response object
   */
  getUserRole(req) {
    Role.findById(req.decoded.roleId)
      .then(foundRole => foundRole.roleName.toLowerCase());
  },
};

export default authentication;
