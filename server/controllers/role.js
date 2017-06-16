import model from '../models/';
import Helpers from '../helper/Helpers';

const Role = model.Role;
const Users = model.Users;

export default {
  /**
   * Create a role
   * Route: POST: /roles
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} no returns
   */
  create(req, res) {
    return Role
      .findOne({
        where: {
          roleName: req.body.roleName
        }
      })
      .then((existingRole) => {
        if (existingRole) {
          return res.status(409).send({ message: 'Role Already Exists' });
        }
        return Role.create({
          roleName: req.body.roleName,
        })
        .then(role => res.status(201).send({
          role,
          message: 'Role created succesfully'
        }))
        .catch(error => Helpers.handleError(error, res));
      });
  },

  /**
   * Get all roles
   * Route: GET: /roles
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} no returns
   */
  getAllRoles(req, res) {
    return Role
      .findAll()
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'No Roles Found',
          });
        }
        return res.status(200).send({ role });
      })
      .catch(error => Helpers.handleError(error, res));
  },

  /**
   * Get a particular role
   * Route: GET: /roles/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} response object or void
   */
  retrieve(req, res) {
    return Role
      .findById(req.params.id, {
        include: [{
          model: Users,
          as: 'Users',
        }],
      })
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return res.status(200).send({ role });
      })
      .catch(error => Helpers.handleError(error, res));
  },

  /**
   * Update a particular role
   * Route: PUT: /roles/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  update(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return role
          .update({
            roleName: req.body.roleName || role.roleName,
          })
          .then(() => res.status(200).send({
            role,
            message: 'Role updated successfully.'
          }))
          .catch(error => Helpers.handleError(error, res));
      })
      .catch(error => Helpers.handleError(error, res));
  },

  /**
   * Delete a particular role
   * Route: DELETE: /roles/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  destroy(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return role
          .destroy()
          .then(() => res.status(200).send({
            message: 'Role deleted successfully.'
          }));
      })
      .catch(error => Helpers.handleError(error, res));
  },
};
