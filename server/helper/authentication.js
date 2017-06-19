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
          return next();
        }
        return res.status(403)
          .send({ message: 'Admin access is required for this action' });
      })
      .catch((error) => {
        return res.status(400).send({
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
        return res.status(401).send({ message: 'Authentication failed' });
      } 
      req.decoded = decoded;
      return next();
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

  /**
   * Validate Access
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   *
   */
  validateAccess(req, res, next) {
    const query = {};
    const limit = req.query.limit > 0 ? req.query.limit : 10;
    const offset = req.query.offset > 0 ? req.query.offset : 0;
    if (limit && !parseInt(limit, 10) || offset && !parseInt(offset, 10)) {
      return res.status(400).send({
          message: 'Only positive number is allowed for limit value'
        });
    }
    query.limit = limit;
    query.offset = offset;
    query.order = [['createdAt', 'DESC']];

    if (`${req.baseUrl}${req.route.path}` === '/documents/') {
      query.include = [
        {
          model: models.Users,
          attributes: [
            'id',
            'firstName',
            'lastName',
            'roleId'
          ]
        }
      ];
      const roleId = req.decoded.roleId;
      const userRole = getUserRole();
      if (roleId === 1) {
        query.where = {};
      } else {
        query.where = {
          $or: [
            { access: 'public' },
            { access: 'userRole',
              $and: {
                '$User.roleId$': roleId
              }
            },
            { access: 'private',
              $and: {
                userId: req.decoded.id
              }
            }
          ]
        };
      }
    }
    if (`${req.baseUrl}${req.route.path}` === '/search/documents') {
      const roleId = req.decoded.roleId;
      const id = req.decoded.id;
      const userRole = getUserRole();
      query.include = [
        {
          model: models.Users,
          attributes: [
            'id',
            'firstName',
            'lastName',
            'roleId'
          ]
        }
      ];
      query.where = {
        $and: [{
          $or: [
            { title: { $iLike: `%${req.query.term}%` } },
            { content: { $iLike: `%${req.query.term}%` } }
          ]
        }, {
          $or: [
            { userId: id },
            { access: 'public' },
            { $and: [
              { '$User.roleId$': roleId },
              { access: 'userRole' }
            ] }
          ]
        }]
      };
    }
    req.queryFilter = query;
    next();
},

};

export default authentication;
