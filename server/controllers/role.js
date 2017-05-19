import model from '../models/';

const Role = model.Role;
const Users = model.Users;

export default {
  create(req, res) {
    return Role
      .create({
        roleName: req.body.roleName,
      })
      .then(role => res.status(201).send({
        role,
        message: 'Role created succesfully'
      }))
      .catch(error => res.status(400).send({
        error,
        message: error.parent.detail
      }));
  },

  list(req, res) {
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
      .catch(error => res.status(400).send({
        error,
        message: error.parent.detail
      }));
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
      .catch(error => res.status(400).send({
        error,
        message: 'Error occured while retrieving role'
      }));
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
          .catch(error => res.status(400).send({
            error,
            message: 'Role did not update successfully.'
          }));
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error updating role'
      }));
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
      .catch(error => res.status(400).send({
        error,
        message: 'Error deleting Role.'
      }));
  },
};
