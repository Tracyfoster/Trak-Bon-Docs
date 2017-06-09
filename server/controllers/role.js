import model from '../models/';

const Role = model.Role;
const Users = model.Users;

export default {
  create(req, res) {
    return Role
     .findOne({
        where: {
          roleName: req.body.roleName
        }
      })
      .then((role) => {
        if (role) {
          return res.status(409).send({ message: 'Role Already Exists' });
        }
        Role.create({
          roleName: req.body.roleName,
        })
        .then(role => res.status(201).send({
          role,
          message: 'Role created succesfully'
        }))
        .catch(error => Helpers.handleError(error, res));
      });
  },

  list(req, res) {
    return Role
      .findAll({
        include: {
          model: Users,
          as: 'Users'
        }
      })
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
