import jwt from 'jsonwebtoken';
import model from '../models/';
import Helpers from '../helper/Helpers';

const Users = model.Users;
const Role = model.Role;

const secret = process.env.SECRET || 'thisisademosecret';

export default {
  /**
   * Create a user
   * Route: POST: /users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} no returns
   */
  create(req, res) {
    return Users
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        return res.status(409).send({ message: 'User Already Exists' });
      }
      return Users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        roleId: req.body.roleId
      })
      .then((newUser) => {
        const data = { id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          roleId: newUser.roleId
        };
        const token = jwt.sign(data, secret, {
          expiresIn: 60 * 60 * 24 });
        return res.status(201).send({
          data,
          message: 'User created successfully',
          token
        });
      })
      .catch(error => Helpers.handleError(error, res));
    });
  },

  /**
   * Login user
   * Route: POST: /users/login
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
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
        const data = { id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          roleId: user.roleId
        };
        const token = jwt.sign(data, secret, {
          expiresIn: 60 * 60 * 24 });
        return res.status(200).send({
          data,
          message: 'User authenticated successfully',
          token
        });
      })
      .catch(error => Helpers.handleError(error, res));
  },

  /**
   * Logout user
   * Route: POST: /users/logout
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  logout(req, res) {
    return res.status(200).send({
      message: 'You have successfully logged out'
    });
  },

  /**
   * Get all users
   * Route: GET: /users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} no returns
   */
  getAllUsers(req, res) {
    return Users
      .findAndCountAll({
        subQuery: false,
        order: [['createdAt', 'DESC']],
        offset: req.query.offset || 0,
        limit: req.query.limit || 5,
      })
      .then((allUsers) => {
        if (!allUsers || allUsers.count < 1) {
          return res.status(404).send({
            message: 'No User Found' });
        }
        const users = allUsers.rows.map(user =>
          Helpers.requiredAttributes(user));
        return res.status(200).send(users);
      })
      .catch(error => Helpers.handleError(error, res));
  },

  /**
   * Get a particular user
   * Route: GET: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} response object or void
   */
  retrieve(req, res) {
    return Users
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User Not Found' });
        }
        return res.status(200).send(Helpers.requiredAttributes(user));
      })
      .catch(error => Helpers.handleError(error, res));
  },

  /**
   * Update a particular user
   * Route: PUT: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
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
              .then((updatedUser) => {
                updatedUser = Helpers.requiredAttributes(updatedUser);
                res.status(200).send({
                  updatedUser,
                  message: 'User updated successfully',
                });
              });
          }).catch(error => Helpers.handleError(error, res));
      }
      return (res.status(403)
         .send({ message: 'Unauthorized Access' }));
    });
  },

  /**
   * Delete a particular user
   * Route: DELETE: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
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

  /**
   * Search for a user
   * Route: GET: /search/users?q={queryParam}
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  userSearch(req, res) {
    const searchTerm = req.query.q;
    Users.findAndCountAll({
      where: {
        $or: [{ firstName: { $iLike: `%${searchTerm}%` } },
          { lastName: { $iLike: `%${searchTerm}%` } },
          { email: { $iLike: `%${searchTerm}%` } }]
      }
    }).then((users) => {
      if (!users || users.count < 1) {
        return res.status(404).send({ message: 'No user found' });
      }
      return res.status(200).send({
        users,
        message: 'Search Successful'
      });
    })
    .catch(error => Helpers.handleError(error, res));
  },
};
