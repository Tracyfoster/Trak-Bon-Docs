import jwt from 'jsonwebtoken';
import util from 'util';
import model from '../models/';
import Helpers from '../helper/Helpers';

const Users = model.Users;
const Documents = model.Documents;
const Role = model.Role;
const Folder = model.Folder;

const secret = process.env.SECRET || 'thisisademosecret';

export default {
  isAuthenticated(req, res, next) {
    const usertoken = req.headers['x-access-token'];
    jwt.verify(usertoken, process.env.SECRETKEY, (error, decoded) => {
      if (error) {
        res.status(401)
            .json({
              success: false,
              message: 'user not authenticated'
            });
      } else {
        req.decodedUser = decoded;
        next();
      }
    });
  },

  create(req, res) {
    return Users
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then((user) => {
      if (user) {
        return res.status(409).send({ message: 'User Already Exists' });
      }
      Users
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        roleId: req.body.roleId
      })
      .then((newUser) => {
        const token = jwt.sign({
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          password: newUser.password,
          roleId: newUser.roleId
        }, secret, {
          expiresIn: 60 * 60 * 24 });
        return res.status(201).send({
          newUser,
          message: 'User created successfully',
          token
        });
      })
      .catch(error => Helpers.handleError(error, res));
    });
  },

  login(req, res) {
    return Users
      .findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: 'Authentication Failed. User not found.',
          });
        }
        if (!user.verifyPassword(req.body.password)) {
          return res.status(401).send({
            message: 'Authentication failed. Wrong password.'
          });
        }
        const token = jwt.sign({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          roleId: user.roleId
        }, secret, {
          expiresIn: 60 * 60 * 24 });
        return res.status(200).send({
          user,
          message: 'User authenticated successfully',
          token
        });
      })
      .catch(error => Helpers.handleError(error, res));
  },

  logout(req, res) {
    return res.status(200).send({
      message: 'You have successfully logged out'
    });
  },

  list(req, res) {
    return Users
      .findAndCountAll({
        subQuery: false,
        order: [['createdAt', 'DESC']],
        offset: req.query.offset || 0,
        limit: req.query.limit || 5,
      })
      .then((users) => {
        if (!users) {
          return res.status(404).send({
            message: 'No User Found' });
        }
        return res.status(200).send(users);
      })
      .catch(error => Helpers.handleError(error, res));
  },

  retrieve(req, res) {
    return Users
      .findById(req.params.id, {
        include: [{
          model: Documents,
          as: 'userDocuments',
        }],
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User Not Found' });
        }
        return res.status(200).send({ user });
      })
      .catch(error => Helpers.handleError(error, res));
  },

  update(req, res) {
    Role.findById(req.decoded.roleId)
    .then(() => {
      if (Helpers.isAdmin(req, res)
        || Helpers.isOwner(req, res)) {
        return Users
          .find({ where: { id: req.params.id } })
          .then((user) => {
            if (!user) {
              return res.status(404).send({ message: 'User Not Found' });
            }
            return user
            .update(req.body, { fields: Object.keys(req.body) })
              .then(updatedUser => res
                .status(200).send({ updatedUser,
                  message: 'User updated successfully',
                }));
          }).catch(error => Helpers.handleError(error, res));
      }
      return (res.status(403)
         .send({ message: 'Unauthorized Access' }));
    });
  },

  destroy(req, res) {
    return Users
      .find({
        where: {
          id: req.params.id
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User Not Found' });
        }
        return user
          .destroy()
          .then(() => res.status(200).send({
            userId: req.params.id,
            message: `${user.firstName} deleted successfully` }));
      })
      .catch(error => Helpers.handleError(error, res));
  },

  findUserDocuments(req, res) {
    return Users
      .findAndCountAll({
        where: { id: req.params.id },
        subQuery: false,
        include: [{
          model: Documents,
          as: 'userDocuments',
        }],
        order: [['createdAt', 'DESC']],
        offset: req.query.offset || 0,
        limit: req.query.limit || 10,
      })
      .then((user) => {
        if (!user || user.count < 1) {
          return res.status(404).send({ message: 'User Not Found' });
        }
        return res.status(200).send({ user, status: true });
      })
      .catch(error => Helpers.handleError(error, res));
  },

  findUserFolders(req, res) {
    return Users
      .findById(req.params.id, {
        include: [{
          model: Folder,
          as: 'userFolders',
          include: [{
            model: Documents,
            as: 'folderDocuments'
          }]
        }]
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User Not Found' });
        }
        return res.status(200).send({ doc: user.userFolders, status: true });
      })
      .catch(error => Helpers.handleError(error, res));
  },
};
