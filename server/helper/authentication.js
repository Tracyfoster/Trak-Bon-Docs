import jwt from 'jsonwebtoken';
import models from '../models/';

const Role = models.Role;

const secret = process.env.SECRET || 'thisisademosecret';

const authentication = {
  verifyToken(req, res, next) {
    const token = req.headers.authorization ||
      req.headers['x-access-token'] || req.body.token;
    if (!token) {
      return res.status(401)
        .send({ message: 'Not Authorized' });
    }

    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(401)
          .send({ message: 'Invalid Token' });
      }
      req.decoded = decoded;
      next();
    });
  },

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
      .catch(error => {
        res.status(400).send({
        err: error,
        message: 'Error authenticating'
      })
    });
  },

  getUserRole(decoded, res) {
    Role.findById(decoded.roleId)
      .then((foundRole) => {
        return foundRole.roleName.toLowerCase()
      });
  },
};

export default authentication;
